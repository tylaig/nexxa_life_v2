import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  diagnosticHero,
  diagnosticImpacts,
  diagnosticResultPreview,
  diagnosticSteps,
  diagnosticStrategicAxes,
} from "@/components/meu-dia/diagnostic-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaDiagnosticView() {
  const ResultIcon = diagnosticResultPreview.icon

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Diagnóstico" }]} />
      <PageHeader
        title={diagnosticHero.title}
        description={diagnosticHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {diagnosticHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/goals">Ver metas sugeridas</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <CardTitle>Jornada guiada</CardTitle>
            <CardDescription>Estrutura inicial do fluxo de diagnóstico dentro do shell oficial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnosticSteps.map((step, index) => (
              <div key={step.key} className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ResultIcon className="h-4 w-4 text-primary" />
              <CardTitle>{diagnosticResultPreview.title}</CardTitle>
            </div>
            <CardDescription>{diagnosticResultPreview.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnosticResultPreview.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        {diagnosticStrategicAxes.map((axis) => (
          <StatCard key={axis.name} label={axis.name} value={axis.score} hint={axis.hint} icon={axis.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {diagnosticImpacts.map((impact) => {
          const ImpactIcon = impact.icon
          return (
            <Card key={impact.label}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ImpactIcon className="h-5 w-5" />
                </div>
                <CardTitle>{impact.label}</CardTitle>
                <CardDescription>{impact.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/reports">
            Avançar para relatórios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
