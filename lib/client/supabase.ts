"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { getSupabaseBrowserUrl, getSupabasePublishableKey } from "@/lib/server/env"

declare global {
  interface Window {
    __nexxaLifeSupabaseBrowserClient?: SupabaseClient
  }
}

export function getSupabaseBrowserClient(): SupabaseClient {
  const url = getSupabaseBrowserUrl()
  const publishableKey = getSupabasePublishableKey()

  if (!url || !publishableKey) {
    throw new Error("Supabase browser configuration is incomplete")
  }

  if (!window.__nexxaLifeSupabaseBrowserClient) {
    window.__nexxaLifeSupabaseBrowserClient = createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return window.__nexxaLifeSupabaseBrowserClient
}
