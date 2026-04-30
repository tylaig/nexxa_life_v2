import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { AgendaViewTabs } from "@/components/meu-dia/agenda-view-tabs"
import { agendaHero, agendaLegend, agendaListHighlights, agendaSummaryCards, agendaTimeline } from "@/components/meu-dia/agenda-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeAgendaView() {
  const nextEvent = agendaTimeline.flatMap((row) => row.items.map((item) => ({ ...item, time: row.time }))).find(Boolean)
  const ListIcon = agendaListHighlights.icon

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "nexxa_life", href: "/dashboard" }, { label: "Agenda" }]} />
      <PageHeader
        title={agendaHero.title}
        description={agendaHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {agendaHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/checklist">Voltar ao checklist</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Visão principal</CardTitle>
            <CardDescription>A experiência atual prioriza a leitura do dia, preservando espaço para expansões semanais e mensais.</CardDescription>
          </CardHeader>
          <CardContent>
            <AgendaViewTabs
              primaryContent={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {agendaLegend.map((item) => (
                      <Badge key={item.key} variant="secondary" className="rounded-full px-3 py-1">
                        {item.label}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A visão diária é a superfície funcional prioritária nesta fase, em linha com o recorte de MVP e com a diretriz do legado para execução curta e clara.
                  </p>
                </div>
              }
              secondaryContent={
                <div className="rounded-2xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  Esta visualização entra na próxima onda com dados reais e navegação temporal expandida. Por enquanto, a leitura operacional oficial permanece na aba Dia.
                </div>
              }
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {agendaSummaryCards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} hint={card.hint} icon={card.icon} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Agenda operacional</CardTitle>
            <CardDescription>Linha do tempo base para orientar blocos e janelas livres.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agendaTimeline.map((row) => (
              <div key={row.time} className="grid gap-3 rounded-2xl border border-border bg-background/60 p-4 md:grid-cols-[84px_1fr]">
                <div className="text-sm font-medium text-muted-foreground">{row.time}</div>
                <div className="space-y-2">
                  {row.items.length > 0 ? (
                    row.items.map((item) => (
                      <div key={`${row.time}-${item.label}`} className="rounded-xl border border-border bg-card p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{item.range}</p>
                          </div>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">Horário livre</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximo compromisso</CardTitle>
              <CardDescription>Destaque rápido do primeiro bloco relevante já posicionado.</CardDescription>
            </CardHeader>
            <CardContent>
              {nextEvent ? (
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <h3 className="text-base font-semibold text-foreground">{nextEvent.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{nextEvent.range}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{nextEvent.time}</Badge>
                    <Badge variant="outline">{nextEvent.category}</Badge>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ListIcon className="h-4 w-4 text-primary" />
                <CardTitle>{agendaListHighlights.title}</CardTitle>
              </div>
              <CardDescription>{agendaListHighlights.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {agendaTimeline
                .flatMap((row) => row.items)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-background/60 p-3 text-sm">
                    <div className="font-medium text-foreground">{item.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.range}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/goals">
            Avançar para metas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
