import { getDiagnosticQuestions, getDiagnosticResult, getUserOnboardingStatus } from "@/lib/db/actions"
import { UnifiedOnboarding } from "@/components/onboarding/unified-onboarding"

export default async function OnboardingPage() {
  const questions = await getDiagnosticQuestions()
  const diagnostic = await getDiagnosticResult()
  const { step } = await getUserOnboardingStatus()

  return (
    <UnifiedOnboarding
      questions={questions}
      diagnosticData={diagnostic}
      initialStep={step}
    />
  )
}
