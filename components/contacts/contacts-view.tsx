"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Plus,
  Download,
  Filter,
  Users,
  Crown,
  AlertTriangle,
  Heart,
  ChevronRight,
  MapPin,
  MessageCircle,
  LayoutGrid,
  List,
  CheckCircle2,
} from "lucide-react"
import { NextActionCard } from "@/components/app-shell/next-action-card"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import {
  PageContainer,
  PageHeader,
  StatCard,
} from "@/components/app-shell/page-container"
import { SummaryMetricCard } from "@/components/app-shell/summary-metric-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { contacts as contactsData } from "@/lib/mock/contacts"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ── Constants ─────────────────────────────────────────────────────────────────

type SegmentId = "all" | "vip" | "advocates" | "at-risk" | "carts" | "new"

const segments: { id: SegmentId; label: string; count: number; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "Todos", count: 1842, icon: Users },
  { id: "vip", label: "VIPs", count: 47, icon: Crown },
  { id: "advocates", label: "Promotores", count: 312, icon: Heart },
  { id: "at-risk", label: "Em risco", count: 84, icon: AlertTriangle },
  { id: "carts", label: "Carrinho abandonado", count: 156, icon: AlertTriangle },
  { id: "new", label: "Novos (30d)", count: 421, icon: Users },
]

const lifecycleColors: Record<string, string> = {
  lead: "bg-muted text-foreground",
  prospect: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  customer: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  vip: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  churned: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
}

const lifecycleLabel: Record<string, string> = {
  lead: "Lead",
  prospect: "Prospect",
  customer: "Cliente",
  vip: "VIP",
  churned: "Churn",
}

const kanbanStages = [
  { key: "lead", label: "Lead", emoji: "🟡", color: "border-t-amber-400" },
  { key: "prospect", label: "Prospect", emoji: "🔵", color: "border-t-blue-400" },
  { key: "customer", label: "Cliente", emoji: "🟢", color: "border-t-emerald-400" },
  { key: "vip", label: "VIP", emoji: "👑", color: "border-t-amber-500" },
  { key: "churned", label: "Churn", emoji: "🔴", color: "border-t-rose-400" },
] as const

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactsView() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [segment, setSegment] = React.useState<SegmentId>("all")
  const [mainTab, setMainTab] = React.useState<"lista" | "kanban">("lista")
  const [selectedContactId, setSelectedContactId] = React.useState<string | null>(null)

  const filtered = contactsData.filter((c) => {
    if (segment === "vip" && !c.isVip) return false
    if (segment === "advocates" && (c.nps ?? 0) < 9) return false
    if (segment === "at-risk" && c.lifecycle !== "churned" && (c.nps ?? 10) > 6) return false
    if (segment === "carts" && !c.tags.some((tag) => tag.toLowerCase().includes("carrinho"))) return false
    if (segment === "new" && c.lifecycle !== "lead" && c.lifecycle !== "prospect") return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const hay = [c.name, c.phone, c.email ?? "", c.tags.join(" "), c.city ?? ""].join(" ").toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const activeSegment = segments.find((item) => item.id === segment)
  const selectedContact = contactsData.find((item) => item.id === selectedContactId) ?? null

  return (
    <PageContainer>
      <PageHeader
        title="Contatos"
        description="Visão única de todos os clientes e leads, sincronizada com Shopify, WhatsApp e Klaviyo."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => toast.success(`Exportação de contatos preparada com ${filtered.length} registro(s)`)}
            >
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Novo contato
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total de contatos" value="1.842" trend={{ value: "+12%", positive: true }} hint="vs. mês anterior" />
        <StatCard label="Clientes ativos" value="1.214" trend={{ value: "+8%", positive: true }} />
        <StatCard label="LTV médio" value="R$ 487" trend={{ value: "+R$ 32", positive: true }} />
        <StatCard label="Opt-in WhatsApp" value="89%" hint="1.640 contatos" />
      </div>

      <OperationalAlertBanner
        className="mt-6"
        icon={AlertTriangle}
        title="Contatos exigem leitura operacional, não apenas cadastro estático"
        description="Priorize segmentos acionáveis, sinais de risco e contexto de relacionamento para campanhas, atendimento e retenção."
        meta={`Segmento ativo: ${activeSegment?.label ?? "Todos"}`}
      />

      {/* ── Main Tabs: Lista vs Kanban ── */}
      <Tabs
        value={mainTab}
        onValueChange={(v) => setMainTab(v as "lista" | "kanban")}
        className="mt-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
          <NavTabsList className="border-0">
            <NavTabsTrigger value="lista">
              <List className="h-3.5 w-3.5 mr-1.5" />
              Lista de Contatos
            </NavTabsTrigger>
            <NavTabsTrigger value="kanban">
              <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
              CRM Kanban
            </NavTabsTrigger>
          </NavTabsList>

          {/* Segment sub-filter pills — shown in both views */}
          <div className="flex items-center gap-1 sm:ml-4 flex-wrap">
            {segments.map((s) => (
              <button
                key={s.id}
                onClick={() => setSegment(s.id)}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors border",
                  segment === s.id
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {s.label}
                <span className="ml-1 tabular-nums opacity-60">{s.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Lista ── */}
        <TabsContent value="lista" className="m-0 border-0 p-0 outline-none">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border p-3">
              <div className="rounded-md bg-muted px-2 py-1 text-[10.5px] font-medium text-muted-foreground">
                {filtered.length} em foco
              </div>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nome, telefone, email ou tag"
                  className="h-9 pl-8"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => toast.info("Use busca, segmentos e CRM Kanban nesta fase. Filtros avançados entram na próxima rodada.")}
              >
                <Filter className="h-3.5 w-3.5" />
                Filtros
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => { setQuery(""); setSegment("all") }}>
                Limpar
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[280px]">Contato</TableHead>
                  <TableHead>Ciclo de vida</TableHead>
                  <TableHead>Contexto</TableHead>
                  <TableHead className="text-right">LTV</TableHead>
                  <TableHead className="text-right">Pedidos</TableHead>
                  <TableHead className="text-right">NPS</TableHead>
                  <TableHead>Última compra</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-accent/40 transition-colors" onClick={() => setSelectedContactId(c.id)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {c.avatarUrl ? <AvatarImage src={c.avatarUrl} alt={c.name} /> : null}
                          <AvatarFallback className="text-xs">
                            {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-sm font-medium">
                            {c.name}
                            {c.isVip ? <Crown className="h-3 w-3 text-amber-500" /> : null}
                          </div>
                          <div className="text-xs text-muted-foreground">{c.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("border-0 font-medium", lifecycleColors[c.lifecycle])}>
                        {lifecycleLabel[c.lifecycle]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {c.city ?? "Cidade não informada"}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {c.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      R$ {c.ltv.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{c.totalOrders}</TableCell>
                    <TableCell className="text-right">
                      {c.nps !== undefined ? (
                        <span className={cn("tabular-nums font-medium", c.nps >= 9 ? "text-emerald-600 dark:text-emerald-400" : c.nps >= 7 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400")}>
                          {c.nps}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div>{c.lastPurchaseAt ? formatRelative(c.lastPurchaseAt) : "—"}</div>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/80">
                        <MessageCircle className="h-3 w-3" />
                        {c.email ?? "Sem email"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
              <span>
                Mostrando <span className="font-medium text-foreground">{filtered.length}</span> de{" "}
                {contactsData.length} contatos · segmento <span className="font-medium text-foreground">{activeSegment?.label ?? "Todos"}</span>
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7">Anterior</Button>
                <Button variant="outline" size="sm" className="h-7">Próximo</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Kanban CRM ── */}
        <TabsContent value="kanban" className="m-0 border-0 p-0 outline-none">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Ciclo de vida de <span className="font-medium text-foreground">{filtered.length}</span> contatos · arraste para mover entre etapas
            </p>
            <div className="relative w-52">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar contato..." className="h-8 pl-8 text-xs" />
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-max">
              {kanbanStages.map((stage) => {
                const stageContacts = filtered.filter((c) => c.lifecycle === stage.key)
                const totalLTV = stageContacts.reduce((sum, c) => sum + c.ltv, 0)
                return (
                  <div key={stage.key} className={cn("w-[272px] shrink-0 rounded-xl border border-border bg-card border-t-[3px]", stage.color)}>
                    {/* Column header */}
                    <div className="flex items-center justify-between p-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{stage.emoji}</span>
                        <span className="text-sm font-semibold">{stage.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-[10px] tabular-nums h-5">{stageContacts.length}</Badge>
                      </div>
                    </div>
                    {/* LTV summary */}
                    {stageContacts.length > 0 && (
                      <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
                        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">LTV total</div>
                        <div className="text-sm font-semibold tabular-nums mt-0.5">
                          R$ {totalLTV.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                        </div>
                      </div>
                    )}
                    {/* Cards */}
                    <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
                      {stageContacts.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground">
                          Nenhum contato
                        </div>
                      )}
                      {stageContacts.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedContactId(c.id)}
                          className={cn(
                            "w-full rounded-lg border border-border bg-background p-3 text-left transition-all hover:bg-accent/40 hover:border-primary/30 hover:shadow-sm",
                            selectedContactId === c.id && "ring-2 ring-primary/40"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7 shrink-0">
                              {c.avatarUrl ? <AvatarImage src={c.avatarUrl} alt={c.name} /> : null}
                              <AvatarFallback className="text-[10px]">
                                {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 text-sm font-medium truncate">
                                {c.name}
                                {c.isVip ? <Crown className="h-3 w-3 text-amber-500 shrink-0" /> : null}
                              </div>
                              <div className="text-[11px] text-muted-foreground truncate">{c.phone}</div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="tabular-nums text-xs font-semibold text-foreground">
                              R$ {c.ltv.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                            </span>
                            <span className="text-[11px] text-muted-foreground">{c.totalOrders} pedidos</span>
                          </div>
                          {c.nps !== undefined && (
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <span className="text-[10px] text-muted-foreground">NPS</span>
                              <span className={cn("text-[10px] font-semibold tabular-nums", c.nps >= 9 ? "text-emerald-600" : c.nps >= 7 ? "text-amber-600" : "text-rose-600")}>
                                {c.nps}
                              </span>
                            </div>
                          )}
                          {c.tags.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {c.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="rounded-full border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Add contact CTA */}
                    <div className="p-2 border-t border-border">
                      <Button variant="ghost" size="sm" className="w-full gap-1.5 text-muted-foreground text-xs h-7 hover:text-foreground">
                        <Plus className="h-3 w-3" />
                        Adicionar contato
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Contact Detail Sheet ── */}
      <Sheet open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContactId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades do Contato</SheetTitle>
            <SheetDescription>Visão consolidada para decisões de CRM e atendimento.</SheetDescription>
          </SheetHeader>

          {selectedContact && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Avatar className="h-11 w-11">
                  {selectedContact.avatarUrl ? <AvatarImage src={selectedContact.avatarUrl} alt={selectedContact.name} /> : null}
                  <AvatarFallback>
                    {selectedContact.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {selectedContact.name}
                    {selectedContact.isVip ? <Crown className="h-3.5 w-3.5 text-amber-500" /> : null}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{selectedContact.phone}</div>
                  <div className="text-xs text-muted-foreground">{selectedContact.email ?? "Sem email cadastrado"}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <SummaryMetricCard label="LTV" value={`R$ ${selectedContact.ltv.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
                <SummaryMetricCard label="Pedidos" value={String(selectedContact.totalOrders)} />
                <SummaryMetricCard label="NPS" value={selectedContact.nps !== undefined ? String(selectedContact.nps) : "—"} />
                <SummaryMetricCard label="Ciclo" value={lifecycleLabel[selectedContact.lifecycle]} />
              </div>

              <div className="rounded-lg border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Localização e contexto
                </div>
                <div className="mt-2 text-sm text-foreground">{selectedContact.city ?? "Cidade não informada"}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedContact.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </div>

              <NextActionCard
                icon={CheckCircle2}
                description={
                  selectedContact.lifecycle === "churned"
                    ? "Priorizar ação de recuperação com oferta, histórico de reclamação e canal preferencial."
                    : selectedContact.isVip
                      ? "Tratar como relacionamento premium com acompanhamento proativo e campanhas exclusivas."
                      : (selectedContact.nps ?? 0) >= 9
                        ? "Acionar campanha de indicação, review ou recompra para promotores."
                        : (selectedContact.nps ?? 10) <= 6
                          ? "Investigar risco de atrito antes da próxima campanha ou atendimento."
                          : "Manter em fluxo de nutrição e observar sinais de intenção de compra."
                }
              />

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button size="sm" className="gap-2 w-full" onClick={() => router.push("/inbox") }>
                  <MessageCircle className="h-4 w-4" />
                  Abrir conversa
                </Button>
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => router.push("/campaigns/new") }>
                  <Plus className="h-4 w-4" />
                  Nova campanha
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function formatRelative(iso: string): string {
  const d = new Date(iso)
  const now = new Date("2026-04-27T15:32:00Z").getTime()
  const diff = now - d.getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days < 1) return "hoje"
  if (days < 2) return "ontem"
  if (days < 30) return `${days}d atrás`
  if (days < 365) return `${Math.floor(days / 30)}mes atrás`
  return `${Math.floor(days / 365)}a atrás`
}
