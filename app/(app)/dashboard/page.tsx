import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeDashboardView } from "@/components/nexxa-life/nexxa-life-dashboard-view"

export default async function DashboardPage() {
  return (
    <>
      <AppTopbar title="Dashboard NexxaLife" subtitle="Centro de clareza, execução e evolução do seu ciclo principal" />
      <NexxaLifeDashboardView />
    </>
  )
}
