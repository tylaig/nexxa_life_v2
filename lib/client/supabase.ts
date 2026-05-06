"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

import { getClientSupabaseUrl, getClientSupabaseKey } from "@/lib/client/env"

declare global {
  interface Window {
    __nexxaLifeSupabaseBrowserClient?: SupabaseClient
  }
}

/**
 * Retorna o cliente Supabase para uso no browser.
 *
 * Usa createBrowserClient do @supabase/ssr em vez do createClient padrão.
 * Motivo: no fluxo PKCE do OAuth, o code_verifier precisa ser salvo em
 * COOKIES (não localStorage) para que o servidor consiga lê-lo no callback
 * e completar o exchangeCodeForSession corretamente.
 *
 * createBrowserClient armazena automaticamente o code_verifier nos cookies,
 * resolvendo o erro "oauth_exchange_failed" que ocorre quando o server
 * não encontra o verifier salvo pelo client regular.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  const url = getClientSupabaseUrl()
  const key = getClientSupabaseKey()

  if (!url || !key) {
    throw new Error(
      "Supabase browser configuration is incomplete. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY no .env.local."
    )
  }

  if (!window.__nexxaLifeSupabaseBrowserClient) {
    window.__nexxaLifeSupabaseBrowserClient = createBrowserClient(url, key, {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return window.__nexxaLifeSupabaseBrowserClient
}
