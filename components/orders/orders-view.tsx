"use client"

import * as React from "react"
import {
  Search,
  Filter,
  Download,
  Package,
  TrendingUp,
  AlertOctagon,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Truck,
  MessageCircle,
  ShieldAlert,
  AlertTriangle,
  Boxes,
} from "lucide-react"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
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
import { orders } from "@/lib/mock/orders"
import { cn } from "@/lib/utils"

type StatusFilter = "all" | "open" | "shipped" | "delivered" | "issues"

const tabs: { id: StatusFilter; label: string; count: number }[] = [
  { id: "all", label: "Todos", count: orders.length },
  { id: "open", label: "Abertos", count: orders.filter((o) => o.fulfillmentStatus === "unfulfilled" || o.fulfillmentStatus === "preparing").length },
  { id: "shipped", label: "Em transporte", count: orders.filter((o) => o.fulfillmentStatus === "shipped").length },
  { id: "delivered", label: "Entregues", count: orders.filter((o) => o.fulfillmentStatus === "delivered").length },
  { id: "issues", label: "Com problemas", count: orders.filter((o) => o.paymentStatus === "refused" || o.paymentStatus === "refunded" || o.fulfillmentStatus === "returned" || o.hasOpenTicket).length },
]

const paymentBadge: Record<string, { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  approved: { label: "Aprovado", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: CheckCircle2 },
  pending: { label: "Pendente", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300", icon: Clock },
  refused: { label: "Recusado", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300", icon: XCircle },
  refunded: { label: "Estornado", className: "bg-muted text-muted-foreground", icon: RotateCcw },
}

const fulfillmentBadge: Record<string, { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  unfulfilled: { label: "Aguardando", className: "bg-muted text-muted-foreground", icon: Clock },
  preparing: { label: "Preparando", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Package },
  shipped: { label: "Enviado", className: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300", icon: Truck },
  delivered: { label: "Entregue", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: CheckCircle2 },
  returned: { label: "Devolvido", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300", icon: RotateCcw },
}

export function OrdersView() {
  const [tab, setTab] = React.useState<StatusFilter>("all")
  const [query, setQuery] = React.useState("")
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null)

  const filtered = orders.filter((o) => {
    if (tab === "open" && !(o.fulfillmentStatus === "unfulfilled" || o.fulfillmentStatus === "preparing")) return false
    if (tab === "shipped" && o.fulfillmentStatus !== "shipped") return false
    if (tab === "delivered" && o.fulfillmentStatus !== "delivered") return false
    if (tab === "issues" && !(o.paymentStatus === "refused" || o.paymentStatus === "refunded" || o.fulfillmentStatus === "returned" || o.hasOpenTicket)) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const hay = [o.number, o.customerName, o.customerPhone, o.brand, o.channel].join(" ").toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const totalToday = orders.filter((o) => {
    const d = new Date(o.createdAt)
    return d.getUTCDate() === 27 && d.getUTCMonth() === 3
  }).reduce((sum, o) => sum + o.total, 0)

  const activeTab = tabs.find((item) => item.id === tab)
  const selectedOrder = orders.find((item) => item.id === selectedOrderId) ?? null

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Pedidos" }]} />
      <PageHeader
        title="Pedidos"
        description="Operação comercial complementar para leitura transacional, fulfillment, risco e suporte sem competir com o fluxo principal do NexxaLife."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
            <Button size="sm">Novo pedido</Button>
          </>
        }
      />

      <section className="mb-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                Fulfillment, risco e suporte transacional
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Priorize exceções, bloqueios e andamento comercial sem deslocar o centro operacional principal do NexxaLife.
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                  Pedidos funciona como camada complementar de operação comercial: conecta transação, pagamento, logística e suporte,
                  enquanto dashboard, agenda, checklist e relatórios seguem como núcleo do fluxo principal.
                </p>
              </div>
            </div>

            <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Operação comercial complementar</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  A prioridade aqui é fulfillment, risco, recuperação e contexto transacional, não rotina operacional pessoal diária.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                <div className="mt-2 text-sm font-semibold text-foreground">Pedidos → inbox → contatos</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  O valor cresce quando sinais de compra e risco alimentam atendimento, CRM e campanhas de retenção ou recuperação.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard
              label="Pedidos hoje"
              value={`${orders.filter((o) => new Date(o.createdAt).toISOString().startsWith("2026-04-27")).length}`}
              trend={{ value: "+18%", positive: true }}
              icon={Package}
            />
            <StatCard
              label="Receita hoje"
              value={`R$ ${totalToday.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
              trend={{ value: "+R$ 2.4k", positive: true }}
              icon={TrendingUp}
            />
            <StatCard
              label="Aguardando envio"
              value={`${orders.filter((o) => o.fulfillmentStatus === "unfulfilled" || o.fulfillmentStatus === "preparing").length}`}
              hint="SLA médio: 6h"
              icon={Clock}
            />
            <StatCard
              label="Risco / Recusa"
              value={`${orders.filter((o) => o.paymentStatus === "refused" || o.riskScore > 50).length}`}
              hint="Auto-resgate ativo"
              icon={ShieldAlert}
            />
          </div>
        </div>
      </section>

      <OperationalAlertBanner
        className="mt-6"
        icon={AlertTriangle}
        title="Pedidos precisam destacar exceções, bloqueios e SLA antes de virar apenas listagem financeira"
        description="Use esta visão para separar o que exige expedição, recuperação de pagamento, suporte ou acompanhamento logístico."
        meta={`Foco atual: ${activeTab?.label ?? "Todos"}`}
      />

      <div className="mt-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as StatusFilter)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              {tabs.map((t) => (
                <NavTabsTrigger key={t.id} value={t.id}>
                  {t.label}
                  <span className="ml-1.5 tabular-nums opacity-60 text-[11px]">{t.count}</span>
                </NavTabsTrigger>
              ))}
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="relative lg:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar pedido, cliente, canal..." className="h-9 pl-8" />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-3.5 w-3.5" />
                Filtros
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={() => { setQuery(""); setTab("all") }}>
                Limpar
              </Button>
            </div>
          </div>

          <TabsContent value={tab} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/10">
                    <TableHead className="w-[100px]">Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Logística</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((o) => {
                    const pay = paymentBadge[o.paymentStatus]
                    const ful = fulfillmentBadge[o.fulfillmentStatus]
                    const PayIcon = pay.icon
                    const FulIcon = ful.icon
                    return (
                      <TableRow key={o.id} className={cn("cursor-pointer transition-colors hover:bg-accent/50")} onClick={() => setSelectedOrderId(o.id)}>
                        <TableCell className="font-medium text-xs">{o.number}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{o.customerName}</span>
                            <span className="text-[11px] text-muted-foreground">{o.customerPhone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{o.channel}</span>
                            <span className="text-[11px] text-muted-foreground">{o.brand}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("gap-1 border-0 font-medium text-[10px]", pay.className)}>
                            <PayIcon className="h-3 w-3" />
                            {pay.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("gap-1 border-0 font-medium text-[10px]", ful.className)}>
                            <FulIcon className="h-3 w-3" />
                            {ful.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums text-sm">
                          R$ {o.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">
                <span>
                  <span className="font-medium text-foreground">{filtered.length}</span> de {orders.length} pedidos
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">Anterior</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">Próximo</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Inspeção e Ações</SheetTitle>
            <SheetDescription>Detalhes vitais do pedido para tomada de decisão imediata.</SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold tracking-tight">{selectedOrder.number}</div>
                  {selectedOrder.hasOpenTicket && (
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20">
                      <MessageCircle className="h-3 w-3" />
                      Ticket aberto
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{selectedOrder.customerName}</span>
                  <span>·</span>
                  <span>{selectedOrder.customerPhone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SummaryMetricCard label="Total" value={`R$ ${selectedOrder.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
                <SummaryMetricCard label="Itens" value={String(selectedOrder.itemsCount)} />
                <SummaryMetricCard label="Canal" value={selectedOrder.channel} />
                <SummaryMetricCard label="Marca" value={selectedOrder.brand} />
              </div>

              <div className="grid gap-3">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Status Financeiro
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={cn("gap-1.5 border-0 font-medium px-2 py-1", paymentBadge[selectedOrder.paymentStatus].className)}>
                        {React.createElement(paymentBadge[selectedOrder.paymentStatus].icon, { className: "h-3.5 w-3.5" })}
                        {paymentBadge[selectedOrder.paymentStatus].label}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-muted-foreground uppercase mb-1">Risco</div>
                      <RiskBar score={selectedOrder.riskScore} />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Status Logístico
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={cn("gap-1.5 border-0 font-medium px-2 py-1", fulfillmentBadge[selectedOrder.fulfillmentStatus].className)}>
                        {React.createElement(fulfillmentBadge[selectedOrder.fulfillmentStatus].icon, { className: "h-3.5 w-3.5" })}
                        {fulfillmentBadge[selectedOrder.fulfillmentStatus].label}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <NextActionCard
                description={selectedOrder.paymentStatus === "refused"
                  ? "Priorizar recuperação de pagamento e contato proativo com o cliente."
                  : selectedOrder.paymentStatus === "pending"
                    ? "Acompanhar confirmação de pagamento antes de liberar expedição."
                    : selectedOrder.fulfillmentStatus === "unfulfilled" || selectedOrder.fulfillmentStatus === "preparing"
                      ? "Validar SLA de expedição e garantir avanço do pedido na operação."
                      : selectedOrder.fulfillmentStatus === "returned"
                        ? "Revisar motivo da devolução e acionar fluxo de suporte/retenção."
                        : selectedOrder.hasOpenTicket
                          ? "Sincronizar status logístico com atendimento antes do próximo contato."
                          : "Pedido saudável. Seguir monitoramento normal até conclusão."}
              />

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button size="sm" className="gap-2 w-full">
                  <MessageCircle className="h-4 w-4" />
                  Atendimento
                </Button>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Truck className="h-4 w-4" />
                  Rastreio
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function RiskBar({ score }: { score: number }) {
  const color =
    score >= 50
      ? "bg-rose-500"
      : score >= 25
        ? "bg-amber-500"
        : "bg-emerald-500"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="w-7 text-right text-xs tabular-nums text-muted-foreground">{score}</span>
      {score >= 50 ? <AlertOctagon className="h-3.5 w-3.5 text-rose-500" /> : null}
    </div>
  )
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso))
}
