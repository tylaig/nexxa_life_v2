"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  Clock,
  Filter,
  Goal,
  Link2,
  Plus,
  Repeat,
  Sparkles,
  X,
} from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { addGoal } from "@/lib/db/actions"

type GoalStatus = "active" | "completed" | "paused"
type GoalCategory = "Trabalho" | "Saúde" | "Crescimento" | "Finanças" | "Pessoal" | string

type LinkedTask = {
  id: string
  label: string
  done: boolean
  priority?: "high" | "medium" | "low"
  itemDate?: string
  lifeArea?: string | null
  xpReward?: number
  impactScore?: number
}

type LinkedEvent = {
  id: string
  title: string
  eventDate: string
  startTime: string
  endTime: string
  type?: string
  recurrence?: "none" | "daily" | "weekly" | "monthly"
  recurrenceRule?: string | null
  recurrenceUntil?: string | null
  timezone?: string | null
  lifeArea?: string | null
  syncStatus?: string | null
  externalProvider?: string | null
  externalEventId?: string | null
}

type GoalItem = {
  id: string
  title: string
  description?: string
  progress: number
  category: GoalCategory
  status: GoalStatus
  daysLeft: number
  milestones: { label: string; done: boolean; lifeArea?: string | null; xpReward?: number; impactScore?: number }[]
  tasks: LinkedTask[]
  events: LinkedEvent[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Trabalho: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Saúde: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Crescimento: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Finanças: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Pessoal: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
}

const CATEGORY_OPTIONS = ["Trabalho", "Saúde", "Crescimento", "Finanças", "Pessoal"]

const RECURRENCE_LABEL: Record<string, string> = {
  none: "único",
  daily: "diário",
  weekly: "semanal",
  monthly: "mensal",
}

function normalizeTime(value?: string) {
  if (!value) return "--:--"
  return String(value).slice(0, 5)
}

function GoalTaskList({ tasks }: { tasks: LinkedTask[] }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-3 text-xs text-muted-foreground">
        Nenhuma tarefa conectada ainda. A próxima etapa é gerar ações diárias a partir desta meta.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.slice(0, 5).map((task) => (
        <div key={task.id} className="flex items-start gap-2 rounded-2xl border border-border/50 bg-background/70 p-3">
          <div className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
            task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-border"
          )}>
            {task.done ? "✓" : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn("text-xs font-medium", task.done ? "text-muted-foreground line-through" : "text-foreground")}>{task.label}</p>
            <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
              {task.itemDate && <span>{new Date(task.itemDate).toLocaleDateString("pt-BR")}</span>}
              {task.lifeArea && <span className="rounded-full bg-muted px-2 py-0.5">{task.lifeArea}</span>}
              {!!task.xpReward && <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-orange-600">+{task.xpReward} XP</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function GoalEventList({ events }: { events: LinkedEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-3 text-xs text-muted-foreground">
        Nenhum evento ou bloco recorrente ligado a esta meta.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {events.slice(0, 4).map((event) => {
        const isRecurring = event.recurrence && event.recurrence !== "none"
        const isGoogleReady = event.syncStatus && event.syncStatus !== "local_only"
        return (
          <div key={event.id} className="rounded-2xl border border-border/50 bg-background/70 p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                {isRecurring ? <Repeat className="h-4 w-4" /> : <CalendarClock className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{event.title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {event.eventDate ? new Date(event.eventDate).toLocaleDateString("pt-BR") : "Sem data"} · {normalizeTime(event.startTime)}–{normalizeTime(event.endTime)}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                    {RECURRENCE_LABEL[event.recurrence || "none"] || event.recurrence}
                  </span>
                  {event.timezone && <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{event.timezone}</span>}
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                    isGoogleReady ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"
                  )}>
                    <Link2 className="h-2.5 w-2.5" />
                    {isGoogleReady ? "calendar sync" : "pronto p/ Google Calendar"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GoalCard({ goal }: { goal: GoalItem }) {
  const [expanded, setExpanded] = useState(false)
  const isComplete = goal.status === "completed"
  const doneTasks = goal.tasks.filter((task) => task.done).length
  const taskProgress = goal.tasks.length ? Math.round((doneTasks / goal.tasks.length) * 100) : 0
  const recurringEvents = goal.events.filter((event) => event.recurrence && event.recurrence !== "none").length
  const earnedXp = goal.tasks.filter((task) => task.done).reduce((sum, task) => sum + Number(task.xpReward || 0), 0)
  const realProgress = goal.tasks.length ? Math.max(goal.progress, taskProgress) : goal.progress

  return (
    <div className={cn(
      "relative overflow-hidden rounded-[28px] border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md",
      isComplete ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/70 bg-gradient-to-br from-card via-card to-muted/25 hover:border-primary/20"
    )}>
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/[0.04] blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
            {isComplete ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> : null}
          </div>
          {goal.description ? <p className="text-xs leading-5 text-muted-foreground">{goal.description}</p> : null}
        </div>
        <Badge className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px]", CATEGORY_COLORS[goal.category] || CATEGORY_COLORS.Pessoal)} variant="secondary">
          {goal.category}
        </Badge>
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-2xl border border-border/50 bg-background/65 px-2 py-2">
          <p className="font-bold text-foreground">{doneTasks}/{goal.tasks.length}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">tarefas</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-background/65 px-2 py-2">
          <p className="font-bold text-foreground">{goal.events.length}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">eventos</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-background/65 px-2 py-2">
          <p className="font-bold text-foreground">{earnedXp}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">XP</p>
        </div>
      </div>

      <div className="relative mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {isComplete ? "Concluída ✓" : <><Clock className="h-3 w-3" /> {goal.daysLeft} dias restantes</>}
          </span>
          <span className="text-sm font-bold tabular-nums text-primary">{realProgress}%</span>
        </div>
        <Progress value={realProgress} className={cn("h-1.5", isComplete ? "[&>div]:bg-emerald-500" : "")} />
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="gap-1 rounded-full px-2.5 py-0.5 text-[11px]">
          <CheckSquare className="h-3 w-3" /> execução conectada
        </Badge>
        {recurringEvents > 0 && (
          <Badge variant="secondary" className="gap-1 rounded-full px-2.5 py-0.5 text-[11px]">
            <Repeat className="h-3 w-3" /> {recurringEvents} recorrente(s)
          </Badge>
        )}
        {goal.events.length > 0 && (
          <Badge variant="secondary" className="gap-1 rounded-full px-2.5 py-0.5 text-[11px]">
            <CalendarClock className="h-3 w-3" /> calendar-ready
          </Badge>
        )}
      </div>

      <div className="relative mt-4">
        <button onClick={() => setExpanded((value) => !value)} className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
          <ArrowRight className={cn("h-3 w-3 transition-transform", expanded ? "rotate-90" : "")} />
          {expanded ? "Ocultar operação da meta" : "Ver tarefas, eventos e recorrências"}
        </button>

        {expanded && (
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <CheckSquare className="h-3.5 w-3.5" /> Tarefas da meta
              </div>
              <GoalTaskList tasks={goal.tasks} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <CalendarClock className="h-3.5 w-3.5" /> Eventos e blocos
              </div>
              <GoalEventList events={goal.events} />
            </div>

            {goal.milestones.length > 0 && (
              <div className="space-y-2 xl:col-span-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" /> Marcos
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {goal.milestones.map((milestone, index) => (
                    <li key={index} className="flex items-center gap-2 rounded-2xl border border-border/50 bg-background/70 p-3 text-xs">
                      <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px]",
                        milestone.done ? "border-emerald-500 bg-emerald-500/20 text-emerald-600" : "border-border")}>
                        {milestone.done ? "✓" : ""}
                      </span>
                      <span className={cn("min-w-0 flex-1", milestone.done ? "text-muted-foreground line-through" : "text-foreground")}>{milestone.label}</span>
                      {!!milestone.xpReward && <span className="text-[10px] text-orange-600">+{milestone.xpReward} XP</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Modal de criação de meta ─────────────────────────────────────
function CreateGoalModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Pessoal")
  const [saving, setSaving] = useState(false)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    try {
      await addGoal({ title: title.trim(), description: description.trim() || undefined, category })
      setTitle("")
      setDescription("")
      setCategory("Pessoal")
      onCreated()
      onClose()
    } catch (err) {
      console.error("Error creating goal:", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="w-full max-w-lg mx-4 rounded-3xl border border-border bg-background p-6 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Nova Meta</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Ler 12 livros este ano"
              className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua meta em mais detalhes..."
              rows={3}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl">
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim() || saving} className="flex-1 h-11 rounded-xl shadow-md">
              {saving ? "Salvando..." : "Criar meta"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function NexxaLifeGoalsView({ goals: rawGoals }: { goals: any[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | GoalStatus>("all")
  const [showCreate, setShowCreate] = useState(false)

  const allGoals: GoalItem[] = rawGoals.map((goal: any) => {
    const tasks = (goal.checklist_items || []).map((task: any) => ({
      id: task.id,
      label: task.label,
      done: task.done ?? false,
      priority: task.priority,
      itemDate: task.item_date,
      lifeArea: task.life_area,
      xpReward: task.xp_reward || 0,
      impactScore: task.impact_score || 0,
    }))

    const events = (goal.agenda_events || []).map((event: any) => ({
      id: event.id,
      title: event.title,
      eventDate: event.event_date,
      startTime: event.start_time,
      endTime: event.end_time,
      type: event.type,
      recurrence: event.recurrence || "none",
      recurrenceRule: event.recurrence_rule,
      recurrenceUntil: event.recurrence_until,
      timezone: event.timezone,
      lifeArea: event.life_area,
      syncStatus: event.sync_status,
      externalProvider: event.external_calendar_provider,
      externalEventId: event.external_event_id,
    }))

    const taskProgress = tasks.length ? Math.round((tasks.filter((task: LinkedTask) => task.done).length / tasks.length) * 100) : 0

    return {
      id: goal.id,
      title: goal.title,
      description: goal.description || undefined,
      progress: Math.max(goal.progress ?? 0, taskProgress),
      category: (goal.category || "Pessoal") as GoalCategory,
      status: (goal.status || "active") as GoalStatus,
      daysLeft: goal.target_date ? Math.max(0, Math.ceil((new Date(goal.target_date).getTime() - Date.now()) / 86400000)) : 0,
      milestones: (goal.goal_milestones || []).map((milestone: any) => ({
        label: milestone.label,
        done: milestone.done,
        lifeArea: milestone.life_area,
        xpReward: milestone.xp_reward || 0,
        impactScore: milestone.impact_score || 0,
      })),
      tasks,
      events,
    }
  })

  const FILTERS = [
    { value: "all" as const, label: "Todas" },
    { value: "active" as const, label: "Ativas" },
    { value: "completed" as const, label: "Concluídas" },
    { value: "paused" as const, label: "Pausadas" },
  ]
  const filtered = filter === "all" ? allGoals : allGoals.filter((goal) => goal.status === filter)
  const activeCount = allGoals.filter((goal) => goal.status === "active").length
  const completedCount = allGoals.filter((goal) => goal.status === "completed").length
  const avgProgress = Math.round(allGoals.filter((goal) => goal.status === "active").reduce((sum, goal) => sum + goal.progress, 0) / Math.max(activeCount, 1))
  const connectedTasks = allGoals.reduce((sum, goal) => sum + goal.tasks.length, 0)
  const connectedEvents = allGoals.reduce((sum, goal) => sum + goal.events.length, 0)
  const recurringEvents = allGoals.reduce((sum, goal) => sum + goal.events.filter((event) => event.recurrence && event.recurrence !== "none").length, 0)

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Meu Ciclo"
        title="Metas operacionais"
        description={`${activeCount} metas ativas · ${connectedTasks} tarefas · ${connectedEvents} eventos ligados`}
        actions={<Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs" onClick={() => setShowCreate(true)}><Plus className="h-3.5 w-3.5" /> Nova meta</Button>}
      />

      <SectionCard noPadding className="overflow-hidden border-primary/15 bg-primary/5">
        <div className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Goals agora são centros de execução</p>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">
              Cada meta pode concentrar tarefas, blocos de agenda, recorrências e preparação para sincronização futura com Google Calendar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 text-xs"><CheckSquare className="h-3 w-3" /> {connectedTasks} tarefas</Badge>
            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 text-xs"><CalendarClock className="h-3 w-3" /> {connectedEvents} eventos</Badge>
            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 text-xs"><Repeat className="h-3 w-3" /> {recurringEvents} recorrentes</Badge>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Ativas", value: activeCount, color: "text-primary" },
          { label: "Concluídas", value: completedCount, color: "text-emerald-500" },
          { label: "Progresso médio", value: `${avgProgress}%`, color: "text-foreground" },
          { label: "Eventos recorrentes", value: recurringEvents, color: "text-violet-500" },
        ].map((stat) => (
          <SectionCard key={stat.label} noPadding>
            <div className="py-4 text-center">
              <p className={cn("text-2xl font-bold tabular-nums", stat.color)}>{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {FILTERS.map((item) => (
          <button key={item.value} onClick={() => setFilter(item.value)}
            className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === item.value ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Goal} title="Nenhuma meta aqui" description="Crie sua primeira meta e conecte tarefas, agenda e recorrências." action={{ label: "Criar meta", onClick: () => setShowCreate(true) }} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
        </div>
      )}

      <CreateGoalModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => router.refresh()} />
    </div>
  )
}
