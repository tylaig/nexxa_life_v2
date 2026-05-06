import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { getAppEnv } from "@/lib/server/env"

declare global {
  // eslint-disable-next-line no-var
  var __nexxaLifeSupabaseAdmin: SupabaseClient | undefined
}

export function isSupabaseConfigured() {
  const env = getAppEnv()
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
}

export function getSupabaseAdminClient(): SupabaseClient {
  const env = getAppEnv()

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase server configuration is incomplete")
  }

  if (!global.__nexxaLifeSupabaseAdmin) {
    global.__nexxaLifeSupabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: env.SUPABASE_SCHEMA },
    }) as any
  }

  return global.__nexxaLifeSupabaseAdmin as SupabaseClient
}
