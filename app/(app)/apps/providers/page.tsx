import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationsProvidersView } from "@/components/apps/integrations-providers-view"

export default function IntegrationsProvidersPage() {
  return (
    <>
      <AppTopbar title="Providers" subtitle="Catálogo técnico de providers com schema, credenciais, tools e limites por workspace" />
      <IntegrationsProvidersView />
    </>
  )
}
