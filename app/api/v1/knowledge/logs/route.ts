import { NextResponse } from "next/server"

import { listKnowledgeRetrievalLogs } from "@/modules/knowledge/repository"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sourceId = searchParams.get("sourceId") ?? undefined

  return NextResponse.json({
    items: await listKnowledgeRetrievalLogs(sourceId),
  })
}
