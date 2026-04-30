import { AppTopbar } from "@/components/app-shell/app-topbar"
import { MeuDiaDashboardView } from "@/components/meu-dia/meu-dia-dashboard-view"

export default function DashboardPage() {
  return (
    <>
      <AppTopbar title="Dashboard Meu Dia" subtitle="Centro de clareza, execução e evolução do seu ciclo principal" />
      <MeuDiaDashboardView />
    </>
  )
}
