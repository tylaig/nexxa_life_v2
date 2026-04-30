import { dbQuery } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"

import type { CreateCampaignInput } from "./contracts"
import { campaignStore, type CampaignRecord } from "./store"

type CampaignRow = {
  id: string
  name: string
  objective: string
  status: string
  channel: string
  sender_id: string
  template_id: string
  template_version: string
  audience_id: string
  created_by: string
  schedule_at: string | Date | null
  dry_run_enabled: boolean
  metadata: Record<string, unknown> | null
  launched_at: string | Date | null
  completed_at: string | Date | null
  created_at: string | Date
  updated_at: string | Date
}

function toIso(value: string | Date | null) {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function createId() {
  return `camp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function mapRow(row: CampaignRow): CampaignRecord {
  return {
    id: row.id,
    name: row.name,
    objective: row.objective,
    status: row.status as CampaignRecord["status"],
    channel: row.channel,
    senderId: row.sender_id,
    templateId: row.template_id,
    templateVersion: row.template_version,
    audienceId: row.audience_id,
    createdBy: row.created_by,
    scheduleAt: toIso(row.schedule_at) ?? undefined,
    dryRunEnabled: row.dry_run_enabled,
    metadata: row.metadata ?? {},
    launchedAt: toIso(row.launched_at),
    completedAt: toIso(row.completed_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

export async function listCampaigns(): Promise<CampaignRecord[]> {
  if (!hasDatabaseUrl()) {
    return campaignStore.listCampaigns()
  }

  const env = getAppEnv()
  const result = await dbQuery<CampaignRow>(
    `
      select
        id,
        name,
        objective,
        status,
        channel,
        sender_id,
        template_id,
        template_version,
        audience_id,
        created_by,
        schedule_at,
        dry_run_enabled,
        metadata,
        launched_at,
        completed_at,
        created_at,
        updated_at
      from campaigns
      where tenant_id = $1 and workspace_id = $2
      order by created_at desc, id desc
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )

  return result.rows.map(mapRow)
}

export async function getCampaign(id: string): Promise<CampaignRecord | null> {
  if (!hasDatabaseUrl()) {
    return campaignStore.getCampaign(id)
  }

  const env = getAppEnv()
  const result = await dbQuery<CampaignRow>(
    `
      select
        id,
        name,
        objective,
        status,
        channel,
        sender_id,
        template_id,
        template_version,
        audience_id,
        created_by,
        schedule_at,
        dry_run_enabled,
        metadata,
        launched_at,
        completed_at,
        created_at,
        updated_at
      from campaigns
      where tenant_id = $1 and workspace_id = $2 and id = $3
      limit 1
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, id]
  )

  return result.rows[0] ? mapRow(result.rows[0]) : null
}

export async function createCampaign(input: CreateCampaignInput): Promise<CampaignRecord> {
  if (!hasDatabaseUrl()) {
    return campaignStore.createCampaign(input)
  }

  const env = getAppEnv()
  const id = createId()
  const result = await dbQuery<CampaignRow>(
    `
      insert into campaigns (
        id,
        tenant_id,
        workspace_id,
        name,
        objective,
        status,
        channel,
        sender_id,
        template_id,
        template_version,
        audience_id,
        created_by,
        schedule_at,
        dry_run_enabled,
        metadata
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::jsonb)
      returning
        id,
        name,
        objective,
        status,
        channel,
        sender_id,
        template_id,
        template_version,
        audience_id,
        created_by,
        schedule_at,
        dry_run_enabled,
        metadata,
        launched_at,
        completed_at,
        created_at,
        updated_at
    `,
    [
      id,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      input.name,
      input.objective,
      input.status,
      input.channel,
      input.senderId,
      input.templateId,
      input.templateVersion,
      input.audienceId,
      input.createdBy,
      input.scheduleAt ?? null,
      input.dryRunEnabled,
      JSON.stringify(input.metadata ?? {}),
    ]
  )

  return mapRow(result.rows[0])
}

export async function updateCampaign(
  id: string,
  input: Partial<CreateCampaignInput>
): Promise<CampaignRecord | null> {
  if (!hasDatabaseUrl()) {
    return campaignStore.updateCampaign(id, input)
  }

  const current = await getCampaign(id)
  if (!current) return null

  const next = {
    ...current,
    ...input,
    metadata: input.metadata ?? current.metadata,
  }

  const env = getAppEnv()
  const result = await dbQuery<CampaignRow>(
    `
      update campaigns
      set
        name = $4,
        objective = $5,
        status = $6,
        channel = $7,
        sender_id = $8,
        template_id = $9,
        template_version = $10,
        audience_id = $11,
        created_by = $12,
        schedule_at = $13,
        dry_run_enabled = $14,
        metadata = $15::jsonb,
        updated_at = now()
      where tenant_id = $1 and workspace_id = $2 and id = $3
      returning
        id,
        name,
        objective,
        status,
        channel,
        sender_id,
        template_id,
        template_version,
        audience_id,
        created_by,
        schedule_at,
        dry_run_enabled,
        metadata,
        launched_at,
        completed_at,
        created_at,
        updated_at
    `,
    [
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      id,
      next.name,
      next.objective,
      next.status,
      next.channel,
      next.senderId,
      next.templateId,
      next.templateVersion,
      next.audienceId,
      next.createdBy,
      next.scheduleAt ?? null,
      next.dryRunEnabled,
      JSON.stringify(next.metadata ?? {}),
    ]
  )

  return result.rows[0] ? mapRow(result.rows[0]) : null
}

export function resetCampaignStore() {
  campaignStore.reset()
}
