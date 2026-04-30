import {
  Activity,
  ArrowRight,
  Brain,
  CalendarDays,
  CheckSquare,
  FileBarChart2,
  FileText,
  Target,
} from "lucide-react"

export const dashboardHero = {
  kicker: "Dashboard nexxa_life",
  title: "Seu centro de clareza, execução e evolução.",
  description:
    "Acompanhe seu diagnóstico, organize o checklist, distribua a agenda, revise metas e mantenha o diário e os relatórios conectados no mesmo workspace oficial.",
} as const

export const dashboardPrimaryCards = [
  {
    title: "Comece pelo diagnóstico",
    description: "Revise o momento atual e identifique o próximo movimento com mais clareza.",
    href: "/diagnostic",
    cta: "Abrir diagnóstico",
    icon: Brain,
  },
  {
    title: "Execute o dia com foco",
    description: "Transforme intenção em execução com prioridades objetivas no checklist diário.",
    href: "/checklist",
    cta: "Abrir checklist",
    icon: CheckSquare,
  },
  {
    title: "Conecte rotina e metas",
    description: "Garanta que a agenda e as metas apontem para a mesma direção estratégica.",
    href: "/goals",
    cta: "Abrir metas",
    icon: Target,
  },
] as const

export const dashboardQuickLinks = [
  {
    label: "Diagnóstico",
    description: "Avaliação guiada do momento atual.",
    href: "/diagnostic",
    icon: Brain,
  },
  {
    label: "Checklist",
    description: "Prioridades e execução do dia.",
    href: "/checklist",
    icon: CheckSquare,
  },
  {
    label: "Agenda",
    description: "Planejamento temporal e blocos de foco.",
    href: "/agenda",
    icon: CalendarDays,
  },
  {
    label: "Metas",
    description: "Objetivos, marcos e alinhamento estratégico.",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Diário",
    description: "Registros, aprendizados e reflexão.",
    href: "/journal",
    icon: FileText,
  },
  {
    label: "Relatórios",
    description: "Leitura histórica da evolução.",
    href: "/reports",
    icon: FileBarChart2,
  },
] as const

export const dashboardExecutionSignals = [
  {
    label: "Próxima ação sugerida",
    value: "Abrir checklist",
    hint: "Transformar prioridades em execução prática hoje.",
    icon: Activity,
  },
  {
    label: "Superfícies já publicadas",
    value: "6 rotas",
    hint: "Diagnóstico, checklist, agenda, metas, diário e relatórios.",
    icon: ArrowRight,
  },
  {
    label: "Status da migração",
    value: "Onda 1 pronta",
    hint: "Navegação oficial alinhada ao domínio nexxa_life.",
    icon: Brain,
  },
] as const

export const dashboardAnalyticsTabs = ["Execução", "Bem-estar", "Evolução"] as const
