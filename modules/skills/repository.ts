import { dbQuery } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"

import type { CreateSkillInput } from "./contracts"
import { extractSkillVariables } from "./parser"
import { skillStore, type SkillRecord } from "./store"

type SkillRow = {
  id: string
  name: string
  slug: string
  description: string
  category: string
  status: string
  output_mode: string
  created_at: string | Date
  updated_at: string | Date
  version_id: string
  version_number: number
  prompt_template: string
  input_schema: Record<string, unknown> | null
  detected_variables: string[] | null
  version_created_at: string | Date
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function toIso(value: string | Date | null) {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function mapRow(row: SkillRow): SkillRecord {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    category: row.category,
    status: row.status as SkillRecord["status"],
    outputMode: row.output_mode as SkillRecord["outputMode"],
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    currentVersion: {
      id: row.version_id,
      version: row.version_number,
      promptTemplate: row.prompt_template,
      inputSchema: row.input_schema ?? {},
      detectedVariables: row.detected_variables ?? [],
      createdAt: toIso(row.version_created_at) ?? new Date().toISOString(),
    },
  }
}

export async function listSkills(): Promise<SkillRecord[]> {
  if (!hasDatabaseUrl()) {
    return skillStore.listSkills()
  }

  const env = getAppEnv()
  const result = await dbQuery<SkillRow>(
    `
      select
        s.id,
        s.name,
        s.slug,
        s.description,
        s.category,
        s.status,
        s.output_mode,
        s.created_at,
        s.updated_at,
        sv.id as version_id,
        sv.version as version_number,
        sv.prompt_template,
        sv.input_schema,
        sv.detected_variables,
        sv.created_at as version_created_at
      from skills s
      join skill_versions sv on sv.id = s.current_version_id
      where s.tenant_id = $1 and s.workspace_id = $2
      order by s.created_at desc, s.id desc
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )

  return result.rows.map(mapRow)
}

export async function createSkill(input: CreateSkillInput): Promise<SkillRecord> {
  const detectedVariables = extractSkillVariables(input.promptTemplate)

  if (!hasDatabaseUrl()) {
    return skillStore.createSkill(input, detectedVariables)
  }

  const env = getAppEnv()
  const skillId = createId("skill")
  const versionId = createId("skillv")

  await dbQuery(
    `
      insert into skills (
        id,
        tenant_id,
        workspace_id,
        name,
        slug,
        description,
        category,
        status,
        output_mode,
        current_version_id
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
    [
      skillId,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      input.name,
      input.slug,
      input.description,
      input.category,
      input.status,
      input.outputMode,
      versionId,
    ]
  )

  await dbQuery(
    `
      insert into skill_versions (
        id,
        tenant_id,
        workspace_id,
        skill_id,
        version,
        prompt_template,
        input_schema,
        detected_variables
      )
      values ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb)
    `,
    [
      versionId,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      skillId,
      1,
      input.promptTemplate,
      JSON.stringify(input.inputSchema ?? {}),
      JSON.stringify(detectedVariables),
    ]
  )

  return {
    id: skillId,
    name: input.name,
    slug: input.slug,
    description: input.description,
    category: input.category,
    status: input.status,
    outputMode: input.outputMode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentVersion: {
      id: versionId,
      version: 1,
      promptTemplate: input.promptTemplate,
      inputSchema: input.inputSchema ?? {},
      detectedVariables,
      createdAt: new Date().toISOString(),
    },
  }
}

export function resetSkillStore() {
  skillStore.reset()
}
