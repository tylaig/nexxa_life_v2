import { describe, expect, it } from "vitest"

import type { AppUserProfile } from "@/modules/auth-profile/contracts"

const baseProfile: AppUserProfile = {
  userId: "00000000-0000-0000-0000-000000000001",
  email: "admin@nexxalife.local",
  fullName: "Admin NexxaLife",
  onboarded: true,
  onboardingStep: "dashboard",
  role: "admin",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

describe("framework admin role contracts", () => {
  it("models app profiles with an explicit user role and admin predicate", async () => {
    const contracts = await import("@/modules/auth-profile/contracts")

    expect(contracts.APP_USER_ROLES).toEqual(["user", "admin"])
    expect(contracts.isAdminProfile({ ...baseProfile, role: "admin" })).toBe(true)
    expect(contracts.isAdminProfile({ ...baseProfile, role: "user" })).toBe(false)
  })

  it("keeps framework admin out of the sidebar navigation for every role", async () => {
    const navigation = await import("@/components/app-shell/nexxa-life-navigation")

    const adminRoutes = navigation.getNexxaLifeNavigationForProfile({ ...baseProfile, role: "admin" })
      .settingsSections.flatMap((section) => section.children.map((item) => item.href))
    const userRoutes = navigation.getNexxaLifeNavigationForProfile({ ...baseProfile, role: "user" })
      .settingsSections.flatMap((section) => section.children.map((item) => item.href))

    expect(adminRoutes).not.toContain("/framework-admin")
    expect(userRoutes).not.toContain("/framework-admin")
    expect(adminRoutes).toContain("/settings")
    expect(userRoutes).toContain("/settings")
  })

  it("exposes framework admin only through the floating command menu for admins", async () => {
    const commandMenu = await import("@/components/app-shell/command-menu")

    const adminRoutes = commandMenu.getCommandMenuForProfile({ ...baseProfile, role: "admin" })
      .flatMap((group) => group.items.map((item) => item.href))
    const userRoutes = commandMenu.getCommandMenuForProfile({ ...baseProfile, role: "user" })
      .flatMap((group) => group.items.map((item) => item.href))

    expect(adminRoutes).toContain("/framework-admin")
    expect(userRoutes).not.toContain("/framework-admin")
  })

  it("builds framework admin workspace data from persisted profile, diagnostic question and SaaS configuration records", async () => {
    const { buildFrameworkAdminWorkspace } = await import("@/modules/framework-admin/workspace")

    const workspace = buildFrameworkAdminWorkspace({
      profiles: [baseProfile, { ...baseProfile, userId: "user-2", email: "user@nexxalife.local", role: "user", onboarded: false }],
      diagnosticQuestions: [
        { id: "q-1", area: "health", questionText: "Energia física?", questionOrder: 1, active: true, createdAt: baseProfile.createdAt },
        { id: "q-2", area: "mind", questionText: "Clareza mental?", questionOrder: 1, active: false, createdAt: baseProfile.createdAt },
      ],
      billingPlans: [
        {
          id: "plan-pro",
          slug: "pro",
          name: "Pro",
          description: "Plano com IA",
          monthlyPriceCents: 4900,
          yearlyPriceCents: 49000,
          currency: "BRL",
          active: true,
          trialDays: 7,
          seatLimit: 1,
          aiRequestsLimit: 500,
          features: ["IA", "Relatórios"],
          updatedAt: baseProfile.updatedAt,
        },
      ],
      featureFlags: [
        {
          id: "flag-ai",
          flagKey: "nexxa_ai_studio",
          name: "Nexxa AI Studio",
          description: "IA no produto",
          enabled: true,
          rolloutPercentage: 25,
          audience: "pro-users",
          owner: "AI Ops",
          updatedAt: baseProfile.updatedAt,
        },
      ],
      aiPrompts: [
        {
          id: "prompt-coach",
          promptKey: "daily_coach",
          name: "Coach diário",
          description: "Orientação diária",
          model: "gpt-5-mini",
          temperature: 0.4,
          active: true,
          version: 2,
          owner: "AI Ops",
          guardrails: ["Sem diagnóstico médico"],
          updatedAt: baseProfile.updatedAt,
        },
      ],
      integrations: [
        {
          id: "int-supabase",
          providerKey: "supabase",
          name: "Supabase",
          description: "Banco principal",
          status: "connected",
          authType: "service_role",
          maskedSecret: "••••configured",
          lastSyncAt: null,
          owner: "Engineering",
          updatedAt: baseProfile.updatedAt,
        },
      ],
      auditEvents: [
        {
          id: "audit-critical",
          actorEmail: "admin@nexxalife.local",
          eventType: "flag_changed",
          entityType: "feature_flag",
          entityId: "nexxa_ai_studio",
          severity: "critical",
          summary: "Flag sensível alterada",
          createdAt: baseProfile.createdAt,
        },
      ],
      securityPolicies: [
        {
          id: "policy-admin-review",
          policyKey: "admin_role_review",
          name: "Revisão de admins",
          description: "Revisar admins ativos",
          status: "active",
          enforcementLevel: "warn",
          owner: "Security",
          reviewFrequencyDays: 30,
          lastReviewedAt: null,
          updatedAt: baseProfile.updatedAt,
        },
      ],
      contentBlocks: [
        {
          id: "content-hero",
          blockKey: "dashboard_hero",
          title: "Hero",
          surface: "dashboard",
          content: "Texto principal",
          status: "published",
          audience: "all",
          owner: "Growth",
          publishedAt: baseProfile.createdAt,
          updatedAt: baseProfile.updatedAt,
        },
      ],
      settings: [
        {
          id: "setting-mode",
          settingKey: "admin_workspace_mode",
          label: "Modo admin",
          description: "Tabs",
          value: { mode: "tabs" },
          category: "general",
          sensitive: false,
          updatedAt: baseProfile.updatedAt,
        },
      ],
    })

    expect(workspace.kpis).toMatchObject({
      totalUsers: 2,
      adminUsers: 1,
      activeQuestions: 1,
      inactiveQuestions: 1,
      activePlans: 1,
      enabledFlags: 1,
      activePrompts: 1,
      connectedIntegrations: 1,
      criticalAuditEvents: 1,
      activeSecurityPolicies: 1,
      publishedContentBlocks: 1,
    })
    expect(workspace.axes.map((axis) => axis.area)).toContain("health")
    expect(workspace.recentUsers[0]).toMatchObject({ email: "admin@nexxalife.local", role: "admin" })
    expect(workspace.billingPlans[0]).toMatchObject({ slug: "pro", features: ["IA", "Relatórios"] })
    expect(workspace.featureFlags[0]).toMatchObject({ flagKey: "nexxa_ai_studio", enabled: true })
    expect(workspace.aiPrompts[0]).toMatchObject({ promptKey: "daily_coach", version: 2 })
    expect(workspace.integrations[0]).toMatchObject({ providerKey: "supabase", status: "connected" })
    expect(workspace.auditEvents[0]).toMatchObject({ severity: "critical" })
    expect(workspace.securityPolicies[0]).toMatchObject({ policyKey: "admin_role_review", status: "active" })
    expect(workspace.contentBlocks[0]).toMatchObject({ blockKey: "dashboard_hero", status: "published" })
    expect(workspace.settings[0]).toMatchObject({ settingKey: "admin_workspace_mode", category: "general" })
    expect(workspace.adminModules.map((module) => module.id)).toEqual([
      "users-access",
      "diagnostic-framework",
      "plans-billing",
      "feature-flags",
      "ai-prompts",
      "integrations-webhooks",
      "analytics-logs",
      "security-compliance",
      "branding-content",
      "automations-lifecycle",
    ])
  })

  it("keeps safe fallback operational data when optional admin tables are empty or unavailable", async () => {
    const { buildFrameworkAdminWorkspace } = await import("@/modules/framework-admin/workspace")

    const workspace = buildFrameworkAdminWorkspace({ profiles: [], diagnosticQuestions: [] })

    expect(workspace.billingPlans.length).toBeGreaterThan(0)
    expect(workspace.featureFlags.length).toBeGreaterThan(0)
    expect(workspace.aiPrompts.length).toBeGreaterThan(0)
    expect(workspace.integrations.length).toBeGreaterThan(0)
    expect(workspace.securityPolicies.length).toBeGreaterThan(0)
    expect(workspace.contentBlocks.length).toBeGreaterThan(0)
    expect(workspace.settings.length).toBeGreaterThan(0)
    expect(workspace.kpis.activePlans).toBeGreaterThan(0)
  })
})
