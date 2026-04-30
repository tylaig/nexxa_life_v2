"use client"

import * as React from "react"
import Link from "next/link"
import { Bot, BrainCircuit, Building2, ChevronRight, MessageSquare, Plus, ShieldCheck, Sparkles, Star, Workflow, AlertTriangle, GaugeCircle, Microscope } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { agents } from "@/lib/mock/ai-agents"
import { tenants } from "@/lib/mock/tenants"
import { cn } from "@/lib/utils"

const statusConfig = {
  live: { label: "Em produção", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  shadow: { label: "Sombra", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
} as const

export function AiStudioShellView() {
  const liveAgents = agents.filter((agent) => agent.status === "live")
  const shadowAgents = agents.filter((agent) => agent.status === "shadow")
  const avgCsat = agents.reduce((sum, agent) => sum + agent.csat, 0) / agents.length
  const activeWorkspace = tenants[0]
  const [tab, setTab] = React.useState<"all" | "live" | "shadow" | "draft">("all")
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(agents[0]?.id ?? null)

  const visibleAgents =
    tab === "all"
      ? agents
      : tab === "live"
        ? liveAgents
        : tab === "shadow"
          ? shadowAgents
          : agents.filter((agent) => agent.status === "draft")

  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId) ?? visibleAgents[0] ?? null

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "AI Studio" }]} />
      <PageHeader
        title="AI Studio"
        description="Superfície unificada para apresentar agentes, integrações, conhecimento conectado e postura operacional do workspace de IA."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/apps">
                <BrainCircuit className="h-3.5 w-3.5" />
                Integrações
              </Link>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <Link href="/ai-studio/agents/new">
                <Plus className="h-3.5 w-3.5" />
                Novo agente
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Agentes live" value={String(liveAgents.length)} hint={`${agents.length} total`} icon={Bot} />
        <StatCard label="Conversas IA · 30d" value={agents.reduce((s, a) => s + a.conversations30d, 0).toLocaleString("pt-BR")} icon={MessageSquare} />
        <StatCard label="CSAT médio" value={avgCsat.toFixed(1).replace(".", ",")} hint="performance consolidada" icon={Star} />
        <StatCard label="Workspace" value={activeWorkspace.name} hint="ambiente ativo" icon={Building2} />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertTriangle className="h-4 w-4 text-[var(--status-pending)]" />
              AI Studio precisa comunicar postura operacional, não só catálogo de agentes
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Priorize clareza entre agentes em produção, shadow testing, bindings ativos e lacunas de governança antes de expandir a malha.
            </p>
          </div>
          <div className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            {liveAgents.length} live · {shadowAgents.length} shadow
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-background">
            <CardTitle>Roster operacional de agentes</CardTitle>
            <CardDescription>Apresentação mais coerente dos agentes por estágio operacional, com contexto resumido, integrações e métricas principais.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={tab} onValueChange={(value) => setTab(value as "all" | "live" | "shadow" | "draft")} className="gap-0">
              <div className="border-b border-border px-4 pt-3">
                <NavTabsList className="gap-6 border-0">
                  <NavTabsTrigger value="all">Todos</NavTabsTrigger>
                  <NavTabsTrigger value="live">Live</NavTabsTrigger>
                  <NavTabsTrigger value="shadow">Shadow</NavTabsTrigger>
                  <NavTabsTrigger value="draft">Draft</NavTabsTrigger>
                </NavTabsList>
              </div>
              <TabsContent value={tab} className="space-y-0">
                {visibleAgents.map((agent) => renderAgentCard(agent, selectedAgentId, setSelectedAgentId))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Arquitetura ativa</CardTitle>
              <CardDescription>Como o estúdio organiza o trabalho de IA neste workspace.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <MiniSurface href="/ai-studio/agents" title="Agentes" description="Catálogo completo, filtros, detalhe e edição full screen." icon={Bot} />
              <MiniSurface href="/knowledge" title="Knowledge" description="Grounding e contexto operacional para respostas e decisões." icon={ShieldCheck} />
              <MiniSurface href="/apps" title="Integrações" description="Bindings ativáveis por agente e conectores externos." icon={BrainCircuit} />
              <MiniSurface href="/settings/workspace" title="Workspace" description="Políticas e contexto do ambiente que alimenta toda a malha de IA." icon={Workflow} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do agente</CardTitle>
              <CardDescription>Leitura operacional rápida do agente selecionado.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedAgent ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{selectedAgent.name}</div>
                      <Badge variant="secondary" className={cn("border-0 font-medium", statusConfig[selectedAgent.status].className)}>{statusConfig[selectedAgent.status].label}</Badge>
                      <Badge variant="outline" className="text-[10px]">{selectedAgent.model}</Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{selectedAgent.role}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{selectedAgent.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <MiniInfo icon={GaugeCircle} label="Deflection">{`${Math.round(selectedAgent.deflectionRate * 100)}%`}</MiniInfo>
                    <MiniInfo icon={Sparkles} label="CSAT">{selectedAgent.csat.toFixed(1).replace(".", ",")}</MiniInfo>
                    <MiniInfo icon={MessageSquare} label="30d">{selectedAgent.conversations30d.toLocaleString("pt-BR")}</MiniInfo>
                    <MiniInfo icon={Workflow} label="Escalação">{`${Math.round(selectedAgent.escalationRate * 100)}%`}</MiniInfo>
                  </div>

                  <div className="rounded-lg border border-dashed border-border p-3">
                    <div className="text-sm font-medium">Próxima ação sugerida</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedAgent.status === "draft"
                        ? "Finalizar guardrails, bindings e critérios de ativação antes de mover para shadow."
                        : selectedAgent.status === "shadow"
                          ? "Comparar performance com baseline humano e validar risco antes de produção."
                          : selectedAgent.escalationRate > 0.25
                            ? "Revisar handoff, cobertura de tools e lacunas de contexto para reduzir escalonamento."
                            : "Monitorar qualidade, custo e oportunidades de expansão com governança controlada."}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bindings ativos</div>
                    <div className="space-y-2">
                      {selectedAgent.platformBindings.map((binding) => (
                        <div key={`${selectedAgent.id}-${binding.provider}`} className="rounded-lg border border-border bg-background/50 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-sm font-medium">{binding.displayName}</div>
                            <Badge variant="outline" className="text-[10px]">{binding.status}</Badge>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{binding.configSummary}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checklist de operação</CardTitle>
              <CardDescription>Sinais rápidos de maturidade da malha atual.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <MiniInfo icon={GaugeCircle} label="Deflection médio">{`${Math.round((agents.reduce((sum, agent) => sum + agent.deflectionRate, 0) / agents.length) * 100)}%`}</MiniInfo>
              <MiniInfo icon={Microscope} label="Guardrails mapeados">{String(agents.reduce((sum, agent) => sum + agent.guardrails.length, 0))}</MiniInfo>
              <MiniInfo icon={BrainCircuit} label="Bindings conectados">{String(agents.flatMap((agent) => agent.platformBindings.filter((binding) => binding.status === "connected")).length)}</MiniInfo>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

function renderAgentCard(
  agent: (typeof agents)[number],
  selectedAgentId: string | null,
  setSelectedAgentId: (id: string) => void
) {
  return (
    <button key={agent.id} type="button" onClick={() => setSelectedAgentId(agent.id)} className={cn("block w-full border-b border-border text-left transition-colors hover:bg-accent/40 last:border-b-0", selectedAgentId === agent.id && "bg-accent/40")}>
      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">{agent.avatar}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-sm font-semibold">{agent.name}</div>
                <Badge variant="secondary" className={cn("border-0 font-medium", statusConfig[agent.status].className)}>{statusConfig[agent.status].label}</Badge>
                <Badge variant="outline" className="text-[10px]">{agent.model}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{agent.role}</div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {agent.platformBindings.slice(0, 3).map((binding) => <Badge key={`${agent.id}-${binding.provider}`} variant="outline" className="text-[10px]">{binding.displayName}</Badge>)}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/60 p-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Deflection" value={`${(agent.deflectionRate * 100).toFixed(0)}%`} />
            <Metric label="CSAT" value={agent.csat.toFixed(1).replace(".", ",")} />
            <Metric label="Latência" value={`${agent.avgLatencyMs}ms`} />
            <Metric label="30d" value={agent.conversations30d.toLocaleString("pt-BR")} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{agent.tools.length} tools</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </button>
  )
}

function MiniSurface({ href, title, description, icon: Icon }: { href: string; title: string; description: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Link href={href} className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-medium">{value}</div></div>
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-medium">{children}</div></div>
}

function MiniInfo({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{children}</div>
    </div>
  )
}
