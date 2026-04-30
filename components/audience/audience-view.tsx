"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users,
  Crown,
  Heart,
  AlertTriangle,
  ShoppingBag,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  SlidersHorizontal,
  Trash2,
  Copy,
  MoreHorizontal,
} from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/* ── Mock segments ────────────────────────────── */

type Segment = {
  id: string
  name: string
  emoji: string
  count: number
  dynamic: boolean
  rules: string[]
  ltvAvg: number
  trend: number
  color: string
}

const segments: Segment[] = [
  { id: "s_vip", name: "VIPs", emoji: "👑", count: 47, dynamic: true, rules: ["lifecycle = vip", "ltv > 2000"], ltvAvg: 7840, trend: 12, color: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  { id: "s_promoters", name: "Promotores (NPS 9-10)", emoji: "💚", count: 312, dynamic: true, rules: ["nps >= 9"], ltvAvg: 1920, trend: 8, color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  { id: "s_risk", name: "Em risco de churn", emoji: "⚠️", count: 84, dynamic: true, rules: ["nps <= 6", "lifecycle != lead"], ltvAvg: 430, trend: -5, color: "bg-rose-500/10 text-rose-700 dark:text-rose-300" },
  { id: "s_cart", name: "Carrinho abandonado", emoji: "🛒", count: 156, dynamic: true, rules: ["tag contains 'Carrinho'"], ltvAvg: 89, trend: -2, color: "bg-orange-500/10 text-orange-700 dark:text-orange-300" },
  { id: "s_new30", name: "Novos (últimos 30d)", emoji: "🆕", count: 421, dynamic: true, rules: ["lifecycle in [lead, prospect]", "created_at > 30d"], ltvAvg: 0, trend: 15, color: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  { id: "s_sp", name: "São Paulo — Capital", emoji: "📍", count: 612, dynamic: false, rules: ["city contains 'São Paulo'"], ltvAvg: 1340, trend: 3, color: "bg-purple-500/10 text-purple-700 dark:text-purple-300" },
]

/* ── Funnel stages ────────────────────────────── */
const funnelStages = [
  { label: "Leads", count: 421, pct: 100, color: "bg-blue-500" },
  { label: "Prospects", count: 298, pct: 71, color: "bg-indigo-500" },
  { label: "Clientes", count: 1214, pct: 57, color: "bg-emerald-500" },
  { label: "VIPs", count: 47, pct: 11, color: "bg-amber-500" },
  { label: "Churned", count: 84, pct: 5, color: "bg-rose-500" },
]

/* ── Filter rules mock ────────────────────────── */
type FilterRule = {
  id: string
  field: string
  operator: string
  value: string
}

const defaultRules: FilterRule[] = [
  { id: "r1", field: "lifecycle", operator: "é", value: "customer" },
  { id: "r2", field: "ltv", operator: "maior que", value: "500" },
]

/* ── Component ─────────────────────────────────── */

export function AudienceView() {
  const [query, setQuery] = React.useState("")
  const [selectedSegmentId, setSelectedSegmentId] = React.useState<string | null>(null)
  const [filterRules, setFilterRules] = React.useState<FilterRule[]>(defaultRules)

  const filteredSegments = segments.filter((s) => {
    if (!query.trim()) return true
    return s.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  const selectedSegment = segments.find((s) => s.id === selectedSegmentId) ?? null

  const addRule = () => {
    setFilterRules((prev) => [
      ...prev,
      { id: `r${Date.now()}`, field: "tag", operator: "contém", value: "" },
    ])
  }

  const removeRule = (id: string) => {
    setFilterRules((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Audiência" }]} />
      <PageHeader
        title="Audiência"
        description="Construa e gerencie públicos, segmentos e filtros avançados para campanhas, automações e CRM."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Configurar etapas
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Nova audiência
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-2">
        <StatCard label="Total de contatos" value="1.842" icon={Users} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Segmentos ativos" value={String(segments.length)} icon={Layers} />
        <StatCard label="Audiências dinâmicas" value={String(segments.filter((s) => s.dynamic).length)} icon={Zap} />
        <StatCard label="Cobertura por segmento" value="87%" icon={Target} hint="contatos em ≥1 segmento" />
      </div>

      <Tabs defaultValue="segmentos" className="mt-6">
        <NavTabsList className="mb-6">
          <NavTabsTrigger value="segmentos">Segmentos &amp; Públicos</NavTabsTrigger>
          <NavTabsTrigger value="funil">Funil de Audiência</NavTabsTrigger>
          <NavTabsTrigger value="construtor">Construtor de Filtros</NavTabsTrigger>
        </NavTabsList>

        <TabsContent value="segmentos" className="m-0 border-0 p-0 outline-none">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-full max-w-sm">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar segmento..." className="h-9 pl-8" />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSegments.map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className="flex flex-col items-start gap-3 rounded-lg border border-border p-4 text-left transition-all hover:bg-accent/50 hover:border-primary/50"
                >
                  <div className="flex items-center w-full justify-between">
                    <span className="text-2xl leading-none">{seg.emoji}</span>
                    <Badge variant="outline" className={cn("text-[10px] border-0 font-medium", seg.color)}>
                      {seg.dynamic ? "Dinâmico" : "Estático"}
                    </Badge>
                  </div>
                  <div className="flex-1 w-full mt-2">
                    <div className="font-semibold text-sm">{seg.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {seg.count.toLocaleString("pt-BR")} contatos · LTV R$ {seg.ltvAvg.toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between mt-2 pt-3 border-t border-border">
                    <span className={cn("flex items-center gap-0.5 text-xs font-medium tabular-nums", seg.trend >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                      {seg.trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(seg.trend)}% crescimento
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funil" className="m-0 border-0 p-0 outline-none">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3">
                {funnelStages.map((stage, i) => (
                  <div key={stage.label} className="flex items-center gap-4">
                    <div className="w-24 shrink-0 text-right">
                      <div className="text-sm font-medium">{stage.label}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{stage.count.toLocaleString("pt-BR")}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-9 rounded-lg bg-muted overflow-hidden relative">
                        <div
                          className={cn("h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-3", stage.color)}
                          style={{ width: `${Math.max(stage.pct, 8)}%` }}
                        >
                          <span className="text-xs font-semibold text-white tabular-nums">{stage.pct}%</span>
                        </div>
                      </div>
                    </div>
                    {i < funnelStages.length - 1 && (
                      <div className="w-20 text-center shrink-0">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {Math.round((funnelStages[i + 1].count / stage.count) * 100)}% conv.
                        </span>
                      </div>
                    )}
                    {i === funnelStages.length - 1 && <div className="w-20 shrink-0" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="construtor" className="m-0 border-0 p-0 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Novo segmento</CardTitle>
              <CardDescription>Defina condições com operadores lógicos (E / OU) para recortes precisos da base.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filterRules.map((rule, i) => (
                <div key={rule.id} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  {i > 0 && (
                    <Badge variant="secondary" className="shrink-0 text-[10px] font-semibold px-2 py-0.5">
                      E
                    </Badge>
                  )}
                  {i === 0 && <div className="hidden sm:block w-[30px] shrink-0" />}
                  <select className="h-9 w-full sm:w-auto rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue={rule.field}>
                    <option value="lifecycle">Ciclo de vida</option>
                    <option value="ltv">LTV</option>
                    <option value="nps">NPS</option>
                    <option value="tag">Tag</option>
                    <option value="city">Cidade</option>
                    <option value="email">Email</option>
                    <option value="orders">Pedidos</option>
                    <option value="last_purchase">Última compra</option>
                  </select>
                  <select className="h-9 w-full sm:w-auto rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue={rule.operator}>
                    <option value="é">é</option>
                    <option value="não é">não é</option>
                    <option value="contém">contém</option>
                    <option value="maior que">maior que</option>
                    <option value="menor que">menor que</option>
                    <option value="existe">existe</option>
                    <option value="não existe">não existe</option>
                  </select>
                  <Input className="h-9 flex-1" placeholder="Valor..." defaultValue={rule.value} />
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-rose-500" onClick={() => removeRule(rule.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto" onClick={addRule}>
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar condição
                </Button>
                <div className="flex-1 hidden sm:block" />
                <div className="text-sm text-muted-foreground tabular-nums text-center sm:text-left">
                  <span className="font-medium text-foreground">~832</span> contatos estimados
                </div>
                <Button size="sm" className="gap-2 w-full sm:w-auto">
                  <Zap className="h-3.5 w-3.5" />
                  Salvar como segmento dinâmico
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


      <Sheet open={!!selectedSegment} onOpenChange={(open) => !open && setSelectedSegmentId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades do Segmento</SheetTitle>
            <SheetDescription>Inspecionando regras e métricas do público.</SheetDescription>
          </SheetHeader>
          
          {selectedSegment && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedSegment.emoji}</span>
                <div>
                  <div className="text-lg font-bold">{selectedSegment.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedSegment.dynamic ? "Segmento dinâmico · atualiza automaticamente" : "Segmento estático · lista fixa de contatos"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background/50 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Contatos</div>
                  <div className="mt-1 text-lg font-semibold tabular-nums">{selectedSegment.count.toLocaleString("pt-BR")}</div>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">LTV médio</div>
                  <div className="mt-1 text-lg font-semibold tabular-nums">R$ {selectedSegment.ltvAvg.toLocaleString("pt-BR")}</div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Regras do segmento</div>
                <div className="space-y-2">
                  {selectedSegment.rules.map((rule, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono text-muted-foreground">
                      {i > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">E</Badge>}
                      <code className="text-xs">{rule}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button size="sm" className="gap-2 w-full">
                  <Target className="h-3.5 w-3.5" />
                  Usar em campanha
                </Button>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Users className="h-3.5 w-3.5" />
                  Ver contatos
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}
