import { placeholderConfig as diagnosticPlaceholder } from "./diagnostic-placeholder"
import { placeholderConfig as checklistPlaceholder } from "./checklist-placeholder"
import { placeholderConfig as agendaPlaceholder } from "./agenda-placeholder"
import { placeholderConfig as goalsPlaceholder } from "./goals-placeholder"
import { placeholderConfig as journalPlaceholder } from "./journal-placeholder"
import { placeholderConfig as reportsPlaceholder } from "./reports-placeholder"

export const meuDiaPlaceholderRegistry = {
  diagnostic: diagnosticPlaceholder,
  checklist: checklistPlaceholder,
  agenda: agendaPlaceholder,
  goals: goalsPlaceholder,
  journal: journalPlaceholder,
  reports: reportsPlaceholder,
} as const
