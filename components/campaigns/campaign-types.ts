export type CampaignItem = {
  id: string
  name: string
  objective: string
  status: "draft" | "scheduled" | "running" | "paused" | "completed"
  channel: string
  senderId: string
  templateId: string
  templateVersion: string
  audienceId: string
  createdBy: string
  scheduleAt?: string
  dryRunEnabled: boolean
  metadata: Record<string, unknown>
  launchedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}
