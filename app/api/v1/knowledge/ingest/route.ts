import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseCreateKnowledgeSourceInput } from "@/modules/knowledge/contracts"
import { runKnowledgeIngest } from "@/modules/knowledge/repository"

export async function POST(request: Request) {
  try {
    const payload = parseCreateKnowledgeSourceInput(await request.json())
    const item = await runKnowledgeIngest(payload)
    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_knowledge_ingest_payload", details: error.issues }, { status: 400 })
    }
    throw error
  }
}
