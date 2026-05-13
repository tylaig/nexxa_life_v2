import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Brain,
  CheckSquare,
  FileBarChart2,
  PartyPopper,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react"

import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { nexxaOnboardingPrefillEntry } from "@/components/nexxa-life/onboarding-prefill"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Onboarding | NexxaLife",
  description: "Entenda o ciclo do NexxaLife e comece pelo diagnóstico, plano e execução diária.",
}

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Leia seu momento atual e identifique eixos prioritários com clareza real.",
    icon: Brain,
    href: "/diagnostico",
    accent: "text-teal-500 dark:text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    number: "02",
    title: "Metas",
    description: "Transforme leitura em direção estratégica e foco prático de curto e médio prazo.",
    icon: Target,
    href: "/goals",
    accent: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    number: "03",
    title: "Checklist",
    description: "Converta intenção em execução diária com prioridades objetivas e ritmo sustentável.",
    icon: CheckSquare,
    href: "/checklist",
    accent: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    number: "04",
    title: "Relatórios",
    description: "Acompanhe evolução, bem-estar e consistência para fechar o ciclo com leitura histórica.",
    icon: FileBarChart2,
    href: "/relatorio",
    accent: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
] as const

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const params = await searchParams
  const isWelcome = params.welcome === "1"

  return (
    <div className="min-h-screen bg-background">
      {/* Header mínimo */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-all group-hover:scale-105">
              N
            </div>
            <span className="text-sm font-semibold tracking-tight">NexxaLife</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
            <Link href="/dashboard">
              Ir para dashboard
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">

        {/* Banner de boas-vindas */}
        {isWelcome ? (
          <div className="mb-10 relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/20">
                <PartyPopper className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                  Conta criada com sucesso! Bem-vindo ao NexxaLife 🎉
                </h2>
                <p className="mt-1 text-sm text-emerald-600/80 dark:text-emerald-400/80">
                  Agora você faz parte do ciclo. Comece pelo diagnóstico para mapear seu momento atual e entrar no fluxo com clareza.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Hero do onboarding */}
        <div className="mb-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Início do ciclo NexxaLife
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Entenda o ciclo e entre pelo{" "}
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                caminho certo.
              </span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              O NexxaLife é estruturado como um ciclo contínuo: você começa com um diagnóstico do seu momento atual,
              define metas estratégicas, executa com checklist diário e acompanha evolução por relatórios.
              Cada etapa alimenta a próxima.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="h-11 rounded-xl px-6 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all">
                <Link href="/diagnostico">
                  Iniciar pelo diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl px-6">
                <Link href="/dashboard">Ir para o dashboard</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Rascunho assistido pela Nexxa
                  </div>
                  <h2 className="font-semibold text-foreground">{nexxaOnboardingPrefillEntry.label}</h2>
                  <p className="max-w-xl leading-6 text-muted-foreground">
                    {nexxaOnboardingPrefillEntry.description} Nada é salvo automaticamente.
                  </p>
                </div>
                <Button asChild variant="secondary" className="h-10 shrink-0 rounded-xl px-4">
                  <Link href={nexxaOnboardingPrefillEntry.href}>Revisar rascunho</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Card de acesso rápido */}
          <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Acesso rápido
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                Entre com Google e siga para o ciclo principal.
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Use o Google para reduzir fricção no primeiro acesso e começar imediatamente.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              <GoogleAuthButton next="/dashboard" label="Continuar com Google" />
              <Button asChild variant="outline" className="h-11 w-full rounded-xl">
                <Link href="/signup">Cadastrar com e-mail</Link>
              </Button>
              <Button asChild variant="ghost" className="h-10 w-full rounded-xl text-muted-foreground text-sm">
                <Link href="/login">Já tenho conta — entrar</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Steps do ciclo */}
        <div>
          <div className="mb-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              O ciclo em 4 etapas
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <Link
                  key={step.title}
                  href={step.href}
                  className={`group relative overflow-hidden rounded-2xl border bg-card/80 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-border dark:hover:shadow-black/20 ${step.border}`}
                >
                  {/* Número decorativo */}
                  <div className="absolute -right-2 -top-4 text-6xl font-black text-muted/30 select-none">
                    {step.number}
                  </div>

                  <div className="relative space-y-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-5 text-muted-foreground">{step.description}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2 ${step.accent}`}>
                      Abrir superfície
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
