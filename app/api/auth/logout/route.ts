import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { clearAuthSessionCookies } from "@/lib/server/auth-cookies"

export async function POST() {
  const cookieStore = await cookies()
  clearAuthSessionCookies(cookieStore as any)

  return NextResponse.json({ status: "signed_out" })
}
