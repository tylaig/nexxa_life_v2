import { NextResponse } from "next/server"

import { listContacts } from "@/modules/contacts/repository"

export async function GET() {
  return NextResponse.json({
    items: await listContacts(),
  })
}
