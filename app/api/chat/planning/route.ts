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
      maxSteps: 10, // agentic loop: AI can call tools and continue generating
      system: `Você é a IA Estrategista do NexxaLife — um Sistema Operacional de Evolução Pessoal.

O usuário ACABOU de completar seu diagnóstico inicial e agora você vai conduzir uma SESSÃO DE PLANEJAMENTO personalizada.

${diagnosticContext}

## SEU PAPEL:
Você é uma consultora de vida estratégica. Conduza uma conversa natural e empática para criar o plano de evolução do usuário.

## FLUXO DA SESSÃO:
1. **Saudação** — Cumprimente e apresente um resumo rápido do diagnóstico (mencione pontos fortes e áreas de atenção)
2. **Exploração** — Faça 2-3 perguntas sobre os objetivos imediatos do usuário (o que quer conquistar nos próximos 30 dias?)
3. **Criação do Plano** — Use as ferramentas para criar:
   - 2-3 METAS estratégicas alinhadas com as áreas prioritárias
   - 5-7 itens de CHECKLIST para a semana atual (ações concretas e executáveis)
   - 2-3 EVENTOS na agenda (blocos de foco, check-ins, etc.)
4. **Encerramento** — Resuma o que foi criado e encoraje o usuário a ir para o Dashboard

## REGRAS:
- Responda SEMPRE em Português do Brasil
- Seja empática, direta e encorajadora
- NÃO crie tudo de uma vez. Converse primeiro, depois vá criando progressivamente
- Cada meta deve ter título claro e descrição motivadora
- Cada item de checklist deve ser uma ação CONCRETA e realizável
- Use emojis com moderação para manter a experiência leve
- Quando terminar de criar o plano, diga ao usuário para clicar em "Ir para o Dashboard"`,
      tools: {
        // NOTE: AI SDK v6 uses `inputSchema` (not `parameters`)
        addGoal: tool({
          description: "Cria uma nova meta estratégica para o usuário. Use após discutir objetivos.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              title: { type: "string", description: "Título da meta (claro e inspirador)" },
              description: { type: "string", description: "Descrição detalhada da meta" },
              category: { type: "string", description: "Categoria (Saúde, Mente, Produtividade, Finanças, Relações, Propósito)" },
            },
            required: ["title", "description", "category"],
          }),
          execute: async (params) => {
            await addGoal(params)
            return { success: true, message: `Meta "${params.title}" criada com sucesso` }
          },
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
          execute: async (params) => {
            await addChecklistItem(params)
            return { success: true, message: `Tarefa "${params.label}" adicionada` }
          },
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
          execute: async (params) => {
            await addAgendaEvent(params)
            return { success: true, message: `Evento "${params.title}" agendado` }
          },
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
          execute: async (params) => {
            await addJournalEntry(params)
            return { success: true, message: "Reflexão salva no diário" }
          },
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
