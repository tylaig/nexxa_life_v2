import { Briefcase, Heart, Sparkles, Target, TrendingUp, Wallet, Zap } from "lucide-react"

export const goalsHero = {
  kicker: "Objetivos & Metas",
  title: "Seu plano estratégico conectado à execução real.",
  description:
    "Transforme intenção em sistema com metas por eixo, progresso mensurável e conexão explícita entre visão e rotina.",
} as const

export const goalsKpis = [
  {
    label: "Metas declaradas",
    value: "6",
    hint: "Objetivos atualmente acompanhados no plano.",
    icon: Target,
  },
  {
    label: "Convergência",
    value: "58%",
    hint: "Leitura agregada do avanço estratégico.",
    icon: TrendingUp,
  },
  {
    label: "Concluídas",
    value: "2",
    hint: "Metas já fechadas no ciclo atual.",
    icon: Sparkles,
  },
] as const

export const goalsAxes = [
  {
    title: "Saúde Física",
    icon: Heart,
    tone: "red",
    goals: [
      {
        title: "Consolidar rotina de corrida",
        description: "Três treinos por semana sustentados por 8 semanas.",
        progress: 75,
        completedTasks: 6,
        totalTasks: 8,
        deadline: "2026-05-30",
      },
    ],
  },
  {
    title: "Saúde Mental & Emocional",
    icon: Zap,
    tone: "amber",
    goals: [
      {
        title: "Estabilizar rotina de reflexão",
        description: "Registrar aprendizados e revisar energia ao fim do dia.",
        progress: 50,
        completedTasks: 5,
        totalTasks: 10,
        deadline: "2026-05-25",
      },
    ],
  },
  {
    title: "Carreira",
    icon: Briefcase,
    tone: "blue",
    goals: [
      {
        title: "Entregar a migração do nexxa_life",
        description: "Portar as superfícies principais para o shell oficial com consistência visual.",
        progress: 60,
        completedTasks: 6,
        totalTasks: 10,
        deadline: "2026-06-10",
      },
      {
        title: "Fechar backlog operacional crítico",
        description: "Eliminar os principais gargalos do fluxo de trabalho atual.",
        progress: 35,
        completedTasks: 3,
        totalTasks: 9,
        deadline: "2026-06-05",
      },
    ],
  },
  {
    title: "Finanças",
    icon: Wallet,
    tone: "green",
    goals: [
      {
        title: "Revisar margem e previsibilidade",
        description: "Atualizar métricas-chave e reforçar disciplina de acompanhamento.",
        progress: 80,
        completedTasks: 4,
        totalTasks: 5,
        deadline: "2026-05-20",
      },
    ],
  },
] as const
