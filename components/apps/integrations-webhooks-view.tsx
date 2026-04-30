"use client"

import * as React from "react"
import Link from "next/link"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Bug, CheckCircle2, ChevronDown, ChevronUp, Copy, FileJson2, Globe, Loader2, Play, Webhook, Workflow, XCircle, Zap, Clock } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const endpoints = [
  { id: "wh1", name: "Shopify inbound", status: "ativo" as const, url: "https://api.onda.app/webhooks/shopify/orders", events: "orders/create", lastExec: "2026-04-29T02:15:00Z", lastStatus: "success" as const, action: "Criar/atualizar contato", automation: "Onboarding VIP" },
  { id: "wh2", name: "ERP status update", status: "draft" as const, url: "https://api.onda.app/webhooks/erp/status", events: "order.updated", lastExec: null, lastStatus: null, action: null, automation: null },
  { id: "wh3", name: "Payment gateway", status: "erro" as const, url: "https://api.onda.app/webhooks/payments/confirm", events: "payment.confirmed", lastExec: "2026-04-28T18:42:00Z", lastStatus: "error" as const, action: "Enviar confirmação WhatsApp", automation: null },
]

const mappingRows = [
  { source: "customer.email", target: "email", active: true },
  { source: "customer.first_name", target: "first_name", active: true },
  { source: "order.total_price", target: "lifetime_value", active: true },
  { source: "raw.payload", target: "last_order_payload", active: false },
]

const executionLogs = [
  { id: "log1", webhookId: "wh1", timestamp: "2026-04-29T02:15:00Z", status: "success" as const, duration: "142ms", payloadSize: "2.1 KB" },
  { id: "log2", webhookId: "wh1", timestamp: "2026-04-29T01:42:00Z", status: "success" as const, duration: "98ms", payloadSize: "1.8 KB" },
  { id: "log3", webhookId: "wh3", timestamp: "2026-04-28T18:42:00Z", status: "error" as const, duration: "3200ms", payloadSize: "0.4 KB" },
  { id: "log4", webhookId: "wh1", timestamp: "2026-04-28T16:10:00Z", status: "success" as const, duration: "115ms", payloadSize: "2.3 KB" },
]

export function IntegrationsWebhooksView() {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [testing, setTesting] = React.useState<string | null>(null)
  const [testResult, setTestResult] = React.useState<{ id: string; status: "success" | "error"; response: string } | null>(null)

  async function handleTest(id: string) {
    setTesting(id)
    setTestResult(null)
    await new Promise((r) => setTimeout(r, 2000))
    const success = id !== "wh3"
    setTestResult({
      id,
      status: success ? "success" : "error",
      response: success
        ? JSON.stringify({ status: 200, message: "Webhook processado com sucesso", fieldsMatched: 3, actionsTriggered: 1 }, null, 2)
        : JSON.stringify({ status: 500, error: "Connection refused", detail: "O endpoint de destino não respondeu dentro do timeout de 3s" }, null, 2),
    })
    setTesting(null)
    toast[success ? "success" : "error"](success ? "Teste executado com sucesso" : "Falha no teste do webhook")
  }

  const statusConfig = {
    ativo: { label: "Ativo", color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    draft: { label: "Rascunho", color: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    erro: { label: "Erro", color: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "App Store", href: "/apps" }, { label: "Webhooks" }]} />
      <PageHeader
        title="Webhooks"
        description="Endpoints para recebimento de eventos externos com parser JSON, mapeamento, debug e ativação de automações."
        actions={<Button size="sm" className="gap-2"><Zap className="h-3.5 w-3.5" />Novo endpoint</Button>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Endpoints" value={String(endpoints.length)} icon={Webhook} />
        <StatCard label="Ativos" value={String(endpoints.filter((e) => e.status === "ativo").length)} icon={CheckCircle2} hint="operacionais" />
        <StatCard label="Erros" value={String(endpoints.filter((e) => e.status === "erro").length)} icon={XCircle} hint="requer atenção" />
        <StatCard label="Execuções" value={String(executionLogs.length)} icon={Clock} hint="últimas 24h" />
      </div>

      <Tabs defaultValue="endpoints" className="mt-6">
        <NavTabsList className="mb-6">
          <NavTabsTrigger value="endpoints">Endpoints Configurados</NavTabsTrigger>
          <NavTabsTrigger value="mapping">Mapping de Payload</NavTabsTrigger>
          <NavTabsTrigger value="teste">Payload de Teste</NavTabsTrigger>
        </NavTabsList>

        <TabsContent value="endpoints" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Endpoints Configurados</h3>
              <p className="text-sm text-muted-foreground">URLs que receberão payloads externos. Clique para expandir debug, bindings e teste.</p>
            </div>
            <div className="space-y-3">
              {endpoints.map((ep) => {
                const isExpanded = expandedId === ep.id
                const cfg = statusConfig[ep.status]
                return (
                  <div key={ep.id} className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between transition-colors hover:bg-accent/20 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : ep.id)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{ep.name}</span>
                          <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", cfg.color)}>{cfg.label}</span>
                          {ep.lastStatus === "success" && <span className="text-[10px] text-emerald-600 dark:text-emerald-400">✓ Último teste OK</span>}
                          {ep.lastStatus === "error" && <span className="text-[10px] text-rose-600 dark:text-rose-400">✕ Última falha</span>}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Evento: <span className="font-mono">{ep.events}</span></div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground">{ep.url}</div>
                          <button type="button" className="text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); void navigator.clipboard.writeText(ep.url); toast.success("URL copiada") }}>
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" disabled={testing === ep.id} onClick={() => void handleTest(ep.id)}>
                          {testing === ep.id ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Testando...</> : <><Play className="h-3.5 w-3.5" />Testar</>}
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border bg-muted/20 p-5 space-y-5">
                        {/* Bindings */}
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="rounded-lg border border-border bg-card p-4">
                            <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-2"><Zap className="h-3.5 w-3.5" />Ação vinculada</div>
                            {ep.action ? (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{ep.action}</span>
                                <Badge variant="secondary" className="text-[10px]">Ativo</Badge>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">Nenhuma ação vinculada</div>
                            )}
                          </div>
                          <div className="rounded-lg border border-border bg-card p-4">
                            <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-2"><Workflow className="h-3.5 w-3.5" />Automação vinculada</div>
                            {ep.automation ? (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{ep.automation}</span>
                                <Badge variant="secondary" className="text-[10px]">Ativo</Badge>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">Nenhuma automação vinculada</div>
                            )}
                          </div>
                        </div>

                        {/* Test result */}
                        {testResult?.id === ep.id && (
                          <div className={cn("rounded-lg border p-4", testResult.status === "success" ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5")}>
                            <div className="flex items-center gap-2 mb-2">
                              {testResult.status === "success" ? <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />}
                              <span className="text-sm font-semibold">{testResult.status === "success" ? "Teste executado com sucesso" : "Falha no teste"}</span>
                            </div>
                            <pre className="overflow-x-auto rounded-md bg-background/80 p-3 text-xs text-muted-foreground">{testResult.response}</pre>
                          </div>
                        )}

                        {/* Execution logs */}
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Últimas execuções</div>
                          <div className="rounded-lg border border-border bg-card divide-y divide-border">
                            {executionLogs.filter((l) => l.webhookId === ep.id).slice(0, 3).map((log) => (
                              <div key={log.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                                <div className="flex items-center gap-2">
                                  {log.status === "success" ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <XCircle className="h-3.5 w-3.5 text-rose-500" />}
                                  <span className="font-mono text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>{log.duration}</span>
                                  <span>{log.payloadSize}</span>
                                </div>
                              </div>
                            ))}
                            {executionLogs.filter((l) => l.webhookId === ep.id).length === 0 && (
                              <div className="px-4 py-3 text-sm text-muted-foreground">Nenhuma execução registrada</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mapping" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Mapping de Payload</h3>
              <p className="text-sm text-muted-foreground">Tradução entre campos externos e campos internos da plataforma.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              {mappingRows.map((row) => (
                <div key={row.target} className="grid gap-3 rounded-lg border border-border bg-background/50 p-3 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">source</div>
                    <div className="font-mono text-sm">{row.source}</div>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">target</div>
                    <div className="font-medium text-sm">{row.target}</div>
                  </div>
                  <Badge variant={row.active ? "secondary" : "outline"} className="hidden md:inline-flex text-[10px]">{row.active ? "ativo" : "inativo"}</Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teste" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Payload de Teste</h3>
              <p className="text-sm text-muted-foreground">Envie payloads de exemplo para validar parsing e mapeamento.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="mb-2 flex items-center gap-2 font-medium text-sm"><FileJson2 className="h-4 w-4 text-primary" />Sample payload</div>
                <pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify({ customer: { email: "vip@onda.app", first_name: "Bianca" }, order: { total_price: 1249, tags: ["vip", "retarget"] }, source: "shopify" }, null, 2)}</pre>
              </div>
              <Button variant="outline" className="w-full gap-2"><Play className="h-4 w-4" />Executar teste inbound</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
