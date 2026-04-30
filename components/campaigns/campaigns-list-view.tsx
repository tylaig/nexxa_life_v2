"use client"

import * as React from "react"
import Link from "next/link"
import {
  Megaphone,
  Plus,
  RefreshCw,
  Search,
  Filter,
  CalendarClock,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  CircleDashed,
  ChevronRight,
  AlertTriangle,
} from "lucide-react"

import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { listCampaigns } from "@/lib/campaigns/api"
import { cn } from "@/lib/utils"

import type { CampaignItem } from "./campaign-types"
import {
  campaignFilterSummary,
  estimateConversionRate,
  estimateReadRate,
  estimateRecipients,
  estimateReplyRate,
  filterCampaigns,
  formatDate,
  isAttentionCampaign,
  uniqueChannels,
  uniqueObjectives,
  type ChannelFilter,
  type ObjectiveFilter,
  type StatusFilter,
} from "./campaigns-list-view-model"

const statusMeta: Record<CampaignItem["status"], { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground", icon: CircleDashed },
  scheduled: { label: "Agendada", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: CalendarClock },
  running: { label: "Em execução", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: PlayCircle },
  paused: { label: "Pausada", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300", icon: PauseCircle },
  completed: { label: "Concluída", className: "bg-violet-500/10 text-violet-700 dark:text-violet-300", icon: CheckCircle2 },
}

export function CampaignsListView() {
  const [items, setItems] = React.useState<CampaignItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<StatusFilter>("all")
  const [objective, setObjective] = React.useState<ObjectiveFilter>("all")
  const [channel, setChannel] = React.useState<ChannelFilter>("all")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const nextItems = await listCampaigns<CampaignItem[]>()
      setItems(nextItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar campanhas")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const filtered = filterCampaigns({ items, status, objective, channel, query })
  const activeFilterSummary = campaignFilterSummary({ status, objective, channel, query })
  const objectives = uniqueObjectives(items)
  const channels = uniqueChannels(items)
  const selectedCampaign = items.find((item) => item.id === selectedId) ?? null

  const scheduledCount = items.filter((item) => item.status === "scheduled").length
  const liveCount = items.filter((item) => item.status === "running").length
  const draftCount = items.filter((item) => item.status === "draft").length

  return (
    <PageContainer>
      <PageHeader
        title="Campanhas"
        description="Catálogo operacional de campanhas outbound com busca, filtros, métricas resumidas e navegação dedicada para detalhe e edição."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}>
              <RefreshCw className="h-3.5 w-3.5" />
              Atualizar
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href="/campaigns/new">
                <Plus className="h-3.5 w-3.5" />
                Nova campanha
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Campanhas" value={String(items.length)} hint="catálogo operacional" icon={Megaphone} />
        <StatCard label="Rascunhos" value={String(draftCount)} hint="em preparação" icon={CircleDashed} />
        <StatCard label="Agendadas" value={String(scheduledCount)} hint="com janela definida" icon={CalendarClock} />
        <StatCard label="Ativas" value={String(liveCount)} hint={error ? "com atenção" : "conectado à API"} icon={PlayCircle} />
      </div>

      <div className="mt-6">
        <Tabs value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="all">Todas</NavTabsTrigger>
              <NavTabsTrigger value="draft">Rascunho</NavTabsTrigger>
              <NavTabsTrigger value="scheduled">Agendadas</NavTabsTrigger>
              <NavTabsTrigger value="running">Em execução</NavTabsTrigger>
              <NavTabsTrigger value="paused">Pausadas</NavTabsTrigger>
              <NavTabsTrigger value="completed">Concluídas</NavTabsTrigger>
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto flex-wrap">
              <div className="relative lg:w-52">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar..." className="h-9 pl-8" />
              </div>
              <Select value={objective} onValueChange={(value) => setObjective(value)}>
                <SelectTrigger className="h-9 w-[180px]"><SelectValue placeholder="Objetivo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os objetivos</SelectItem>
                  {objectives.map((item) => <SelectItem key={item} value={item}>{item.replaceAll("_", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={channel} onValueChange={(value) => setChannel(value)}>
                <SelectTrigger className="h-9 w-[140px]"><SelectValue placeholder="Canal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os canais</SelectItem>
                  {channels.map((item) => <SelectItem key={item} value={item}>{item.toUpperCase()}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => { setStatus("all"); setObjective("all"); setChannel("all"); setQuery("") }}>
                Limpar
              </Button>
            </div>
          </div>

          <TabsContent value={status} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card">
              {error ? <div className="border-b border-border px-4 py-3 text-sm text-rose-600">{error}</div> : null}

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Campanha</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Objetivo</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Audiência</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Agendamento</TableHead>
                    <TableHead className="text-right">Recipients</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center text-sm text-muted-foreground">
                    Carregando campanhas...
                  </TableCell>
                </TableRow>
              ) : null}

              {!loading && filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center text-sm text-muted-foreground">
                    Nenhuma campanha encontrada para os filtros atuais.
                  </TableCell>
                </TableRow>
              ) : null}

              {filtered.map((item) => {
                const meta = statusMeta[item.status]
                const Icon = meta.icon
                const recipients = estimateRecipients(item)
                return (
                  <TableRow key={item.id} className="group cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedId(item.id)}>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          {isAttentionCampaign(item) ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-pending)]">
                              <AlertTriangle className="h-3 w-3" />
                              Requer atenção
                            </span>
                          ) : null}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Criada em {formatDate(item.createdAt)} · atualizada {formatDate(item.updatedAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("gap-1 border-0 font-medium", meta.className)}>
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{item.objective.replaceAll("_", " ")}</TableCell>
                    <TableCell className="uppercase">{item.channel}</TableCell>
                    <TableCell className="font-mono text-xs">{item.templateId}</TableCell>
                    <TableCell className="font-mono text-xs">{item.audienceId}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.scheduleAt ? formatDate(item.scheduleAt) : "Sem agenda"}</TableCell>
                    <TableCell className="text-right">
                      <div className="tabular-nums font-medium">{recipients.toLocaleString("pt-BR")}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">
                        Leitura {estimateReadRate(item)}% · Resposta {estimateReplyRate(item)}% · Conv. {estimateConversionRate(item)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                )
              })}
              </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={!!selectedCampaign} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Resumo da Campanha</SheetTitle>
            <SheetDescription>Leitura rápida de performance e contexto operacional.</SheetDescription>
          </SheetHeader>

          {selectedCampaign && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold tracking-tight">{selectedCampaign.name}</div>
                  <Badge variant="secondary" className={cn("gap-1 border-0 font-medium", statusMeta[selectedCampaign.status].className)}>
                    {React.createElement(statusMeta[selectedCampaign.status].icon, { className: "h-3 w-3" })}
                    {statusMeta[selectedCampaign.status].label}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {selectedCampaign.objective.replaceAll("_", " ")} · {selectedCampaign.channel.toUpperCase()} · owner {selectedCampaign.createdBy}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Recipients" value={estimateRecipients(selectedCampaign).toLocaleString("pt-BR")} />
                <MetricCard label="Leitura" value={`${estimateReadRate(selectedCampaign)}%`} />
                <MetricCard label="Resposta" value={`${estimateReplyRate(selectedCampaign)}%`} />
                <MetricCard label="Conversão" value={`${estimateConversionRate(selectedCampaign)}%`} />
              </div>

              <div className="rounded-lg border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Megaphone className="h-4 w-4 text-primary" />
                  Próxima ação sugerida
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {selectedCampaign.status === "draft"
                    ? "Finalizar conteúdo e agenda antes de publicar."
                    : selectedCampaign.status === "paused"
                      ? "Revisar motivo da pausa e decidir retomada."
                      : selectedCampaign.status === "scheduled"
                        ? "Validar janela, audiência e template antes do disparo."
                        : "Acompanhar performance e preparar próximos ajustes."}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button asChild className="w-full" size="sm">
                  <Link href={`/campaigns/${selectedCampaign.id}`}>Abrir detalhe</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/campaigns/${selectedCampaign.id}/edit`}>Editar</Link>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
