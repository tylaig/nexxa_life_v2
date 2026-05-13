// @ts-nocheck
"use client"

import * as React from "react"
import {
  Target, CheckCircle2, Calendar, BookText,
  Clock, Tag, Check, X, Loader2, AlertCircle,
  MessageSquareText, Trash2, Pencil, RotateCcw, Plus, Flame, TrendingUp, Gauge
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const MOOD_LABELS: Record<string, { emoji: string; label: string }> = {
  great:   { emoji: "🤩", label: "Ótimo" },
  good:    { emoji: "😊", label: "Bom" },
  neutral: { emoji: "😐", label: "Neutro" },
  bad:     { emoji: "😔", label: "Ruim" },
  awful:   { emoji: "😢", label: "Péssimo" },
}

const PRIORITY_META: Record<string, { label: string; color: string; dot: string }> = {
  high:   { label: "Alta", color: "text-red-500", dot: "bg-red-500" },
  medium: { label: "Média", color: "text-amber-500", dot: "bg-amber-500" },
  low:    { label: "Baixa", color: "text-emerald-500", dot: "bg-emerald-500" },
}

const EVENT_TYPE_META: Record<string, { emoji: string; label: string }> = {
  focus:    { emoji: "🧠", label: "Foco" },
  meeting:  { emoji: "👥", label: "Reunião" },
  personal: { emoji: "🏠", label: "Pessoal" },
  health:   { emoji: "💪", label: "Saúde" },
}

const TOOL_CARD_META: Record<string, { icon: any; title: string; gradient: string; border: string; iconBg: string }> = {
  addGoal: {
    icon: Target,
    title: "Nova Meta Estratégica",
    gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  addChecklistItem: {
    icon: CheckCircle2,
    title: "Nova Tarefa",
    gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    border: "border-blue-200/60 dark:border-blue-800/40",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  addAgendaEvent: {
    icon: Calendar,
    title: "Novo Evento",
    gradient: "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
    border: "border-violet-200/60 dark:border-violet-800/40",
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
  },
  addJournalEntry: {
    icon: BookText,
    title: "Nova Reflexão",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    border: "border-amber-200/60 dark:border-amber-800/40",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  },
  createMission: {
    icon: Flame,
    title: "Nova Missão Gamificada",
    gradient: "from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20",
    border: "border-orange-200/60 dark:border-orange-800/40",
    iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
  },
  recordScoreEvent: {
    icon: TrendingUp,
    title: "Atualização de Score",
    gradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20",
    border: "border-cyan-200/60 dark:border-cyan-800/40",
    iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400",
  },
  answerAdaptiveQuestion: {
    icon: Gauge,
    title: "Avaliação Adaptativa",
    gradient: "from-fuchsia-50 to-violet-50 dark:from-fuchsia-950/20 dark:to-violet-950/20",
    border: "border-fuchsia-200/60 dark:border-fuchsia-800/40",
    iconBg: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/40 dark:text-fuchsia-400",
  },
}

interface ToolApprovalCardProps {
  toolName: string
  toolCallId: string
  state: string
  input: any
  output?: any
  approvalId?: string
  onApprove?: (id: string, input?: any, note?: string) => void
  onReject?: (id: string, note?: string) => void
  onDraftChange?: (id: string, input: any, note?: string) => void
  isSelected?: boolean
  selectionDisabled?: boolean
  onSelectionChange?: (id: string, selected: boolean) => void
  compact?: boolean
}

export function ToolApprovalCard({
  toolName,
  toolCallId,
  state,
  input,
  output,
  approvalId,
  onApprove,
  onReject,
  onDraftChange,
  isSelected = true,
  selectionDisabled = false,
  onSelectionChange,
  compact = false,
}: ToolApprovalCardProps) {
  const meta = TOOL_CARD_META[toolName]
  if (!meta) return null

  const Icon = meta.icon
  const isApprovalPending = state === "input-available" || state === "approval-requested"
  const isApproved = state === "output-available" && output && !output?.rejected
  const isRejected = (state === "output-available" && output?.rejected) || state === "approval-denied"
  const isLoading = state === "input-streaming"
  const isError = state === "output-error"
  const [isEditing, setIsEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(input || {})
  const [note, setNote] = React.useState("")

  React.useEffect(() => {
    setDraft(input || {})
  }, [input])

  const canReview = isApprovalPending && approvalId
  const effectiveInput = draft || input || {}

  function updateDraft(patch: any) {
    const next = { ...effectiveInput, ...patch }
    setDraft(next)
    onDraftChange?.(approvalId || toolCallId, next, note)
  }

  function updateNote(value: string) {
    setNote(value)
    onDraftChange?.(approvalId || toolCallId, effectiveInput, value)
  }

  function resetDraft() {
    setDraft(input || {})
    setNote("")
    onDraftChange?.(approvalId || toolCallId, input || {}, "")
  }

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-300 w-full",
        compact ? "max-w-none" : "max-w-[460px]",
        canReview && isSelected && "shadow-sm ring-1 ring-primary/10",
        canReview && !isSelected && "opacity-55 grayscale-[.35]",
        isApproved && "border-emerald-300/60 dark:border-emerald-700/40",
        isRejected && "border-muted/60 opacity-60",
        isError && "border-red-300/60",
        !isApproved && !isRejected && !isError && meta.border
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 bg-gradient-to-r",
          isApproved ? "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20" :
          isRejected ? "from-muted/30 to-muted/20" :
          isError ? "from-red-50 to-orange-50 dark:from-red-950/20" :
          meta.gradient
        )}
      >
        {canReview && onSelectionChange && (
          <button
            type="button"
            disabled={selectionDisabled}
            onClick={() => onSelectionChange(approvalId || toolCallId, !isSelected)}
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all",
              isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40",
              selectionDisabled && "cursor-not-allowed opacity-50"
            )}
            title={isSelected ? "Remover deste pacote" : "Adicionar neste pacote"}
          >
            {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </button>
        )}

        <div className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl shrink-0",
          isApproved ? "bg-emerald-100 text-emerald-600" :
          isRejected ? "bg-muted text-muted-foreground" :
          meta.iconBg
        )}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> :
           isApproved ? <Check className="h-4 w-4" /> :
           isRejected ? <X className="h-4 w-4" /> :
           isError ? <AlertCircle className="h-4 w-4 text-red-500" /> :
           <Icon className="h-4 w-4" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">{meta.title}</p>
          {canReview && <p className="text-[11px] text-muted-foreground font-medium">Revise, edite, remova ou aprove</p>}
          {isApproved && <p className="text-[11px] text-emerald-600 font-medium">✅ Aprovado e salvo</p>}
          {isRejected && <p className="text-[11px] text-muted-foreground font-medium">❌ Removido/rejeitado</p>}
          {isError && <p className="text-[11px] text-red-500 font-medium">Erro ao executar</p>}
        </div>

        {canReview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 rounded-xl px-2 text-muted-foreground"
            onClick={() => setIsEditing((value) => !value)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div className="px-4 py-3 bg-background/80 space-y-3">
        {isEditing ? (
          <EditableToolFields toolName={toolName} input={effectiveInput} onChange={updateDraft} />
        ) : (
          <>
            {toolName === "addGoal" && <GoalCardContent input={effectiveInput} />}
            {toolName === "addChecklistItem" && <ChecklistCardContent input={effectiveInput} />}
            {toolName === "addAgendaEvent" && <AgendaCardContent input={effectiveInput} />}
            {toolName === "addJournalEntry" && <JournalCardContent input={effectiveInput} />}
            {toolName === "createMission" && <MissionCardContent input={effectiveInput} />}
            {toolName === "recordScoreEvent" && <ScoreEventCardContent input={effectiveInput} />}
            {toolName === "answerAdaptiveQuestion" && <QuestionAnswerCardContent input={effectiveInput} />}
          </>
        )}

        {canReview && (
          <div className="rounded-xl border border-border/50 bg-muted/20 p-3">
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <MessageSquareText className="h-3.5 w-3.5" />
              Observação opcional para esta ação
            </label>
            <textarea
              value={note}
              onChange={(event) => updateNote(event.target.value)}
              placeholder="Ex: mudar para amanhã, deixar prioridade média, remover esta ação..."
              className="min-h-16 w-full resize-none rounded-lg border border-border/50 bg-background px-3 py-2 text-xs outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>
        )}
      </div>

      {canReview && approvalId && !onSelectionChange && (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border/30 bg-muted/10">
          <Button
            size="sm"
            className="flex-1 rounded-xl h-9 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            onClick={() => onApprove?.(approvalId, effectiveInput, note)}
          >
            <Check className="h-3.5 w-3.5 mr-1.5" /> Aprovar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 rounded-xl h-9 text-muted-foreground hover:text-destructive hover:border-destructive/40"
            onClick={() => onReject?.(approvalId, note)}
          >
            <X className="h-3.5 w-3.5 mr-1.5" /> Rejeitar
          </Button>
          {(isEditing || note || JSON.stringify(draft) !== JSON.stringify(input || {})) && (
            <Button size="sm" variant="ghost" className="rounded-xl h-9" onClick={resetDraft}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Resetar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export function ToolApprovalBatch({
  tools,
  onApproveMany,
  onRejectMany,
}: {
  tools: Array<any>
  onApproveMany?: (items: Array<{ toolCallId: string; toolName: string; input: any; note?: string }>) => void | Promise<void>
  onRejectMany?: (items: Array<{ toolCallId: string; toolName: string; input: any; note?: string }>) => void | Promise<void>
}) {
  const pendingTools = tools.filter((tool) => tool?.toolCallId)
  const initialReview = React.useMemo(() => {
    const next: Record<string, { selected: boolean; input: any; note: string }> = {}
    pendingTools.forEach((tool) => {
      next[tool.toolCallId] = { selected: true, input: tool.input || {}, note: "" }
    })
    return next
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTools.map((tool) => tool.toolCallId).join("|")])

  const [review, setReview] = React.useState(initialReview)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isResolved, setIsResolved] = React.useState(false)

  React.useEffect(() => {
    setReview(initialReview)
    setIsSubmitting(false)
    setIsResolved(false)
  }, [initialReview])

  const selectedCount = Object.values(review).filter((item: any) => item.selected).length
  const removedCount = Math.max(pendingTools.length - selectedCount, 0)
  const isLocked = isSubmitting || isResolved

  function setSelected(id: string, selected: boolean) {
    if (isLocked) return
    setReview((current) => ({
      ...current,
      [id]: { ...(current[id] || {}), selected },
    }))
  }

  function setDraft(id: string, input: any, note = review[id]?.note || "") {
    if (isLocked) return
    setReview((current) => ({
      ...current,
      [id]: { selected: current[id]?.selected ?? true, input, note },
    }))
  }

  function getSelectedItems() {
    return pendingTools
      .filter((tool) => review[tool.toolCallId]?.selected)
      .map((tool) => ({
        toolCallId: tool.toolCallId,
        toolName: tool.toolName,
        input: review[tool.toolCallId]?.input || tool.input || {},
        note: review[tool.toolCallId]?.note || "",
      }))
  }

  function getRemovedItems() {
    return pendingTools
      .filter((tool) => !review[tool.toolCallId]?.selected)
      .map((tool) => ({
        toolCallId: tool.toolCallId,
        toolName: tool.toolName,
        input: review[tool.toolCallId]?.input || tool.input || {},
        note: review[tool.toolCallId]?.note || "Removido pelo usuário no pacote de aprovação.",
      }))
  }

  async function handleApprovePackage() {
    if (isLocked || selectedCount === 0) return

    const selectedItems = getSelectedItems()
    const removedItems = getRemovedItems()

    setIsSubmitting(true)
    setIsResolved(true)

    try {
      if (removedItems.length > 0) {
        await onRejectMany?.(removedItems)
      }
      await onApproveMany?.(selectedItems)
    } catch (error) {
      console.error("[ToolApprovalBatch] Failed to resolve approval package:", error)
      setIsResolved(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRejectRemovedOnly() {
    if (isLocked || removedCount === 0) return

    const removedItems = getRemovedItems()
    setIsSubmitting(true)

    try {
      await onRejectMany?.(removedItems)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pendingTools.length === 0) return null

  return (
    <div className="flex w-full justify-start pl-11">
      <div className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
        <div className="border-b border-border/50 p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Pacote de aprovação
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">Revise as ações antes da Nexxa executar</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Você pode aprovar várias ações de uma vez, remover itens do pacote e adicionar observações por item.
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <div className="rounded-2xl border bg-background/70 px-3 py-2 text-foreground">
                <strong>{selectedCount}</strong> selecionadas
              </div>
              <div className="rounded-2xl border bg-background/70 px-3 py-2 text-muted-foreground">
                <strong>{removedCount}</strong> removidas
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 md:p-5">
          {pendingTools.map((tool) => (
            <ToolApprovalCard
              key={tool.toolCallId}
              compact
              toolName={tool.toolName}
              toolCallId={tool.toolCallId}
              approvalId={tool.toolCallId}
              state={tool.state}
              input={review[tool.toolCallId]?.input || tool.input}
              output={tool.output}
              isSelected={review[tool.toolCallId]?.selected ?? true}
              selectionDisabled={isLocked}
              onSelectionChange={setSelected}
              onDraftChange={setDraft}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-border/50 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            {isResolved
              ? "Pacote enviado. Aguarde a Nexxa registrar o resultado."
              : selectedCount > 0
                ? "As ações selecionadas serão executadas no sistema."
                : "Nenhuma ação selecionada para execução."}
          </div>
          <div className="flex flex-wrap gap-2">
            {removedCount > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLocked}
                className="rounded-xl text-muted-foreground"
                onClick={handleRejectRemovedOnly}
              >
                {isSubmitting ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Trash2 className="mr-1.5 h-3.5 w-3.5" />}
                Confirmar remoções
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              disabled={selectedCount === 0 || isLocked}
              className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
              onClick={handleApprovePackage}
            >
              {isSubmitting ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Check className="mr-1.5 h-3.5 w-3.5" />}
              {isSubmitting ? "Executando..." : `Aprovar ${selectedCount || ""} ações`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, multiline = false, placeholder = "" }: any) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-20 w-full resize-none rounded-lg border border-border/50 bg-background px-3 py-2 text-xs outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
        />
      ) : (
        <input
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-lg border border-border/50 bg-background px-3 text-xs outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
        />
      )}
    </label>
  )
}

function EditableToolFields({ toolName, input, onChange }: any) {
  if (toolName === "addGoal") {
    return (
      <div className="grid gap-3">
        <Field label="Título da meta" value={input.title} onChange={(title: string) => onChange({ title })} />
        <Field label="Descrição" value={input.description} multiline onChange={(description: string) => onChange({ description })} />
        <Field label="Categoria" value={input.category} onChange={(category: string) => onChange({ category })} />
      </div>
    )
  }

  if (toolName === "addChecklistItem") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field label="Tarefa" value={input.label} onChange={(label: string) => onChange({ label })} />
        </div>
        <Field label="Prioridade" value={input.priority} onChange={(priority: string) => onChange({ priority })} />
        <Field label="Categoria" value={input.category} onChange={(category: string) => onChange({ category })} />
        <Field label="Data" value={input.date} onChange={(date: string) => onChange({ date })} />
      </div>
    )
  }

  if (toolName === "addAgendaEvent") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field label="Evento" value={input.title} onChange={(title: string) => onChange({ title })} />
        </div>
        <Field label="Data" value={input.date} onChange={(date: string) => onChange({ date })} />
        <Field label="Tipo" value={input.type} onChange={(type: string) => onChange({ type })} />
        <Field label="Início" value={input.startTime} onChange={(startTime: string) => onChange({ startTime })} />
        <Field label="Fim" value={input.endTime} onChange={(endTime: string) => onChange({ endTime })} />
      </div>
    )
  }

  if (toolName === "addJournalEntry") {
    return (
      <div className="grid gap-3">
        <Field label="Reflexão" value={input.content} multiline onChange={(content: string) => onChange({ content })} />
        <Field label="Humor" value={input.mood} onChange={(mood: string) => onChange({ mood })} />
        <Field label="Tags separadas por vírgula" value={(input.tags || []).join?.(", ") || input.tags || ""} onChange={(tags: string) => onChange({ tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean) })} />
      </div>
    )
  }

  if (toolName === "createMission") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field label="Missão" value={input.title} onChange={(title: string) => onChange({ title })} />
        </div>
        <div className="md:col-span-2">
          <Field label="Descrição" value={input.description} multiline onChange={(description: string) => onChange({ description })} />
        </div>
        <Field label="Área" value={input.area} onChange={(area: string) => onChange({ area })} />
        <Field label="Tipo" value={input.type} onChange={(type: string) => onChange({ type })} />
        <Field label="XP" value={input.xpReward} onChange={(xpReward: string) => onChange({ xpReward: Number(xpReward) || 0 })} />
        <Field label="Impacto no score" value={input.scoreImpact} onChange={(scoreImpact: string) => onChange({ scoreImpact: Number(scoreImpact) || 0 })} />
      </div>
    )
  }

  if (toolName === "recordScoreEvent") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Área" value={input.area} onChange={(area: string) => onChange({ area })} />
        <Field label="Tipo de evento" value={input.eventType} onChange={(eventType: string) => onChange({ eventType })} />
        <Field label="XP delta" value={input.xpDelta} onChange={(xpDelta: string) => onChange({ xpDelta: Number(xpDelta) || 0 })} />
        <Field label="Score delta" value={input.scoreDelta} onChange={(scoreDelta: string) => onChange({ scoreDelta: Number(scoreDelta) || 0 })} />
        <div className="md:col-span-2">
          <Field label="Motivo" value={input.reason} multiline onChange={(reason: string) => onChange({ reason })} />
        </div>
      </div>
    )
  }

  if (toolName === "answerAdaptiveQuestion") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Área" value={input.area} onChange={(area: string) => onChange({ area })} />
        <Field label="Valor 0–10" value={input.answerValue} onChange={(answerValue: string) => onChange({ answerValue: Number(answerValue) || 0 })} />
        <div className="md:col-span-2">
          <Field label="Resposta" value={input.answerText} multiline onChange={(answerText: string) => onChange({ answerText })} />
        </div>
      </div>
    )
  }

  return (
    <textarea
      value={JSON.stringify(input || {}, null, 2)}
      onChange={(event) => {
        try { onChange(JSON.parse(event.target.value)) } catch {}
      }}
      className="min-h-32 w-full rounded-lg border border-border/50 bg-background px-3 py-2 font-mono text-xs outline-none"
    />
  )
}

function GoalCardContent({ input }: { input: any }) {
  return (
    <>
      <p className="text-sm font-medium text-foreground">{input?.title || "Sem título"}</p>
      {input?.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{input.description}</p>
      )}
      {input?.category && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Tag className="h-3 w-3" />
          <span>{input.category}</span>
        </div>
      )}
    </>
  )
}

function ChecklistCardContent({ input }: { input: any }) {
  const priority = PRIORITY_META[input?.priority] || PRIORITY_META.medium
  return (
    <>
      <p className="text-sm font-medium text-foreground">{input?.label || "Sem descrição"}</p>
      <div className="flex items-center gap-3 flex-wrap">
        {input?.date && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{input.date}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs">
          <span className={cn("h-2 w-2 rounded-full", priority.dot)} />
          <span className={priority.color}>{priority.label}</span>
        </div>
        {input?.category && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>{input.category}</span>
          </div>
        )}
      </div>
    </>
  )
}

function AgendaCardContent({ input }: { input: any }) {
  const eventType = EVENT_TYPE_META[input?.type] || EVENT_TYPE_META.focus
  return (
    <>
      <p className="text-sm font-medium text-foreground">{input?.title || "Sem título"}</p>
      <div className="flex items-center gap-3 flex-wrap">
        {input?.date && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{input.date}</span>
          </div>
        )}
        {(input?.startTime || input?.endTime) && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{input.startTime || "?"} — {input.endTime || "?"}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{eventType.emoji}</span>
          <span>{eventType.label}</span>
        </div>
      </div>
    </>
  )
}

function JournalCardContent({ input }: { input: any }) {
  const mood = MOOD_LABELS[input?.mood] || MOOD_LABELS.neutral
  return (
    <>
      <p className="text-sm text-foreground leading-relaxed italic">"{input?.content || "..."}"</p>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>{mood.emoji}</span>
        <span>Humor: {mood.label}</span>
      </div>
    </>
  )
}

function MissionCardContent({ input }: { input: any }) {
  return (
    <>
      <p className="text-sm font-medium text-foreground">{input?.title || "Missão sem título"}</p>
      {input?.description && <p className="text-xs leading-relaxed text-muted-foreground">{input.description}</p>}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {input?.area && <span className="rounded-full bg-muted px-2 py-1">Área: {input.area}</span>}
        {input?.type && <span className="rounded-full bg-muted px-2 py-1">Tipo: {input.type}</span>}
        <span className="rounded-full bg-orange-500/10 px-2 py-1 text-orange-600">+{input?.xpReward || 0} XP</span>
        <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-600">{input?.scoreImpact || 0} score</span>
      </div>
    </>
  )
}

function ScoreEventCardContent({ input }: { input: any }) {
  return (
    <>
      <p className="text-sm font-medium text-foreground">{input?.reason || "Atualização de progresso"}</p>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {input?.area && <span className="rounded-full bg-muted px-2 py-1">Área: {input.area}</span>}
        {input?.eventType && <span className="rounded-full bg-muted px-2 py-1">Evento: {input.eventType}</span>}
        <span className="rounded-full bg-orange-500/10 px-2 py-1 text-orange-600">+{input?.xpDelta || 0} XP</span>
        <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-600">{input?.scoreDelta || 0} score</span>
      </div>
    </>
  )
}

function QuestionAnswerCardContent({ input }: { input: any }) {
  return (
    <>
      <p className="text-sm font-medium text-foreground">Avaliação de {input?.area || "área"}</p>
      {input?.answerText && <p className="text-xs leading-relaxed text-muted-foreground">{input.answerText}</p>}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {typeof input?.answerValue !== "undefined" && <span className="rounded-full bg-fuchsia-500/10 px-2 py-1 text-fuchsia-600">Nota: {input.answerValue}/10</span>}
        {input?.questionType && <span className="rounded-full bg-muted px-2 py-1">Tipo: {input.questionType}</span>}
      </div>
    </>
  )
}
