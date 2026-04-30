import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, CheckSquare, FileBarChart2, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Onboarding | nexxa_life",
  description: "Entenda o ciclo do nexxa_life e prepare sua entrada no diagnóstico, plano e execução diária.",
}

const steps = [
  {
    title: "Diagnóstico",
    description: "Ler o momento atual para identificar eixos prioritários com clareza.",
    icon: Brain,
    href: "/diagnostic",
  },
  {
    title: "Metas",
    description: "Transformar leitura em direção estratégica e foco prático.",
    icon: Target,
    href: "/goals",
  },
  {
    title: "Checklist",
    description: "Converter intenção em execução diária com prioridades objetivas.",
    icon: CheckSquare,
    href: "/checklist",
  },
  {
    title: "Relatórios",
    description: "Acompanhar evolução, bem-estar e consistência ao longo do tempo.",
    icon: FileBarChart2,
    href: "/reports",
  },
] as const

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8 lg:p-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              Onboarding nexxa_life
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Entenda o ciclo principal e entre no produto pelo caminho certo.
            </h1>
            <p className="text-sm leading-6 text-muted-foreground md:text-base">
              O legado do nexxa_life trata o onboarding como a preparação para o fluxo diagnóstico → metas → tarefas → agenda → acompanhamento → relatórios. Nesta fase, a rota foi reintroduzida na raiz atual como uma superfície clara e compatível com o shell moderno.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-xl">
                <Link href="/diagnostic">
                  Iniciar pelo diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/dashboard">Ir para dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card key={step.title} className="border-border/80 bg-card/90">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="px-0">
                    <Link href={step.href}>
                      Abrir superfície
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </div>
    </main>
  )
}
