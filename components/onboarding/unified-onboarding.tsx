// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DiagnosticWizard } from "@/components/meu-dia/meu-dia-diagnostic-view"
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

  // Planning phase - just point to the auto-opened sidebar chat
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background/50 p-6">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl">
          <CardContent className="flex flex-col items-center p-10 text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/20 shadow-inner">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground animate-pulse" />
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 shadow-inner">
                <Bot className="h-8 w-8 text-violet-500 animate-pulse [animation-delay:200ms]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Diagnóstico Completo</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A IA Estrategista já tem seus dados e o chat acabou de abrir no canto inferior direito.
                Construa suas metas e tarefas iniciais com ela.
              </p>
            </div>

            <Button
              onClick={async () => {
                await markUserOnboarded()
              }}
              variant="outline"
              className="mt-4 w-full"
            >
              Já finalizei meu plano, ir para Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
