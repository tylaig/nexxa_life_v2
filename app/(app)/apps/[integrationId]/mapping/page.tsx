import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationMappingView } from "@/components/apps/integration-mapping-view"

export default async function IntegrationMappingPage({
  params,
}: {
  params: Promise<{ integrationId: string }>
}) {
  const { integrationId } = await params

  return (
    <>
      <AppTopbar title="Mapping" subtitle="Mapeamento de payloads, contact fields e outputs operacionais" />
      <IntegrationMappingView integrationId={integrationId} />
    </>
  )
}
