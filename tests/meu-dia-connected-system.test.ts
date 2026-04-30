import { describe, expect, it } from "vitest"

describe("Meu Dia connected system contracts", () => {
  it("publishes a connected execution graph linking diagnostic axes, goals, checklist, agenda, journal and reports", async () => {
    const module = await import("@/components/meu-dia/system-connections")

    expect(module.meuDiaExecutionGraph.start).toBe("diagnostic")
    expect(module.meuDiaExecutionGraph.sequence).toEqual([
      "diagnostic",
      "goals",
      "checklist",
      "agenda",
      "journal",
      "reports",
    ])
    expect(module.meuDiaExecutionGraph.edges).toHaveLength(5)
    expect(module.meuDiaExecutionGraph.edges[0]).toMatchObject({
      from: "diagnostic",
      to: "goals",
      reason: "Transforma leitura do momento em metas priorizadas.",
    })
  })

  it("derives ranked recommendations from diagnostic scores and keeps them connected to execution surfaces", async () => {
    const module = await import("@/components/meu-dia/system-connections")

    expect(module.diagnosticGoalRecommendations).toHaveLength(4)
    expect(module.diagnosticGoalRecommendations.map((item) => item.axis)).toEqual([
      "Energia",
      "Consistência",
      "Foco",
      "Clareza",
    ])
    expect(module.diagnosticGoalRecommendations[0]).toMatchObject({
      axis: "Energia",
      priority: 1,
      scoreValue: 64,
      urgency: "alta",
      existingGoalTitle: "Estabilizar rotina de reflexão",
      linkedGoalAxis: "Saúde Mental & Emocional",
      linkedGoalProgress: 50,
      matchingChecklistTask: "Ajustar agenda do restante do dia",
      matchingChecklistPeriod: "Tarde",
      matchingAgendaEvent: "Treino e mobilidade",
      matchingAgendaCategory: "Saúde / Estudo",
      deterministicMatch: true,
    })
    expect(module.diagnosticGoalRecommendations.find((item) => item.axis === "Clareza")).toMatchObject({
      priority: 4,
      urgency: "baixa",
      existingGoalTitle: null,
      deterministicMatch: false,
    })
  })

  it("publishes a consolidated weekly system summary combining execution, reflection and reporting signals", async () => {
    const module = await import("@/components/meu-dia/system-connections")

    expect(module.meuDiaWeeklySystemSummary.completedTasks).toBe(3)
    expect(module.meuDiaWeeklySystemSummary.pendingTasks).toBe(5)
    expect(module.meuDiaWeeklySystemSummary.focusGoal).toBe("Estabilizar rotina de reflexão")
    expect(module.meuDiaWeeklySystemSummary.nextAgendaEvent).toBe("Treino e mobilidade")
    expect(module.meuDiaWeeklySystemSummary.journalSignal).toBe("Motivado")
    expect(module.meuDiaWeeklySystemSummary.reportsSignal).toBe("76%")
    expect(module.meuDiaWeeklySystemSummary.lowestAxis).toBe("Energia")
    expect(module.meuDiaWeeklySystemSummary.priorityLabel).toBe("Energia em zona de atenção")
  })

  it("publishes a deterministic priority journey with confidence and rationale for the dashboard", async () => {
    const module = await import("@/components/meu-dia/system-connections")

    expect(module.meuDiaPriorityFlow).toMatchObject({
      anchorAxis: "Energia",
      urgency: "alta",
      priority: 1,
      goal: "Estabilizar rotina de reflexão",
      goalAxis: "Saúde Mental & Emocional",
      checklistTask: "Ajustar agenda do restante do dia",
      checklistPeriod: "Tarde",
      agendaEvent: "Treino e mobilidade",
      agendaCategory: "Saúde / Estudo",
      confidenceLabel: "match determinístico",
      rationale: "Energia baixa pede recomposição do ritmo e ajuste do restante do dia antes da próxima execução profunda.",
    })
  })
})
