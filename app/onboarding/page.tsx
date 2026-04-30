import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, CheckSquare, FileBarChart2, Target } from "lucide-react"

import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Onboarding | NexxaLife",
  description: "Entenda o ciclo do NexxaLife e prepare sua entrada no diagnóstico, plano e execução diária.",
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
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                Onboarding NexxaLife
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Entenda o ciclo principal e entre no produto pelo caminho certo.
              </h1>
              <p className="text-sm leading-6 text-muted-foreground md:text-base">
                O legado do NexxaLife trata o onboarding como a preparação para o fluxo diagnóstico → metas → tarefas → agenda → acompanhamento → relatórios. Nesta fase, a rota foi reintroduzida na raiz atual como uma superfície clara e compatível com o shell moderno.
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

            <div className="rounded-3xl border border-border bg-background/70 p-5 md:p-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Acesso rápido</div>
                <h2 className="text-xl font-semibold tracking-tight">Entre com Google e siga para o onboarding funcional.</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Use o Google para reduzir fricção no primeiro acesso. Se o provedor ainda não estiver configurado, mantenha o onboarding como guia e finalize pelo cadastro manual.
                </p>
              </div>
              <div className="mt-5 space-y-3">
                <GoogleAuthButton next="/dashboard" label="Continuar com Google" />
                <Button asChild variant="outline" className="h-11 w-full rounded-xl">
                  <Link href="/signup">Cadastrar com e-mail</Link>
                </Button>
              </div>
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
