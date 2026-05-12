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
    const fallbackUrl = new URL("/auth/confirm", baseUrl)
    fallbackUrl.searchParams.set("next", next)
    return NextResponse.redirect(fallbackUrl)
  }

  try {
    const cookieStore = await cookies()
    // Captura os cookies para setar no objeto NextResponse final
    const pendingCookies: any[] = []

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
              // Guarda para garantir na response
              pendingCookies.push({ name, value, options })
              try {
                // Seta no Next.js standard cookieStore (pode falhar dependendo do contexto)
                cookieStore.set(name, value, options)
              } catch (err) {
                console.error("[auth/callback] cookieStore.set falhou, mas será setado via NextResponse:", err)
              }
            }
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data.session) {
      console.error("[auth/callback] exchangeCodeForSession error:", error?.message ?? "no session")
      const errResponse = NextResponse.redirect(
        new URL(`/login?error=oauth_exchange_failed&next=${encodeURIComponent(next)}`, baseUrl)
      )
      // Garantir cookies
      pendingCookies.forEach(({ name, value, options }) => {
        errResponse.cookies.set(name, value, options)
      })
      return errResponse
    }

    // Cria/atualiza perfil do usuário
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

    const response = NextResponse.redirect(new URL(next, baseUrl))
    // FIX: Aplicar explicitamente os cookies de sessão no NextResponse
    pendingCookies.forEach(({ name, value, options }) => {
      // Remover domain vazio para evitar que o Next.js gere um header inválido "Domain="
      const safeOptions = { ...options }
      if (!safeOptions.domain) {
        delete safeOptions.domain
      }
      response.cookies.set(name, value, safeOptions)
    })
    
    return response
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
