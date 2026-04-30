import { dbQuery } from "@/lib/server/db"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"

import type { AppUserProfile, EnsureAppUserProfileInput, UpsertAppUserProfileInput } from "./contracts"
import { appUserProfileStore } from "./store"

type AppUserProfileRow = {
  user_id: string
  tenant_id: string
  workspace_id: string
  email: string
  full_name: string
  nickname: string | null
  phone: string | null
  onboarded: boolean
  onboarding_step: AppUserProfile["onboardingStep"]
  created_at: string | Date
  updated_at: string | Date
}

function toIso(value: string | Date) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function mapRow(row: AppUserProfileRow): AppUserProfile {
  return {
    userId: row.user_id,
    email: row.email,
    fullName: row.full_name,
    nickname: row.nickname ?? undefined,
    phone: row.phone ?? undefined,
    onboarded: row.onboarded,
    onboardingStep: row.onboarding_step,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  }
}

export async function getAppUserProfile(userId: string): Promise<AppUserProfile | null> {
  if (!hasDatabaseUrl()) {
    return appUserProfileStore.getAppUserProfile(userId)
  }

  const env = getAppEnv()
  const result = await dbQuery<AppUserProfileRow>(
    `
      select
        user_id,
        tenant_id,
        workspace_id,
        email,
        full_name,
        nickname,
        phone,
        onboarded,
        onboarding_step,
        created_at,
        updated_at
      from app_user_profiles
      where tenant_id = $1 and workspace_id = $2 and user_id = $3
      limit 1
    `,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, userId]
  )

  return result.rows[0] ? mapRow(result.rows[0]) : null
}

export async function ensureAppUserProfile(input: EnsureAppUserProfileInput): Promise<AppUserProfile> {
  const existing = await getAppUserProfile(input.userId)

  if (existing) {
    return existing
  }

  if (!hasDatabaseUrl()) {
    return appUserProfileStore.ensureAppUserProfile(input)
  }

  return upsertAppUserProfile({
    userId: input.userId,
    email: input.email,
    fullName: input.fullName,
    nickname: input.nickname,
    phone: input.phone,
    onboarded: false,
    onboardingStep: "profile",
  })
}

export async function upsertAppUserProfile(input: UpsertAppUserProfileInput): Promise<AppUserProfile> {
  if (!hasDatabaseUrl()) {
    return appUserProfileStore.upsertAppUserProfile(input)
  }

  const env = getAppEnv()
  const current = await getAppUserProfile(input.userId)
  const result = await dbQuery<AppUserProfileRow>(
    `
      insert into app_user_profiles (
        user_id,
        tenant_id,
        workspace_id,
        email,
        full_name,
        nickname,
        phone,
        onboarded,
        onboarding_step
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      on conflict (user_id)
      do update set
        email = excluded.email,
        full_name = excluded.full_name,
        nickname = excluded.nickname,
        phone = excluded.phone,
        onboarded = excluded.onboarded,
        onboarding_step = excluded.onboarding_step,
        updated_at = now()
      returning
        user_id,
        tenant_id,
        workspace_id,
        email,
        full_name,
        nickname,
        phone,
        onboarded,
        onboarding_step,
        created_at,
        updated_at
    `,
    [
      input.userId,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      input.email ?? current?.email ?? `${input.userId}@example.local`,
      input.fullName ?? current?.fullName ?? input.email ?? input.userId,
      input.nickname ?? current?.nickname ?? null,
      input.phone ?? current?.phone ?? null,
      input.onboarded ?? current?.onboarded ?? false,
      input.onboardingStep ?? current?.onboardingStep ?? "profile",
    ]
  )

  return mapRow(result.rows[0])
}

export async function resetAppUserProfileStore() {
  appUserProfileStore.reset()
}
