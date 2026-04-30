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
      <AppBreadcrumbs items={[{ label: "nexxa_life", href: "/dashboard" }, { label: "Metas" }]} />
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

      <section className="grid gap-4 md:grid-cols-3">
        {goalsKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 space-y-4">
        {goalsAxes.map((axis) => {
          const AxisIcon = axis.icon
          return (
            <Card key={axis.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <AxisIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle>{axis.title}</CardTitle>
                      <CardDescription>{axis.goals.length} meta(s) em acompanhamento neste eixo.</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{axis.tone}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 lg:grid-cols-2">
                {axis.goals.map((goal) => (
                  <div key={`${axis.title}-${goal.title}`} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{goal.description}</p>
                      </div>
                      <Badge variant={goal.progress >= 100 ? "default" : "outline"}>{goal.progress}%</Badge>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${goal.progress}%` }} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{goal.completedTasks}/{goal.totalTasks} tarefas</Badge>
                      <Badge variant="outline">Prazo: {goal.deadline}</Badge>
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
