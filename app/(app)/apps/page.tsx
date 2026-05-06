import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppsIntegrationsView } from "@/components/apps/apps-integrations-view"

export default function AppsPage() {
  return (
    <>
      <AppTopbar
        title="Integrações"
        subtitle="Conecte o NexxaLife com seus apps favoritos"
      />
      <AppsIntegrationsView />
    </>
  )
}
