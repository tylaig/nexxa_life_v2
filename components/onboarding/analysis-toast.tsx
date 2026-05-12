// @ts-nocheck
"use client"

import * as React from "react"
import { Brain, Sparkles, CheckCircle2, BarChart3, Target, Lightbulb, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const THINKING_STEPS = [
  { text: "Analisando seu perfil...", icon: Brain, emoji: "🧠" },
  { text: "Cruzando dados das 6 áreas...", icon: BarChart3, emoji: "📊" },
  { text: "Calculando prioridades...", icon: Target, emoji: "🎯" },
  { text: "Gerando insights personalizados...", icon: Lightbulb, emoji: "💡" },
  { text: "Preparando seu plano estratégico...", icon: Rocket, emoji: "🚀" },
  { text: "Tudo pronto! Bem-vindo ao NexxaLife.", icon: CheckCircle2, emoji: "✅" },
]

export function AnalysisToast() {
  const [visible, setVisible] = React.useState(false)
  const [stepIndex, setStepIndex] = React.useState(0)
  const [exiting, setExiting] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let flag: string | null = null
    try { flag = sessionStorage.getItem("nexxa_analyzing") } catch { return }
    if (!flag) return

    const elapsed = Date.now() - parseInt(flag, 10)
    if (elapsed > 60000) {
      try { sessionStorage.removeItem("nexxa_analyzing") } catch {}
      return
    }

    setVisible(true)
    try { sessionStorage.removeItem("nexxa_analyzing") } catch {}

    const totalSteps = THINKING_STEPS.length
    const stepDuration = 2000

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const target = ((stepIndex + 1) / totalSteps) * 100
        if (prev >= target) return target
        return prev + 0.5
      })
    }, 30)

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        const next = prev + 1
        if (next >= totalSteps) {
          clearInterval(stepInterval)
          clearInterval(progressInterval)
          setProgress(100)
          // Dismiss after showing completion for 2.5s
          setTimeout(() => {
            setExiting(true)
            setTimeout(() => setVisible(false), 600)
          }, 2500)
          return totalSteps - 1
        }
        return next
      })
    }, stepDuration)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  // Update progress target when step changes
  React.useEffect(() => {
    const target = ((stepIndex + 1) / THINKING_STEPS.length) * 100
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= target) { clearInterval(interval); return target }
        return Math.min(prev + 1, target)
      })
    }, 20)
    return () => clearInterval(interval)
  }, [stepIndex])

  if (!visible) return null

  const step = THINKING_STEPS[stepIndex]
  const Icon = step.icon
  const isComplete = stepIndex === THINKING_STEPS.length - 1

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[60] w-[340px]",
        "animate-in slide-in-from-bottom-6 fade-in duration-500",
        exiting && "animate-out slide-out-to-bottom-6 fade-out duration-500"
      )}
    >
      <div className="rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-muted/30">
          <div
            className={cn(
              "h-full transition-all duration-300 ease-out rounded-r-full",
              isComplete ? "bg-emerald-500" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Animated icon */}
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                isComplete
                  ? "bg-emerald-500/10 scale-110"
                  : "bg-primary/10"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 animate-in zoom-in duration-300" />
              ) : (
                <Icon
                  key={stepIndex}
                  className="h-5 w-5 text-primary animate-in fade-in zoom-in-50 duration-300"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-foreground">
                {isComplete ? "Configuração Completa ✨" : "IA Estrategista"}
              </p>
              <p
                key={stepIndex}
                className="text-[13px] text-muted-foreground mt-1 animate-in fade-in slide-in-from-right-2 duration-300"
              >
                {step.text}
              </p>

              {/* Thinking dots */}
              {!isComplete && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
