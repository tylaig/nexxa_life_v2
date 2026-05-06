"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { getClientSupabaseUrl, getClientSupabaseKey } from "@/lib/client/env"

declare global {
  interface Window {
    __nexxaLifeSupabaseBrowserClient?: SupabaseClient
  }
}

export function getSupabaseBrowserClient(): SupabaseClient {
  const url = getClientSupabaseUrl()
  const key = getClientSupabaseKey()

  if (!url || !key) {
    throw new Error(
      "Supabase browser configuration is incomplete. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY no .env.local."
    )
  }

  if (!window.__nexxaLifeSupabaseBrowserClient) {
    window.__nexxaLifeSupabaseBrowserClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        // PKCE flow: evita que o Supabase use Implicit flow (hash fragment)
        // e garante que o callback receba ?code= via query string
        flowType: "pkce",
      },
    })
  }

  return window.__nexxaLifeSupabaseBrowserClient
}
