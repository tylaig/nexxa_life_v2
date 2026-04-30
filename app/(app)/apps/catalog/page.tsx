import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationsCatalogView } from "@/components/apps/integrations-catalog-view"

export default function IntegrationsCatalogPage() {
  return (
    <>
      <AppTopbar title="Catálogo de integrações" subtitle="Biblioteca comercial e técnica de integrações disponíveis para ativação no workspace" />
      <IntegrationsCatalogView />
    </>
  )
}
