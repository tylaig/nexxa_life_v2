import { AlertCircle, BookOpen, Brain, HeartHandshake, Lightbulb, Save, Sparkles } from "lucide-react"

export const journalHero = {
  kicker: "Diário",
  title: "Registre o que merece permanecer visível na sua jornada.",
  description:
    "Uma superfície de reflexão prática para consolidar nota do dia, emoção predominante, aprendizados, erros e insights sem quebrar o fluxo operacional do shell atual.",
} as const

export const journalEmotions = [
  { emoji: "😰", label: "Ansioso" },
  { emoji: "🔥", label: "Motivado" },
  { emoji: "😴", label: "Cansado" },
  { emoji: "🎯", label: "Focado" },
  { emoji: "😄", label: "Feliz" },
  { emoji: "😤", label: "Frustrado" },
  { emoji: "😌", label: "Tranquilo" },
  { emoji: "💪", label: "Confiante" },
] as const

export const journalPrompts = [
  {
    title: "Principal aprendizado",
    description: "O que vale ser lembrado e reutilizado em decisões futuras.",
    placeholder: "Descreva o principal aprendizado do dia...",
    icon: BookOpen,
  },
  {
    title: "Principal erro",
    description: "Onde houve ruído, desperdício ou uma decisão que merece correção.",
    placeholder: "Descreva o principal erro ou algo que faria diferente...",
    icon: AlertCircle,
  },
  {
    title: "Insight relevante",
    description: "Conexões, ideias ou percepções que podem gerar vantagem prática.",
    placeholder: "Registre insights, ideias ou conexões importantes...",
    icon: Lightbulb,
  },
] as const

export const journalWritingCues = [
  {
    label: "Nota do dia",
    value: "8/10",
    hint: "Leitura rápida do dia para facilitar comparação ao longo do tempo.",
    icon: Brain,
  },
  {
    label: "Emoção predominante",
    value: "Motivado",
    hint: "Estado emocional mais representativo do período atual.",
    icon: HeartHandshake,
  },
  {
    label: "Aprendizado registrado",
    value: "Sim",
    hint: "Confirma que o dia gerou pelo menos uma captura útil de aprendizagem.",
    icon: Save,
  },
] as const

export const journalPracticeTips = [
  {
    title: "Registro mínimo viável",
    description: "Mesmo em dias corridos, registre nota, emoção e um aprendizado antes de encerrar.",
    icon: Sparkles,
  },
  {
    title: "Use o diário como memória operacional",
    description: "Escreva pensando no que será útil revisar antes de uma nova rodada de execução.",
    icon: Brain,
  },
] as const
