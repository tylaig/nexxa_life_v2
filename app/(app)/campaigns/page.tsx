import { AppTopbar } from "@/components/app-shell/app-topbar"
import { CampaignsListView } from "@/components/campaigns/campaigns-list-view"

export default function CampaignsPage() {
  return (
    <>
      <AppTopbar
        title="Campaigns"
        subtitle="Orquestração outbound complementar conectada a audiência, inbox, automations e contexto operacional do NexxaLife"
      />
      <CampaignsListView />
    </>
  )
}
