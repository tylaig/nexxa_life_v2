import * as React from "react"
import { toast } from "sonner"

import {
  conversations as initialConversations,
  inboxes,
  teams,
} from "@/lib/inbox/mock-data"
import { listConversations, sendConversationMessage, updateConversationStatus } from "@/lib/inbox/api"
import type { Conversation } from "@/lib/inbox/types"
import type { ComposerMode } from "./composer"
import type { ViewId } from "./filter-rail"
import {
  buildActiveFilterSummary,
  groupConversations,
  matchesView,
  sortConversations,
  type InboxAdvancedFilters,
  type InboxSort,
} from "./inbox-view-model"

const DEFAULT_ADVANCED_FILTERS: InboxAdvancedFilters = {
  unreadOnly: false,
  vipOnly: false,
  withOrderOnly: false,
  unassignedOnly: false,
}

export function useInboxState() {
  const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations)
  const [activeId, setActiveId] = React.useState<string>(initialConversations[0]?.id)
  const [view, setView] = React.useState<ViewId>("all")
  const [inboxFilter, setInboxFilter] = React.useState<string>("all")
  const [teamFilter, setTeamFilter] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [panelOpen, setPanelOpen] = React.useState(true)
  const [isBootstrapping, setIsBootstrapping] = React.useState(true)
  const [bootstrapError, setBootstrapError] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState<InboxSort>("recent")
  const [advancedFilters, setAdvancedFilters] = React.useState<InboxAdvancedFilters>(DEFAULT_ADVANCED_FILTERS)

  const bootstrapInbox = React.useCallback(async () => {
    setIsBootstrapping(true)
    setBootstrapError(null)
    try {
      const items = await listConversations()
      setConversations(items)
      if (items[0]) {
        setActiveId((current) => current ?? items[0].id)
      }
    } catch (error) {
      console.error("Failed to bootstrap inbox conversations", error)
      setBootstrapError("Não foi possível carregar a fila da inbox.")
    } finally {
      setIsBootstrapping(false)
    }
  }, [])

  React.useEffect(() => {
    void bootstrapInbox()
  }, [bootstrapInbox])

  const filtered = React.useMemo(() => {
    const base = conversations.filter((c) => {
      if (!matchesView(c, view)) return false
      if (inboxFilter !== "all") {
        const brand = inboxFilter === "games-safari" ? "Games Safari" : "Game Box"
        if (c.brand !== brand) return false
      }
      if (teamFilter && c.team !== teamFilter) return false
      if (advancedFilters.unreadOnly && c.unreadCount === 0) return false
      if (advancedFilters.vipOnly && !c.contact.isVip) return false
      if (advancedFilters.withOrderOnly && !c.order) return false
      if (advancedFilters.unassignedOnly && c.assignee) return false
      if (query.trim()) {
        const q = query.trim().toLowerCase()
        const hay = [
          c.contact.name,
          c.contact.phone,
          c.preview,
          c.brand,
          c.intent ?? "",
          c.tags.join(" "),
          c.order?.number ?? "",
        ]
          .join(" ")
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    return sortConversations(base, sortBy)
  }, [conversations, view, inboxFilter, teamFilter, advancedFilters, query, sortBy])

  React.useEffect(() => {
    if (filtered.length === 0) return
    if (!filtered.find((c) => c.id === activeId)) {
      setActiveId(filtered[0].id)
    }
  }, [filtered, activeId])

  const active = conversations.find((c) => c.id === activeId)

  function replaceConversation(updatedConversation: Conversation) {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id ? updatedConversation : conversation
      )
    )
  }

  async function handleSendMessage(content: string, mode: ComposerMode) {
    if (!active) return

    try {
      const updated = await sendConversationMessage(active.id, {
        content,
        mode,
        senderName: "Você",
      })
      replaceConversation(updated)
      toast.success(mode === "note" ? "Nota interna adicionada" : "Mensagem enviada")
    } catch (error) {
      console.error("Failed to send message", error)
      toast.error("Falha ao enviar mensagem")
    }
  }

  async function handleResolve() {
    if (!active) return

    try {
      const updated = await updateConversationStatus(active.id, "resolved")
      replaceConversation(updated)
      toast.success("Conversa resolvida")
    } catch (error) {
      console.error("Failed to resolve conversation", error)
      toast.error("Falha ao resolver conversa")
    }
  }

  async function handleSnooze() {
    if (!active) return

    try {
      const updated = await updateConversationStatus(active.id, "snoozed")
      replaceConversation(updated)
      toast.success("Conversa colocada em soneca")
    } catch (error) {
      console.error("Failed to snooze conversation", error)
      toast.error("Falha ao colocar conversa em soneca")
    }
  }

  function clearFilters() {
    setView("all")
    setInboxFilter("all")
    setTeamFilter(null)
    setQuery("")
    setSortBy("recent")
    setAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

  const activeFilterSummary = buildActiveFilterSummary({
    view,
    inboxFilter,
    teamFilter,
    query,
    advancedFilters,
    sortBy,
  })
  const grouped = groupConversations(filtered)

  return {
    conversations,
    filtered,
    grouped,
    active,
    activeId,
    setActiveId,
    view,
    setView,
    inboxFilter,
    setInboxFilter,
    teamFilter,
    setTeamFilter,
    query,
    setQuery,
    panelOpen,
    setPanelOpen,
    isBootstrapping,
    bootstrapError,
    bootstrapInbox,
    handleSendMessage,
    handleResolve,
    handleSnooze,
    clearFilters,
    activeFilterSummary,
    sortBy,
    setSortBy,
    advancedFilters,
    setAdvancedFilters,
    inboxes,
    teams,
  }
}
