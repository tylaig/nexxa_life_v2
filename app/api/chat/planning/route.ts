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

    const diagnosticContext = diagnosticData
      ? `
## DADOS DO DIAGNÓSTICO DO USUÁRIO (acabou de ser preenchido):
- Saúde: ${diagnosticData.score_health}/10
- Mente: ${diagnosticData.score_mind}/10
- Produtividade: ${diagnosticData.score_productivity}/10
- Finanças: ${diagnosticData.score_finances}/10
- Relações: ${diagnosticData.score_relations}/10
- Propósito: ${diagnosticData.score_purpose}/10
- Insight da IA: ${diagnosticData.insight || "N/A"}
- Áreas prioritárias: ${diagnosticData.priorities?.join(", ") || "N/A"}
`
      : ""

    const result = streamText({
      model: customOpenAI.chat(process.env.AI_GATEWAY_MODEL || "openai/o4-mini-high"),
      messages,
      maxSteps: 10,
      system: `Você é a IA Estrategista do NexxaLife — um Sistema Operacional de Evolução Pessoal.

O usuário ACABOU de completar seu diagnóstico inicial e agora você vai conduzir uma SESSÃO DE PLANEJAMENTO personalizada.

${diagnosticContext}

## SEU PAPEL:
Você é uma consultora de vida estratégica. Seja PROATIVA e ORIENTADA A AÇÃO.

## COMPORTAMENTO PRINCIPAL:
- Quando o usuário mencionar QUALQUER meta, objetivo ou desejo → CHAME A FERRAMENTA IMEDIATAMENTE
- NÃO fique pedindo mais detalhes. Use o que o usuário disse + contexto do diagnóstico para preencher campos faltantes com valores inteligentes
- Se o usuário disser "meta de exercício", crie a meta com título, descrição motivadora e categoria inferidos automaticamente
- Se o usuário disser "tudo teste" ou for vago, assuma defaults razoáveis e CRIE

## FLUXO:
1. **Saudação curta** — Cumprimente brevemente e mencione 1-2 pontos do diagnóstico
2. **Pergunte UMA coisa** — "Qual é seu principal objetivo agora?" (só UMA pergunta)
3. **Crie IMEDIATAMENTE** — Assim que o usuário responder, chame as ferramentas para criar metas, checklist e agenda
4. **Continue criando** — Após cada aprovação/rejeição, sugira mais itens relacionados
5. **Encerramento** — Diga para clicar em "Finalizar Plano"

## REGRAS:
- Responda SEMPRE em Português do Brasil
- Seja direta e encorajadora, NÃO seja burocrática
- NUNCA peça mais de 1 informação por vez
- Quando em dúvida sobre categoria/descrição → INVENTE algo motivador e relevante
- Use emojis com moderação
- Mantenha respostas CURTAS (máximo 3 parágrafos)
- SEMPRE chame pelo menos 1 ferramenta quando o usuário expressar um objetivo`,
      tools: {
        // NOTE: AI SDK v6 uses `inputSchema` (not `parameters`)
        addGoal: tool({
          description: "Cria uma meta. CHAME IMEDIATAMENTE quando o usuário mencionar qualquer objetivo. Preencha campos faltantes com valores inteligentes.",
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
