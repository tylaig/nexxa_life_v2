import { describe, expect, it } from "vitest"

import type { AppUserProfile } from "@/modules/auth-profile/contracts"

const adminProfile = { role: "admin" } satisfies Pick<AppUserProfile, "role">
const userProfile = { role: "user" } satisfies Pick<AppUserProfile, "role">

describe("nexxa_life navigation taxonomy", () => {
  it("exposes the current primary routes in the official shell", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    expect(navigation.primaryItems.map((item) => item.href)).toEqual([
      "/dashboard",
      "/studio",
    ])

    expect(navigation.primaryItems.map((item) => item.label)).toEqual([
      "Dashboard",
      "AI Studio",
    ])
  })

  it("removes the old CRM/commerce taxonomy from the sidebar model", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")
    const labels = [
      ...navigation.primaryItems.map((item) => item.label),
      ...navigation.accordionSections.flatMap((section) => [section.label, ...section.children.map((child) => child.label)]),
      ...navigation.getMeuDiaNavigationForProfile(adminProfile).settingsSections.flatMap((section) => [
        section.label,
        ...section.children.map((child) => child.label),
      ]),
    ]

    expect(labels).not.toContain("Inbox")
    expect(labels).not.toContain("Contatos")
    expect(labels).not.toContain("Campanhas")
    expect(labels).not.toContain("Automações")
  })

  it("keeps cycle and ecosystem surfaces mapped for migration waves", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    expect(navigation.accordionSections.map((section) => section.label)).toEqual([
      "Meu Ciclo",
      "Ecossistema",
    ])

    expect(navigation.accordionSections[0].children.map((item) => item.href)).toEqual([
      "/goals",
      "/checklist",
      "/agenda",
      "/journal",
      "/reports",
    ])

    expect(navigation.accordionSections[1].children.map((item) => item.href)).toEqual([
      "/academy",
      "/apps",
      "/news",
      "/marketplace",
    ])
  })

  it("keeps framework-admin out of the sidebar navigation for every profile", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    for (const profile of [adminProfile, userProfile, null]) {
      const sidebarNavigation = navigation.getMeuDiaNavigationForProfile(profile)
      const sidebarHrefs = [
        ...sidebarNavigation.primaryItems.map((item) => item.href),
        ...sidebarNavigation.accordionSections.flatMap((section) => section.children.map((item) => item.href)),
        ...sidebarNavigation.settingsSections.flatMap((section) => section.children.map((item) => item.href)),
      ]

      expect(sidebarHrefs).not.toContain("/framework-admin")
      expect(sidebarNavigation.settingsSections[0].children.map((item) => item.href)).toEqual(["/settings"])
    }
  })

  it("keeps framework-admin available only in the floating command menu for admins", async () => {
    const commandMenu = await import("@/components/app-shell/command-menu")

    const adminCommandHrefs = commandMenu.getCommandMenuForProfile(adminProfile).flatMap((group) =>
      group.items.map((item) => item.href),
    )
    const userCommandHrefs = commandMenu.getCommandMenuForProfile(userProfile).flatMap((group) =>
      group.items.map((item) => item.href),
    )
    const anonymousCommandHrefs = commandMenu.getCommandMenuForProfile(null).flatMap((group) =>
      group.items.map((item) => item.href),
    )

    expect(adminCommandHrefs).toContain("/framework-admin")
    expect(userCommandHrefs).not.toContain("/framework-admin")
    expect(anonymousCommandHrefs).not.toContain("/framework-admin")
  })
})
