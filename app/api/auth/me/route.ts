import { NextResponse } from "next/server"

import { getAuthenticatedAppUser } from "@/lib/server/auth-user"

export async function GET() {
  const authenticated = await getAuthenticatedAppUser()

  if (!authenticated) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 })
  }

  return NextResponse.json({
    user: authenticated.user,
    profile: authenticated.profile,
  })
}
