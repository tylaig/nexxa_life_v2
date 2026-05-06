import type { AppUserProfile, EnsureAppUserProfileInput, UpsertAppUserProfileInput } from "./contracts"

function now() {
  return new Date().toISOString()
}

function normalizeInitialProfile(input: EnsureAppUserProfileInput): AppUserProfile {
  const timestamp = now()

  return {
    userId: input.userId,
    email: input.email,
    fullName: input.fullName ?? input.email,
    nickname: input.nickname,
    phone: input.phone,
    onboarded: false,
    onboardingStep: "profile",
    role: "user",
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export function createAppUserProfileStore(seed: AppUserProfile[] = []) {
  let profiles = structuredClone(seed)

  function getAppUserProfile(userId: string) {
    return profiles.find((profile) => profile.userId === userId) ?? null
  }

  function ensureAppUserProfile(input: EnsureAppUserProfileInput) {
    const existing = getAppUserProfile(input.userId)

    if (existing) {
      return existing
    }

    const created = normalizeInitialProfile(input)
    profiles = [...profiles, created]
    return created
  }

  function upsertAppUserProfile(input: UpsertAppUserProfileInput) {
    const existing = getAppUserProfile(input.userId)

    if (!existing) {
      const created = normalizeInitialProfile({
        userId: input.userId,
        email: input.email ?? `${input.userId}@example.local`,
        fullName: input.fullName,
        nickname: input.nickname,
        phone: input.phone,
      })

      const next: AppUserProfile = {
        ...created,
        onboarded: input.onboarded ?? created.onboarded,
        onboardingStep: input.onboardingStep ?? created.onboardingStep,
        role: input.role ?? created.role,
        updatedAt: now(),
      }

      profiles = [...profiles, next]
      return next
    }

    const next: AppUserProfile = {
      ...existing,
      email: input.email ?? existing.email,
      fullName: input.fullName ?? existing.fullName,
      nickname: input.nickname ?? existing.nickname,
      phone: input.phone ?? existing.phone,
      onboarded: input.onboarded ?? existing.onboarded,
      onboardingStep: input.onboardingStep ?? existing.onboardingStep,
      role: input.role ?? existing.role,
      updatedAt: now(),
    }

    profiles = profiles.map((profile) => (profile.userId === input.userId ? next : profile))
    return next
  }

  function reset(nextSeed: AppUserProfile[] = []) {
    profiles = structuredClone(nextSeed)
  }

  return {
    getAppUserProfile,
    ensureAppUserProfile,
    upsertAppUserProfile,
    reset,
  }
}

export const appUserProfileStore = createAppUserProfileStore()
