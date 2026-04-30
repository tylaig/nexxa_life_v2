import { NextResponse } from "next/server"

import { parseStatusUpdateInput } from "@/modules/conversations/contracts"
import { updateConversationStatus } from "@/modules/conversations/repository"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const payload = parseStatusUpdateInput(await request.json())
    const item = await updateConversationStatus({
      conversationId: id,
      status: payload.status,
    })

    return NextResponse.json({ item })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update conversation status"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
