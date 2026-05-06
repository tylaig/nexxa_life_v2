import { z } from "zod"

const booleanish = z
  .enum(["true", "false", "1", "0"])
  .optional()
  .transform((value) => value === "true" || value === "1")

const envSchema = z.object({
  APP_SERVICE_NAME: z.string().default("nexxalife"),
  DATABASE_URL: z.string().min(1).optional(),
  REDIS_URL: z.string().min(1).optional(),
  APP_DISABLE_QUEUE: booleanish,
  SUPABASE_URL: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_SCHEMA: z.string().default("public"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().min(1).optional(),
  AI_GATEWAY_BASE_URL: z.string().min(1).optional(),
  AI_GATEWAY_API_KEY: z.string().min(1).optional(),
  AI_GATEWAY_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  RAG_USE_PGVECTOR: booleanish,
  RAG_MATCH_THRESHOLD: z.coerce.number().default(0.2),
})

type AppEnv = z.infer<typeof envSchema>

let cachedEnv: AppEnv | null = null

function parseEnv(): AppEnv {
  return envSchema.parse(process.env)
}

export function getAppEnv(): AppEnv {
  if (!cachedEnv) {
    cachedEnv = parseEnv()
  }

  return cachedEnv
}

export function getAppBaseUrl() {
  const env = getAppEnv()
  return env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

export function getSupabaseBrowserUrl() {
  const env = getAppEnv()
  return env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
}

export function getSupabasePublishableKey() {
  const env = getAppEnv()
  return env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export function hasDatabaseUrl() {
  return Boolean(getAppEnv().DATABASE_URL)
}

export function hasRedisUrl() {
  const env = getAppEnv()
  return Boolean(env.REDIS_URL) && !env.APP_DISABLE_QUEUE
}

export function isPgVectorEnabled() {
  return Boolean(getAppEnv().RAG_USE_PGVECTOR)
}

export function hasSupabaseConfig() {
  const env = getAppEnv()
  return Boolean((env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL) && env.SUPABASE_SERVICE_ROLE_KEY)
}

export function hasSupabaseBrowserConfig() {
  return Boolean(getSupabaseBrowserUrl() && getSupabasePublishableKey())
}

export function resetAppEnvForTests() {
  cachedEnv = null
}
