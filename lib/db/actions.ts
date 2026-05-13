"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient, getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { diagnosticScoresToAreas, levelForXp, scoreDeltaFromAnswerValue, defaultXpForQuestion, clampScore, calculateAreaScore } from "@/lib/gamification/scoring"
import { LIFE_AREAS, type LifeArea, type MissionInput, type ScoreEventInput } from "@/lib/gamification/types"

// -----------------------------------------------------------------------------
// CHECKLIST
// -----------------------------------------------------------------------------

export async function getChecklist(dateStr?: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const date = dateStr || new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from("v_connected_checklist")
    .select("*")
    .eq("user_id", auth.user.id)
    .eq("item_date", date)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("[getChecklist] Error:", error)
    return []
  }
  return data
}

export async function toggleChecklistItem(id: string, done: boolean) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { data: item } = await supabase
    .from("checklist_items")
    .select("id, life_area, goal_id, mission_id, xp_reward, impact_score, done")
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .single()

  const { error } = await supabase
    .from("checklist_items")
    .update({ done })
    .eq("id", id)
    .eq("user_id", auth.user.id)

  if (error) { console.error("Supabase Error:", error); throw error; }

  if (done && item && !item.done && item.life_area) {
    await recordScoreEvent({
      area: item.life_area,
      eventType: "checklist_completed",
      xpDelta: item.xp_reward || 5,
      scoreDelta: item.impact_score || 0.2,
      sourceType: "checklist_items",
      sourceId: item.id,
      reason: "Tarefa conectada concluída no checklist.",
      metadata: { goal_id: item.goal_id, mission_id: item.mission_id },
    }).catch((scoreError) => console.error("[toggleChecklistItem] score event error:", scoreError))
  }

  revalidatePath("/checklist")
  revalidatePath("/dashboard")
  revalidatePath("/goals")
}

export async function addChecklistItem(params: { label: string; priority?: "high" | "medium" | "low"; category?: string; date?: string; goalId?: string; missionId?: string; lifeArea?: LifeArea; xpReward?: number; impactScore?: number; sourceType?: string; sourceId?: string }) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("checklist_items")
    .insert({
      user_id: auth.user.id,
      label: params.label,
      priority: params.priority || "medium",
      category: params.category || "Geral",
      item_date: params.date || new Date().toISOString().split('T')[0],
      goal_id: params.goalId,
      mission_id: params.missionId,
      life_area: params.lifeArea,
      xp_reward: params.xpReward || 5,
      impact_score: params.impactScore || 0,
      source_type: params.sourceType,
      source_id: params.sourceId,
    })

  if (error) { console.error("Supabase Error:", error); throw error; }
  revalidatePath("/checklist")
  revalidatePath("/dashboard")
}

// -----------------------------------------------------------------------------
// GOALS
// -----------------------------------------------------------------------------

export async function getGoals() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("goals")
    .select(`
      *,
      goal_milestones(*),
      checklist_items(id, label, done, priority, item_date, life_area, xp_reward, impact_score),
      agenda_events(id, title, event_date, start_time, end_time, type, life_area)
    `)
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getGoals] Error:", error)
    return []
  }
  return data
}

export async function addGoal(params: { title: string; description?: string; category?: string }) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("goals")
    .insert({
      user_id: auth.user.id,
      title: params.title,
      description: params.description,
      category: params.category || "Pessoal",
    })

  if (error) { console.error("Supabase Error:", error); throw error; }
  revalidatePath("/goals")
  revalidatePath("/dashboard")
}

export async function addConnectedChecklistItem(params: {
  label: string
  goalId: string
  priority?: "high" | "medium" | "low"
  category?: string
  date?: string
  lifeArea?: LifeArea
  xpReward?: number
  impactScore?: number
}) {
  return addChecklistItem({
    label: params.label,
    priority: params.priority || "medium",
    category: params.category || "Meta conectada",
    date: params.date,
    goalId: params.goalId,
    lifeArea: params.lifeArea,
    xpReward: params.xpReward ?? 10,
    impactScore: params.impactScore ?? 0.3,
    sourceType: "goals",
    sourceId: params.goalId,
  })
}

export async function getConnectedCycle() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return null

  const supabase = await getSupabaseServerClient()
  const today = new Date().toISOString().split('T')[0]

  const [goals, checklist, agenda, journal, scores, missions] = await Promise.all([
    getGoals(),
    getChecklist(today),
    getAgenda(today),
    getJournalEntries(),
    getLifeAreaScores(),
    getActiveMissions(),
  ])

  return {
    date: today,
    goals,
    checklist,
    agenda,
    journal: (journal || []).slice(0, 5),
    scores,
    missions,
  }
}

// -----------------------------------------------------------------------------
// AGENDA
// -----------------------------------------------------------------------------

export async function getAgenda(dateStr?: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const date = dateStr || new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from("agenda_events")
    .select("*")
    .eq("user_id", auth.user.id)
    .eq("event_date", date)
    .order("start_time", { ascending: true })

  if (error) {
    console.error("[getAgenda] Error:", error)
    return []
  }
  return data
}

export async function addAgendaEvent(params: { title: string; date: string; startTime: string; endTime: string; type?: string }) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("agenda_events")
    .insert({
      user_id: auth.user.id,
      title: params.title,
      event_date: params.date,
      start_time: params.startTime,
      end_time: params.endTime,
      type: params.type || "personal",
    })

  if (error) { console.error("Supabase Error:", error); throw error; }
  revalidatePath("/agenda")
  revalidatePath("/dashboard")
}

// -----------------------------------------------------------------------------
// JOURNAL
// -----------------------------------------------------------------------------

export async function getJournalEntries() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("entry_date", { ascending: false })

  if (error) {
    console.error("[getJournalEntries] Error:", error)
    return []
  }
  return data
}

export async function addJournalEntry(params: { content: string; mood?: string; tags?: string[] }) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: auth.user.id,
      content: params.content,
      mood: params.mood || "neutral",
      tags: params.tags || [],
    })

  if (error) { console.error("Supabase Error:", error); throw error; }
  revalidatePath("/journal")
  revalidatePath("/dashboard")
}

// -----------------------------------------------------------------------------
// STREAKS & ACTIVITY
// -----------------------------------------------------------------------------

export async function getUserStreak() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return { current_streak: 0, longest_streak: 0 }

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", auth.user.id)
    .single()

  if (error) {
    return { current_streak: 0, longest_streak: 0 }
  }
  return data
}

export async function logDailyActivity(params: { checklistDone: number; checklistTotal: number; modulesActive: string[]; mood?: string }) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const date = new Date().toISOString().split('T')[0]
  
  const { error } = await supabase
    .from("daily_activity_log")
    .upsert({
      user_id: auth.user.id,
      activity_date: date,
      checklist_done: params.checklistDone,
      checklist_total: params.checklistTotal,
      modules_active: params.modulesActive,
      mood: params.mood,
    }, { onConflict: "user_id,activity_date" })

  if (error) { console.error("Supabase Error:", error); throw error; }
  
  // Call the streak update function
  await supabase.rpc('upsert_user_streak', { p_user_id: auth.user.id })
}

// -----------------------------------------------------------------------------
// DIAGNOSTIC
// -----------------------------------------------------------------------------

export async function getDiagnosticQuestions() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("diagnostic_questions")
    .select("*")
    .eq("active", true)
    .order("area")
    .order("question_order", { ascending: true })

  if (error) {
    console.error("[getDiagnosticQuestions] Error:", error)
    return []
  }
  return data
}

export async function updateAvatarUrl(avatarUrl: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) throw new Error("Não autenticado")

  const supabase = await getSupabaseServerClient()
  await supabase
    .from("app_user_profiles")
    .update({ avatar_url: avatarUrl })
    .eq("user_id", auth.user.id)
}

export async function saveDiagnosticResult(params: {
  answers: Record<string, number>
  scores: {
    health: number
    mind: number
    productivity: number
    finances: number
    relations: number
    purpose: number
  }
}) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in server action: auth is null"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("diagnostic_results")
    .insert({
      user_id: auth.user.id,
      score_health: params.scores.health,
      score_mind: params.scores.mind,
      score_productivity: params.scores.productivity,
      score_finances: params.scores.finances,
      score_relations: params.scores.relations,
      score_purpose: params.scores.purpose,
      raw_answers: params.answers,
    })

  if (error) { console.error("Supabase Error saving diagnostic:", error); throw error; }

  // Automatically update the step to 'goals'
  const { error: profileError } = await supabase
    .from("app_user_profiles")
    .update({ onboarding_step: "goals" })
    .eq("user_id", auth.user.id)

  if (profileError) {
    console.error("Supabase Error updating step after diagnostic:", profileError)
  }

  await initializeGamificationFromDiagnostic({
    scores: params.scores,
    diagnosticId: undefined,
  }).catch((gamificationError) => {
    console.error("[saveDiagnosticResult] Gamification initialization error:", gamificationError)
  })

  revalidatePath("/diagnostic")
  revalidatePath("/dashboard")
  revalidatePath("/")
}

export async function getDiagnosticResult() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return null

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("diagnostic_results")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data
}

export async function markUserOnboarded() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in markUserOnboarded"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase
    .from("app_user_profiles")
    .upsert({
      user_id: auth.user.id,
      email: auth.user.email,
      full_name: auth.user.fullName || auth.user.email,
      onboarded: true,
      onboarding_step: "complete",
    }, { onConflict: "user_id" })

  if (error) { console.error("markUserOnboarded Error:", error); throw error; }
  revalidatePath("/dashboard")
  revalidatePath("/")
}

export async function getUserOnboardingStatus() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return { onboarded: false, step: "welcome" }

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("app_user_profiles")
    .select("onboarded, onboarding_step")
    .eq("user_id", auth.user.id)
    .single()

  if (error || !data) return { onboarded: false, step: "welcome" }
  return { onboarded: data.onboarded, step: data.onboarding_step || "welcome" }
}

export async function updateOnboardingStep(step: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) { console.error("Unauthorized in updateOnboardingStep"); throw new Error("Unauthorized"); }

  const supabase = await getSupabaseServerClient()
  // Use upsert to handle case where profile row doesn't exist yet
  const { error } = await supabase
    .from("app_user_profiles")
    .upsert({
      user_id: auth.user.id,
      email: auth.user.email,
      full_name: auth.user.fullName || auth.user.email,
      onboarding_step: step,
    }, { onConflict: "user_id" })

  if (error) { console.error("updateOnboardingStep Error:", error); throw error; }
  revalidatePath("/")
}

// -----------------------------------------------------------------------------
// CHAT SESSIONS
// -----------------------------------------------------------------------------

export async function saveChatSession(sessionType: string, messages: any[]) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return

  const supabase = await getSupabaseServerClient()
  await supabase
    .from("chat_sessions")
    .upsert({
      user_id: auth.user.id,
      session_type: sessionType,
      messages: JSON.stringify(messages),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,session_type" })
}

export async function loadChatSession(sessionType: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return null

  const supabase = await getSupabaseServerClient()
  const { data } = await supabase
    .from("chat_sessions")
    .select("messages")
    .eq("user_id", auth.user.id)
    .eq("session_type", sessionType)
    .single()

  if (data?.messages) {
    return typeof data.messages === "string" ? JSON.parse(data.messages) : data.messages
  }
  return null
}

export async function deleteChatSession(sessionType: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return

  const supabase = await getSupabaseServerClient()
  await supabase
    .from("chat_sessions")
    .delete()
    .eq("user_id", auth.user.id)
    .eq("session_type", sessionType)
}

// -----------------------------------------------------------------------------
// AGENT MEMORY (soul.md / memory.md / skills.md)
// -----------------------------------------------------------------------------

export async function getMemory(memoryType: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return ""

  const supabase = await getSupabaseServerClient()
  const { data } = await supabase
    .from("agent_memory")
    .select("content")
    .eq("user_id", auth.user.id)
    .eq("memory_type", memoryType)
    .single()

  return data?.content || ""
}

export async function getAllMemory() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return { soul: "", memory: "", skills: "" }

  const supabase = await getSupabaseServerClient()
  const { data } = await supabase
    .from("agent_memory")
    .select("memory_type, content")
    .eq("user_id", auth.user.id)

  const result: Record<string, string> = { soul: "", memory: "", skills: "" }
  for (const row of data || []) {
    result[row.memory_type] = row.content || ""
  }
  return result
}

export async function updateMemory(memoryType: string, content: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return

  const supabase = await getSupabaseServerClient()
  await supabase
    .from("agent_memory")
    .upsert({
      user_id: auth.user.id,
      memory_type: memoryType,
      content,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,memory_type" })
}

export async function appendMemory(memoryType: string, entry: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return

  const existing = await getMemory(memoryType)
  const timestamp = new Date().toISOString().split('T')[0]
  const newContent = existing
    ? `${existing}\n\n---\n_${timestamp}_\n${entry}`
    : `# ${memoryType === 'soul' ? 'Soul' : memoryType === 'memory' ? 'Memory' : 'Skills'}\n\n---\n_${timestamp}_\n${entry}`

  await updateMemory(memoryType, newContent)
}

export async function searchMemory(query: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()

  // Simple text search across all memory files
  const { data } = await supabase
    .from("agent_memory")
    .select("memory_type, content")
    .eq("user_id", auth.user.id)

  if (!data) return []

  const queryLower = query.toLowerCase()
  return data
    .filter(row => row.content?.toLowerCase().includes(queryLower))
    .map(row => ({
      type: row.memory_type,
      matches: row.content!
        .split('\n')
        .filter((line: string) => line.toLowerCase().includes(queryLower))
        .slice(0, 5)
        .join('\n'),
    }))
}

export async function resetMemory() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return

  const supabase = await getSupabaseServerClient()
  await supabase
    .from("agent_memory")
    .delete()
    .eq("user_id", auth.user.id)
}

// -----------------------------------------------------------------------------
// GAMIFICATION: SCORES, MISSIONS, QUESTIONS & ACHIEVEMENTS
// -----------------------------------------------------------------------------

export async function initializeGamificationFromDiagnostic(params?: {
  scores?: Record<string, number>
  diagnosticId?: string
}) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const sourceScores = params?.scores
    ? {
        score_health: params.scores.health,
        score_mind: params.scores.mind,
        score_productivity: params.scores.productivity,
        score_finances: params.scores.finances,
        score_relations: params.scores.relations,
        score_purpose: params.scores.purpose,
      }
    : await getDiagnosticResult()

  if (!sourceScores) return []

  const rows = diagnosticScoresToAreas(sourceScores).map((areaScore) => ({
    user_id: auth.user.id,
    area: areaScore.area,
    score: areaScore.score,
    level: areaScore.level,
    xp: areaScore.xp,
    streak: 0,
    diagnostic_score: areaScore.diagnosticScore,
    behavior_score: areaScore.behaviorScore,
    consistency_score: areaScore.consistencyScore,
    reflection_score: areaScore.reflectionScore,
    last_calculated_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))

  const { data, error } = await supabase
    .from("life_area_scores")
    .upsert(rows, { onConflict: "user_id,area" })
    .select("*")

  if (error) { console.error("[initializeGamificationFromDiagnostic] Error:", error); throw error }

  await supabase.from("score_events").insert(rows.map((row) => ({
    user_id: auth.user.id,
    area: row.area,
    event_type: "diagnostic_baseline",
    source_type: params?.diagnosticId ? "diagnostic_results" : "diagnostic",
    source_id: params?.diagnosticId,
    xp_delta: row.xp,
    score_delta: row.score,
    reason: "Baseline gamificado criado a partir do diagnóstico inicial.",
    metadata: { diagnostic_score: row.diagnostic_score },
  })))

  await unlockAchievement("first_diagnostic").catch(() => {})

  revalidatePath("/dashboard")
  revalidatePath("/studio")
  return data || []
}

export async function getLifeAreaScores() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("v_life_area_cockpit")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("area", { ascending: true })

  if (error) {
    console.error("[getLifeAreaScores] Error:", error)
    return []
  }

  if ((data || []).length === 0) {
    return await initializeGamificationFromDiagnostic()
  }

  return data || []
}

export async function getScoreEvents(area?: LifeArea) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  let query = supabase
    .from("score_events")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  if (area) query = query.eq("area", area)

  const { data, error } = await query
  if (error) {
    console.error("[getScoreEvents] Error:", error)
    return []
  }
  return data || []
}

export async function recordScoreEvent(params: ScoreEventInput) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) throw new Error("Unauthorized")

  const supabase = await getSupabaseServerClient()
  const xpDelta = Math.max(0, Math.floor(params.xpDelta || 0))
  const scoreDelta = Number(params.scoreDelta || 0)

  const { data: current } = await supabase
    .from("life_area_scores")
    .select("*")
    .eq("user_id", auth.user.id)
    .eq("area", params.area)
    .single()

  const nextXp = Math.max(0, Number(current?.xp || 0) + xpDelta)
  const behaviorScore = clampScore(Number(current?.behavior_score || 0) + scoreDelta)
  const nextScore = calculateAreaScore({
    diagnosticScore: current?.diagnostic_score ?? 0,
    behaviorScore,
    consistencyScore: current?.consistency_score ?? 0,
    reflectionScore: current?.reflection_score ?? 0,
  })

  await supabase.from("score_events").insert({
    user_id: auth.user.id,
    area: params.area,
    event_type: params.eventType,
    source_type: params.sourceType,
    source_id: params.sourceId,
    xp_delta: xpDelta,
    score_delta: scoreDelta,
    reason: params.reason,
    metadata: params.metadata || {},
  })

  const { data, error } = await supabase
    .from("life_area_scores")
    .upsert({
      user_id: auth.user.id,
      area: params.area,
      score: nextScore,
      level: levelForXp(nextXp),
      xp: nextXp,
      behavior_score: behaviorScore,
      diagnostic_score: current?.diagnostic_score ?? 0,
      consistency_score: current?.consistency_score ?? 0,
      reflection_score: current?.reflection_score ?? 0,
      last_calculated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,area" })
    .select("*")
    .single()

  if (error) { console.error("[recordScoreEvent] Error:", error); throw error }
  revalidatePath("/dashboard")
  revalidatePath("/studio")
  return data
}

export async function getAdaptiveQuestions(area?: LifeArea, type?: string) {
  const supabase = await getSupabaseServerClient()
  let query = supabase
    .from("adaptive_questions")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true })

  if (area) query = query.eq("area", area)
  if (type) query = query.eq("type", type)

  const { data, error } = await query
  if (error) {
    console.error("[getAdaptiveQuestions] Error:", error)
    return []
  }
  return data || []
}

export async function answerAdaptiveQuestion(params: {
  questionId?: string
  area: LifeArea
  answerText?: string
  answerValue?: number
  questionType?: string
}) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) throw new Error("Unauthorized")

  const supabase = await getSupabaseServerClient()
  const impactScore = scoreDeltaFromAnswerValue(params.answerValue, 1)
  const impactXp = defaultXpForQuestion(params.questionType)

  const { data, error } = await supabase
    .from("user_question_answers")
    .insert({
      user_id: auth.user.id,
      question_id: params.questionId,
      area: params.area,
      answer_text: params.answerText,
      answer_value: params.answerValue,
      impact_score: impactScore,
      impact_xp: impactXp,
      metadata: { question_type: params.questionType },
    })
    .select("*")
    .single()

  if (error) { console.error("[answerAdaptiveQuestion] Error:", error); throw error }

  await recordScoreEvent({
    area: params.area,
    eventType: "question_answered",
    xpDelta: impactXp,
    scoreDelta: impactScore,
    sourceType: "user_question_answers",
    sourceId: data.id,
    reason: "Resposta de pergunta adaptativa registrada.",
  })

  return data
}

export async function createMission(params: MissionInput) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) throw new Error("Unauthorized")

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("missions")
    .insert({
      user_id: auth.user.id,
      area: params.area,
      type: params.type,
      title: params.title,
      description: params.description,
      xp_reward: params.xpReward || 0,
      score_impact: params.scoreImpact || 0,
      due_at: params.dueAt,
      metadata: params.metadata || {},
    })
    .select("*")
    .single()

  if (error) { console.error("[createMission] Error:", error); throw error }

  await recordScoreEvent({
    area: params.area,
    eventType: "mission_created",
    xpDelta: 5,
    scoreDelta: 0,
    sourceType: "missions",
    sourceId: data.id,
    reason: `Missão criada: ${params.title}`,
  })
  await unlockAchievement("first_mission").catch(() => {})

  revalidatePath("/dashboard")
  revalidatePath("/studio")
  return data
}

export async function completeMission(missionId: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) throw new Error("Unauthorized")

  const supabase = await getSupabaseServerClient()
  const { data: mission, error: fetchError } = await supabase
    .from("missions")
    .select("*")
    .eq("id", missionId)
    .eq("user_id", auth.user.id)
    .single()

  if (fetchError || !mission) throw fetchError || new Error("Mission not found")

  const { data, error } = await supabase
    .from("missions")
    .update({ status: "completed", completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", missionId)
    .eq("user_id", auth.user.id)
    .select("*")
    .single()

  if (error) { console.error("[completeMission] Error:", error); throw error }

  await recordScoreEvent({
    area: mission.area,
    eventType: "mission_completed",
    xpDelta: mission.xp_reward || 0,
    scoreDelta: mission.score_impact || 0,
    sourceType: "missions",
    sourceId: mission.id,
    reason: `Missão concluída: ${mission.title}`,
  })
  await unlockAchievement("first_mission_completed").catch(() => {})

  revalidatePath("/dashboard")
  revalidatePath("/studio")
  return data
}

export async function getActiveMissions() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("user_id", auth.user.id)
    .eq("status", "active")
    .order("due_at", { ascending: true, nullsFirst: false })

  if (error) {
    console.error("[getActiveMissions] Error:", error)
    return []
  }
  return data || []
}

export async function unlockAchievement(key: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return null

  const supabase = await getSupabaseServerClient()
  const { data: achievement } = await supabase
    .from("achievements")
    .select("*")
    .eq("key", key)
    .eq("active", true)
    .single()

  if (!achievement) return null

  const { data, error } = await supabase
    .from("user_achievements")
    .upsert({
      user_id: auth.user.id,
      achievement_id: achievement.id,
      metadata: { key },
    }, { onConflict: "user_id,achievement_id" })
    .select("*")
    .single()

  if (error) {
    console.error("[unlockAchievement] Error:", error)
    return null
  }
  return data
}

export async function getUserAchievements() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("user_achievements")
    .select("*, achievements(*)")
    .eq("user_id", auth.user.id)
    .order("unlocked_at", { ascending: false })

  if (error) {
    console.error("[getUserAchievements] Error:", error)
    return []
  }
  return data || []
}
