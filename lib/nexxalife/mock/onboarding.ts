import type { OnboardingSnapshot } from "../contracts"

export const mockOnboarding: OnboardingSnapshot = {
  id: "onboarding_phase1",
  profileId: "profile_samuel",
  currentStep: "disponibilidade",
  completedSteps: ["contexto", "foco", "desafios"],
  readinessLevel: "in_progress",
  createdAt: "2026-04-29T09:00:00.000Z",
  updatedAt: "2026-04-29T21:45:00.000Z",
}

export const mockOnboardingSteps = [
  { key: "contexto", label: "Contexto de vida", status: "completed" as const },
  { key: "foco", label: "Foco atual", status: "completed" as const },
  { key: "desafios", label: "Desafios principais", status: "completed" as const },
  { key: "disponibilidade", label: "Disponibilidade e ritmo", status: "current" as const },
  { key: "revisao", label: "Revisão inicial", status: "upcoming" as const },
]
