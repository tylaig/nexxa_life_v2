import { BriefcaseBusiness, HeartPulse, ShieldCheck, Sparkles, Star, Stethoscope, UserRound, Zap } from "lucide-react"

import { diagnosticGoalRecommendations } from "@/components/meu-dia/system-connections"

export const marketplaceHero = {
  kicker: "Marketplace",
  title: "Acesse especialistas e serviços alinhados ao momento do seu sistema pessoal.",
  description:
    "O Marketplace conecta necessidades práticas do seu ciclo atual com especialistas, protocolos e serviços que ajudam a destravar energia, foco, saúde e estratégia.",
} as const

export const marketplaceKpis = [
  {
    label: "Especialistas verificados",
    value: "96%",
    hint: "Perfis disponíveis com curadoria e validação mínima de atuação.",
    icon: ShieldCheck,
  },
  {
    label: "Categorias ativas",
    value: "3",
    hint: "Frentes principais de apoio operacional já mapeadas.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Match prioritário",
    value: "Energia",
    hint: "Categoria mais aderente ao eixo crítico dominante nesta rodada.",
    icon: Sparkles,
  },
] as const

export const marketplaceCategories = [
  {
    name: "Performance",
    description: "Execução, rotina, energia e performance humana.",
    icon: Zap,
  },
  {
    name: "Saúde & Bio",
    description: "Protocolos de recuperação, saúde e longevidade.",
    icon: HeartPulse,
  },
  {
    name: "Estratégia",
    description: "Negócio, tomada de decisão e desenho sistêmico.",
    icon: BriefcaseBusiness,
  },
] as const

export const marketplaceSpecialists = [
  {
    name: "Dr. Marcus Silva",
    role: "Especialista em Performance Humana",
    price: "R$ 450/sessão",
    availability: "Agenda em 48h",
    tags: ["Biohacking", "Nutrologia", "Sono"],
    icon: Stethoscope,
    fitAxis: "Energia",
  },
  {
    name: "Ana Costa",
    role: "Estrategista de Negócios & IA",
    price: "Sob consulta",
    availability: "Prioridade esta semana",
    tags: ["IA", "Escala", "Sistemas"],
    icon: BriefcaseBusiness,
    fitAxis: "Foco",
  },
  {
    name: "Ricardo Mello",
    role: "Psicólogo de Performance",
    price: "R$ 380/sessão",
    availability: "Próxima janela em 72h",
    tags: ["Mindset", "Foco", "Resiliência"],
    icon: UserRound,
    fitAxis: "Consistência",
  },
] as const

const topAxis = diagnosticGoalRecommendations[0]?.axis ?? "Energia"
const topSpecialist = marketplaceSpecialists.find((item) => item.fitAxis === topAxis) ?? marketplaceSpecialists[0]

export const marketplacePriorityMatch = {
  specialistName: topSpecialist.name,
  linkedAxis: topAxis,
  recommendation:
    topAxis === "Energia"
      ? "Priorizar protocolos de sono, treino e recuperação para sustentar execução com menos desgaste."
      : topAxis === "Foco"
        ? "Buscar apoio para estruturar blocos de trabalho profundo e alocação de atenção."
        : topAxis === "Consistência"
          ? "Aprofundar suporte comportamental para reforçar estabilidade de rotina."
          : "Usar apoio especializado para melhorar leitura estratégica e clareza decisória.",
} as const

export const marketplaceTrustSignals = [
  {
    title: "Curadoria orientada por contexto",
    description: "A recomendação não parte só de catálogo, mas do que o sistema pessoal pede agora.",
    icon: Star,
  },
  {
    title: "Especialistas com encaixe declarado",
    description: "Cada perfil deixa explícito em qual eixo consegue gerar mais impacto.",
    icon: Sparkles,
  },
  {
    title: "Próximo passo claro",
    description: "A descoberta deve evoluir para ação, contato e suporte real sem fricção desnecessária.",
    icon: ShieldCheck,
  },
] as const
