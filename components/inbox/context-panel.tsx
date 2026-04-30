"use client"

import * as React from "react"
import {
  Crown,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  Package,
  TruckIcon,
  CreditCard,
  RefreshCw,
  ExternalLink,
  Bot,
  TrendingUp,
  Activity,
  ShieldCheck,
  AlertTriangle,
  UserRoundX,
  Timer,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { Conversation, Order } from "@/lib/inbox/types"
import { avatarColor, formatDateTime, initials, relativeTime } from "@/lib/inbox/helpers"

export function ContextPanel({ conversation: c, onOpenDialog }: { conversation: Conversation; onOpenDialog: (type: "order" | "profile" | "source") => void }) {
  return (
    <aside
      className="flex w-[340px] shrink-0 flex-col border-l border-border bg-sidebar/40"
      aria-label="Painel contextual"
    >
      <Tabs defaultValue="details" className="flex flex-1 flex-col">
        <div className="flex h-12 items-center border-b border-border px-3">
          <TabsList className="h-8 w-full justify-start gap-0 bg-transparent p-0">
            <TabsTrigger
              value="details"
              className="h-8 rounded-none border-b-2 border-transparent bg-transparent px-3 text-[12px] data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Detalhes
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="h-8 rounded-none border-b-2 border-transparent bg-transparent px-3 text-[12px] data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Histórico
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="details"
          className="scrollbar-thin m-0 flex-1 overflow-y-auto px-4 py-4"
        >
          <ConversationSummaryCard conversation={c} />
          <div className="mt-4">
            <DetailsTab conversation={c} onOpenDialog={(type) => onOpenDialog(type)} />
          </div>
          <div className="mt-5">
            <AiTab conversation={c} onOpenDialog={(type) => onOpenDialog(type)} />
          </div>
        </TabsContent>
        <TabsContent
          value="history"
          className="scrollbar-thin m-0 flex-1 overflow-y-auto px-4 py-4"
        >
          <HistoryTab conversation={c} onOpenDialog={(type) => onOpenDialog(type)} />
        </TabsContent>
      </Tabs>
    </aside>
  )
}

function ConversationSummaryCard({ conversation: c }: { conversation: Conversation }) {
  const slaDelta = c.slaDueAt ? new Date(c.slaDueAt).getTime() - new Date("2026-04-27T15:32:00Z").getTime() : null
  const slaLabel = slaDelta === null ? "Sem SLA" : slaDelta <= 0 ? "SLA estourado" : slaDelta < 15 * 60_000 ? "SLA em risco" : "SLA controlado"
  const slaTone = slaDelta === null ? "text-muted-foreground" : slaDelta <= 0 || slaDelta < 15 * 60_000 ? "text-[var(--status-escalated)]" : "text-[var(--status-resolved)]"

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
            Resumo operacional
          </div>
          <div className="mt-1 text-[13px] font-semibold text-foreground">{c.intent ?? "Sem intenção detectada"}</div>
        </div>
        {c.assignee ? (
          <span className="rounded-full border border-border bg-background px-2 py-1 text-[10.5px] text-foreground/80">
            Owner · {c.assignee.name}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-escalated-bg)] bg-[var(--status-escalated-bg)] px-2 py-1 text-[10.5px] font-medium text-[var(--status-escalated)]">
            <UserRoundX className="size-3" />
            Sem dono
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <SummaryMetric icon={Timer} label="SLA" value={slaLabel} tone={slaTone} />
        <SummaryMetric icon={AlertTriangle} label="Prioridade" value={priorityLabel(c.priority)} tone={c.priority === "urgent" || c.priority === "high" ? "text-[var(--status-escalated)]" : "text-foreground"} />
        <SummaryMetric icon={ShieldCheck} label="Time" value={teamLabel(c.team)} />
        <SummaryMetric icon={TrendingUp} label="Próximo passo" value={nextSteps(c)[0]} compact />
      </div>
    </div>
  )
}

function DetailsTab({ conversation: c, onOpenDialog }: { conversation: Conversation; onOpenDialog: (type: "profile") => void }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Identity */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar className="size-14 border border-border">
          <AvatarFallback className={cn("text-[14px] font-medium", avatarColor(c.contact.id))}>
            {initials(c.contact.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[14px] font-semibold">{c.contact.name}</span>
            {c.contact.isVip && <Crown className="size-3.5 text-[oklch(0.65_0.15_75)]" />}
          </div>
          <div className="text-[11.5px] text-muted-foreground">{c.contact.segment}</div>
        </div>
        <Button variant="outline" size="sm" className="mt-1 h-7 gap-1 text-[12px]" onClick={() => onOpenDialog("profile")}>
          Ver perfil 360
          <ExternalLink className="size-3" />
        </Button>
      </div>

      {/* Contact info */}
      <Section title="Contato">
        <Row icon={Phone} label="Telefone" value={c.contact.phone} mono />
        {c.contact.email && <Row icon={Mail} label="E-mail" value={c.contact.email} />}
        {c.contact.city && <Row icon={MapPin} label="Localização" value={c.contact.city} />}
        <Row
          icon={Calendar}
          label="Cliente desde"
          value={new Date(c.contact.firstSeenAt).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        />
      </Section>

      {/* Stats */}
      <Section title="Lifetime">
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Pedidos" value={String(c.contact.totalOrders)} />
          <StatCard label="LTV" value={c.contact.lifetimeValue} />
        </div>
      </Section>

      {/* Tags */}
      <Section title="Tags">
        <div className="flex flex-wrap gap-1.5">
          {c.contact.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-card px-1.5 py-0.5 text-[11px] text-foreground/80"
            >
              {t}
            </span>
          ))}
          <button
            type="button"
            className="rounded-md border border-dashed border-border px-1.5 py-0.5 text-[11px] text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            onClick={() => toast.success("Editor de tags do perfil disponível no fluxo mock")}
          >
            + adicionar
          </button>
        </div>
      </Section>

      {/* Conversation meta */}
      <Section title="Conversa">
        <Row label="Time" value={teamLabel(c.team)} />
        <Row label="Prioridade" value={priorityLabel(c.priority)} />
        <Row label="Canal" value={c.channelNumber} small />
        <Row label="Última atividade" value={relativeTime(c.lastActivityAt) + " atrás"} />
        {c.intent && <Row label="Intenção detectada" value={c.intent} small />}
        {c.sentiment && (
          <Row
            label="Sentimento"
            value={
              c.sentiment === "positive"
                ? "Positivo"
                : c.sentiment === "negative"
                  ? "Negativo"
                  : "Neutro"
            }
          />
        )}
      </Section>

      {/* Consent */}
      <Section title="Consentimento">
        <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
          <div className="flex items-center gap-2 text-[12px]">
            <ShieldCheck
              className={cn(
                "size-3.5",
                c.contact.consentMarketing ? "text-[var(--status-resolved)]" : "text-muted-foreground"
              )}
            />
            <span>Marketing WhatsApp</span>
          </div>
          <span
            className={cn(
              "text-[11px] font-medium",
              c.contact.consentMarketing
                ? "text-[var(--status-resolved)]"
                : "text-muted-foreground"
            )}
          >
            {c.contact.consentMarketing ? "Opt-in" : "Sem consentimento"}
          </span>
        </div>
      </Section>
    </div>
  )
}

function HistoryTab({ conversation: c, onOpenDialog }: { conversation: Conversation; onOpenDialog: (type: "order" | "profile") => void }) {
  const activityEvents = [
    { id: "ev1", type: "conversation" as const, label: "Conversa iniciada via WhatsApp", time: c.lastActivityAt, detail: c.intent ?? "Atendimento geral" },
    { id: "ev2", type: "automation" as const, label: "Automação de boas-vindas ativada", time: "2026-04-27T14:00:00Z", detail: "Flow: Onboarding VIP" },
    ...(c.order ? [{ id: "ev3", type: "order" as const, label: `Pedido ${c.order.number} criado`, time: "2026-04-26T10:00:00Z", detail: `Total: ${c.order.total}` }] : []),
    { id: "ev4", type: "conversation" as const, label: "Primeiro contato registrado", time: c.contact.firstSeenAt, detail: `Canal: ${c.channelNumber}` },
  ]
  const typeConfig = {
    conversation: { color: "bg-blue-500", icon: "💬" },
    automation: { color: "bg-purple-500", icon: "⚡" },
    order: { color: "bg-emerald-500", icon: "📦" },
  }
  return (
    <div className="flex flex-col gap-5">
      {c.order ? (
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-muted-foreground" />
              <span className="font-mono text-[13px] font-semibold">{c.order.number}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 gap-1 px-1.5 text-[11px]" onClick={() => onOpenDialog("order")}>
              Abrir <ExternalLink className="size-3" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[12px]">
            <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div><div className="font-semibold">{c.order.total}</div></div>
            <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</div><OrderStatusBadge status={c.order.status} /></div>
            <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Itens</div><div>{c.order.items.length}</div></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-4 text-center">
          <Package className="size-5 text-muted-foreground/60" />
          <div className="text-[12px] text-muted-foreground">Nenhum pedido vinculado</div>
          <Button variant="outline" size="sm" className="h-6 text-[11px]" onClick={() => onOpenDialog("order")}>Buscar pedido</Button>
        </div>
      )}
      <Section title="Linha do tempo">
        <ol className="relative ml-1 flex flex-col gap-3 border-l border-border pl-4">
          {activityEvents.map((ev) => {
            const cfg = typeConfig[ev.type]
            return (
              <li key={ev.id} className="relative">
                <span className={cn("absolute -left-[21px] top-1 flex size-3 items-center justify-center rounded-full border-2 border-background", cfg.color)} aria-hidden />
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12.5px] font-medium">{cfg.icon} {ev.label}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[10.5px] text-muted-foreground">
                  <span>{ev.detail}</span>
                  <span className="font-mono">{formatDateTime(ev.time)}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>
      {c.order && (
        <div>
          <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Ações rápidas</div>
          <div className="grid grid-cols-2 gap-1.5">
            <QuickAction icon={CreditCard} onClick={() => toast.success("Reenvio de link (mock)")}>Reenviar pagamento</QuickAction>
            <QuickAction icon={TruckIcon} onClick={() => toast.success("Reendereçamento (mock)")}>Reendereçar</QuickAction>
            <QuickAction icon={RefreshCw} onClick={() => toast.success("Devolução (mock)")}>Devolução</QuickAction>
            <QuickAction icon={Activity} onClick={() => toast.success("Status consultado (mock)")}>Consultar status</QuickAction>
          </div>
        </div>
      )}
    </div>
  )
}

function OrderTab({ order, onOpenDialog }: { order: Order; onOpenDialog: (type: "order") => void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-muted-foreground" />
            <span className="font-mono text-[13px] font-semibold">{order.number}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 gap-1 px-1.5 text-[11px]" onClick={() => onOpenDialog("order")}>
            Abrir
            <ExternalLink className="size-3" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Total
            </div>
            <div className="font-semibold">{order.total}</div>
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Status
            </div>
            <div>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Pagamento
            </div>
            <div className="text-foreground/90">{order.paymentMethod}</div>
          </div>
          {order.trackingCode && (
            <div className="col-span-2">
              <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Rastreio
              </div>
              <div className="font-mono text-[11.5px]">
                {order.trackingCode}
                <span className="ml-1.5 text-muted-foreground">· {order.carrier}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          Itens
        </div>
        <div className="flex flex-col gap-1.5">
          {order.items.map((it) => (
            <div
              key={it.sku}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <Package className="size-4 text-muted-foreground" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-[12.5px] font-medium">{it.name}</span>
                <span className="font-mono text-[10.5px] text-muted-foreground">
                  {it.sku} · qtd {it.qty}
                </span>
              </div>
              <span className="shrink-0 text-[12px] tabular-nums">{it.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          Linha do tempo
        </div>
        <ol className="relative ml-1 flex flex-col gap-3 border-l border-border pl-4">
          {order.timeline.map((ev, i) => (
            <li key={ev.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[21px] top-1 flex size-3 items-center justify-center rounded-full border-2 border-background",
                  ev.status === "completed" && "bg-[var(--status-resolved)]",
                  ev.status === "current" && "bg-[var(--status-pending)] ring-4 ring-[var(--status-pending-bg)]",
                  ev.status === "pending" && "bg-muted",
                  ev.status === "failed" && "bg-[var(--status-escalated)]"
                )}
                aria-hidden
              />
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={cn(
                    "text-[12.5px] font-medium",
                    ev.status === "current" && "text-[var(--status-pending)]",
                    ev.status === "failed" && "text-[var(--status-escalated)]",
                    ev.status === "pending" && "text-muted-foreground"
                  )}
                >
                  {ev.label}
                </span>
                {ev.timestamp && (
                  <span className="font-mono text-[10.5px] text-muted-foreground">
                    {formatDateTime(ev.timestamp)}
                  </span>
                )}
              </div>
              {ev.detail && (
                <p className="mt-0.5 text-[11.5px] text-muted-foreground">{ev.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Quick actions */}
      <div>
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          Ações rápidas
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <QuickAction icon={CreditCard} onClick={() => toast.success("Reenvio de link de pagamento acionado (mock)")}>Reenviar link de pagamento</QuickAction>
          <QuickAction icon={TruckIcon} onClick={() => toast.success("Reendereçamento de entrega acionado (mock)")}>Reendereçar entrega</QuickAction>
          <QuickAction icon={RefreshCw} onClick={() => toast.success("Fluxo de devolução aberto (mock)")}>Abrir devolução</QuickAction>
          <QuickAction icon={Activity} onClick={() => toast.success("Consulta de status executada (mock)")}>Consultar status</QuickAction>
        </div>
      </div>
    </div>
  )
}

function AiTab({ conversation: c, onOpenDialog }: { conversation: Conversation; onOpenDialog: (type: "source") => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-[var(--ai-border)] bg-[var(--ai-bg)] p-3">
        <div className="mb-2 flex items-center gap-2">
          <Bot className="size-4 text-[var(--ai)]" />
          <span className="text-[12px] font-semibold">Resumo da conversa</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-foreground/90">
          {c.intent ? `${c.intent}. ` : ""}
          {c.sentiment === "negative"
            ? "Cliente expressou insatisfação clara. "
            : c.sentiment === "positive"
              ? "Tom geral positivo. "
              : ""}
          {c.contact.isVip
            ? "Trata-se de cliente VIP — política de compensação acelerada disponível."
            : "Cliente regular dentro de SLAs padrão."}
        </p>
      </div>

      <Section title="Sinais">
        <SignalRow
          icon={TrendingUp}
          label="Propensão de conversão"
          value={c.contact.isVip ? "94%" : "62%"}
          tone={c.contact.isVip ? "positive" : "neutral"}
        />
        <SignalRow
          icon={Activity}
          label="Risco de churn"
          value={c.sentiment === "negative" ? "Alto" : "Baixo"}
          tone={c.sentiment === "negative" ? "negative" : "positive"}
        />
        <SignalRow
          icon={ShieldCheck}
          label="Score antifraude"
          value={c.team === "fraude" ? "0.87 · revisar" : "0.12 · OK"}
          tone={c.team === "fraude" ? "negative" : "positive"}
        />
      </Section>

      <Section title="Conhecimento usado">
        {c.aiSuggestion ? (
          <div className="flex flex-col gap-1.5">
            {c.aiSuggestion.sources.map((s) => (
              <button
                key={s.title}
                type="button"
                className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-2 text-left transition-colors hover:border-foreground/20"
                onClick={() => onOpenDialog("source")}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    s.type === "policy" && "bg-[var(--status-escalated)]",
                    s.type === "faq" && "bg-[var(--status-open)]",
                    s.type === "catalog" && "bg-[var(--status-resolved)]",
                    s.type === "order" && "bg-[var(--status-pending)]"
                  )}
                />
                <span className="flex-1 truncate text-[12px]">{s.title}</span>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  {s.type}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border px-3 py-4 text-center text-[11.5px] text-muted-foreground">
            Nenhum artigo de conhecimento foi consultado nesta conversa.
          </div>
        )}
      </Section>

      <Section title="Próximos passos sugeridos">
        <ul className="flex flex-col gap-1.5">
          {nextSteps(c).map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-md border border-border bg-card px-2.5 py-2"
            >
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded bg-[var(--ai-bg)] text-[10px] font-semibold text-[var(--ai)]">
                {i + 1}
              </span>
              <span className="text-[12px] leading-snug text-foreground/90">{s}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

function nextSteps(c: Conversation): string[] {
  if (c.team === "fraude") {
    return [
      "Solicitar comprovante de identidade (RG e selfie)",
      "Confirmar último login no app",
      "Se não houver comprovação em 30min, cancelar pedido e bloquear cartão",
    ]
  }
  if (c.contact.isVip && c.sentiment === "negative") {
    return [
      "Aplicar cupom de R$ 250 (política VIP · atraso > 48h)",
      "Conceder 12 meses de PS Plus Premium",
      "Adicionar nota de follow-up para 28/04",
    ]
  }
  if (c.status === "in_automation") {
    return [
      "Aguardar resposta do cliente (T+24h)",
      "Se não responder, escalar para Vendas",
      "Atualizar atributo last_payment_attempt",
    ]
  }
  return [
    "Confirmar disponibilidade e prazo",
    "Enviar link com produtos sugeridos",
    "Tentar fechamento com desconto de primeira compra",
  ]
}

// ---------- Sub-components ----------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  mono,
  small,
}: {
  icon?: React.ElementType
  label: string
  value: string
  mono?: boolean
  small?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-[12px]">
      <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 break-words text-right text-foreground/90",
          mono && "font-mono",
          small && "text-[11.5px]"
        )}
      >
        {value}
      </span>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[15px] font-semibold tabular-nums">{value}</div>
    </div>
  )
}

function QuickAction({
  icon: Icon,
  children,
  onClick,
}: {
  icon: React.ElementType
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-2 rounded-md border border-border bg-card p-2 text-left transition-colors hover:border-foreground/20 hover:bg-accent/40"
    >
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <span className="text-[11.5px] leading-tight">{children}</span>
    </button>
  )
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  tone,
  compact,
}: {
  icon: React.ElementType
  label: string
  value: string
  tone?: string
  compact?: boolean
}) {
  return (
    <div className="rounded-lg border border-border bg-background/70 px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <div className={cn("mt-1 text-[12px] font-medium text-foreground", tone, compact && "line-clamp-2 leading-snug")}>
        {value}
      </div>
    </div>
  )
}

function SignalRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType
  label: string
  value: string
  tone: "positive" | "negative" | "neutral"
}) {
  const toneClass =
    tone === "positive"
      ? "text-[var(--status-resolved)]"
      : tone === "negative"
        ? "text-[var(--status-escalated)]"
        : "text-muted-foreground"
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-card px-2.5 py-2">
      <div className="flex items-center gap-2 text-[12px]">
        <Icon className="size-3.5 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <span className={cn("text-[12px] font-medium tabular-nums", toneClass)}>{value}</span>
    </div>
  )
}

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    paid: { label: "Pago", c: "bg-[var(--status-resolved-bg)] text-[var(--status-resolved)]" },
    processing: { label: "Em processamento", c: "bg-[var(--status-open-bg)] text-[var(--status-open)]" },
    shipped: { label: "Despachado", c: "bg-[var(--status-open-bg)] text-[var(--status-open)]" },
    delivered: { label: "Entregue", c: "bg-[var(--status-resolved-bg)] text-[var(--status-resolved)]" },
    delayed: { label: "Atrasado", c: "bg-[var(--status-escalated-bg)] text-[var(--status-escalated)]" },
    cancelled: { label: "Cancelado", c: "bg-muted text-muted-foreground" },
    payment_failed: {
      label: "Pagamento falhou",
      c: "bg-[var(--status-escalated-bg)] text-[var(--status-escalated)]",
    },
  }[status]
  return (
    <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium", map.c)}>
      {map.label}
    </span>
  )
}

function teamLabel(t: Conversation["team"]) {
  return { vendas: "Vendas", suporte: "Suporte", logistica: "Logística", fraude: "Antifraude" }[t]
}

function priorityLabel(p: Conversation["priority"]) {
  return { low: "Baixa", normal: "Normal", high: "Alta", urgent: "Urgente" }[p]
}
