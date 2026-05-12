import { getDiagnosticQuestions, getDiagnosticResult, getUserOnboardingStatus } from "@/lib/db/actions"
import { UnifiedOnboarding } from "@/components/onboarding/unified-onboarding"
import { redirect } from "next/navigation"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"

export default async function OnboardingPage() {
  const auth = await getAuthenticatedAppUser()
  if (!auth) redirect("/login")
  
  let questions: any[] = []
  let diagnostic: any = null
  let step = "welcome"

  try {
    questions = await getDiagnosticQuestions()
    diagnostic = await getDiagnosticResult()
    const status = await getUserOnboardingStatus()
    step = status.step
  } catch (err) {
    console.error("[OnboardingPage] Error loading data:", err)
  }

  return (
    <UnifiedOnboarding
      questions={questions}
      diagnosticData={diagnostic}
      initialStep={step}
    />
  )
}
