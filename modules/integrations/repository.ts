import { dbQuery } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"

import type { CreateIntegrationInput, IntegrationHealthCheckInput, UpdateIntegrationInput } from "./contracts"
import { integrationStore, type IntegrationConnectionRecord } from "./store"

type IntegrationRow = {
  id: string
  provider: string
  status: string
  display_name: string
  config_public: Record<string, unknown> | null
  last_validated_at: string | Date | null
  created_at: string | Date
  updated_at: string | Date
}

function createId() {
  return `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function toIso(value: string | Date | null) {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function mapRow(row: IntegrationRow): IntegrationConnectionRecord {
  const configPublic = row.config_public ?? {}
  const baseUrl = typeof configPublic.baseUrl === "string" ? configPublic.baseUrl : ""
  const authMode = typeof configPublic.authMode === "string" ? configPublic.authMode : ""

  return {
    id: row.id,
    provider: row.provider as IntegrationConnectionRecord["provider"],
    displayName: row.display_name,
    baseUrl,
    authMode,
    status: row.status as IntegrationConnectionRecord["status"],
    configPublic,
    healthStatus: row.last_validated_at ? "validated" : row.status === "error" ? "error" : "unknown",
    checkedAt: toIso(row.last_validated_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

export async function listIntegrationConnections(): Promise<IntegrationConnectionRecord[]> {
  if (!hasDatabaseUrl()) {
    return integrationStore.listIntegrationConnections()
  }

  const env = getAppEnv()
  const result = await dbQuery<IntegrationRow>(
    `
      select
        id,
        provider,
        status,
        display_name,
        config_public,
        last_validated_at,
        created_at,
        updated_at
      from integration_connections
      where tenant_id = $1 and workspace_id = $2
      order by created_at desc, id desc
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )

  return result.rows.map(mapRow)
}

export async function getIntegrationConnection(id: string): Promise<IntegrationConnectionRecord | null> {
  if (!hasDatabaseUrl()) {
    return integrationStore.getIntegrationConnection(id)
  }

  const env = getAppEnv()
  const result = await dbQuery<IntegrationRow>(
    `
      select
        id,
        provider,
        status,
        display_name,
        config_public,
        last_validated_at,
        created_at,
        updated_at
      from integration_connections
      where tenant_id = $1 and workspace_id = $2 and id = $3
      limit 1
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, id]
  )

  return result.rows[0] ? mapRow(result.rows[0]) : null
}

export async function createIntegrationConnection(
  input: CreateIntegrationInput
): Promise<IntegrationConnectionRecord> {
  if (!hasDatabaseUrl()) {
    return integrationStore.createIntegrationConnection(input)
  }

  const env = getAppEnv()
  const id = createId()
  const configPublic = {
    ...input.configPublic,
    baseUrl: input.baseUrl,
    authMode: input.authMode,
  }

  const result = await dbQuery<IntegrationRow>(
    `
      insert into integration_connections (
        id,
        tenant_id,
        workspace_id,
        provider,
        status,
        display_name,
        config_public
      )
      values ($1, $2, $3, $4, $5, $6, $7::jsonb)
      returning
        id,
        provider,
        status,
        display_name,
        config_public,
        last_validated_at,
        created_at,
        updated_at
    `,
    [
      id,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      input.provider,
      input.status,
      input.displayName,
      JSON.stringify(configPublic),
    ]
  )

  return mapRow(result.rows[0])
}

export async function updateIntegrationConnection(
  id: string,
  input: UpdateIntegrationInput
): Promise<IntegrationConnectionRecord | null> {
  if (!hasDatabaseUrl()) {
    return integrationStore.updateIntegrationConnection(id, input)
  }

  const current = await getIntegrationConnection(id)
  if (!current) return null

  const next = {
    ...current,
    ...input,
    configPublic: input.configPublic ? { ...current.configPublic, ...input.configPublic } : current.configPublic,
  }

  const env = getAppEnv()
  const configPublic = {
    ...next.configPublic,
    baseUrl: next.baseUrl,
    authMode: next.authMode,
  }

  const result = await dbQuery<IntegrationRow>(
    `
      update integration_connections
      set
        provider = $4,
        status = $5,
        display_name = $6,
        config_public = $7::jsonb,
        updated_at = now()
      where tenant_id = $1 and workspace_id = $2 and id = $3
      returning
        id,
        provider,
        status,
        display_name,
        config_public,
        last_validated_at,
        created_at,
        updated_at
    `,
    [
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      id,
      next.provider,
      next.status,
      next.displayName,
      JSON.stringify(configPublic),
    ]
  )

  return result.rows[0] ? mapRow(result.rows[0]) : null
}

export async function runIntegrationHealthCheck(
  input: IntegrationHealthCheckInput
): Promise<IntegrationConnectionRecord> {
  const checkedAt = new Date().toISOString()

  return {
    id: `health_${Date.now()}`,
    provider: input.provider,
    displayName: input.displayName,
    baseUrl: input.baseUrl,
    authMode: input.authMode,
    status: "validated",
    configPublic: input.configPublic ?? {},
    healthStatus: "validated",
    checkedAt,
    createdAt: checkedAt,
    updatedAt: checkedAt,
  }
}

export function resetIntegrationStore() {
  integrationStore.reset()
}
