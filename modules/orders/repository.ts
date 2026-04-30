import type { OrderRow } from "@/lib/mock/orders"
import { orders as fallbackOrders } from "@/lib/mock/orders"
import { dbQuery } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"

type OrderRecord = {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  total_amount_cents: string | number
  payment_method: OrderRow["paymentMethod"]
  payment_status: OrderRow["paymentStatus"]
  fulfillment_status: OrderRow["fulfillmentStatus"]
  created_at: string | Date
  sales_channel: OrderRow["channel"]
  brand_name: OrderRow["brand"]
  items_count: number
  risk_score: number
  has_open_ticket: boolean
}

function mapOrderRow(row: OrderRecord): OrderRow {
  return {
    id: row.id,
    number: row.order_number,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    total: Number(row.total_amount_cents) / 100,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    channel: row.sales_channel,
    brand: row.brand_name,
    itemsCount: row.items_count,
    riskScore: row.risk_score,
    hasOpenTicket: row.has_open_ticket,
  }
}

export async function listOrders(): Promise<OrderRow[]> {
  if (!hasDatabaseUrl()) {
    return fallbackOrders
  }

  const env = getAppEnv()
  const result = await dbQuery<OrderRecord>(
    `
      select
        id,
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
      from orders
      where tenant_id = $1 and workspace_id = $2
      order by created_at desc, order_number desc
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )

  return result.rows.map(mapOrderRow)
}
