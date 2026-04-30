"use client"

import * as React from "react"
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  RefreshCw,
  FileText,
  Globe,
  Database,
  Sparkles,
  Quote,
  Zap,
  Send,
  PlayCircle,
} from "lucide-react"
import {
  PageContainer,
  PageHeader,
  StatCard,
} from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import {
  collections,
  knowledge,
  playgroundExample,
  type KbDocument,
} from "@/lib/mock/knowledge"
import { cn } from "@/lib/utils"

const sourceIcon: Record<KbDocument["source"], React.ComponentType<{ className?: string }>> = {
  Manual: FileText,
  URL: Globe,
  PDF: FileText,
  Notion: BookOpen,
  Shopify: Database,
}

const statusConfig = {
  indexed: { label: "Indexado", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: CheckCircle2 },
  indexing: { label: "Indexando", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Loader2 },
  error: { label: "Erro", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300", icon: AlertTriangle },
  pending: { label: "Pendente", className: "bg-muted text-muted-foreground", icon: RefreshCw },
} as const

export function KnowledgeView() {
  const [collection, setCollection] = React.useState<string>("all")
  const [query, setQuery] = React.useState("")

  const filtered = knowledge.filter((d) => {
    if (collection !== "all" && d.collection !== collection) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      if (!(d.title + " " + d.excerpt).toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <PageContainer>
      <PageHeader
        title="Base de conhecimento"
        description="Tudo que a IA copilota e o agente automático precisam saber para responder com precisão e citar fontes."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-3.5 w-3.5" />
              Reindexar tudo
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Adicionar fonte
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Documentos" value={`${knowledge.length}`} hint={`${knowledge.reduce((s, d) => s + d.chunks, 0)} chunks`} icon={BookOpen} />
        <StatCard label="Indexados" value={`${knowledge.filter((d) => d.status === "indexed").length}`} hint="100% prontos" icon={CheckCircle2} />
        <StatCard label="Cobertura RAG" value="92%" trend={{ value: "+6pp", positive: true }} icon={Sparkles} />
        <StatCard label="Consultas IA · 30d" value="14.382" trend={{ value: "+24%", positive: true }} icon={Zap} />
      </div>

      <Tabs value={collection} onValueChange={setCollection} className="mt-6">
        <NavTabsList className="mb-6">
          {collections.map((c) => (
            <NavTabsTrigger key={c.id} value={c.id}>
              {c.label} <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0 text-[10px] bg-muted">{c.count}</Badge>
            </NavTabsTrigger>
          ))}
        </NavTabsList>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
          <TabsContent value={collection} className="m-0 border-0 p-0 outline-none">
            <section className="rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border p-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar no conhecimento..."
                    className="h-9 pl-8 border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="divide-y divide-border">
                {filtered.map((d) => {
                  const SrcIcon = sourceIcon[d.source]
                  const sc = statusConfig[d.status]
                  const StatusIcon = sc.icon
                  return (
                    <div key={d.id} className="cursor-pointer p-4 transition-colors hover:bg-accent/40">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                          <SrcIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium">{d.title}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {d.source}
                            </Badge>
                            <Badge variant="secondary" className={cn("gap-1 border-0 text-[10px]", sc.className)}>
                              <StatusIcon className={cn("h-3 w-3", d.status === "indexing" && "animate-spin")} />
                              {sc.label}
                            </Badge>
                            {d.freshness === "stale" ? (
                              <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-300">
                                Desatualizado
                              </Badge>
                            ) : null}
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.excerpt}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="font-mono">{d.chunks} chunks</span>
                            <span>·</span>
                            <span>{d.usageCount30d.toLocaleString("pt-BR")} consultas · 30d</span>
                            <span>·</span>
                            <span className={cn(d.helpfulRate >= 0.9 ? "text-emerald-600 dark:text-emerald-400" : d.helpfulRate >= 0.8 ? "text-amber-600 dark:text-amber-400" : "")}>
                              Útil {(d.helpfulRate * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </TabsContent>

        <aside className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Playground RAG
              </div>
              <h3 className="text-sm font-semibold">Teste sua base</h3>
            </div>
            <Sparkles className="h-4 w-4 text-ai" />
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="flex items-start gap-2">
                <Quote className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-sm leading-relaxed">{playgroundExample.question}</p>
              </div>
              <div className="mt-2 flex justify-end">
                <Button size="sm" variant="outline" className="h-7 gap-1.5">
                  <PlayCircle className="h-3.5 w-3.5" />
                  Reproduzir
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-ai/30 bg-ai/5 p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ai text-ai-foreground">
                  <Sparkles className="h-3 w-3" />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-ai">
                  Resposta gerada
                </div>
                <Badge variant="outline" className="ml-auto border-ai/30 bg-background/40 text-[10px] text-ai">
                  {(playgroundExample.confidence * 100).toFixed(0)}% confiança
                </Badge>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                {renderInline(playgroundExample.answer)}
              </p>

              <div className="mt-3 border-t border-ai/20 pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Fontes citadas
                </div>
                <div className="mt-1.5 space-y-1">
                  {playgroundExample.sources.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md bg-background/60 px-2 py-1 text-xs"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-foreground/10 text-[10px] font-semibold tabular-nums">
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate">{s.title}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{s.chunk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <Stat label="Latência" value={`${playgroundExample.latencyMs}ms`} />
              <Stat label="Tokens IN" value={playgroundExample.tokensIn.toString()} />
              <Stat label="Tokens OUT" value={playgroundExample.tokensOut.toString()} />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
              <Input
                placeholder="Faça uma pergunta..."
                className="h-8 border-0 bg-transparent px-1 focus-visible:ring-0"
              />
              <Button size="sm" className="h-7 gap-1.5">
                <Send className="h-3 w-3" />
                Testar
              </Button>
            </div>
          </div>
        </aside>
        </div>
      </Tabs>
    </PageContainer>
  )
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>
    }
    return <React.Fragment key={i}>{p}</React.Fragment>
  })
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/40 px-2 py-1.5">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="font-medium tabular-nums">{value}</div>
    </div>
  )
}
