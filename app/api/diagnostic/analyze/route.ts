// @ts-nocheck
import { NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

const customOpenAI = createOpenAI({
  baseURL: process.env.AI_GATEWAY_BASE_URL || "https://proxy.ia.meusuper.app/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY || "API-123456",
})

export async function POST(req: Request) {
  try {
    const { answers, questions } = await req.json()

    // Build a prompt with the user's answers
    const answersText = questions.map((q: any) => {
      const score = answers[q.id] ?? "sem resposta"
      const areaLabels: Record<string, string> = {
        health: "Saúde",
        mind: "Mente",
        productivity: "Produtividade",
        finances: "Finanças",
        relations: "Relações",
        purpose: "Propósito",
      }
      return `[${areaLabels[q.area] || q.area}] "${q.question_text}" → Nota: ${score}/10`
    }).join("\n")

    const result = await generateText({
      model: customOpenAI(process.env.AI_GATEWAY_MODEL || "gpt-5.4"),
      prompt: `Você é o motor de análise do NexxaLife, um sistema operacional de evolução pessoal.

O usuário acabou de responder um diagnóstico inicial com notas de 0 a 10. Analise as respostas e retorne EXCLUSIVAMENTE um JSON válido (sem markdown, sem texto antes/depois) com:

1. scores: médias calculadas por área (0–10, inteiros)
2. insight: texto de 2–3 frases resumindo o momento do usuário
3. priorities: array com as 2 áreas que mais precisam de atenção (do pior para o melhor)

Respostas do diagnóstico:
${answersText}

Responda APENAS com o JSON no formato:
{"scores":{"health":N,"mind":N,"productivity":N,"finances":N,"relations":N,"purpose":N},"insight":"...","priorities":["area1","area2"]}`,
    })

    // Parse the AI response
    let analysis
    try {
      const text = result.text.trim()
      // Try to extract JSON from potential markdown wrapping
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text)
    } catch {
      // Fallback: calculate scores manually from raw answers
      const areaScores: Record<string, number[]> = {}
      for (const q of questions) {
        if (!areaScores[q.area]) areaScores[q.area] = []
        if (answers[q.id] !== undefined) areaScores[q.area].push(answers[q.id])
      }

      const scores: Record<string, number> = {}
      for (const [area, vals] of Object.entries(areaScores)) {
        scores[area] = vals.length > 0
          ? Math.round(vals.reduce((a: number, b: number) => a + b, 0) / vals.length)
          : 5
      }

      analysis = {
        scores,
        insight: "Análise baseada nas suas respostas. Continue acompanhando seu progresso no NexxaLife.",
        priorities: Object.entries(scores)
          .sort(([, a], [, b]) => (a as number) - (b as number))
          .slice(0, 2)
          .map(([area]) => area),
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("[Diagnostic Analyze Error]:", error)
    return NextResponse.json(
      { error: "Failed to analyze diagnostic" },
      { status: 500 }
    )
  }
}
