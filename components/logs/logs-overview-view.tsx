"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, Clock3, DatabaseZap, FileClock, Filter, Radar, Search, ChevronRight, CheckCircle2 } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { NextActionCard } from "@/components/app-shell/next-action-card"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { SummaryMetricCard } from "@/components/app-shell/summary-metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const logItems = [
  { id: "log_1", source: "knowledge.retrieval", level: "info", message: "Consulta com 5 matches retornada com sucesso.", time: "há 3 min" },
  { id: "log_2", source: "integrations.shopify", level: "warning", message: "Token expira em menos de 24h para Games Safari.", time: "há 11 min" },
  { id: "log_3", source: "agents.concierge-vip", level: "error", message: "Falha transitória ao buscar fonte externa de policy.", time: "há 26 min" },
  { id: "log_4", source: "storage.assets", level: "info", message: "Upload concluído: /vip-assets/cupons/abril-2026.pdf", time: "há 34 min" },
  { id: "log_5", source: "integrations.tool.execute", level: "info", message: "Payload JSON de input salvo para tool create_order no provider ERP.", time: "há 41 min" },
]

export function LogsOverviewView() {
  const [query, setQuery] = React.useState("")
  const [scope, setScope] = React.useState<"all" | "critical" | "integrations" | "agents" | "storage">("all")
  const [selectedLogId, setSelectedLogId] = React.useState<string | null>(null)

  const filteredLogs = logItems.filter((log) => {
    if (scope === "critical" && log.level !== "error") return false
    if (scope === "integrations" && !log.source.startsWith("integrations")) return false
    if (scope === "agents" && !log.source.startsWith("agents")) return false
    if (scope === "storage" && !log.source.startsWith("storage")) return false
    if (query.trim()) {
      const haystack = [log.id, log.source, log.level, log.message, log.time].join(" ").toLowerCase()
      if (!haystack.includes(query.trim().toLowerCase())) return false
    }
    return true
  })

  const selectedLog = logItems.find((log) => log.id === selectedLogId) ?? null

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Logs" }]} />
      <PageHeader
        title="Logs do workspace"
        description="Análise operacional de eventos, falhas, pipelines, health checks e atividades geradas por agentes, integrações e storage."
        actions={<Button asChild variant="outline" size="sm"><Link href="/knowledge/logs">Ver logs de knowledge</Link></Button>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Eventos 24h" value="28.4k" icon={FileClock} />
        <StatCard label="Warnings" value="41" icon={AlertTriangle} />
        <StatCard label="Errors" value="7" icon={DatabaseZap} />
        <StatCard label="Latência média" value="284ms" icon={Clock3} />
      </div>

      <OperationalAlertBanner
        className="mt-6"
        icon={AlertTriangle}
        title="Logs precisam destacar anomalias e origem do problema antes de virarem apenas volume de eventos"
        description="Use esta visão para encontrar rapidamente falhas críticas, integrações instáveis e gargalos operacionais do workspace."
        meta="7 erros · 41 warnings nas últimas 24h"
      />

      <div className="mt-6">
        <Tabs value={scope} onValueChange={(v) => setScope(v as typeof scope)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="all">Todos</NavTabsTrigger>
              <NavTabsTrigger value="critical">Erros críticos</NavTabsTrigger>
              <NavTabsTrigger value="integrations">Integrações</NavTabsTrigger>
              <NavTabsTrigger value="agents">Agentes</NavTabsTrigger>
              <NavTabsTrigger value="storage">Storage</NavTabsTrigger>
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="relative lg:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar source, mensagem ou id..." className="h-9 pl-8" />
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => { setQuery(""); setScope("all") }}>Limpar</Button>
            </div>
          </div>

          <TabsContent value={scope} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="divide-y divide-border">
                {filteredLogs.map((log) => (
                  <button key={log.id} type="button" onClick={() => setSelectedLogId(log.id)} className={cn("w-full text-left p-4 transition-colors hover:bg-accent/50", selectedLogId === log.id && "bg-accent/40")}>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{log.source}</Badge>
                      <Badge variant={log.level === "error" ? "destructive" : "secondary"}>{log.level}</Badge>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                      <span className="ml-auto text-muted-foreground"><ChevronRight className="h-4 w-4" /></span>
                    </div>
                    <div className="mt-2 text-sm font-medium">{log.message}</div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      {log.level === "error"
                        ? "Ação sugerida: investigar dependência externa e validar fallback operacional."
                        : log.level === "warning"
                          ? "Ação sugerida: acompanhar degradação antes de virar incidente."
                          : "Ação sugerida: manter apenas observabilidade de rotina."}
                    </div>
                  </button>
                ))}
                {filteredLogs.length === 0 && (
                  <div className="py-12 text-center text-sm text-muted-foreground">Nenhum evento encontrado para o filtro atual.</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLogId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Inspeção de Evento</SheetTitle>
            <SheetDescription>Visão detalhada do log selecionado para acelerar triagem operacional.</SheetDescription>
          </SheetHeader>
          
          {selectedLog && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedLog.source}</Badge>
                  <Badge variant={selectedLog.level === "error" ? "destructive" : "secondary"}>{selectedLog.level}</Badge>
                </div>
                <div className="mt-3 text-lg font-medium">{selectedLog.message}</div>
                <div className="mt-2 text-xs text-muted-foreground font-mono">{selectedLog.id} · {selectedLog.time}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SummaryMetricCard label="Nível" value={selectedLog.level} />
                <SummaryMetricCard label="Origem" value={selectedLog.source.split(".")[0]} />
                <SummaryMetricCard label="Escopo" value={scope === "all" ? "Geral" : scope} />
                <SummaryMetricCard label="Prioridade" value={selectedLog.level === "error" ? "Alta" : selectedLog.level === "warning" ? "Média" : "Baixa"} />
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Raw Data</div>
                <div className="font-mono text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(selectedLog, null, 2)}
                </div>
              </div>

              <NextActionCard
                icon={CheckCircle2}
                description={selectedLog.level === "error"
                  ? "Abrir investigação técnica, validar dependência envolvida e registrar fallback aplicado."
                  : selectedLog.level === "warning"
                    ? "Monitorar degradação, revisar tendência e antecipar correção antes de impacto maior."
                    : "Sem ação corretiva imediata. Manter evento apenas como observabilidade operacional."}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}
