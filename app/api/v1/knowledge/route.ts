import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { listKnowledgeCapabilities, parseCreateKnowledgeSourceInput } from "@/modules/knowledge/contracts"
import { createKnowledgeSource, listKnowledgeSources } from "@/modules/knowledge/repository"

export async function GET() {
  return NextResponse.json({
    module: "knowledge",
    status: "operational",
    capabilities: listKnowledgeCapabilities(),
    items: await listKnowledgeSources(),
  })
}

export async function POST(request: Request) {
  try {
    const payload = parseCreateKnowledgeSourceInput(await request.json())
    const item = await createKnowledgeSource(payload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_knowledge_payload", details: error.issues }, { status: 400 })
    }
    throw error
  }
}
