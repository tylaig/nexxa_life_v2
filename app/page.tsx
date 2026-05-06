import Link from "next/link"
import {
  ArrowRight,
  Brain,
  CheckSquare,
  FileBarChart2,
  Sparkles,
  Target,
  Zap,
  Shield,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react"

import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"

const features = [
  {
    icon: Brain,
    title: "Diagnóstico que vira ação",
    description:
      "Mapeie eixos críticos do seu momento atual e traduza leitura em próximos passos objetivos — com clareza, sem ruído.",
    accent: "text-teal-500 dark:text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    icon: Target,
    title: "Metas conectadas ao dia a dia",
    description:
      "Transforme leitura estratégica em metas de curto, médio e longo prazo que alimentam seu checklist de execução diária.",
    accent: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: CheckSquare,
    title: "Execução com contexto real",
    description:
      "Agenda, checklist e diário integrados para sustentar ritmo com menos dispersão e mais consistência ao longo do tempo.",
    accent: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: FileBarChart2,
    title: "Leitura contínua do sistema",
    description:
      "Cruze sinais, relatórios e evolução para ajustar direção antes que o ruído vire desvio estrutural nos seus resultados.",
    accent: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
  },
] as const

const stats = [
  { value: "4", label: "Módulos integrados", suffix: "×" },
  { value: "360", label: "Visão do ciclo", suffix: "°" },
  { value: "∞", label: "Evolução contínua", suffix: "" },
] as const

const pillars = [
  { icon: Zap, text: "Diagnóstico guiado para clareza imediata" },
  { icon: Target, text: "Rotina conectada entre metas e checklist" },
  { icon: Shield, text: "Diário e agenda no mesmo workspace" },
  { icon: TrendingUp, text: "Relatórios para decisão e continuidade" },
] as const

export default async function RootPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // Apenas Next.js 15+ requer await no searchParams, vamos fazer de forma segura
  const searchParams = props.searchParams ? await props.searchParams : {}
  
  if (searchParams?.code) {
    // Se o login do Google redirecionou para a home por engano do Supabase,
    // repassamos para a rota correta de callback
    redirect(`/auth/callback?code=${searchParams.code}`)
  }

  const auth = await getAuthenticatedAppUser()
  const isLoggedIn = !!auth?.user

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md transition-all group-hover:scale-105 group-hover:shadow-primary/30">
              N
            </div>
            <span className="text-sm font-semibold tracking-tight">NexxaLife</span>
          </Link>
          <nav className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button asChild size="sm" className="rounded-xl px-4">
                <Link href="/dashboard">
                  Acessar Dashboard
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-foreground">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="rounded-xl px-4">
                  <Link href="/signup">
                    Criar conta
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Gradiente de fundo animado */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(20,184,166,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_50%),radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_45%)]" />

        {/* Grid de pontos decorativo */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              Plataforma em acesso antecipado
              <Sparkles className="h-3.5 w-3.5 text-teal-500" />
            </div>

            {/* Headline principal */}
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Transforme diagnóstico{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                  em evolução
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-teal-500/50 to-blue-500/50" />
              </span>{" "}
              observável.
            </h1>

            {/* Subtítulo */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              O NexxaLife organiza leitura de contexto, execução diária e acompanhamento estratégico em uma única jornada.
              Em vez de ferramentas soltas, a plataforma conecta clareza, foco, consistência e decisão prática.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {isLoggedIn ? (
                <Button asChild size="lg" className="h-12 rounded-xl px-8 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-[1.02]">
                  <Link href="/dashboard">
                    Ir para o meu painel
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="h-12 rounded-xl px-8 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-[1.02]">
                    <Link href="/signup">
                      Começar gratuitamente
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-8 text-sm font-semibold border-border/70 hover:bg-muted/50">
                    <Link href="/login">
                      Já tenho conta
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Social proof mínima */}
            <p className="mt-6 text-xs text-muted-foreground/70">
              Diagnóstico · Metas · Execução · Relatórios — tudo integrado
            </p>
          </div>

          {/* Preview card do produto */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/30 md:p-8">
              {/* Barra de título tipo app */}
              <div className="mb-6 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                </div>
                <div className="mx-auto rounded-full border border-border/50 bg-muted/50 px-4 py-1 text-xs text-muted-foreground">
                  app.nexxalife.com/dashboard
                </div>
              </div>

              {/* Stats do produto */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/50 bg-background/60 p-4 text-center"
                  >
                    <div className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {stat.value}
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Ciclo visual */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { icon: Brain, label: "Diagnóstico", active: true },
                  { icon: Target, label: "Metas", active: false },
                  { icon: CheckSquare, label: "Checklist", active: false },
                  { icon: FileBarChart2, label: "Relatórios", active: false },
                ].map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div key={step.label} className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                          step.active
                            ? "border-primary/40 bg-primary/10 text-primary shadow-sm shadow-primary/20"
                            : "border-border/50 bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs font-medium ${step.active ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                      {i < 3 && (
                        <div className="absolute mt-5 ml-20 h-px w-4 bg-border/50 hidden md:block" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Funcionalidades
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
            Uma fundação única para diagnosticar,{" "}
            <span className="text-muted-foreground">decidir e sustentar execução.</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">
            Cada módulo do NexxaLife conversa com os demais: o diagnóstico informa as metas, as metas geram o checklist,
            e os relatórios fecham o ciclo com leitura histórica para decisão contínua.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/70 bg-card/80 p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 dark:hover:shadow-black/20"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg} ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ PILARES / PARA QUEM É ═══ */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Texto */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Para quem é
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Para quem não precisa apenas de registro — mas de um sistema mais coerente.
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                O NexxaLife foi estruturado para líderes, operadores e pessoas em transição que precisam de uma forma
                mais útil de ler contexto, decidir prioridade e manter continuidade ao longo do tempo.
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                A plataforma transforma diagnóstico pessoal em um sistema operacional de evolução: da leitura inicial
                até a execução diária e os relatórios de acompanhamento.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {isLoggedIn ? (
                  <Button asChild className="rounded-xl px-6">
                    <Link href="/dashboard">
                      Continuar meu ciclo
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild className="rounded-xl px-6">
                      <Link href="/signup">
                        Criar conta gratuita
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl px-6">
                      <Link href="/login">Já tenho conta</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Cards de pilares */}
            <div className="grid gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.text}
                    className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/80 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-5 text-muted-foreground">{pillar.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-6 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary">
              Acesso gratuito
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Pronto para transformar diagnóstico em{" "}
              <span className="text-primary">direção real</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              Entre no ciclo NexxaLife e comece a conectar clareza, execução e evolução em um único sistema pessoal.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {isLoggedIn ? (
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-xl px-10 text-sm font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all"
                >
                  <Link href="/dashboard">
                    Acessar meu Dashboard
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-xl px-10 text-sm font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all"
                  >
                    <Link href="/signup">
                      Começar agora — é grátis
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-12 rounded-xl px-6 text-sm text-muted-foreground hover:text-foreground">
                    <Link href="/login" className="flex items-center gap-1.5">
                      Já tenho uma conta
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                N
              </div>
              <span className="text-sm font-medium text-muted-foreground">NexxaLife</span>
            </div>
            <p className="text-xs text-muted-foreground/60">
              © 2025 NexxaLife — Sistema operacional de evolução pessoal
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-foreground transition-colors">Cadastro</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
