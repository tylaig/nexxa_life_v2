"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  LabelList,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Sparkles,
  DollarSign,
  MessageSquare,
  Clock,
  Star,
  Bot,
  ShoppingCart,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from "lucide-react"

import {
  PageContainer,
  PageHeader,
  StatCard,
} from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  dailyVolume,
  responseTime,
  channelMix,
  topAgents,
  cartFunnel,
  revenueByAutomation,
  revenueTrend,
  workflowHealth,
  automationRuns,
  aiDeflection,
  aiUseCases,
  costPerResolution,
  csatDistribution,
  hourlyHeatmap,
  topIntents,
  kpis,
} from "@/lib/mock/analytics"

function fmtBRL(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}
function fmtPct(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`
}
function fmtDelta(n: number): { value: string; positive: boolean } {
  const positive = n >= 0
  return { value: `${positive ? "+" : ""}${(n * 100).toFixed(1)}pp`, positive }
}

export function AnalyticsView() {
  const [period, setPeriod] = React.useState("30d")
  const [tab, setTab] = React.useState("overview")

  const activeTabMeta = {
    overview: {
      title: "Leitura executiva",
      description: "Cruza volume, canais, receita e intenção para leitura rápida da operação.",
      action: "Validar desvios entre canais, receita assistida e picos de intenção.",
    },
    operation: {
      title: "Operação",
      description: "Foco em SLA, CSAT, heatmap e performance individual.",
      action: "Atacar gargalos de primeira resposta e janelas de pico com escala adequada.",
    },
    commerce: {
      title: "Comercial",
      description: "Mostra funil, recuperação e receita por automação.",
      action: "Priorizar automações com melhor conversão e maior impacto incremental.",
    },
    automation: {
      title: "Automação",
      description: "Monitora runs, taxa de sucesso, retries e DLQ.",
      action: "Reduzir falhas recorrentes e eliminar gargalos de replay na DLQ.",
    },
    ai: {
      title: "IA",
      description: "Acompanha deflection, custo, confiança e latência.",
      action: "Expandir casos com boa aceitação e revisar fluxos com baixa confiança.",
    },
  } as const

  const activeMeta = activeTabMeta[tab as keyof typeof activeTabMeta]

  return (
    <PageContainer>
      <PageHeader
        title="Analytics"
        description="Operação, receita atribuída, automação e desempenho de IA. Tudo o que você precisa para decidir."
        actions={
          <>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="14d">Últimos 14 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Relatório IA
            </Button>
          </>
        }
      />

      {/* Headline KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Receita atribuída"
          value={fmtBRL(kpis.attributedRevenue.value)}
          trend={{ value: `+${fmtPct(kpis.attributedRevenue.change)}`, positive: true }}
          hint="vs. período anterior"
          icon={DollarSign}
        />
        <StatCard
          label="Conversas"
          value={kpis.conversations30d.value.toLocaleString("pt-BR")}
          trend={{ value: `+${fmtPct(kpis.conversations30d.change)}`, positive: true }}
          icon={MessageSquare}
        />
        <StatCard
          label="Tempo de 1ª resposta"
          value={kpis.avgFirstResponse.value}
          trend={{ value: `${fmtPct(kpis.avgFirstResponse.change)}`, positive: true }}
          hint="meta: < 5min"
          icon={Clock}
        />
        <StatCard
          label="CSAT"
          value={`${kpis.csat30d.value.toFixed(1)}/5`}
          trend={{ value: `+${kpis.csat30d.change.toFixed(1)}`, positive: true }}
          icon={Star}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertTriangle className="h-4 w-4 text-[var(--status-pending)]" />
              Analytics precisa orientar decisão, não só exibir gráficos bonitos
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Priorize leitura de desvios, impacto comercial, operação e automação antes de aprofundar análise histórica.
            </p>
          </div>
          <div className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            Janela ativa: {period === "7d" ? "7 dias" : period === "14d" ? "14 dias" : period === "30d" ? "30 dias" : "90 dias"}
          </div>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <div className="grid gap-4 xl:grid-cols-[1fr_320px] xl:items-start">
          <div>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview">Visão geral</TabsTrigger>
              <TabsTrigger value="operation">Operação</TabsTrigger>
              <TabsTrigger value="commerce">Comercial</TabsTrigger>
              <TabsTrigger value="automation">Automação</TabsTrigger>
              <TabsTrigger value="ai">IA</TabsTrigger>
            </TabsList>
          </div>

          <aside className="rounded-xl border border-border bg-card p-4 xl:sticky xl:top-4">
            <div className="text-sm font-semibold">Resumo da aba</div>
            <div className="mt-1 text-xs text-muted-foreground">Orientação rápida para leitura e priorização.</div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Foco</div>
                <div className="mt-1 text-sm font-medium text-foreground">{activeMeta.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{activeMeta.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <AnalyticsMetric label="Período" value={period === "7d" ? "7 dias" : period === "14d" ? "14 dias" : period === "30d" ? "30 dias" : "90 dias"} />
                <AnalyticsMetric label="Aba" value={tab === "overview" ? "Geral" : tab === "operation" ? "Operação" : tab === "commerce" ? "Comercial" : tab === "automation" ? "Automação" : "IA"} />
              </div>

              <div className="rounded-lg border border-dashed border-border p-3">
                <div className="text-sm font-medium">Próxima leitura sugerida</div>
                <p className="mt-2 text-sm text-muted-foreground">{activeMeta.action}</p>
              </div>
            </div>
          </aside>
        </div>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <InsightCard
              title="Receita atribuída acelerando"
              body="A combinação de automação e IA assistida segue ampliando participação na receita total do período."
              tone="positive"
            />
            <InsightCard
              title="SLA pede atenção no topo do funil"
              body="Mesmo com ganho geral de volume, ainda vale vigiar primeira resposta e filas sensíveis em horários de pico."
              tone="warning"
            />
            <InsightCard
              title="Próximo passo recomendado"
              body="Cruzar operação, comercial e IA para encontrar flows com maior impacto e menor custo por resolução."
              tone="neutral"
            />
          </div>
          <OverviewTab />
        </TabsContent>
        <TabsContent value="operation" className="mt-4 space-y-4">
          <OperationTab />
        </TabsContent>
        <TabsContent value="commerce" className="mt-4 space-y-4">
          <CommerceTab />
        </TabsContent>
        <TabsContent value="automation" className="mt-4 space-y-4">
          <AutomationTab />
        </TabsContent>
        <TabsContent value="ai" className="mt-4 space-y-4">
          <AiTab />
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}

function AnalyticsMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}

/* -------------------------------- Overview ------------------------------- */

export function OverviewTab() {
  const volumeConfig = {
    conversations: { label: "Conversas", color: "var(--chart-1)" },
    automation: { label: "Em automação", color: "var(--chart-2)" },
  } satisfies ChartConfig

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Volume de conversas"
          subtitle="Conversas abertas por dia, separando atendimento humano e automação"
          right={
            <Badge variant="outline" className="gap-1 text-[10px]">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              +9,2%
            </Badge>
          }
        >
          <ChartContainer config={volumeConfig} className="h-[260px] w-full">
            <AreaChart data={dailyVolume} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="conv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="auto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} />
              <ChartTooltip cursor={{ stroke: "var(--border)" }} content={<ChartTooltipContent indicator="dot" />} />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#conv)"
              />
              <Area
                type="monotone"
                dataKey="automation"
                stroke="var(--chart-2)"
                strokeWidth={1.5}
                fill="url(#auto)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </Panel>

        <Panel title="Mix de canais" subtitle="Distribuição últimos 30 dias">
          <ChartContainer
            config={Object.fromEntries(
              channelMix.map((c) => [c.channel, { label: c.channel, color: c.color }])
            )}
            className="h-[260px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={channelMix}
                dataKey="conversations"
                nameKey="channel"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                strokeWidth={0}
              >
                {channelMix.map((entry) => (
                  <Cell key={entry.channel} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <ul className="mt-2 space-y-1 text-xs">
            {channelMix.map((c) => (
              <li key={c.channel} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                <span className="flex-1 text-muted-foreground">{c.channel}</span>
                <span className="font-medium tabular-nums">{c.conversations.toLocaleString("pt-BR")}</span>
                <span className="w-10 text-right tabular-nums text-muted-foreground">{fmtPct(c.share, 0)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Receita atribuída" subtitle="Orgânica vs. automatizada vs. assistida por IA">
          <ChartContainer
            config={{
              organic: { label: "Orgânica", color: "var(--chart-3)" },
              automated: { label: "Automatizada", color: "var(--chart-1)" },
              aiAssisted: { label: "IA assistida", color: "var(--chart-2)" },
            }}
            className="h-[240px] w-full"
          >
            <BarChart data={revenueTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={(v) => `R$${v / 1000}k`} />
              <ChartTooltip cursor={{ fill: "var(--accent)", opacity: 0.4 }} content={<ChartTooltipContent />} />
              <Bar dataKey="organic" stackId="r" fill="var(--chart-3)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="automated" stackId="r" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="aiAssisted" stackId="r" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </Panel>

        <Panel
          title="Top intenções de cliente"
          subtitle="Detectadas por classificação automática · 30 dias"
        >
          <ul className="space-y-2.5">
            {topIntents.map((it) => (
              <li key={it.intent} className="flex items-center gap-3">
                <span className="flex-1 truncate text-sm">{it.intent}</span>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(it.count / 1842) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
                  {it.count.toLocaleString("pt-BR")}
                </span>
                <span
                  className={cn(
                    "flex w-12 items-center justify-end gap-0.5 text-xs tabular-nums",
                    it.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {it.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {fmtPct(Math.abs(it.change), 0)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* -------------------------------- Operation ------------------------------ */

export function OperationTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Tempo de primeira resposta"
          subtitle="P50, P90 vs. meta de SLA"
        >
          <ChartContainer
            config={{
              p50: { label: "P50", color: "var(--chart-1)" },
              p90: { label: "P90", color: "var(--chart-3)" },
              target: { label: "Meta", color: "var(--muted-foreground)" },
            }}
            className="h-[240px] w-full"
          >
            <LineChart data={responseTime} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} unit="m" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="p50"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="p90"
                stroke="var(--chart-3)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--muted-foreground)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </Panel>

        <Panel title="CSAT · 30 dias" subtitle="Distribuição de avaliações">
          <div className="space-y-2">
            {csatDistribution.map((s) => {
              const total = csatDistribution.reduce((a, b) => a + b.count, 0)
              const pct = (s.count / total) * 100
              return (
                <div key={s.score} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-medium tabular-nums">{s.score}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                  <span className="w-10 text-right tabular-nums text-muted-foreground">
                    {s.count}
                  </span>
                  <span className="w-12 text-right tabular-nums text-muted-foreground">
                    {pct.toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background/40 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Score consolidado</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">4,6</span>
              <span className="text-xs text-muted-foreground">de 5 · 984 respostas</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Heatmap horário" subtitle="Volume médio de mensagens por dia da semana e hora · últimos 30 dias">
        <Heatmap />
      </Panel>

      <Panel title="Top agentes" subtitle="Performance individual · 30 dias">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Agente</th>
                <th className="py-2 pr-4 text-right font-medium">Conversas</th>
                <th className="py-2 pr-4 text-right font-medium">FRT médio</th>
                <th className="py-2 pr-4 text-right font-medium">Resolução</th>
                <th className="py-2 text-right font-medium">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topAgents.map((a) => (
                <tr key={a.name}>
                  <td className="py-2.5 pr-4 font-medium">{a.name}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">
                    {a.conversations.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{a.avgFrt.toFixed(1)}m</td>
                  <td className="py-2.5 pr-4 text-right">
                    <div className="ml-auto flex w-32 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${a.resolution * 100}%` }}
                        />
                      </div>
                      <span className="w-10 text-right tabular-nums text-xs text-muted-foreground">
                        {fmtPct(a.resolution, 0)}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {a.csat.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------- Commerce ------------------------------- */

export function CommerceTab() {
  const max = cartFunnel[0].value
  const final = cartFunnel[cartFunnel.length - 1].value
  const conversion = final / max

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Receita IA-assistida"
          value={fmtBRL(kpis.aiAssistedRevenue.value)}
          trend={{ value: `+${fmtPct(kpis.aiAssistedRevenue.change)}`, positive: true }}
          icon={Sparkles}
        />
        <StatCard
          label="Recuperação carrinho"
          value={fmtPct(kpis.cartRecoveryRate.value, 1)}
          trend={fmtDelta(kpis.cartRecoveryRate.change)}
          hint="248 pedidos resgatados"
          icon={ShoppingCart}
        />
        <StatCard
          label="AOV automação"
          value="R$ 312"
          trend={{ value: "+8,4%", positive: true }}
          icon={DollarSign}
        />
        <StatCard
          label="ROAS plataforma"
          value="14,2x"
          trend={{ value: "+1,8x", positive: true }}
          hint="receita / custo"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel
          title="Funil de recuperação de carrinho"
          subtitle={`${fmtPct(conversion, 1)} de conversão fim-a-fim`}
        >
          <div className="space-y-2">
            {cartFunnel.map((s, i) => {
              const pct = (s.value / max) * 100
              const dropFromPrev = i === 0 ? 0 : 1 - s.value / cartFunnel[i - 1].value
              return (
                <div key={s.stage} className="flex items-center gap-3">
                  <span className="w-44 truncate text-xs text-muted-foreground">{s.stage}</span>
                  <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-muted/50">
                    <div
                      className="flex h-full items-center justify-end pr-2 text-xs font-medium text-primary-foreground"
                      style={{ width: `${pct}%`, background: s.color }}
                    >
                      {s.value.toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <span className="w-14 text-right text-xs tabular-nums text-muted-foreground">
                    {fmtPct(pct / 100, 0)}
                  </span>
                  {i > 0 ? (
                    <span className="w-14 text-right text-[11px] tabular-nums text-rose-600 dark:text-rose-400">
                      −{fmtPct(dropFromPrev, 0)}
                    </span>
                  ) : (
                    <span className="w-14" />
                  )}
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel title="Receita por automação" subtitle="Top 6 fluxos · 30 dias">
          <ChartContainer
            config={{ revenue: { label: "Receita", color: "var(--chart-1)" } }}
            className="h-[260px] w-full"
          >
            <BarChart data={revenueByAutomation} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `R$${v / 1000}k`} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                width={120}
              />
              <ChartTooltip cursor={{ fill: "var(--accent)", opacity: 0.4 }} content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="revenue"
                  position="right"
                  formatter={(v: unknown) => fmtBRL(Number(v))}
                  className="fill-foreground text-[10px]"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </Panel>
      </div>

      <Panel title="Receita diária por origem" subtitle="Atribuição multi-touch · janela de 7 dias">
        <ChartContainer
          config={{
            organic: { label: "Orgânica", color: "var(--chart-3)" },
            automated: { label: "Automatizada", color: "var(--chart-1)" },
            aiAssisted: { label: "IA assistida", color: "var(--chart-2)" },
          }}
          className="h-[260px] w-full"
        >
          <AreaChart data={revenueTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aiR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="autoR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="orgR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={(v) => `R$${v / 1000}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="organic" stackId="r" stroke="var(--chart-3)" fill="url(#orgR)" />
            <Area type="monotone" dataKey="automated" stackId="r" stroke="var(--chart-1)" fill="url(#autoR)" />
            <Area type="monotone" dataKey="aiAssisted" stackId="r" stroke="var(--chart-2)" fill="url(#aiR)" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </Panel>
    </>
  )
}

/* ------------------------------- Automation ------------------------------ */

export function AutomationTab() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Execuções 30d"
          value={automationRuns.reduce((s, d) => s + d.succeeded + d.failed, 0).toLocaleString("pt-BR")}
          trend={{ value: "+12%", positive: true }}
          icon={Workflow}
        />
        <StatCard
          label="Taxa de sucesso"
          value={fmtPct(kpis.automationSuccess.value, 1)}
          trend={{ value: "+1,2pp", positive: true }}
          icon={CheckCircle2}
        />
        <StatCard
          label="DLQ ativa"
          value="184"
          hint="Pendente de replay"
          trend={{ value: "−6%", positive: true }}
        />
        <StatCard
          label="Tempo médio de execução"
          value="4,2s"
          hint="end-to-end"
          icon={Clock}
        />
      </div>

      <Panel title="Execuções por dia" subtitle="Sucesso, falhas e retries">
        <ChartContainer
          config={{
            succeeded: { label: "Sucesso", color: "var(--chart-1)" },
            failed: { label: "Falha", color: "var(--chart-3)" },
            retried: { label: "Retry", color: "var(--chart-4)" },
          }}
          className="h-[260px] w-full"
        >
          <BarChart data={automationRuns} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="succeeded" stackId="a" fill="var(--chart-1)" />
            <Bar dataKey="retried" stackId="a" fill="var(--chart-4)" />
            <Bar dataKey="failed" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </Panel>

      <Panel title="Saúde dos fluxos" subtitle="Distribuição de execuções por resultado">
        <div className="space-y-3">
          {workflowHealth.map((w) => (
            <div key={w.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{w.name}</span>
                <span className="tabular-nums text-muted-foreground">
                  {w.runs.toLocaleString("pt-BR")} runs
                </span>
              </div>
              <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-emerald-500"
                  style={{ width: `${w.success * 100}%` }}
                  title={`Sucesso ${fmtPct(w.success)}`}
                />
                <div
                  className="bg-amber-500"
                  style={{ width: `${w.errors * 100}%` }}
                  title={`Erros ${fmtPct(w.errors)}`}
                />
                <div
                  className="bg-rose-500"
                  style={{ width: `${w.dlq * 100}%` }}
                  title={`DLQ ${fmtPct(w.dlq)}`}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground">
                <span className="text-emerald-600 dark:text-emerald-400">{fmtPct(w.success, 0)} ok</span>
                <span className="text-amber-600 dark:text-amber-400">{fmtPct(w.errors, 0)} erro</span>
                <span className="text-rose-600 dark:text-rose-400">{fmtPct(w.dlq, 0)} DLQ</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* ----------------------------------- AI ---------------------------------- */

export function AiTab() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Deflection IA"
          value={fmtPct(kpis.aiDeflection.value, 0)}
          trend={{ value: "+5pp", positive: true }}
          hint="vs. atendimento humano puro"
          icon={Bot}
        />
        <StatCard
          label="Aceitação de sugestões"
          value="74%"
          trend={{ value: "+3pp", positive: true }}
          icon={Sparkles}
        />
        <StatCard
          label="Latência média"
          value="940ms"
          hint="p95: 1,8s"
          icon={Clock}
        />
        <StatCard
          label="Custo / resolução IA"
          value="R$ 0,84"
          trend={{ value: "−18%", positive: true }}
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="IA vs. humano" subtitle="Distribuição de conversas resolvidas">
          <ChartContainer
            config={{
              ai: { label: "IA", color: "var(--chart-2)" },
              human: { label: "Humano", color: "var(--chart-3)" },
            }}
            className="h-[240px] w-full"
          >
            <AreaChart data={aiDeflection} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} unit="%" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="ai" stackId="d" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.4} />
              <Area type="monotone" dataKey="human" stackId="d" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.4} />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </Panel>

        <Panel title="Custo por conversa resolvida" subtitle="IA vs. humano · BRL">
          <ChartContainer
            config={{
              ai: { label: "IA", color: "var(--chart-2)" },
              human: { label: "Humano", color: "var(--chart-3)" },
            }}
            className="h-[240px] w-full"
          >
            <LineChart data={costPerResolution} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={36} tickFormatter={(v) => `R$${v}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="ai" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="human" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </Panel>
      </div>

      <Panel title="Use cases de IA" subtitle="Volume, aceitação, confiança e latência por caso de uso · 30 dias">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Use case</th>
                <th className="py-2 pr-4 text-right font-medium">Chamadas</th>
                <th className="py-2 pr-4 text-right font-medium">Aceitação</th>
                <th className="py-2 pr-4 text-right font-medium">Confiança</th>
                <th className="py-2 text-right font-medium">Latência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {aiUseCases.map((u) => (
                <tr key={u.useCase}>
                  <td className="py-2.5 pr-4 font-medium">{u.useCase}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">
                    {u.calls.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-2.5 pr-4 text-right">
                    <div className="ml-auto flex w-32 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-ai" style={{ width: `${u.accept * 100}%` }} />
                      </div>
                      <span className="w-10 text-right tabular-nums text-xs text-muted-foreground">
                        {fmtPct(u.accept, 0)}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtPct(u.avgConfidence, 0)}</td>
                  <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                    {u.avgLatency}ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------- Helpers -------------------------------- */

export function Panel({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {right}
      </header>
      {children}
    </section>
  )
}

export function InsightCard({
  title,
  body,
  tone,
}: {
  title: string
  body: string
  tone: "positive" | "warning" | "neutral"
}) {
  const toneClassName =
    tone === "positive"
      ? "border-emerald-500/20 bg-emerald-500/5"
      : tone === "warning"
        ? "border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60"
        : "border-border bg-card"

  return (
    <div className={cn("rounded-xl border p-4", toneClassName)}>
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-background/80 p-2 text-muted-foreground">
          <Eye className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  )
}

function Heatmap() {
  const max = Math.max(...hourlyHeatmap.flatMap((r) => r.cells))
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="flex items-center pl-12 text-[10px] tabular-nums text-muted-foreground">
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="flex-1 text-center">
              {h % 3 === 0 ? `${h}h` : ""}
            </div>
          ))}
        </div>
        <div className="mt-1 space-y-0.5">
          {hourlyHeatmap.map((row) => (
            <div key={row.day} className="flex items-center gap-1">
              <span className="w-10 text-right text-[10px] uppercase text-muted-foreground">
                {row.day}
              </span>
              <div className="flex flex-1 gap-0.5">
                {row.cells.map((v, h) => {
                  const intensity = v / max
                  return (
                    <div
                      key={h}
                      title={`${row.day} ${h}h · ${v} mensagens`}
                      className="h-5 flex-1 rounded-sm"
                      style={{
                        background: `color-mix(in oklab, var(--primary) ${intensity * 90}%, var(--muted) ${
                          (1 - intensity) * 100
                        }%)`,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Menos</span>
          <div className="flex gap-0.5">
            {[0.1, 0.3, 0.55, 0.8, 1].map((i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm"
                style={{
                  background: `color-mix(in oklab, var(--primary) ${i * 90}%, var(--muted) ${
                    (1 - i) * 100
                  }%)`,
                }}
              />
            ))}
          </div>
          <span>Mais</span>
        </div>
      </div>
    </div>
  )
}
