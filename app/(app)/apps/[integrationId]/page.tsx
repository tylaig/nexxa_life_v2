import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationDetailView } from "@/components/apps/integration-detail-view"

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ integrationId: string }>
}) {
  const { integrationId } = await params

  return (
    <>
      <AppTopbar title="Integration detail" subtitle="Status, configuração pública e validação operacional" />
      <IntegrationDetailView integrationId={integrationId} />
    </>
  )
}
