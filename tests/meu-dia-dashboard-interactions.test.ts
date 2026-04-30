import { describe, expect, it } from "vitest"

import { reportsChartConfig, reportsComparisonSeries, reportsWeeklySeries } from "@/components/meu-dia/reports-content"

describe("nexxa_life dashboard interactions contracts", () => {
  it("publishes chart datasets and config for the reports dashboard tabs", () => {
    expect(Object.keys(reportsChartConfig)).toEqual([
      "wellBeing",
      "productivity",
      "mood",
      "current",
      "baseline",
    ])

    expect(reportsWeeklySeries).toHaveLength(7)
    expect(reportsWeeklySeries[0]).toMatchObject({
      day: "Seg",
      wellBeing: 70,
      productivity: 62,
      mood: 68,
    })

    expect(reportsComparisonSeries).toEqual([
      { metric: "Bem-estar", current: 76, baseline: 69 },
      { metric: "Produtividade", current: 68, baseline: 61 },
      { metric: "Humor", current: 72, baseline: 64 },
    ])
  })
})
