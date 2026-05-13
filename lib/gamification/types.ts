export const LIFE_AREAS = [
  "health",
  "mind",
  "productivity",
  "finances",
  "relations",
  "purpose",
] as const

export type LifeArea = typeof LIFE_AREAS[number]

export type MissionType = "daily" | "weekly" | "recovery" | "boss" | "maintenance"
export type MissionStatus = "active" | "completed" | "failed" | "skipped" | "archived"
export type QuestionType = "diagnostic" | "daily_checkin" | "root_cause" | "adaptive" | "weekly_review" | "maintenance"

export type LifeAreaScore = {
  id?: string
  user_id?: string
  area: LifeArea
  score: number
  level: number
  xp: number
  streak: number
  diagnostic_score?: number | null
  behavior_score: number
  consistency_score: number
  reflection_score: number
  stage?: "recuperacao" | "desenvolvimento" | "aceleracao" | "excelencia"
  updated_at?: string
}

export type ScoreEventType =
  | "diagnostic_baseline"
  | "question_answered"
  | "mission_created"
  | "mission_completed"
  | "mission_skipped"
  | "checklist_completed"
  | "agenda_completed"
  | "journal_entry"
  | "manual_adjustment"
  | "weekly_review"
  | "achievement_unlocked"

export type ScoreEventInput = {
  area: LifeArea
  eventType: ScoreEventType
  xpDelta?: number
  scoreDelta?: number
  reason?: string
  sourceType?: string
  sourceId?: string
  metadata?: Record<string, unknown>
}

export type MissionInput = {
  area: LifeArea
  type: MissionType
  title: string
  description?: string
  xpReward?: number
  scoreImpact?: number
  dueAt?: string
  metadata?: Record<string, unknown>
}

export const LIFE_AREA_LABELS: Record<LifeArea, string> = {
  health: "Saúde",
  mind: "Mente",
  productivity: "Produtividade",
  finances: "Finanças",
  relations: "Relações",
  purpose: "Propósito",
}

export const LIFE_AREA_SCORE_KEYS: Record<LifeArea, string> = {
  health: "score_health",
  mind: "score_mind",
  productivity: "score_productivity",
  finances: "score_finances",
  relations: "score_relations",
  purpose: "score_purpose",
}
