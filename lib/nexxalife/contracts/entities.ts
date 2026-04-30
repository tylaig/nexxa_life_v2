export type Profile = {
  id: string
  displayName: string
  lifeContext?: string
  focusAreas: string[]
}

export type OnboardingSnapshot = {
  id: string
  profileId: string
  currentStep: string
  completedSteps: string[]
  readinessLevel?: "initial" | "in_progress" | "completed"
  createdAt: string
  updatedAt: string
}

export type DashboardSummary = {
  profileId: string
  scoreLabel: string
  focusMessage: string
  activeGoals: number
  completedTasksToday: number
  plannedTasksToday: number
}

export type GoalStatus = "draft" | "active" | "paused" | "completed"

export type Goal = {
  id: string
  title: string
  description?: string
  status: GoalStatus
  progressPercent: number
  pillar?: string
  targetDate?: string
}

export type ChecklistTaskStatus = "pending" | "done" | "blocked"

export type ChecklistTask = {
  id: string
  title: string
  status: ChecklistTaskStatus
  goalId?: string
  plannedFor?: string
  notes?: string
}
