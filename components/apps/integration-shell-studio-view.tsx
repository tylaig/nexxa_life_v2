"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Save, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UnsavedChangesDialog } from "@/components/ui/unsaved-changes-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createIntegration, getIntegration, runIntegrationHealthCheck, updateIntegration } from "@/lib/integrations/api"

import { integrationMockCatalog } from "./integration-mock-catalog"
import { IntegrationCredentialsPanel } from "./integration-credentials-panel"
import { IntegrationExecutionConsole } from "./integration-execution-console"
import type { IntegrationItem } from "./integration-types"

type Props = {
  mode: "create" | "edit"
  integrationId?: string
}

const operationalPresets = integrationMockCatalog.filter((item) =>
  ["n8n", "supabase", "openai"].includes(item.provider)
)

export function IntegrationShellStudioView({ mode, integrationId }: Props) {
  const preset = operationalPresets[0] ?? integrationMockCatalog[0]
  const [loading, setLoading] = React.useState(mode === "edit")
  const [saving, setSaving] = React.useState(false)
  const [validating, setValidating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [createdId, setCreatedId] = React.useState<string | null>(null)
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(false)
  const [form, setForm] = React.useState({
    provider: preset.provider,
    displayName: preset.displayName,
    baseUrl: preset.baseUrl,
    authMode: preset.authMode,
    notes: "Configuração mock inicial. Persistência real e segredos entram em rodada futura.",
    status: "draft",
  })
  const selectedPreset =
    operationalPresets.find((item) => item.provider === form.provider) ??
    integrationMockCatalog.find((item) => item.provider === form.provider) ??
    preset

  React.useEffect(() => {
    const id = integrationId
    if (mode !== "edit" || !id) return

    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const item = await getIntegration<IntegrationItem>(id as string)
        if (cancelled) return
        setForm({
          provider: item.provider,
          displayName: item.displayName,
          baseUrl: item.baseUrl,
          authMode: item.authMode,
          notes: typeof item.configPublic?.notes === "string" ? item.configPublic.notes : "Configuração existente.",
          status: item.status,
        })
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Falha ao carregar integração")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [integrationId, mode])

  async function handleCreate() {
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const item = await createIntegration<IntegrationItem>({
        provider: form.provider,
        displayName: form.displayName,
        baseUrl: form.baseUrl,
        authMode: form.authMode,
        status: "draft",
        configPublic: {
          mockProvider: form.provider,
          notes: form.notes,
        },
      })
      setCreatedId(item.id)
      const nextMessage = "Integração criada com sucesso. Agora ela já pode ser inspecionada no detalhe."
      setMessage(nextMessage)
      toast.success(nextMessage)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao criar integração"
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveEdit() {
    if (!integrationId) return
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const item = await updateIntegration<IntegrationItem>(integrationId, {
        displayName: form.displayName,
        baseUrl: form.baseUrl,
        authMode: form.authMode,
        status: form.status,
        configPublic: {
          mockProvider: form.provider,
          notes: form.notes,
        },
      })
      const nextMessage = `Integração ${item.displayName} atualizada com sucesso.`
      setMessage(nextMessage)
      toast.success(nextMessage)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao salvar integração"
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  async function handleValidate() {
    setValidating(true)
    setError(null)
    setMessage(null)
    try {
      await runIntegrationHealthCheck({
        provider: form.provider,
        displayName: form.displayName,
        baseUrl: form.baseUrl,
        authMode: form.authMode,
        configPublic: {
          mockProvider: form.provider,
          notes: form.notes,
        },
      })
      setMessage("Health check mock executado com sucesso.")
      toast.success("Health check mock executado com sucesso.")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao validar integração"
      setError(message)
      toast.error(message)
    } finally {
      setValidating(false)
    }
  }

  const breadcrumbItems = mode === "create"
    ? [{ label: "Integrações", href: "/apps" }, { label: "Nova integração" }]
    : [{ label: "Integrações", href: "/apps" }, ...(integrationId ? [{ label: "Detalhe", href: `/apps/${integrationId}` }] : []), { label: "Editar" }]

  return (
    <PageContainer className="pb-28">
      <AppBreadcrumbs items={breadcrumbItems} />
      <PageHeader
        title={mode === "create" ? "Nova integração" : "Editar integração"}
        description="Configuração estrutural de providers com base URL, auth mode, schema dinâmico, credenciais, validação operacional e contexto de ativação futura."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href={integrationId ? `/apps/${integrationId}` : "/apps"}><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Configuração</CardTitle>
            <CardDescription>Dados principais da conexão e parâmetros mock iniciais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Provider">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.provider} onChange={(e) => {
                const next = operationalPresets.find((item) => item.provider === e.target.value)
                if (!next) return
                setForm((current) => ({ ...current, provider: next.provider, displayName: next.displayName, baseUrl: next.baseUrl, authMode: next.authMode }))
              }}>
                {operationalPresets.map((item) => <option key={item.provider} value={item.provider}>{item.displayName}</option>)}
              </select>
            </Field>
            <Field label="Nome"><Input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} disabled={loading} /></Field>
            <Field label="Base URL"><Input value={form.baseUrl} onChange={(e) => setForm({ ...form, baseUrl: e.target.value })} disabled={loading} /></Field>
            <Field label="Auth mode"><Input value={form.authMode} onChange={(e) => setForm({ ...form, authMode: e.target.value })} disabled={loading} /></Field>
            <Field label="Notas"><Textarea rows={6} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} disabled={loading} /></Field>

            <div className="rounded-xl border border-dashed border-border p-4">
              <div className="text-sm font-medium">Schema dinâmico do provider</div>
              <div className="mt-1 text-sm text-muted-foreground">Prévia dos campos configuráveis, credenciais e preparação para parser JSON.</div>
              <div className="mt-3 space-y-2">
                {(selectedPreset?.schema ?? []).map((field) => (
                  <div key={field.key} className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-sm">
                    <div>
                      <div className="font-medium">{field.label}</div>
                      <div className="text-xs text-muted-foreground">{field.key} · {field.type}{field.required ? " · obrigatório" : ""}</div>
                    </div>
                    <Badge variant="outline">schema</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo operacional</CardTitle>
              <CardDescription>Contexto rápido para ativação futura por agente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Provider</div>
                <div className="mt-1 font-medium">{form.displayName}</div>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Ativação futura</div>
                <div className="mt-1 text-muted-foreground">Disponível para vínculo em agentes e automações após configuração mock.</div>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Credenciais</div>
                <div className="mt-1 font-medium">{selectedPreset?.credentials.mode}</div>
                <div className="text-xs text-muted-foreground">{selectedPreset?.credentials.storage}</div>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Limits & counters</div>
                <div className="mt-1 font-medium">Limite {selectedPreset?.limitPerWorkspace ?? 0} / workspace</div>
                <div className="text-xs text-muted-foreground">Uso acumulado {selectedPreset?.usageCount.toLocaleString("pt-BR") ?? "0"}</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(selectedPreset?.capabilities ?? []).map((capability) => <Badge key={capability} variant="outline" className="text-[10px]">{capability}</Badge>) }
              </div>
              {createdId ? <Button asChild className="w-full"><Link href={`/apps/${createdId}`}>Abrir detalhe da integração</Link></Button> : null}
              {mode === "edit" && integrationId ? <Button asChild variant="outline" className="w-full"><Link href={`/apps/${integrationId}`}>Abrir detalhe atual</Link></Button> : null}
              {message ? <p className="text-emerald-600">{message}</p> : null}
              {error ? <p className="text-rose-600">{error}</p> : null}
            </CardContent>
          </Card>

          <IntegrationCredentialsPanel
            mode={selectedPreset?.credentials.mode}
            storage={selectedPreset?.credentials.storage}
          />

          <Card>
            <CardHeader>
              <CardTitle>Validação</CardTitle>
              <CardDescription>Rode um teste rápido antes de ativar a conexão em produção.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2" onClick={() => void handleValidate()} disabled={validating || loading}>
                <ShieldCheck className="h-3.5 w-3.5" />
                {validating ? "Validando..." : "Executar health check"}
              </Button>
            </CardContent>
          </Card>

          <IntegrationExecutionConsole tool={selectedPreset?.tools[0]} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="text-sm text-muted-foreground">{mode === "create" ? "Crie a integração primeiro e depois siga para inspeção detalhada." : "Edição conectada ao backend de integrações com fallback local quando necessário."}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowUnsavedDialog(true)}>Cancelar</Button>
            {mode === "create" ? (
              <Button onClick={() => void handleCreate()} disabled={saving || loading || !form.displayName.trim()} className="gap-2"><Save className="h-3.5 w-3.5" />{saving ? "Criando..." : "Criar integração"}</Button>
            ) : (
              <Button onClick={() => void handleSaveEdit()} disabled={saving || loading || !form.displayName.trim()} className="gap-2"><Save className="h-3.5 w-3.5" />{saving ? "Salvando..." : "Salvar alterações"}</Button>
            )}
          </div>
        </div>
      </div>
      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        onDiscard={() => {
          setShowUnsavedDialog(false)
          window.location.href = integrationId ? `/apps/${integrationId}` : "/apps"
        }}
      />
    </PageContainer>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}
