import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { setAuthSessionCookies } from "@/lib/server/auth-cookies"
import { getAppBaseUrl } from "@/lib/server/env"
import { getSupabaseAdminClient } from "@/lib/server/supabase"
import { ensureAppUserProfile } from "@/modules/auth-profile/repository"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const next = sanitizeNext(url.searchParams.get("next"))

  if (!code) {
    return NextResponse.redirect(new URL(`/login?error=missing_code&next=${encodeURIComponent(next)}`, getAppBaseUrl()))
  }

  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    return NextResponse.redirect(new URL(`/login?error=oauth_exchange_failed&next=${encodeURIComponent(next)}`, getAppBaseUrl()))
  }

  const cookieStore = await cookies()
  setAuthSessionCookies(cookieStore as any, {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresIn: data.session.expires_in,
  })

  await ensureAppUserProfile({
    userId: data.user.id,
    email: data.user.email ?? `${data.user.id}@example.local`,
    fullName:
      typeof data.user.user_metadata?.full_name === "string"
        ? data.user.user_metadata.full_name
        : data.user.email ?? data.user.id,
    nickname: typeof data.user.user_metadata?.nickname === "string" ? data.user.user_metadata.nickname : undefined,
    phone: typeof data.user.user_metadata?.phone === "string" ? data.user.user_metadata.phone : undefined,
  })

  return NextResponse.redirect(new URL(next, getAppBaseUrl()))
}

function sanitizeNext(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/dashboard"
  }

  return next
}
