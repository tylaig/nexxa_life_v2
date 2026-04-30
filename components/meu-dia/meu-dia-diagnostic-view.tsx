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

export function NexxaLifeDiagnosticView() {
  const ResultIcon = diagnosticResultPreview.icon

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Diagnóstico" }]} />
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

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Leitura inicial
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Entenda o momento atual antes de transformar esforço em plano.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    Esta superfície organiza o diagnóstico em uma jornada curta: contexto, leitura por eixos e saída acionável.
                    O objetivo é deixar explícito o que será lido, o que será gerado e como isso conversa com metas e execução.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Saída esperada</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Priorização clara por eixo estratégico</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A leitura final deve reduzir ambiguidade e apontar o próximo movimento com mais nitidez.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Diagnóstico → metas → checklist</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O valor desta página está em produzir uma leitura que já nasça conectada à execução do NexxaLife.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
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
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
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

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Leitura por eixos</CardTitle>
            <CardDescription>
              Escaneie rapidamente onde existe maior estabilidade e onde o sistema pede prioridade de intervenção.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnosticStrategicAxes.map((axis) => {
              const isPriorityAxis = axis.name === "Energia"
              return (
                <div
                  key={`detail-${axis.name}`}
                  className={isPriorityAxis
                    ? "rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4"
                    : "rounded-2xl border border-border bg-background/60 p-4"}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{axis.name}</h3>
                        {isPriorityAxis ? <Badge variant="outline" className="rounded-full">Prioridade atual</Badge> : null}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{axis.hint}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{axis.score}</div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Impacto da leitura</CardTitle>
            <CardDescription>
              O diagnóstico só faz sentido quando gera tradução prática para decisão, metas e continuidade do ciclo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {diagnosticImpacts.map((impact) => {
              const ImpactIcon = impact.icon
              return (
                <div key={impact.label} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ImpactIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{impact.label}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{impact.description}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
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
