"use client"

import * as React from "react"
import { FilterRail } from "./filter-rail"
import { ConversationList } from "./conversation-list"
import { ConversationThread } from "./conversation-thread"
import { ContextPanel } from "./context-panel"
import { InboxActionDialogs } from "./inbox-action-dialogs"
import { InboxCommandDialog } from "./inbox-command-dialog"
import type { InboxDialogType } from "./inbox-types"
import { viewLabel } from "./inbox-view-model"
import { useInboxState } from "./use-inbox-state"

export function InboxApp() {
  const {
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
  } = useInboxState()

  const [commandOpen, setCommandOpen] = React.useState(false)
  const [dialogType, setDialogType] = React.useState<InboxDialogType>(null)
  const [focusMode, setFocusMode] = React.useState(false)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function handleUseSuggestion() {
    // reservado para telemetria e feedback de IA assistiva
  }

  if (isBootstrapping && conversations.length === 0) {
    return (
      <div className="flex h-[calc(100svh-3.5rem)] items-center justify-center px-6 text-sm text-muted-foreground">
        {bootstrapError ? (
          <div className="rounded-xl border border-border bg-card px-5 py-4 text-center">
            <div className="text-sm font-medium text-foreground">Falha ao carregar a inbox</div>
            <div className="mt-1 text-xs text-muted-foreground">{bootstrapError}</div>
            <button
              type="button"
              onClick={() => void bootstrapInbox()}
              className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          "Carregando inbox operacional..."
        )}
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100svh-3.5rem)] min-h-0 w-full overflow-hidden bg-background text-foreground">
      {!focusMode && (
        <FilterRail
          active={view}
          onChange={setView}
          conversations={conversations}
          inboxFilter={inboxFilter}
          onInboxChange={setInboxFilter}
          teamFilter={teamFilter}
          onTeamChange={setTeamFilter}
          inboxes={inboxes}
          teams={teams}
        />
      )}
      {!focusMode && (
        <ConversationList
          conversations={filtered}
          groupedConversations={grouped}
          activeId={activeId}
          onSelect={setActiveId}
          query={query}
          onQueryChange={setQuery}
          totalCount={conversations.length}
          filterLabel={viewLabel(view)}
          activeFilterSummary={activeFilterSummary}
          sortBy={sortBy}
          advancedFilters={advancedFilters}
          onSortChange={setSortBy}
          onAdvancedFiltersChange={setAdvancedFilters}
          onClearFilters={clearFilters}
          onOpenCommand={() => setCommandOpen(true)}
        />
      )}
      {active ? (
        <ConversationThread
          conversation={active}
          onSendMessage={handleSendMessage}
          onResolve={handleResolve}
          onSnooze={handleSnooze}
          onUseSuggestion={handleUseSuggestion}
          panelOpen={panelOpen}
          onTogglePanel={() => setPanelOpen((s) => !s)}
          onOpenDialog={(type) => setDialogType(type)}
          focusMode={focusMode}
          onToggleFocus={() => setFocusMode((s) => !s)}
        />
      ) : (
        <section className="flex flex-1 items-center justify-center bg-background px-6">
          <div className="max-w-sm rounded-xl border border-dashed border-border bg-card/40 px-6 py-5 text-center">
            <div className="text-[14px] font-medium">Nenhuma conversa selecionada</div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              Escolha uma conversa na lista para responder, revisar contexto ou assumir ownership.
            </div>
            {activeFilterSummary.length > 0 ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                Limpar filtros da fila
              </button>
            ) : null}
          </div>
        </section>
      )}
      {active && panelOpen && (
        <ContextPanel conversation={active} onOpenDialog={(type) => setDialogType(type)} />
      )}
      <InboxCommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        conversations={conversations}
        onSelectConversation={setActiveId}
      />
      <InboxActionDialogs
        type={dialogType}
        conversation={active}
        onOpenChange={(open) => {
          if (!open) setDialogType(null)
        }}
        onAppendComposer={() => {}}
        onReplaceComposer={() => {}}
      />
    </div>
  )
}
