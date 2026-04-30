import { z } from "zod"

export const CAMPAIGN_CAPABILITIES = [
  "campaign_builder",
  "audience_snapshot",
  "template_bindings",
  "scheduled_dispatch",
  "automation_triggers",
] as const

export type CampaignCapability = (typeof CAMPAIGN_CAPABILITIES)[number]

export const createCampaignSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  objective: z.string().trim().min(1, "objective is required"),
  status: z.enum(["draft", "scheduled", "running", "paused", "completed"]).default("draft"),
  channel: z.string().trim().min(1, "channel is required"),
  senderId: z.string().trim().min(1, "senderId is required"),
  templateId: z.string().trim().min(1, "templateId is required"),
  templateVersion: z.string().trim().min(1, "templateVersion is required"),
  audienceId: z.string().trim().min(1, "audienceId is required"),
  createdBy: z.string().trim().min(1, "createdBy is required"),
  scheduleAt: z.string().datetime().optional(),
  dryRunEnabled: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).default({}),
})

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>

export function listCampaignCapabilities(): CampaignCapability[] {
  return [...CAMPAIGN_CAPABILITIES]
}

export function parseCreateCampaignInput(payload: unknown): CreateCampaignInput {
  return createCampaignSchema.parse(payload)
}
