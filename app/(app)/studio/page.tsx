import { AiStudioView } from "@/components/ai/ai-studio-view"
import { nexxaOnboardingPrefillSession } from "@/components/nexxa-life/onboarding-prefill"
import { getDiagnosticResult, getUserOnboardingStatus } from "@/lib/db/actions"

export default async function StudioPage({
  searchParams,
}: {
  searchParams?: Promise<{ prefill?: string }>
}) {
  const { step } = await getUserOnboardingStatus()
  const diagnosticData = await getDiagnosticResult()
  const params = await searchParams
  const prefillSession = params?.prefill === "diagnostic" ? nexxaOnboardingPrefillSession : undefined

  return (
    <AiStudioView step={step} diagnosticData={diagnosticData} prefillSession={prefillSession} />
  )
}
