import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { listCampaignCapabilities, parseCreateCampaignInput } from "@/modules/campaigns/contracts"
import { createCampaign, listCampaigns } from "@/modules/campaigns/repository"

export async function GET() {
  return NextResponse.json({
    module: "campaigns",
    status: "operational",
    capabilities: listCampaignCapabilities(),
    items: await listCampaigns(),
  })
}

export async function POST(request: Request) {
  try {
    const payload = parseCreateCampaignInput(await request.json())
    const item = await createCampaign(payload)

    return NextResponse.json({ item }, { status: 201 })
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
