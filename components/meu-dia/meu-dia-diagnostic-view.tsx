// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Brain, ChevronLeft, ChevronRight, Loader2, Sparkles, Heart, Target, Wallet, Users, Compass, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { saveDiagnosticResult, markUserOnboarded } from "@/lib/db/actions"

const AREA_META: Record<string, { label: string; icon: any; color: string }> = {
  health:       { label: "Saúde",         icon: Heart,   color: "text-rose-500" },
  mind:         { label: "Mente",         icon: Brain,   color: "text-violet-500" },
  productivity: { label: "Produtividade", icon: Target,  color: "text-blue-500" },
  finances:     { label: "Finanças",      icon: Wallet,  color: "text-emerald-500" },
  relations:    { label: "Relações",      icon: Users,   color: "text-amber-500" },
  purpose:      { label: "Propósito",     icon: Compass, color: "text-cyan-500" },
}

type Question = {
  id: string
  area: string
  question_text: string
  question_order: number
}

type DiagnosticWizardProps = {
  questions: Question[]
}

type Phase = "welcome" | "answering" | "analyzing" | "results"

export function DiagnosticWizard({ questions }: DiagnosticWizardProps) {
  const router = useRouter()
  const [phase, setPhase] = React.useState<Phase>("welcome")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, number>>({})
  const [analysis, setAnalysis] = React.useState<any>(null)

  const currentQ = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const areaMeta = currentQ ? AREA_META[currentQ.area] : null

  function handleAnswer(value: number) {
    if (!currentQ) return
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
  }

  async function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      // All answered → analyze
      setPhase("analyzing")
      try {
        const res = await fetch("/api/diagnostic/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, questions }),
        })
        const data = await res.json()
        setAnalysis(data)

        // Save to database
        const scores = data.scores || {}
        await saveDiagnosticResult({
          answers,
          scores: {
            health: scores.health ?? 5,
            mind: scores.mind ?? 5,
            productivity: scores.productivity ?? 5,
            finances: scores.finances ?? 5,
            relations: scores.relations ?? 5,
            purpose: scores.purpose ?? 5,
          },
        })

        setPhase("results")
      } catch (err) {
        console.error("Analysis failed:", err)
        // Fallback: calculate manually
        const areaScores: Record<string, number[]> = {}
        for (const q of questions) {
          if (!areaScores[q.area]) areaScores[q.area] = []
          if (answers[q.id] !== undefined) areaScores[q.area].push(answers[q.id])
        }
        const scores: Record<string, number> = {}
        for (const [area, vals] of Object.entries(areaScores)) {
          scores[area] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 5
        }
        const fallbackAnalysis = {
          scores,
          insight: "Análise calculada localmente. Continue acompanhando pelo NexxaLife.",
          priorities: Object.entries(scores).sort(([, a], [, b]) => a - b).slice(0, 2).map(([area]) => area),
        }
        setAnalysis(fallbackAnalysis)
        await saveDiagnosticResult({ answers, scores: scores as any })
        setPhase("results")
      }
    }
  }

  function handlePrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  async function handleFinish() {
    await markUserOnboarded()
    router.push("/dashboard")
    router.refresh()
  }

  // ─── Welcome Phase ──────────────────────────────────────────────────────────
  if (phase === "welcome") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="max-w-lg text-center shadow-2xl border-border/50">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Vamos entender o seu momento</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Responda {questions.length} perguntas rápidas sobre 6 áreas da sua vida.
              A IA do NexxaLife vai analisar e criar um mapa personalizado para a sua evolução.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(AREA_META).map(([key, meta]) => {
                const Icon = meta.icon
                return (
                  <div key={key} className="flex flex-col items-center gap-1 rounded-xl border border-border/50 bg-muted/30 p-3">
                    <Icon className={cn("h-5 w-5", meta.color)} />
                    <span className="text-xs font-medium text-muted-foreground">{meta.label}</span>
                  </div>
                )
              })}
            </div>
            <Button size="lg" className="w-full mt-4" onClick={() => setPhase("answering")}>
              Começar Diagnóstico
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ─── Analyzing Phase ────────────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Brain className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">A IA está analisando...</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Processando suas respostas para gerar um mapa personalizado do seu momento atual.
          </p>
        </div>
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  // ─── Results Phase ──────────────────────────────────────────────────────────
  if (phase === "results" && analysis) {
    const scores = analysis.scores || {}
    const overallScore = Object.values(scores).length > 0
      ? Math.round((Object.values(scores) as number[]).reduce((a, b) => a + b, 0) / Object.values(scores).length * 10)
      : 50

    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Seu Diagnóstico Pessoal</h2>
          <p className="text-muted-foreground">Aqui está o panorama completo das 6 áreas da sua vida</p>
        </div>

        {/* Overall Score */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <span className="text-3xl font-bold text-primary">{overallScore}%</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Score Geral</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {analysis.insight || "Continue acompanhando seu progresso pelo NexxaLife."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Per-area Scores */}
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(AREA_META).map(([area, meta]) => {
            const Icon = meta.icon
            const score = scores[area] ?? 5
            const isPriority = analysis.priorities?.includes(area)
            return (
              <Card key={area} className={cn("transition-all", isPriority && "border-amber-500/30 bg-amber-500/5")}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50", meta.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                      <span className="text-sm font-bold text-foreground">{score}/10</span>
                    </div>
                    <Progress value={score * 10} className="mt-2 h-2" />
                    {isPriority && <span className="text-[10px] text-amber-600 font-medium mt-1 block">⚡ Área prioritária</span>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <Button size="lg" className="w-full" onClick={handleFinish}>
          <Sparkles className="h-4 w-4 mr-2" />
          Ir para o meu Dashboard
        </Button>
      </div>
    )
  }

  // ─── Answering Phase (Question Wizard) ──────────────────────────────────────
  if (!currentQ) return null
  const AreaIcon = areaMeta?.icon || Zap
  const currentAnswer = answers[currentQ.id]

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
      {/* Progress */}
      <div className="w-full max-w-lg mb-8 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{areaMeta?.label || currentQ.area}</span>
          <span>{currentIndex + 1} de {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="w-full max-w-lg shadow-xl border-border/50">
        <CardHeader className="text-center space-y-3">
          <div className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50", areaMeta?.color)}>
            <AreaIcon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg leading-relaxed">{currentQ.question_text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Selector */}
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              <span>Muito baixo</span>
              <span>Excelente</span>
            </div>
            <div className="grid grid-cols-11 gap-1">
              {Array.from({ length: 11 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all",
                    currentAnswer === i
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              disabled={currentAnswer === undefined}
            >
              {currentIndex === questions.length - 1 ? "Finalizar" : "Próxima"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
