import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeDashboardView } from "@/components/meu-dia/meu-dia-dashboard-view"

export default function DashboardPage() {
  return (
    <>
      <AppTopbar title="Dashboard NexxaLife" subtitle="Centro de clareza, execução e evolução do seu ciclo principal" />
      <NexxaLifeDashboardView />
    </>
  )
}
