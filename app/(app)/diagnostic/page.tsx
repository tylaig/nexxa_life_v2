import { AppTopbar } from "@/components/app-shell/app-topbar"
import { DiagnosticWizard } from "@/components/meu-dia/meu-dia-diagnostic-view"
import { getDiagnosticQuestions } from "@/lib/db/actions"

export default async function DiagnosticPage() {
  const questions = await getDiagnosticQuestions()

  return (
    <>
      <AppTopbar title="Diagnóstico Pessoal" subtitle="Mapeie o seu momento para calibrar o NexxaLife" />
      <DiagnosticWizard questions={questions} />
    </>
  )
}
