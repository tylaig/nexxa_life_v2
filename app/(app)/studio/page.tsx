import { getDiagnosticResult, getUserOnboardingStatus } from "@/lib/db/actions"
import { AiStudioView } from "@/components/ai/ai-studio-view"

export default async function StudioPage() {
  const { step } = await getUserOnboardingStatus()
  const diagnosticData = await getDiagnosticResult()

  return (
    <AiStudioView step={step} diagnosticData={diagnosticData} />
  )
}
