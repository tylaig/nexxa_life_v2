import { DiagnosticWizard } from "@/components/meu-dia/meu-dia-diagnostic-view"
import { getDiagnosticQuestions } from "@/lib/db/actions"

export default async function DiagnosticPage() {
  const questions = await getDiagnosticQuestions()

  return <DiagnosticWizard questions={questions} />
}
