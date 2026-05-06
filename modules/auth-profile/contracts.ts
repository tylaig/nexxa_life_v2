export const ONBOARDING_STEPS = ["profile", "diagnostic", "dashboard"] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const APP_USER_ROLES = ["user", "admin"] as const

export type AppUserRole = (typeof APP_USER_ROLES)[number]

export type AppUserProfile = {
  userId: string
  email: string
  fullName: string
  nickname?: string
  phone?: string
  onboarded: boolean
  onboardingStep: OnboardingStep
  role: AppUserRole
  createdAt: string
  updatedAt: string
}

export type EnsureAppUserProfileInput = {
  userId: string
  email: string
  fullName?: string
  nickname?: string
  phone?: string
}

export type UpsertAppUserProfileInput = {
  userId: string
  email?: string
  fullName?: string
  nickname?: string
  phone?: string
  onboarded?: boolean
  onboardingStep?: OnboardingStep
  role?: AppUserRole
}

export function isAppUserRole(value: unknown): value is AppUserRole {
  return typeof value === "string" && APP_USER_ROLES.includes(value as AppUserRole)
}

export function normalizeAppUserRole(value: unknown): AppUserRole {
  return isAppUserRole(value) ? value : "user"
}

export function isAdminProfile(profile: Pick<AppUserProfile, "role"> | null | undefined) {
  return profile?.role === "admin"
}
