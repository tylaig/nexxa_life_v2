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

  it("keeps framework-admin visible only in the admin navigation model", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    expect(navigation.getMeuDiaNavigationForProfile(adminProfile).settingsSections[0].children.map((item) => item.href)).toEqual([
      "/framework-admin",
      "/settings",
    ])

    expect(navigation.getMeuDiaNavigationForProfile(userProfile).settingsSections[0].children.map((item) => item.href)).toEqual([
      "/settings",
    ])

    expect(navigation.getMeuDiaNavigationForProfile(null).settingsSections[0].children.map((item) => item.href)).toEqual([
      "/settings",
    ])
  })
})
