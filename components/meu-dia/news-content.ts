import { BookOpen, Brain, Compass, Flame, HeartPulse, Layers3, Search, Sparkles, TrendingUp, Zap } from "lucide-react"

import { diagnosticGoalRecommendations } from "@/components/meu-dia/system-connections"

export const newsHero = {
  kicker: "News",
  title: "Curadoria estratégica para transformar leitura em decisão, repertório e execução.",
  description:
    "A superfície de News deixa de ser apenas uma lista de artigos e vira uma camada editorial do Meu Dia: sinal, contexto e leitura acionável para melhorar decisão, repertório e execução.",
} as const

export const newsKpis = [
  {
    label: "Camadas editoriais",
    value: "3",
    hint: "Leituras organizadas entre radar, contexto e aplicação imediata.",
    icon: Layers3,
  },
  {
    label: "Temas prioritários",
    value: "87%",
    hint: "Assuntos com maior aderência ao momento atual do sistema pessoal.",
    icon: TrendingUp,
  },
  {
    label: "Leituras acionáveis",
    value: "64%",
    hint: "Conteúdos que podem virar decisão, ajuste ou execução ainda nesta semana.",
    icon: Zap,
  },
] as const

export const newsCategories = ["Todos", "Performance", "Biohacking", "Inteligência Artificial", "Saúde", "Carreira"] as const

export const newsArticles = [
  {
    id: 1,
    title: "O Guia Definitivo do Biohacking em 2026",
    description:
      "Como as novas tecnologias de monitoramento contínuo de glicose estão mudando a forma como comemos, treinamos e recuperamos energia.",
    category: "Biohacking",
    readTime: "8 min",
    level: "Avançado",
    impact: "Alto impacto",
    featured: true,
  },
  {
    id: 2,
    title: "IA Generativa na Gestão de Tempo",
    description:
      "Como agentes, automações e copilotos reduzem atrito operacional e devolvem clareza para a execução diária.",
    category: "Inteligência Artificial",
    readTime: "5 min",
    level: "Intermediário",
    impact: "Execução imediata",
    featured: false,
  },
  {
    id: 3,
    title: "Protocolos de Recuperação Profunda",
    description: "Sono, recuperação e gestão de energia para sustentar performance sem colapsar no médio prazo.",
    category: "Saúde",
    readTime: "12 min",
    level: "Essencial",
    impact: "Base fisiológica",
    featured: false,
  },
  {
    id: 4,
    title: "O Futuro das Carreiras em Tecnologia",
    description: "Por que repertório, julgamento e execução sistêmica estão se tornando diferenciais decisivos.",
    category: "Carreira",
    readTime: "6 min",
    level: "Leitura rápida",
    impact: "Reposicionamento",
    featured: false,
  },
  {
    id: 5,
    title: "Performance sem ruído: menos inputs, mais decisão",
    description: "A curadoria certa importa mais do que volume. O excesso de leitura também pode sabotar clareza.",
    category: "Performance",
    readTime: "4 min",
    level: "Objetivo",
    impact: "Clareza mental",
    featured: false,
  },
] as const

export const newsFeaturedArticle = newsArticles.find((item) => item.featured) ?? newsArticles[0]
export const newsLibraryArticles = newsArticles.filter((item) => item.id !== newsFeaturedArticle.id)

export const newsFeaturedArticleActions = [
  "Explorar curadoria",
  "Salvar temas",
  "Ler agora",
  "Relacionar com metas",
] as const

export const newsRadarSummary = {
  label: "Radar editorial",
  status: "feed ativo",
  filteredCount: newsArticles.length,
} as const

export const newsPrioritySignals = diagnosticGoalRecommendations.slice(0, 3).map((item) => ({
  axis: item.axis,
  urgency: item.urgency,
  recommendedCategory:
    item.axis === "Energia"
      ? "Saúde"
      : item.axis === "Foco"
        ? "Inteligência Artificial"
        : item.axis === "Consistência"
          ? "Performance"
          : "Carreira",
  reason:
    item.axis === "Energia"
      ? "Priorize leituras que melhorem recuperação, sono e gestão de energia antes de expandir complexidade operacional."
      : item.axis === "Foco"
        ? "Use leituras sobre IA e automação para reduzir ruído, proteger atenção e reforçar blocos profundos."
        : item.axis === "Consistência"
          ? "Busque leituras sobre cadência, hábito e repetibilidade para estabilizar a rotina antes de escalar novas frentes."
          : "Escolha leituras de carreira e reposicionamento para aumentar clareza estratégica e direção.",
}))

export const newsReadingInsights = [
  {
    title: "IA + rotina",
    description: "melhor combinação para automação tática",
    icon: Brain,
  },
  {
    title: "Saúde",
    description: "mais útil quando conectada com energia operacional",
    icon: HeartPulse,
  },
  {
    title: "Carreira",
    description: "melhor quando vira reposicionamento prático",
    icon: Compass,
  },
] as const

export const newsSearchExperience = {
  label: "Busca e filtros",
  title: "Monte seu recorte de leitura",
  placeholder: "Buscar tema, categoria ou impacto...",
  icon: Search,
} as const

export const newsSurfaceGuardrails = [
  {
    title: "Curadoria orientada por utilidade",
    description: "O feed deve reduzir ruído e destacar leituras com chance real de gerar ajuste no ciclo atual.",
    icon: Sparkles,
  },
  {
    title: "Relação com metas",
    description: "A leitura mais valiosa é a que conversa com metas, checklist ou agenda, não a que só informa.",
    icon: Flame,
  },
  {
    title: "Biblioteca viva",
    description: "A superfície deve combinar radar rápido, contexto editorial e acervo recente sem virar depósito genérico.",
    icon: BookOpen,
  },
] as const
