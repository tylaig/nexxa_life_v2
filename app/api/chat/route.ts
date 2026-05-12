// @ts-nocheck
import { streamText, tool, jsonSchema } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

import {
  getChecklist,
  addChecklistItem,
  toggleChecklistItem,
  getGoals,
  addGoal,
  getAgenda,
  addAgendaEvent,
  getJournalEntries,
  addJournalEntry,
} from "@/lib/db/actions"

const customOpenAI = createOpenAI({
  baseURL: process.env.AI_GATEWAY_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY || "",
  compatibility: "compatible",
})

export async function POST(req: Request) {
  try {
    const { messages: uiMessages } = await req.json()
    const { convertToModelMessages } = await import("ai")

    // Normalize messages to AI SDK v6 UIMessage format (requires `parts` array)
    const normalizedMessages = (uiMessages || []).map((m: any) => ({
      ...m,
      parts: m.parts ?? (m.content ? [{ type: "text" as const, text: m.content }] : []),
    }))
    const messages = await convertToModelMessages(normalizedMessages)

    const result = streamText({
      model: customOpenAI.chat(process.env.AI_GATEWAY_MODEL || "openai/o4-mini-high"),
      messages,
      maxSteps: 10, // agentic loop: AI can call tools and continue generating
      system: `Você é a IA do NexxaLife, um assistente pessoal focado na evolução do usuário. 
Você ajuda o usuário a gerenciar seu ciclo de vida: Metas, Checklist (tarefas), Agenda, e Diário.
Você deve ser proativo, conciso e usar as ferramentas disponíveis para consultar e salvar dados no banco de dados do usuário.
Responda sempre em Português do Brasil. Mantenha um tom encorajador e direto.`,
      tools: {
        // NOTE: AI SDK v6 uses `inputSchema` (not `parameters`)
        getChecklist: tool({
          description: "Consulta o checklist (tarefas diárias) do usuário para uma data específica (padrão: hoje).",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              date: { type: "string", description: "Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)" },
            },
            required: ["date"],
          }),
          execute: async ({ date }) => {
            const data = await getChecklist(date === "hoje" || date === "" || date === "deixe vazio" ? undefined : date)
            return data
          },
        }),
        addChecklistItem: tool({
          description: "Adiciona uma nova tarefa ao checklist diário do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              label: { type: "string", description: "Descrição da tarefa" },
              priority: { type: "string", enum: ["high", "medium", "low"], description: "Prioridade da tarefa" },
              category: { type: "string", description: "Categoria (ex: Trabalho, Saúde, Pessoal)" },
              date: { type: "string", description: "Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)" },
            },
            required: ["label", "priority", "category", "date"],
          }),
          execute: async (params) => {
            const finalDate = params.date === "hoje" || params.date === "" ? undefined : params.date
            await addChecklistItem({ ...params, date: finalDate })
            return { success: true, message: "Tarefa adicionada com sucesso" }
          },
        }),
        toggleChecklistItem: tool({
          description: "Marca uma tarefa do checklist como concluída ou pendente.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              id: { type: "string", description: "ID da tarefa" },
              done: { type: "boolean", description: "Status (true para concluída, false para pendente)" },
            },
            required: ["id", "done"],
          }),
          execute: async ({ id, done }) => {
            await toggleChecklistItem(id, done)
            return { success: true, message: `Tarefa marcada como ${done ? "concluída" : "pendente"}` }
          },
        }),
        getGoals: tool({
          description: "Consulta as metas ativas do usuário e seus marcos (milestones).",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              _reason: { type: "string", description: "Breve justificativa para a busca (ex: 'analisar metas')" },
            },
            required: ["_reason"],
          }),
          execute: async () => {
            const data = await getGoals()
            return data
          },
        }),
        addGoal: tool({
          description: "Cria uma nova meta para o usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              title: { type: "string", description: "Título da meta" },
              description: { type: "string", description: "Descrição detalhada" },
              category: { type: "string", description: "Categoria (ex: Profissional, Pessoal, Financeiro)" },
            },
            required: ["title", "description", "category"],
          }),
          execute: async (params) => {
            await addGoal(params)
            return { success: true, message: "Meta criada com sucesso" }
          },
        }),
        getAgenda: tool({
          description: "Consulta a agenda (eventos) do usuário para uma data específica.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              date: { type: "string", description: "Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)" },
            },
            required: ["date"],
          }),
          execute: async ({ date }) => {
            const data = await getAgenda(date === "hoje" || date === "" || date === "deixe vazio" ? undefined : date)
            return data
          },
        }),
        addAgendaEvent: tool({
          description: "Adiciona um novo evento na agenda do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              title: { type: "string", description: "Título do evento" },
              date: { type: "string", description: "Data no formato YYYY-MM-DD" },
              startTime: { type: "string", description: "Hora de início no formato HH:MM" },
              endTime: { type: "string", description: "Hora de término no formato HH:MM" },
              type: { type: "string", enum: ["focus", "meeting", "personal", "health"], description: "Tipo de evento" },
            },
            required: ["title", "date", "startTime", "endTime", "type"],
          }),
          execute: async (params) => {
            await addAgendaEvent(params)
            return { success: true, message: "Evento adicionado com sucesso" }
          },
        }),
        getJournalEntries: tool({
          description: "Consulta as últimas entradas do diário do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              _reason: { type: "string", description: "Breve justificativa para consultar o diário" },
            },
            required: ["_reason"],
          }),
          execute: async () => {
            const data = await getJournalEntries()
            return data
          },
        }),
        addJournalEntry: tool({
          description: "Adiciona uma nova entrada no diário (journal) do usuário.",
          inputSchema: jsonSchema({
            type: "object",
            properties: {
              content: { type: "string", description: "Conteúdo da entrada ou reflexão" },
              mood: { type: "string", enum: ["great", "good", "neutral", "bad", "awful"], description: "Humor" },
              tags: { type: "array", items: { type: "string" }, description: "Tags relacionadas" },
            },
            required: ["content", "mood", "tags"],
          }),
          execute: async (params) => {
            await addJournalEntry(params)
            return { success: true, message: "Entrada de diário salva com sucesso" }
          },
        }),
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[General Chat Error]:", error)

    const mockResponse = "Olá! Como nossa conexão de IA não está configurada no momento, estou em modo de simulação. Aqui no AI Studio eu consigo te ajudar a criar metas, registrar diários e organizar sua agenda. O que vamos construir hoje?"

    const { createDataStreamResponse } = await import("ai")

    return createDataStreamResponse({
      execute: async (dataStream) => {
        const words = mockResponse.split(" ")
        for (const word of words) {
          dataStream.writeData(word + " ")
          await new Promise(r => setTimeout(r, 50))
        }
      },
    })
  }
}
