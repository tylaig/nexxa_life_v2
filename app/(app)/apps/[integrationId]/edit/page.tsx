import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationStudioView } from "@/components/apps/integration-studio-view"

export default async function EditIntegrationPage({
  params,
}: {
  params: Promise<{ integrationId: string }>
}) {
  const { integrationId } = await params

  return (
    <>
      <AppTopbar title="Editar integração" subtitle="Configuração estrutural, validação e contexto de ativação" />
      <IntegrationStudioView mode="edit" integrationId={integrationId} />
    </>
  )
}
