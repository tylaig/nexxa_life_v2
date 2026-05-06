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
