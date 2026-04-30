import { NextResponse } from "next/server"

import { listConversations } from "@/modules/conversations/repository"

export async function GET() {
  return NextResponse.json({
    items: await listConversations(),
  })
}
