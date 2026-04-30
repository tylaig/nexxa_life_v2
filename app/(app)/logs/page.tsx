import { AppTopbar } from "@/components/app-shell/app-topbar"
import { LogsOverviewView } from "@/components/logs/logs-overview-view"

export default function LogsPage() {
  return (
    <>
      <AppTopbar title="Logs" subtitle="Eventos, falhas, rastros operacionais e análise por workspace" />
      <LogsOverviewView />
    </>
  )
}
