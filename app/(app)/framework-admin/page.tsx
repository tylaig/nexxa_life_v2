import { AppTopbar } from "@/components/app-shell/app-topbar"
import { frameworkAdminHero } from "@/components/meu-dia/framework-admin-content"
import { NexxaLifeFrameworkAdminView } from "@/components/meu-dia/meu-dia-framework-admin-view"

export default function FrameworkAdminPage() {
  return (
    <>
      <AppTopbar title={frameworkAdminHero.title} subtitle={frameworkAdminHero.description} />
      <NexxaLifeFrameworkAdminView />
    </>
  )
}
