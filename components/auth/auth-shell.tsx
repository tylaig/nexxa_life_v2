import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  asideTitle,
  asideDescription,
  highlights,
  footer,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  asideTitle: string
  asideDescription: string
  highlights: readonly string[]
  footer?: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-12">
        <section className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8 lg:p-10">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
            {eyebrow}
          </Badge>
          <div className="mt-5 space-y-3">
            <h1 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4">
                <span className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-background/75 p-5 md:p-6">{children}</div>
          {footer ? <div className="mt-5 text-sm text-muted-foreground">{footer}</div> : null}
        </section>

        <aside className="rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm md:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Ciclo nexxa_life
            </Badge>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/dashboard">
                Ver dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">{asideTitle}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{asideDescription}</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Fluxo principal</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Diagnóstico",
                  "Metas",
                  "Checklist",
                  "Agenda",
                  "Diário",
                  "Relatórios",
                ].map((step, index) => (
                  <Badge key={step} variant={index === 0 ? "default" : "outline"} className="rounded-full px-3 py-1">
                    {step}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Posicionamento do MVP</div>
              <p className="mt-3 text-sm leading-6 text-foreground">
                Transformar diagnóstico pessoal em um plano executável com acompanhamento real, seguindo o recorte central documentado do legado nexxa_life flow.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
