import { AppTopbar } from "@/components/app-shell/app-topbar"
import { CampaignStudioView } from "@/components/campaigns/campaign-studio-view"

export default function NewCampaignPage() {
  return (
    <>
      <AppTopbar
        title="Nova campaign"
        subtitle="Criação full screen com seções, preview e ações fixas"
      />
      <CampaignStudioView mode="create" />
    </>
  )
}
