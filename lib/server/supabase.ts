import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { getAppEnv } from "@/lib/server/env"

declare global {
  // eslint-disable-next-line no-var
  var __chatMeusuperSupabaseAdmin: SupabaseClient | undefined
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

  if (!global.__chatMeusuperSupabaseAdmin) {
    global.__chatMeusuperSupabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: env.SUPABASE_SCHEMA },
    }) as any
  }

  return global.__chatMeusuperSupabaseAdmin as SupabaseClient
}
