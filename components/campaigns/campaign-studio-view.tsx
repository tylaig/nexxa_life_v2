"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, SendHorizonal, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { UnsavedChangesDialog } from "@/components/ui/unsaved-changes-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCampaign, getCampaign, listCampaigns, updateCampaign } from "@/lib/campaigns/api"
import { templates } from "@/lib/mock/templates"

import type { CampaignItem } from "./campaign-types"

type CampaignStudioViewProps = {
  mode: "create" | "edit"
  campaignId?: string
}

type CampaignFormState = {
  name: string
  objective: string
  status: CampaignItem["status"]
  channel: string
  senderId: string
  templateId: string
  templateVersion: string
  audienceId: string
  createdBy: string
  scheduleAt: string
  dryRunEnabled: boolean
  metadataJson: string
}

const defaultForm: CampaignFormState = {
  name: "",
  objective: "recover_cart",
  status: "draft",
  channel: "whatsapp",
  senderId: "sender_main",
  templateId: templates[0]?.id ?? "tmpl_default",
  templateVersion: "v1",
  audienceId: "aud_saved_01",
  createdBy: "samuel",
  scheduleAt: "",
  dryRunEnabled: false,
  metadataJson: JSON.stringify({ compliance: "needs_review", owner_team: "crm" }, null, 2),
}

export function CampaignStudioView({ mode, campaignId }: CampaignStudioViewProps) {
  const router = useRouter()
  const [form, setForm] = React.useState<CampaignFormState>(defaultForm)
  const [loading, setLoading] = React.useState(mode === "edit")
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(false)

  React.useEffect(() => {
    if (mode !== "edit" || !campaignId) return

    let active = true
    function hydrateForm(item: CampaignItem) {
      setForm({
        name: item.name,
        objective: item.objective,
        status: item.status,
        channel: item.channel,
        senderId: item.senderId,
        templateId: item.templateId,
        templateVersion: item.templateVersion,
        audienceId: item.audienceId,
        createdBy: item.createdBy,
        scheduleAt: toDatetimeLocal(item.scheduleAt),
        dryRunEnabled: item.dryRunEnabled,
        metadataJson: JSON.stringify(item.metadata ?? {}, null, 2),
      })
    }

    void getCampaign<CampaignItem>(campaignId)
      .then((item) => {
        if (!active) return
        hydrateForm(item)
      })
      .catch(async (err) => {
        if (!active) return
        const fallbackItems = await listCampaigns<CampaignItem[]>().catch(() => [])
        const fallback = fallbackItems.find((entry) => entry.id === campaignId)

        if (fallback) {
          hydrateForm(fallback)
          setError(null)
          return
        }

        setError(err instanceof Error ? err.message : "Falha ao carregar campaign")
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [campaignId, mode])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    let metadata: Record<string, unknown> = {}
    try {
      metadata = form.metadataJson.trim() ? (JSON.parse(form.metadataJson) as Record<string, unknown>) : {}
    } catch {
      setSaving(false)
      setError("Metadata deve ser um JSON válido")
      return
    }

    const payload = {
      name: form.name,
      objective: form.objective,
      status: form.status,
      channel: form.channel,
      senderId: form.senderId,
      templateId: form.templateId,
      templateVersion: form.templateVersion,
      audienceId: form.audienceId,
      createdBy: form.createdBy,
      scheduleAt: form.scheduleAt ? new Date(form.scheduleAt).toISOString() : undefined,
      dryRunEnabled: form.dryRunEnabled,
      metadata,
    }

    try {
      const item =
        mode === "create"
          ? await createCampaign<CampaignItem>(payload)
          : await updateCampaign<CampaignItem>(campaignId!, payload)

      toast.success(mode === "create" ? "Campaign criada com sucesso" : "Campaign atualizada com sucesso")
      router.push(`/campaigns/${item.id}`)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao salvar campaign"
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const selectedTemplate = templates.find((template) => template.id === form.templateId)

  return (
    <PageContainer className="pb-28">
      <AppBreadcrumbs items={mode === "create" ? [{ label: "Campaigns", href: "/campaigns" }, { label: "Nova campaign" }] : [{ label: "Campaigns", href: "/campaigns" }, ...(campaignId ? [{ label: "Detalhe", href: `/campaigns/${campaignId}` }] : []), { label: "Editar" }]} />
      <PageHeader
        title={mode === "create" ? "Nova campaign" : `Editar · ${form.name || "campaign"}`}
        description="Editor full screen estruturado por seções, com contexto lateral e footer fixo para salvar com segurança."
        actions={
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href={mode === "edit" && campaignId ? `/campaigns/${campaignId}` : "/campaigns"}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </Link>
          </Button>
        }
      />

      {loading ? <p className="text-sm text-muted-foreground">Carregando editor...</p> : null}

      {!loading ? (
        <form className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <SectionCard title="Dados básicos" description="Identidade principal da campanha e lifecycle operacional.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nome">
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Carrinho 24h · VIP" />
                </Field>
                <Field label="Objetivo">
                  <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })}>
                    <option value="recover_cart">Recuperar carrinho</option>
                    <option value="payment_retry">Recuperar pagamento</option>
                    <option value="cross_sell">Cross-sell</option>
                    <option value="winback">Win-back</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as CampaignItem["status"] })}>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Agendada</option>
                    <option value="running">Em execução</option>
                    <option value="paused">Pausada</option>
                    <option value="completed">Concluída</option>
                  </select>
                </Field>
                <Field label="Owner">
                  <Input value={form.createdBy} onChange={(e) => setForm({ ...form, createdBy: e.target.value })} />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Canal, sender e template" description="Bindings principais para envio, aprovação e personalização.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Canal">
                  <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </Field>
                <Field label="Sender">
                  <Input value={form.senderId} onChange={(e) => setForm({ ...form, senderId: e.target.value })} />
                </Field>
                <Field label="Template">
                  <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.templateId} onChange={(e) => setForm({ ...form, templateId: e.target.value })}>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Versão do template">
                  <Input value={form.templateVersion} onChange={(e) => setForm({ ...form, templateVersion: e.target.value })} />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Audiência e orquestração" description="Segmentação principal e regra de janela operacional.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Audience / segmento">
                  <Input value={form.audienceId} onChange={(e) => setForm({ ...form, audienceId: e.target.value })} />
                </Field>
                <Field label="Agendamento">
                  <Input type="datetime-local" value={form.scheduleAt} onChange={(e) => setForm({ ...form, scheduleAt: e.target.value })} />
                </Field>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={form.dryRunEnabled} onChange={(e) => setForm({ ...form, dryRunEnabled: e.target.checked })} />
                Habilitar dry-run / validação antes de publicar
              </label>
            </SectionCard>

            <SectionCard title="Governança e parâmetros técnicos" description="Metadados adicionais para compliance, testes e ownership futuro.">
              <Field label="Metadata JSON">
                <Textarea rows={10} value={form.metadataJson} onChange={(e) => setForm({ ...form, metadataJson: e.target.value })} className="font-mono text-xs" />
              </Field>
            </SectionCard>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Prévia operacional</CardTitle>
                <CardDescription>Resumo rápido para revisão antes de salvar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <PreviewRow label="Campaign">{form.name || "Sem nome"}</PreviewRow>
                <PreviewRow label="Objetivo">{form.objective}</PreviewRow>
                <PreviewRow label="Canal">{form.channel}</PreviewRow>
                <PreviewRow label="Template">{selectedTemplate?.name ?? form.templateId}</PreviewRow>
                <PreviewRow label="Audience">{form.audienceId}</PreviewRow>
                <PreviewRow label="Janela">{form.scheduleAt ? new Date(form.scheduleAt).toLocaleString("pt-BR") : "Sem agenda"}</PreviewRow>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">Status · {form.status}</Badge>
                  <Badge variant="outline">Dry-run · {form.dryRunEnabled ? "on" : "off"}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template vinculado</CardTitle>
                <CardDescription>Contexto do HSM atual selecionado.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl bg-emerald-500/10 p-3 text-sm leading-relaxed">
                  {selectedTemplate?.body ?? "Selecione um template para ver a prévia."}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <Link href="/templates">
                    <Sparkles className="h-3.5 w-3.5" />
                    Ver catálogo de templates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
              <div className="text-sm text-muted-foreground">
                {error ? <span className="text-rose-600">{error}</span> : "Revise template, audiência e janela antes de salvar."}
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setShowUnsavedDialog(true)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving || !form.name.trim()} className="gap-2">
                  <Save className="h-3.5 w-3.5" />
                  {saving ? "Salvando..." : mode === "create" ? "Criar campaign" : "Salvar alterações"}
                </Button>
                <Button type="button" variant="outline" className="gap-2" disabled>
                  <SendHorizonal className="h-3.5 w-3.5" />
                  Publicar depois
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        onDiscard={() => {
          setShowUnsavedDialog(false)
          router.push(mode === "edit" && campaignId ? `/campaigns/${campaignId}` : "/campaigns")
        }}
      />
    </PageContainer>
  )
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{children}</div>
    </div>
  )
}

function toDatetimeLocal(value?: string | null) {
  if (!value) return ""
  const date = new Date(value)
  const pad = (input: number) => String(input).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
