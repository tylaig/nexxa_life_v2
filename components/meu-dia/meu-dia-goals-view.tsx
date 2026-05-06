"use client"

import { useState } from "react"
import { Goal, Plus, Filter, ArrowRight, CheckCircle2, Clock } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type GoalStatus = "active" | "completed" | "paused"
type GoalCategory = "Trabalho" | "Saúde" | "Crescimento" | "Finanças" | "Pessoal"

type GoalItem = {
  id: string
  title: string
  description?: string
  progress: number
  category: GoalCategory
  status: GoalStatus
  daysLeft: number
  milestones: { label: string; done: boolean }[]
}

const MOCK_GOALS: GoalItem[] = [
  {
    id: "1", title: "Lançar MVP do produto", description: "Entregar versão funcional com auth e ciclo principal.",
    progress: 68, category: "Trabalho", status: "active", daysLeft: 22,
    milestones: [{ label: "Auth funcionando", done: true }, { label: "Dashboard redesenhado", done: true }, { label: "Deploy em produção", done: false }],
  },
  {
    id: "2", title: "Leitura de 12 livros no ano", description: "Um livro por mês — produto, tecnologia e filosofia.",
    progress: 42, category: "Crescimento", status: "active", daysLeft: 180,
    milestones: [{ label: "5 livros concluídos", done: true }, { label: "Notas organizadas", done: false }],
  },
  {
    id: "3", title: "Rotina fitness 4x/semana", description: "Consistência por 90 dias consecutivos.",
    progress: 75, category: "Saúde", status: "active", daysLeft: 60,
    milestones: [{ label: "30 dias", done: true }, { label: "60 dias", done: true }, { label: "90 dias", done: false }],
  },
  {
    id: "4", title: "Reserva de emergência — 6 meses", description: "Atingir R$ 50k guardados.",
    progress: 100, category: "Finanças", status: "completed", daysLeft: 0,
    milestones: [{ label: "R$ 25k", done: true }, { label: "R$ 50k", done: true }],
  },
]

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  Trabalho: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Saúde: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Crescimento: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Finanças: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Pessoal: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
}

function GoalCard({ goal }: { goal: GoalItem }) {
  const [expanded, setExpanded] = useState(false)
  const isComplete = goal.status === "completed"

  return (
    <div className={cn(
      "rounded-2xl border p-5 transition-all",
      isComplete ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/70 bg-card hover:border-primary/20"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
            {isComplete ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> : null}
          </div>
          {goal.description ? <p className="text-xs leading-5 text-muted-foreground">{goal.description}</p> : null}
        </div>
        <Badge className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px]", CATEGORY_COLORS[goal.category])} variant="secondary">
          {goal.category}
        </Badge>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {isComplete ? "Concluída ✓" : <><Clock className="h-3 w-3" /> {goal.daysLeft} dias restantes</>}
          </span>
          <span className="text-sm font-bold tabular-nums text-primary">{goal.progress}%</span>
        </div>
        <Progress value={goal.progress} className={cn("h-1.5", isComplete ? "[&>div]:bg-emerald-500" : "")} />
      </div>

      {goal.milestones.length > 0 ? (
        <div className="mt-3">
          <button onClick={() => setExpanded((e) => !e)} className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
            <ArrowRight className={cn("h-3 w-3 transition-transform", expanded ? "rotate-90" : "")} />
            {goal.milestones.filter((m) => m.done).length}/{goal.milestones.length} marcos
          </button>
          {expanded ? (
            <ul className="mt-2 space-y-1.5 pl-4">
              {goal.milestones.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px]",
                    m.done ? "border-emerald-500 bg-emerald-500/20 text-emerald-600" : "border-border")}>
                    {m.done ? "✓" : ""}
                  </span>
                  <span className={cn(m.done ? "text-muted-foreground line-through" : "text-foreground")}>{m.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function NexxaLifeGoalsView() {
  const [filter, setFilter] = useState<"all" | GoalStatus>("all")
  const FILTERS = [
    { value: "all" as const, label: "Todas" },
    { value: "active" as const, label: "Ativas" },
    { value: "completed" as const, label: "Concluídas" },
    { value: "paused" as const, label: "Pausadas" },
  ]
  const filtered = filter === "all" ? MOCK_GOALS : MOCK_GOALS.filter((g) => g.status === filter)
  const activeCount = MOCK_GOALS.filter((g) => g.status === "active").length
  const completedCount = MOCK_GOALS.filter((g) => g.status === "completed").length
  const avgProgress = Math.round(MOCK_GOALS.filter((g) => g.status === "active").reduce((a, g) => a + g.progress, 0) / Math.max(activeCount, 1))

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Progresso"
        title="Metas"
        description={`${activeCount} metas ativas · ${completedCount} concluídas`}
        actions={<Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs"><Plus className="h-3.5 w-3.5" /> Nova meta</Button>}
      />

      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Ativas", value: activeCount, color: "text-primary" },
          { label: "Concluídas", value: completedCount, color: "text-emerald-500" },
          { label: "Progresso médio", value: `${avgProgress}%`, color: "text-foreground" }].map((stat) => (
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
        {FILTERS.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === f.value ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Goal} title="Nenhuma meta aqui" description="Crie sua primeira meta e comece a acompanhar o progresso." action={{ label: "Criar meta", href: "/goals" }} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
        </div>
      )}
    </div>
  )
}
