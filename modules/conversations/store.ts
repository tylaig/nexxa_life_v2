import type { ComposerMode } from "@/components/inbox/composer"
import { conversations as seedConversations } from "@/lib/inbox/mock-data"
import type { Conversation, Message } from "@/lib/inbox/types"

type StoreOptions = {
  createId?: () => string
  now?: () => string
}

type SendMessageInput = {
  conversationId: string
  content: string
  mode: ComposerMode
  senderName?: string
}

type UpdateStatusInput = {
  conversationId: string
  status: Conversation["status"]
}

function defaultCreateId() {
  return `m_${Date.now()}`
}

function defaultNow() {
  return new Date().toISOString()
}

export function createConversationStore(
  seed: Conversation[] = structuredClone(seedConversations),
  options: StoreOptions = {}
) {
  let conversations = structuredClone(seed)
  const createId = options.createId ?? defaultCreateId
  const now = options.now ?? defaultNow

  function listConversations() {
    return conversations
  }

  function getConversation(conversationId: string) {
    return conversations.find((conversation) => conversation.id === conversationId)
  }

  function sendMessage(input: SendMessageInput) {
    const conversation = getConversation(input.conversationId)

    if (!conversation) {
      throw new Error(`Conversation ${input.conversationId} not found`)
    }

    const timestamp = now()
    const message: Message = {
      id: createId(),
      direction: input.mode === "note" ? "internal_note" : "outbound",
      content: input.content,
      timestamp,
      sender: {
        id: "u_me",
        name: input.senderName ?? "Você",
        type: "agent",
      },
      status: input.mode === "note" ? undefined : "sent",
    }

    const updatedConversation: Conversation = {
      ...conversation,
      messages: [...conversation.messages, message],
      lastActivityAt: timestamp,
      unreadCount: 0,
      preview: input.mode === "note" ? conversation.preview : input.content,
      status:
        input.mode === "reply" && conversation.status === "open"
          ? "pending_customer"
          : conversation.status,
    }

    conversations = conversations.map((item) =>
      item.id === input.conversationId ? updatedConversation : item
    )

    return updatedConversation
  }

  function updateStatus(input: UpdateStatusInput) {
    const conversation = getConversation(input.conversationId)

    if (!conversation) {
      throw new Error(`Conversation ${input.conversationId} not found`)
    }

    const previewByStatus: Partial<Record<Conversation["status"], string>> = {
      resolved: "Conversa marcada como resolvida",
      snoozed: "Soneca programada · retomar em 1d",
    }

    const updatedConversation: Conversation = {
      ...conversation,
      status: input.status,
      unreadCount: input.status === "resolved" ? 0 : conversation.unreadCount,
      preview: previewByStatus[input.status] ?? conversation.preview,
    }

    conversations = conversations.map((item) =>
      item.id === input.conversationId ? updatedConversation : item
    )

    return updatedConversation
  }

  function reset(nextSeed: Conversation[] = seed) {
    conversations = structuredClone(nextSeed)
  }

  return {
    getConversation,
    listConversations,
    reset,
    sendMessage,
    updateStatus,
  }
}

export const conversationStore = createConversationStore()

export type { SendMessageInput, UpdateStatusInput }
