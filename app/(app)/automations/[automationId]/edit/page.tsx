import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AutomationStudioView } from "@/components/automations/automation-studio-view"

export default async function EditAutomationPage({
  params,
}: {
  params: Promise<{ automationId: string }>
}) {
  const { automationId } = await params

  return (
    <>
      <AppTopbar
        title="Editar fluxo"
        subtitle="Builder dedicado com contexto lateral e revisão antes de publicar"
      />
      <AutomationStudioView mode="edit" automationId={automationId} />
    </>
  )
}
