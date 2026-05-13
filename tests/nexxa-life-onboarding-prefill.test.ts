import { describe, expect, it } from "vitest"

describe("nexxa_life onboarding-to-Nexxa pre-fill contract", () => {
  it("publishes an honest diagnostic pre-fill session derived from the current diagnostic priority flow", async () => {
    const module = await import("@/components/nexxa-life/onboarding-prefill")

    expect(module.nexxaOnboardingPrefillSession).toMatchObject({
      id: "diagnostic-priority-prefill",
      status: "requires_user_confirmation",
      source: "diagnostic_contract_preview",
      destination: "/nexxa",
      persistence: "draft_only_until_confirmed",
      headline: "Transformar diagnóstico em primeiro plano Nexxa",
    })

    expect(module.nexxaOnboardingPrefillSession.confirmationRequired).toBe(true)
    expect(module.nexxaOnboardingPrefillSession.blockedActions).toContain("auto_persist_goals")
    expect(module.nexxaOnboardingPrefillSession.blockedActions).toContain("auto_persist_checklist")
    expect(module.nexxaOnboardingPrefillSession.disclosure).toContain("rascunhos")
  })

  it("derives goal and checklist drafts without pretending they were persisted", async () => {
    const module = await import("@/components/nexxa-life/onboarding-prefill")

    expect(module.nexxaOnboardingPrefillSession.drafts.goal).toMatchObject({
      title: "Estabilizar rotina de reflexão",
      axis: "Saúde Mental & Emocional",
      derivedFromAxis: "Energia",
      urgency: "alta",
      confidenceLabel: "match determinístico",
      persisted: false,
    })

    expect(module.nexxaOnboardingPrefillSession.drafts.checklist).toMatchObject({
      title: "Ajustar agenda do restante do dia",
      period: "Tarde",
      derivedFromAxis: "Energia",
      persisted: false,
    })

    expect(module.nexxaOnboardingPrefillSession.nextSteps.map((item) => item.kind)).toEqual([
      "review_goal",
      "review_checklist",
      "open_nexxa",
    ])
  })

  it("exposes onboarding entry copy that routes diagnostic users to Nexxa with explicit review language", async () => {
    const module = await import("@/components/nexxa-life/onboarding-prefill")

    expect(module.nexxaOnboardingPrefillEntry).toMatchObject({
      label: "Pré-preencher com meu diagnóstico",
      href: "/nexxa?prefill=diagnostic",
      classification: "REAL_DRAFT_REVIEW",
    })
    expect(module.nexxaOnboardingPrefillEntry.description).toContain("revisar")
    expect(module.nexxaOnboardingPrefillEntry.description).toContain("confirmar")
  })
})
