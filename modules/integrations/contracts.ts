import { z } from "zod"

export const INTEGRATION_PROVIDERS = ["n8n", "supabase", "openai"] as const
export const INTEGRATION_CAPABILITIES = [
  "connection_validation",
  "secret_storage",
  "workflow_catalog",
  "provider_health",
] as const

export type IntegrationProvider = (typeof INTEGRATION_PROVIDERS)[number]

export const createIntegrationSchema = z.object({
  provider: z.enum(INTEGRATION_PROVIDERS),
  displayName: z.string().trim().min(1, "displayName is required"),
  baseUrl: z.string().trim().url("baseUrl must be a valid URL"),
  authMode: z.string().trim().min(1, "authMode is required"),
  status: z.enum(["draft", "validated", "error"]).default("draft"),
  configPublic: z.record(z.string(), z.unknown()).default({}),
})

export const updateIntegrationSchema = createIntegrationSchema.partial()

export const integrationHealthCheckSchema = createIntegrationSchema.pick({
  provider: true,
  displayName: true,
  baseUrl: true,
  authMode: true,
  configPublic: true,
})

export type CreateIntegrationInput = z.infer<typeof createIntegrationSchema>
export type UpdateIntegrationInput = z.infer<typeof updateIntegrationSchema>
export type IntegrationHealthCheckInput = z.infer<typeof integrationHealthCheckSchema>

export function listIntegrationProviders(): IntegrationProvider[] {
  return [...INTEGRATION_PROVIDERS]
}

export function listIntegrationCapabilities() {
  return [...INTEGRATION_CAPABILITIES]
}

export function parseCreateIntegrationInput(payload: unknown): CreateIntegrationInput {
  return createIntegrationSchema.parse(payload)
}

export function parseUpdateIntegrationInput(payload: unknown): UpdateIntegrationInput {
  return updateIntegrationSchema.parse(payload)
}

export function parseIntegrationHealthCheckInput(payload: unknown): IntegrationHealthCheckInput {
  return integrationHealthCheckSchema.parse(payload)
}
