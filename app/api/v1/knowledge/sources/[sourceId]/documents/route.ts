import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseCreateKnowledgeDocumentInput } from "@/modules/knowledge/contracts"
import { createKnowledgeDocument, listKnowledgeDocuments } from "@/modules/knowledge/repository"

export async function GET(_request: Request, context: { params: Promise<{ sourceId: string }> }) {
  const { sourceId } = await context.params
  return NextResponse.json({ items: await listKnowledgeDocuments(sourceId) })
}

export async function POST(request: Request, context: { params: Promise<{ sourceId: string }> }) {
  try {
    const { sourceId } = await context.params
    const payload = parseCreateKnowledgeDocumentInput({ ...(await request.json()), sourceId })
    const item = await createKnowledgeDocument(payload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_knowledge_document_payload", details: error.issues }, { status: 400 })
    }
    throw error
  }
}
