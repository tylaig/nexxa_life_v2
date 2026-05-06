import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/diagnostic",
  "/checklist",
  "/agenda",
  "/goals",
  "/journal",
  "/reports",
  "/framework-admin",
  "/apps",
  "/analytics",
  "/ai-studio",
  "/knowledge",
  "/inbox",
  "/contacts",
  "/campaigns",
  "/automations",
  "/audience",
  "/orders",
  "/products",
  "/settings",
  "/skills",
  "/templates",
  "/storage",
  "/marketplace",
  "/news",
  "/academy",
  "/logs",
]

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Sem config Supabase — deixa passar (modo dev local sem auth)
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next()
  }

  // Cria response mutável para que @supabase/ssr possa atualizar os cookies de sessão
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  // Verifica sessão via @supabase/ssr — lê cookies no formato sb-[ref]-auth-token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("next", `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/diagnostic/:path*",
    "/checklist/:path*",
    "/agenda/:path*",
    "/goals/:path*",
    "/journal/:path*",
    "/reports/:path*",
    "/framework-admin/:path*",
    "/apps/:path*",
    "/analytics/:path*",
    "/ai-studio/:path*",
    "/knowledge/:path*",
    "/inbox/:path*",
    "/contacts/:path*",
    "/campaigns/:path*",
    "/automations/:path*",
    "/audience/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/settings/:path*",
    "/skills/:path*",
    "/templates/:path*",
    "/storage/:path*",
    "/marketplace/:path*",
    "/news/:path*",
    "/academy/:path*",
    "/logs/:path*",
  ],
}
