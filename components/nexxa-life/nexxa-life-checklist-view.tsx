"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckSquare, Plus, Flame, Filter, Target, Sparkles } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { addChecklistItem, toggleChecklistItem } from "@/lib/db/actions"

type Priority = "high" | "medium" | "low"
type ChecklistItem = {
  id: string
  label: string
  done: boolean
  priority: Priority
  category: string
  recurrent: boolean
  goalTitle?: string | null
  goalCategory?: string | null
  missionTitle?: string | null
  lifeArea?: string | null
  xpReward?: number
  impactScore?: number
}

// No more INITIAL_ITEMS — data comes from props

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; dot: string }> = {
  high: { label: "Alta", color: "text-red-500", dot: "bg-red-400" },
  medium: { label: "Média", color: "text-amber-500", dot: "bg-amber-400" },
  low: { label: "Baixa", color: "text-muted-foreground", dot: "bg-muted-foreground/40" },
}

function ChecklistItemRow({
  item,
  onToggle,
}: {
  item: ChecklistItem
  onToggle: (id: string) => void
}) {
  const priority = PRIORITY_CONFIG[item.priority]

  return (
    <li className={cn(
      "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/40",
      item.done ? "opacity-60" : ""
    )}>
      <button
        onClick={() => onToggle(item.id)}
        aria-label={item.done ? "Desmarcar tarefa" : "Marcar como concluída"}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          item.done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border hover:border-primary/60"
        )}
      >
        {item.done ? <span className="text-[10px] font-bold">✓</span> : null}
      </button>

      <div className="min-w-0 flex-1">
        <span className={cn(
          "block text-sm leading-snug",
          item.done ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {item.label}
        </span>
        {(item.goalTitle || item.lifeArea || item.xpReward) && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
            {item.goalTitle && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                <Target className="h-2.5 w-2.5" /> {item.goalTitle}
              </span>
            )}
            {item.lifeArea && (
              <span className="rounded-full bg-muted px-2 py-0.5">Área: {item.lifeArea}</span>
            )}
            {!!item.xpReward && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-orange-600">
                <Sparkles className="h-2.5 w-2.5" /> +{item.xpReward} XP
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {item.recurrent ? (
          <span className="text-[10px] text-muted-foreground/60">↻</span>
        ) : null}
        <span className={cn("h-2 w-2 rounded-full", priority.dot)} title={priority.label} />
      </div>
    </li>
  )
}

function GroupSection({
  title,
  items,
  onToggle,
}: {
  title: string
  items: ChecklistItem[]
  onToggle: (id: string) => void
}) {
  if (items.length === 0) return null
  const done = items.filter((i) => i.done).length

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3 pb-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <span className="text-[11px] text-muted-foreground tabular-nums">{done}/{items.length}</span>
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <ChecklistItemRow key={item.id} item={item} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  )
}

export function NexxaLifeChecklistView({ initialItems }: { initialItems: any[] }) {
  const router = useRouter()
  const mapped: ChecklistItem[] = initialItems.map((i: any) => ({
    id: i.id, label: i.label, done: i.done ?? false,
    priority: (i.priority || "medium") as Priority,
    category: i.category || "Geral", recurrent: i.recurrent ?? false,
    goalTitle: i.goal_title,
    goalCategory: i.goal_category,
    missionTitle: i.mission_title,
    lifeArea: i.connected_area || i.life_area,
    xpReward: i.xp_reward || 0,
    impactScore: i.impact_score || 0,
  }))
  const [items, setItems] = useState<ChecklistItem[]>(mapped)
  const [newLabel, setNewLabel] = useState("")
  const [filter, setFilter] = useState<"all" | Priority>("all")

  const toggle = async (id: string) => {
    const item = items.find((i) => i.id === id)
    if (!item) return
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)))
    await toggleChecklistItem(id, !item.done)
  }

  const addItem = async () => {
    if (!newLabel.trim()) return
    await addChecklistItem({ label: newLabel.trim(), priority: "medium", category: "Geral" })
    setNewLabel("")
    router.refresh()
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.priority === filter)

  const done = items.filter((i) => i.done).length
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const high = filtered.filter((i) => i.priority === "high")
  const medium = filtered.filter((i) => i.priority === "medium")
  const low = filtered.filter((i) => i.priority === "low")
  const connectedCount = items.filter((i) => i.goalTitle || i.missionTitle || i.lifeArea).length

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleNewTask = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Hoje"
        title="Checklist"
        description={`${today} — ${done} de ${total} tarefas concluídas · ${connectedCount} conectadas a metas/áreas`}
        badge={
          <Badge variant="secondary" className="gap-1 rounded-full px-2.5 py-0.5 text-xs">
            <Flame className="h-3 w-3 text-amber-500" />
            12 dias
          </Badge>
        }
        actions={
          <Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs" onClick={handleNewTask}>
            <Plus className="h-3.5 w-3.5" /> Nova tarefa
          </Button>
        }
      />

      {/* Progresso geral */}
      <SectionCard noPadding className="overflow-hidden">
        <div className="flex items-center gap-6 px-5 py-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Progresso do dia</span>
              <span className="text-sm font-bold tabular-nums text-primary">{pct}%</span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
        </div>
      </SectionCard>

      <SectionCard noPadding className="overflow-hidden border-primary/15 bg-primary/5">
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Checklist conectado ao Meu Ciclo</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cada tarefa deve mover uma meta, uma missão ou uma área da vida. Tarefas soltas ainda funcionam, mas o core agora prioriza execução com contexto.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
            {connectedCount}/{total} conectadas
          </Badge>
        </div>
      </SectionCard>

      {/* Filtros de prioridade */}
      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {(["all", "high", "medium", "low"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            {f === "all" ? "Todas" : PRIORITY_CONFIG[f].label}
          </button>
        ))}
      </div>

      {/* Listas agrupadas */}
      <SectionCard noPadding>
        <div className="divide-y divide-border/50">
          <div className="space-y-4 p-4">
            {filtered.length === 0 ? (
              <EmptyState
                icon={CheckSquare}
                title="Nenhuma tarefa nesta categoria"
                description="Adicione uma nova tarefa abaixo."
                className="border-0 bg-transparent py-8"
              />
            ) : (
              <>
                <GroupSection title="Alta prioridade" items={high} onToggle={toggle} />
                <GroupSection title="Média prioridade" items={medium} onToggle={toggle} />
                <GroupSection title="Baixa prioridade" items={low} onToggle={toggle} />
              </>
            )}
          </div>

          {/* Adicionar item inline */}
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-border" />
            <input
              type="text"
              ref={inputRef}
              placeholder="Adicionar tarefa..."
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            {newLabel.trim() ? (
              <Button size="sm" onClick={addItem} className="h-7 rounded-lg px-3 text-xs">
                Adicionar
              </Button>
            ) : null}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
