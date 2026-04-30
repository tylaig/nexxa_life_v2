"use client"

import * as React from "react"
import { Search, Crown, Bot, AlertTriangle, CircleAlert, UserRoundX, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/inbox/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChannelIcon } from "./channel-icon"
import { InboxListToolbar } from "./inbox-list-toolbar"
import { avatarColor, initials, relativeTime, statusToken } from "@/lib/inbox/helpers"
import { conversationAttentionSummary } from "./inbox-view-model"

export function ConversationList({
  conversations,
  activeId,
  groupedConversations,
  onSelect,
  query,
  onQueryChange,
  totalCount,
  filterLabel,
  activeFilterSummary,
  sortBy,
  advancedFilters,
  onSortChange,
  onAdvancedFiltersChange,
  onClearFilters,
  onOpenCommand,
}: {
  conversations: Conversation[]
  activeId: string
  groupedConversations: { label: string; items: Conversation[] }[]
  onSelect: (id: string) => void
  query: string
  onQueryChange: (q: string) => void
  totalCount: number
  filterLabel: string
  activeFilterSummary: string[]
  sortBy: "recent" | "sla" | "priority"
  advancedFilters: {
    unreadOnly: boolean
    vipOnly: boolean
    withOrderOnly: boolean
    unassignedOnly: boolean
  }
  onSortChange: (value: "recent" | "sla" | "priority") => void
  onAdvancedFiltersChange: (value: {
    unreadOnly: boolean
    vipOnly: boolean
    withOrderOnly: boolean
    unassignedOnly: boolean
  }) => void
  onClearFilters: () => void
  onOpenCommand: () => void
}) {
  return (
    <section
      className="flex w-[360px] shrink-0 flex-col border-r border-border bg-background"
      aria-label="Lista de conversas"
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-border px-3">
        <div className="flex flex-col leading-tight">
          <h2 className="text-[13px] font-semibold tracking-tight">{filterLabel}</h2>
          <span className="font-mono text-[10px] text-muted-foreground">
            {conversations.length} de {totalCount}
          </span>
        </div>
        <InboxListToolbar
          onOpenCommand={onOpenCommand}
          sortBy={sortBy}
          onSortChange={onSortChange}
          filters={advancedFilters}
          onFiltersChange={onAdvancedFiltersChange}
        />
      </div>

      {/* Search */}
      <div className="border-b border-border px-3 py-2">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar conversas, contatos, pedidos..."
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-12 text-[13px] outline-none ring-ring/30 placeholder:text-muted-foreground focus:ring-2"
            aria-label="Buscar conversas"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      {activeFilterSummary.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-3 py-2">
          {activeFilterSummary.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-border bg-card px-2 py-0.5 text-[10.5px] text-foreground/80"
            >
              {item}
            </span>
          ))}
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-[10.5px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <X className="size-3" />
            Limpar
          </button>
        </div>
      )}

      {/* List */}
      <div className="scrollbar-thin flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="rounded-full border border-dashed border-border p-2 text-muted-foreground">
              <Search className="size-4" />
            </div>
            <div className="text-[13px] font-medium">Nenhuma conversa encontrada</div>
            <div className="max-w-[220px] text-[12px] text-muted-foreground">
              Ajuste busca, filtros ou filas para voltar a enxergar conversas operacionais.
            </div>
            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-accent"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {groupedConversations.map((group) => (
              <ConversationGroupView 
                key={group.label} 
                group={group} 
                activeId={activeId} 
                onSelect={onSelect} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ConversationGroupView({
  group,
  activeId,
  onSelect,
}: {
  group: { label: string; items: Conversation[] }
  activeId: string
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = React.useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="sticky top-0 z-10 border-y border-border/70 bg-background/95 px-3 py-1.5 backdrop-blur">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground outline-none hover:text-foreground">
            <div className="flex items-center gap-1.5">
              <ChevronRight className={cn("size-3 transition-transform", open ? "rotate-90" : "")} />
              <span>{group.label}</span>
            </div>
            <span className="tabular-nums">{group.items.length}</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="flex flex-col">
          {group.items.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onClick={() => onSelect(c.id)}
            />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ConversationItem({
  conversation: c,
  active,
  onClick,
}: {
  conversation: Conversation
  active: boolean
  onClick: () => void
}) {
  const tokens = statusToken(c.status)
  const nowRef = new Date("2026-04-27T15:32:00Z").getTime()
  const slaDelta = c.slaDueAt ? new Date(c.slaDueAt).getTime() - nowRef : null
  const slaCritical = slaDelta !== null && slaDelta <= 0
  const slaSoon = slaDelta !== null && slaDelta > 0 && slaDelta < 15 * 60_000
  const needsAttention = c.status === "escalated" || c.priority === "urgent" || slaCritical

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? "true" : undefined}
        className={cn(
          "group relative flex w-full gap-3 border-b border-border/60 px-3 py-3 text-left transition-colors hover:bg-accent/40",
          active && "bg-accent/60 hover:bg-accent/60"
        )}
      >
        {active && (
          <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" aria-hidden />
        )}

        <Avatar className={cn("size-9 shrink-0 border border-border")}>
          <AvatarFallback className={cn("text-[11px] font-medium", avatarColor(c.contact.id))}>
            {initials(c.contact.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {/* row 1: name + time */}
          <div className="flex items-center gap-1.5">
            <ChannelIcon channel={c.channel} className="shrink-0" />
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[13px] font-medium",
                c.unreadCount > 0 ? "text-foreground" : "text-foreground/90"
              )}
            >
              {c.contact.name}
            </span>
            {c.contact.isVip && (
              <Crown className="size-3 shrink-0 text-[oklch(0.65_0.15_75)]" aria-label="VIP" />
            )}
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              {relativeTime(c.lastActivityAt)}
            </span>
          </div>

          {/* row 2: brand + assignee */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="truncate">{c.brand}</span>
            {c.assignee ? (
              <>
                <span aria-hidden>·</span>
                <span className="truncate">{c.assignee.name}</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-escalated-bg)] bg-[var(--status-escalated-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-escalated)]">
                <UserRoundX className="size-2.5" />
                Sem dono
              </span>
            )}
            {c.isAiHandled && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-0.5 text-[var(--ai)]">
                  <Bot className="size-3" /> IA
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="rounded-full border border-border bg-background px-1.5 py-0.5">
              {conversationAttentionSummary(c)}
            </span>
            {c.order ? (
              <span className="rounded-full border border-border bg-background px-1.5 py-0.5 font-mono">
                {c.order.number}
              </span>
            ) : null}
          </div>

          {/* row 3: preview */}
          <p
            className={cn(
              "line-clamp-2 text-[12.5px] leading-snug",
              c.unreadCount > 0 ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {c.preview}
          </p>

          {/* row 4: meta */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                tokens.bg,
                tokens.fg
              )}
            >
              <span className={cn("size-1.5 rounded-full", tokens.dot)} aria-hidden />
              {labelFor(c.status)}
            </span>
            {slaCritical ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--status-escalated-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-escalated)]">
                <CircleAlert className="size-2.5" />
                SLA estourado
              </span>
            ) : slaSoon ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--status-escalated-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-escalated)]">
                <AlertTriangle className="size-2.5" />
                SLA em risco
              </span>
            ) : null}
            {needsAttention && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-escalated-bg)] bg-background px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-escalated)]">
                Prioridade alta
              </span>
            )}
            {c.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {c.tags.length > 2 && (
              <span className="text-[10px] text-muted-foreground">+{c.tags.length - 2}</span>
            )}
          </div>
        </div>

        {c.unreadCount > 0 && (
          <span
            className="ml-1 mt-1 flex size-5 shrink-0 items-center justify-center self-start rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
            aria-label={`${c.unreadCount} mensagens não lidas`}
          >
            {c.unreadCount}
          </span>
        )}
      </button>
    </li>
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
