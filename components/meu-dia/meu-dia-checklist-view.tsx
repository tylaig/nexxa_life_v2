"use client"

import { useState } from "react"
import { CheckSquare, Plus, Flame, Filter } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type Priority = "high" | "medium" | "low"
type ChecklistItem = { id: string; label: string; done: boolean; priority: Priority; category: string; recurrent: boolean }

const INITIAL_ITEMS: ChecklistItem[] = [
  { id: "1", label: "Revisão das metas semanais", done: true, priority: "high", category: "Planejamento", recurrent: false },
  { id: "2", label: "Sessão de planejamento profundo 30min", done: false, priority: "high", category: "Planejamento", recurrent: true },
  { id: "3", label: "Leitura — 20 páginas do livro atual", done: false, priority: "medium", category: "Crescimento", recurrent: true },
  { id: "4", label: "Exercício físico", done: false, priority: "medium", category: "Saúde", recurrent: true },
  { id: "5", label: "Meditação noturna", done: false, priority: "low", category: "Saúde", recurrent: true },
  { id: "6", label: "Responder e-mails prioritários", done: true, priority: "medium", category: "Trabalho", recurrent: false },
  { id: "7", label: "Revisar código do módulo de auth", done: false, priority: "high", category: "Trabalho", recurrent: false },
]

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

      <span className={cn(
        "flex-1 text-sm leading-snug",
        item.done ? "text-muted-foreground line-through" : "text-foreground"
      )}>
        {item.label}
      </span>

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

export function NexxaLifeChecklistView() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS)
  const [newLabel, setNewLabel] = useState("")
  const [filter, setFilter] = useState<"all" | Priority>("all")

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)))

  const addItem = () => {
    if (!newLabel.trim()) return
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), label: newLabel.trim(), done: false, priority: "medium", category: "Geral", recurrent: false },
    ])
    setNewLabel("")
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.priority === filter)

  const done = items.filter((i) => i.done).length
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const high = filtered.filter((i) => i.priority === "high")
  const medium = filtered.filter((i) => i.priority === "medium")
  const low = filtered.filter((i) => i.priority === "low")

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Hoje"
        title="Checklist"
        description={`${today} — ${done} de ${total} tarefas concluídas`}
        badge={
          <Badge variant="secondary" className="gap-1 rounded-full px-2.5 py-0.5 text-xs">
            <Flame className="h-3 w-3 text-amber-500" />
            12 dias
          </Badge>
        }
        actions={
          <Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs">
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
