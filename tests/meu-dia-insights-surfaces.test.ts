import { describe, expect, it } from "vitest"

describe("nexxa_life insight surfaces contracts", () => {
  it("publishes a diagnostic workspace contract with phases, impact outputs and strategic axes", async () => {
    const module = await import("@/components/meu-dia/diagnostic-content")

    expect(module.diagnosticHero.kicker).toBe("Diagnóstico")
    expect(module.diagnosticSteps.map((step) => step.label)).toEqual([
      "Contexto pessoal",
      "Eixos estratégicos",
      "Resultados",
    ])
    expect(module.diagnosticImpacts).toHaveLength(4)
    expect(module.diagnosticImpacts.map((impact) => impact.label)).toContain("Sugestão de metas")
    expect(module.diagnosticStrategicAxes.map((axis) => axis.name)).toEqual([
      "Clareza",
      "Energia",
      "Foco",
      "Consistência",
    ])
  })

  it("publishes a journal workspace contract with emotion map, prompts and writing cues", async () => {
    const module = await import("@/components/meu-dia/journal-content")

    expect(module.journalHero.kicker).toBe("Diário")
    expect(module.journalEmotions).toHaveLength(8)
    expect(module.journalEmotions.map((emotion) => emotion.label)).toContain("Motivado")
    expect(module.journalPrompts.map((prompt) => prompt.title)).toEqual([
      "Principal aprendizado",
      "Principal erro",
      "Insight relevante",
    ])
    expect(module.journalWritingCues.map((cue) => cue.label)).toEqual([
      "Nota do dia",
      "Emoção predominante",
      "Aprendizado registrado",
    ])
  })

  it("publishes a reports workspace contract with chart modes, KPI cards and AI insights", async () => {
    const module = await import("@/components/meu-dia/reports-content")

    expect(module.reportsHero.kicker).toBe("Relatórios")
    expect(module.reportsChartTabs).toEqual(["Evolução 7 Dias", "Comparativo %"])
    expect(module.reportsKpis.map((item) => item.label)).toEqual([
      "Bem-estar médio",
      "Produtividade média",
      "Saúde mental",
    ])
    expect(module.reportsInsightTemplates).toHaveLength(3)
    expect(module.reportsQuickSignals.map((signal) => signal.label)).toContain("Último diagnóstico")
  })
})
