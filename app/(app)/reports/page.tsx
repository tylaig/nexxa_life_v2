import { AppTopbar } from "@/components/app-shell/app-topbar"
import { reportsHero } from "@/components/nexxa-life/reports-content"
import { NexxaLifeReportsView } from "@/components/nexxa-life/nexxa-life-reports-view"

export default function ReportsPage() {
  return (
    <>
      <AppTopbar title={reportsHero.title} subtitle={reportsHero.description} />
      <NexxaLifeReportsView />
    </>
  )
}
