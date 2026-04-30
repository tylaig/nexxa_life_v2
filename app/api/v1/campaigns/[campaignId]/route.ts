import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { parseCreateCampaignInput } from "@/modules/campaigns/contracts"
import { getCampaign, updateCampaign } from "@/modules/campaigns/repository"

export async function GET(_: Request, context: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await context.params
  const item = await getCampaign(campaignId)

  if (!item) {
    return NextResponse.json({ error: "campaign_not_found" }, { status: 404 })
  }

  return NextResponse.json({ item })
}

export async function PATCH(request: Request, context: { params: Promise<{ campaignId: string }> }) {
  try {
    const { campaignId } = await context.params
    const payload = parseCreateCampaignInput(await request.json())
    const item = await updateCampaign(campaignId, payload)

    if (!item) {
      return NextResponse.json({ error: "campaign_not_found" }, { status: 404 })
    }

    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "invalid_campaign_payload",
          details: error.issues,
        },
        { status: 400 }
      )
    }

    throw error
  }
}
