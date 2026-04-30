import { describe, expect, it } from "vitest"

import { dashboardHero, dashboardPrimaryCards, dashboardQuickLinks } from "@/components/meu-dia/dashboard-content"

describe("Meu Dia dashboard content", () => {
  it("reframes dashboard as a personal execution workspace", () => {
    expect(dashboardHero.kicker).toBe("Dashboard Meu Dia")
    expect(dashboardHero.title).toBe("Seu centro de clareza, execução e evolução.")
    expect(dashboardHero.description).toContain("diagnóstico")
    expect(dashboardHero.description).toContain("checklist")
    expect(dashboardHero.description).toContain("agenda")
  })

  it("prioritizes first-wave Meu Dia surfaces instead of CRM and commerce modules", () => {
    expect(dashboardQuickLinks.map((item) => item.href)).toEqual([
      "/diagnostic",
      "/checklist",
      "/agenda",
      "/goals",
      "/journal",
      "/reports",
    ])

    expect(dashboardQuickLinks.map((item) => item.label)).toEqual([
      "Diagnóstico",
      "Checklist",
      "Agenda",
      "Metas",
      "Diário",
      "Relatórios",
    ])
  })

  it("publishes execution cards aligned to the Meu Dia journey", () => {
    expect(dashboardPrimaryCards.map((card) => card.title)).toEqual([
      "Comece pelo diagnóstico",
      "Execute o dia com foco",
      "Conecte rotina e metas",
    ])

    expect(dashboardPrimaryCards[0]?.href).toBe("/diagnostic")
    expect(dashboardPrimaryCards[1]?.href).toBe("/checklist")
    expect(dashboardPrimaryCards[2]?.href).toBe("/goals")
  })
})
