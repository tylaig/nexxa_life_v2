"use client"

import { hasSupabaseBrowserConfig } from "@/lib/server/env"
import { getSupabaseBrowserClient } from "@/lib/client/supabase"

export async function signInWithGoogle(next = "/dashboard") {
  if (!hasSupabaseBrowserConfig()) {
    throw new Error("Login com Google ainda não está configurado")
  }

  const supabase = getSupabaseBrowserClient()
  await supabase.auth.signOut()

  const redirectTo = new URL("/auth/callback", window.location.origin)
  redirectTo.searchParams.set("next", next)

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
    },
  })

  if (error) {
    throw error
  }
}
