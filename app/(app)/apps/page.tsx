import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationsView } from "@/components/apps/integrations-view"

export default function AppsPage() {
  return (
    <>
      <AppTopbar title="Integrações" subtitle="Base oficial de apps, providers e conexões operacionais do NexxaLife" />
      <IntegrationsView />
    </>
  )
}
