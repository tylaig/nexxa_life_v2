import { AppTopbar } from "@/components/app-shell/app-topbar"
import { reportsHero } from "@/components/meu-dia/reports-content"
import { NexxaLifeReportsView } from "@/components/meu-dia/meu-dia-reports-view"

export default function ReportsPage() {
  return (
    <>
      <AppTopbar title={reportsHero.title} subtitle={reportsHero.description} />
      <NexxaLifeReportsView />
    </>
  )
}
