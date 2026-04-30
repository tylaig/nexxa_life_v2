import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseUpdateIntegrationInput } from "@/modules/integrations/contracts"
import { getIntegrationConnection, updateIntegrationConnection } from "@/modules/integrations/repository"

export async function GET(_: Request, context: { params: Promise<{ integrationId: string }> }) {
  const { integrationId } = await context.params
  const item = await getIntegrationConnection(integrationId)

  if (!item) {
    return NextResponse.json({ error: "integration_not_found" }, { status: 404 })
  }

  return NextResponse.json({ item })
}

export async function PATCH(request: Request, context: { params: Promise<{ integrationId: string }> }) {
  try {
    const { integrationId } = await context.params
    const payload = parseUpdateIntegrationInput(await request.json())
    const item = await updateIntegrationConnection(integrationId, payload)

    if (!item) {
      return NextResponse.json({ error: "integration_not_found" }, { status: 404 })
    }

    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_integration_payload", details: error.issues }, { status: 400 })
    }

    throw error
  }
}
