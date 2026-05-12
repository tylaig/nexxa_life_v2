// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Brain, ChevronRight, Loader2, Sparkles, Heart, Target,
  Wallet, Users, Compass, Zap, CheckCircle2, ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { saveDiagnosticResult, markUserOnboarded } from "@/lib/db/actions"

const AREA_META: Record<string, { label: string; icon: any; color: string; gradient: string; emoji: string; tip: string }> = {
  health: {
    label: "Saúde", icon: Heart, color: "text-rose-400",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    emoji: "🫀", tip: "Respire fundo. Não existe resposta certa — apenas a sua verdade."
  },
  mind: {
    label: "Mente", icon: Brain, color: "text-violet-400",
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    emoji: "🧠", tip: "Sua mente é sua ferramenta mais poderosa. Vamos calibrá-la."
  },
  productivity: {
    label: "Produtividade", icon: Target, color: "text-blue-400",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    emoji: "🎯", tip: "Produtividade não é fazer mais, é fazer o que importa."
  },
  finances: {
    label: "Finanças", icon: Wallet, color: "text-emerald-400",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    emoji: "💰", tip: "Dinheiro é energia. Vamos entender como ela flui na sua vida."
  },
  relations: {
    label: "Relações", icon: Users, color: "text-amber-400",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    emoji: "🤝", tip: "Somos a média das pessoas com quem convivemos."
  },
  purpose: {
    label: "Propósito", icon: Compass, color: "text-cyan-400",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    emoji: "🧭", tip: "Quem tem um porquê enfrenta qualquer como."
  },
}

const AREA_ORDER = ["health", "mind", "productivity", "finances", "relations", "purpose"]

type Question = { id: string; area: string; question_text: string; question_order: number }
type Phase = "welcome" | "answering" | "transition" | "analyzing" | "results"

export function DiagnosticWizard({ questions, onComplete }: { questions: Question[]; onComplete?: () => void }) {
  const router = useRouter()
  const [phase, setPhase] = React.useState<Phase>("welcome")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, number>>({})
  const [analysis, setAnalysis] = React.useState<any>(null)
  const [fadeIn, setFadeIn] = React.useState(true)
  const [welcomeStep, setWelcomeStep] = React.useState(0)

  const currentQ = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0
  const areaMeta = currentQ ? AREA_META[currentQ.area] : null

  // Track area transitions
  const prevArea = currentIndex > 0 ? questions[currentIndex - 1]?.area : null
  const isNewArea = currentQ && prevArea !== currentQ?.area && currentIndex > 0

  // Animate question transitions
  function animateTransition(callback: () => void) {
    setFadeIn(false)
    setTimeout(() => {
      callback()
      setFadeIn(true)
    }, 300)
  }

  function handleAnswer(value: number) {
    if (!currentQ) return
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
  }

  async function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      const nextQ = questions[currentIndex + 1]
      if (nextQ && nextQ.area !== currentQ?.area) {
        // Show area transition screen
        animateTransition(() => {
          setCurrentIndex((i) => i + 1)
          setPhase("transition")
        })
        setTimeout(() => {
          setFadeIn(false)
          setTimeout(() => {
            setPhase("answering")
            setFadeIn(true)
          }, 300)
        }, 2200)
      } else {
        animateTransition(() => setCurrentIndex((i) => i + 1))
      }
    } else {
      // All done
      setPhase("analyzing")
      
      // Fallback: calculate scores locally from raw answers
      const computeLocalScores = () => {
        const areaScores: Record<string, number[]> = {}
        for (const q of questions) {
          if (!areaScores[q.area]) areaScores[q.area] = []
          if (answers[q.id] !== undefined) areaScores[q.area].push(answers[q.id])
        }
        const scores: Record<string, number> = {}
        for (const [area, vals] of Object.entries(areaScores)) {
          scores[area] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 5
        }
        return {
          scores,
          insight: "Análise calculada com base nas suas respostas. Continue acompanhando pelo NexxaLife.",
          priorities: Object.entries(scores).sort(([, a], [, b]) => a - b).slice(0, 2).map(([area]) => area),
        }
      }

      let result: any = null
      try {
        const res = await fetch("/api/diagnostic/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, questions }),
        })
        if (res.ok) {
          const data = await res.json()
          // Validate that we got proper scores back
          if (data.scores && typeof data.scores === "object") {
            result = data
          }
        }
      } catch {
        // Network error or parse error — will use local fallback
      }

      // Use local fallback if AI analysis failed
      if (!result) {
        result = computeLocalScores()
      }

      setAnalysis(result)
      const scores = result.scores || {}

      try {
        await saveDiagnosticResult({
          answers,
          scores: {
            health: scores.health ?? 5, mind: scores.mind ?? 5,
            productivity: scores.productivity ?? 5, finances: scores.finances ?? 5,
            relations: scores.relations ?? 5, purpose: scores.purpose ?? 5,
          },
        })
      } catch {
        // DB save failed (e.g. auth issue) — still show results to user
        console.error("[DiagnosticWizard] Failed to save results, continuing anyway")
      }

      setTimeout(() => setPhase("results"), 800)
    }
  }

  async function handleFinish() {
    if (onComplete) {
      onComplete()
    } else {
      router.push("/setup")
      router.refresh()
    }
  }

  // ─── WELCOME ────────────────────────────────────────────────────────────────
  if (phase === "welcome") {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl animate-pulse [animation-delay:1s]" />

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {welcomeStep === 0 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/10 shadow-lg shadow-primary/5">
                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Bem-vindo ao seu <span className="text-primary">Diagnóstico Pessoal</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                Em poucos minutos, vamos mapear 6 áreas essenciais da sua vida para criar 
                um plano <strong className="text-foreground">exclusivamente seu</strong>.
              </p>
              <Button size="lg" className="px-8 h-12 text-base" onClick={() => setWelcomeStep(1)}>
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {welcomeStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-foreground">6 Áreas. Uma visão completa.</h2>
              <p className="text-muted-foreground">Cada área recebe uma nota de 0 a 10 baseada na sua percepção atual.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                {AREA_ORDER.map((key, i) => {
                  const meta = AREA_META[key]
                  const Icon = meta.icon
                  return (
                    <div
                      key={key}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="text-2xl">{meta.emoji}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{meta.label}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-col items-center gap-3 pt-2">
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                  <Zap className="h-3 w-3" /> Leva cerca de 3 minutos • Totalmente privado
                </p>
                <Button size="lg" className="px-10 h-12 text-base" onClick={() => { setPhase("answering"); setFadeIn(true) }}>
                  Começar Diagnóstico <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── AREA TRANSITION ────────────────────────────────────────────────────────
  if (phase === "transition" && currentQ) {
    const meta = AREA_META[currentQ.area]
    const Icon = meta?.icon || Zap
    const areaIndex = AREA_ORDER.indexOf(currentQ.area) + 1
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", meta?.gradient)} />
        <div className="relative z-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-500">
          <div className={cn("mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border/40 shadow-xl", meta?.color)}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Área {areaIndex} de 6</p>
            <h2 className="text-2xl font-bold text-foreground">{meta?.label}</h2>
          </div>
          <p className="text-sm text-muted-foreground/80 max-w-xs mx-auto italic">"{meta?.tip}"</p>
        </div>
      </div>
    )
  }

  // ─── ANALYZING ──────────────────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 text-center space-y-6 animate-in fade-in duration-500">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping [animation-delay:0.3s]" />
            <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">A IA está analisando suas respostas</h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Cruzando dados, calculando prioridades e gerando insights personalizados...
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULTS ────────────────────────────────────────────────────────────────
  if (phase === "results" && analysis) {
    const scores = analysis.scores || {}
    const total = Object.values(scores) as number[]
    const overallScore = total.length > 0 ? Math.round(total.reduce((a, b) => a + b, 0) / total.length * 10) : 50

    return (
      <div className="fixed inset-0 z-40 bg-background overflow-y-auto">
        <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
          <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/10">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Seu Diagnóstico Pessoal</h2>
              <p className="text-muted-foreground text-sm">Panorama completo das 6 áreas da sua vida</p>
            </div>

            {/* Overall Score */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-violet-500/5 p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <span className="text-3xl font-bold text-primary">{overallScore}<span className="text-lg">%</span></span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Score Geral</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {analysis.insight || "Continue acompanhando seu progresso pelo NexxaLife."}
                  </p>
                </div>
              </div>
            </div>

            {/* Per-area Scores */}
            <div className="grid gap-3 sm:grid-cols-2">
              {AREA_ORDER.map((area, i) => {
                const meta = AREA_META[area]
                const Icon = meta.icon
                const score = scores[area] ?? 5
                const isPriority = analysis.priorities?.includes(area)
                return (
                  <div
                    key={area}
                    className={cn(
                      "rounded-xl border bg-card/50 p-4 flex items-center gap-4 transition-all animate-in fade-in duration-300",
                      isPriority ? "border-amber-500/30 bg-amber-500/5" : "border-border/40"
                    )}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50", meta.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                        <span className="text-sm font-bold tabular-nums text-foreground">{score}/10</span>
                      </div>
                      <Progress value={score * 10} className="h-2" />
                      {isPriority && <span className="text-[10px] text-amber-500 font-medium mt-1 block">⚡ Área prioritária</span>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <Button size="lg" className="w-full h-12 text-base" onClick={handleFinish}>
              <Sparkles className="h-4 w-4 mr-2" /> Criar meu Plano com a IA
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─── ANSWERING (Question Wizard) ────────────────────────────────────────────
  if (!currentQ || !areaMeta) return null
  const AreaIcon = areaMeta.icon
  const currentAnswer = answers[currentQ.id]
  const areaIndex = AREA_ORDER.indexOf(currentQ.area) + 1
  const answeredCount = Object.keys(answers).length

  return (
    <div className="fixed inset-0 z-40 bg-background overflow-hidden">
      {/* Ambient gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-40", areaMeta.gradient)} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{areaMeta.emoji}</span>
            <span className="text-sm font-semibold text-muted-foreground">{areaMeta.label}</span>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">{currentIndex + 1}/{totalQuestions}</span>
        </div>

        {/* Progress */}
        <div className="px-6">
          <Progress value={progress} className="h-1.5" />
          <div className="flex justify-between mt-2">
            {AREA_ORDER.map((area, i) => {
              const m = AREA_META[area]
              const isActive = area === currentQ.area
              const isDone = AREA_ORDER.indexOf(currentQ.area) > i
              return (
                <div key={area} className={cn("flex items-center gap-1 transition-all duration-300", isActive ? "opacity-100" : isDone ? "opacity-60" : "opacity-25")}>
                  <span className="text-xs">{m.emoji}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className={cn("w-full max-w-lg space-y-8 transition-all duration-300", fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            {/* Area icon */}
            <div className="text-center space-y-4">
              <div className={cn("mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border/40 shadow-lg", areaMeta.color)}>
                <AreaIcon className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-semibold text-foreground leading-relaxed px-4">
                {currentQ.question_text}
              </h2>
            </div>

            {/* Score Selector */}
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider px-1">
                <span>Muito baixo</span>
                <span>Excelente</span>
              </div>
              <div className="grid grid-cols-11 gap-1.5">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      "relative flex h-12 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200",
                      currentAnswer === i
                        ? "bg-primary text-primary-foreground scale-110 shadow-xl shadow-primary/25 ring-2 ring-primary/30"
                        : "bg-card border border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 hover:shadow-md"
                    )}
                  >
                    {i}
                  </button>
                ))}
              </div>

              {/* Selected value feedback */}
              {currentAnswer !== undefined && (
                <div className="text-center animate-in fade-in duration-300">
                  <p className="text-sm text-muted-foreground">
                    {currentAnswer <= 3 ? "Vamos trabalhar nisso juntos 💪" :
                     currentAnswer <= 6 ? "Há espaço para evoluir ✨" :
                     currentAnswer <= 8 ? "Você está no caminho certo! 🚀" :
                     "Excelente! Isso é inspirador! 🌟"}
                  </p>
                </div>
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                className="px-10 h-12 text-base transition-all duration-300"
                onClick={handleNext}
                disabled={currentAnswer === undefined}
              >
                {currentIndex === totalQuestions - 1 ? (
                  <><Sparkles className="h-4 w-4 mr-2" /> Finalizar Diagnóstico</>
                ) : (
                  <>Próxima <ChevronRight className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom: calming tip */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground/50 italic">"{areaMeta.tip}"</p>
        </div>
      </div>
    </div>
  )
}
