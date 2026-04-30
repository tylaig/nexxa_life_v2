import { CheckCircle2, Circle, Moon, Sparkles, Sun, Sunrise, Target } from "lucide-react"

export const checklistHero = {
  kicker: "Checklist diário",
  title: "Organize o dia com menos ruído e mais execução prática.",
  description:
    "Visualize prioridades, acompanhe o avanço por período e mantenha cada tarefa conectada ao que realmente precisa acontecer hoje.",
} as const

export const checklistPeriods = [
  {
    key: "manha",
    label: "Manhã",
    icon: Sunrise,
    progress: 67,
    tasks: [
      {
        title: "Revisar o diagnóstico do dia",
        targetTime: "20 min",
        completed: true,
        linkedGoal: "Clareza estratégica",
      },
      {
        title: "Definir as 3 prioridades críticas",
        targetTime: "15 min",
        completed: true,
        linkedGoal: "Execução consistente",
      },
      {
        title: "Preparar bloco profundo de trabalho",
        targetTime: "90 min",
        completed: false,
        linkedGoal: "Entrega principal da semana",
      },
    ],
  },
  {
    key: "tarde",
    label: "Tarde",
    icon: Sun,
    progress: 33,
    tasks: [
      {
        title: "Executar bloco de follow-up e decisões",
        targetTime: "45 min",
        completed: false,
        linkedGoal: "Ritmo operacional",
      },
      {
        title: "Ajustar agenda do restante do dia",
        targetTime: "15 min",
        completed: true,
        linkedGoal: "Agenda realista",
      },
      {
        title: "Consolidar entregas concluídas",
        targetTime: "30 min",
        completed: false,
        linkedGoal: "Fechamento disciplinado",
      },
    ],
  },
  {
    key: "noite",
    label: "Noite",
    icon: Moon,
    progress: 0,
    tasks: [
      {
        title: "Registrar aprendizados do dia",
        targetTime: "15 min",
        completed: false,
        linkedGoal: "Reflexão contínua",
      },
      {
        title: "Planejar primeira ação de amanhã",
        targetTime: "10 min",
        completed: false,
        linkedGoal: "Continuidade sem atrito",
      },
    ],
  },
] as const

export const checklistSummaryCards = [
  {
    label: "Concluídas",
    value: "3",
    hint: "Tarefas já encerradas no fluxo de hoje.",
    icon: CheckCircle2,
  },
  {
    label: "Pendentes",
    value: "5",
    hint: "Itens ainda abertos ao longo dos períodos.",
    icon: Circle,
  },
  {
    label: "Avanço do dia",
    value: "38%",
    hint: "Leitura consolidada da execução diária.",
    icon: Sparkles,
  },
] as const

export const checklistFocusCard = {
  title: "Próxima prioridade",
  description: "O que merece atenção agora para reduzir dispersão e manter o dia avançando.",
  task: {
    title: "Preparar bloco profundo de trabalho",
    period: "Manhã",
    targetTime: "90 min",
    linkedGoal: "Entrega principal da semana",
    guidance: "Feche o contexto, elimine ruído e transforme esta tarefa no principal movimento operacional do dia.",
    icon: Target,
  },
} as const
