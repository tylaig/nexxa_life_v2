"use client"

import * as React from "react"
import Link from "next/link"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, KeyRound, ShieldCheck, Wrench, CheckCircle2, XCircle, Loader2, Settings2, Zap, Lock } from "lucide-react"
import { integrationMockCatalog } from "./integration-mock-catalog"
import { cn } from "@/lib/utils"

export function IntegrationsProvidersView() {
  const nativeProviders = integrationMockCatalog.filter((item) => item.category === "native")
  const customProviders = integrationMockCatalog.filter((item) => item.category === "custom")
  const [configOpen, setConfigOpen] = React.useState<string | null>(null)
  const [testing, setTesting] = React.useState<string | null>(null)
  const [testResults, setTestResults] = React.useState<Record<string, "success" | "error">>({})

  async function handleTestConnection(provider: string) {
    setTesting(provider)
    await new Promise((r) => setTimeout(r, 1500))
    setTestResults((prev) => ({ ...prev, [provider]: "success" }))
    setTesting(null)
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "App Store", href: "/apps" }, { label: "Providers" }]} />
      <PageHeader
        title="Providers"
        description="Catálogo técnico de provedores, credenciais e tools reutilizáveis que alimentam seus Apps e Agentes."
        actions={<Button size="sm" className="gap-2"><Zap className="h-3.5 w-3.5" />Novo provider</Button>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Providers" value={String(integrationMockCatalog.length)} icon={BrainCircuit} />
        <StatCard label="Tools" value={String(integrationMockCatalog.reduce((sum, item) => sum + item.tools.length, 0))} icon={Wrench} />
        <StatCard label="Credenciais" value="Server-only" icon={KeyRound} hint="criptografadas" />
        <StatCard label="Governança" value="Ativa" icon={ShieldCheck} hint="limits + auth mode" />
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Providers Nativos</h3>
          <p className="text-sm text-muted-foreground">Integrações first-party mantidas pela plataforma. Cada uma requer configuração de credenciais.</p>
        </div>
        <div className="space-y-3">
          {nativeProviders.map((item) => (
            <div key={item.provider} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.displayName}</span>
                      <Badge variant="outline" className="text-[10px]">Native</Badge>
                      {testResults[item.provider] === "success" && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Conectado
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.authMode} · {item.tools.length} tools · limite {item.limitPerWorkspace}/workspace</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.capabilities.map((cap) => <Badge key={cap} variant="secondary" className="text-[10px]">{cap}</Badge>)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setConfigOpen(configOpen === item.provider ? null : item.provider)}>
                    <Settings2 className="h-3.5 w-3.5" />Configurar
                  </Button>
                  <Button size="sm" className="gap-1.5 text-xs" disabled={testing === item.provider} onClick={() => void handleTestConnection(item.provider)}>
                    {testing === item.provider ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Testando...</> : <><ShieldCheck className="h-3.5 w-3.5" />Testar conexão</>}
                  </Button>
                </div>
              </div>
              {configOpen === item.provider && (
                <div className="border-t border-border bg-muted/30 p-5">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Configuração de credenciais</div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.schema.map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-foreground">{field.label} {field.required && <span className="text-rose-500">*</span>}</label>
                        <div className="mt-1 relative">
                          <Input className="h-9 pr-8" type={field.type === "password" ? "password" : "text"} placeholder={field.placeholder ?? `Insira ${field.label.toLowerCase()}`} />
                          {field.type === "password" && <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Credenciais armazenadas com criptografia server-side</span>
                    <Button size="sm" className="text-xs">Salvar configuração</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {customProviders.length > 0 && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Providers Custom</h3>
            <p className="text-sm text-muted-foreground">Provedores configurados manualmente para integrações externas.</p>
          </div>
          <div className="space-y-3">
            {customProviders.map((item) => (
              <div key={item.provider} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.displayName}</span>
                      <Badge variant="outline" className="text-[10px]">Custom</Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.authMode} · {item.tools.length} tools · {item.schema.length} campos</div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setConfigOpen(configOpen === item.provider ? null : item.provider)}>
                    <Settings2 className="h-3.5 w-3.5" />Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  )
}

