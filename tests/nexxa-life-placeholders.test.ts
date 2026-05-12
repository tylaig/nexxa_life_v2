import { describe, expect, it } from "vitest"

import { placeholderConfig as agendaPlaceholder } from "@/components/nexxa-life/placeholders/agenda-placeholder"
import { placeholderConfig as checklistPlaceholder } from "@/components/nexxa-life/placeholders/checklist-placeholder"
import { placeholderConfig as diagnosticPlaceholder } from "@/components/nexxa-life/placeholders/diagnostic-placeholder"
import { placeholderConfig as goalsPlaceholder } from "@/components/nexxa-life/placeholders/goals-placeholder"
import { placeholderConfig as journalPlaceholder } from "@/components/nexxa-life/placeholders/journal-placeholder"
import { placeholderConfig as reportsPlaceholder } from "@/components/nexxa-life/placeholders/reports-placeholder"

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

describe("nexxa_life first-wave placeholders", () => {
  it.each(placeholders)("exposes metadata for /$route", ({ route, expectedTitle, expectedDescription, module }) => {
    expect(module.route).toBe(`/${route}`)
    expect(module.title).toBe(expectedTitle)
    expect(module.description).toBe(expectedDescription)
    expect(module.status).toBe("Em adaptação")
    expect(module.legacySource).toMatch(/^old\/nexxa-life-flow\/src\/pages\//)
    expect(module.nextStep).toMatch(/Fase 6/)
  })
})
