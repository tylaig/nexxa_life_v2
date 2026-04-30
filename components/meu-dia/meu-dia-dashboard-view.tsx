import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  dashboardExecutionSignals,
  dashboardHero,
  dashboardPrimaryCards,
  dashboardQuickLinks,
} from "@/components/meu-dia/dashboard-content"
import { meuDiaExecutionGraph, meuDiaPriorityFlow, meuDiaWeeklySystemSummary } from "@/components/meu-dia/system-connections"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaDashboardView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia" }, { label: "Dashboard" }]} />
      <PageHeader
        title={dashboardHero.title}
        description={dashboardHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {dashboardHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/checklist">Começar pelo checklist</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <CardTitle>{dashboardHero.kicker}</CardTitle>
            <CardDescription>
              Workspace inicial para concentrar clareza, execução, planejamento e leitura da evolução no app raiz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">{dashboardHero.description}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {dashboardPrimaryCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
                    <Button asChild variant="link" size="sm" className="mt-3 h-auto px-0">
                      <Link href={card.href}>
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Superfícies-chave</CardTitle>
            <CardDescription>Atalhos oficiais para navegar pelo ciclo principal do Meu Dia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardQuickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Button key={item.href} asChild variant="outline" className="h-auto w-full justify-between py-4">
                  <Link href={item.href}>
                    <span className="flex min-w-0 items-start gap-3 text-left">
                      <span className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {dashboardExecutionSignals.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ciclo conectado</CardTitle>
            <CardDescription>
              Sequência operacional atual entre as superfícies do Meu Dia dentro do shell oficial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {meuDiaExecutionGraph.sequence.map((step, index) => (
                <Badge key={step} variant={index === 0 ? "default" : "outline"} className="rounded-full px-3 py-1">
                  {step}
                </Badge>
              ))}
            </div>
            <div className="space-y-3">
              {meuDiaExecutionGraph.edges.map((edge) => (
                <div key={`${edge.from}-${edge.to}`} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="text-sm font-semibold text-foreground">
                    {edge.from} → {edge.to}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{edge.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leitura consolidada da semana</CardTitle>
            <CardDescription>
              Sinais reunidos a partir da conexão entre execução, agenda, reflexão e relatórios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                <span>Prioridade derivada do diagnóstico</span>
                <Badge variant="outline" className="rounded-full">{meuDiaPriorityFlow.confidenceLabel}</Badge>
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {meuDiaWeeklySystemSummary.priorityLabel} · prioridade #{meuDiaPriorityFlow.priority}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Meta ativa: {meuDiaPriorityFlow.goal} ({meuDiaPriorityFlow.goalAxis}) · Tarefa-chave: {meuDiaPriorityFlow.checklistTask} ({meuDiaPriorityFlow.checklistPeriod}) · Bloco da agenda: {meuDiaPriorityFlow.agendaEvent} ({meuDiaPriorityFlow.agendaCategory})
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{meuDiaPriorityFlow.rationale}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Meta foco</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{meuDiaWeeklySystemSummary.focusGoal}</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Próximo evento</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{meuDiaWeeklySystemSummary.nextAgendaEvent}</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Execução</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{meuDiaWeeklySystemSummary.completedTasks} concluídas · {meuDiaWeeklySystemSummary.pendingTasks} pendentes</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Reflexão + leitura</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{meuDiaWeeklySystemSummary.journalSignal} · {meuDiaWeeklySystemSummary.reportsSignal}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  )
}
