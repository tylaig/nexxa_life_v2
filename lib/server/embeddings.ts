import { getAppEnv } from "@/lib/server/env"

type EmbeddingResult = {
  values: number[]
  model: string
  provider: "gateway" | "fallback"
  dimensions: number
}

function buildFallbackEmbedding(input: string, dimensions = 1536) {
  return Array.from({ length: dimensions }, (_, index) => {
    const charCode = input.charCodeAt(index % Math.max(input.length, 1)) || 0
    return Number(((charCode % 97) / 100).toFixed(6))
  })
}

export function isEmbeddingGatewayConfigured() {
  const env = getAppEnv()
  return Boolean(env.AI_GATEWAY_BASE_URL && env.AI_GATEWAY_API_KEY)
}

export async function generateTextEmbedding(input: string): Promise<EmbeddingResult> {
  const env = getAppEnv()
  const model = env.AI_GATEWAY_EMBEDDING_MODEL

  if (!env.AI_GATEWAY_BASE_URL || !env.AI_GATEWAY_API_KEY) {
    const values = buildFallbackEmbedding(input)
    return {
      values,
      model,
      provider: "fallback",
      dimensions: values.length,
    }
  }

  try {
    const response = await fetch(`${env.AI_GATEWAY_BASE_URL.replace(/\/$/, "")}/embeddings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.AI_GATEWAY_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        input,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`embedding gateway responded with ${response.status}`)
    }

    const payload = (await response.json()) as { data?: Array<{ embedding?: number[] }>; model?: string }
    const values = payload.data?.[0]?.embedding

    if (!Array.isArray(values) || values.length === 0) {
      throw new Error("embedding gateway returned an invalid payload")
    }

    return {
      values,
      model: payload.model ?? model,
      provider: "gateway",
      dimensions: values.length,
    }
  } catch {
    const values = buildFallbackEmbedding(input)
    return {
      values,
      model,
      provider: "fallback",
      dimensions: values.length,
    }
  }
}

export function embeddingToPgVector(values: number[]) {
  return `[${values.join(",")}]`
}
