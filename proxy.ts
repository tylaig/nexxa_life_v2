import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const protectedPrefixes = ["/dashboard", "/diagnostic", "/checklist", "/agenda", "/goals", "/journal", "/reports", "/framework-admin", "/apps"]

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const insideProtectedPrefix = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  const insideAppGroup = pathname.startsWith("/(app)")

  if (!insideProtectedPrefix && !insideAppGroup) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("sb-access-token")?.value

  if (accessToken) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = "/login"
  loginUrl.searchParams.set("next", `${pathname}${search}`)

  return NextResponse.redirect(loginUrl)
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
    "/(app)/:path*",
  ],
}
