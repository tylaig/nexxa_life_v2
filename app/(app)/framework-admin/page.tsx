import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { AppTopbar } from "@/components/app-shell/app-topbar"
import { frameworkAdminHero } from "@/components/meu-dia/framework-admin-content"
import { NexxaLifeFrameworkAdminView } from "@/components/meu-dia/meu-dia-framework-admin-view"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { isAdminProfile } from "@/modules/auth-profile/contracts"
import { getFrameworkAdminWorkspace } from "@/modules/framework-admin/workspace"

export default async function FrameworkAdminPage() {
  const auth = await getAuthenticatedAppUser()

  if (!auth) {
    redirect("/login")
  }

  if (!isAdminProfile(auth.profile)) {
    redirect("/dashboard")
  }

  const workspace = await getFrameworkAdminWorkspace()

  return (
    <>
      <AppTopbar title={frameworkAdminHero.title} subtitle={frameworkAdminHero.description} />
      <NexxaLifeFrameworkAdminView workspace={workspace} />
    </>
  )
}
