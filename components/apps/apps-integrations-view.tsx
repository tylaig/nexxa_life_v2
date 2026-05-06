"use client"

import { useState } from "react"
import { CheckCircle2, Circle, ExternalLink, Settings, Zap, Calendar, FileText, BarChart3, Music, Apple, Chrome } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type IntegrationStatus = "connected" | "available" | "soon"

type Integration = {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  status: IntegrationStatus
  badge?: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sincronize eventos da sua Agenda com o Google Calendar automaticamente.",
    icon: Calendar,
    category: "Produtividade",
    status: "available",
    badge: "Popular",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Exporte metas, diário e relatórios para sua workspace no Notion.",
    icon: FileText,
    category: "Produtividade",
    status: "available",
  },
  {
    id: "google-fit",
    name: "Google Fit",
    description: "Importe dados de atividade física para enriquecer seu checklist de saúde.",
    icon: BarChart3,
    category: "Saúde",
    status: "soon",
  },
  {
    id: "apple-health",
    name: "Apple Health",
    description: "Sincronize dados de saúde do iPhone com seu ciclo NexxaLife.",
    icon: Apple,
    category: "Saúde",
    status: "soon",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Playlists de foco geradas automaticamente para seus blocos de deep work.",
    icon: Music,
    category: "Bem-estar",
    status: "soon",
  },
  {
    id: "chrome",
    name: "Chrome Extension",
    description: "Acesse seu checklist e diário diretamente do navegador, em qualquer aba.",
    icon: Chrome,
    category: "Produtividade",
    status: "soon",
  },
]

const STATUS_CONFIG: Record<IntegrationStatus, { label: string; color: string; dotColor: string }> = {
  connected: { label: "Conectado",    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
  available: { label: "Disponível",   color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",           dotColor: "bg-blue-400" },
  soon:      { label: "Em breve",     color: "bg-muted/60 text-muted-foreground",                          dotColor: "bg-muted-foreground/40" },
}

function IntegrationCard({ item }: { item: Integration }) {
  const [connected, setConnected] = useState(item.status === "connected")
  const status = connected ? "connected" : item.status
  const cfg = STATUS_CONFIG[status]
  const Icon = item.icon

  return (
    <div className={cn(
      "flex flex-col gap-4 rounded-2xl border p-4 transition-all",
      item.status === "soon" ? "opacity-60" : "hover:border-primary/20",
      connected ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/70 bg-card"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            connected ? "bg-emerald-500/10 text-emerald-600" : "bg-muted/60 text-muted-foreground"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
              {item.badge && !connected ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{item.badge}</span>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
        </div>
        <Badge className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium", cfg.color)} variant="secondary">
          <span className={cn("mr-1 inline-block h-1.5 w-1.5 rounded-full", cfg.dotColor)} />
          {cfg.label}
        </Badge>
      </div>

      <p className="text-xs leading-5 text-muted-foreground">{item.description}</p>

      <div className="flex items-center gap-2">
        {item.status === "soon" ? (
          <Button size="sm" variant="outline" disabled className="h-7 flex-1 rounded-xl text-xs">
            Em breve
          </Button>
        ) : connected ? (
          <>
            <Button size="sm" variant="outline" className="h-7 flex-1 rounded-xl text-xs" onClick={() => setConnected(false)}>
              <Settings className="h-3 w-3 mr-1" /> Configurar
            </Button>
            <Button size="sm" variant="ghost" className="h-7 rounded-xl px-2 text-xs text-muted-foreground hover:text-red-500">
              Desconectar
            </Button>
          </>
        ) : (
          <Button size="sm" className="h-7 flex-1 rounded-xl text-xs" onClick={() => setConnected(true)}>
            <Zap className="h-3 w-3 mr-1" /> Conectar
          </Button>
        )}
      </div>
    </div>
  )
}

export function AppsIntegrationsView() {
  const connected = INTEGRATIONS.filter((i) => i.status === "connected")
  const available = INTEGRATIONS.filter((i) => i.status === "available")
  const soon = INTEGRATIONS.filter((i) => i.status === "soon")

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Ecossistema"
        title="Integrações"
        description="Conecte o NexxaLife com seus apps favoritos para um ciclo ainda mais poderoso."
        actions={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs">
            <ExternalLink className="h-3.5 w-3.5" /> Sugerir integração
          </Button>
        }
      />

      {/* Status geral */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Conectadas", value: connected.length, color: "text-emerald-500", icon: CheckCircle2 },
          { label: "Disponíveis", value: available.length, color: "text-blue-500", icon: Zap },
          { label: "Em breve", value: soon.length, color: "text-muted-foreground", icon: Circle },
        ].map((stat) => (
          <SectionCard key={stat.label} noPadding>
            <div className="flex flex-col items-center justify-center gap-1 py-4">
              <stat.icon className={cn("h-4 w-4", stat.color)} />
              <p className={cn("text-2xl font-bold tabular-nums", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </SectionCard>
        ))}
      </div>

      {/* Disponíveis para conectar */}
      {available.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disponíveis para conectar</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((item) => <IntegrationCard key={item.id} item={item} />)}
          </div>
        </div>
      ) : null}

      {/* Em breve */}
      {soon.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Em breve</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {soon.map((item) => <IntegrationCard key={item.id} item={item} />)}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <SectionCard variant="highlight">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Desenvolvedor? Crie uma integração.</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Use nossa API para conectar qualquer app ao ciclo NexxaLife.</p>
          </div>
          <Button size="sm" variant="outline" className="h-8 shrink-0 rounded-xl px-4 text-xs">
            Ver documentação da API
          </Button>
        </div>
      </SectionCard>
    </div>
  )
}
