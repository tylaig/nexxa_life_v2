import { z } from "zod"

export const SKILL_CAPABILITIES = [
  "prompt_variables",
  "structured_output",
  "versioning",
  "manual_test_console",
] as const

export type SkillCapability = (typeof SKILL_CAPABILITIES)[number]

export const createSkillSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  slug: z.string().trim().min(1, "slug is required"),
  description: z.string().trim().default(""),
  category: z.string().trim().default("general"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  promptTemplate: z.string().trim().min(1, "promptTemplate is required"),
  outputMode: z.enum(["text", "json"]).default("text"),
  inputSchema: z.record(z.string(), z.unknown()).default({}),
})

export type CreateSkillInput = z.infer<typeof createSkillSchema>

export function listSkillCapabilities(): SkillCapability[] {
  return [...SKILL_CAPABILITIES]
}

export function parseCreateSkillInput(payload: unknown): CreateSkillInput {
  return createSkillSchema.parse(payload)
}
