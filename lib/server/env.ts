import { z } from "zod"

const envSchema = z.object({
  APP_SERVICE_NAME: z.string().default("chat.meusuper.app"),
  APP_TENANT_ID: z.string().default("tenant_demo"),
  APP_WORKSPACE_ID: z.string().default("workspace_demo"),
  DATABASE_URL: z.string().min(1).optional(),
  REDIS_URL: z.string().min(1).optional(),
  APP_DISABLE_QUEUE: z
    .enum(["true", "false", "1", "0"])
    .optional()
    .transform((value) => value === "true" || value === "1"),
  SUPABASE_URL: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_SCHEMA: z.string().default("public"),
  AI_GATEWAY_BASE_URL: z.string().min(1).optional(),
  AI_GATEWAY_API_KEY: z.string().min(1).optional(),
  AI_GATEWAY_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  RAG_USE_PGVECTOR: z
    .enum(["true", "false", "1", "0"])
    .optional()
    .transform((value) => value === "true" || value === "1"),
  RAG_MATCH_THRESHOLD: z.coerce.number().default(0.2),
})

type AppEnv = z.infer<typeof envSchema>

let cachedEnv: AppEnv | null = null

export function getAppEnv(): AppEnv {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env)
  }

  return cachedEnv
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
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
}
