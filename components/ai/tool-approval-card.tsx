// @ts-nocheck
"use client"

import * as React from "react"
import {
  Target, CheckCircle2, Calendar, BookText,
  Clock, Tag, ChevronDown, ChevronUp,
  Check, X, Loader2, AlertCircle
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
}

interface ToolApprovalCardProps {
  toolName: string
  toolCallId: string
  state: string // 'approval-requested' | 'output-available' | 'output-error' | ...
  input: any
  output?: any
  approvalId?: string
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
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
}: ToolApprovalCardProps) {
  const meta = TOOL_CARD_META[toolName]
  if (!meta) return null

  const Icon = meta.icon
  const isApprovalPending = state === "approval-requested"
  const isApproved = state === "output-available"
  const isRejected = state === "approval-denied"
  const isLoading = state === "input-streaming"
  const isError = state === "output-error"

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-300 w-full max-w-[380px]",
        isApproved && "border-emerald-300/60 dark:border-emerald-700/40",
        isRejected && "border-muted/60 opacity-60",
        isError && "border-red-300/60",
        !isApproved && !isRejected && !isError && meta.border
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 bg-gradient-to-r",
          isApproved ? "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20" :
          isRejected ? "from-muted/30 to-muted/20" :
          isError ? "from-red-50 to-orange-50 dark:from-red-950/20" :
          meta.gradient
        )}
      >
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
          {isApproved && <p className="text-[11px] text-emerald-600 font-medium">✅ Aprovado e salvo</p>}
          {isRejected && <p className="text-[11px] text-muted-foreground font-medium">❌ Rejeitado</p>}
          {isError && <p className="text-[11px] text-red-500 font-medium">Erro ao executar</p>}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 bg-background/80 space-y-2">
        {toolName === "addGoal" && <GoalCardContent input={input} />}
        {toolName === "addChecklistItem" && <ChecklistCardContent input={input} />}
        {toolName === "addAgendaEvent" && <AgendaCardContent input={input} />}
        {toolName === "addJournalEntry" && <JournalCardContent input={input} />}
      </div>

      {/* Action Buttons */}
      {isApprovalPending && approvalId && (
        <div className="flex gap-2 px-4 py-3 border-t border-border/30 bg-muted/10">
          <Button
            size="sm"
            className="flex-1 rounded-xl h-9 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            onClick={() => onApprove?.(approvalId)}
          >
            <Check className="h-3.5 w-3.5 mr-1.5" /> Aprovar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 rounded-xl h-9 text-muted-foreground hover:text-destructive hover:border-destructive/40"
            onClick={() => onReject?.(approvalId)}
          >
            <X className="h-3.5 w-3.5 mr-1.5" /> Rejeitar
          </Button>
        </div>
      )}
    </div>
  )
}

// ─── Content Components ────────────────────────────────────────

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
