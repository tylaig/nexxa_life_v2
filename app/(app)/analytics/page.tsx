import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AnalyticsView } from "@/components/analytics/analytics-view"

export default function AnalyticsPage() {
  return (
    <>
      <AppTopbar title="Analytics" subtitle="Painel dedicado de operação, receita, automação e IA" />
      <AnalyticsView />
    </>
  )
}
