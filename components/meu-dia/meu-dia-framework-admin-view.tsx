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
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Framework Admin" }]} />
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

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Governança estrutural
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Mantenha o diagnóstico coerente antes de escalar regras, eixos e perguntas.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    Esta superfície existe para proteger a lógica interna do NexxaLife. Aqui a leitura não é de execução diária,
                    mas de governança do modelo que sustenta diagnóstico, metas e relatórios.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Governar a estrutura do sistema</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O objetivo não é operar o ciclo, mas manter o modelo auditável, comparável e expandível.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Conexão principal</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Framework Admin → Diagnóstico → Relatórios</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Qualquer mudança estrutural aqui altera a qualidade da leitura publicada nas superfícies do produto.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {frameworkAdminKpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
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

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Matriz estrutural</CardTitle>
            <CardDescription>Eixos e dimensões que sustentam a leitura atual do diagnóstico NexxaLife.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {frameworkAdminAxes.map((axis) => (
              <div key={axis.axis} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{axis.axis}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{axis.summary}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full">{axis.questions} perguntas</Badge>
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

        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5">
          <CardHeader>
            <CardTitle>Leitura administrativa</CardTitle>
            <CardDescription>
              Resumo conceitual para deixar claro por que esta superfície existe dentro do núcleo expandido do produto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              O Framework Admin define a qualidade da leitura diagnóstica antes que qualquer camada analítica seja consumida.
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              Eixos, dimensões e perguntas precisam permanecer comparáveis ao longo do tempo para evitar ruído estrutural.
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              O papel desta página é administrativo e sistêmico, diferente das superfícies de uso cotidiano como checklist, agenda e diário.
            </div>
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
