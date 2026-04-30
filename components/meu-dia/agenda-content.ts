import { CalendarDays, Clock3, LayoutList, Sparkles } from "lucide-react"

export const agendaHero = {
  kicker: "Agenda",
  title: "Visualize o dia com mais clareza e menos atrito para agir.",
  description:
    "Organize blocos, destaque o próximo compromisso e mantenha uma leitura temporal simples para sustentar o ritmo do dia.",
} as const

export const agendaViewTabs = ["Dia", "Semana", "Mês", "Ano"] as const

export const agendaLegend = [
  { key: "blue", label: "Saúde / Estudo" },
  { key: "purple", label: "Profissional" },
  { key: "green", label: "Estratégico" },
  { key: "amber", label: "Pessoal" },
] as const

export const agendaTimeline = [
  { time: "05:00", items: [] },
  { time: "06:00", items: [] },
  { time: "07:00", items: [{ label: "Treino e mobilidade", range: "07:00 - 08:00", category: "Saúde / Estudo", color: "blue" }] },
  { time: "08:00", items: [{ label: "Planejamento do dia", range: "08:00 - 08:30", category: "Estratégico", color: "green" }] },
  { time: "09:00", items: [{ label: "Bloco profundo principal", range: "09:00 - 11:00", category: "Profissional", color: "purple" }] },
  { time: "10:00", items: [] },
  { time: "11:00", items: [{ label: "Follow-ups críticos", range: "11:00 - 11:45", category: "Profissional", color: "purple" }] },
  { time: "12:00", items: [] },
  { time: "13:00", items: [{ label: "Almoço e reset", range: "13:00 - 14:00", category: "Pessoal", color: "amber" }] },
  { time: "14:00", items: [{ label: "Revisão de agenda", range: "14:00 - 14:30", category: "Estratégico", color: "green" }] },
  { time: "15:00", items: [{ label: "Execução operacional", range: "15:00 - 16:30", category: "Profissional", color: "purple" }] },
  { time: "16:00", items: [] },
  { time: "17:00", items: [{ label: "Consolidação de entregas", range: "17:00 - 17:45", category: "Estratégico", color: "green" }] },
  { time: "18:00", items: [] },
  { time: "19:00", items: [{ label: "Tempo de família", range: "19:00 - 20:30", category: "Pessoal", color: "amber" }] },
  { time: "20:00", items: [] },
  { time: "21:00", items: [{ label: "Diário e revisão final", range: "21:00 - 21:20", category: "Saúde / Estudo", color: "blue" }] },
  { time: "22:00", items: [] },
  { time: "23:00", items: [] },
] as const

export const agendaSummaryCards = [
  {
    label: "Evento(s) do dia",
    value: "8",
    hint: "Blocos já estruturados na visão atual.",
    icon: CalendarDays,
  },
  {
    label: "Próximo horário",
    value: "07:00",
    hint: "Primeiro compromisso confirmado do dia.",
    icon: Clock3,
  },
  {
    label: "Leitura ativa",
    value: "Visão diária",
    hint: "A experiência atual está otimizada para o recorte do dia.",
    icon: Sparkles,
  },
] as const

export const agendaListHighlights = {
  title: "Compromissos do dia",
  description: "Resumo linear para quem precisa enxergar rapidamente a cadência do dia.",
  icon: LayoutList,
} as const
