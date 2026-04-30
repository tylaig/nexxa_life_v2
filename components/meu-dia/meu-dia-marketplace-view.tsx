import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  marketplaceCategories,
  marketplaceHero,
  marketplaceKpis,
  marketplacePriorityMatch,
  marketplaceSpecialists,
  marketplaceTrustSignals,
} from "@/components/meu-dia/marketplace-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MeuDiaMarketplaceView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Meu Dia", href: "/dashboard" }, { label: "Marketplace" }]} />
      <PageHeader
        title={marketplaceHero.title}
        description={marketplaceHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {marketplaceHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/reports">Ver sinais relacionados</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {marketplaceKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categorias de apoio</CardTitle>
              <CardDescription>Portas principais de serviço para corrigir gargalos do sistema pessoal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketplaceCategories.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-foreground">{item.name}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match prioritário</CardTitle>
              <CardDescription>Conexão atual entre eixo crítico e melhor encaixe de apoio externo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <div className="text-sm font-semibold text-foreground">{marketplacePriorityMatch.specialistName}</div>
                <div className="mt-2 text-sm text-muted-foreground">Eixo conectado: {marketplacePriorityMatch.linkedAxis}</div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{marketplacePriorityMatch.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Especialistas em destaque</CardTitle>
            <CardDescription>Perfis já posicionados por tipo de impacto esperado no ciclo Meu Dia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketplaceSpecialists.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                    <Badge variant={item.fitAxis === marketplacePriorityMatch.linkedAxis ? "default" : "outline"}>
                      {item.fitAxis}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{item.price}</Badge>
                    <Badge variant="secondary">{item.availability}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={`${item.name}-${tag}`} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {marketplaceTrustSignals.map((item) => {
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
          <Link href="/dashboard">
            Voltar ao dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
