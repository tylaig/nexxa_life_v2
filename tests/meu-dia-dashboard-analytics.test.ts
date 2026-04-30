import { describe, expect, it } from "vitest"

import { dashboardAnalyticsTabs } from "@/components/meu-dia/dashboard-content"

describe("nexxa_life dashboard analytics contracts", () => {
  it("publishes the analytics tab model for the root dashboard", () => {
    expect(dashboardAnalyticsTabs).toEqual(["Execução", "Bem-estar", "Evolução"])
  })
})
