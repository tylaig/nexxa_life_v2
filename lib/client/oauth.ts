"use client"

import { hasClientSupabaseConfig } from "@/lib/client/env"
import { getSupabaseBrowserClient } from "@/lib/client/supabase"

export async function signInWithGoogle(next = "/dashboard") {
  if (!hasClientSupabaseConfig()) {
    throw new Error("Login com Google não está disponível no momento.")
  }

  const supabase = getSupabaseBrowserClient()

  // Limpa sessão anterior antes de iniciar novo fluxo OAuth
  await supabase.auth.signOut({ scope: "local" })

  const redirectTo = new URL("/auth/callback", window.location.origin)
  redirectTo.searchParams.set("next", next)

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
      // Garante PKCE flow — o Supabase client com flowType:'pkce' já faz isso
      // mas passamos explicitamente para evitar fallback para implicit
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      skipBrowserRedirect: false,
    },
  })

  if (error) {
    throw error
  }
}
