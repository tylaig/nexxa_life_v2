import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { getAppEnv } from "@/lib/server/env"
import { ensureAppUserProfile, getAppUserProfile } from "@/modules/auth-profile/repository"

/**
 * Cria um cliente Supabase server-side usando @supabase/ssr.
 * Necessário para que o SDK gerencie os cookies de sessão automaticamente
 * (formato sb-[ref]-auth-token) em vez dos cookies manuais legados.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies()
  const env = getAppEnv()

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
  const supabaseKey =
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase server configuration is incomplete")
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options)
        }
      },
    },
  })
}

/**
 * Retorna o usuário autenticado atual via Supabase SSR.
 * Lê a sessão diretamente dos cookies gerenciados pelo @supabase/ssr.
 */
export async function getAuthenticatedAppUser() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const metadata = (user.user_metadata ?? {}) as Record<string, unknown>
    const email = user.email ?? `${user.id}@example.local`

    const existingProfile = await getAppUserProfile(user.id)
    const profile =
      existingProfile ??
      (await ensureAppUserProfile({
        userId: user.id,
        email,
        fullName: typeof metadata.full_name === "string" ? metadata.full_name : email,
        nickname: typeof metadata.nickname === "string" ? metadata.nickname : undefined,
        phone: typeof metadata.phone === "string" ? metadata.phone : undefined,
      }))

    return {
      user: {
        id: user.id,
        email,
        fullName: profile.fullName,
        nickname: profile.nickname,
        phone: profile.phone,
      },
      profile,
    }
  } catch (err) {
    console.error("[getAuthenticatedAppUser] error:", err)
    return null
  }
}
