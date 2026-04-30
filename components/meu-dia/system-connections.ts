import { agendaTimeline } from "@/components/meu-dia/agenda-content"
import { checklistPeriods, checklistSummaryCards } from "@/components/meu-dia/checklist-content"
import { diagnosticStrategicAxes } from "@/components/meu-dia/diagnostic-content"
import { goalsAxes } from "@/components/meu-dia/goals-content"
import { journalWritingCues } from "@/components/meu-dia/journal-content"
import { reportsKpis } from "@/components/meu-dia/reports-content"

export const meuDiaExecutionGraph = {
  start: "diagnostic",
  sequence: ["diagnostic", "goals", "checklist", "agenda", "journal", "reports"],
  edges: [
    {
      from: "diagnostic",
      to: "goals",
      reason: "Transforma leitura do momento em metas priorizadas.",
    },
    {
      from: "goals",
      to: "checklist",
      reason: "Converte metas estratégicas em tarefas executáveis do dia.",
    },
    {
      from: "checklist",
      to: "agenda",
      reason: "Posiciona as prioridades do dia em blocos temporais realistas.",
    },
    {
      from: "agenda",
      to: "journal",
      reason: "Usa o dia vivido como base para reflexão, aprendizado e ajustes.",
    },
    {
      from: "journal",
      to: "reports",
      reason: "Consolida sinais emocionais e operacionais em leitura histórica.",
    },
  ],
} as const

const recommendationMap = {
  Clareza: {
    recommendedGoal: "Clareza estratégica",
    checklistTask: "Revisar o diagnóstico do dia",
    agendaEvent: "Planejamento do dia",
  },
  Energia: {
    recommendedGoal: "Agenda realista",
    checklistTask: "Ajustar agenda do restante do dia",
    agendaEvent: "Treino e mobilidade",
  },
  Foco: {
    recommendedGoal: "Entrega principal da semana",
    checklistTask: "Preparar bloco profundo de trabalho",
    agendaEvent: "Bloco profundo principal",
  },
  Consistência: {
    recommendedGoal: "Reflexão contínua",
    checklistTask: "Registrar aprendizados do dia",
    agendaEvent: "Diário e revisão final",
  },
} as const

const urgencyByScore = (scoreValue: number) => {
  if (scoreValue <= 65) return "alta"
  if (scoreValue <= 72) return "média"
  return "baixa"
}

const parseScore = (score: string) => Number.parseInt(score.replace(/[^\d]/g, ""), 10)

const diagnosticAxisGoalFallbacks = {
  Clareza: null,
  Energia: "Estabilizar rotina de reflexão",
  Foco: "Entregar a migração do Meu Dia",
  Consistência: "Estabilizar rotina de reflexão",
} as const

const allGoals = goalsAxes.flatMap((axis) =>
  axis.goals.map((goal) => ({
    ...goal,
    axisTitle: axis.title,
  })),
)
const allChecklistTasks = checklistPeriods.flatMap((period) =>
  period.tasks.map((task) => ({
    ...task,
    periodLabel: period.label,
  })),
)
const allAgendaEvents = agendaTimeline.flatMap((slot) =>
  slot.items.map((item) => ({
    ...item,
    slotTime: slot.time,
  })),
)

const resolveExistingGoalTitle = (axisName: keyof typeof diagnosticAxisGoalFallbacks, recommendedGoal: string) => {
  const exactRecommendedGoal = allGoals.find(
    (goal) => goal.title === recommendedGoal || goal.description.includes(recommendedGoal),
  )

  if (exactRecommendedGoal) {
    return exactRecommendedGoal.title
  }

  const fallbackTitle = diagnosticAxisGoalFallbacks[axisName]
  return fallbackTitle && allGoals.some((goal) => goal.title === fallbackTitle) ? fallbackTitle : null
}

export const diagnosticGoalRecommendations = diagnosticStrategicAxes
  .map((axis) => {
    const scoreValue = parseScore(axis.score)
    const mapped = recommendationMap[axis.name as keyof typeof recommendationMap]
    const existingGoalTitle = resolveExistingGoalTitle(
      axis.name as keyof typeof diagnosticAxisGoalFallbacks,
      mapped.recommendedGoal,
    )
    const matchedGoal = existingGoalTitle ? allGoals.find((goal) => goal.title === existingGoalTitle) : null
    const matchingChecklistTask = allChecklistTasks.find((task) => task.title === mapped.checklistTask)
    const matchingAgendaEvent = allAgendaEvents.find((item) => item.label === mapped.agendaEvent)
    const deterministicMatch = Boolean(matchedGoal && matchingChecklistTask && matchingAgendaEvent)

    return {
      axis: axis.name,
      score: axis.score,
      scoreValue,
      priority: 0,
      urgency: urgencyByScore(scoreValue),
      recommendedGoal: mapped.recommendedGoal,
      checklistTask: mapped.checklistTask,
      agendaEvent: mapped.agendaEvent,
      existingGoalTitle,
      linkedGoalAxis: matchedGoal?.axisTitle ?? null,
      linkedGoalProgress: matchedGoal?.progress ?? null,
      matchingChecklistTask: matchingChecklistTask?.title ?? null,
      matchingChecklistPeriod: matchingChecklistTask?.periodLabel ?? null,
      matchingAgendaEvent: matchingAgendaEvent?.label ?? null,
      matchingAgendaCategory: matchingAgendaEvent?.category ?? null,
      deterministicMatch,
    }
  })
  .sort((left, right) => left.scoreValue - right.scoreValue)
  .map((item, index) => ({
    ...item,
    priority: index + 1,
  }))

const topPriorityRecommendation = diagnosticGoalRecommendations[0]
const completedTasks = allChecklistTasks.filter((task) => task.completed).length
const pendingTasks = allChecklistTasks.filter((task) => !task.completed).length
const firstAgendaEvent = allAgendaEvents.find(Boolean)
const journalSignal = journalWritingCues.find((item) => item.label === "Emoção predominante")?.value ?? "—"
const reportsSignal = reportsKpis.find((item) => item.label === "Bem-estar médio")?.value ?? "—"
const executionProgress = checklistSummaryCards.find((item) => item.label === "Avanço do dia")?.value ?? "—"

export const meuDiaWeeklySystemSummary = {
  completedTasks,
  pendingTasks,
  focusGoal: topPriorityRecommendation?.existingGoalTitle ?? topPriorityRecommendation?.recommendedGoal ?? "—",
  nextAgendaEvent: firstAgendaEvent?.label ?? "—",
  journalSignal,
  reportsSignal,
  executionProgress,
  lowestAxis: topPriorityRecommendation?.axis ?? "—",
  priorityLabel: topPriorityRecommendation ? `${topPriorityRecommendation.axis} em zona de atenção` : "—",
} as const

const priorityFlowRationales = {
  Clareza: "Clareza baixa pede redefinir direção e explicitar a prioridade principal antes de expandir o resto do plano.",
  Energia: "Energia baixa pede recomposição do ritmo e ajuste do restante do dia antes da próxima execução profunda.",
  Foco: "Foco abaixo do ideal pede proteger o bloco principal e reduzir dispersão operacional.",
  Consistência: "Consistência frágil pede fechar o dia com revisão e repetibilidade antes de abrir novas frentes.",
} as const

export const meuDiaPriorityFlow = {
  anchorAxis: topPriorityRecommendation?.axis ?? "—",
  urgency: topPriorityRecommendation?.urgency ?? "—",
  priority: topPriorityRecommendation?.priority ?? 0,
  goal: topPriorityRecommendation?.existingGoalTitle ?? topPriorityRecommendation?.recommendedGoal ?? "—",
  goalAxis: topPriorityRecommendation?.linkedGoalAxis ?? "—",
  checklistTask: topPriorityRecommendation?.matchingChecklistTask ?? topPriorityRecommendation?.checklistTask ?? "—",
  checklistPeriod: topPriorityRecommendation?.matchingChecklistPeriod ?? "—",
  agendaEvent: topPriorityRecommendation?.matchingAgendaEvent ?? topPriorityRecommendation?.agendaEvent ?? "—",
  agendaCategory: topPriorityRecommendation?.matchingAgendaCategory ?? "—",
  confidenceLabel: topPriorityRecommendation?.deterministicMatch ? "match determinístico" : "match assistido por fallback",
  rationale:
    priorityFlowRationales[(topPriorityRecommendation?.axis as keyof typeof priorityFlowRationales) ?? "Energia"] ??
    "A prioridade derivada ainda precisa de maior profundidade de domínio.",
} as const
