"use client"

import { useState, useEffect } from "react"
import { CalendarDays, CheckSquare, Flame, Goal, BookText, TrendingUp, ArrowRight, Plus, Clock } from "lucide-react"
import Link from "next/link"

import { KpiTile } from "@/components/ui/kpi-tile"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

import { getChecklist, toggleChecklistItem, getGoals, getAgenda, getJournalEntries, getUserStreak } from "@/lib/db/actions"

// ─── Sub-componentes ────────────────────────────────────────────────────────

function DayGreeting({ name }: { name: string }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted-foreground capitalize">{today}</p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {greeting}, <span className="text-primary">{name || "Aventureiro"}</span> 👋
      </h1>
      <p className="text-sm text-muted-foreground">Veja o que está esperando por você hoje.</p>
    </div>
  )
}

function TodayChecklistCard({ initialTasks }: { initialTasks: any[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const done = tasks.filter((t) => t.done).length
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0

  const toggle = async (id: string, currentDone: boolean) => {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !currentDone } : t)))
    try {
      await toggleChecklistItem(id, !currentDone)
    } catch (err) {
      // Revert on error
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: currentDone } : t)))
    }
  }

  return (
    <SectionCard
      title="Checklist de hoje"
      action={
        <Button asChild variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/checklist">
            Ver tudo <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      }
    >
      {tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="Tudo limpo"
          description="Nenhuma tarefa para hoje ainda."
          action={{ label: "Adicionar tarefa", href: "/checklist" }}
          className="border-0 bg-transparent py-4"
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {done}/{tasks.length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {tasks.slice(0, 5).map((task) => (
              <li key={task.id} className="flex items-center gap-2.5">
                <button
                  onClick={() => toggle(task.id, task.done)}
                  className={cn(
                    "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    task.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/60"
                  )}
                >
                  {task.done ? <span className="text-[9px]">✓</span> : null}
                </button>
                <span
                  className={cn(
                    "flex-1 truncate text-sm",
                    task.done ? "text-muted-foreground line-through" : "text-foreground"
                  )}
                >
                  {task.label}
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    task.priority === "high"
                      ? "bg-red-400"
                      : task.priority === "medium"
                      ? "bg-amber-400"
                      : "bg-muted-foreground/40"
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  )
}

function ActiveGoalsCard({ goals }: { goals: any[] }) {
  return (
    <SectionCard
      title="Metas em progresso"
      action={
        <Button asChild variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/goals">
            Ver todas <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      }
    >
      {goals.length === 0 ? (
        <EmptyState
          icon={Goal}
          title="Sem metas ativas"
          description="Crie sua primeira meta para acompanhar aqui."
          action={{ label: "Criar meta", href: "/goals" }}
          className="border-0 bg-transparent py-8"
        />
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => {
            let daysLeftText = ""
            if (goal.target_date) {
              const diffTime = Math.abs(new Date(goal.target_date).getTime() - new Date().getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              daysLeftText = ` · ${diffDays} dias restantes`
            }

            return (
              <li key={goal.id} className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {goal.category}{daysLeftText}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-primary">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-1.5" />
              </li>
            )
          })}
        </ul>
      )}
    </SectionCard>
  )
}

function NextEventCard({ event }: { event: any | null }) {
  return (
    <SectionCard title="Próximo compromisso">
      {!event ? (
        <EmptyState
          icon={CalendarDays}
          title="Agenda livre hoje"
          description="Sem compromissos agendados."
          action={{ label: "Adicionar", href: "/agenda" }}
          className="border-0 bg-transparent py-6"
        />
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{event.title}</p>
            <p className="text-xs text-muted-foreground">
              {event.start_time.slice(0, 5)} às {event.end_time.slice(0, 5)}
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="h-7 shrink-0 rounded-xl px-3 text-xs">
            <Link href="/agenda">Ver agenda</Link>
          </Button>
        </div>
      )}
    </SectionCard>
  )
}

function LastJournalCard({ journal }: { journal: any | null }) {
  return (
    <SectionCard
      title="Último registro no diário"
      action={
        <Button asChild variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/journal">
            <Plus className="h-3 w-3" /> Nova entrada
          </Link>
        </Button>
      }
    >
      {!journal ? (
        <EmptyState
          icon={BookText}
          title="Nenhuma entrada ainda"
          description="Comece a registrar seu dia no diário."
          action={{ label: "Escrever agora", href: "/journal" }}
          className="border-0 bg-transparent py-6"
        />
      ) : (
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground">{new Date(journal.entry_date).toLocaleDateString("pt-BR")}</p>
          <p className="line-clamp-3 text-sm leading-6 text-foreground/80">{journal.content}</p>
          <Button asChild variant="ghost" size="sm" className="h-6 gap-1 px-0 text-xs text-primary hover:text-primary/80">
            <Link href="/journal">
              Ler entrada completa <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      )}
    </SectionCard>
  )
}

// ─── View principal ────────────────────────────────────────────────────────

export function NexxaLifeDashboardView() {
  const [data, setData] = useState<any>({
    tasks: [],
    goals: [],
    agenda: [],
    journals: [],
    streak: { current_streak: 0 },
    loading: true
  })

  useEffect(() => {
    async function loadData() {
      const [tasks, goals, agenda, journals, streak] = await Promise.all([
        getChecklist(),
        getGoals(),
        getAgenda(),
        getJournalEntries(),
        getUserStreak()
      ])
      setData({ tasks, goals, agenda, journals, streak, loading: false })
    }
    loadData()
  }, [])

  if (data.loading) {
    return <div className="p-8 text-center text-muted-foreground text-sm flex items-center justify-center h-[50vh]">Carregando ciclo...</div>
  }

  const nextEvent = data.agenda.find((e: any) => e.start_time > new Date().toTimeString().slice(0, 8)) || data.agenda[0] || null
  const lastJournal = data.journals[0] || null
  
  const doneTasks = data.tasks.filter((t: any) => t.done).length
  const pctTasks = data.tasks.length > 0 ? Math.round((doneTasks / data.tasks.length) * 100) : 0

  const kpis = [
    { label: "Streak atual", value: `${data.streak.current_streak} dias`, icon: Flame, accent: "amber" as const, trend: { value: 20, label: "esta semana" } },
    { label: "Metas ativas", value: data.goals.length, icon: Goal, accent: "teal" as const },
    { label: "Checklist hoje", value: `${doneTasks}/${data.tasks.length}`, icon: CheckSquare, accent: "emerald" as const, trend: { value: pctTasks } },
    { label: "Entradas no diário", value: data.journals.length, icon: BookText, accent: "violet" as const, trend: { value: 12, label: "este mês" } },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Saudação */}
      <DayGreeting name="" />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiTile
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            icon={kpi.icon}
            accent={kpi.accent}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Grid principal 2 colunas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TodayChecklistCard initialTasks={data.tasks} />
        <ActiveGoalsCard goals={data.goals.slice(0, 3)} />
      </div>

      {/* Grid secundário 2 colunas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <NextEventCard event={nextEvent} />
        <LastJournalCard journal={lastJournal} />
      </div>

      {/* CTA de progresso geral */}
      <SectionCard variant="highlight" className="col-span-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Seu ciclo está evoluindo!</p>
              <p className="text-xs text-muted-foreground">{data.streak.current_streak} dias consecutivos. Continue assim — você está no ritmo certo.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              🔥 Streak ativo
            </Badge>
            <Button asChild size="sm" className="h-8 rounded-xl px-4 text-xs">
              <Link href="/reports">Ver relatório completo</Link>
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
