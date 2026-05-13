import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeSettingsView } from "@/components/settings/nexxa-life-settings-view"
import { getUserPreferences } from "@/lib/db/actions"

export default async function PreferencesPage() {
  const preferences = await getUserPreferences()

  return (
    <>
      <AppTopbar title="Configurações" subtitle="Centro de controle do Meu Ciclo" />
      <NexxaLifeSettingsView preferences={preferences} />
    </>
  )
}
