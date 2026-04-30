import type { CrmContact } from "@/lib/mock/contacts"
import { contacts as fallbackContacts } from "@/lib/mock/contacts"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"
import { dbQuery } from "@/lib/server/db"

type ContactRow = {
  id: string
  full_name: string
  primary_phone_e164: string
  primary_email: string | null
  avatar_url: string | null
  tags: string[] | null
  is_vip: boolean
  lifecycle_stage: CrmContact["lifecycle"]
  lifetime_value_cents: string | number
  total_orders_count: number
  nps_score: number | null
  last_purchase_at: string | Date | null
  city: string | null
}

function mapContactRow(row: ContactRow): CrmContact {
  return {
    id: row.id,
    name: row.full_name,
    phone: row.primary_phone_e164,
    email: row.primary_email ?? undefined,
    avatarUrl: row.avatar_url ?? undefined,
    tags: row.tags ?? [],
    isVip: row.is_vip,
    lifecycle: row.lifecycle_stage,
    ltv: Number(row.lifetime_value_cents) / 100,
    totalOrders: row.total_orders_count,
    nps: row.nps_score ?? undefined,
    lastPurchaseAt:
      row.last_purchase_at instanceof Date
        ? row.last_purchase_at.toISOString()
        : row.last_purchase_at ?? undefined,
    city: row.city ?? undefined,
  }
}

export async function listContacts(): Promise<CrmContact[]> {
  if (!hasDatabaseUrl()) {
    return fallbackContacts
  }

  const env = getAppEnv()
  const result = await dbQuery<ContactRow>(
    `
      select
        id,
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
        city
      from contacts
      where tenant_id = $1 and workspace_id = $2
      order by is_vip desc, lifetime_value_cents desc, full_name asc
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )

  return result.rows.map(mapContactRow)
}
