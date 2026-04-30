import type { ComposerMode } from "@/components/inbox/composer"
import type { Conversation } from "@/lib/inbox/types"

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function listConversations() {
  const response = await fetch("/api/v1/conversations", { cache: "no-store" })
  const payload = await parseJson<{ items: Conversation[] }>(response)
  return payload.items
}

export async function sendConversationMessage(
  conversationId: string,
  input: { content: string; mode: ComposerMode; senderName?: string }
) {
  const response = await fetch(`/api/v1/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
  const payload = await parseJson<{ item: Conversation }>(response)
  return payload.item
}

export async function updateConversationStatus(
  conversationId: string,
  status: Conversation["status"]
) {
  const response = await fetch(`/api/v1/conversations/${conversationId}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  const payload = await parseJson<{ item: Conversation }>(response)
  return payload.item
}
