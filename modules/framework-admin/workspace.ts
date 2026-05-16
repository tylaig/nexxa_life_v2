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

export type FrameworkAdminBillingPlan = {
  id: string
  slug: string
  name: string
  description: string
  monthlyPriceCents: number
  yearlyPriceCents: number
  currency: string
  active: boolean
  trialDays: number
  seatLimit: number | null
  aiRequestsLimit: number | null
  features: string[]
  updatedAt: string
}

export type FrameworkAdminFeatureFlag = {
  id: string
  flagKey: string
  name: string
  description: string
  enabled: boolean
  rolloutPercentage: number
  audience: string
  owner: string
  updatedAt: string
}

export type FrameworkAdminAiPrompt = {
  id: string
  promptKey: string
  name: string
  description: string
  model: string
  temperature: number
  active: boolean
  version: number
  owner: string
  guardrails: string[]
  updatedAt: string
}

export type FrameworkAdminIntegration = {
  id: string
  providerKey: string
  name: string
  description: string
  status: "connected" | "planned" | "disabled" | "error"
  authType: string
  maskedSecret: string | null
  lastSyncAt: string | null
  owner: string
  updatedAt: string
}

export type FrameworkAdminAuditEvent = {
  id: string
  actorEmail: string | null
  eventType: string
  entityType: string
  entityId: string | null
  severity: "info" | "warning" | "critical"
  summary: string
  createdAt: string
}

export type FrameworkAdminSecurityPolicy = {
  id: string
  policyKey: string
  name: string
  description: string
  status: "active" | "draft" | "review"
  enforcementLevel: "monitor" | "warn" | "block"
  owner: string
  reviewFrequencyDays: number
  lastReviewedAt: string | null
  updatedAt: string
}

export type FrameworkAdminContentBlock = {
  id: string
  blockKey: string
  title: string
  surface: string
  content: string
  status: "published" | "draft" | "archived"
  audience: string
  owner: string
  publishedAt: string | null
  updatedAt: string
}

export type FrameworkAdminSetting = {
  id: string
  settingKey: string
  label: string
  description: string
  value: Record<string, unknown>
  category: string
  sensitive: boolean
  updatedAt: string
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
    activePlans: number
    enabledFlags: number
    activePrompts: number
    connectedIntegrations: number
    criticalAuditEvents: number
    activeSecurityPolicies: number
    publishedContentBlocks: number
  }
  axes: FrameworkAdminAxis[]
  recentUsers: Pick<AppUserProfile, "userId" | "email" | "fullName" | "role" | "onboarded" | "updatedAt">[]
  adminModules: FrameworkAdminModule[]
  billingPlans: FrameworkAdminBillingPlan[]
  featureFlags: FrameworkAdminFeatureFlag[]
  aiPrompts: FrameworkAdminAiPrompt[]
  integrations: FrameworkAdminIntegration[]
  auditEvents: FrameworkAdminAuditEvent[]
  securityPolicies: FrameworkAdminSecurityPolicy[]
  contentBlocks: FrameworkAdminContentBlock[]
  settings: FrameworkAdminSetting[]
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

type BillingPlanRow = {
  id: string
  slug: string
  name: string
  description: string
  monthly_price_cents: number
  yearly_price_cents: number
  currency: string
  active: boolean
  trial_days: number
  seat_limit: number | null
  ai_requests_limit: number | null
  features: unknown
  updated_at: string | Date
}

type FeatureFlagRow = {
  id: string
  flag_key: string
  name: string
  description: string
  enabled: boolean
  rollout_percentage: number
  audience: string
  owner: string
  updated_at: string | Date
}

type AiPromptRow = {
  id: string
  prompt_key: string
  name: string
  description: string
  model: string
  temperature: string | number
  active: boolean
  version: number
  owner: string
  guardrails: unknown
  updated_at: string | Date
}

type IntegrationRow = {
  id: string
  provider_key: string
  name: string
  description: string
  status: string
  auth_type: string
  masked_secret: string | null
  last_sync_at: string | Date | null
  owner: string
  updated_at: string | Date
}

type AuditEventRow = {
  id: string
  actor_email: string | null
  event_type: string
  entity_type: string
  entity_id: string | null
  severity: string
  summary: string
  created_at: string | Date
}

type SecurityPolicyRow = {
  id: string
  policy_key: string
  name: string
  description: string
  status: string
  enforcement_level: string
  owner: string
  review_frequency_days: number
  last_reviewed_at: string | Date | null
  updated_at: string | Date
}

type ContentBlockRow = {
  id: string
  block_key: string
  title: string
  surface: string
  content: string
  status: string
  audience: string
  owner: string
  published_at: string | Date | null
  updated_at: string | Date
}

type SettingRow = {
  id: string
  setting_key: string
  label: string
  description: string
  value: unknown
  category: string
  sensitive: boolean
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
    description: "Planos persistidos para controlar assinatura, quotas, trials, upgrades e feature gates pagos.",
    status: "live",
    owner: "Revenue",
    primaryAction: "Configurar planos",
    href: "#plans-billing",
    capabilities: ["Catálogo de planos", "Limites por assinatura", "Histórico de cobrança"],
  },
  {
    id: "feature-flags",
    title: "Feature flags e releases",
    description: "Ative módulos por ambiente, turma, plano ou usuário sem deploy emergencial.",
    status: "live",
    owner: "Engineering",
    primaryAction: "Criar flag",
    href: "#feature-flags",
    capabilities: ["Rollout gradual", "Kill switch", "A/B por segmento"],
  },
  {
    id: "ai-prompts",
    title: "IA, prompts e guardrails",
    description: "Workspace para prompts da Nexxa, políticas, modelos, custos e qualidade das respostas.",
    status: "live",
    owner: "AI Ops",
    primaryAction: "Mapear prompts",
    href: "#ai-prompts",
    capabilities: ["Versionar prompts", "Definir guardrails", "Monitorar custo/token"],
  },
  {
    id: "integrations-webhooks",
    title: "Integrações e webhooks",
    description: "Configuração central para Supabase, automações, apps externos e webhooks operacionais.",
    status: "live",
    owner: "Ops",
    primaryAction: "Conectar serviço",
    href: "#integrations-webhooks",
    capabilities: ["Webhooks", "Chaves mascaradas", "Retry e logs"],
  },
  {
    id: "analytics-logs",
    title: "Analytics, logs e auditoria",
    description: "Eventos críticos, trilhas de auditoria, saúde de jobs e métricas do funil SaaS.",
    status: "live",
    owner: "Data",
    primaryAction: "Ver auditoria",
    href: "#analytics-logs",
    capabilities: ["Eventos admin", "Funil onboarding", "Alertas de erro"],
  },
  {
    id: "security-compliance",
    title: "Segurança e compliance",
    description: "Políticas de acesso, LGPD, sessões, permissões sensíveis e revisões de segurança.",
    status: "live",
    owner: "Security",
    primaryAction: "Revisar políticas",
    href: "#security-compliance",
    capabilities: ["Revisão de admins", "Export LGPD", "Sessões suspeitas"],
  },
  {
    id: "branding-content",
    title: "Branding e conteúdo",
    description: "Controle de textos, banners, ofertas, marketplace, academia e comunicações do produto.",
    status: "live",
    owner: "Growth",
    primaryAction: "Editar conteúdo",
    href: "#branding-content",
    capabilities: ["Hero e banners", "Templates de e-mail", "Conteúdo por plano"],
  },
  {
    id: "automations-lifecycle",
    title: "Automações e lifecycle",
    description: "Jornadas de ativação, nudges, tarefas recorrentes, retenção e recuperação de usuários.",
    status: "needs-data",
    owner: "Lifecycle",
    primaryAction: "Desenhar jornada",
    href: "#automations-lifecycle",
    capabilities: ["Triggers", "Sequências", "Reengajamento"],
  },
]

const fallbackBillingPlans: FrameworkAdminBillingPlan[] = [
  {
    id: "fallback-free",
    slug: "free",
    name: "Free",
    description: "Entrada para validar diagnóstico, metas e rotina pessoal.",
    monthlyPriceCents: 0,
    yearlyPriceCents: 0,
    currency: "BRL",
    active: true,
    trialDays: 0,
    seatLimit: 1,
    aiRequestsLimit: 25,
    features: ["Diagnóstico base", "Dashboard pessoal", "Checklist diário"],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-pro",
    slug: "pro",
    name: "Pro",
    description: "Plano principal com IA, automações e histórico expandido.",
    monthlyPriceCents: 4900,
    yearlyPriceCents: 49000,
    currency: "BRL",
    active: true,
    trialDays: 7,
    seatLimit: 1,
    aiRequestsLimit: 500,
    features: ["Nexxa IA", "Relatórios avançados", "Agenda integrada", "Marketplace"],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackFeatureFlags: FrameworkAdminFeatureFlag[] = [
  {
    id: "fallback-ai-studio",
    flagKey: "nexxa_ai_studio",
    name: "Nexxa AI Studio",
    description: "Libera experiências assistidas por IA no produto.",
    enabled: true,
    rolloutPercentage: 25,
    audience: "pro-users",
    owner: "AI Ops",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackAiPrompts: FrameworkAdminAiPrompt[] = [
  {
    id: "fallback-daily-coach",
    promptKey: "daily_coach",
    name: "Coach diário Nexxa",
    description: "Prompt base para orientar próxima ação do dia.",
    model: "gpt-5-mini",
    temperature: 0.4,
    active: true,
    version: 1,
    owner: "AI Ops",
    guardrails: ["Não diagnosticar doenças", "Sugerir ações pequenas", "Preservar privacidade"],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackIntegrations: FrameworkAdminIntegration[] = [
  {
    id: "fallback-supabase",
    providerKey: "supabase",
    name: "Supabase",
    description: "Banco, autenticação e storage principal do SaaS.",
    status: "connected",
    authType: "service_role",
    maskedSecret: "••••configured",
    lastSyncAt: null,
    owner: "Engineering",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackSecurityPolicies: FrameworkAdminSecurityPolicy[] = [
  {
    id: "fallback-admin-review",
    policyKey: "admin_role_review",
    name: "Revisão periódica de administradores",
    description: "Garante que acessos admin continuem necessários.",
    status: "active",
    enforcementLevel: "warn",
    owner: "Security",
    reviewFrequencyDays: 30,
    lastReviewedAt: null,
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackContentBlocks: FrameworkAdminContentBlock[] = [
  {
    id: "fallback-dashboard-hero",
    blockKey: "dashboard_hero",
    title: "Hero do dashboard",
    surface: "dashboard",
    content: "Transforme intenção em rotina com o ciclo NexxaLife.",
    status: "published",
    audience: "all",
    owner: "Growth",
    publishedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

const fallbackSettings: FrameworkAdminSetting[] = [
  {
    id: "fallback-workspace-mode",
    settingKey: "admin_workspace_mode",
    label: "Modo do workspace admin",
    description: "Define como a operação administrativa é apresentada.",
    value: { mode: "tabs", entrypoint: "command-menu" },
    category: "general",
    sensitive: false,
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]

function toIso(value: string | Date | null) {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function isDiagnosticArea(value: string): value is DiagnosticArea {
  return DIAGNOSTIC_AREAS.includes(value as DiagnosticArea)
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String)
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.map(String) : []
    } catch {
      return []
    }
  }

  return []
}

function toRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
    } catch {
      return {}
    }
  }

  return {}
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
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
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
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapBillingPlanRow(row: BillingPlanRow): FrameworkAdminBillingPlan {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    monthlyPriceCents: row.monthly_price_cents,
    yearlyPriceCents: row.yearly_price_cents,
    currency: row.currency,
    active: row.active,
    trialDays: row.trial_days,
    seatLimit: row.seat_limit,
    aiRequestsLimit: row.ai_requests_limit,
    features: toStringArray(row.features),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapFeatureFlagRow(row: FeatureFlagRow): FrameworkAdminFeatureFlag {
  return {
    id: row.id,
    flagKey: row.flag_key,
    name: row.name,
    description: row.description,
    enabled: row.enabled,
    rolloutPercentage: row.rollout_percentage,
    audience: row.audience,
    owner: row.owner,
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapAiPromptRow(row: AiPromptRow): FrameworkAdminAiPrompt {
  return {
    id: row.id,
    promptKey: row.prompt_key,
    name: row.name,
    description: row.description,
    model: row.model,
    temperature: Number(row.temperature),
    active: row.active,
    version: row.version,
    owner: row.owner,
    guardrails: toStringArray(row.guardrails),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapIntegrationRow(row: IntegrationRow): FrameworkAdminIntegration {
  const status = ["connected", "planned", "disabled", "error"].includes(row.status) ? row.status : "planned"

  return {
    id: row.id,
    providerKey: row.provider_key,
    name: row.name,
    description: row.description,
    status: status as FrameworkAdminIntegration["status"],
    authType: row.auth_type,
    maskedSecret: row.masked_secret,
    lastSyncAt: toIso(row.last_sync_at),
    owner: row.owner,
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapAuditEventRow(row: AuditEventRow): FrameworkAdminAuditEvent {
  const severity = ["info", "warning", "critical"].includes(row.severity) ? row.severity : "info"

  return {
    id: row.id,
    actorEmail: row.actor_email,
    eventType: row.event_type,
    entityType: row.entity_type,
    entityId: row.entity_id,
    severity: severity as FrameworkAdminAuditEvent["severity"],
    summary: row.summary,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
  }
}

function mapSecurityPolicyRow(row: SecurityPolicyRow): FrameworkAdminSecurityPolicy {
  const status = ["active", "draft", "review"].includes(row.status) ? row.status : "draft"
  const enforcementLevel = ["monitor", "warn", "block"].includes(row.enforcement_level) ? row.enforcement_level : "monitor"

  return {
    id: row.id,
    policyKey: row.policy_key,
    name: row.name,
    description: row.description,
    status: status as FrameworkAdminSecurityPolicy["status"],
    enforcementLevel: enforcementLevel as FrameworkAdminSecurityPolicy["enforcementLevel"],
    owner: row.owner,
    reviewFrequencyDays: row.review_frequency_days,
    lastReviewedAt: toIso(row.last_reviewed_at),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapContentBlockRow(row: ContentBlockRow): FrameworkAdminContentBlock {
  const status = ["published", "draft", "archived"].includes(row.status) ? row.status : "draft"

  return {
    id: row.id,
    blockKey: row.block_key,
    title: row.title,
    surface: row.surface,
    content: row.content,
    status: status as FrameworkAdminContentBlock["status"],
    audience: row.audience,
    owner: row.owner,
    publishedAt: toIso(row.published_at),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapSettingRow(row: SettingRow): FrameworkAdminSetting {
  return {
    id: row.id,
    settingKey: row.setting_key,
    label: row.label,
    description: row.description,
    value: toRecord(row.value),
    category: row.category,
    sensitive: row.sensitive,
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function withFallback<T>(items: T[], fallback: T[]) {
  return items.length > 0 ? items : fallback
}

export function buildFrameworkAdminWorkspace(input: {
  profiles: AppUserProfile[]
  diagnosticQuestions: FrameworkAdminDiagnosticQuestion[]
  billingPlans?: FrameworkAdminBillingPlan[]
  featureFlags?: FrameworkAdminFeatureFlag[]
  aiPrompts?: FrameworkAdminAiPrompt[]
  integrations?: FrameworkAdminIntegration[]
  auditEvents?: FrameworkAdminAuditEvent[]
  securityPolicies?: FrameworkAdminSecurityPolicy[]
  contentBlocks?: FrameworkAdminContentBlock[]
  settings?: FrameworkAdminSetting[]
  generatedAt?: string
}): FrameworkAdminWorkspace {
  const profiles = [...input.profiles]
  const diagnosticQuestions = [...input.diagnosticQuestions].sort((a, b) => {
    if (a.area !== b.area) return DIAGNOSTIC_AREAS.indexOf(a.area) - DIAGNOSTIC_AREAS.indexOf(b.area)
    return a.questionOrder - b.questionOrder
  })
  const billingPlans = withFallback([...(input.billingPlans ?? [])], fallbackBillingPlans)
  const featureFlags = withFallback([...(input.featureFlags ?? [])], fallbackFeatureFlags)
  const aiPrompts = withFallback([...(input.aiPrompts ?? [])], fallbackAiPrompts)
  const integrations = withFallback([...(input.integrations ?? [])], fallbackIntegrations)
  const auditEvents = [...(input.auditEvents ?? [])]
  const securityPolicies = withFallback([...(input.securityPolicies ?? [])], fallbackSecurityPolicies)
  const contentBlocks = withFallback([...(input.contentBlocks ?? [])], fallbackContentBlocks)
  const settings = withFallback([...(input.settings ?? [])], fallbackSettings)

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
      activePlans: billingPlans.filter((plan) => plan.active).length,
      enabledFlags: featureFlags.filter((flag) => flag.enabled).length,
      activePrompts: aiPrompts.filter((prompt) => prompt.active).length,
      connectedIntegrations: integrations.filter((integration) => integration.status === "connected").length,
      criticalAuditEvents: auditEvents.filter((event) => event.severity === "critical").length,
      activeSecurityPolicies: securityPolicies.filter((policy) => policy.status === "active").length,
      publishedContentBlocks: contentBlocks.filter((block) => block.status === "published").length,
    },
    axes,
    recentUsers: profiles
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 8)
      .map(({ userId, email, fullName, role, onboarded, updatedAt }) => ({ userId, email, fullName, role, onboarded, updatedAt })),
    adminModules: frameworkAdminModules,
    billingPlans,
    featureFlags,
    aiPrompts,
    integrations,
    auditEvents,
    securityPolicies,
    contentBlocks,
    settings,
  }
}

export async function getFrameworkAdminWorkspace(): Promise<FrameworkAdminWorkspace> {
  if (!hasDatabaseUrl()) {
    return buildFrameworkAdminWorkspace({ profiles: [], diagnosticQuestions: [] })
  }

  try {
    const [
      profilesResult,
      questionsResult,
      billingPlansResult,
      featureFlagsResult,
      aiPromptsResult,
      integrationsResult,
      auditEventsResult,
      securityPoliciesResult,
      contentBlocksResult,
      settingsResult,
    ] = await Promise.all([
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
      dbQuery<BillingPlanRow>(`
        select id, slug, name, description, monthly_price_cents, yearly_price_cents, currency, active, trial_days, seat_limit, ai_requests_limit, features, updated_at
        from admin_billing_plans
        order by monthly_price_cents asc, slug asc
      `),
      dbQuery<FeatureFlagRow>(`
        select id, flag_key, name, description, enabled, rollout_percentage, audience, owner, updated_at
        from admin_feature_flags
        order by enabled desc, flag_key asc
      `),
      dbQuery<AiPromptRow>(`
        select id, prompt_key, name, description, model, temperature, active, version, owner, guardrails, updated_at
        from admin_ai_prompts
        order by active desc, prompt_key asc
      `),
      dbQuery<IntegrationRow>(`
        select id, provider_key, name, description, status, auth_type, masked_secret, last_sync_at, owner, updated_at
        from admin_integrations
        order by status asc, provider_key asc
      `),
      dbQuery<AuditEventRow>(`
        select id, actor_email, event_type, entity_type, entity_id, severity, summary, created_at
        from admin_audit_events
        order by created_at desc
        limit 25
      `),
      dbQuery<SecurityPolicyRow>(`
        select id, policy_key, name, description, status, enforcement_level, owner, review_frequency_days, last_reviewed_at, updated_at
        from admin_security_policies
        order by status asc, policy_key asc
      `),
      dbQuery<ContentBlockRow>(`
        select id, block_key, title, surface, content, status, audience, owner, published_at, updated_at
        from admin_content_blocks
        order by surface asc, title asc
      `),
      dbQuery<SettingRow>(`
        select id, setting_key, label, description, value, category, sensitive, updated_at
        from admin_settings
        order by category asc, setting_key asc
      `),
    ])

    return buildFrameworkAdminWorkspace({
      profiles: profilesResult.rows.map(mapProfileRow),
      diagnosticQuestions: questionsResult.rows.map(mapQuestionRow).filter((question): question is FrameworkAdminDiagnosticQuestion => Boolean(question)),
      billingPlans: billingPlansResult.rows.map(mapBillingPlanRow),
      featureFlags: featureFlagsResult.rows.map(mapFeatureFlagRow),
      aiPrompts: aiPromptsResult.rows.map(mapAiPromptRow),
      integrations: integrationsResult.rows.map(mapIntegrationRow),
      auditEvents: auditEventsResult.rows.map(mapAuditEventRow),
      securityPolicies: securityPoliciesResult.rows.map(mapSecurityPolicyRow),
      contentBlocks: contentBlocksResult.rows.map(mapContentBlockRow),
      settings: settingsResult.rows.map(mapSettingRow),
    })
  } catch (error) {
    console.error("[framework-admin] failed to load operational tables, falling back to safe workspace", error)
    return buildFrameworkAdminWorkspace({ profiles: [], diagnosticQuestions: [] })
  }
}
