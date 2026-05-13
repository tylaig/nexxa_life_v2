import { meuDiaPriorityFlow } from "@/components/nexxa-life/system-connections"

export const nexxaOnboardingPrefillEntry = {
  label: "Pré-preencher com meu diagnóstico",
  description:
    "Use seu diagnóstico para revisar uma primeira meta e uma tarefa sugerida antes de confirmar qualquer criação no ciclo.",
  href: "/nexxa?prefill=diagnostic",
  classification: "REAL_DRAFT_REVIEW",
} as const

export const nexxaOnboardingPrefillSession = {
  id: "diagnostic-priority-prefill",
  status: "requires_user_confirmation",
  source: "diagnostic_contract_preview",
  destination: "/nexxa",
  persistence: "draft_only_until_confirmed",
  headline: "Transformar diagnóstico em primeiro plano Nexxa",
  disclosure:
    "A Nexxa preparou rascunhos a partir do diagnóstico atual. Nada foi salvo automaticamente: revise e confirme antes de persistir metas ou checklist.",
  confirmationRequired: true,
  blockedActions: ["auto_persist_goals", "auto_persist_checklist"],
  drafts: {
    goal: {
      title: meuDiaPriorityFlow.goal,
      axis: meuDiaPriorityFlow.goalAxis,
      derivedFromAxis: meuDiaPriorityFlow.anchorAxis,
      urgency: meuDiaPriorityFlow.urgency,
      confidenceLabel: meuDiaPriorityFlow.confidenceLabel,
      rationale: meuDiaPriorityFlow.rationale,
      persisted: false,
    },
    checklist: {
      title: meuDiaPriorityFlow.checklistTask,
      period: meuDiaPriorityFlow.checklistPeriod,
      derivedFromAxis: meuDiaPriorityFlow.anchorAxis,
      urgency: meuDiaPriorityFlow.urgency,
      persisted: false,
    },
    agenda: {
      title: meuDiaPriorityFlow.agendaEvent,
      category: meuDiaPriorityFlow.agendaCategory,
      derivedFromAxis: meuDiaPriorityFlow.anchorAxis,
      persisted: false,
    },
  },
  nextSteps: [
    {
      kind: "review_goal",
      label: "Revisar meta sugerida",
      href: "/goals",
    },
    {
      kind: "review_checklist",
      label: "Revisar tarefa sugerida",
      href: "/checklist",
    },
    {
      kind: "open_nexxa",
      label: "Abrir conversa com a Nexxa",
      href: "/nexxa?prefill=diagnostic",
    },
  ],
} as const
