// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DiagnosticWizard } from "@/components/meu-dia/meu-dia-diagnostic-view"
import { PlanningSession } from "@/components/planning/planning-session"
import { updateOnboardingStep } from "@/lib/db/actions"

type Props = {
  questions: any[]
  diagnosticData: any
  initialStep: string
}

export function UnifiedOnboarding({ questions, diagnosticData, initialStep }: Props) {
  // If user already did diagnostic but not planning, skip to planning
  const hasDiagnostic = !!diagnosticData
  const isComplete = initialStep === "complete"

  const [phase, setPhase] = React.useState<"diagnostic" | "planning">(
    hasDiagnostic ? "planning" : "diagnostic"
  )

  const [diagData, setDiagData] = React.useState(diagnosticData)

  // Called when diagnostic finishes (from the wizard's handleFinish)
  // We override the wizard's redirect behavior
  const handleDiagnosticDone = React.useCallback(async () => {
    await updateOnboardingStep("planning")
    // Refresh to get fresh diagnostic data then show planning
    window.location.href = "/setup"
  }, [])

  if (phase === "diagnostic") {
    return <DiagnosticWizard questions={questions} onComplete={handleDiagnosticDone} />
  }

  // Planning phase - reuses the full PlanningSession component
  return <PlanningSession diagnosticData={diagData} />
}
