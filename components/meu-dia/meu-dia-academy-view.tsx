import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  academyGuardrails,
  academyHero,
  academyKpis,
  academyRecommendations,
  academyTracks,
} from "@/components/meu-dia/academy-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaAcademyView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Academia" }]} />
      <PageHeader
        title={academyHero.title}
        description={academyHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {academyHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/goals">Ver metas relacionadas</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {academyKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Trilhas disponíveis</CardTitle>
            <CardDescription>Conteúdos estruturados para apoiar correções práticas no ciclo Meu Dia.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {academyTracks.map((track) => {
              const Icon = track.icon
              return (
                <div key={track.title} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{track.title}</h3>
                    <Badge variant="outline">{track.badge}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">Foco principal: {track.focus}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{track.lessons} aulas</Badge>
                    <Badge variant="secondary">{track.duration}</Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações por eixo</CardTitle>
              <CardDescription>Priorizações iniciais conectadas ao diagnóstico derivado atual.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {academyRecommendations.map((item) => (
                <div key={`${item.axis}-${item.recommendedTrack}`} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-foreground">{item.axis}</div>
                    <Badge variant={item.urgency === "alta" ? "default" : "outline"}>{item.urgency}</Badge>
                  </div>
                  <div className="mt-2 text-sm font-medium text-foreground">{item.recommendedTrack}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Princípios da superfície</CardTitle>
              <CardDescription>Como a Academia deve evoluir sem virar acervo descontextualizado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {academyGuardrails.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/marketplace">
            Seguir para marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
