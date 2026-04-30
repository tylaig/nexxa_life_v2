import { BarChart3, Brain, Compass, FileText, ListOrdered, Shield, Sparkles, Target, Zap } from "lucide-react"

export const diagnosticHero = {
  kicker: "Diagnóstico",
  title: "Transforme percepção em prioridade estratégica para o seu momento atual.",
  description:
    "Uma entrada guiada para organizar contexto pessoal, mapear eixos críticos e produzir uma leitura acionável que conversa com metas, relatórios e o restante do ciclo nexxa_life.",
} as const

export const diagnosticSteps = [
  {
    key: "personal-context",
    label: "Contexto pessoal",
    description: "Coletar sinais do momento atual para interpretar a jornada com mais precisão.",
  },
  {
    key: "strategic-axes",
    label: "Eixos estratégicos",
    description: "Ler os domínios que mais influenciam foco, energia, execução e estabilidade.",
  },
  {
    key: "results",
    label: "Resultados",
    description: "Consolidar score, síntese e próximos passos conectados ao plano de ação.",
  },
] as const

export const diagnosticImpacts = [
  {
    label: "Relatório inicial",
    description: "Panorama do momento atual para dar contexto às decisões do sistema.",
    icon: FileText,
  },
  {
    label: "Sugestão de metas",
    description: "Objetivos priorizados conforme o que mais pede atenção agora.",
    icon: ListOrdered,
  },
  {
    label: "Leitura estratégica",
    description: "Forças, vulnerabilidades e prioridades reunidas em uma narrativa clara.",
    icon: Shield,
  },
  {
    label: "Recomendações",
    description: "Próximos passos com lógica prática e orientação para execução contínua.",
    icon: Brain,
  },
] as const

export const diagnosticStrategicAxes = [
  {
    name: "Clareza",
    score: "78%",
    icon: Compass,
    hint: "Entendimento do momento, direção e prioridades declaradas.",
  },
  {
    name: "Energia",
    score: "64%",
    icon: Zap,
    hint: "Capacidade percebida de sustentar ritmo com recuperação suficiente.",
  },
  {
    name: "Foco",
    score: "71%",
    icon: Target,
    hint: "Nível de concentração dedicado ao que gera maior impacto.",
  },
  {
    name: "Consistência",
    score: "69%",
    icon: BarChart3,
    hint: "Estabilidade entre intenção, rotina e conclusão do que foi planejado.",
  },
] as const

export const diagnosticResultPreview = {
  title: "Saída prevista desta rodada",
  description:
    "A implementação inicial prepara o terreno para conectar score geral, leitura por eixo e trilhas de metas sem reativar a lógica de storage legada como fonte de verdade.",
  highlights: [
    "Resumo do momento atual",
    "Priorização por eixo estratégico",
    "Encaminhamento para metas e relatórios",
  ],
  icon: Sparkles,
} as const
