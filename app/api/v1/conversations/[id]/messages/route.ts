import { NextResponse } from "next/server"

import { parseSendMessageInput } from "@/modules/conversations/contracts"
import { sendMessage } from "@/modules/conversations/repository"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const payload = parseSendMessageInput(await request.json())
    const item = await sendMessage({
      conversationId: id,
      ...payload,
    })

    return NextResponse.json({ item })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send message"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
