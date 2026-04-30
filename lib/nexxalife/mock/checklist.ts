import type { ChecklistTask } from "../contracts"

export const mockChecklistTasks: ChecklistTask[] = [
  {
    id: "task_focus_block",
    title: "Executar 60 minutos de foco profundo na prioridade principal",
    status: "done",
    goalId: "goal_strategy",
    plannedFor: "Hoje • 09:00",
    notes: "Bloco concluído sem interrupções longas.",
  },
  {
    id: "task_priority_review",
    title: "Revisar prioridades do dia e eliminar uma distração recorrente",
    status: "done",
    goalId: "goal_routine",
    plannedFor: "Hoje • 10:30",
  },
  {
    id: "task_agenda_cleanup",
    title: "Organizar a agenda de amanhã com blocos realistas",
    status: "pending",
    goalId: "goal_routine",
    plannedFor: "Hoje • 15:00",
  },
  {
    id: "task_weekly_goal_note",
    title: "Registrar um avanço concreto da meta estratégica",
    status: "pending",
    goalId: "goal_strategy",
    plannedFor: "Hoje • 16:30",
  },
  {
    id: "task_blocker",
    title: "Resolver dependência externa para liberar revisão semanal",
    status: "blocked",
    goalId: "goal_review",
    plannedFor: "Hoje • 18:00",
    notes: "Aguardando definição externa antes de seguir.",
  },
  {
    id: "task_close_day",
    title: "Fechamento do dia com 3 linhas de aprendizado",
    status: "pending",
    plannedFor: "Hoje • 20:00",
    notes: "Baixa fricção: manter curto e objetivo.",
  },
]
