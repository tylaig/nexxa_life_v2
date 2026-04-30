import { describe, expect, it } from "vitest"

describe("Meu Dia news surface contracts", () => {
  it("publishes a news workspace contract with editorial hero, filters, featured article and contextual signals", async () => {
    const module = await import("@/components/meu-dia/news-content")

    expect(module.newsHero.kicker).toBe("News")
    expect(module.newsHero.title).toBe("Curadoria estratégica para transformar leitura em decisão, repertório e execução.")
    expect(module.newsKpis.map((item) => item.label)).toEqual([
      "Camadas editoriais",
      "Temas prioritários",
      "Leituras acionáveis",
    ])
    expect(module.newsCategories).toEqual([
      "Todos",
      "Performance",
      "Biohacking",
      "Inteligência Artificial",
      "Saúde",
      "Carreira",
    ])
    expect(module.newsFeaturedArticle).toMatchObject({
      title: "O Guia Definitivo do Biohacking em 2026",
      category: "Biohacking",
      readTime: "8 min",
      level: "Avançado",
      impact: "Alto impacto",
    })
    expect(module.newsFeaturedArticleActions).toEqual([
      "Explorar curadoria",
      "Salvar temas",
      "Ler agora",
      "Relacionar com metas",
    ])
    expect(module.newsRadarSummary).toMatchObject({
      label: "Radar editorial",
      status: "feed ativo",
      filteredCount: 5,
    })
  })

  it("derives contextual reading priorities from the current Meu Dia system signals", async () => {
    const module = await import("@/components/meu-dia/news-content")

    expect(module.newsPrioritySignals).toHaveLength(3)
    expect(module.newsPrioritySignals[0]).toMatchObject({
      axis: "Energia",
      recommendedCategory: "Saúde",
      reason: "Priorize leituras que melhorem recuperação, sono e gestão de energia antes de expandir complexidade operacional.",
    })
    expect(module.newsReadingInsights.map((item) => item.title)).toEqual([
      "IA + rotina",
      "Saúde",
      "Carreira",
    ])
    expect(module.newsLibraryArticles.length).toBe(4)
    expect(module.newsLibraryArticles.map((item) => item.title)).toContain("IA Generativa na Gestão de Tempo")
  })
})
