import { Pool } from "pg"

import { contacts } from "../../lib/mock/contacts"
import { orders } from "../../lib/mock/orders"
import { conversations } from "../../lib/inbox/mock-data"

const tenantId = process.env.APP_TENANT_ID ?? "tenant_demo"
const workspaceId = process.env.APP_WORKSPACE_ID ?? "workspace_demo"

function toCents(value: number) {
  return Math.round(value * 100)
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for db:seed")
  }

  const pool = new Pool({ connectionString: databaseUrl })

  try {
    await pool.query("begin")

    await pool.query(
      `
        insert into tenants (id, slug, name)
        values ($1, $2, $3)
        on conflict (id) do update
        set slug = excluded.slug,
            name = excluded.name,
            updated_at = now()
      `,
      [tenantId, "demo", "Demo Workspace Group"]
    )

    await pool.query(
      `
        insert into workspaces (id, tenant_id, slug, name)
        values ($1, $2, $3, $4)
        on conflict (id) do update
        set tenant_id = excluded.tenant_id,
            slug = excluded.slug,
            name = excluded.name,
            updated_at = now()
      `,
      [workspaceId, tenantId, "default", "Default Workspace"]
    )

    await pool.query("delete from messages where tenant_id = $1 and workspace_id = $2", [tenantId, workspaceId])
    await pool.query("delete from conversations where tenant_id = $1 and workspace_id = $2", [tenantId, workspaceId])
    await pool.query("delete from orders where tenant_id = $1 and workspace_id = $2", [tenantId, workspaceId])
    await pool.query("delete from contacts where tenant_id = $1 and workspace_id = $2", [tenantId, workspaceId])

    for (const contact of contacts) {
      await pool.query(
        `
          insert into contacts (
            id,
            tenant_id,
            workspace_id,
            full_name,
            primary_phone_e164,
            primary_email,
            avatar_url,
            tags,
            is_vip,
            lifecycle_stage,
            lifetime_value_cents,
            total_orders_count,
            nps_score,
            last_purchase_at,
            city,
            consent_marketing,
            first_seen_at
          )
          values (
            $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, $16, $17
          )
        `,
        [
          contact.id,
          tenantId,
          workspaceId,
          contact.name,
          contact.phone,
          contact.email ?? null,
          contact.avatarUrl ?? null,
          JSON.stringify(contact.tags),
          contact.isVip,
          contact.lifecycle,
          toCents(contact.ltv),
          contact.totalOrders,
          contact.nps ?? null,
          contact.lastPurchaseAt ?? null,
          contact.city ?? null,
          true,
          contact.lastPurchaseAt ?? new Date().toISOString(),
        ]
      )
    }

    for (const order of orders) {
      await pool.query(
        `
          insert into orders (
            id,
            tenant_id,
            workspace_id,
            order_number,
            customer_name,
            customer_phone,
            total_amount_cents,
            payment_method,
            payment_status,
            fulfillment_status,
            created_at,
            sales_channel,
            brand_name,
            items_count,
            risk_score,
            has_open_ticket
          )
          values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
          )
        `,
        [
          order.id,
          tenantId,
          workspaceId,
          order.number,
          order.customerName,
          order.customerPhone,
          toCents(order.total),
          order.paymentMethod,
          order.paymentStatus,
          order.fulfillmentStatus,
          order.createdAt,
          order.channel,
          order.brand,
          order.itemsCount,
          order.riskScore,
          order.hasOpenTicket,
        ]
      )
    }

    for (const conversation of conversations) {
      await pool.query(
        `
          insert into conversations (
            id,
            tenant_id,
            workspace_id,
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
          )
          values (
            $1, $2, $3, $4::jsonb, $5, $6, $7, $8, $9, $10::jsonb, $11, $12::jsonb, $13, $14, $15, $16, $17::jsonb, $18::jsonb, $19, $20, $21
          )
        `,
        [
          conversation.id,
          tenantId,
          workspaceId,
          JSON.stringify(conversation.contact),
          conversation.channel,
          conversation.channelNumber,
          conversation.brand,
          conversation.status,
          conversation.priority,
          JSON.stringify(conversation.assignee ?? null),
          conversation.team,
          JSON.stringify(conversation.tags),
          conversation.unreadCount,
          conversation.lastActivityAt,
          conversation.slaDueAt ?? null,
          conversation.preview,
          JSON.stringify(conversation.order ?? null),
          JSON.stringify(conversation.aiSuggestion ?? null),
          conversation.intent ?? null,
          conversation.sentiment ?? null,
          Boolean(conversation.isAiHandled),
        ]
      )

      for (const message of conversation.messages) {
        await pool.query(
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
            values (
              $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, $12
            )
          `,
          [
            message.id,
            tenantId,
            workspaceId,
            conversation.id,
            message.direction,
            message.content,
            message.timestamp,
            JSON.stringify(message.sender),
            message.status ?? null,
            Boolean(message.isAiSuggested),
            JSON.stringify(message.attachments ?? []),
            message.templateName ?? null,
          ]
        )
      }
    }

    await pool.query("commit")
    console.log(
      JSON.stringify({
        tenantId,
        workspaceId,
        contacts: contacts.length,
        orders: orders.length,
        conversations: conversations.length,
        messages: conversations.reduce((sum, conversation) => sum + conversation.messages.length, 0),
      })
    )
  } catch (error) {
    await pool.query("rollback")
    throw error
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
