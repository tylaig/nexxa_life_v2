import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { getAppBaseUrl } from "@/lib/server/env"
import { getSupabaseAdminClient } from "@/lib/server/supabase"

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
  cookieStore.set("sb-access-token", data.session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: data.session.expires_in,
  })
  cookieStore.set("sb-refresh-token", data.session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  return NextResponse.redirect(new URL(next, getAppBaseUrl()))
}

function sanitizeNext(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/dashboard"
  }

  return next
}
