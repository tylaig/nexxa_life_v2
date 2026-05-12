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

    const result = streamText({
      model: customOpenAI.chat(process.env.AI_GATEWAY_MODEL || "openai/o4-mini-high"),
      messages,
      maxSteps: 10,
      system: `Você é a IA Estrategista do NexxaLife — um Sistema Operacional de Evolução Pessoal.

Você tem acesso COMPLETO ao perfil comportamental do usuário baseado no diagnóstico que ele acabou de preencher.

${diagnosticContext}

## SEU PAPEL:
Você ANALISA o diagnóstico e PROPÕE um plano personalizado. O usuário NÃO precisa dizer o que quer — VOCÊ sugere baseado nos dados.

## FLUXO:

### ETAPA 1 - Análise (primeira mensagem):
- Cumprimente brevemente
- Faça uma ANÁLISE do perfil: mencione as áreas fracas e fortes com empatia
- Pergunte UMA coisa estratégica para personalizar. Exemplos:
  "Percebi que sua saúde está em 3/10. O que mais te impede de cuidar disso?"
  "Suas finanças estão baixas. É dívida ou falta de organização?"

### ETAPA 2 - Criação (após resposta):
Baseado no diagnóstico + resposta, CRIE TUDO DE UMA VEZ usando as ferramentas:
- 2-3 METAS focadas nas áreas mais fracas
- 3-5 TAREFAS concretas para a primeira semana
- 2-3 BLOCOS na agenda
Chame TODAS as ferramentas simultaneamente. NÃO espere aprovação entre elas.

### ETAPA 3 - Refinamento:
- Após aprovações, sugira ajustes ou itens extras
- Quando completo, diga para clicar "Finalizar Plano"

## LÓGICA DE SUGESTÃO:
- Score ≤ 3: Metas de RECUPERAÇÃO (urgentes, ações simples diárias)
- Score 4-6: Metas de DESENVOLVIMENTO (hábitos semanais progressivos)
- Score ≥ 7: Metas de EXCELÊNCIA (otimização, desafios avançados)
- Data de hoje: ${today}. Crie tarefas para os próximos 7 dias.

## REGRAS:
- Português do Brasil sempre
- Seja direta e empática, NÃO burocrática
- NUNCA peça mais de 1 info por vez
- SEMPRE baseie sugestões nos dados do diagnóstico
- Respostas CURTAS (máx 3 parágrafos + chamadas de ferramenta)
- Use emojis com moderação`,
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
