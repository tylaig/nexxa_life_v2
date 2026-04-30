import { AppTopbar } from "@/components/app-shell/app-topbar"
import { CampaignStudioView } from "@/components/campaigns/campaign-studio-view"

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ campaignId: string }>
}) {
  const { campaignId } = await params

  return (
    <>
      <AppTopbar
        title="Editar campaign"
        subtitle="Edição full screen com preview lateral e footer sticky"
      />
      <CampaignStudioView mode="edit" campaignId={campaignId} />
    </>
  )
}
