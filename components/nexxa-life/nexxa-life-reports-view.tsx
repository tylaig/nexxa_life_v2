"use client"

import { BarChart3, Flame, Goal, CheckSquare, BookText, TrendingUp, Heart, Brain, Target, Wallet, Users, Compass } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { KpiTile } from "@/components/ui/kpi-tile"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const MOOD_EMOJIS = ["😰", "😟", "😐", "🙂", "😄"]

const AREA_META: Record<string, { label: string; icon: any; color: string }> = {
  health: { label: "Saúde", icon: Heart, color: "text-rose-500" },
  mind: { label: "Mente", icon: Brain, color: "text-violet-500" },
  productivity: { label: "Produtividade", icon: Target, color: "text-blue-500" },
  finances: { label: "Finanças", icon: Wallet, color: "text-emerald-500" },
  relations: { label: "Relações", icon: Users, color: "text-amber-500" },
  purpose: { label: "Propósito", icon: Compass, color: "text-cyan-500" },
}

type ReportData = {
  streak: number
  longestStreak: number
  consistency: number
  goalsActive: number
  goalsCompleted: number
  goalsTotal: number
  journalEntries: number
  checklistAvg: number
  heatmapData: number[]
  goalProgress: { title: string; progress: number; status: string; category: string }[]
  moodTimeline: number[]
  lifeAreas: { area: string; score: number; xp: number; level: number; streak: number }[]
  daysTracked: number
} | null

function ConsistencyHeatmap({ data }: { data: number[] }) {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhum dado de checklist registrado ainda. Complete tarefas para ver seu mapa de consistência.
      </div>
    )
  }

  const max = Math.max(...data, 1)
  const cols = Math.min(data.length, 10)

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {data.map((val, i) => {
          const intensity = val / max
          return (
            <div
              key={i}
              title={`${val} tarefas concluídas`}
              style={{ width: `calc(${100 / cols}% - 4px)`, aspectRatio: "1" }}
              className={cn(
                "rounded-sm transition-colors",
                intensity === 0 ? "bg-muted/40" :
                intensity < 0.3 ? "bg-primary/20" :
                intensity < 0.6 ? "bg-primary/50" :
                intensity < 0.8 ? "bg-primary/75" : "bg-primary"
              )}
            />
          )
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Menos</span>
        <div className="flex items-center gap-1">
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <div key={v} className={cn("h-2.5 w-2.5 rounded-sm",
              v === 0 ? "bg-muted/40" : v < 0.4 ? "bg-primary/30" : v < 0.7 ? "bg-primary/60" : "bg-primary"
            )} />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  )
}

function MoodTimeline({ data }: { data: number[] }) {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhuma entrada no diário. Registre seu humor para ver a tendência.
      </div>
    )
  }

  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((mood, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm bg-primary/30 transition-all"
            style={{ height: `${(mood / 5) * 100}%` }}
            title={MOOD_EMOJIS[mood - 1]}
          />
        </div>
      ))}
    </div>
  )
}

function LifeAreasGrid({ areas }: { areas: ReportData["lifeAreas"] }) {
  if (!areas || areas.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhum score de área registrado. Complete o diagnóstico para ativar a gamificação.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {areas.map((a) => {
        const meta = AREA_META[a.area] || { label: a.area, icon: Target, color: "text-primary" }
        const Icon = meta.icon
        return (
          <div key={a.area} className="rounded-2xl border border-border/50 bg-background/70 p-4 text-center space-y-2">
            <div className={cn("mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60", meta.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-foreground">{meta.label}</p>
            <p className="text-2xl font-bold tabular-nums text-primary">{Math.round(a.score * 10)}%</p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
              <span>Nv.{a.level}</span>
              <span>·</span>
              <span>{a.xp} XP</span>
            </div>
            <Progress value={a.score * 10} className="h-1.5" />
          </div>
        )
      })}
    </div>
  )
}

export function NexxaLifeReportsView({ data }: { data: ReportData }) {
  // Handle no data state
  if (!data) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          eyebrow="Insights"
          title="Relatórios"
          description="Acompanhe sua evolução, consistência e padrões ao longo do tempo."
        />
        <SectionCard variant="highlight">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sem dados ainda</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Complete tarefas, registre no diário e crie metas para ver seus relatórios com dados reais.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Insights"
        title="Relatórios"
        description={`${data.daysTracked} dias monitorados · ${data.goalsTotal} metas · ${data.journalEntries} entradas no diário`}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KpiTile label="Streak atual" value={`${data.streak} dias`} icon={Flame} accent="amber" />
        <KpiTile label="Consistência" value={`${data.consistency}%`} icon={TrendingUp} accent="teal" />
        <KpiTile label="Metas concluídas" value={data.goalsCompleted} icon={Goal} accent="emerald" />
        <KpiTile label="Entradas no diário" value={data.journalEntries} icon={BookText} accent="violet" />
      </div>

      {/* Grid principal */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Heatmap */}
        <SectionCard title="Consistência diária" description="Tarefas concluídas nos últimos 30 dias">
          <ConsistencyHeatmap data={data.heatmapData} />
        </SectionCard>

        {/* Checklist avg */}
        <SectionCard title="Checklist — média do período">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Taxa de conclusão diária</span>
              <span className="text-2xl font-bold text-foreground">{data.checklistAvg}%</span>
            </div>
            <Progress value={data.checklistAvg} className="h-3 rounded-full" />
            <p className="text-xs text-muted-foreground">
              {data.checklistAvg >= 70 ? "🔥 Excelente ritmo! Você está acima da meta de 70% de conclusão." :
               data.checklistAvg >= 50 ? "📈 Bom progresso. Pequenos ajustes podem levar ao próximo nível." :
               data.checklistAvg > 0 ? "💡 Há espaço para crescer. Revise a quantidade e prioridade das tarefas." :
               "📋 Comece registrando tarefas no checklist para acompanhar sua consistência."}
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Life Area Scores */}
      <SectionCard title="Scores por Área da Vida" description="Visão gamificada baseada no seu diagnóstico e comportamento">
        <LifeAreasGrid areas={data.lifeAreas} />
      </SectionCard>

      {/* Metas do período */}
      <SectionCard title="Metas — progresso atual" action={
        <span className="text-xs text-muted-foreground">{data.goalsTotal} metas</span>
      }>
        {data.goalProgress.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Nenhuma meta criada ainda. Crie metas para acompanhar o progresso.
          </div>
        ) : (
          <div className="space-y-4">
            {data.goalProgress.map((goal) => (
              <div key={goal.title} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{goal.title}</span>
                    {goal.status === "completed" && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">✓</span>
                    )}
                  </div>
                  <span className={cn("text-sm font-bold tabular-nums",
                    goal.progress === 100 ? "text-emerald-500" : "text-primary")}>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className={cn("h-1.5", goal.progress === 100 ? "[&>div]:bg-emerald-500" : "")} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Humor ao longo do tempo */}
      <SectionCard title="Tendência de humor" description="Baseado nas entradas do seu diário">
        <div className="space-y-3">
          <MoodTimeline data={data.moodTimeline} />
          {data.moodTimeline.length > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>😰 Difícil</span>
              <span>😄 Incrível</span>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Insight geral */}
      <SectionCard variant="highlight">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Resumo da sua evolução</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {data.streak > 0 ? (
                <>Você está numa sequência de <strong className="text-foreground">{data.streak} dias</strong>. </>
              ) : (
                <>Inicie sua sequência completando tarefas diariamente. </>
              )}
              {data.goalsCompleted > 0 && (
                <>Completou <strong className="text-foreground">{data.goalsCompleted} meta{data.goalsCompleted !== 1 ? "s" : ""}</strong>. </>
              )}
              {data.journalEntries > 0 && (
                <>Fez <strong className="text-foreground">{data.journalEntries} registro{data.journalEntries !== 1 ? "s" : ""}</strong> no diário. </>
              )}
              {data.consistency > 70 ? "Continue assim — o ciclo está funcionando!" :
               data.consistency > 40 ? "Bom progresso — mantenha a consistência." :
               "Cada dia conta. Comece pequeno e seja constante."}
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
