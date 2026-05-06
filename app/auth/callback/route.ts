import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { getAppBaseUrl } from "@/lib/server/env"
import { ensureAppUserProfile } from "@/modules/auth-profile/repository"

/**
 * OAuth callback handler usando @supabase/ssr.
 *
 * Por que @supabase/ssr aqui?
 * O PKCE flow salva um `code_verifier` nos cookies do browser antes de redirecionar
 * para o Google. O exchangeCodeForSession() precisa ler esse verifier dos cookies
 * para completar o exchange — o que só funciona com createServerClient (SSR),
 * não com o admin client que não tem acesso aos cookies do request.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const next = sanitizeNext(url.searchParams.get("next"))
  const baseUrl = url.origin

  if (!code) {
    // Sem code — fallback para a página client-side que lê o hash fragment
    const fallbackUrl = new URL("/auth/confirm", baseUrl)
    fallbackUrl.searchParams.set("next", next)
    return NextResponse.redirect(fallbackUrl)
  }

  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data.session) {
      console.error("[auth/callback] exchangeCodeForSession error:", error?.message ?? "no session")
      return NextResponse.redirect(
        new URL(`/login?error=oauth_exchange_failed&next=${encodeURIComponent(next)}`, baseUrl)
      )
    }

    // Cria/atualiza perfil do usuário de forma não-bloqueante
    ensureAppUserProfile({
      userId: data.user.id,
      email: data.user.email ?? `${data.user.id}@example.local`,
      fullName:
        typeof data.user.user_metadata?.full_name === "string"
          ? data.user.user_metadata.full_name
          : data.user.email ?? data.user.id,
      nickname:
        typeof data.user.user_metadata?.nickname === "string"
          ? data.user.user_metadata.nickname
          : undefined,
      phone:
        typeof data.user.user_metadata?.phone === "string"
          ? data.user.user_metadata.phone
          : undefined,
    }).catch((err) => {
      console.error("[auth/callback] ensureAppUserProfile error:", err)
    })

    return NextResponse.redirect(new URL(next, baseUrl))
  } catch (err) {
    console.error("[auth/callback] unexpected error:", err)
    return NextResponse.redirect(
      new URL(`/login?error=oauth_exchange_failed&next=${encodeURIComponent(next)}`, baseUrl)
    )
  }
}

function sanitizeNext(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/dashboard"
  }
  return next
}
