// @ts-nocheck
import { streamText, tool, jsonSchema } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

import {
  getChecklist,
  addChecklistItem,
  getGoals,
  addGoal,
  getAgenda,
  addAgendaEvent,
  addJournalEntry,
  getMemory,
  appendMemory,
  searchMemory,
  getAllMemory,
} from "@/lib/db/actions"

const customOpenAI = createOpenAI({
  baseURL: process.env.AI_GATEWAY_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY || "",
  compatibility: "compatible",
})

export async function POST(req: Request) {
  try {
    const { messages: uiMessages, diagnosticData } = await req.json()
    const { convertToModelMessages } = await import("ai")

    // Normalize messages to AI SDK v6 UIMessage format (requires `parts` array)
    const normalizedMessages = (uiMessages || []).map((m: any) => ({
      ...m,
      parts: m.parts ?? (m.content ? [{ type: "text" as const, text: m.content }] : []),
    }))
    const messages = await convertToModelMessages(normalizedMessages)

    // Load persistent memory for this user
    const agentMemory = await getAllMemory()

    // Build rich diagnostic profile
    const scores = diagnosticData ? {
      saude: diagnosticData.score_health ?? 0,
      mente: diagnosticData.score_mind ?? 0,
      produtividade: diagnosticData.score_productivity ?? 0,
      financas: diagnosticData.score_finances ?? 0,
      relacoes: diagnosticData.score_relations ?? 0,
      proposito: diagnosticData.score_purpose ?? 0,
    } : null

    const sortedAreas = scores
      ? Object.entries(scores).sort(([, a], [, b]) => (a as number) - (b as number))
      : []
    const weakAreas = sortedAreas.slice(0, 3).map(([k, v]) => `${k} (${v}/10)`)
    const strongAreas = sortedAreas.slice(-2).reverse().map(([k, v]) => `${k} (${v}/10)`)

    const rawAnswers = diagnosticData?.raw_answers
      ? `\nRespostas do diagnóstico:\n${JSON.stringify(diagnosticData.raw_answers, null, 2)}`
      : ""

    const diagnosticContext = diagnosticData
      ? `
## PERFIL COMPORTAMENTAL DO USUÁRIO:
Scores (0-10): Saúde ${scores!.saude} | Mente ${scores!.mente} | Produtividade ${scores!.produtividade} | Finanças ${scores!.financas} | Relações ${scores!.relacoes} | Propósito ${scores!.proposito}
ÁREAS FRACAS (prioridade): ${weakAreas.join(", ")}
ÁREAS FORTES (alavancas): ${strongAreas.join(", ")}
${rawAnswers}
`
      : ""

    const today = new Date().toISOString().split('T')[0]

    const memoryContext = (agentMemory.soul || agentMemory.memory || agentMemory.skills)
      ? `
## MEMÓRIA PERSISTENTE DO USUÁRIO:
${agentMemory.soul ? `### Soul (personalidade)\n${agentMemory.soul}\n` : ''}
${agentMemory.memory ? `### Memory (fatos e contexto)\n${agentMemory.memory}\n` : ''}
${agentMemory.skills ? `### Skills (habilidades)\n${agentMemory.skills}\n` : ''}
`
      : '\n## MEMÓRIA: Vazia. Use appendMemory para registrar observações sobre o usuário.\n'

    const result = streamText({
      model: customOpenAI.chat(process.env.AI_GATEWAY_MODEL || "openai/o4-mini-high"),
      messages,
      maxSteps: 10,
      system: `Você é a IA Estrategista do NexxaLife — um Sistema Operacional de Evolução Pessoal.

Você tem acesso COMPLETO ao perfil comportamental do usuário baseado no diagnóstico que ele acabou de preencher.

${diagnosticContext}
${memoryContext}

## SEU PAPEL:
Você é um mentor consultivo. Você ANALISA o diagnóstico, faz perguntas investigativas e PROPÕE um plano personalizado ativamente. O usuário NÃO precisa estruturar o plano — VOCÊ faz o trabalho pesado e apenas pede aprovação ou direcionamento.

## FLUXO OBRIGATÓRIO:

### ETAPA 1 - Diagnóstico e Investigação (Primeira mensagem):
- Cumprimente de forma empolgante.
- Faça um breve resumo empático do perfil (elogie as áreas fortes, valide as áreas fracas).
- NUNCA mande uma lista de passos para o usuário fazer. NUNCA peça para o usuário listar suas metas.
- Em vez disso, faça **APENAS UMA** pergunta profunda sobre a área mais fraca do diagnóstico para entender o contexto antes de sugerir metas.
- Exemplo: "Notei que sua saúde está em 3/10. O que tem sido o maior desafio? Falta de tempo, energia ou organização?"

### ETAPA 2 - Sugestão Proativa (Após a resposta do usuário):
- Baseado na resposta, VOCÊ cria as metas. Não peça para o usuário criar.
- Use a ferramenta \`addGoal\` para sugerir 1 a 3 metas baseadas na dor do usuário.
- Use \`addChecklistItem\` e \`addAgendaEvent\` para sugerir a rotina.
- Chame as ferramentas simultaneamente no fundo enquanto explica no texto o que está sugerindo.

### ETAPA 3 - Refinamento:
- Após as aprovações dos cards, pergunte se quer focar em mais alguma área ou finalizar.
- Quando completo, diga para clicar "Finalizar Plano".

## REGRAS CRÍTICAS:
- PROIBIDO enviar listas grandes de passos.
- PROIBIDO dar trabalho para o usuário (ex: "defina 3 metas com título e prazo").
- PROIBIDO fazer mais de 1 pergunta por vez.
- Português do Brasil sempre. Respostas CURTAS e DIREÇÕES CLARAS.

## LÓGICA DE SUGESTÃO (Quando usar as ferramentas):
- Score ≤ 3: Metas de RECUPERAÇÃO (urgentes, ações simples diárias)
- Score 4-6: Metas de DESENVOLVIMENTO (hábitos semanais progressivos)
- Score ≥ 7: Metas de EXCELÊNCIA (otimização, desafios avançados)
- Data de hoje: ${today}.

## MEMÓRIA:
- Na PRIMEIRA interação com um usuário novo, use appendMemory para registrar observações iniciais no 'soul' e 'memory'
- Sempre que descobrir algo novo sobre o usuário (preferências, desafios, vitórias, padrões), registre em appendMemory
- Use readMemory antes de fazer sugestões personalizadas
- Use searchMemory para buscar informações específicas
- soul = personalidade, valores, estilo de comunicação
- memory = fatos, decisões, datas importantes, contexto
- skills = habilidades, forças, expertise, padrões recorrentes`,
      tools: {
        addGoal: tool({
          description: "Cria uma meta estratégica. Use os dados do diagnóstico para sugerir metas inteligentes e relevantes.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              title: { type: "string", description: "Título da meta (claro e inspirador)" },
              description: { type: "string", description: "Descrição detalhada da meta" },
              category: { type: "string", description: "Categoria (Saúde, Mente, Produtividade, Finanças, Relações, Propósito)" },
            },
            required: ["title", "description", "category"],
          }),
          // No execute → client-side tool (requires user approval)
        }),
        addChecklistItem: tool({
          description: "Adiciona uma tarefa concreta ao checklist semanal do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              label: { type: "string", description: "Descrição da tarefa (ação concreta)" },
              priority: { type: "string", enum: ["high", "medium", "low"], description: "Prioridade" },
              category: { type: "string", description: "Categoria" },
              date: { type: "string", description: "Data YYYY-MM-DD (padrão: hoje)" },
            },
            required: ["label", "priority", "category", "date"],
          }),
          // No execute → client-side tool
        }),
        addAgendaEvent: tool({
          description: "Agenda um evento ou bloco de foco para o usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              title: { type: "string", description: "Título do evento" },
              date: { type: "string", description: "Data YYYY-MM-DD" },
              startTime: { type: "string", description: "Hora início HH:MM" },
              endTime: { type: "string", description: "Hora término HH:MM" },
              type: { type: "string", enum: ["focus", "meeting", "personal", "health"], description: "Tipo" },
            },
            required: ["title", "date", "startTime", "endTime", "type"],
          }),
          // No execute → client-side tool
        }),
        addJournalEntry: tool({
          description: "Salva uma reflexão ou nota no diário do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              content: { type: "string", description: "Conteúdo da reflexão" },
              mood: { type: "string", enum: ["great", "good", "neutral", "bad", "awful"], description: "Humor" },
            },
            required: ["content", "mood"],
          }),
          // No execute → client-side tool
        }),
        getGoals: tool({
          description: "Consulta as metas já criadas do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              _reason: { type: "string", description: "Motivo da busca" },
            },
            required: ["_reason"],
          }),
          execute: async () => await getGoals(),
        }),
        getChecklist: tool({
          description: "Consulta o checklist do dia.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              date: { type: "string", description: "Data YYYY-MM-DD (envie 'hoje' ou a data)" },
            },
            required: ["date"],
          }),
          execute: async ({ date }) => await getChecklist(date === "hoje" || date === "" ? undefined : date),
        }),
        getAgenda: tool({
          description: "Consulta a agenda do dia.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              date: { type: "string", description: "Data YYYY-MM-DD (envie 'hoje' ou a data)" },
            },
            required: ["date"],
          }),
          execute: async ({ date }) => await getAgenda(date === "hoje" || date === "" ? undefined : date),
        }),

        // ─── MEMORY TOOLS ─────────────────────────────────
        readMemory: tool({
          description: "Lê um arquivo de memória do usuário. Tipos: 'soul' (personalidade), 'memory' (fatos/contexto), 'skills' (habilidades). Use para personalizar sugestões.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              memoryType: { type: "string", enum: ["soul", "memory", "skills"], description: "Tipo da memória" },
            },
            required: ["memoryType"],
          }),
          execute: async ({ memoryType }) => {
            const content = await getMemory(memoryType)
            return content || `(${memoryType}.md está vazio)`
          },
        }),
        appendMemory: tool({
          description: "Adiciona uma observação à memória do usuário. Use para registrar insights, preferências, padrões. SEMPRE registre quando descobrir algo novo.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              memoryType: { type: "string", enum: ["soul", "memory", "skills"], description: "Tipo" },
              entry: { type: "string", description: "Conteúdo markdown a adicionar" },
            },
            required: ["memoryType", "entry"],
          }),
          execute: async ({ memoryType, entry }) => {
            await appendMemory(memoryType, entry)
            return { success: true, message: `Registrado em ${memoryType}.md` }
          },
        }),
        searchMemory: tool({
          description: "Busca texto nas memórias do usuário. Use para encontrar informações específicas antes de sugerir algo.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              query: { type: "string", description: "Termo de busca" },
            },
            required: ["query"],
          }),
          execute: async ({ query }) => {
            const results = await searchMemory(query)
            return results.length > 0 ? results : "Nenhum resultado encontrado"
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[Planning Chat Error]:", error)

    const mockResponse = "Olá! Como nossa conexão de IA não está configurada no momento, estou em modo de simulação. Vi que o seu diagnóstico mostrou algumas oportunidades incríveis nas áreas prioritárias. O que você acha de focarmos em melhorar a consistência da sua rotina na próxima semana? Me conte o que tem em mente!"

    const { createUIMessageStreamResponse, createUIMessageStream } = await import("ai")

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        execute: async ({ writer }) => {
          const words = mockResponse.split(" ")
          for (const word of words) {
            writer.write({ type: "text", text: word + " " })
            await new Promise(r => setTimeout(r, 50))
          }
        },
      }),
    })
  }
}
