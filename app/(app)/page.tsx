import { AppTopbar } from "@/components/app-shell/app-topbar"
import { HomeOverviewView } from "@/components/home/home-overview-view"

export default function AppHomePage() {
  return (
    <>
      <AppTopbar title="Dashboard" subtitle="Visão executiva e personalizável do workspace com operação, IA, analytics, vendas e produto" />
      <HomeOverviewView />
    </>
  )
}
