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
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    const adminRoutes = navigation.getMeuDiaNavigationForProfile({ ...baseProfile, role: "admin" })
      .settingsSections.flatMap((section) => section.children.map((item) => item.href))
    const userRoutes = navigation.getMeuDiaNavigationForProfile({ ...baseProfile, role: "user" })
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
    })

    expect(workspace.kpis).toMatchObject({
      totalUsers: 2,
      adminUsers: 1,
      activeQuestions: 1,
      inactiveQuestions: 1,
    })
    expect(workspace.axes.map((axis) => axis.area)).toContain("health")
    expect(workspace.recentUsers[0]).toMatchObject({ email: "admin@nexxalife.local", role: "admin" })
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
})
