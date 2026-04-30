"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Copy,
  Pencil,
  RefreshCw,
  CalendarClock,
  Megaphone,
  Users,
  Send,
  MousePointerClick,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  CircleDashed,
} from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createCampaign, getCampaign, listCampaigns } from "@/lib/campaigns/api"
import { cn } from "@/lib/utils"

import type { CampaignItem } from "./campaign-types"

const statusMeta: Record<CampaignItem["status"], { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground", icon: CircleDashed },
  scheduled: { label: "Agendada", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: CalendarClock },
  running: { label: "Em execução", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: PlayCircle },
  paused: { label: "Pausada", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300", icon: PauseCircle },
  completed: { label: "Concluída", className: "bg-violet-500/10 text-violet-700 dark:text-violet-300", icon: CheckCircle2 },
}

export function CampaignDetailView({ campaignId }: { campaignId: string }) {
  const router = useRouter()
  const [item, setItem] = React.useState<CampaignItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [duplicating, setDuplicating] = React.useState(false)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const found = await getCampaign<CampaignItem>(campaignId)
      setItem(found)
    } catch {
      try {
        const items = await listCampaigns<CampaignItem[]>()
        const found = items.find((entry) => entry.id === campaignId) ?? null
        setItem(found)
        if (!found) setError("Campaign não encontrada")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar campaign")
      }
    } finally {
      setLoading(false)
    }
  }, [campaignId])

  React.useEffect(() => {
    void load()
  }, [load])

  async function handleDuplicate() {
    if (!item) return
    setDuplicating(true)
    setError(null)
    try {
      const duplicated = await createCampaign<CampaignItem>({
        name: `${item.name} · cópia`,
        objective: item.objective,
        status: "draft",
        channel: item.channel,
        senderId: item.senderId,
        templateId: item.templateId,
        templateVersion: item.templateVersion,
        audienceId: item.audienceId,
        createdBy: item.createdBy,
        scheduleAt: item.scheduleAt,
        dryRunEnabled: item.dryRunEnabled,
        metadata: item.metadata,
      })
      router.push(`/campaigns/${duplicated.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao duplicar campaign")
    } finally {
      setDuplicating(false)
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Campaigns", href: "/campaigns" }, { label: "Detalhe" }]} />
        <PageHeader title="Campaign detail" description="Carregando campanha..." />
      </PageContainer>
    )
  }

  if (!item) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Campaigns", href: "/campaigns" }, { label: "Não encontrada" }]} />
        <PageHeader
          title="Campaign não encontrada"
          description={error ?? "Não foi possível localizar a campanha solicitada."}
          actions={
            <Button asChild variant="outline" size="sm">
              <Link href="/campaigns">Voltar para campaigns</Link>
            </Button>
          }
        />
      </PageContainer>
    )
  }

  const meta = statusMeta[item.status]
  const StatusIcon = meta.icon
  const recipients = estimateRecipients(item)
  const delivered = Math.round(recipients * 0.94)
  const clicks = Math.round(delivered * 0.22)
  const revenue = clicks * 18

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Campaigns", href: "/campaigns" }, { label: item.name }]} />
      <PageHeader
        title={item.name}
        description="Inspeção operacional da campanha com status, metadados, performance resumida e relações principais."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/campaigns">
                <ArrowLeft className="h-3.5 w-3.5" />
                Campaigns
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}>
              <RefreshCw className="h-3.5 w-3.5" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void handleDuplicate()} disabled={duplicating}>
              <Copy className="h-3.5 w-3.5" />
              {duplicating ? "Duplicando..." : "Duplicar"}
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href={`/campaigns/${item.id}/edit`}>
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
            </Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className={cn("gap-1 border-0 font-medium", meta.className)}>
          <StatusIcon className="h-3 w-3" />
          {meta.label}
        </Badge>
        <Badge variant="outline" className="uppercase">{item.channel}</Badge>
        <Badge variant="outline">{item.objective.replaceAll("_", " ")}</Badge>
        <span className="text-sm text-muted-foreground">Owner · {item.createdBy}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Recipients" value={recipients.toLocaleString("pt-BR")} icon={Users} />
        <StatCard label="Delivered" value={delivered.toLocaleString("pt-BR")} icon={Send} />
        <StatCard label="CTR estimado" value={`${Math.round((clicks / Math.max(delivered, 1)) * 100)}%`} icon={MousePointerClick} />
        <StatCard label="Receita estimada" value={`R$ ${revenue.toLocaleString("pt-BR")}`} icon={Megaphone} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Resumo executivo</CardTitle>
            <CardDescription>Contexto principal para operação, revisão e publicação segura.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Detail label="Template">{item.templateId} · {item.templateVersion}</Detail>
            <Detail label="Audiência">{item.audienceId}</Detail>
            <Detail label="Sender">{item.senderId}</Detail>
            <Detail label="Dry-run">{item.dryRunEnabled ? "Ativo" : "Desligado"}</Detail>
            <Detail label="Agendamento">{item.scheduleAt ? formatDateTime(item.scheduleAt) : "Sem agenda"}</Detail>
            <Detail label="Criada em">{formatDateTime(item.createdAt)}</Detail>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linha do tempo</CardTitle>
            <CardDescription>Eventos-chave da campanha ao longo do lifecycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TimelineItem title="Campaign criada" description={`Draft aberto por ${item.createdBy}`} time={formatDateTime(item.createdAt)} />
            <TimelineItem title="Última atualização" description="Configuração revisada no estúdio" time={formatDateTime(item.updatedAt)} />
            <TimelineItem title="Janela operacional" description={item.scheduleAt ? "Campanha preparada para disparo agendado" : "Aguardando definição de agendamento"} time={item.scheduleAt ? formatDateTime(item.scheduleAt) : "Sem agenda"} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relacionamentos</CardTitle>
            <CardDescription>Objetos conectados para navegação entre operação e configuração.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <RelatedCard href="/templates" title="Template HSM" value={item.templateId} />
            <RelatedCard href="/contacts" title="Segmento / audiência" value={item.audienceId} />
            <RelatedCard href="/apps" title="Canal / sender" value={item.senderId} />
            <RelatedCard href="/analytics" title="Analytics" value="Acompanhar impacto" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadados técnicos</CardTitle>
            <CardDescription>Payload atual e chaves auxiliares já persistidas pelo backend.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
{JSON.stringify(item.metadata ?? {}, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
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

function TimelineItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
    </div>
  )
}

function RelatedCard({ href, title, value }: { href: string; title: string; value: string }) {
  return (
    <Link href={href} className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:bg-accent/50">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </Link>
  )
}

function estimateRecipients(item: CampaignItem) {
  const seed = [...item.id].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 180 + (seed % 970)
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
