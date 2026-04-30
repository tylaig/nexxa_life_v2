import { AppTopbar } from "@/components/app-shell/app-topbar"
import { CampaignDetailView } from "@/components/campaigns/campaign-detail-view"

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>
}) {
  const { campaignId } = await params

  return (
    <>
      <AppTopbar
        title="Campaign detail"
        subtitle="Resumo executivo, timeline, relacionamentos e ações seguras"
      />
      <CampaignDetailView campaignId={campaignId} />
    </>
  )
}
