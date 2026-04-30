import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AutomationsListView } from "@/components/automations/automations-list-view"

export default function AutomationsPage() {
  return (
    <>
      <AppTopbar
        title="Automações"
        subtitle="Orquestração operacional complementar conectada a campaigns, apps, inbox e AI Studio dentro do ecossistema NexxaLife"
      />
      <AutomationsListView />
    </>
  )
}
