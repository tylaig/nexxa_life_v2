export type ConversationStatus =
  | "open"
  | "pending_customer"
  | "pending_internal"
  | "in_automation"
  | "escalated"
  | "resolved"
  | "snoozed"

export type ConversationPriority = "low" | "normal" | "high" | "urgent"

export type ChannelType = "whatsapp" | "instagram" | "webchat" | "email"

export type MessageDirection = "inbound" | "outbound" | "internal_note" | "system"

export type MessageStatus = "sent" | "delivered" | "read" | "failed"

export type Sender = {
  id: string
  name: string
  type: "customer" | "agent" | "ai" | "automation" | "system"
  avatarUrl?: string
}

export type Message = {
  id: string
  direction: MessageDirection
  content: string
  timestamp: string // ISO
  sender: Sender
  status?: MessageStatus
  isAiSuggested?: boolean
  attachments?: { type: "image" | "file" | "template"; name: string; url?: string }[]
  templateName?: string
}

export type OrderTimelineEvent = {
  id: string
  label: string
  timestamp: string
  status: "completed" | "current" | "pending" | "failed"
  detail?: string
}

export type Order = {
  id: string
  number: string
  total: string
  currency: string
  status: "paid" | "processing" | "shipped" | "delivered" | "delayed" | "cancelled" | "payment_failed"
  paymentMethod: string
  createdAt: string
  items: { sku: string; name: string; qty: number; price: string }[]
  timeline: OrderTimelineEvent[]
  trackingCode?: string
  carrier?: string
}

export type Contact = {
  id: string
  name: string
  phone: string
  email?: string
  avatarUrl?: string
  tags: string[]
  isVip: boolean
  segment: string
  lifetimeValue: string
  totalOrders: number
  language: string
  city?: string
  consentMarketing: boolean
  firstSeenAt: string
}

export type AiSuggestion = {
  id: string
  intent: string
  confidence: number // 0..1
  draft: string
  sources: { title: string; type: "policy" | "faq" | "catalog" | "order" }[]
}

export type Conversation = {
  id: string
  contact: Contact
  channel: ChannelType
  channelNumber: string // e.g. WhatsApp number used
  brand: string // tenant/brand
  status: ConversationStatus
  priority: ConversationPriority
  assignee?: { id: string; name: string; avatarUrl?: string }
  team: "vendas" | "suporte" | "fraude" | "logistica"
  tags: string[]
  unreadCount: number
  lastActivityAt: string
  slaDueAt?: string
  preview: string
  messages: Message[]
  order?: Order
  aiSuggestion?: AiSuggestion
  intent?: string
  sentiment?: "positive" | "neutral" | "negative"
  isAiHandled?: boolean
}

export type InboxView = {
  id: string
  label: string
  filter: (c: Conversation) => boolean
  icon?: string
}
