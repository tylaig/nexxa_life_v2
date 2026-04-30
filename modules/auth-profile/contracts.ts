export const ONBOARDING_STEPS = ["profile", "diagnostic", "dashboard"] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export type AppUserProfile = {
  userId: string
  email: string
  fullName: string
  nickname?: string
  phone?: string
  onboarded: boolean
  onboardingStep: OnboardingStep
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
}
