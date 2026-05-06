// @ts-nocheck
import { NextResponse } from "next/server"
import { streamText, tool } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { z } from "zod"

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
  baseURL: process.env.AI_GATEWAY_BASE_URL || "https://proxy.ia.meusuper.app/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY || "API-123456",
  compatibility: "compatible",
})

export async function POST(req: Request) {
  try {
    const { messages: uiMessages } = await req.json()
    const { convertToModelMessages } = await import("ai")
    const messages = await convertToModelMessages(uiMessages || [])

    const result = streamText({
      model: customOpenAI(process.env.AI_GATEWAY_MODEL || "gpt-5.4"),
      messages,
      system: `Você é a IA do NexxaLife, um assistente pessoal focado na evolução do usuário. 
Você ajuda o usuário a gerenciar seu ciclo de vida: Metas, Checklist (tarefas), Agenda, e Diário.
Você deve ser proativo, conciso e usar as ferramentas disponíveis para consultar e salvar dados no banco de dados do usuário.
Responda sempre em Português do Brasil. Mantenha um tom encorajador e direto.`,
      tools: {
        getChecklist: tool({
          description: "Consulta o checklist (tarefas diárias) do usuário para uma data específica (padrão: hoje).",
          parameters: z.object({
            date: z.string().describe("Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)"),
          }),
          execute: async ({ date }) => {
            const data = await getChecklist(date === "hoje" || date === "" || date === "deixe vazio" ? undefined : date)
            return data
          },
        }),
        addChecklistItem: tool({
          description: "Adiciona uma nova tarefa ao checklist diário do usuário.",
          parameters: z.object({
            label: z.string().describe("Descrição da tarefa"),
            priority: z.enum(["high", "medium", "low"]).describe("Prioridade da tarefa"),
            category: z.string().describe("Categoria (ex: Trabalho, Saúde, Pessoal)"),
            date: z.string().describe("Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)"),
          }),
          execute: async (params) => {
            const finalDate = params.date === "hoje" || params.date === "" ? undefined : params.date
            await addChecklistItem({ ...params, date: finalDate })
            return { success: true, message: "Tarefa adicionada com sucesso" }
          },
        }),
        toggleChecklistItem: tool({
          description: "Marca uma tarefa do checklist como concluída ou pendente.",
          parameters: z.object({
            id: z.string().describe("ID da tarefa"),
            done: z.boolean().describe("Status (true para concluída, false para pendente)"),
          }),
          execute: async ({ id, done }) => {
            await toggleChecklistItem(id, done)
            return { success: true, message: `Tarefa marcada como ${done ? "concluída" : "pendente"}` }
          },
        }),
        getGoals: tool({
          description: "Consulta as metas ativas do usuário e seus marcos (milestones).",
          parameters: z.object({
            _reason: z.string().describe("Breve justificativa para a busca (ex: 'analisar metas')"),
          }),
          execute: async () => {
            const data = await getGoals()
            return data
          },
        }),
        addGoal: tool({
          description: "Cria uma nova meta para o usuário.",
          parameters: z.object({
            title: z.string().describe("Título da meta"),
            description: z.string().describe("Descrição detalhada"),
            category: z.string().describe("Categoria (ex: Profissional, Pessoal, Financeiro)"),
          }),
          execute: async (params) => {
            await addGoal(params)
            return { success: true, message: "Meta criada com sucesso" }
          },
        }),
        getAgenda: tool({
          description: "Consulta a agenda (eventos) do usuário para uma data específica.",
          parameters: z.object({
            date: z.string().describe("Data no formato YYYY-MM-DD (envie 'hoje' ou a data específica)"),
          }),
          execute: async ({ date }) => {
            const data = await getAgenda(date === "hoje" || date === "" || date === "deixe vazio" ? undefined : date)
            return data
          },
        }),
        addAgendaEvent: tool({
          description: "Adiciona um novo evento na agenda do usuário.",
          parameters: z.object({
            title: z.string().describe("Título do evento"),
            date: z.string().describe("Data no formato YYYY-MM-DD"),
            startTime: z.string().describe("Hora de início no formato HH:MM"),
            endTime: z.string().describe("Hora de término no formato HH:MM"),
            type: z.enum(["focus", "meeting", "personal", "health"]).describe("Tipo de evento"),
          }),
          execute: async (params) => {
            await addAgendaEvent(params)
            return { success: true, message: "Evento adicionado com sucesso" }
          },
        }),
        getJournalEntries: tool({
          description: "Consulta as últimas entradas do diário do usuário.",
          parameters: z.object({
            _reason: z.string().describe("Breve justificativa para consultar o diário"),
          }),
          execute: async () => {
            const data = await getJournalEntries()
            return data
          },
        }),
        addJournalEntry: tool({
          description: "Adiciona uma nova entrada no diário (journal) do usuário.",
          parameters: z.object({
            content: z.string().describe("Conteúdo da entrada ou reflexão"),
            mood: z.enum(["great", "good", "neutral", "bad", "awful"]).describe("Humor (opcional)"),
            tags: z.array(z.string()).describe("Tags relacionadas"),
          }),
          execute: async (params) => {
            await addJournalEntry(params)
            return { success: true, message: "Entrada de diário salva com sucesso" }
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[General Chat Error]:", error)

    const mockResponse = "Olá! Como nossa conexão de IA não está configurada no momento, estou em modo de simulação. Aqui no AI Studio eu consigo te ajudar a criar metas, registrar diários e organizar sua agenda. O que vamos construir hoje?"
    
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
