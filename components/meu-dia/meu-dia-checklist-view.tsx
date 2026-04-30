import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  checklistFocusCard,
  checklistHero,
  checklistPeriods,
  checklistSummaryCards,
} from "@/components/meu-dia/checklist-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeChecklistView() {
  const focusTask = checklistFocusCard.task
  const FocusIcon = focusTask.icon

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Checklist" }]} />
      <PageHeader
        title={checklistHero.title}
        description={checklistHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {checklistHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/goals">Ver metas conectadas</Link>
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
                  Execução do dia
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Destaque a tarefa foco e distribua energia por período com menos dispersão.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    O checklist atual organiza a execução por manhã, tarde e noite para tornar visível o que já avançou,
                    o que ainda depende de energia e qual tarefa deve puxar o resto do dia.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Tarefa foco</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{focusTask.title}</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {focusTask.period} · {focusTask.targetTime} · {focusTask.linkedGoal}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima intenção</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Proteger o bloco profundo antes de abrir novas frentes</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A página prioriza clareza operacional: menos troca de contexto e mais avanço visível por período.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {checklistSummaryCards.map((card) => (
                <StatCard key={card.label} label={card.label} value={card.value} hint={card.hint} icon={card.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>{checklistFocusCard.title}</CardTitle>
            <CardDescription>{checklistFocusCard.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FocusIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{focusTask.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{focusTask.guidance}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">{focusTask.period}</Badge>
                <Badge variant="outline">{focusTask.targetTime}</Badge>
                <Badge variant="outline">{focusTask.linkedGoal}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        {checklistPeriods.map((period) => {
          const PeriodIcon = period.icon
          return (
            <Card key={period.key} className="border-border/80">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <PeriodIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle>{period.label}</CardTitle>
                      <CardDescription>{period.tasks.length} tarefa(s) mapeadas para este período.</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-full">{period.progress}%</Badge>
                </div>
                <div className="mt-4 h-2 rounded-full bg-muted/80">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${period.progress}%` }} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {period.tasks.map((task) => {
                  const isFocusTask = task.title === focusTask.title
                  return (
                    <div
                      key={`${period.key}-${task.title}`}
                      className={isFocusTask
                        ? "rounded-2xl border border-primary/30 bg-primary/5 p-4"
                        : "rounded-2xl border border-border bg-background/60 p-4"}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
                            {isFocusTask ? <Badge className="rounded-full">Foco</Badge> : null}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{task.linkedGoal}</p>
                        </div>
                        <Badge variant={task.completed ? "default" : "outline"}>
                          {task.completed ? "Concluída" : task.targetTime}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/agenda">
            Avançar para agenda
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
