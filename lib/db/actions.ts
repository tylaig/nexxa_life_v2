"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient, getAuthenticatedAppUser } from "@/lib/server/auth-user"

// -----------------------------------------------------------------------------
// CHECKLIST
// -----------------------------------------------------------------------------

export async function getChecklist(dateStr?: string) {
  const auth = await getAuthenticatedAppUser()
  if (!auth) return []

  const supabase = await getSupabaseServerClient()
  const date = dateStr || new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from("checklist_items")
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
  const { error } = await supabase
    .from("checklist_items")
    .update({ done })
    .eq("id", id)
    .eq("user_id", auth.user.id)

  if (error) { console.error("Supabase Error:", error); throw error; }
  revalidatePath("/checklist")
  revalidatePath("/dashboard")
}

export async function addChecklistItem(params: { label: string; priority?: "high" | "medium" | "low"; category?: string; date?: string }) {
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
      goal_milestones(*)
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
