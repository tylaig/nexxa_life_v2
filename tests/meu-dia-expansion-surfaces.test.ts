import { describe, expect, it } from "vitest"

describe("Meu Dia expansion surface contracts", () => {
  it("publishes a framework admin workspace contract for governing diagnostic axes, dimensions and questions", async () => {
    const module = await import("@/components/meu-dia/framework-admin-content")

    expect(module.frameworkAdminHero.kicker).toBe("Framework Admin")
    expect(module.frameworkAdminHero.title).toBe("Governe a matriz estrutural que sustenta o diagnóstico Meu Dia.")
    expect(module.frameworkAdminKpis.map((item) => item.label)).toEqual([
      "Eixos ativos",
      "Dimensões mapeadas",
      "Perguntas estruturais",
    ])
    expect(module.frameworkAdminAxes.length).toBeGreaterThanOrEqual(3)
    expect(module.frameworkAdminAxes[0]).toMatchObject({
      axis: "Saúde Física",
    })
  })

  it("publishes an academy workspace contract with featured learning tracks and contextual recommendations", async () => {
    const module = await import("@/components/meu-dia/academy-content")

    expect(module.academyHero.kicker).toBe("Academia")
    expect(module.academyHero.title).toBe("Transforme repertório em aprendizado aplicado ao seu ciclo atual.")
    expect(module.academyKpis.map((item) => item.label)).toEqual([
      "Trilhas ativas",
      "Aulas disponíveis",
      "Recomendadas agora",
    ])
    expect(module.academyTracks.length).toBeGreaterThanOrEqual(4)
    expect(module.academyTracks.map((track) => track.title)).toContain("Gestão de Energia e Foco")
    expect(module.academyRecommendations.map((item) => item.axis)).toContain("Energia")
  })

  it("publishes a marketplace workspace contract with curated specialists, categories and contextual fit", async () => {
    const module = await import("@/components/meu-dia/marketplace-content")

    expect(module.marketplaceHero.kicker).toBe("Marketplace")
    expect(module.marketplaceHero.title).toBe("Acesse especialistas e serviços alinhados ao momento do seu sistema pessoal.")
    expect(module.marketplaceKpis.map((item) => item.label)).toEqual([
      "Especialistas verificados",
      "Categorias ativas",
      "Match prioritário",
    ])
    expect(module.marketplaceCategories.map((item) => item.name)).toEqual([
      "Performance",
      "Saúde & Bio",
      "Estratégia",
    ])
    expect(module.marketplaceSpecialists.length).toBeGreaterThanOrEqual(3)
    expect(module.marketplacePriorityMatch).toMatchObject({
      specialistName: "Dr. Marcus Silva",
      linkedAxis: "Energia",
    })
  })
})
