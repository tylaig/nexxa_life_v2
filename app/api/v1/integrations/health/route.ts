import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseIntegrationHealthCheckInput } from "@/modules/integrations/contracts"
import { runIntegrationHealthCheck } from "@/modules/integrations/repository"

export async function POST(request: Request) {
  try {
    const payload = parseIntegrationHealthCheckInput(await request.json())
    const item = await runIntegrationHealthCheck(payload)
    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_integration_health_payload", details: error.issues }, { status: 400 })
    }

    throw error
  }
}
