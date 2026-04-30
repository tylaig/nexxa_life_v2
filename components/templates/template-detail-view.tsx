"use client"

import Link from "next/link"
import { ArrowLeft, Eye, MousePointerClick, Pencil, Send, ShieldCheck } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { templates } from "@/lib/mock/templates"
import { cn } from "@/lib/utils"

import { TemplatePreviewPanel } from "./template-preview"

const statusConfig = {
  approved: { label: "Aprovado", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  pending: { label: "Em revisão", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  rejected: { label: "Rejeitado", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300" },
  paused: { label: "Pausado pela Meta", className: "bg-muted text-muted-foreground" },
} as const

export function TemplateDetailView({ templateId }: { templateId: string }) {
  const template = templates.find((item) => item.id === templateId)

  if (!template) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Templates", href: "/templates" }, { label: "Não encontrado" }]} />
        <PageHeader
          title="Template não encontrado"
          description="Não foi possível localizar o template solicitado."
          actions={<Button asChild variant="outline" size="sm"><Link href="/templates">Voltar</Link></Button>}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Templates", href: "/templates" }, { label: template.name }]} />
      <PageHeader
        title={template.name}
        description="Detalhe operacional do template com preview, métricas, metadados e governança inicial."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/templates"><ArrowLeft className="h-3.5 w-3.5" />Templates</Link></Button>
            <Button asChild size="sm" className="gap-2"><Link href={`/templates/${template.id}/edit`}><Pencil className="h-3.5 w-3.5" />Editar</Link></Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className={cn("border-0 font-medium", statusConfig[template.status].className)}>{statusConfig[template.status].label}</Badge>
        <Badge variant="outline">{template.category}</Badge>
        <Badge variant="outline">{template.language}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Entrega" value={`${(template.deliveryRate * 100).toFixed(1)}%`} icon={Send} />
        <StatCard label="Read rate" value={`${(template.readRate * 100).toFixed(0)}%`} icon={Eye} />
        <StatCard label="CTR" value={`${(template.ctr * 100).toFixed(0)}%`} icon={MousePointerClick} />
        <StatCard label="Block rate" value={`${(template.blockRate * 100).toFixed(2)}%`} icon={ShieldCheck} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Metadados principais e indicadores de uso do template.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Detail label="Nome">{template.name}</Detail>
              <Detail label="Idioma">{template.language}</Detail>
              <Detail label="Categoria">{template.category}</Detail>
              <Detail label="Último uso">{template.lastUsedAt ? formatDateTime(template.lastUsedAt) : "Sem uso recente"}</Detail>
              <Detail label="Envios 30d">{template.sentLast30d.toLocaleString("pt-BR")}</Detail>
              <Detail label="Variáveis">{template.variables.length}</Detail>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
              <CardDescription>Estrutura atual aprovada e pronta para revisão.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {template.header ? <Detail label="Header">{template.header}</Detail> : null}
              <Detail label="Body"><pre className="whitespace-pre-wrap text-sm">{template.body}</pre></Detail>
              {template.footer ? <Detail label="Footer">{template.footer}</Detail> : null}
              <Detail label="Botões">{template.buttons?.map((button) => button.label).join(", ") || "Sem botões"}</Detail>
            </CardContent>
          </Card>
        </div>

        <TemplatePreviewPanel template={template} />
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{children}</div>
    </div>
  )
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
}
