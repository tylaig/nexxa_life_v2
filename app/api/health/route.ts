import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "chat.meusuper.app",
    status: "healthy",
    timestamp: new Date().toISOString(),
  })
}
