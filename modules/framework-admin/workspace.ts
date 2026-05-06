import { dbQuery } from "@/lib/server/db"
import { hasDatabaseUrl } from "@/lib/server/env"
import type { AppUserProfile } from "@/modules/auth-profile/contracts"
import { isAdminProfile, normalizeAppUserRole } from "@/modules/auth-profile/contracts"

export const DIAGNOSTIC_AREAS = ["health", "mind", "productivity", "finances", "relations", "purpose"] as const

export type DiagnosticArea = (typeof DIAGNOSTIC_AREAS)[number]

export type FrameworkAdminDiagnosticQuestion = {
  id: string
  area: DiagnosticArea
  questionText: string
  questionOrder: number
  active: boolean
  createdAt: string
}

export type FrameworkAdminAxis = {
  area: DiagnosticArea
  label: string
  summary: string
  activeQuestions: number
  inactiveQuestions: number
  totalQuestions: number
  questions: FrameworkAdminDiagnosticQuestion[]
}

export type FrameworkAdminModule = {
  id: string
  title: string
  description: string
  status: "live" | "planned" | "needs-data"
  owner: string
  primaryAction: string
  href: string
  capabilities: string[]
}

export type FrameworkAdminWorkspace = {
  generatedAt: string
  kpis: {
    totalUsers: number
    adminUsers: number
    onboardedUsers: number
    activeQuestions: number
    inactiveQuestions: number
    totalQuestions: number
    activeAxes: number
  }
  axes: FrameworkAdminAxis[]
  recentUsers: Pick<AppUserProfile, "userId" | "email" | "fullName" | "role" | "onboarded" | "updatedAt">[]
  adminModules: FrameworkAdminModule[]
}

type DiagnosticQuestionRow = {
  id: string
  area: string
  question_text: string
  question_order: number
  active: boolean
  created_at: string | Date
}

type AppUserProfileRow = {
  user_id: string
  email: string
  full_name: string
  nickname: string | null
  phone: string | null
  onboarded: boolean
  onboarding_step: AppUserProfile["onboardingStep"]
  role: string | null
  created_at: string | Date
  updated_at: string | Date
}

const AREA_META: Record<DiagnosticArea, { label: string; summary: string }> = {
  health: {
    label: "Saúde Física",
    summary: "Energia, sono, nutrição e sustentação fisiológica do ciclo pessoal.",
  },
  mind: {
    label: "Mente & Emoções",
    summary: "Clareza mental, estabilidade emocional, estresse e capacidade reflexiva.",
  },
  productivity: {
    label: "Produtividade",
    summary: "Foco, execução, prioridades e consistência operacional.",
  },
  finances: {
    label: "Finanças",
    summary: "Previsibilidade, controle, margem e decisões financeiras pessoais.",
  },
  relations: {
    label: "Relações",
    summary: "Qualidade relacional, rede de apoio, comunicação e presença social.",
  },
  purpose: {
    label: "Propósito",
    summary: "Direção, identidade, significado e alinhamento de longo prazo.",
  },
}

export const frameworkAdminModules: FrameworkAdminModule[] = [
  {
    id: "users-access",
    title: "Usuários, roles e acesso",
    description: "Governança de contas, admins, onboarding, bloqueios e visibilidade por papel.",
    status: "live",
    owner: "Core SaaS",
    primaryAction: "Auditar usuários",
    href: "#users-access",
    capabilities: ["Promover/rebaixar admin", "Revisar onboarding", "Segmentar contas"],
  },
  {
    id: "diagnostic-framework",
    title: "Framework diagnóstico",
    description: "Controle das áreas, perguntas, ativação e ordem do diagnóstico NexxaLife.",
    status: "live",
    owner: "Produto",
    primaryAction: "Revisar perguntas",
    href: "#diagnostic-framework",
    capabilities: ["Ativar/desativar perguntas", "Reordenar matriz", "Medir cobertura por área"],
  },
  {
    id: "plans-billing",
    title: "Planos, billing e limites",
    description: "Preparado para planos, assinaturas, quotas, trials, upgrades e feature gates pagos.",
    status: "planned",
    owner: "Revenue",
    primaryAction: "Configurar planos",
    href: "#plans-billing",
    capabilities: ["Catálogo de planos", "Limites por assinatura", "Histórico de cobrança"],
  },
  {
    id: "feature-flags",
    title: "Feature flags e releases",
    description: "Ative módulos por ambiente, turma, plano ou usuário sem deploy emergencial.",
    status: "planned",
    owner: "Engineering",
    primaryAction: "Criar flag",
    href: "#feature-flags",
    capabilities: ["Rollout gradual", "Kill switch", "A/B por segmento"],
  },
  {
    id: "ai-prompts",
    title: "IA, prompts e guardrails",
    description: "Workspace para prompts do AI Studio, políticas, modelos, custos e qualidade das respostas.",
    status: "planned",
    owner: "AI Ops",
    primaryAction: "Mapear prompts",
    href: "#ai-prompts",
    capabilities: ["Versionar prompts", "Definir guardrails", "Monitorar custo/token"],
  },
  {
    id: "integrations-webhooks",
    title: "Integrações e webhooks",
    description: "Configuração central para Supabase, automações, apps externos e webhooks operacionais.",
    status: "planned",
    owner: "Ops",
    primaryAction: "Conectar serviço",
    href: "#integrations-webhooks",
    capabilities: ["Webhooks", "Chaves mascaradas", "Retry e logs"],
  },
  {
    id: "analytics-logs",
    title: "Analytics, logs e auditoria",
    description: "Eventos críticos, trilhas de auditoria, saúde de jobs e métricas do funil SaaS.",
    status: "planned",
    owner: "Data",
    primaryAction: "Ver auditoria",
    href: "#analytics-logs",
    capabilities: ["Eventos admin", "Funil onboarding", "Alertas de erro"],
  },
  {
    id: "security-compliance",
    title: "Segurança e compliance",
    description: "Políticas de acesso, LGPD, sessões, permissões sensíveis e revisões de segurança.",
    status: "planned",
    owner: "Security",
    primaryAction: "Revisar políticas",
    href: "#security-compliance",
    capabilities: ["Revisão de admins", "Export LGPD", "Sessões suspeitas"],
  },
  {
    id: "branding-content",
    title: "Branding e conteúdo",
    description: "Controle de textos, banners, ofertas, marketplace, academia e comunicações do produto.",
    status: "planned",
    owner: "Growth",
    primaryAction: "Editar conteúdo",
    href: "#branding-content",
    capabilities: ["Hero e banners", "Templates de e-mail", "Conteúdo por plano"],
  },
  {
    id: "automations-lifecycle",
    title: "Automações e lifecycle",
    description: "Jornadas de ativação, nudges, tarefas recorrentes, retenção e recuperação de usuários.",
    status: "planned",
    owner: "Lifecycle",
    primaryAction: "Desenhar jornada",
    href: "#automations-lifecycle",
    capabilities: ["Triggers", "Sequências", "Reengajamento"],
  },
]

function toIso(value: string | Date) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function isDiagnosticArea(value: string): value is DiagnosticArea {
  return DIAGNOSTIC_AREAS.includes(value as DiagnosticArea)
}

function mapQuestionRow(row: DiagnosticQuestionRow): FrameworkAdminDiagnosticQuestion | null {
  if (!isDiagnosticArea(row.area)) {
    return null
  }

  return {
    id: row.id,
    area: row.area,
    questionText: row.question_text,
    questionOrder: row.question_order,
    active: row.active,
    createdAt: toIso(row.created_at),
  }
}

function mapProfileRow(row: AppUserProfileRow): AppUserProfile {
  return {
    userId: row.user_id,
    email: row.email,
    fullName: row.full_name,
    nickname: row.nickname ?? undefined,
    phone: row.phone ?? undefined,
    onboarded: row.onboarded,
    onboardingStep: row.onboarding_step,
    role: normalizeAppUserRole(row.role),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  }
}

export function buildFrameworkAdminWorkspace(input: {
  profiles: AppUserProfile[]
  diagnosticQuestions: FrameworkAdminDiagnosticQuestion[]
  generatedAt?: string
}): FrameworkAdminWorkspace {
  const profiles = [...input.profiles]
  const diagnosticQuestions = [...input.diagnosticQuestions].sort((a, b) => {
    if (a.area !== b.area) return DIAGNOSTIC_AREAS.indexOf(a.area) - DIAGNOSTIC_AREAS.indexOf(b.area)
    return a.questionOrder - b.questionOrder
  })

  const axes = DIAGNOSTIC_AREAS.map((area) => {
    const questions = diagnosticQuestions.filter((question) => question.area === area)
    const activeQuestions = questions.filter((question) => question.active).length
    const inactiveQuestions = questions.length - activeQuestions

    return {
      area,
      label: AREA_META[area].label,
      summary: AREA_META[area].summary,
      activeQuestions,
      inactiveQuestions,
      totalQuestions: questions.length,
      questions,
    }
  })

  const activeQuestions = diagnosticQuestions.filter((question) => question.active).length
  const inactiveQuestions = diagnosticQuestions.length - activeQuestions

  return {
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    kpis: {
      totalUsers: profiles.length,
      adminUsers: profiles.filter(isAdminProfile).length,
      onboardedUsers: profiles.filter((profile) => profile.onboarded).length,
      activeQuestions,
      inactiveQuestions,
      totalQuestions: diagnosticQuestions.length,
      activeAxes: axes.filter((axis) => axis.totalQuestions > 0).length,
    },
    axes,
    recentUsers: profiles
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 8)
      .map(({ userId, email, fullName, role, onboarded, updatedAt }) => ({ userId, email, fullName, role, onboarded, updatedAt })),
    adminModules: frameworkAdminModules,
  }
}

export async function getFrameworkAdminWorkspace(): Promise<FrameworkAdminWorkspace> {
  if (!hasDatabaseUrl()) {
    return buildFrameworkAdminWorkspace({ profiles: [], diagnosticQuestions: [] })
  }

  const [profilesResult, questionsResult] = await Promise.all([
    dbQuery<AppUserProfileRow>(`
      select user_id, email, full_name, nickname, phone, onboarded, onboarding_step, role, created_at, updated_at
      from app_user_profiles
      order by updated_at desc
      limit 50
    `),
    dbQuery<DiagnosticQuestionRow>(`
      select id, area, question_text, question_order, active, created_at
      from diagnostic_questions
      order by area asc, question_order asc
    `),
  ])

  return buildFrameworkAdminWorkspace({
    profiles: profilesResult.rows.map(mapProfileRow),
    diagnosticQuestions: questionsResult.rows.map(mapQuestionRow).filter((question): question is FrameworkAdminDiagnosticQuestion => Boolean(question)),
  })
}
