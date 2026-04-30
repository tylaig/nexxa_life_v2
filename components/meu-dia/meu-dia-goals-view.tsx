import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { goalsAxes, goalsHero, goalsKpis } from "@/components/meu-dia/goals-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeGoalsView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Metas" }]} />
      <PageHeader
        title={goalsHero.title}
        description={goalsHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {goalsHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/reports">Ver relatórios</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Direção estratégica
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Conecte eixo, meta e progresso para saber onde insistir e onde corrigir rota.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    A página de metas precisa mostrar hierarquia com clareza: primeiro o eixo, depois a meta ativa e por fim
                    o quanto ela já avançou na prática.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Leitura dominante</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Carreira concentra maior densidade de execução</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    É o eixo com mais metas simultâneas e, portanto, o que mais precisa de legibilidade e prioridade explícita.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima decisão</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Cruzar metas com checklist e relatórios</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O valor desta superfície aparece quando o plano estratégico já aponta para execução e leitura de progresso.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {goalsKpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Leitura por eixo</CardTitle>
            <CardDescription>
              Use esta visão para identificar rapidamente onde existe mais carga estratégica, mais avanço e mais atenção pendente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {goalsAxes.map((axis) => {
              const isPriorityAxis = axis.title === "Carreira"
              return (
                <div
                  key={`axis-summary-${axis.title}`}
                  className={isPriorityAxis
                    ? "rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4"
                    : "rounded-2xl border border-border bg-background/60 p-4"}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-foreground">{axis.title}</div>
                        {isPriorityAxis ? <Badge variant="outline" className="rounded-full">Maior concentração</Badge> : null}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{axis.goals.length} meta(s) em acompanhamento</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full">{axis.tone}</Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 space-y-4">
        {goalsAxes.map((axis) => {
          const AxisIcon = axis.icon
          const isPriorityAxis = axis.title === "Carreira"
          return (
            <Card key={axis.title} className="border-border/80">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <AxisIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle>{axis.title}</CardTitle>
                        {isPriorityAxis ? <Badge className="rounded-full">Eixo prioritário</Badge> : null}
                      </div>
                      <CardDescription>{axis.goals.length} meta(s) em acompanhamento neste eixo.</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-full">{axis.tone}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 lg:grid-cols-2">
                {axis.goals.map((goal) => (
                  <div key={`${axis.title}-${goal.title}`} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">Meta</div>
                        <h3 className="mt-1 text-sm font-semibold text-foreground">{goal.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{goal.description}</p>
                      </div>
                      <Badge variant={goal.progress >= 100 ? "default" : "outline"}>{goal.progress}%</Badge>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${goal.progress}%` }} />
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="justify-center">{goal.completedTasks}/{goal.totalTasks} tarefas</Badge>
                      <Badge variant="outline" className="justify-center">Prazo: {goal.deadline}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/journal">
            Seguir para diário
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
