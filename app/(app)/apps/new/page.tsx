import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationStudioView } from "@/components/apps/integration-studio-view"

export default function NewIntegrationPage() {
  return (
    <>
      <AppTopbar title="Nova integração" subtitle="Configuração estrutural de providers, validação e vínculo futuro" />
      <IntegrationStudioView mode="create" />
    </>
  )
}
