import { AppTopbar } from "@/components/app-shell/app-topbar"
import { CampaignsListView } from "@/components/campaigns/campaigns-list-view"

export default function CampaignsPage() {
  return (
    <>
      <AppTopbar
        title="Campaigns"
        subtitle="Catálogo outbound com busca, filtros, detalhe dedicado e editor full screen"
      />
      <CampaignsListView />
    </>
  )
}
