import { describe, expect, it } from "vitest"

describe("nexxa_life functional surface contracts", () => {
  it("publishes a checklist workspace contract with day periods and summary signals", async () => {
    const checklist = await import("@/components/nexxa-life/checklist-content")

    expect(checklist.checklistHero.title).toBe("Organize o dia com menos ruído e mais execução prática.")
    expect(checklist.checklistHero.description).toContain("prioridades")
    expect(checklist.checklistPeriods.map((period) => period.label)).toEqual(["Manhã", "Tarde", "Noite"])
    expect(checklist.checklistSummaryCards.map((card) => card.label)).toEqual([
      "Concluídas",
      "Pendentes",
      "Avanço do dia",
    ])
  })

  it("publishes an agenda workspace contract with time views, legend and timeline", async () => {
    const agenda = await import("@/components/nexxa-life/agenda-content")

    expect(agenda.agendaHero.title).toBe("Visualize o dia com mais clareza e menos atrito para agir.")
    expect(agenda.agendaViewTabs).toEqual(["Dia", "Semana", "Mês", "Ano"])
    expect(agenda.agendaLegend.map((item) => item.label)).toEqual([
      "Saúde / Estudo",
      "Profissional",
      "Estratégico",
      "Pessoal",
    ])
    expect(agenda.agendaTimeline.length).toBeGreaterThanOrEqual(18)
  })

  it("publishes a goals workspace contract grouped by life axes and measurable progress", async () => {
    const goals = await import("@/components/nexxa-life/goals-content")

    expect(goals.goalsHero.title).toBe("Seu plano estratégico conectado à execução real.")
    expect(goals.goalsKpis.map((item) => item.label)).toEqual([
      "Metas declaradas",
      "Convergência",
      "Concluídas",
    ])
    expect(goals.goalsAxes.map((axis) => axis.title)).toEqual([
      "Saúde Física",
      "Saúde Mental & Emocional",
      "Carreira",
      "Finanças",
    ])
    expect(goals.goalsAxes.every((axis) => axis.goals.length > 0)).toBe(true)
  })
})
