import type { Conversation } from "@/lib/inbox/types"
import { statusLabel } from "@/lib/inbox/helpers"
import type { ViewId } from "./filter-rail"

const NOW_REF = new Date("2026-04-27T15:32:00Z").getTime()

export type InboxAdvancedFilters = {
  unreadOnly: boolean
  vipOnly: boolean
  withOrderOnly: boolean
  unassignedOnly: boolean
}

export type InboxSort = "recent" | "sla" | "priority"

export function matchesView(c: Conversation, view: ViewId): boolean {
  switch (view) {
    case "all":
      return true
    case "mine":
      return c.assignee?.id === "u_me"
    case "unassigned":
      return !c.assignee
    case "mentions":
      return false
    case "open":
      return c.status === "open"
    case "pending":
      return c.status === "pending_customer" || c.status === "pending_internal"
    case "automation":
      return c.status === "in_automation"
    case "escalated":
      return c.status === "escalated"
    case "resolved":
      return c.status === "resolved"
    case "vip":
      return c.contact.isVip
    case "sla_risk":
      return isSlaRisk(c)
  }
}

export function viewLabel(view: ViewId): string {
  return {
    all: "Todas as conversas",
    mine: "Minhas conversas",
    unassigned: "Sem dono",
    mentions: "Menções",
    open: "Abertas",
    pending: "Aguardando",
    automation: "Em automação",
    escalated: "Escaladas",
    resolved: "Resolvidas",
    vip: "Clientes VIP",
    sla_risk: "Risco de SLA",
  }[view]
}

export function countFor(view: ViewId, conversations: Conversation[]): number {
  return conversations.filter((conversation) => matchesView(conversation, view)).length
}

export function isSlaRisk(c: Conversation): boolean {
  if (!c.slaDueAt) return false
  return new Date(c.slaDueAt).getTime() - NOW_REF < 15 * 60_000
}

export function isSlaCritical(c: Conversation): boolean {
  if (!c.slaDueAt) return false
  return new Date(c.slaDueAt).getTime() <= NOW_REF
}

export function priorityWeight(c: Conversation): number {
  return {
    urgent: 4,
    high: 3,
    normal: 2,
    low: 1,
  }[c.priority]
}

export function sortConversations(items: Conversation[], sortBy: InboxSort): Conversation[] {
  return [...items].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
    }

    if (sortBy === "sla") {
      const aDue = a.slaDueAt ? new Date(a.slaDueAt).getTime() : Number.POSITIVE_INFINITY
      const bDue = b.slaDueAt ? new Date(b.slaDueAt).getTime() : Number.POSITIVE_INFINITY
      return aDue - bDue
    }

    const priorityDelta = priorityWeight(b) - priorityWeight(a)
    if (priorityDelta !== 0) return priorityDelta
    return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
  })
}

export function buildActiveFilterSummary({
  view,
  inboxFilter,
  teamFilter,
  query,
  advancedFilters,
  sortBy,
}: {
  view: ViewId
  inboxFilter: string
  teamFilter: string | null
  query: string
  advancedFilters: InboxAdvancedFilters
  sortBy: InboxSort
}) {
  return [
    view !== "all" ? viewLabel(view) : null,
    inboxFilter !== "all" ? `Caixa ${inboxFilter}` : null,
    teamFilter ? `Time ${teamFilter}` : null,
    query.trim() ? `Busca: ${query.trim()}` : null,
    advancedFilters.unreadOnly ? "Não lidas" : null,
    advancedFilters.vipOnly ? "VIP" : null,
    advancedFilters.withOrderOnly ? "Com pedido" : null,
    advancedFilters.unassignedOnly ? "Sem dono" : null,
    sortBy !== "recent" ? `Ordenação: ${sortLabel(sortBy)}` : null,
  ].filter(Boolean) as string[]
}

export function sortLabel(sortBy: InboxSort) {
  return {
    recent: "Mais recentes",
    sla: "Risco de SLA",
    priority: "Maior prioridade",
  }[sortBy]
}

export function conversationAttentionSummary(c: Conversation) {
  if (!c.assignee && c.status !== "resolved") return "Sem dono"
  if (isSlaCritical(c)) return "SLA estourado"
  if (isSlaRisk(c)) return "SLA em risco"
  if (c.status === "escalated") return "Escalada"
  if (c.status === "in_automation") return "Em automação"
  return statusLabel(c.status)
}

export function conversationSectionLabel(c: Conversation) {
  if (!c.assignee && c.status !== "resolved") return "Agir agora"
  if (isSlaCritical(c) || isSlaRisk(c) || c.status === "escalated" || c.priority === "urgent") {
    return "Agir agora"
  }
  if (c.status === "resolved" || c.status === "snoozed") return "Concluídas e em pausa"
  if (c.status === "pending_customer" || c.status === "pending_internal") return "Aguardando retorno"
  return "Em andamento"
}

export function groupConversations(items: Conversation[]) {
  const order = ["Agir agora", "Em andamento", "Aguardando retorno", "Concluídas e em pausa"] as const
  const groups = new Map<string, Conversation[]>()

  for (const item of items) {
    const label = conversationSectionLabel(item)
    const current = groups.get(label) ?? []
    current.push(item)
    groups.set(label, current)
  }

  return order
    .map((label) => ({ label, items: groups.get(label) ?? [] }))
    .filter((group) => group.items.length > 0)
}
