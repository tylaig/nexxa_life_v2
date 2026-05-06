import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

import { getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { isAdminProfile } from "@/modules/auth-profile/contracts"
import { getFrameworkAdminWorkspace } from "@/modules/framework-admin/workspace"

export async function GET() {
  const auth = await getAuthenticatedAppUser()

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isAdminProfile(auth.profile)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const workspace = await getFrameworkAdminWorkspace()
  return NextResponse.json(workspace)
}
