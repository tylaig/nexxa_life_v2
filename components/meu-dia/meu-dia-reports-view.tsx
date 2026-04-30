import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  reportsChartTabs,
  reportsHero,
  reportsInsightTemplates,
  reportsKpis,
  reportsQuickSignals,
  reportsWeeklySeries,
} from "@/components/meu-dia/reports-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaReportsView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Relatórios" }]} />
      <PageHeader
        title={reportsHero.title}
        description={reportsHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {reportsHero.kicker}
            </Badge>
            <Button size="sm" className="rounded-lg">
              Atualizar leitura
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {reportsKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monitoramento temporal</CardTitle>
            <CardDescription>Base visual inicial para leitura de evolução e comparação percentual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {reportsChartTabs.map((tab, index) => (
                <Badge key={tab} variant={index === 0 ? "default" : "outline"} className="rounded-full px-3 py-1">
                  {tab}
                </Badge>
              ))}
            </div>
            <div className="space-y-2 rounded-2xl border border-border bg-background/60 p-4">
              {reportsWeeklySeries.map((item) => (
                <div key={item.day} className="grid grid-cols-4 gap-3 text-sm">
                  <span className="font-medium text-foreground">{item.day}</span>
                  <span className="text-muted-foreground">Bem-estar {item.wellBeing}%</span>
                  <span className="text-muted-foreground">Prod. {item.productivity}%</span>
                  <span className="text-muted-foreground">Humor {item.mood}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {reportsQuickSignals.map((signal) => (
            <StatCard key={signal.label} label={signal.label} value={signal.value} hint={signal.hint} icon={signal.icon} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {reportsInsightTemplates.map((insight) => {
          const InsightIcon = insight.icon
          return (
            <Card key={insight.title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <InsightIcon className="h-5 w-5" />
                </div>
                <CardTitle>{insight.title}</CardTitle>
                <CardDescription>{insight.text}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>
    </PageContainer>
  )
}
