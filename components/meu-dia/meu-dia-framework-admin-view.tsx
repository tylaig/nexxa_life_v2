import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import {
  frameworkAdminAxes,
  frameworkAdminGuardrails,
  frameworkAdminHero,
  frameworkAdminKpis,
} from "@/components/meu-dia/framework-admin-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NexxaLifeFrameworkAdminView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "nexxa_life", href: "/dashboard" }, { label: "Framework Admin" }]} />
      <PageHeader
        title={frameworkAdminHero.title}
        description={frameworkAdminHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {frameworkAdminHero.kicker}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/diagnostic">Ver diagnóstico</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {frameworkAdminKpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Matriz estrutural</CardTitle>
            <CardDescription>Eixos e dimensões que sustentam a leitura atual do diagnóstico nexxa_life.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {frameworkAdminAxes.map((axis) => (
              <div key={axis.axis} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{axis.axis}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{axis.summary}</p>
                  </div>
                  <Badge variant="outline">{axis.questions} perguntas</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {axis.dimensions.map((dimension) => (
                    <Badge key={`${axis.axis}-${dimension}`} variant="secondary">
                      {dimension}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Responsável: {axis.owner}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guardrails de governança</CardTitle>
            <CardDescription>Critérios para evoluir o framework sem perder coerência sistêmica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {frameworkAdminGuardrails.map((item) => {
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
      </section>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/academy">
            Seguir para academia
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
