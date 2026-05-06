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

  it("exposes framework admin navigation only to admin profiles", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    const adminRoutes = navigation.getMeuDiaNavigationForProfile({ ...baseProfile, role: "admin" })
      .settingsSections.flatMap((section) => section.children.map((item) => item.href))
    const userRoutes = navigation.getMeuDiaNavigationForProfile({ ...baseProfile, role: "user" })
      .settingsSections.flatMap((section) => section.children.map((item) => item.href))

    expect(adminRoutes).toContain("/framework-admin")
    expect(userRoutes).not.toContain("/framework-admin")
    expect(userRoutes).toContain("/settings")
  })

  it("builds framework admin workspace data from persisted profile and diagnostic question records", async () => {
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
  })
})
