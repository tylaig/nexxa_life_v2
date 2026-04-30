import Link from "next/link"
import { ArrowRight, ChevronRight, Clock, Flame, Search } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  newsCategories,
  newsFeaturedArticle,
  newsFeaturedArticleActions,
  newsHero,
  newsKpis,
  newsLibraryArticles,
  newsPrioritySignals,
  newsRadarSummary,
  newsReadingInsights,
  newsSearchExperience,
  newsSurfaceGuardrails,
} from "@/components/meu-dia/news-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaNewsView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "News" }]} />
      <PageHeader
        title={newsHero.title}
        description={newsHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {newsHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/reports">Cruzar com relatórios</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {newsKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>{newsSearchExperience.title}</CardTitle>
            <CardDescription>Monte seu recorte editorial para reduzir ruído e aumentar utilidade prática.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>{newsSearchExperience.placeholder}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((category) => (
                <Badge key={category} variant={category === "Todos" ? "default" : "outline"} className="rounded-full">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{newsRadarSummary.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-foreground">{newsRadarSummary.filteredCount}</div>
                  <p className="mt-1 text-sm text-muted-foreground">leituras filtradas pelo recorte atual</p>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  {newsRadarSummary.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prioridades editoriais</CardTitle>
            <CardDescription>Leituras mais úteis com base no estado atual do seu sistema pessoal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {newsPrioritySignals.map((item) => (
              <div key={`${item.axis}-${item.recommendedCategory}`} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-foreground">{item.axis}</div>
                  <Badge variant={item.urgency === "alta" ? "default" : "outline"}>{item.urgency}</Badge>
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">Categoria sugerida: {item.recommendedCategory}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Destaque editorial</CardTitle>
            <CardDescription>Leitura de maior valor aplicado para o momento atual do ciclo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{newsFeaturedArticle.category}</Badge>
              <Badge variant="outline">{newsFeaturedArticle.level}</Badge>
              <Badge variant="secondary">{newsFeaturedArticle.impact}</Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{newsFeaturedArticle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{newsFeaturedArticle.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{newsFeaturedArticle.readTime}</span>
              <span className="inline-flex items-center gap-2"><Flame className="h-4 w-4" />{newsFeaturedArticle.impact}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {newsFeaturedArticleActions.slice(0, 2).map((action) => (
                <Badge key={action} variant="outline" className="rounded-full px-3 py-1 text-xs">
                  {action}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-lg">
                {newsFeaturedArticleActions[2]}
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-lg">
                {newsFeaturedArticleActions[3]}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca recente</CardTitle>
              <CardDescription>Leituras adicionais que já entram com semântica de curadoria, não de ruído.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {newsLibraryArticles.map((article) => (
                <div key={article.id} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{article.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.description}</p>
                    </div>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{article.level}</Badge>
                    <Badge variant="secondary">{article.readTime}</Badge>
                    <Badge variant="secondary">{article.impact}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leitura rápida</CardTitle>
              <CardDescription>Sinais curtos para orientar o próximo clique e evitar consumo passivo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {newsReadingInsights.map((item) => {
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

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {newsSurfaceGuardrails.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
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
