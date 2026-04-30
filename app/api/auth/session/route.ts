import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import { setAuthSessionCookies } from "@/lib/server/auth-cookies"

const sessionPayloadSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresIn: z.number().int().positive().default(3600),
})

export async function POST(request: Request) {
  const payload = sessionPayloadSchema.parse(await request.json())
  const cookieStore = await cookies()

  setAuthSessionCookies(cookieStore as any, payload)

  return NextResponse.json({ status: "ok" })
}
