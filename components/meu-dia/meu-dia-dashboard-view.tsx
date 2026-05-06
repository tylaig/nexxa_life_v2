"use client"

import { useState } from "react"
import { CalendarDays, CheckSquare, Flame, Goal, BookText, TrendingUp, ArrowRight, Plus, Clock } from "lucide-react"
import Link from "next/link"

import { KpiTile } from "@/components/ui/kpi-tile"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// ─── Mock data (substituir por dados reais futuramente) ────────────────────

const mockUser = { name: "Tylaig" }

const mockKpis = [
  { label: "Streak atual", value: "12 dias", icon: Flame, accent: "amber" as const, trend: { value: 20, label: "esta semana" } },
  { label: "Metas ativas", value: 3, icon: Goal, accent: "teal" as const },
  { label: "Checklist hoje", value: "4/7", icon: CheckSquare, accent: "emerald" as const, trend: { value: 57 } },
  { label: "Entradas no diário", value: 18, icon: BookText, accent: "violet" as const, trend: { value: 12, label: "este mês" } },
]

const mockTodayTasks = [
  { id: "1", label: "Revisar metas da semana", done: true, priority: "high" },
  { id: "2", label: "Sessão de planejamento 30min", done: false, priority: "high" },
  { id: "3", label: "Leitura — 20 páginas", done: false, priority: "medium" },
  { id: "4", label: "Exercício físico", done: false, priority: "medium" },
  { id: "5", label: "Meditação noturna", done: false, priority: "low" },
]

const mockGoals = [
  { id: "1", title: "Lançar MVP do produto", progress: 68, category: "Trabalho", daysLeft: 22 },
  { id: "2", title: "Leitura de 12 livros no ano", progress: 42, category: "Crescimento", daysLeft: 180 },
  { id: "3", title: "Rotina fitness consistente", progress: 75, category: "Saúde", daysLeft: 60 },
]

const mockNextEvent = {
  title: "Planejamento semanal",
  time: "10:00",
  duration: "1h",
  type: "focus",
}

const mockLastJournal = {
  date: "Ontem, 23:14",
  preview: "Hoje foi um dia de clareza rara. Consegui finalizar o módulo de auth e ainda...",
}

// ─── Sub-componentes ────────────────────────────────────────────────────────

function DayGreeting() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted-foreground capitalize">{today}</p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {greeting}, <span className="text-primary">{mockUser.name}</span> 👋
      </h1>
      <p className="text-sm text-muted-foreground">Veja o que está esperando por você hoje.</p>
    </div>
  )
}

function TodayChecklistCard() {
  const [tasks, setTasks] = useState(mockTodayTasks)
  const done = tasks.filter((t) => t.done).length
  const pct = Math.round((done / tasks.length) * 100)

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

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
                onClick={() => toggle(task.id)}
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
    </SectionCard>
  )
}

function ActiveGoalsCard() {
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
      {mockGoals.length === 0 ? (
        <EmptyState
          icon={Goal}
          title="Sem metas ativas"
          description="Crie sua primeira meta para acompanhar aqui."
          action={{ label: "Criar meta", href: "/goals" }}
          className="border-0 bg-transparent py-8"
        />
      ) : (
        <ul className="space-y-4">
          {mockGoals.map((goal) => (
            <li key={goal.id} className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{goal.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {goal.category} · {goal.daysLeft} dias restantes
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-primary">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1.5" />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

function NextEventCard() {
  return (
    <SectionCard title="Próximo compromisso">
      {!mockNextEvent ? (
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
            <p className="truncate text-sm font-semibold text-foreground">{mockNextEvent.title}</p>
            <p className="text-xs text-muted-foreground">
              {mockNextEvent.time} · {mockNextEvent.duration}
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

function LastJournalCard() {
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
      {!mockLastJournal ? (
        <EmptyState
          icon={BookText}
          title="Nenhuma entrada ainda"
          description="Comece a registrar seu dia no diário."
          action={{ label: "Escrever agora", href: "/journal" }}
          className="border-0 bg-transparent py-6"
        />
      ) : (
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground">{mockLastJournal.date}</p>
          <p className="line-clamp-3 text-sm leading-6 text-foreground/80">{mockLastJournal.preview}</p>
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
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Saudação */}
      <DayGreeting />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {mockKpis.map((kpi) => (
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
        <TodayChecklistCard />
        <ActiveGoalsCard />
      </div>

      {/* Grid secundário 2 colunas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <NextEventCard />
        <LastJournalCard />
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
              <p className="text-xs text-muted-foreground">12 dias consecutivos. Continue assim — você está no ritmo certo.</p>
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
