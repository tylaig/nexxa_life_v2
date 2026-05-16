import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeReportsView } from "@/components/nexxa-life/nexxa-life-reports-view"
import { getReportData } from "@/lib/db/actions"

export default async function ReportsPage() {
  const data = await getReportData()

  return (
    <>
      <AppTopbar title="Relatórios" subtitle="Acompanhe sua evolução com dados reais" />
      <NexxaLifeReportsView data={data} />
    </>
  )
}
