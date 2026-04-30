"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  PauseCircle,
  Sparkles,
  MousePointerClick,
  Send,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  Eye,
} from "lucide-react"

import { NextActionCard } from "@/components/app-shell/next-action-card"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import { SummaryMetricCard } from "@/components/app-shell/summary-metric-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { templates, type HsmTemplate } from "@/lib/mock/templates"
import { cn } from "@/lib/utils"

type CategoryFilter = "all" | "MARKETING" | "UTILITY" | "AUTHENTICATION"

const statusConfig = {
  approved: { label: "Aprovado", icon: CheckCircle2, className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  pending: { label: "Em revisão", icon: Clock, className: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  rejected: { label: "Rejeitado", icon: XCircle, className: "bg-rose-500/10 text-rose-700 dark:text-rose-300" },
  paused: { label: "Pausado pela Meta", icon: PauseCircle, className: "bg-muted text-muted-foreground" },
} as const

const qualityConfig = {
  high: { label: "Alta", className: "text-emerald-600 dark:text-emerald-400" },
  medium: { label: "Média", className: "text-amber-600 dark:text-amber-400" },
  low: { label: "Baixa", className: "text-rose-600 dark:text-rose-400" },
  unknown: { label: "—", className: "text-muted-foreground" },
} as const

export function TemplatesListView() {
  const [filter, setFilter] = React.useState<CategoryFilter>("all")
  const [query, setQuery] = React.useState("")
  const [selectedTemplate, setSelectedTemplate] = React.useState<HsmTemplate | null>(null)

  const filtered = templates.filter((t) => {
    if (filter !== "all" && t.category !== filter) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      if (!(t.name + " " + t.body + " " + t.language).toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <PageContainer>
      <PageHeader
        title="Templates HSM"
        description="Catálogo operacional de mensagens pré-aprovadas com lifecycle, qualidade, métricas e acesso dedicado para detalhe e edição."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Sugerir com IA
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href="/templates/new">
                <Plus className="h-3.5 w-3.5" />
                Novo template
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Templates ativos" value={`${templates.filter((t) => t.status === "approved").length}`} icon={CheckCircle2} />
        <StatCard label="Disparos 30d" value={templates.reduce((s, t) => s + t.sentLast30d, 0).toLocaleString("pt-BR")} icon={Send} />
        <StatCard label="CTR médio" value="48%" trend={{ value: "+4pp", positive: true }} icon={MousePointerClick} />
        <StatCard label="Taxa de bloqueio" value="0,3%" hint="Limite Meta: 2%" icon={ShieldCheck} />
      </div>

      <OperationalAlertBanner
        className="mt-6"
        icon={AlertTriangle}
        title="Templates precisam evidenciar risco, qualidade e prontidão de uso"
        description="Priorize leitura de aprovação, qualidade Meta e sinais de performance para evitar escala cega de mensagens."
        meta={`${filtered.length} templates em foco`}
      />

      <div className="mt-6">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as CategoryFilter)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="all">Todos</NavTabsTrigger>
              <NavTabsTrigger value="MARKETING">Marketing</NavTabsTrigger>
              <NavTabsTrigger value="UTILITY">Utilidade</NavTabsTrigger>
              <NavTabsTrigger value="AUTHENTICATION">Auth</NavTabsTrigger>
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="relative lg:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar template..." className="h-9 pl-8" />
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={() => { setFilter("all"); setQuery("") }}>
                Limpar
              </Button>
            </div>
          </div>

          <TabsContent value={filter} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="divide-y divide-border">
              {filtered.map((t) => {
                const sc = statusConfig[t.status]
                const Icon = sc.icon
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(t)}
                    className="grid w-full grid-cols-[1fr_auto] gap-3 p-4 text-left transition-colors hover:bg-accent/50"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-mono text-sm">{t.name}</span>
                        <Badge variant="outline" className="border-border text-[10px] uppercase">
                          {t.category === "MARKETING" ? "Marketing" : t.category === "UTILITY" ? "Utilidade" : "Auth"}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] uppercase">{t.language}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{t.body.split("\n")[0]}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{t.sentLast30d.toLocaleString("pt-BR")} envios · 30d</span>
                        <span>·</span>
                        <span>Read {Math.round(t.readRate * 100)}%</span>
                        <span>·</span>
                        <span>CTR {Math.round(t.ctr * 100)}%</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />uso monitorado</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className={cn("gap-1 border-0 text-[10px] font-medium", sc.className)}>
                          <Icon className="h-3 w-3" />
                          {sc.label}
                        </Badge>
                        <span className={cn("text-[10px] uppercase", qualityConfig[t.qualityRating].className)}>
                          Qualidade · {qualityConfig[t.qualityRating].label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                )
              })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>


      <Sheet open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades do Template</SheetTitle>
            <SheetDescription>Leitura de aprovação, qualidade e prontidão operacional.</SheetDescription>
          </SheetHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold tracking-tight font-mono">{selectedTemplate.name}</div>
                  <Badge variant="outline" className="text-[10px] uppercase">{selectedTemplate.language}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary" className={cn("gap-1 border-0 text-[10px] font-medium", statusConfig[selectedTemplate.status as keyof typeof statusConfig].className)}>
                    {React.createElement(statusConfig[selectedTemplate.status as keyof typeof statusConfig].icon, { className: "h-3.5 w-3.5" })}
                    {statusConfig[selectedTemplate.status as keyof typeof statusConfig].label}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {selectedTemplate.category === "MARKETING" ? "Marketing" : selectedTemplate.category === "UTILITY" ? "Utilidade" : "Auth"}
                  </Badge>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground font-mono leading-relaxed">
                {selectedTemplate.body}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <SummaryMetricCard label="Envios 30d" value={selectedTemplate.sentLast30d.toLocaleString("pt-BR")} />
                <SummaryMetricCard label="Read rate" value={`${Math.round(selectedTemplate.readRate * 100)}%`} />
                <SummaryMetricCard label="CTR" value={`${Math.round(selectedTemplate.ctr * 100)}%`} />
                <SummaryMetricCard label="Qualidade" value={qualityConfig[selectedTemplate.qualityRating as keyof typeof qualityConfig].label} />
              </div>

              <NextActionCard
                description={selectedTemplate.status === "pending"
                  ? "Acompanhar revisão e evitar dependência operacional até aprovação oficial."
                  : selectedTemplate.status === "rejected"
                    ? "Revisar conteúdo, categoria e enquadramento para nova submissão."
                    : selectedTemplate.status === "paused"
                      ? "Investigar motivo da pausa, qualidade e sinais de bloqueio antes de retomar escala."
                      : selectedTemplate.qualityRating === "low"
                        ? "Reduzir volume e revisar copy para evitar deterioração de qualidade na Meta."
                        : "Template pronto para uso. Priorize monitoramento contínuo de read rate, CTR e bloqueios."}
              />

              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border">
                <Button asChild size="sm" className="gap-2 w-full">
                  <Link href={`/templates/${selectedTemplate.id}`}>Abrir detalhe</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-2 w-full">
                  <Link href={`/templates/${selectedTemplate.id}/edit`}>Editar</Link>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

