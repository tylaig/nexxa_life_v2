import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AutomationStudioView } from "@/components/automations/automation-studio-view"

export default function NewAutomationPage() {
  return (
    <>
      <AppTopbar
        title="Novo fluxo"
        subtitle="Builder full screen para criação estrutural de automações"
      />
      <AutomationStudioView mode="create" />
    </>
  )
}
