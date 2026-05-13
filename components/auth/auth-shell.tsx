"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Brain, Target, CheckSquare, BarChart3 } from "lucide-react"
import { NexxaLifeLogoLockup, NexxaLifeMark } from "@/components/brand/nexxalife-logo"

const cycleSteps = [
  { icon: Brain, label: "Diagnóstico", color: "text-teal-400" },
  { icon: Target, label: "Metas", color: "text-blue-400" },
  { icon: CheckSquare, label: "Execução", color: "text-emerald-400" },
  { icon: BarChart3, label: "Evolução", color: "text-purple-400" },
]

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
      {/* Fundo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-10%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="relative flex min-h-screen">
        {/* ─── PAINEL ESQUERDO: Formulário ─── */}
        <div className="relative flex w-full flex-col justify-between px-6 py-8 md:px-10 lg:w-[54%] lg:px-16 xl:px-20">
          {/* Header / Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="group">
              <NexxaLifeLogoLockup />
            </Link>
            <span className="rounded-full border border-border/70 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              {eyebrow}
            </span>
          </div>

          {/* Conteúdo central */}
          <div className="my-auto w-full max-w-md py-10 lg:mx-auto">
            <div className="mb-8 space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {title}
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Card do formulário */}
            <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-xl shadow-black/5 backdrop-blur-md dark:bg-card/40 dark:shadow-black/20">
              {children}
            </div>

            {footer && (
              <div className="mt-5 text-center text-sm text-muted-foreground">
                {footer}
              </div>
            )}
          </div>

          {/* Footer mínimo */}
          <div className="text-center text-xs text-muted-foreground/60">
            © 2025 NexxaLife — Sistema de evolução pessoal
          </div>
        </div>

        {/* ─── PAINEL DIREITO: Brand / Aside ─── */}
        <aside className="relative hidden overflow-hidden lg:flex lg:w-[46%] lg:flex-col lg:justify-between">
          {/* Background gradiente escuro premium */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 dark:from-slate-950 dark:via-slate-950 dark:to-teal-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.18),transparent_50%)]" />

          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Grid decorativo de pontos */}
          <div className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Orbe decorativa */}
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 -translate-x-1/4 translate-y-1/4 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Conteúdo do aside */}
          <div className="relative flex flex-col justify-between h-full px-10 py-10 xl:px-14">
            {/* Logo topo */}
            <NexxaLifeMark className="h-10 w-10 rounded-2xl ring-1 ring-white/15" />

            {/* Texto central */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-400/80">
                  {eyebrow} · NexxaLife
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white xl:text-3xl">
                  {asideTitle}
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  {asideDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-400/15 border border-teal-400/20">
                      <CheckCircle2 className="h-3 w-3 text-teal-400" />
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* Ciclo do produto */}
              <div className="rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Ciclo NexxaLife
                </div>
                <div className="flex items-center gap-1">
                  {cycleSteps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <div key={step.label} className="flex items-center gap-1">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 border border-white/10 ${step.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] text-slate-500">{step.label}</span>
                        </div>
                        {i < cycleSteps.length - 1 && (
                          <ArrowRight className="mx-0.5 mb-4 h-3 w-3 shrink-0 text-slate-600" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Link dashboard */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors duration-200"
            >
              Ir para o dashboard
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
