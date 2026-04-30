import type { PoolClient } from "pg"

import type { Conversation } from "@/lib/inbox/types"
import { dbQuery, withDbClient } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"
import { toIso } from "@/modules/core/shared"
import { enqueuePlatformEvent } from "@/modules/queue/platform-events"

import { conversationStore } from "./store"

type SendMessageInput = {
  conversationId: string
  content: string
  mode: "reply" | "note"
  senderName?: string
}

type UpdateStatusInput = {
  conversationId: string
  status: Conversation["status"]
}

type ConversationRow = {
  id: string
  contact_snapshot: Conversation["contact"]
  channel: Conversation["channel"]
  channel_number: string
  brand: string
  status: Conversation["status"]
  priority: Conversation["priority"]
  assignee_snapshot: Conversation["assignee"] | null
  team: Conversation["team"]
  tags: string[] | null
  unread_count: number
  last_activity_at: string | Date
  sla_due_at: string | Date | null
  preview: string
  order_snapshot: Conversation["order"] | null
  ai_suggestion_snapshot: Conversation["aiSuggestion"] | null
  intent: string | null
  sentiment: Conversation["sentiment"] | null
  is_ai_handled: boolean
}

type MessageRow = {
  id: string
  conversation_id: string
  direction: Conversation["messages"][number]["direction"]
  content: string
  timestamp: string | Date
  sender_snapshot: Conversation["messages"][number]["sender"]
  status: Conversation["messages"][number]["status"] | null
  is_ai_suggested: boolean
  attachments: Conversation["messages"][number]["attachments"] | null
  template_name: string | null
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function mapConversation(row: ConversationRow, messages: MessageRow[]): Conversation {
  return {
    id: row.id,
    contact: row.contact_snapshot,
    channel: row.channel,
    channelNumber: row.channel_number,
    brand: row.brand,
    status: row.status,
    priority: row.priority,
    assignee: row.assignee_snapshot ?? undefined,
    team: row.team,
    tags: row.tags ?? [],
    unreadCount: row.unread_count,
    lastActivityAt: toIso(row.last_activity_at) ?? new Date().toISOString(),
    slaDueAt: toIso(row.sla_due_at),
    preview: row.preview,
    messages: messages.map((message) => ({
      id: message.id,
      direction: message.direction,
      content: message.content,
      timestamp: toIso(message.timestamp) ?? new Date().toISOString(),
      sender: message.sender_snapshot,
      status: message.status ?? undefined,
      isAiSuggested: message.is_ai_suggested || undefined,
      attachments: message.attachments ?? undefined,
      templateName: message.template_name ?? undefined,
    })),
    order: row.order_snapshot ?? undefined,
    aiSuggestion: row.ai_suggestion_snapshot ?? undefined,
    intent: row.intent ?? undefined,
    sentiment: row.sentiment ?? undefined,
    isAiHandled: row.is_ai_handled,
  }
}

async function queryConversations(client?: PoolClient) {
  const env = getAppEnv()
  const sql = `
      select
        id,
        contact_snapshot,
        channel,
        channel_number,
        brand,
        status,
        priority,
        assignee_snapshot,
        team,
        tags,
        unread_count,
        last_activity_at,
        sla_due_at,
        preview,
        order_snapshot,
        ai_suggestion_snapshot,
        intent,
        sentiment,
        is_ai_handled
      from conversations
      where tenant_id = $1 and workspace_id = $2
      order by last_activity_at desc, id asc
    `
  const params = [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]

  const conversationResult = client
    ? await client.query<ConversationRow>(sql, params)
    : await dbQuery<ConversationRow>(sql, params)

  if (conversationResult.rows.length === 0) {
    return []
  }

  const conversationIds = conversationResult.rows.map((row) => row.id)
  const msgSql = `
      select
        id,
        conversation_id,
        direction,
        content,
        timestamp,
        sender_snapshot,
        status,
        is_ai_suggested,
        attachments,
        template_name
      from messages
      where conversation_id = any($1::text[])
      order by timestamp asc, id asc
    `
  const msgParams = [conversationIds]
  const messageResult = client
    ? await client.query<MessageRow>(msgSql, msgParams)
    : await dbQuery<MessageRow>(msgSql, msgParams)

  const messagesByConversation = new Map<string, MessageRow[]>()

  for (const message of messageResult.rows) {
    const bucket = messagesByConversation.get(message.conversation_id) ?? []
    bucket.push(message)
    messagesByConversation.set(message.conversation_id, bucket)
  }

  return conversationResult.rows.map((row) =>
    mapConversation(row, messagesByConversation.get(row.id) ?? [])
  )
}

async function getConversationById(conversationId: string, client?: PoolClient) {
  const items = await queryConversations(client)
  return items.find((item) => item.id === conversationId)
}

export async function listConversations(): Promise<Conversation[]> {
  if (!hasDatabaseUrl()) {
    return conversationStore.listConversations()
  }

  return queryConversations()
}

export async function sendMessage(input: SendMessageInput): Promise<Conversation> {
  if (!hasDatabaseUrl()) {
    return conversationStore.sendMessage(input)
  }

  const env = getAppEnv()
  const timestamp = new Date().toISOString()
  const messageId = createId("msg")

  const updatedConversation = await withDbClient(async (client) => {
    await client.query("begin")

    try {
      const currentConversation = await getConversationById(input.conversationId, client)

      if (!currentConversation) {
        throw new Error(`Conversation ${input.conversationId} not found`)
      }

      await client.query(
        `
          insert into messages (
            id,
            tenant_id,
            workspace_id,
            conversation_id,
            direction,
            content,
            timestamp,
            sender_snapshot,
            status,
            is_ai_suggested,
            attachments,
            template_name
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, $12)
        `,
        [
          messageId,
          env.APP_TENANT_ID,
          env.APP_WORKSPACE_ID,
          input.conversationId,
          input.mode === "note" ? "internal_note" : "outbound",
          input.content,
          timestamp,
          JSON.stringify({
            id: "u_me",
            name: input.senderName ?? "Você",
            type: "agent",
          }),
          input.mode === "note" ? null : "sent",
          false,
          JSON.stringify([]),
          null,
        ]
      )

      const nextStatus =
        input.mode === "reply" && currentConversation.status === "open"
          ? "pending_customer"
          : currentConversation.status

      await client.query(
        `
          update conversations
          set
            status = $2,
            preview = $3,
            unread_count = 0,
            last_activity_at = $4,
            updated_at = now()
          where id = $1 and tenant_id = $5 and workspace_id = $6
        `,
        [
          input.conversationId,
          nextStatus,
          input.mode === "note" ? currentConversation.preview : input.content,
          timestamp,
          env.APP_TENANT_ID,
          env.APP_WORKSPACE_ID,
        ]
      )

      const freshConversation = await getConversationById(input.conversationId, client)

      await client.query("commit")

      if (!freshConversation) {
        throw new Error(`Conversation ${input.conversationId} not found after update`)
      }

      return freshConversation
    } catch (error) {
      await client.query("rollback")
      throw error
    }
  })

  await enqueuePlatformEvent({
    type: "conversation.message.sent",
    tenantId: env.APP_TENANT_ID,
    workspaceId: env.APP_WORKSPACE_ID,
    conversationId: input.conversationId,
    payload: {
      messageId,
      mode: input.mode,
      preview: updatedConversation.preview,
    },
  })

  return updatedConversation
}

export async function updateConversationStatus(
  input: UpdateStatusInput
): Promise<Conversation> {
  if (!hasDatabaseUrl()) {
    return conversationStore.updateStatus(input)
  }

  const env = getAppEnv()
  const previewByStatus: Partial<Record<Conversation["status"], string>> = {
    resolved: "Conversa marcada como resolvida",
    snoozed: "Soneca programada · retomar em 1d",
  }

  const updatedConversation = await withDbClient(async (client) => {
    await client.query(
      `
        update conversations
        set
          status = $2,
          unread_count = case when $2 = 'resolved' then 0 else unread_count end,
          preview = coalesce($3, preview),
          updated_at = now()
        where id = $1 and tenant_id = $4 and workspace_id = $5
      `,
      [
        input.conversationId,
        input.status,
        previewByStatus[input.status] ?? null,
        env.APP_TENANT_ID,
        env.APP_WORKSPACE_ID,
      ]
    )

    const conversation = await getConversationById(input.conversationId, client)

    if (!conversation) {
      throw new Error(`Conversation ${input.conversationId} not found`)
    }

    return conversation
  })

  await enqueuePlatformEvent({
    type: "conversation.status.updated",
    tenantId: env.APP_TENANT_ID,
    workspaceId: env.APP_WORKSPACE_ID,
    conversationId: input.conversationId,
    payload: {
      status: input.status,
    },
  })

  return updatedConversation
}
