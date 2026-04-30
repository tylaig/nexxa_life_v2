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

export function NexxaLifeAcademyView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Academia" }]} />
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

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Aprendizado aplicado
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Estude com contexto, não por acúmulo: cada trilha deve corrigir algo do ciclo atual.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    A Academia precisa deixar claro que não é apenas um acervo. Seu papel é traduzir repertório em avanço
                    observável, conectado ao diagnóstico, às metas e à rotina do NexxaLife.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Aprendizado orientado por necessidade atual</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O conteúdo deve responder ao eixo crítico dominante e não virar biblioteca genérica.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Academia → metas → checklist</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A trilha certa só tem valor quando conversa com plano e execução real do produto.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {academyKpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
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
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Trilhas disponíveis</CardTitle>
            <CardDescription>Conteúdos estruturados para apoiar correções práticas no ciclo NexxaLife.</CardDescription>
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

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Princípios da superfície</CardTitle>
            <CardDescription>Como a Academia deve evoluir sem virar acervo descontextualizado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {academyGuardrails.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-background/70 p-4">
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
