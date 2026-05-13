import { AppTopbar } from "@/components/app-shell/app-topbar"
import { SecuritySettingsView } from "@/components/settings/security-settings-view"

export default function SecurityPage() {
  return (
    <>
      <AppTopbar title="Segurança" subtitle="Acesso, sessões e proteção" />
      <SecuritySettingsView />
    </>
  )
}
