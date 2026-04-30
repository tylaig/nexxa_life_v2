"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Save, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { templates, type HsmCategory, type HsmStatus } from "@/lib/mock/templates"

import { TemplatePreviewPanel } from "./template-preview"

type Props = {
  mode: "create" | "edit"
  templateId?: string
}

export function TemplateStudioView({ mode, templateId }: Props) {
  const template = templates.find((item) => item.id === templateId) ?? templates[0]

  function notifyPlanned(action: string) {
    toast.success(`${action} registrado no frontend-first. Persistência editorial e publicação entram na próxima rodada.`)
  }

  const [form, setForm] = React.useState({
    name: mode === "edit" ? template?.name ?? "" : "",
    category: (mode === "edit" ? template?.category : "MARKETING") as HsmCategory,
    language: mode === "edit" ? template?.language ?? "pt_BR" : "pt_BR",
    status: (mode === "edit" ? template?.status : "pending") as HsmStatus,
    header: mode === "edit" ? template?.header ?? "" : "",
    body: mode === "edit" ? template?.body ?? "" : "",
    footer: mode === "edit" ? template?.footer ?? "" : "",
    buttons: mode === "edit" ? template?.buttons?.map((button) => button.label).join("\n") ?? "" : "",
    variables: mode === "edit" ? template?.variables.join(", ") ?? "" : "",
  })

  const previewTemplate = {
    ...template,
    name: form.name || "novo_template",
    category: form.category,
    language: form.language,
    status: form.status,
    header: form.header || undefined,
    body: form.body,
    footer: form.footer || undefined,
    buttons: form.buttons
      .split("\n")
      .map((label) => label.trim())
      .filter(Boolean)
      .map((label) => ({ kind: "quick_reply" as const, label })),
    variables: form.variables.split(",").map((item) => item.trim()).filter(Boolean),
  }

  return (
    <PageContainer className="pb-28">
      <AppBreadcrumbs items={mode === "create" ? [{ label: "Templates", href: "/templates" }, { label: "Novo template" }] : [{ label: "Templates", href: "/templates" }, ...(templateId ? [{ label: "Detalhe", href: `/templates/${templateId}` }] : []), { label: "Editar" }]} />
      <PageHeader
        title={mode === "create" ? "Novo template" : `Editar · ${template?.name ?? "template"}`}
        description="Editor full screen para governança de conteúdo, variáveis, status e preview por canal."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href={mode === "edit" && templateId ? `/templates/${templateId}` : "/templates"}><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          <SectionCard title="Identidade" description="Metadados principais e estado do template.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Idioma"><Input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} /></Field>
              <Field label="Categoria">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as HsmCategory })}>
                  <option value="MARKETING">Marketing</option>
                  <option value="UTILITY">Utility</option>
                  <option value="AUTHENTICATION">Authentication</option>
                </select>
              </Field>
              <Field label="Status">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as HsmStatus })}>
                  <option value="pending">Em revisão</option>
                  <option value="approved">Aprovado</option>
                  <option value="paused">Pausado</option>
                  <option value="rejected">Rejeitado</option>
                </select>
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Conteúdo" description="Estrutura principal do HSM com header, body, footer e quick replies.">
            <div className="space-y-4">
              <Field label="Header"><Input value={form.header} onChange={(e) => setForm({ ...form, header: e.target.value })} /></Field>
              <Field label="Body"><Textarea rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="font-mono text-sm" /></Field>
              <Field label="Footer"><Input value={form.footer} onChange={(e) => setForm({ ...form, footer: e.target.value })} /></Field>
              <Field label="Botões (1 por linha)"><Textarea rows={4} value={form.buttons} onChange={(e) => setForm({ ...form, buttons: e.target.value })} /></Field>
              <Field label="Variáveis (separadas por vírgula)"><Input value={form.variables} onChange={(e) => setForm({ ...form, variables: e.target.value })} /></Field>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Governança</CardTitle>
              <CardDescription>Resumo rápido para revisão antes da publicação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{form.category}</Badge>
                <Badge variant="outline">{form.language}</Badge>
                <Badge variant="outline">{form.status}</Badge>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Checklist</div>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• conteúdo revisado para compliance</li>
                  <li>• placeholders validados</li>
                  <li>• quick replies alinhados ao objetivo</li>
                </ul>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => notifyPlanned("Sugestão de variante") }>
                <Sparkles className="h-3.5 w-3.5" />
                Sugerir variante
              </Button>
            </CardContent>
          </Card>

          <TemplatePreviewPanel template={previewTemplate} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="text-sm text-muted-foreground">Preview local ativo. Persistência real do editor entra na próxima rodada.</div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href={mode === "edit" && templateId ? `/templates/${templateId}` : "/templates"}>Cancelar</Link></Button>
            <Button className="gap-2" onClick={() => notifyPlanned(mode === "create" ? "Criação de template" : "Salvar template")}><Save className="h-3.5 w-3.5" />{mode === "create" ? "Criar template" : "Salvar alterações"}</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent>{children}</CardContent></Card>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}
