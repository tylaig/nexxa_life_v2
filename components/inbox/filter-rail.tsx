"use client"

import * as React from "react"
import {
  Inbox as InboxIcon,
  AtSign,
  CircleDashed,
  CircleDot,
  Hourglass,
  ShieldAlert,
  CheckCircle2,
  Bot,
  Crown,
  AlertTriangle,
  ChevronDown,
  Plus,
  Star,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/inbox/types"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { countFor } from "./inbox-view-model"

export type ViewId =
  | "all"
  | "mine"
  | "unassigned"
  | "mentions"
  | "open"
  | "pending"
  | "automation"
  | "escalated"
  | "resolved"
  | "vip"
  | "sla_risk"

const VIEWS: { id: ViewId; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "Todas", icon: InboxIcon },
  { id: "mine", label: "Minhas", icon: Star },
  { id: "unassigned", label: "Sem dono", icon: CircleDashed },
  { id: "mentions", label: "Menções", icon: AtSign },
]

const STATES: { id: ViewId; label: string; icon: React.ElementType; tone: string }[] = [
  { id: "open", label: "Abertas", icon: CircleDot, tone: "text-[var(--status-open)]" },
  { id: "pending", label: "Aguardando", icon: Hourglass, tone: "text-[var(--status-pending)]" },
  { id: "automation", label: "Em automação", icon: Bot, tone: "text-[var(--status-automation)]" },
  { id: "escalated", label: "Escaladas", icon: ShieldAlert, tone: "text-[var(--status-escalated)]" },
  { id: "resolved", label: "Resolvidas", icon: CheckCircle2, tone: "text-[var(--status-resolved)]" },
]

const SMART: { id: ViewId; label: string; icon: React.ElementType; tone: string }[] = [
  { id: "vip", label: "Clientes VIP", icon: Crown, tone: "text-[oklch(0.65_0.15_75)]" },
  { id: "sla_risk", label: "Risco de SLA", icon: AlertTriangle, tone: "text-[var(--status-escalated)]" },
]

export function FilterRail({
  active,
  onChange,
  conversations,
  inboxFilter,
  onInboxChange,
  teamFilter,
  onTeamChange,
  inboxes,
  teams,
}: {
  active: ViewId
  onChange: (v: ViewId) => void
  conversations: Conversation[]
  inboxFilter: string
  onInboxChange: (id: string) => void
  teamFilter: string | null
  onTeamChange: (id: string | null) => void
  inboxes: { id: string; label: string; count: number; sub?: string }[]
  teams: { id: string; label: string; count: number }[]
}) {
  return (
    <aside
      className="flex w-[244px] shrink-0 flex-col border-r border-border bg-sidebar/50"
      aria-label="Filtros e visualizações"
    >
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <h2 className="text-[13px] font-semibold tracking-tight text-foreground">Inbox</h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Nova view"
          onClick={() => toast.info("Criação de views salvas entra na próxima rodada. Use os filtros atuais para validar a operação.")}
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-2 py-3">
        {/* Quick views */}
        <Section title="Visualizações">
          {VIEWS.map((v) => (
            <RailItem
              key={v.id}
              active={active === v.id}
              onClick={() => onChange(v.id)}
              icon={<v.icon className="size-4" strokeWidth={1.75} />}
              label={v.label}
              count={countFor(v.id, conversations)}
            />
          ))}
        </Section>

        {/* States */}
        <Section title="Status">
          {STATES.map((v) => (
            <RailItem
              key={v.id}
              active={active === v.id}
              onClick={() => onChange(v.id)}
              icon={<v.icon className={cn("size-4", v.tone)} strokeWidth={1.75} />}
              label={v.label}
              count={countFor(v.id, conversations)}
            />
          ))}
        </Section>

        {/* Smart views */}
        <Section title="Smart views">
          {SMART.map((v) => (
            <RailItem
              key={v.id}
              active={active === v.id}
              onClick={() => onChange(v.id)}
              icon={<v.icon className={cn("size-4", v.tone)} strokeWidth={1.75} />}
              label={v.label}
              count={countFor(v.id, conversations)}
            />
          ))}
        </Section>

        {/* Inboxes */}
        <CollapsibleSection title="Caixas (números)">
          {inboxes.map((ib) => (
            <RailItem
              key={ib.id}
              active={inboxFilter === ib.id}
              onClick={() => onInboxChange(ib.id)}
              icon={
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-sm text-[9px] font-bold",
                    ib.id === "all"
                      ? "bg-muted text-muted-foreground"
                      : "bg-[oklch(0.95_0.04_145)] text-[oklch(0.45_0.12_145)] dark:bg-[oklch(0.28_0.06_145)] dark:text-[oklch(0.85_0.10_145)]"
                  )}
                >
                  {ib.id === "all" ? "•" : "W"}
                </span>
              }
              label={ib.label}
              sublabel={ib.sub}
              count={ib.count}
            />
          ))}
        </CollapsibleSection>

        {/* Teams */}
        <CollapsibleSection title="Times">
          <RailItem
            active={teamFilter === null}
            onClick={() => onTeamChange(null)}
            icon={<span className="size-2 rounded-full bg-muted-foreground" />}
            label="Todos os times"
            count={conversations.length}
          />
          {teams.map((t) => (
            <RailItem
              key={t.id}
              active={teamFilter === t.id}
              onClick={() => onTeamChange(t.id)}
              icon={
                <span
                  className={cn(
                    "size-2 rounded-full",
                    t.id === "vendas" && "bg-[var(--status-open)]",
                    t.id === "suporte" && "bg-[var(--status-resolved)]",
                    t.id === "logistica" && "bg-[var(--status-pending)]",
                    t.id === "fraude" && "bg-[var(--status-escalated)]"
                  )}
                />
              }
              label={t.label}
              count={t.count}
            />
          ))}
        </CollapsibleSection>
      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-col gap-px">{children}</div>
    </div>
  )
}

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Collapsible defaultOpen className="mb-4">
      <CollapsibleTrigger className="group mb-1 flex w-full items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
        <span>{title}</span>
        <ChevronDown className="size-3 transition-transform group-data-[state=closed]:-rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-px">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function RailItem({
  active,
  onClick,
  icon,
  label,
  sublabel,
  count,
}: {
  active?: boolean
  onClick?: () => void
  icon: React.ReactNode
  label: string
  sublabel?: string
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13px] text-foreground/80 transition-colors hover:bg-accent hover:text-foreground",
        active && "bg-accent text-foreground"
      )}
      aria-pressed={active}
    >
      <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex flex-1 flex-col items-start overflow-hidden leading-tight">
        <span className="w-full truncate font-medium">{label}</span>
        {sublabel ? (
          <span className="w-full truncate font-mono text-[10px] text-muted-foreground">
            {sublabel}
          </span>
        ) : null}
      </span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "rounded px-1.5 text-[11px] font-medium tabular-nums text-muted-foreground",
            active && "text-foreground"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}
