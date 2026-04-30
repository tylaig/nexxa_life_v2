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

export function MeuDiaJournalView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Diário" }]} />
      <PageHeader
        title={journalHero.title}
        description={journalHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {journalHero.kicker}
            </Badge>
            <Button size="sm" className="rounded-lg">
              Salvar registro
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Nota e emoção do dia</CardTitle>
            <CardDescription>Entrada rápida para capturar o estado geral antes da escrita reflexiva.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {journalWritingCues.map((cue) => (
            <StatCard key={cue.label} label={cue.label} value={cue.value} hint={cue.hint} icon={cue.icon} />
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {journalPrompts.map((prompt) => {
          const PromptIcon = prompt.icon
          return (
            <Card key={prompt.title}>
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
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {journalPracticeTips.map((tip) => {
          const TipIcon = tip.icon
          return (
            <Card key={tip.title} className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TipIcon className="h-5 w-5" />
                </div>
                <CardTitle>{tip.title}</CardTitle>
                <CardDescription>{tip.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>
    </PageContainer>
  )
}
