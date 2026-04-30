"use client"

import * as React from "react"
import Link from "next/link"
import { Activity, AlertTriangle, ArrowRight, BellRing, Bot, Boxes, BrainCircuit, ChartColumn, DollarSign, HardDrive, Lightbulb, Package, ShieldAlert, ShoppingCart, Sparkles, TrendingUp, Workflow, Calendar, Download } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OverviewTab, OperationTab, CommerceTab, AiTab, AutomationTab } from "@/components/analytics/analytics-view"

const updates = [
  { tone: "neutral", title: "Retrieval saudável", body: "Knowledge retrieval registrou 24 consultas com 96% de sucesso nas últimas 12h." },
  { tone: "warning", title: "Integrações exigem revisão", body: "2 integrações nativas precisam revisão de credenciais no workspace atual." },
  { tone: "positive", title: "Agente com ganho de qualidade", body: "O agente Concierge VIP teve aumento de 18% em respostas aceitas." },
]

const aiInsights = [
  { title: "Impulsionar acessórios com alto estoque", body: "Campanhas com estoque alto em acessórios podem receber impulso promocional hoje.", action: "Abrir campaigns", href: "/campaigns" },
  { title: "Console X perdeu conversão", body: "O produto Console X perdeu 14% de conversão após aumento de prazo logístico.", action: "Abrir orders", href: "/orders" },
  { title: "Automatizar handoff de rastreio", body: "Há oportunidade de automatizar handoff em tickets de rastreio com ganho estimado de 11%.", action: "Abrir automations", href: "/automations" },
]

const recommendedActions = [
  { title: "Revisar integrações degradadas", description: "2 conectores nativos exigem nova validação de credenciais.", href: "/apps", tone: "warning" },
  { title: "Investigar alertas recentes", description: "Erros e warnings operacionais concentrados nas últimas horas.", href: "/logs", tone: "default" },
  { title: "Validar assets críticos do workspace", description: "Arquivos usados por agentes e campanhas precisam revisão de disponibilidade.", href: "/storage", tone: "default" },
  { title: "Revisar campos de contato", description: "Ajustar estrutura usada por integrações, CRM e automações.", href: "/settings/contact-fields", tone: "default" },
]

const operationalAlerts = [
  { tone: "warning", title: "2 integrações precisam revisão imediata", description: "Credenciais vencendo podem afetar atendimento, automações e receita assistida.", href: "/apps", cta: "Revisar integrações" },
  { tone: "default", title: "18 SKUs com risco de ruptura", description: "Priorize campanhas e atendimento para evitar promessas com estoque sensível.", href: "/campaigns", cta: "Ajustar campanhas" },
]

const salesAndProductSignals = [
  { title: "Receita assistida por IA", value: "R$ 48k", hint: "+8% semana", icon: Sparkles },
  { title: "Top categoria", value: "Consoles", hint: "31% da receita", icon: ShoppingCart },
  { title: "Ruptura em atenção", value: "18 SKUs", hint: "priorizar campanhas", icon: Package },
  { title: "Margem preservada", value: "22,4%", hint: "sem erosão relevante", icon: TrendingUp },
]

export function HomeOverviewView() {
  const [period, setPeriod] = React.useState("30d")
  const [tab, setTab] = React.useState("executivo")

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Dashboard" }]} />
      <PageHeader
        title="Dashboard"
        description="Centro de comando analítico e operacional do workspace."
        actions={
          <>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="14d">Últimos 14 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => toast.success(`Exportação do dashboard preparada para o período ${period}`)}
            >
              <Download className="h-3.5 w-3.5" /> Exportar
            </Button>
          </>
        }
      />

      <div className="mt-2 grid gap-3 xl:grid-cols-2">
        {operationalAlerts.map((alert) => (
          <div key={alert.title} className={["rounded-2xl border px-4 py-3", alert.tone === "warning" ? "border-[var(--status-escalated-bg)] bg-[var(--status-escalated-bg)]/70" : "border-border bg-card"].join(" ")}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-[var(--status-escalated)]" />
                  {alert.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <Button asChild size="sm" variant={alert.tone === "warning" ? "default" : "outline"}>
                <Link href={alert.href}>{alert.cta}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <div className="flex items-center justify-between pb-0 mb-6">
          <NavTabsList>
            <NavTabsTrigger value="executivo">Executivo</NavTabsTrigger>
            <NavTabsTrigger value="operacao">Operação</NavTabsTrigger>
            <NavTabsTrigger value="ia">IA</NavTabsTrigger>
            <NavTabsTrigger value="vendas">Vendas</NavTabsTrigger>
            <NavTabsTrigger value="produto">Produto</NavTabsTrigger>
            <NavTabsTrigger value="integracoes">Integrações</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="executivo" className="mt-6 space-y-6">
          <SectionGrid title="Visão Executiva" description="Indicadores consolidados e tendências globais da operação." contentClassName="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <Card className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />Updates do workspace</CardTitle>
                <CardDescription>O que mudou na operação nas últimas horas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {updates.map((update) => (
                  <div key={update.title} className={["rounded-xl border p-4", update.tone === "warning" ? "border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60" : "border-border bg-background/70"].join(" ")}>
                    <div className="text-sm font-medium text-foreground">{update.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{update.body}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Insights da IA</CardTitle>
                <CardDescription>Sugestões contextuais e anomalias destacadas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight) => (
                  <div key={insight.title} className="rounded-xl border border-border bg-background/60 p-3">
                    <div className="text-sm font-medium text-foreground">{insight.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{insight.body}</div>
                    <Button asChild variant="link" size="sm" className="mt-2 h-auto px-0">
                      <Link href={insight.href}>{insight.action}</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SectionGrid>

          <OverviewTab />
        </TabsContent>

        <TabsContent value="operacao" className="mt-6 space-y-6">
          <OperationTab />
          <SectionGrid title="Ações Recomendadas" description="Próximos passos sugeridos para manter a operação saudável." contentClassName="grid gap-3 md:grid-cols-2">
            {recommendedActions.map((action) => (
              <Button key={action.title} asChild variant="outline" className="h-auto w-full justify-between py-4">
                <Link href={action.href}>
                  <span className="text-left">
                    <span className="block text-sm font-medium">{action.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{action.description}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </SectionGrid>
        </TabsContent>

        <TabsContent value="ia" className="mt-6 space-y-6">
          <AiTab />
        </TabsContent>

        <TabsContent value="vendas" className="mt-6 space-y-6">
          <CommerceTab />
        </TabsContent>

        <TabsContent value="produto" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {salesAndProductSignals.map((item) => <StatCard key={item.title} label={item.title} value={item.value} hint={item.hint} icon={item.icon} />)}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Comportamento do Catálogo</CardTitle>
              <CardDescription>Produtos digitais e físicos com maior tração e necessidade de reposição.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
                <Package className="mx-auto h-8 w-8 mb-3 opacity-20" />
                Métricas de produto digital, ativação de chaves e assinaturas detalhadas aparecerão aqui via Webhook.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integracoes" className="mt-6 space-y-6">
          <AutomationTab />
        </TabsContent>

      </Tabs>
    </PageContainer>
  )
}

function SectionGrid({ title, description, className, contentClassName, children }: { title: string; description: string; className?: string; contentClassName?: string; children: React.ReactNode }) {
  return (
    <section className={className}>
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={contentClassName}>{children}</div>
    </section>
  )
}
