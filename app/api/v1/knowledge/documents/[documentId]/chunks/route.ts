import { NextResponse } from "next/server"

import { listKnowledgeChunks } from "@/modules/knowledge/repository"

export async function GET(_request: Request, context: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await context.params
  const items = await listKnowledgeChunks(documentId)
  return NextResponse.json({ items })
}
