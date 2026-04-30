"use client"

import * as React from "react"
import Link from "next/link"
import { Plug, RefreshCw, ShieldCheck, Plus, ChevronRight, FolderTree, Rows3, Wrench, GaugeCircle, Webhook, ArrowRightLeft, Settings2, AlertTriangle, CircleCheck, CircleDashed, AppWindow } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { listIntegrations, runIntegrationHealthCheck } from "@/lib/integrations/api"

import { integrationMockCatalog } from "./integration-mock-catalog"
import type { IntegrationItem } from "./integration-types"

export function IntegrationsListView() {
  const [items, setItems] = React.useState<IntegrationItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [validatingProvider, setValidatingProvider] = React.useState<string | null>(null)
  const [tab, setTab] = React.useState("instalados")

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const nextItems = await listIntegrations<IntegrationItem[]>()
      setItems(nextItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar apps")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  async function handleValidate(provider: string) {
    const preset = integrationMockCatalog.find((item) => item.provider === provider)
    if (!preset) return
    setValidatingProvider(provider)
    try {
      await runIntegrationHealthCheck({
        provider: "n8n",
        displayName: preset.displayName,
        baseUrl: preset.baseUrl,
        authMode: preset.authMode,
        configPublic: { mockProvider: provider },
      })
    } finally {
      setValidatingProvider(null)
    }
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "App Store" }]} />
      <PageHeader
        title="App Store & Conexões"
        description="Catálogo de aplicativos, provedores e ferramentas conectadas que expandem as capacidades do seu workspace e agentes de IA."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/apps/providers"><FolderTree className="h-3.5 w-3.5" />Configurar Providers</Link></Button>
            <Button asChild size="sm" className="gap-2"><Link href="/apps/new"><Plus className="h-3.5 w-3.5" />Adicionar App</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Instalados" value={String(items.length)} hint="apps conectados" icon={AppWindow} />
        <StatCard label="Healthy" value={String(items.filter((item) => item.healthStatus === "validated").length)} hint="operando sem erros" icon={ShieldCheck} />
        <StatCard label="Tools" value={String(integrationMockCatalog.reduce((sum, item) => sum + item.tools.length, 0))} hint="ações reutilizáveis" icon={Wrench} />
        <StatCard label="Providers" value={String(integrationMockCatalog.length)} hint="catálogo nativo" icon={Plug} />
      </div>




      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <NavTabsList className="mb-6">
          <NavTabsTrigger value="instalados">Instalados</NavTabsTrigger>
          <NavTabsTrigger value="catalogo">Descobrir Apps</NavTabsTrigger>
          <NavTabsTrigger value="embreve">Em breve</NavTabsTrigger>
        </NavTabsList>

        <TabsContent value="instalados" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Meus Apps</h3>
                <p className="text-sm text-muted-foreground">Aplicativos instalados e operacionais no seu workspace. Eles fornecem contexto e actions para os agentes de IA.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => void load()}><RefreshCw className="mr-2 h-4 w-4" />Atualizar</Button>
            </div>
            <div className="rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {loading ? <div className="p-4 text-sm text-muted-foreground">Carregando apps instalados...</div> : null}
                {!loading && items.length === 0 ? <div className="p-4 text-sm text-muted-foreground">Nenhum aplicativo instalado ainda.</div> : null}
                {items.map((item, index) => {
                  const preset = integrationMockCatalog.find((entry) => entry.provider === item.provider)
                  return (
                    <div key={item.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between transition-colors hover:bg-accent/30">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                          <AppWindow className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{item.displayName}</div>
                            {item.healthStatus === "validated" ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-resolved-bg)] bg-[var(--status-resolved-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--status-resolved)]">
                                <CircleCheck className="h-3 w-3" />
                                Operacional
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--status-pending)]">
                                <CircleDashed className="h-3 w-3" />
                                Validando Auth
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">Conectado via {item.provider} ({item.authMode})</div>
                          <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                            <span className="rounded-md border border-border bg-background/50 px-2 py-1">{preset?.tools.length ?? 0} actions ativas</span>
                            <span className="rounded-md border border-border bg-background/50 px-2 py-1">auth check: {item.healthStatus ?? item.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button asChild variant="outline" size="sm"><Link href={`/apps/${item.id}/edit`}>Configurar</Link></Button>
                        <Button asChild size="sm"><Link href={`/apps/${item.id}`}>Acessar App</Link></Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="catalogo" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Descobrir Apps</h3>
                <p className="text-sm text-muted-foreground">Catálogo de aplicativos e providers nativos disponíveis para instalação no workspace.</p>
              </div>
              <Button asChild variant="outline" size="sm"><Link href="/apps/catalog">Ver todo catálogo</Link></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {integrationMockCatalog.filter((item) => item.category === "native").slice(0, 6).map((item) => (
                <div key={item.provider} className="flex flex-col justify-between rounded-xl border border-border bg-card p-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Plug className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">Native</Badge>
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{item.displayName}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Provider: {item.provider}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.capabilities.map((cap) => <Badge key={cap} variant="outline" className="text-[10px] border-dashed">{cap}</Badge>)}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="w-full text-xs"><Link href={`/apps/providers`}>Provider Specs</Link></Button>
                    <Button size="sm" className="w-full text-xs" variant="secondary" disabled={validatingProvider === item.provider} onClick={() => void handleValidate(item.provider)}>
                      {validatingProvider === item.provider ? "Testando..." : "Instalar"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="embreve" className="m-0 border-0 p-0 outline-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Em Breve</h3>
              <p className="text-sm text-muted-foreground">Aplicativos em desenvolvimento que estarão disponíveis para instalação em futuras atualizações.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "HubSpot CRM", desc: "Sincronize contatos, deals e pipelines com HubSpot", emoji: "🟠" },
                { name: "Zendesk", desc: "Importe tickets e gerencie atendimento multi-canal", emoji: "🟢" },
                { name: "Notion", desc: "Conecte bases de conhecimento e wikis da equipe", emoji: "⬛" },
                { name: "Stripe Payments", desc: "Gerencie cobranças, assinaturas e invoices", emoji: "🟣" },
              ].map((app) => (
                <div key={app.name} className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 opacity-60">
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider border-dashed">Coming soon</Badge>
                  </div>
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xl">{app.emoji}</div>
                    <h3 className="mt-4 font-semibold text-foreground">{app.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{app.desc}</p>
                  </div>
                  <div className="mt-5">
                    <Button variant="outline" size="sm" className="w-full text-xs" disabled>Disponível em breve</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </PageContainer>
  )
}
