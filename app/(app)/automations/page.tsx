import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AutomationsListView } from "@/components/automations/automations-list-view"

export default function AutomationsPage() {
  return (
    <>
      <AppTopbar
        title="Automações"
        subtitle="Catálogo operacional com detalhe dedicado e builder full screen"
      />
      <AutomationsListView />
    </>
  )
}
