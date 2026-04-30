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

export function MeuDiaChecklistView() {
  const focusTask = checklistFocusCard.task
  const FocusIcon = focusTask.icon

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Checklist" }]} />
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

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
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

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {checklistSummaryCards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} hint={card.hint} icon={card.icon} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        {checklistPeriods.map((period) => {
          const PeriodIcon = period.icon
          return (
            <Card key={period.key}>
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
                  <Badge variant="secondary">{period.progress}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {period.tasks.map((task) => (
                  <div key={`${period.key}-${task.title}`} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{task.linkedGoal}</p>
                      </div>
                      <Badge variant={task.completed ? "default" : "outline"}>
                        {task.completed ? "Concluída" : task.targetTime}
                      </Badge>
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
          <Link href="/agenda">
            Avançar para agenda
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
