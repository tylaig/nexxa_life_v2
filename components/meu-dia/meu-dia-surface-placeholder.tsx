import Link from "next/link"
import { ArrowRight, Clock3, FileSymlink, Sparkles } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type nexxa_lifeSurfacePlaceholderProps = {
  title: string
  description: string
  route: string
  legacySource: string
  nextStep: string
  status?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function NexxaLifeSurfacePlaceholder({
  title,
  description,
  route,
  legacySource,
  nextStep,
  status = "Em adaptação",
  breadcrumbs,
}: nexxa_lifeSurfacePlaceholderProps) {
  return (
    <PageContainer>
      <AppBreadcrumbs items={breadcrumbs ?? [{ label: "nexxa_life", href: "/dashboard" }, { label: title }]} />
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 text-xs">
              <Clock3 className="h-3.5 w-3.5" />
              {status}
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/dashboard">
                Voltar ao dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Superfície migrada para o shell oficial
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Esta rota já existe no app raiz para preparar o port completo do legado nexxa_life flow sem reativar a interface antiga.
            O objetivo desta etapa é manter navegação, arquitetura e design consistentes enquanto o conteúdo funcional é migrado por ondas.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-border/80 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Próximo passo desta superfície</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{nextStep}</p>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Rota oficial</h3>
            <p className="mt-2 text-sm text-muted-foreground">{route}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileSymlink className="h-4 w-4 text-primary" />
              Referência legada
            </div>
            <p className="mt-2 break-all text-sm text-muted-foreground">{legacySource}</p>
          </div>
        </aside>
      </section>
    </PageContainer>
  )
}
