import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseKnowledgeRetrievalQueryInput } from "@/modules/knowledge/contracts"
import { runKnowledgeRetrieval } from "@/modules/knowledge/repository"

export async function POST(request: Request) {
  try {
    const payload = parseKnowledgeRetrievalQueryInput(await request.json())
    return NextResponse.json(await runKnowledgeRetrieval(payload))
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_knowledge_retrieval_payload", details: error.issues }, { status: 400 })
    }
    throw error
  }
}
