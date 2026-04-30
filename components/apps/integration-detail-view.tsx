"use client"

import * as React from "react"
import Link from "next/link"
import { Activity, ArrowLeft, Clock3, RefreshCw, ShieldCheck, Trash2, ArrowRightLeft, KeyRound, Wrench, Play, FileJson2 } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getIntegration, runIntegrationHealthCheck } from "@/lib/integrations/api"

import { integrationMockCatalog } from "./integration-mock-catalog"
import { IntegrationExecutionConsole } from "./integration-execution-console"
import type { IntegrationItem } from "./integration-types"

export function IntegrationDetailView({ integrationId }: { integrationId: string }) {
  const [item, setItem] = React.useState<IntegrationItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [validating, setValidating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItem(await getIntegration<IntegrationItem>(integrationId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar integração")
    } finally {
      setLoading(false)
    }
  }, [integrationId])

  React.useEffect(() => { void load() }, [load])

  async function handleValidate() {
    if (!item) return
    setValidating(true)
    setError(null)
    setMessage(null)
    try {
      const result = await runIntegrationHealthCheck<IntegrationItem>({
        provider: item.provider,
        displayName: item.displayName,
        baseUrl: item.baseUrl,
        authMode: item.authMode,
        configPublic: item.configPublic ?? {},
      })
      setItem((current) => current ? { ...current, healthStatus: result.healthStatus, checkedAt: result.checkedAt, status: result.status } : current)
      const nextMessage = `Health check concluído com status ${result.healthStatus ?? result.status}`
      setMessage(nextMessage)
      toast.success(nextMessage)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao validar integração"
      setError(message)
      toast.error(message)
    } finally {
      setValidating(false)
    }
  }

  const preset = item ? integrationMockCatalog.find((entry) => entry.provider === item.provider) : null

  if (!loading && !item) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Integrações", href: "/apps" }, { label: "Não encontrada" }]} />
        <PageHeader title="Integração não encontrada" description="Não foi possível localizar a conexão solicitada." actions={<Button asChild variant="outline" size="sm"><Link href="/apps">Voltar</Link></Button>} />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Integrações", href: "/apps" }, { label: item?.displayName ?? "Integração" }]} />
      <PageHeader
        title={item?.displayName ?? "Integração"}
        description="Inspeção operacional da conexão com status, capacidades, configuração pública, credenciais e readiness para tools/webhooks."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/apps"><ArrowLeft className="h-3.5 w-3.5" />Lista</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void handleValidate()} disabled={validating || !item}><ShieldCheck className="h-3.5 w-3.5" />{validating ? "Validando..." : "Health check"}</Button>
            {item ? <Button asChild variant="outline" size="sm" className="gap-2"><Link href={`/apps/${item.id}/mapping`}><ArrowRightLeft className="h-3.5 w-3.5" />Mapping</Link></Button> : null}
            {item ? <Button asChild variant="outline" size="sm" className="gap-2"><Link href={`/apps/${item.id}/edit`}><KeyRound className="h-3.5 w-3.5" />Credenciais</Link></Button> : null}
            {item ? <Button asChild size="sm"><Link href={`/apps/${item.id}/edit`}>Editar</Link></Button> : null}
            <ConfirmDialog
              title="Desconectar integração?"
              description="Esta ação é uma simulação visual por enquanto e representa a futura remoção/desconexão controlada do provider."
              confirmLabel="Desconectar"
              destructive
              onConfirm={() => { toast.success("Fluxo de desconexão confirmado (placeholder visual).") }}
              trigger={<Button variant="outline" size="sm" className="gap-2"><Trash2 className="h-3.5 w-3.5" />Desconectar</Button>}
            />
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{item?.healthStatus ?? item?.status ?? "unknown"}</Badge>
        {item?.provider ? <Badge variant="outline">{item.provider}</Badge> : null}
        {item?.authMode ? <Badge variant="outline">{item.authMode}</Badge> : null}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Provider" value={item?.provider ?? "—"} icon={Activity} />
        <StatCard label="Auth" value={item?.authMode ?? "—"} icon={KeyRound} />
        <StatCard label="Última validação" value={item?.checkedAt ? formatDate(item.checkedAt) : "—"} icon={Clock3} />
        <StatCard label="Tools" value={String(preset?.tools.length ?? 0)} hint="ações do provider" icon={Wrench} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração pública</CardTitle>
              <CardDescription>Parâmetros expostos para operação, sem segredos sensíveis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Detail label="Base URL">{item?.baseUrl}</Detail>
              <Detail label="Display name">{item?.displayName}</Detail>
              <Detail label="Payload público"><pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify(item?.configPublic ?? {}, null, 2)}</pre></Detail>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observabilidade</CardTitle>
              <CardDescription>Leitura rápida do estado atual da integração.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Status atual: <span className="font-medium text-foreground">{item?.healthStatus ?? item?.status ?? "unknown"}</span></p>
              <p>Última checagem: <span className="font-medium text-foreground">{item?.checkedAt ? formatDate(item.checkedAt) : "nenhuma validação registrada"}</span></p>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="flex items-center gap-2 font-medium text-foreground"><FileJson2 className="h-4 w-4 text-primary" />Webhook readiness</div>
                <div className="mt-1 text-xs text-muted-foreground">Base pronta para mapping, parser JSON, debug e ativação inbound.</div>
              </div>
              {message ? <p className="text-emerald-600">{message}</p> : null}
              {error ? <p className="text-rose-600">{error}</p> : null}
            </CardContent>
          </Card>

          <IntegrationExecutionConsole tool={preset?.tools[0]} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Capacidades e uso</CardTitle>
            <CardDescription>Resumo do provider para vínculo futuro com agentes e automações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border bg-background/50 p-3 text-sm text-muted-foreground">
              Esta conexão pode ser ativada em contextos de agentes e fluxos quando a configuração estrutural estiver pronta.
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(preset?.capabilities ?? []).map((capability) => <Badge key={capability} variant="outline" className="text-[10px]">{capability}</Badge>)}
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-3 text-sm">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Credenciais</div>
              <div className="mt-1 font-medium">{preset?.credentials.mode ?? "—"}</div>
              <div className="text-xs text-muted-foreground">{preset?.credentials.storage ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-3 text-sm">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Limits & counters</div>
              <div className="mt-1 font-medium">Limite {preset?.limitPerWorkspace ?? 0} / workspace</div>
              <div className="text-xs text-muted-foreground">Uso acumulado {preset?.usageCount?.toLocaleString("pt-BR") ?? "0"}</div>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-3 text-sm">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Workspace activation</div>
              <div className="mt-1 font-medium">Conector pronto para vínculo operacional</div>
              <div className="text-xs text-muted-foreground">Use o editor para ajustar credenciais, schema público e postura de ativação.</div>
            </div>
            <Button variant="outline" className="w-full gap-2"><Play className="h-4 w-4" />Abrir execução mock</Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-sm font-medium">{children}</div></div>
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}
