// @ts-nocheck
import { NextResponse } from "next/server"
import { streamText, tool } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { z } from "zod"

import {
  getChecklist,
  addChecklistItem,
  getGoals,
  addGoal,
  getAgenda,
  addAgendaEvent,
  addJournalEntry,
  getDiagnosticResult,
} from "@/lib/db/actions"

const customOpenAI = createOpenAI({
  baseURL: process.env.AI_GATEWAY_BASE_URL || "https://proxy.ia.meusuper.app/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY || "API-123456",
  compatibility: "compatible",
})

export async function POST(req: Request) {
  try {
    const { messages: uiMessages, diagnosticData } = await req.json()
    const { convertToModelMessages } = await import("ai")
    const messages = await convertToModelMessages(uiMessages || [])

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
      model: customOpenAI(process.env.AI_GATEWAY_MODEL || "gpt-5.4"),
      messages,
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
        addGoal: tool({
          description: "Cria uma nova meta estratégica para o usuário. Use após discutir objetivos.",
          parameters: z.object({
            title: z.string().describe("Título da meta (claro e inspirador)"),
            description: z.string().describe("Descrição detalhada da meta"),
            category: z.string().describe("Categoria (Saúde, Mente, Produtividade, Finanças, Relações, Propósito)"),
          }).strict(),
          execute: async (params) => {
            await addGoal(params)
            return { success: true, message: `Meta "${params.title}" criada com sucesso` }
          },
        }),
        addChecklistItem: tool({
          description: "Adiciona uma tarefa concreta ao checklist semanal do usuário.",
          parameters: z.object({
            label: z.string().describe("Descrição da tarefa (ação concreta)"),
            priority: z.enum(["high", "medium", "low"]).describe("Prioridade"),
            category: z.string().describe("Categoria"),
            date: z.string().describe("Data YYYY-MM-DD (padrão: hoje)"),
          }),
          execute: async (params) => {
            await addChecklistItem(params)
            return { success: true, message: `Tarefa "${params.label}" adicionada` }
          },
        }),
        addAgendaEvent: tool({
          description: "Agenda um evento ou bloco de foco para o usuário.",
          parameters: z.object({
            title: z.string().describe("Título do evento"),
            date: z.string().describe("Data YYYY-MM-DD"),
            startTime: z.string().describe("Hora início HH:MM"),
            endTime: z.string().describe("Hora término HH:MM"),
            type: z.enum(["focus", "meeting", "personal", "health"]).describe("Tipo"),
          }),
          execute: async (params) => {
            await addAgendaEvent(params)
            return { success: true, message: `Evento "${params.title}" agendado` }
          },
        }),
        addJournalEntry: tool({
          description: "Salva uma reflexão ou nota no diário do usuário.",
          parameters: z.object({
            content: z.string().describe("Conteúdo da reflexão"),
            mood: z.enum(["great", "good", "neutral", "bad", "awful"]).describe("Humor (opcional)"),
          }),
          execute: async (params) => {
            await addJournalEntry(params)
            return { success: true, message: "Reflexão salva no diário" }
          },
        }),
        getGoals: tool({
          description: "Consulta as metas já criadas do usuário.",
          parameters: z.object({ query: z.string().describe("deixe vazio") }),
          execute: async () => await getGoals(),
        }),
        getChecklist: tool({
          description: "Consulta o checklist do dia.",
          parameters: z.object({ date: z.string().describe("Data YYYY-MM-DD (deixe vazio para hoje)") }),
          execute: async ({ date }) => await getChecklist(date === "deixe vazio" ? undefined : date),
        }),
        getAgenda: tool({
          description: "Consulta a agenda do dia.",
          parameters: z.object({ date: z.string().describe("Data YYYY-MM-DD (deixe vazio para hoje)") }),
          execute: async ({ date }) => await getAgenda(date === "deixe vazio" ? undefined : date),
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
