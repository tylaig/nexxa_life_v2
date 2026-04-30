import Link from "next/link"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  journalEmotions,
  journalHero,
  journalPracticeTips,
  journalPrompts,
  journalWritingCues,
} from "@/components/meu-dia/journal-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeJournalView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Diário" }]} />
      <PageHeader
        title={journalHero.title}
        description={journalHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {journalHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/reports">Salvar e revisar leitura</Link>
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
                  Registro reflexivo
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Capture o que o dia ensinou antes que o ruído apague a leitura útil.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    O diário precisa ser rápido o bastante para acontecer e estruturado o bastante para gerar memória operacional.
                    Esta superfície agora separa melhor nota, emoção, escrita e recomendações práticas.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Objetivo do registro</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Transformar experiência em aprendizado reutilizável</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A saída esperada é uma revisão curta, clara e reaproveitável na próxima rodada de execução.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Diário → relatórios → ajustes no ciclo</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O valor desta página cresce quando a reflexão alimenta a leitura histórica do NexxaLife.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {journalWritingCues.map((cue) => (
                <StatCard key={cue.label} label={cue.label} value={cue.value} hint={cue.hint} icon={cue.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Nota e emoção do dia</CardTitle>
            <CardDescription>Entrada rápida para capturar o estado geral antes da escrita reflexiva.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-3 text-sm font-medium text-foreground">Nota geral do dia</div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Badge key={value} variant={value === 8 ? "default" : "outline"} className="rounded-full px-3 py-1">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-medium text-foreground">Emoção predominante</div>
              <div className="flex flex-wrap gap-2">
                {journalEmotions.map((emotion) => (
                  <Badge key={emotion.label} variant={emotion.label === "Motivado" ? "default" : "secondary"} className="rounded-full px-3 py-1">
                    <span className="mr-2">{emotion.emoji}</span>
                    {emotion.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {journalPrompts.map((prompt) => {
            const PromptIcon = prompt.icon
            return (
              <Card key={prompt.title} className="border-border/80">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <PromptIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle>{prompt.title}</CardTitle>
                      <CardDescription>{prompt.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
                    {prompt.placeholder}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Práticas recomendadas</CardTitle>
            <CardDescription>
              Regras simples para manter o diário útil sem transformar reflexão em fricção desnecessária.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {journalPracticeTips.map((tip) => {
              const TipIcon = tip.icon
              return (
                <div key={tip.title} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TipIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{tip.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{tip.description}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  )
}
