import { NextResponse } from "next/server"
import { ZodError } from "zod"

import {
  listIntegrationCapabilities,
  listIntegrationProviders,
  parseCreateIntegrationInput,
} from "@/modules/integrations/contracts"
import {
  createIntegrationConnection,
  listIntegrationConnections,
} from "@/modules/integrations/repository"

export async function GET() {
  return NextResponse.json({
    module: "integrations",
    status: "operational",
    providers: listIntegrationProviders(),
    capabilities: listIntegrationCapabilities(),
    items: await listIntegrationConnections(),
  })
}

export async function POST(request: Request) {
  try {
    const payload = parseCreateIntegrationInput(await request.json())
    const item = await createIntegrationConnection(payload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_integration_payload", details: error.issues }, { status: 400 })
    }

    throw error
  }
}
