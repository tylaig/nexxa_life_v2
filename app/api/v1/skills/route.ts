import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { listSkillCapabilities, parseCreateSkillInput } from "@/modules/skills/contracts"
import { createSkill, listSkills } from "@/modules/skills/repository"

export async function GET() {
  return NextResponse.json({
    module: "skills",
    status: "operational",
    capabilities: listSkillCapabilities(),
    items: await listSkills(),
  })
}

export async function POST(request: Request) {
  try {
    const payload = parseCreateSkillInput(await request.json())
    const item = await createSkill(payload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "invalid_skill_payload", details: error.issues }, { status: 400 })
    }

    throw error
  }
}
