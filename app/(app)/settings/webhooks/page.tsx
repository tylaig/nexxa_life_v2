import { AppTopbar } from "@/components/app-shell/app-topbar"
import { IntegrationsWebhooksView } from "@/components/apps/integrations-webhooks-view"

export default function IntegrationsWebhooksPage() {
  return (
    <>
      <AppTopbar title="Webhooks" subtitle="Entrada inbound para eventos externos, mapping, parser JSON, teste, debug e ativação" />
      <IntegrationsWebhooksView />
    </>
  )
}
