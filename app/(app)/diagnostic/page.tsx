import { AppTopbar } from "@/components/app-shell/app-topbar"
import { diagnosticHero } from "@/components/meu-dia/diagnostic-content"
import { NexxaLifeDiagnosticView } from "@/components/meu-dia/meu-dia-diagnostic-view"

export default function DiagnosticPage() {
  return (
    <>
      <AppTopbar title={diagnosticHero.title} subtitle={diagnosticHero.description} />
      <NexxaLifeDiagnosticView />
    </>
  )
}
