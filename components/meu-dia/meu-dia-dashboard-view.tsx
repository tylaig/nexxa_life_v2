import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { DashboardAnalyticsPanel } from "@/components/meu-dia/dashboard-analytics-panel"
import { dashboardExecutionSignals, dashboardHero, dashboardPrimaryCards, dashboardQuickLinks } from "@/components/meu-dia/dashboard-content"
import { meuDiaExecutionGraph, meuDiaPriorityFlow, meuDiaWeeklySystemSummary } from "@/components/meu-dia/system-connections"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeDashboardView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "nexxa_life" }, { label: "Dashboard" }]} />
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

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  {dashboardHero.kicker}
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{dashboardHero.title}</h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">{dashboardHero.description}</p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
                      Prioridade dominante
                    </div>
                    <Badge variant="outline" className="rounded-full border-amber-500/30 bg-background/70 text-[11px]">
                      {meuDiaPriorityFlow.confidenceLabel}
                    </Badge>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-foreground">
                    {meuDiaWeeklySystemSummary.priorityLabel} · prioridade #{meuDiaPriorityFlow.priority}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{meuDiaPriorityFlow.rationale}</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Execução do dia</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">{meuDiaWeeklySystemSummary.completedTasks} concluídas</div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {meuDiaWeeklySystemSummary.pendingTasks} pendentes · próximo bloco: {meuDiaWeeklySystemSummary.nextAgendaEvent}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {dashboardPrimaryCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-2xl border border-border bg-background/70 p-4 shadow-sm shadow-black/5">
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

        <Card className="border-border/80">
          <CardHeader className="pb-4">
            <CardTitle>Superfícies-chave</CardTitle>
            <CardDescription>Atalhos oficiais para navegar pelo ciclo principal do nexxa_life.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardQuickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  className="h-auto w-full justify-between rounded-2xl border-border/80 py-4 hover:bg-accent/40"
                >
                  <Link href={item.href}>
                    <span className="flex min-w-0 items-start gap-3 text-left">
                      <span className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
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

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Painel analítico do ciclo</CardTitle>
            <CardDescription>
              Visão consolidada para execução, bem-estar e evolução, seguindo a diretriz do legado para dashboard básico com leitura gráfica.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DashboardAnalyticsPanel />
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Leitura consolidada da semana</CardTitle>
            <CardDescription>
              Sinais reunidos a partir da conexão entre execução, agenda, reflexão e relatórios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Jornada prioritária</div>
              <div className="mt-3 grid gap-2">
                <div className="rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm text-foreground">
                  <span className="font-semibold">Meta:</span> {meuDiaPriorityFlow.goal} ({meuDiaPriorityFlow.goalAxis})
                </div>
                <div className="rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm text-foreground">
                  <span className="font-semibold">Tarefa-chave:</span> {meuDiaPriorityFlow.checklistTask} ({meuDiaPriorityFlow.checklistPeriod})
                </div>
                <div className="rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm text-foreground">
                  <span className="font-semibold">Bloco da agenda:</span> {meuDiaPriorityFlow.agendaEvent} ({meuDiaPriorityFlow.agendaCategory})
                </div>
              </div>
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
                <div className="mt-2 text-sm font-semibold text-foreground">
                  {meuDiaWeeklySystemSummary.completedTasks} concluídas · {meuDiaWeeklySystemSummary.pendingTasks} pendentes
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Reflexão + leitura</div>
                <div className="mt-2 text-sm font-semibold text-foreground">
                  {meuDiaWeeklySystemSummary.journalSignal} · {meuDiaWeeklySystemSummary.reportsSignal}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Ciclo conectado</CardTitle>
            <CardDescription>
              Sequência operacional atual entre as superfícies do nexxa_life dentro do shell oficial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {meuDiaExecutionGraph.sequence.map((step, index) => (
                <Badge key={step} variant={index === 0 ? "default" : "outline"} className="rounded-full px-3 py-1">
                  {step}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              {meuDiaExecutionGraph.edges.map((edge, index) => (
                <div
                  key={`${edge.from}-${edge.to}`}
                  className="rounded-2xl border border-border bg-background/60 p-4"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    <span>Etapa {index + 1}</span>
                    <span>•</span>
                    <span>{edge.from} → {edge.to}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{edge.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Resumo operacional</CardTitle>
            <CardDescription>
              Leitura curta para orientar a próxima decisão antes de abrir as superfícies detalhadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Eixo crítico</div>
              <div className="mt-2 text-base font-semibold text-foreground">{meuDiaWeeklySystemSummary.lowestAxis}</div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Progresso do dia</div>
              <div className="mt-2 text-base font-semibold text-foreground">{meuDiaWeeklySystemSummary.executionProgress}</div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Próxima melhor ação</div>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Reforçar <span className="font-semibold">{meuDiaWeeklySystemSummary.lowestAxis}</span> conectando a meta
                <span className="font-semibold"> {meuDiaPriorityFlow.goal}</span> com a tarefa
                <span className="font-semibold"> {meuDiaPriorityFlow.checklistTask}</span> antes do bloco
                <span className="font-semibold"> {meuDiaPriorityFlow.agendaEvent}</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  )
}
