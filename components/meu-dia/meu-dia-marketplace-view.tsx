"use client"

import { useState } from "react"
import { Search, Star, ExternalLink, Filter, Sparkles, Lock } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ResourceCategory = "Templates" | "Ferramentas" | "Consultores" | "Cursos" | "Apps"
type Resource = {
  id: string; title: string; description: string; category: ResourceCategory
  author: string; rating: number; price: string; tag?: string; locked?: boolean
}

const RESOURCES: Resource[] = [
  { id: "1", title: "Planner Semanal Premium", description: "Modelo de planejamento semanal com blocos de foco, revisão e métricas pessoais.", category: "Templates", author: "NexxaLife", rating: 4.9, price: "Grátis", tag: "Destaque" },
  { id: "2", title: "Diário de Gratidão — 30 dias", description: "Sequência guiada de 30 prompts para desenvolver o hábito da gratidão.", category: "Templates", author: "NexxaLife", rating: 4.7, price: "Grátis" },
  { id: "3", title: "Coach de Alta Performance", description: "Sessão de 60 minutos com especialista em produtividade e ciclos de resultado.", category: "Consultores", author: "Especialistas NexxaLife", rating: 5.0, price: "R$ 197", tag: "Novo", locked: true },
  { id: "4", title: "Notion — Sistema de Vida", description: "Template completo de sistema de vida pessoal no Notion integrado ao NexxaLife.", category: "Apps", author: "Comunidade", rating: 4.6, price: "R$ 47", locked: true },
  { id: "5", title: "Calculadora de Metas SMART", description: "Ferramenta interativa para estruturar metas com critérios SMART e prazos realistas.", category: "Ferramentas", author: "NexxaLife", rating: 4.8, price: "Grátis" },
  { id: "6", title: "Masterclass: Foco em 30 dias", description: "Programa intensivo para desenvolver a habilidade de foco profundo.", category: "Cursos", author: "Dr. Cal Newport", rating: 4.9, price: "R$ 297", locked: true },
]

const CATEGORIES: ResourceCategory[] = ["Templates", "Ferramentas", "Consultores", "Cursos", "Apps"]
const CAT_COLORS: Record<ResourceCategory, string> = {
  Templates: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Ferramentas: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Consultores: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Cursos: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Apps: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-2xl border p-4 transition-all",
      resource.locked ? "opacity-70" : "hover:border-primary/20",
      "border-border/70 bg-card"
    )}>
      <div className="flex items-start justify-between gap-2">
        <Badge className={cn("rounded-full px-2.5 py-0.5 text-[11px]", CAT_COLORS[resource.category])} variant="secondary">
          {resource.category}
        </Badge>
        {resource.tag ? (
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {resource.tag}
          </span>
        ) : null}
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{resource.title}</h3>
        <p className="text-xs leading-5 text-muted-foreground line-clamp-2">{resource.description}</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-0.5">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {resource.rating}
        </span>
        <span>·</span>
        <span>{resource.author}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={cn(
          "text-sm font-bold",
          resource.price === "Grátis" ? "text-emerald-500" : "text-foreground"
        )}>
          {resource.price}
        </span>
        <Button
          size="sm"
          variant={resource.locked ? "outline" : "default"}
          className="h-7 gap-1 rounded-xl px-3 text-xs"
          disabled={resource.locked}
        >
          {resource.locked ? (
            <><Lock className="h-3 w-3" /> Pro</>
          ) : (
            <><ExternalLink className="h-3 w-3" /> Acessar</>
          )}
        </Button>
      </div>
    </div>
  )
}

export function NexxaLifeMarketplaceView() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<ResourceCategory | "all">("all")

  const filtered = RESOURCES.filter((r) => {
    const ms = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    const mc = category === "all" || r.category === category
    return ms && mc
  })

  const free = filtered.filter((r) => r.price === "Grátis")
  const paid = filtered.filter((r) => r.price !== "Grátis")

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Recursos"
        title="Marketplace"
        description="Templates, ferramentas e especialistas para acelerar seu ciclo de evolução."
        badge={
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Novo
          </span>
        }
      />

      {/* Busca + filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Buscar recursos..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {(["all", ...CATEGORIES] as const).map((cat) => (
            <button key={cat} onClick={() => setCategory(cat as typeof category)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
                category === cat ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="Nenhum recurso encontrado" description={`Tente outro termo ou categoria.`} />
      ) : (
        <>
          {free.length > 0 ? (
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gratuitos</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {free.map((r) => <ResourceCard key={r.id} resource={r} />)}
              </div>
            </div>
          ) : null}

          {paid.length > 0 ? (
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Premium</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paid.map((r) => <ResourceCard key={r.id} resource={r} />)}
              </div>
            </div>
          ) : null}
        </>
      )}

      <SectionCard variant="highlight">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Quer publicar no Marketplace?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Compartilhe seus templates, ferramentas ou ofereça consultoria para a comunidade NexxaLife.</p>
          </div>
          <Button size="sm" variant="outline" className="shrink-0 h-8 rounded-xl px-4 text-xs">Saiba mais</Button>
        </div>
      </SectionCard>
    </div>
  )
}
