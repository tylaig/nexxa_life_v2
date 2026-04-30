"use client"

import Link from "next/link"
import { Activity, ArrowLeft, Pencil, Play, Workflow } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { automations } from "@/lib/mock/automations"
import { cn } from "@/lib/utils"

import { AutomationFlowCanvas } from "./automation-flow-canvas"

export function AutomationDetailView({ automationId }: { automationId: string }) {
  const automation = automations.find((item) => item.id === automationId)

  if (!automation) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Automações", href: "/automations" }, { label: "Não encontrado" }]} />
        <PageHeader title="Fluxo não encontrado" description="Não foi possível localizar a automação solicitada." actions={<Button asChild variant="outline" size="sm"><Link href="/automations">Voltar</Link></Button>} />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Automações", href: "/automations" }, { label: automation.name }]} />
      <PageHeader
        title={automation.name}
        description="Inspeção operacional do fluxo como camada complementar de orquestração do NexxaLife, com resumo, métricas, dependências e mapa visual reduzido."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/automations"><ArrowLeft className="h-3.5 w-3.5" />Automações</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Timeline detalhada de runs entra na próxima rodada. Use o builder e os cards de dependência para inspeção nesta fase.")}><Activity className="h-3.5 w-3.5" />Logs</Button>
            <Button asChild size="sm" className="gap-2"><Link href={`/automations/${automation.id}/edit`}><Pencil className="h-3.5 w-3.5" />Editar fluxo</Link></Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className={cn("border-0 font-medium", automation.status === "active" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : automation.status === "paused" ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" : "bg-muted text-muted-foreground")}>{automation.status === "active" ? "Ativo" : automation.status === "paused" ? "Pausado" : "Rascunho"}</Badge>
        <Badge variant="outline">{automation.trigger}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Execuções 24h" value={automation.triggerCount24h.toLocaleString("pt-BR")} icon={Workflow} />
        <StatCard label="Sucesso" value={`${(automation.successRate * 100).toFixed(0)}%`} icon={Play} />
        <StatCard label="Receita 30d" value={`R$ ${automation.revenue30d.toLocaleString("pt-BR")}`} icon={Activity} />
        <StatCard label="Última edição" value={formatDate(automation.lastEditedAt)} hint={automation.lastEditedBy} icon={Pencil} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Mapa do fluxo</CardTitle>
            <CardDescription>Visual reduzido para inspeção operacional antes de entrar no builder.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto bg-[radial-gradient(circle_at_1px_1px,_var(--border)_1px,_transparent_0)] [background-size:16px_16px] p-0">
            <AutomationFlowCanvas flow={automation.flow} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Contexto e metadados principais do fluxo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Detail label="Descrição">{automation.description}</Detail>
              <Detail label="Trigger">{automation.trigger}</Detail>
              <Detail label="Owner">{automation.lastEditedBy}</Detail>
              <Detail label="Nós no fluxo">{automation.flow.length}</Detail>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dependências</CardTitle>
              <CardDescription>Relações principais para navegação entre módulos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Related href="/templates" label="Templates" value="HSM e mensagens" />
              <Related href="/ai-studio/agents" label="Agentes" value="IA e personalização" />
              <Related href="/apps" label="Integrações" value="Shopify, ERP, canais" />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-sm font-medium">{children}</div></div>
}

function Related({ href, label, value }: { href: string; label: string; value: string }) {
  return <Link href={href} className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:bg-accent/50"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-sm font-medium">{value}</div></Link>
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
}
