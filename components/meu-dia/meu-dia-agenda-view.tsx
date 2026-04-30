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

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Ritmo do dia
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Organize o dia com blocos claros, folgas visíveis e próxima ação evidente.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    A superfície atual prioriza a leitura diária. O objetivo é reduzir atrito operacional e deixar explícito onde agir, pausar ou reorganizar o restante do dia.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próximo bloco</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{nextEvent?.label ?? "Nenhum bloco"}</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {nextEvent ? `${nextEvent.time} · ${nextEvent.range} · ${nextEvent.category}` : "Sem compromisso posicionado."}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Estado das outras visões</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Semana, mês e ano seguem guiados</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Mantidas como estados degradados explícitos para evitar navegação vazia e preservar o foco na operação diária.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {agendaSummaryCards.map((card) => (
                <StatCard key={card.label} label={card.label} value={card.value} hint={card.hint} icon={card.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Visão principal</CardTitle>
            <CardDescription>
              A experiência atual prioriza a leitura do dia, preservando espaço para expansões semanais e mensais.
            </CardDescription>
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
                  <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                    A visão diária é a superfície funcional prioritária nesta fase, em linha com o recorte de MVP e com a diretriz do legado para execução curta e clara.
                  </div>
                </div>
              }
              secondaryContent={
                <div className="space-y-3 rounded-2xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estado degradado explícito</div>
                  <p>
                    Esta visualização entra na próxima onda com dados reais e navegação temporal expandida. Por enquanto, a leitura operacional oficial permanece na aba Dia.
                  </p>
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3 text-xs leading-5">
                    Próxima evolução esperada: agregação por período, navegação temporal e reconciliação com metas e checklist.
                  </div>
                </div>
              }
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Agenda operacional</CardTitle>
            <CardDescription>Linha do tempo base para orientar blocos, respiros e janelas livres.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agendaTimeline.map((row) => (
              <div
                key={row.time}
                className="grid gap-3 rounded-2xl border border-border bg-background/60 p-4 md:grid-cols-[84px_1fr]"
              >
                <div className="text-sm font-medium text-muted-foreground">{row.time}</div>
                <div className="space-y-2">
                  {row.items.length > 0 ? (
                    row.items.map((item) => (
                      <div key={`${row.time}-${item.label}`} className="rounded-xl border border-border bg-card p-3 shadow-sm shadow-black/5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{item.range}</p>
                          </div>
                          <Badge variant="outline" className="rounded-full">{item.category}</Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-border/80 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                      Janela livre para ajuste, descanso ou realocação.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/80">
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

          <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
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
