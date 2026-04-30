"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
  Workflow,
  Zap,
  AlertTriangle,
  Eye,
} from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { NextActionCard } from "@/components/app-shell/next-action-card"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { PageSection } from "@/components/layout/page-section"
import { SummaryMetricCard } from "@/components/app-shell/summary-metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { automations, type Automation } from "@/lib/mock/automations"
import { cn } from "@/lib/utils"

const categoryColors: Record<Automation["category"], string> = {
  carrinho: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "pos-venda": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  logistica: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  fidelizacao: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  fraude: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
}

const categoryLabels: Record<Automation["category"], string> = {
  carrinho: "Carrinho",
  "pos-venda": "Pós-venda",
  logistica: "Logística",
  fidelizacao: "Fidelização",
  fraude: "Fraude",
}

type StatusFilter = "all" | Automation["status"]

export function AutomationsListView() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<StatusFilter>("all")
  const [selectedAutomation, setSelectedAutomation] = React.useState<Automation | null>(null)

  const filtered = automations.filter((automation) => {
    if (status !== "all" && automation.status !== status) return false
    if (!query.trim()) return true
    const q = query.trim().toLowerCase()
    return [automation.name, automation.description, automation.trigger, automation.lastEditedBy].join(" ").toLowerCase().includes(q)
  })

  const totalActive = automations.filter((a) => a.status === "active").length
  const totalRevenue = automations.reduce((sum, a) => sum + a.revenue30d, 0)
  const totalRuns = automations.reduce((sum, a) => sum + a.triggerCount24h, 0)

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Automações" }]} />
      <PageHeader
        title="Automações"
        description="Orquestração operacional complementar para encadear campanhas, atendimento, integrações e IA sem competir com o fluxo principal do NexxaLife."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Gerar com IA
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href="/automations/new">
                <Plus className="h-3.5 w-3.5" />
                Novo fluxo
              </Link>
            </Button>
          </>
        }
      />

      <section className="mb-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                Encadeamento operacional e inteligência aplicada
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Encadeie campanhas, eventos, integrações e IA sem deslocar o centro operacional principal do NexxaLife.
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                  Automações funciona como camada complementar de orquestração: ela conecta triggers, handoffs, regras e dependências,
                  enquanto dashboard, agenda, checklist e relatórios permanecem como núcleo do fluxo principal.
                </p>
              </div>
            </div>

            <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Orquestração complementar e acionável</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  A prioridade aqui é encadear execução, dependências e automação de impacto, não rotina operacional pessoal diária.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Automations → apps → AI Studio</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  O valor cresce quando canais, eventos, campanhas e agentes operam como malha coordenada em vez de fluxos isolados.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard label="Fluxos ativos" value={`${totalActive}`} hint={`${automations.length} total`} icon={Workflow} />
            <StatCard label="Execuções hoje" value={totalRuns.toLocaleString("pt-BR")} trend={{ value: "+12%", positive: true }} icon={Activity} />
            <StatCard label="Receita 30d" value={`R$ ${(totalRevenue / 1000).toFixed(1)}k`} trend={{ value: "+18%", positive: true }} icon={Zap} />
            <StatCard label="Taxa média de sucesso" value="68%" hint="3 fluxos abaixo de 50%" icon={CheckCircle2} />
          </div>
        </div>
      </section>

      <OperationalAlertBanner
        className="mt-6"
        icon={AlertTriangle}
        title="Automações precisam destacar risco, sucesso e impacto"
        description="Priorize leitura de taxa de sucesso, volume, receita e pontos de degradação antes de escalar ou editar fluxos."
        meta={`${filtered.length} fluxos em foco`}
      />

      <div className="mt-6">
        <Tabs value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="all">Todos</NavTabsTrigger>
              <NavTabsTrigger value="active">Ativos</NavTabsTrigger>
              <NavTabsTrigger value="paused">Pausados</NavTabsTrigger>
              <NavTabsTrigger value="draft">Drafts</NavTabsTrigger>
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="relative lg:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar fluxo..." className="h-9 pl-8" />
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={() => { setStatus("all"); setQuery("") }}>
                Limpar
              </Button>
            </div>
          </div>

          <TabsContent value={status} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="divide-y divide-border">
                {filtered.map((automation) => (
                  <button
                    key={automation.id}
                    type="button"
                    onClick={() => setSelectedAutomation(automation)}
                    className="grid w-full gap-3 p-4 text-left transition-colors hover:bg-accent/50 lg:grid-cols-[1.5fr_0.8fr_0.8fr_auto] lg:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", automation.status === "active" ? "bg-emerald-500" : automation.status === "paused" ? "bg-amber-500" : "bg-muted-foreground")} />
                        <span className="truncate text-sm font-semibold">{automation.name}</span>
                        <Badge variant="secondary" className={cn("border-0 text-[10px] font-medium", categoryColors[automation.category])}>{categoryLabels[automation.category]}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{automation.description}</p>
                      <div className="mt-1 text-xs text-muted-foreground">Trigger · {automation.trigger}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Eye className="h-3 w-3" />monitorado continuamente</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium tabular-nums">{(automation.successRate * 100).toFixed(0)}% sucesso</div>
                      <div className="text-xs text-muted-foreground">{automation.triggerCount24h.toLocaleString("pt-BR")} runs / 24h</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{automation.lastEditedBy}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(automation.lastEditedAt)}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={!!selectedAutomation} onOpenChange={(open) => !open && setSelectedAutomation(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades da Automação</SheetTitle>
            <SheetDescription>Inspecionando fluxo e performance recente.</SheetDescription>
          </SheetHeader>
          
          {selectedAutomation && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold tracking-tight">{selectedAutomation.name}</div>
                  <Badge variant="secondary" className={cn("border-0 text-[10px] font-medium", categoryColors[selectedAutomation.category])}>
                    {categoryLabels[selectedAutomation.category]}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Trigger · {selectedAutomation.trigger}</div>
                <p className="mt-3 text-sm text-muted-foreground">{selectedAutomation.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SummaryMetricCard label="Sucesso" value={`${(selectedAutomation.successRate * 100).toFixed(0)}%`} />
                <SummaryMetricCard label="Runs 24h" value={selectedAutomation.triggerCount24h.toLocaleString("pt-BR")} />
                <SummaryMetricCard label="Receita 30d" value={`R$ ${(selectedAutomation.revenue30d / 1000).toFixed(1)}k`} />
                <SummaryMetricCard label="Status" value={selectedAutomation.status === "active" ? "Ativo" : selectedAutomation.status === "paused" ? "Pausado" : "Draft"} />
              </div>

              <NextActionCard
                description={selectedAutomation.status === "draft"
                  ? "Finalizar regras, validações e condições de entrada antes de publicar o fluxo."
                  : selectedAutomation.status === "paused"
                    ? "Investigar motivo da pausa e decidir retomada apenas após validar impacto operacional."
                    : selectedAutomation.successRate < 0.5
                      ? "Priorizar revisão imediata de falhas, handoffs e dependências externas deste fluxo."
                      : selectedAutomation.successRate < 0.75
                        ? "Acompanhar degradação e revisar pontos de atrito antes de ampliar volume."
                        : "Fluxo saudável. Monitorar crescimento, custo e oportunidades de otimização incremental."}
              />

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button asChild size="sm" className="gap-2 w-full">
                  <Link href={`/automations/${selectedAutomation.id}`}>Abrir detalhe</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-2 w-full">
                  <Link href={`/automations/${selectedAutomation.id}/edit`}>Editar fluxo</Link>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
}
