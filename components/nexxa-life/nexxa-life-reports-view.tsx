"use client"

import { useState } from "react"
import { BarChart3, Flame, Goal, CheckSquare, BookText, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { KpiTile } from "@/components/ui/kpi-tile"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type Period = "7d" | "30d" | "90d"

const PERIOD_LABELS: Record<Period, string> = { "7d": "7 dias", "30d": "30 dias", "90d": "90 dias" }

const MOCK_DATA: Record<Period, {
  streak: number; consistency: number; goalsCompleted: number; journalEntries: number; checklistAvg: number
  heatmap: number[]; goals: { title: string; progress: number }[]
}> = {
  "7d": {
    streak: 12, consistency: 85, goalsCompleted: 1, journalEntries: 5, checklistAvg: 71,
    heatmap: [3, 5, 4, 6, 5, 4, 5],
    goals: [{ title: "Rotina fitness", progress: 75 }, { title: "Leitura 12 livros", progress: 42 }],
  },
  "30d": {
    streak: 12, consistency: 78, goalsCompleted: 2, journalEntries: 22, checklistAvg: 65,
    heatmap: Array.from({ length: 30 }, () => Math.floor(Math.random() * 7)),
    goals: [{ title: "Rotina fitness", progress: 75 }, { title: "Leitura 12 livros", progress: 42 }, { title: "Reserva emergência", progress: 100 }],
  },
  "90d": {
    streak: 12, consistency: 72, goalsCompleted: 4, journalEntries: 61, checklistAvg: 59,
    heatmap: Array.from({ length: 90 }, () => Math.floor(Math.random() * 7)),
    goals: [{ title: "Rotina fitness", progress: 75 }, { title: "Leitura 12 livros", progress: 42 }, { title: "Reserva emergência", progress: 100 }, { title: "MVP produto", progress: 68 }],
  },
}

const MOOD_EMOJIS = ["😰", "😟", "😐", "🙂", "😄"]
const MOCK_MOOD_TIMELINE = [3, 4, 4, 3, 5, 4, 5, 4, 3, 4, 5, 4, 4, 3, 5]

function ConsistencyHeatmap({ data, period }: { data: number[]; period: Period }) {
  const max = Math.max(...data, 1)
  const cols = period === "7d" ? 7 : period === "30d" ? 10 : 15
  const rows = Math.ceil(data.length / cols)

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

export function NexxaLifeReportsView() {
  const [period, setPeriod] = useState<Period>("30d")
  const data = MOCK_DATA[period]

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Insights"
        title="Relatórios"
        description="Acompanhe sua evolução, consistência e padrões ao longo do tempo."
        actions={
          <div className="flex items-center rounded-xl border border-border/60 bg-muted/30 p-0.5">
            {(["7d", "30d", "90d"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  period === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KpiTile label="Streak atual" value={`${data.streak} dias`} icon={Flame} accent="amber" trend={{ value: 15 }} />
        <KpiTile label="Consistência" value={`${data.consistency}%`} icon={TrendingUp} accent="teal" trend={{ value: 8 }} />
        <KpiTile label="Metas concluídas" value={data.goalsCompleted} icon={Goal} accent="emerald" />
        <KpiTile label="Entradas no diário" value={data.journalEntries} icon={BookText} accent="violet" />
      </div>

      {/* Grid principal */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Heatmap */}
        <SectionCard title="Consistência diária" description={`Tarefas concluídas nos últimos ${PERIOD_LABELS[period]}`}>
          <ConsistencyHeatmap data={data.heatmap} period={period} />
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
               "💡 Há espaço para crescer. Revise a quantidade e prioridade das tarefas."}
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Metas do período */}
      <SectionCard title="Metas — progresso no período" action={
        <span className="text-xs text-muted-foreground">{data.goals.length} metas</span>
      }>
        <div className="space-y-4">
          {data.goals.map((goal) => (
            <div key={goal.title} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{goal.title}</span>
                <span className={cn("text-sm font-bold tabular-nums",
                  goal.progress === 100 ? "text-emerald-500" : "text-primary")}>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className={cn("h-1.5", goal.progress === 100 ? "[&>div]:bg-emerald-500" : "")} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Humor ao longo do tempo */}
      <SectionCard title="Tendência de humor" description="Como você se sentiu ao longo dos últimos dias">
        <div className="space-y-3">
          <MoodTimeline data={MOCK_MOOD_TIMELINE} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>😰 Difícil</span>
            <span>😄 Incrível</span>
          </div>
        </div>
      </SectionCard>

      {/* Insight geral */}
      <SectionCard variant="highlight">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Insight do período</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Sua consistência está em <strong className="text-foreground">{data.consistency}%</strong> nos últimos {PERIOD_LABELS[period]}.
              Você completou <strong className="text-foreground">{data.goalsCompleted} meta{data.goalsCompleted !== 1 ? "s" : ""}</strong> e
              fez <strong className="text-foreground">{data.journalEntries} registros</strong> no diário. Continue assim —
              o ciclo está funcionando.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
