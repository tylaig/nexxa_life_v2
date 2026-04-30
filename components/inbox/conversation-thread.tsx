"use client"

import * as React from "react"
import {
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Conversation, Message } from "@/lib/inbox/types"
import { ChannelIcon } from "./channel-icon"
import { MessageBubble } from "./message-bubble"
import { Composer, type ComposerMode } from "./composer"
import { InboxThreadToolbar } from "./inbox-thread-toolbar"
import type { InboxDialogType } from "./inbox-types"
import {
  avatarColor,
  dayLabel,
  initials,
  statusLabel,
  statusToken,
} from "@/lib/inbox/helpers"

export function ConversationThread({
  conversation,
  onSendMessage,
  onResolve,
  onSnooze,
  onUseSuggestion,
  panelOpen,
  onTogglePanel,
  onOpenDialog,
  focusMode,
  onToggleFocus,
}: {
  conversation: Conversation
  onSendMessage: (content: string, mode: ComposerMode) => void
  onResolve: () => void
  onSnooze: () => void
  onUseSuggestion: () => void
  panelOpen: boolean
  onTogglePanel: () => void
  onOpenDialog: (type: Exclude<InboxDialogType, null>) => void
  focusMode?: boolean
  onToggleFocus?: () => void
}) {
  const [draft, setDraft] = React.useState("")
  const [mode, setMode] = React.useState<ComposerMode>("reply")
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  // Reset composer & scroll on conversation change
  React.useEffect(() => {
    setDraft("")
    setMode("reply")
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight })
    })
  }, [conversation.id])

  // Scroll to bottom when new message added
  React.useEffect(() => {
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      })
    })
  }, [conversation.messages.length])

  function handleSend() {
    if (!draft.trim()) return
    onSendMessage(draft, mode)
    setDraft("")
  }

  function handleAcceptSuggestion() {
    if (!conversation.aiSuggestion) return
    setDraft(conversation.aiSuggestion.draft)
    setMode("reply")
    onUseSuggestion()
  }

  // Group messages by day
  const groups = React.useMemo(() => groupByDay(conversation.messages), [conversation.messages])

  const tokens = statusToken(conversation.status)

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background" aria-label="Conversa">
      {/* Header */}
      <header className="flex h-12 items-center gap-3 border-b border-border px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar className="size-8 shrink-0 border border-border">
            <AvatarFallback
              className={cn("text-[11px] font-medium", avatarColor(conversation.contact.id))}
            >
              {initials(conversation.contact.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[14px] font-semibold tracking-tight">
                {conversation.contact.name}
              </h1>
              {conversation.contact.isVip && (
                <Badge
                  variant="outline"
                  className="h-4 gap-1 border-[oklch(0.85_0.10_75)] bg-[oklch(0.97_0.04_75)] px-1 text-[9px] font-semibold uppercase tracking-wider text-[oklch(0.45_0.13_75)] dark:bg-[oklch(0.27_0.06_75)] dark:text-[oklch(0.85_0.13_75)]"
                >
                  VIP
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ChannelIcon channel={conversation.channel} />
              <span className="font-mono">{conversation.contact.phone}</span>
              <span aria-hidden>·</span>
              <span className="truncate">{conversation.channelNumber}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
              tokens.bg,
              tokens.fg
            )}
          >
            <span className={cn("size-1.5 rounded-full", tokens.dot)} aria-hidden />
            {labelFor(conversation.status)}
          </span>
          {conversation.assignee && (
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-1.5 py-1">
              <Avatar className="size-4">
                <AvatarFallback className="bg-muted text-[8px] font-semibold">
                  {initials(conversation.assignee.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-[11px] text-muted-foreground">{conversation.assignee.name}</span>
            </div>
          )}
        </div>
      </header>

      <InboxThreadToolbar
        onResolve={onResolve}
        onSnooze={onSnooze}
        onTogglePanel={onTogglePanel}
        panelOpen={panelOpen}
        onOpenDialog={onOpenDialog}
        focusMode={focusMode}
        onToggleFocus={onToggleFocus}
      />

      {(conversation.status === "escalated" || !conversation.assignee || conversation.priority === "urgent") && (
        <div className="border-b border-border bg-[var(--status-escalated-bg)]/70 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--status-escalated)]">
            <ShieldAlert className="size-3.5" />
            <span className="font-medium">
              {!conversation.assignee
                ? "Conversa sem owner definido"
                : conversation.status === "escalated"
                  ? "Conversa escalada e fora do fluxo padrão"
                  : "Conversa urgente exige atenção imediata"}
            </span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollerRef} className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-1 px-4 py-4">
          {/* Conversation start banner */}
          <div className="mb-2 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border/70 bg-muted/30 px-4 py-3 text-center">
            <Avatar className={cn("size-10")}>
              <AvatarFallback
                className={cn("text-[12px] font-medium", avatarColor(conversation.contact.id))}
              >
                {initials(conversation.contact.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[13px] font-medium">{conversation.contact.name}</div>
              <div className="text-[11px] text-muted-foreground">
                Cliente desde {new Date(conversation.contact.firstSeenAt).toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
                {" · "}
                {conversation.contact.totalOrders} pedidos · LTV {conversation.contact.lifetimeValue}
              </div>
            </div>
          </div>

          {groups.map((g) => (
            <React.Fragment key={g.label}>
              <div className="my-2 flex items-center gap-3" aria-label={g.label}>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {g.label}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              {g.messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </React.Fragment>
          ))}

          <ThreadEventRow label={`Status atual · ${statusLabel(conversation.status)}`} />
          {conversation.assignee ? (
            <ThreadEventRow label={`Owner atual · ${conversation.assignee.name}`} />
          ) : (
            <ThreadEventRow label="Owner pendente · conversa sem dono" tone="warning" />
          )}
          {conversation.isAiHandled ? (
            <ThreadEventRow label="Automação/IA assistindo esta conversa" tone="ai" />
          ) : null}

          {/* AI suggestion in-thread */}
          {conversation.aiSuggestion && conversation.status !== "resolved" && (
            <AiSuggestionInline
              suggestion={conversation.aiSuggestion}
              onAccept={handleAcceptSuggestion}
            />
          )}
        </div>
      </div>

      {/* Composer */}
      <Composer
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        mode={mode}
        onModeChange={setMode}
        onOpenDialog={onOpenDialog}
        onAiRewrite={
          conversation.aiSuggestion
            ? () => {
                onOpenDialog("rewrite")
              }
            : undefined
        }
      />
    </section>
  )
}

function AiSuggestionInline({
  suggestion,
  onAccept,
}: {
  suggestion: NonNullable<Conversation["aiSuggestion"]>
  onAccept: () => void
}) {
  return (
    <div className="my-3 rounded-xl border border-[var(--ai-border)] bg-[var(--ai-bg)] p-3.5">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-md bg-[var(--ai)] text-[var(--ai-foreground)]">
          <Sparkles className="size-3.5" />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-[12px] font-semibold text-foreground">Sugestão de resposta · Onda AI</div>
          <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
            <span>{suggestion.intent}</span>
            <span aria-hidden>·</span>
            <span className="font-mono">confiança {Math.round(suggestion.confidence * 100)}%</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-[12px]"
            onClick={() => toast.success("Abra o composer e use 'Reescrever com IA' para editar o draft")}
          >
            Reescrever
          </Button>
          <Button
            size="sm"
            className="h-7 gap-1 bg-[var(--ai)] px-2.5 text-[var(--ai-foreground)] hover:bg-[var(--ai)]/90"
            onClick={onAccept}
          >
            <span className="text-[12px] font-medium">Usar resposta</span>
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
      <p className="mb-2.5 text-[13px] leading-relaxed text-foreground/90">{suggestion.draft}</p>
      <div className="flex flex-wrap items-center gap-1.5 border-t border-[var(--ai-border)]/60 pt-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Fontes
        </span>
        {suggestion.sources.map((s) => (
          <span
            key={s.title}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[10.5px] text-foreground/80"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                s.type === "policy" && "bg-[var(--status-escalated)]",
                s.type === "faq" && "bg-[var(--status-open)]",
                s.type === "catalog" && "bg-[var(--status-resolved)]",
                s.type === "order" && "bg-[var(--status-pending)]"
              )}
            />
            {s.title}
          </span>
        ))}
      </div>
    </div>
  )
}

function ThreadEventRow({ label, tone = "default" }: { label: string; tone?: "default" | "warning" | "ai" }) {
  return (
    <div className="flex justify-center py-1.5">
      <div
        className={cn(
          "inline-flex max-w-[80%] items-center rounded-full border px-3 py-1 text-[11px]",
          tone === "default" && "border-border bg-muted/40 text-muted-foreground",
          tone === "warning" && "border-[var(--status-escalated-bg)] bg-[var(--status-escalated-bg)] text-[var(--status-escalated)]",
          tone === "ai" && "border-[var(--ai-border)] bg-[var(--ai-bg)] text-[var(--ai)]"
        )}
      >
        {label}
      </div>
    </div>
  )
}

function labelFor(s: Conversation["status"]) {
  return {
    open: "Aberta",
    pending_customer: "Aguarda cliente",
    pending_internal: "Aguarda interno",
    in_automation: "Em automação",
    escalated: "Escalada",
    resolved: "Resolvida",
    snoozed: "Soneca",
  }[s]
}

function groupByDay(messages: Message[]): { label: string; messages: Message[] }[] {
  const groups: Record<string, Message[]> = {}
  const order: string[] = []
  for (const m of messages) {
    const label = dayLabel(m.timestamp)
    if (!groups[label]) {
      groups[label] = []
      order.push(label)
    }
    groups[label].push(m)
  }
  return order.map((label) => ({ label, messages: groups[label] }))
}
