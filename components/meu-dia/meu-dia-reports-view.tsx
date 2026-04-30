import Link from "next/link"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { ReportsChartPanel } from "@/components/meu-dia/reports-chart-panel"
import { reportsHero, reportsInsightTemplates, reportsKpis, reportsQuickSignals } from "@/components/meu-dia/reports-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeReportsView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "nexxa_life", href: "/dashboard" }, { label: "Relatórios" }]} />
      <PageHeader
        title={reportsHero.title}
        description={reportsHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {reportsHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/diagnostic">Revisar diagnóstico</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Panorama de leitura
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Relatórios para enxergar tendência, não só evento isolado.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    Use esta camada para comparar evolução recente, validar sinais de atenção e entender se diagnóstico,
                    execução e humor estão convergindo na mesma direção.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Leitura dominante</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Bem-estar e humor sustentam a cadência atual</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A produtividade segue positiva, mas ainda com variação suficiente para justificar monitoramento semanal.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima ação recomendada</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Cruzar relatórios com o próximo diagnóstico</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Revalidar o eixo com mais ruído antes de transformar a leitura em nova prioridade operacional.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {reportsKpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="pb-4">
            <CardTitle>Sinais rápidos</CardTitle>
            <CardDescription>Indicadores de contexto para decidir o que investigar antes de abrir a leitura detalhada.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportsQuickSignals.map((signal) => (
              <div key={signal.label} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</div>
                  <signal.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{signal.value}</div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{signal.hint}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Monitoramento temporal</CardTitle>
            <CardDescription>
              Base visual inicial para leitura de evolução e comparação percentual, com tabs reais para separar tendência e benchmark.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ReportsChartPanel />
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Insights guiados</CardTitle>
            <CardDescription>Resumos textuais para transformar o gráfico em interpretação acionável.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reportsInsightTemplates.map((insight) => {
              const InsightIcon = insight.icon
              return (
                <div key={insight.title} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <InsightIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{insight.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{insight.text}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  )
}
