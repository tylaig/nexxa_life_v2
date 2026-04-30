"use client"

import * as React from "react"
import Link from "next/link"
import { Bot, BrainCircuit, CheckCircle2, Plus, Search, Sparkles } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { agents, type AiAgent } from "@/lib/mock/ai-agents"
import { cn } from "@/lib/utils"

type StatusFilter = "all" | AiAgent["status"]

const statusConfig = {
  live: { label: "Em produção", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  shadow: { label: "Sombra", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
} as const

export function AiStudioAgentsBoardView() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<StatusFilter>("all")

  const filtered = agents.filter((agent) => {
    if (status !== "all" && agent.status !== status) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const hay = [agent.name, agent.role, agent.description, agent.model, agent.tools.join(" "), agent.platformBindings.map((binding) => binding.displayName).join(" ")].join(" ").toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "AI Studio", href: "/ai-studio" }, { label: "Agentes" }]} />
      <PageHeader
        title="Agentes"
        description="Board operacional com apresentação mais clara dos agentes, suas métricas principais e integrações conectadas."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href="/ai-studio">
                <Sparkles className="h-3.5 w-3.5" />
                Voltar ao AI Studio
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
        <StatCard label="Live" value={String(agents.filter((agent) => agent.status === "live").length)} icon={Bot} />
        <StatCard label="Shadow" value={String(agents.filter((agent) => agent.status === "shadow").length)} icon={Sparkles} />
        <StatCard label="Drafts" value={String(agents.filter((agent) => agent.status === "draft").length)} icon={BrainCircuit} />
        <StatCard label="Deflection médio" value="68%" icon={CheckCircle2} />
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          {(["all", "live", "shadow", "draft"] as StatusFilter[]).map((value) => (
            <button key={value} onClick={() => setStatus(value)} className={cn("rounded-md px-2.5 py-1 text-xs font-medium transition-colors", status === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-accent")}>{value === "all" ? "Todos" : statusConfig[value].label}</button>
          ))}
        </div>
        <div className="relative lg:ml-auto lg:w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar agente, modelo, integração..." className="h-9 pl-8" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((agent) => (
          <Link key={agent.id} href={`/ai-studio/agents/${agent.id}`}>
            <Card className="h-full transition-colors hover:bg-accent/40">
              <CardContent className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">{agent.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate text-sm font-semibold">{agent.name}</div>
                      <Badge variant="secondary" className={cn("border-0 font-medium", statusConfig[agent.status].className)}>{statusConfig[agent.status].label}</Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{agent.role}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{agent.model}</div>
                  </div>
                </div>

                <p className="line-clamp-3 text-sm text-muted-foreground">{agent.description}</p>

                <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/60 p-3 text-sm">
                  <Metric label="Deflection" value={`${(agent.deflectionRate * 100).toFixed(0)}%`} />
                  <Metric label="CSAT" value={agent.csat.toFixed(1).replace(".", ",")} />
                  <Metric label="Latência" value={`${agent.avgLatencyMs}ms`} />
                  <Metric label="Conv. 30d" value={agent.conversations30d.toLocaleString("pt-BR")} />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {agent.platformBindings.slice(0, 3).map((binding) => <Badge key={`${agent.id}-${binding.provider}`} variant="outline" className="text-[10px]">{binding.displayName}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-medium">{value}</div></div>
}
