import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AutomationDetailView } from "@/components/automations/automation-detail-view"

export default async function AutomationDetailPage({
  params,
}: {
  params: Promise<{ automationId: string }>
}) {
  const { automationId } = await params

  return (
    <>
      <AppTopbar
        title="Automation detail"
        subtitle="Resumo executivo, dependências e mapa visual do fluxo"
      />
      <AutomationDetailView automationId={automationId} />
    </>
  )
}
