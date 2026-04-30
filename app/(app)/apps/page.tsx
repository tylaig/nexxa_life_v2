import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationsView } from "@/components/apps/integrations-view"

export default function AppsPage() {
  return (
    <>
      <AppTopbar title="App Store" subtitle="Catálogo de aplicativos, provedores de conexão e actions para sua audiência" />
      <IntegrationsView />
    </>
  )
}
