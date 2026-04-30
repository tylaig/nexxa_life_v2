import { describe, expect, it } from "vitest"

describe("nexxa_life navigation taxonomy", () => {
  it("exposes the first-wave primary routes in the official shell", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    expect(navigation.primaryItems.map((item) => item.href)).toEqual([
      "/dashboard",
      "/diagnostic",
      "/checklist",
      "/agenda",
      "/goals",
    ])

    expect(navigation.primaryItems.map((item) => item.label)).toEqual([
      "Dashboard",
      "Diagnóstico",
      "Checklist",
      "Agenda",
      "Metas",
    ])
  })

  it("removes the old CRM/commerce taxonomy from the sidebar model", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")
    const labels = [
      ...navigation.primaryItems.map((item) => item.label),
      ...navigation.accordionSections.flatMap((section) => [section.label, ...section.children.map((child) => child.label)]),
      ...navigation.settingsSections.flatMap((section) => [section.label, ...section.children.map((child) => child.label)]),
    ]

    expect(labels).not.toContain("Inbox")
    expect(labels).not.toContain("Contatos")
    expect(labels).not.toContain("Campanhas")
    expect(labels).not.toContain("Automações")
  })

  it("keeps reflection and admin surfaces mapped for the next migration waves", async () => {
    const navigation = await import("@/components/app-shell/meu-dia-navigation")

    expect(navigation.accordionSections.map((section) => section.label)).toEqual([
      "Planejamento",
      "Reflexão",
      "Ecossistema",
    ])

    expect(navigation.accordionSections[0].children.map((item) => item.href)).toEqual([
      "/checklist",
      "/agenda",
      "/goals",
    ])

    expect(navigation.accordionSections[1].children.map((item) => item.href)).toEqual([
      "/journal",
      "/reports",
    ])

    expect(navigation.accordionSections[2].children.map((item) => item.href)).toEqual([
      "/academy",
      "/apps",
      "/news",
      "/marketplace",
    ])

    expect(navigation.settingsSections[0].children.map((item) => item.href)).toEqual([
      "/framework-admin",
      "/settings",
    ])
  })
})
