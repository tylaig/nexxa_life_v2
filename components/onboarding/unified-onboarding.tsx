// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DiagnosticWizard } from "@/components/nexxa-life/nexxa-life-diagnostic-view"
import { CharacterSelection } from "./character-selection"
import { updateOnboardingStep, markUserOnboarded } from "@/lib/db/actions"
import { Sparkles, ArrowRight, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  questions: any[]
  diagnosticData: any
  initialStep: string
}

export function UnifiedOnboarding({ questions, diagnosticData, initialStep }: Props) {
  // If user already did diagnostic but not planning, skip to planning
  const hasDiagnostic = !!diagnosticData
  const isComplete = initialStep === "complete"
  const router = useRouter()

  const [phase, setPhase] = React.useState<"character" | "diagnostic" | "planning">(
    initialStep === "welcome" || initialStep === "profile" ? "character" : hasDiagnostic ? "planning" : "diagnostic"
  )

  const [diagData, setDiagData] = React.useState(diagnosticData)

  const handleDiagnosticDone = React.useCallback(() => {
    window.location.href = "/studio"
  }, [])

  if (phase === "character") {
    return <CharacterSelection onComplete={() => setPhase("diagnostic")} />
  }

  if (phase === "diagnostic") {
    return <DiagnosticWizard questions={questions} onComplete={handleDiagnosticDone} />
  }

  // If already in planning phase, just redirect to the AI Studio
  React.useEffect(() => {
    if (phase === "planning") {
      router.push("/studio")
    }
  }, [phase, router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
