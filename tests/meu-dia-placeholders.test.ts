import { describe, expect, it } from "vitest"

import { placeholderConfig as agendaPlaceholder } from "@/components/meu-dia/placeholders/agenda-placeholder"
import { placeholderConfig as checklistPlaceholder } from "@/components/meu-dia/placeholders/checklist-placeholder"
import { placeholderConfig as diagnosticPlaceholder } from "@/components/meu-dia/placeholders/diagnostic-placeholder"
import { placeholderConfig as goalsPlaceholder } from "@/components/meu-dia/placeholders/goals-placeholder"
import { placeholderConfig as journalPlaceholder } from "@/components/meu-dia/placeholders/journal-placeholder"
import { placeholderConfig as reportsPlaceholder } from "@/components/meu-dia/placeholders/reports-placeholder"

const placeholders = [
  {
    route: "diagnostic",
    expectedTitle: "Diagnóstico",
    expectedDescription: "Entrada guiada para avaliar o momento atual e orientar o plano de ação.",
    module: diagnosticPlaceholder,
  },
  {
    route: "checklist",
    expectedTitle: "Checklist",
    expectedDescription: "Execução diária priorizada com foco no que precisa acontecer hoje.",
    module: checklistPlaceholder,
  },
  {
    route: "agenda",
    expectedTitle: "Agenda",
    expectedDescription: "Planejamento temporal com compromissos, blocos de foco e visão da semana.",
    module: agendaPlaceholder,
  },
  {
    route: "goals",
    expectedTitle: "Metas",
    expectedDescription: "Objetivos, metas e marcos que conectam estratégia com execução.",
    module: goalsPlaceholder,
  },
  {
    route: "journal",
    expectedTitle: "Diário",
    expectedDescription: "Registro de reflexões, aprendizados e eventos relevantes da jornada.",
    module: journalPlaceholder,
  },
  {
    route: "reports",
    expectedTitle: "Relatórios",
    expectedDescription: "Sínteses históricas para acompanhar evolução, padrões e consistência.",
    module: reportsPlaceholder,
  },
] as const

describe("Meu Dia first-wave placeholders", () => {
  it.each(placeholders)("exposes metadata for /$route", ({ route, expectedTitle, expectedDescription, module }) => {
    expect(module.route).toBe(`/${route}`)
    expect(module.title).toBe(expectedTitle)
    expect(module.description).toBe(expectedDescription)
    expect(module.status).toBe("Em adaptação")
    expect(module.legacySource).toMatch(/^old\/meu-dia-flow\/src\/pages\//)
    expect(module.nextStep).toMatch(/Fase 6/)
  })
})
