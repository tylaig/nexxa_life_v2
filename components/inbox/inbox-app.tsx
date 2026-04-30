"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
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

  const unassignedCount = conversations.filter((item) => !item.owner).length
  const escalatedCount = conversations.filter((item) => item.status === "escalated").length
  const automationCount = conversations.filter((item) => item.status === "automation").length
  const priorityCount = conversations.filter((item) => item.priority === "urgent" || item.priority === "high").length

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
    <PageContainer className="overflow-hidden">
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Inbox" }]} />
      <PageHeader
        title="Inbox"
        description="Atendimento omnichannel complementar ao núcleo NexxaLife, com foco em triagem, ownership, SLA e contexto comercial conectado a Contatos e Campaigns."
      />

      <section className="mb-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                Atendimento e relacionamento
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Priorize conversas, risco de SLA e ownership sem deslocar o centro operacional principal do NexxaLife.
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                  Inbox opera como cockpit complementar de atendimento: organiza fila, urgência, contexto e resposta,
                  enquanto o fluxo principal continua concentrado em dashboard, agenda, checklist e relatórios.
                </p>
              </div>
            </div>

            <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Atendimento complementar e omnichannel</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  A prioridade aqui é triagem, resposta e coordenação de relacionamento em escala, não execução pessoal do dia.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Inbox → contacts → campaigns</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  O valor operacional cresce quando contexto da conversa alimenta CRM, segmentação e campanhas de retenção ou recompra.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard label="Conversas ativas" value={String(filtered.length)} hint={`${conversations.length} no total`} />
            <StatCard label="Sem dono" value={String(unassignedCount)} hint="ownership pendente" trend={unassignedCount > 0 ? { value: "atenção", positive: false } : undefined} />
            <StatCard label="Escaladas" value={String(escalatedCount)} hint="fora do fluxo padrão" trend={escalatedCount > 0 ? { value: "crítico", positive: false } : undefined} />
            <StatCard label="Alta prioridade" value={String(priorityCount)} hint={`${automationCount} em automação`} />
          </div>
        </div>
      </section>

      <div className="flex h-[calc(100svh-18.5rem)] min-h-[540px] w-full overflow-hidden rounded-2xl border border-border bg-background text-foreground">
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
      </div>

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
    </PageContainer>
  )
}
