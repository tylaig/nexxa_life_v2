"use client"

import * as React from "react"
import {
  Brain,
  CheckCircle2,
  Compass,
  Flame,
  Heart,
  Loader2,
  Medal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { getActiveMissions, getLifeAreaScores, getUserAchievements } from "@/lib/db/actions"
import { xpToNextLevel } from "@/lib/gamification/scoring"
import { LIFE_AREA_LABELS, type LifeArea } from "@/lib/gamification/types"

const AREA_VISUALS: Record<LifeArea, { icon: any; tone: string; glow: string; gradient: string; stageLabel: string }> = {
  health: {
    icon: Heart,
    tone: "text-rose-500",
    glow: "bg-rose-500/10 ring-rose-500/15",
    gradient: "from-rose-500/15 via-background to-background",
    stageLabel: "Energia e corpo",
  },
  mind: {
    icon: Brain,
    tone: "text-violet-500",
    glow: "bg-violet-500/10 ring-violet-500/15",
    gradient: "from-violet-500/15 via-background to-background",
    stageLabel: "Clareza mental",
  },
  productivity: {
    icon: Target,
    tone: "text-blue-500",
    glow: "bg-blue-500/10 ring-blue-500/15",
    gradient: "from-blue-500/15 via-background to-background",
    stageLabel: "Execução diária",
  },
  finances: {
    icon: Wallet,
    tone: "text-emerald-500",
    glow: "bg-emerald-500/10 ring-emerald-500/15",
    gradient: "from-emerald-500/15 via-background to-background",
    stageLabel: "Clareza financeira",
  },
  relations: {
    icon: Users,
    tone: "text-amber-500",
    glow: "bg-amber-500/10 ring-amber-500/15",
    gradient: "from-amber-500/15 via-background to-background",
    stageLabel: "Conexões",
  },
  purpose: {
    icon: Compass,
    tone: "text-cyan-500",
    glow: "bg-cyan-500/10 ring-cyan-500/15",
    gradient: "from-cyan-500/15 via-background to-background",
    stageLabel: "Direção",
  },
}

const STAGE_COPY: Record<string, string> = {
  recuperacao: "Recuperação",
  desenvolvimento: "Desenvolvimento",
  aceleracao: "Aceleração",
  excelencia: "Excelência",
}

function getScoreStage(score: number) {
  if (score >= 80) return "excelencia"
  if (score >= 60) return "aceleracao"
  if (score >= 40) return "desenvolvimento"
  return "recuperacao"
}

function LifeAreaScoreCard({ score }: { score: any }) {
  const area = score.area as LifeArea
  const visual = AREA_VISUALS[area] || AREA_VISUALS.productivity
  const Icon = visual.icon
  const numericScore = Math.round(Number(score.score || 0))
  const level = Number(score.calculated_level || score.level || 1)
  const xp = Number(score.xp || 0)
  const nextXp = xpToNextLevel(xp)
  const levelBaseXp = Math.pow(Math.max(level - 1, 0), 2) * 100
  const nextLevelXp = Math.pow(level, 2) * 100
  const levelProgress = nextLevelXp > levelBaseXp
    ? Math.round(((xp - levelBaseXp) / (nextLevelXp - levelBaseXp)) * 100)
    : 0
  const stage = score.stage || getScoreStage(numericScore)

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-[24px] border border-border/60 bg-gradient-to-br p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
      visual.gradient
    )}>
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-foreground/[0.03] blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl ring-1", visual.glow, visual.tone)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{LIFE_AREA_LABELS[area] || area}</h3>
            <p className="text-[11px] text-muted-foreground">{visual.stageLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums text-foreground">{numericScore}%</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Score</div>
        </div>
      </div>

      <div className="relative mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{STAGE_COPY[stage] || "Evolução"}</span>
            <span>Nível {level}</span>
          </div>
          <Progress value={numericScore} className="h-2" />
        </div>

        <div className="rounded-2xl border border-border/50 bg-background/65 p-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> XP da área</span>
            <span>{xp} XP</span>
          </div>
          <Progress value={Math.max(0, Math.min(100, levelProgress))} className="h-1.5" />
          <p className="mt-1.5 text-[10px] text-muted-foreground">Faltam {nextXp} XP para o próximo nível</p>
        </div>
      </div>
    </div>
  )
}

function ActiveMissionCard({ mission }: { mission: any }) {
  const area = mission.area as LifeArea
  const visual = AREA_VISUALS[area] || AREA_VISUALS.productivity
  const Icon = visual.icon

  return (
    <div className="rounded-2xl border border-border/60 bg-background/75 p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1", visual.glow, visual.tone)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {mission.type || "missão"}
            </span>
            <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-600">
              +{mission.xp_reward || 0} XP
            </span>
          </div>
          <h4 className="mt-1.5 truncate text-sm font-semibold text-foreground">{mission.title}</h4>
          {mission.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{mission.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function LifeAreaCockpit() {
  const [state, setState] = React.useState({
    loading: true,
    scores: [] as any[],
    missions: [] as any[],
    achievements: [] as any[],
  })

  React.useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [scores, missions, achievements] = await Promise.all([
          getLifeAreaScores(),
          getActiveMissions(),
          getUserAchievements(),
        ])
        if (!cancelled) setState({ loading: false, scores: scores || [], missions: missions || [], achievements: achievements || [] })
      } catch (error) {
        console.error("[LifeAreaCockpit] load error", error)
        if (!cancelled) setState((current) => ({ ...current, loading: false }))
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (state.loading) {
    return (
      <div className="rounded-[28px] border border-border/60 bg-background/70 p-6 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando cockpit de evolução...
        </div>
      </div>
    )
  }

  const overallScore = state.scores.length
    ? Math.round(state.scores.reduce((sum, item) => sum + Number(item.score || 0), 0) / state.scores.length)
    : 0
  const totalXp = state.scores.reduce((sum, item) => sum + Number(item.xp || 0), 0)
  const weakest = [...state.scores].sort((a, b) => Number(a.score || 0) - Number(b.score || 0))[0]
  const strongest = [...state.scores].sort((a, b) => Number(b.score || 0) - Number(a.score || 0))[0]

  return (
    <section className="overflow-hidden rounded-[32px] border border-primary/15 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)/0.45))] shadow-sm">
      <div className="border-b border-border/50 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              <Flame className="h-3.5 w-3.5" />
              Cockpit gamificado
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">Evolução por área</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Score vivo, XP e nível por dimensão da vida. O objetivo é transformar execução diária em progresso visível.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-2xl border border-border/60 bg-background/75 px-3 py-2">
              <div className="text-lg font-bold text-foreground">{overallScore}%</div>
              <div className="text-[10px] text-muted-foreground">Geral</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/75 px-3 py-2">
              <div className="text-lg font-bold text-foreground">{totalXp}</div>
              <div className="text-[10px] text-muted-foreground">XP total</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/75 px-3 py-2">
              <div className="text-lg font-bold text-foreground">{state.missions.length}</div>
              <div className="text-[10px] text-muted-foreground">Missões</div>
            </div>
          </div>
        </div>
      </div>

      {state.scores.length === 0 ? (
        <div className="p-6">
          <div className="rounded-3xl border border-dashed border-border bg-background/65 p-6 text-center">
            <Medal className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-3 text-sm font-semibold text-foreground">Nenhum score gamificado ainda</h3>
            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-muted-foreground">
              Conclua ou reabra o diagnóstico para gerar o baseline. Depois disso, perguntas, missões e execução diária passam a evoluir cada área.
            </p>
            <Button asChild size="sm" className="mt-4 rounded-xl">
              <Link href="/diagnostic">Abrir diagnóstico</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5 xl:grid-cols-3">
          {state.scores.map((score) => <LifeAreaScoreCard key={score.area} score={score} />)}
        </div>
      )}

      <div className="grid gap-4 border-t border-border/50 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-5">
        <div className="rounded-[24px] border border-border/60 bg-background/65 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Missões ativas</h3>
              <p className="text-xs text-muted-foreground">Ações que convertem comportamento em XP.</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="h-8 rounded-xl text-xs">
              <Link href="/studio">Pedir novas missões</Link>
            </Button>
          </div>
          {state.missions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4 text-xs text-muted-foreground">
              Nenhuma missão ativa ainda. A Nexxa pode sugerir missões a partir das áreas mais fracas.
            </div>
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {state.missions.slice(0, 4).map((mission) => <ActiveMissionCard key={mission.id} mission={mission} />)}
            </div>
          )}
        </div>

        <div className="rounded-[24px] border border-border/60 bg-background/65 p-4">
          <h3 className="text-sm font-semibold text-foreground">Leitura rápida</h3>
          <div className="mt-3 space-y-3 text-xs leading-5 text-muted-foreground">
            <div className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-500" />
              <p>
                Área mais forte: <strong className="text-foreground">{strongest ? LIFE_AREA_LABELS[strongest.area as LifeArea] : "—"}</strong>.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Target className="mt-0.5 h-4 w-4 text-orange-500" />
              <p>
                Próxima alavanca: <strong className="text-foreground">{weakest ? LIFE_AREA_LABELS[weakest.area as LifeArea] : "—"}</strong>.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <p>
                Conquistas desbloqueadas: <strong className="text-foreground">{state.achievements.length}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
