import { BarChart3, Brain, GitBranch, Layers3, ListChecks, ShieldCheck } from "lucide-react"

import { diagnosticStrategicAxes } from "@/components/meu-dia/diagnostic-content"

export const frameworkAdminHero = {
  kicker: "Framework Admin",
  title: "Governe a matriz estrutural que sustenta o diagnóstico Meu Dia.",
  description:
    "Administre eixos, dimensões e perguntas-base do sistema para manter a leitura diagnóstica coerente, auditável e pronta para evoluir sem depender do storage legado.",
} as const

export const frameworkAdminKpis = [
  {
    label: "Eixos ativos",
    value: String(diagnosticStrategicAxes.length),
    hint: "Domínios estratégicos hoje publicados no diagnóstico.",
    icon: Layers3,
  },
  {
    label: "Dimensões mapeadas",
    value: "12",
    hint: "Subcamadas organizadas para detalhar a leitura dos eixos.",
    icon: GitBranch,
  },
  {
    label: "Perguntas estruturais",
    value: "36",
    hint: "Perguntas-base distribuídas entre as dimensões prioritárias.",
    icon: ListChecks,
  },
] as const

export const frameworkAdminAxes = [
  {
    axis: "Saúde Física",
    summary: "Rotina fisiológica, recuperação e sustentação de energia.",
    dimensions: ["Sono & recuperação", "Treino & mobilidade", "Nutrição base"],
    questions: 9,
    owner: "Sistema Meu Dia",
  },
  {
    axis: "Saúde Mental & Emocional",
    summary: "Humor, estabilidade, reflexão e autorregulação.",
    dimensions: ["Humor do dia", "Reflexão", "Estresse percebido"],
    questions: 10,
    owner: "Sistema Meu Dia",
  },
  {
    axis: "Carreira",
    summary: "Execução profissional, direção e impacto do trabalho.",
    dimensions: ["Foco estratégico", "Entrega principal", "Ambiente operacional"],
    questions: 9,
    owner: "Sistema Meu Dia",
  },
  {
    axis: "Finanças",
    summary: "Previsibilidade, margem e controle do sistema financeiro pessoal.",
    dimensions: ["Fluxo de caixa", "Reserva", "Decisões de alocação"],
    questions: 8,
    owner: "Sistema Meu Dia",
  },
] as const

export const frameworkAdminGuardrails = [
  {
    title: "Eixos auditáveis",
    description: "Toda mudança estrutural deve deixar claro qual eixo foi afetado e por quê.",
    icon: ShieldCheck,
  },
  {
    title: "Perguntas orientadas a ação",
    description: "Evitar inflação de perguntas sem impacto real em metas, checklist ou agenda.",
    icon: Brain,
  },
  {
    title: "Leitura comparável",
    description: "Manter consistência para que resultados e relatórios possam ser comparados ao longo do tempo.",
    icon: BarChart3,
  },
] as const
