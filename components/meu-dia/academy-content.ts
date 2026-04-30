import { BookOpen, Brain, Compass, Flame, GraduationCap, Heart, ShieldCheck, Sparkles, Star, Zap } from "lucide-react"

import { diagnosticGoalRecommendations } from "@/components/meu-dia/system-connections"

export const academyHero = {
  kicker: "Academia",
  title: "Transforme repertório em aprendizado aplicado ao seu ciclo atual.",
  description:
    "A Academia organiza trilhas que ajudam a corrigir eixos críticos, aprofundar capacidades e conectar estudo com o que o diagnóstico pede agora.",
} as const

export const academyKpis = [
  {
    label: "Trilhas ativas",
    value: "4",
    hint: "Jornadas prontas para apoiar diferentes momentos do sistema pessoal.",
    icon: GraduationCap,
  },
  {
    label: "Aulas disponíveis",
    value: "31",
    hint: "Conteúdos somados das trilhas atualmente publicadas.",
    icon: BookOpen,
  },
  {
    label: "Recomendadas agora",
    value: "2",
    hint: "Trilhas mais aderentes ao eixo crítico dominante desta rodada.",
    icon: Star,
  },
] as const

export const academyTracks = [
  {
    title: "Fundamentos de Alta Performance",
    lessons: 8,
    duration: "2h 40min",
    badge: "Início recomendado",
    icon: Flame,
    focus: "Consistência",
  },
  {
    title: "Construindo Hábitos que Duram",
    lessons: 6,
    duration: "1h 55min",
    badge: "Popular",
    icon: Heart,
    focus: "Consistência",
  },
  {
    title: "Gestão de Energia e Foco",
    lessons: 10,
    duration: "3h 20min",
    badge: "Prioridade atual",
    icon: Zap,
    focus: "Energia",
  },
  {
    title: "Inteligência Emocional Aplicada",
    lessons: 7,
    duration: "2h 10min",
    badge: "Novo",
    icon: Brain,
    focus: "Clareza",
  },
] as const

export const academyRecommendations = diagnosticGoalRecommendations.slice(0, 3).map((item) => ({
  axis: item.axis,
  urgency: item.urgency,
  recommendedTrack:
    item.axis === "Energia"
      ? "Gestão de Energia e Foco"
      : item.axis === "Consistência"
        ? "Construindo Hábitos que Duram"
        : item.axis === "Foco"
          ? "Fundamentos de Alta Performance"
          : "Inteligência Emocional Aplicada",
  reason:
    item.axis === "Energia"
      ? "Recuperar ritmo, sono e capacidade de sustentar execução com menos atrito."
      : item.axis === "Consistência"
        ? "Reforçar cadência e repetição prática entre intenção e rotina."
        : item.axis === "Foco"
          ? "Melhorar blocos de trabalho profundo e priorização real."
          : "Aumentar clareza de contexto e tomada de decisão.",
}))

export const academyGuardrails = [
  {
    title: "Curadoria contextual",
    description: "Estudo deve responder ao diagnóstico atual e não virar biblioteca solta.",
    icon: Compass,
  },
  {
    title: "Aplicação prática",
    description: "Toda trilha precisa conversar com metas, checklist ou agenda para gerar mudança observável.",
    icon: Sparkles,
  },
  {
    title: "Progressão confiável",
    description: "A jornada deve mostrar evolução de repertório sem romper a coerência do sistema.",
    icon: ShieldCheck,
  },
] as const
