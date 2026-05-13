import { LIFE_AREAS, LIFE_AREA_SCORE_KEYS, type LifeArea } from "./types"

export function clampScore(value: number) {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, Math.round(value * 100) / 100))
}

export function levelForXp(xp: number) {
  const safeXp = Math.max(0, Math.floor(Number(xp) || 0))
  return Math.max(1, Math.floor(Math.sqrt(safeXp / 100)) + 1)
}

export function xpToNextLevel(xp: number) {
  const level = levelForXp(xp)
  const nextLevel = level + 1
  const nextLevelXp = Math.pow(nextLevel - 1, 2) * 100
  return Math.max(0, nextLevelXp - Math.max(0, xp))
}

export function normalizeDiagnosticAreaScore(raw: unknown) {
  const value = Number(raw)
  if (!Number.isFinite(value)) return 0
  // Current diagnostic scores are 0-10. Store gamified score as 0-100.
  if (value <= 10) return clampScore(value * 10)
  return clampScore(value)
}

export function calculateAreaScore(params: {
  diagnosticScore?: number | null
  behaviorScore?: number | null
  consistencyScore?: number | null
  reflectionScore?: number | null
  diagnosticWeight?: number
}) {
  const diagnosticWeight = params.diagnosticWeight ?? 0.35
  const behaviorWeight = 0.35
  const consistencyWeight = 0.2
  const reflectionWeight = 0.1

  const diagnostic = clampScore(params.diagnosticScore ?? 0)
  const behavior = clampScore(params.behaviorScore ?? 0)
  const consistency = clampScore(params.consistencyScore ?? 0)
  const reflection = clampScore(params.reflectionScore ?? 0)

  return clampScore(
    diagnosticWeight * diagnostic +
    behaviorWeight * behavior +
    consistencyWeight * consistency +
    reflectionWeight * reflection
  )
}

export function stageForScore(score: number) {
  const safe = clampScore(score)
  if (safe >= 80) return "excelencia"
  if (safe >= 60) return "aceleracao"
  if (safe >= 40) return "desenvolvimento"
  return "recuperacao"
}

export function diagnosticScoresToAreas(diagnosticData: any) {
  return LIFE_AREAS.map((area) => {
    const scoreKey = LIFE_AREA_SCORE_KEYS[area]
    const raw = diagnosticData?.[scoreKey] ?? diagnosticData?.scores?.[area] ?? 0
    const diagnosticScore = normalizeDiagnosticAreaScore(raw)
    return {
      area,
      diagnosticScore,
      behaviorScore: 0,
      consistencyScore: 0,
      reflectionScore: 0,
      score: calculateAreaScore({ diagnosticScore }),
      xp: Math.round(diagnosticScore),
      level: levelForXp(Math.round(diagnosticScore)),
    }
  })
}

export function scoreDeltaFromAnswerValue(answerValue?: number | null, weight = 1) {
  if (answerValue == null || !Number.isFinite(Number(answerValue))) return 0
  const normalized = Math.max(0, Math.min(10, Number(answerValue)))
  // 5 is neutral. Above 5 increases, below 5 decreases.
  return Math.round((normalized - 5) * weight * 10) / 10
}

export function defaultXpForQuestion(type?: string) {
  switch (type) {
    case "root_cause": return 20
    case "weekly_review": return 30
    case "maintenance": return 15
    case "daily_checkin":
    default: return 10
  }
}

export function isLifeArea(value: string): value is LifeArea {
  return (LIFE_AREAS as readonly string[]).includes(value)
}
