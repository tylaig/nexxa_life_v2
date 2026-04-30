"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, FileText, Plus, RefreshCw, ScanSearch, ChevronRight, TerminalSquare, AlertTriangle, Clock3, DatabaseZap, Search, CheckCircle2, Globe, HardDrive, BrainCircuit, AlignLeft, Loader2 } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { NextActionCard } from "@/components/app-shell/next-action-card"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { SelectionEmptyState } from "@/components/app-shell/selection-empty-state"
import { SummaryMetricCard } from "@/components/app-shell/summary-metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { listKnowledgeDocuments, listKnowledgeSources } from "@/lib/knowledge/api"

import type { KnowledgeDocumentItem, KnowledgeSourceItem } from "./knowledge-types"

const sourceTypesConfig = {
  url: { icon: Globe, label: "URL / Site", color: "text-blue-500" },
  file: { icon: HardDrive, label: "Arquivo", color: "text-emerald-500" },
  integration: { icon: BrainCircuit, label: "Integração", color: "text-purple-500" },
  text: { icon: AlignLeft, label: "Texto Livre", color: "text-amber-500" },
} as const

export function KnowledgeSourcesView() {
  const [sources, setSources] = React.useState<KnowledgeSourceItem[]>([])
  const [documents, setDocuments] = React.useState<KnowledgeDocumentItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [selectedSourceId, setSelectedSourceId] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const nextSources = await listKnowledgeSources<KnowledgeSourceItem[]>()
      setSources(nextSources)
      if (nextSources[0]) {
        setSelectedSourceId((current) => current ?? nextSources[0].id)
      }
      const docs = await Promise.all(nextSources.map((source) => listKnowledgeDocuments<KnowledgeDocumentItem[]>(source.id).catch(() => [])))
      setDocuments(docs.flat())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar knowledge")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  const indexedSources = sources.filter((source) => source.status === "indexed").length

  const filteredSources = sources.filter((source) => {
    if (!query.trim()) return true
    const haystack = [source.name, source.sourceType, source.status].join(" ").toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  })

  const filteredDocuments = documents.filter((document) => {
    if (!query.trim()) return true
    const haystack = [document.title, document.mimeType, document.sourceId, document.body].join(" ").toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  })

  const selectedSource = sources.find((source) => source.id === selectedSourceId) ?? filteredSources[0] ?? null
  const selectedSourceDocuments = documents.filter((document) => document.sourceId === selectedSource?.id)

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Fontes" }]} />
      <PageHeader
        title="Catálogo de Fontes (Sources)"
        description="Gerencie os pipelines de extração e o estado de indexação de cada fonte de dados do RAG."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
            <Button asChild size="sm" className="gap-2"><Link href="/knowledge/new"><Plus className="h-3.5 w-3.5" />Nova source</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-8">
        <StatCard label="Sources" value={String(sources.length)} hint="fontes registradas" icon={BookOpen} />
        <StatCard label="Documents" value={String(documents.length)} hint="catálogo consolidado" icon={FileText} />
        <StatCard label="Indexed" value={String(indexedSources)} hint="fontes prontas para retrieval" icon={ScanSearch} />
        <StatCard label="Estado" value={loading ? "Sincronizando" : "Ao vivo"} hint="RAG operacional" icon={DatabaseZap} />
      </div>

      <OperationalAlertBanner
        className="mb-8"
        icon={AlertTriangle}
        title="Knowledge precisa deixar claro o que está pronto para retrieval e o que ainda depende de ingestão"
        description="Use esta visão para separar catálogo, indexação e debugging sem misturar leitura documental com operação do pipeline."
        meta={`${indexedSources} de ${sources.length} fontes prontas`}
      />

      <Tabs defaultValue="sources" className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
          <NavTabsList className="border-0">
            <NavTabsTrigger value="sources">Fontes de Entrada</NavTabsTrigger>
            <NavTabsTrigger value="documents">Documentos Indexados</NavTabsTrigger>
          </NavTabsList>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar source, tipo, status..." className="h-9 pl-8" />
          </div>
        </div>

        <TabsContent value="sources" className="m-0 border-0 p-0 outline-none">
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Sources</CardTitle>
                <CardDescription>Operar fontes antes de entrar em ingestão ou debugging.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="animate-spin h-4 w-4" /> Carregando sources...</p> : null}
                {!loading && filteredSources.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma source encontrada para os filtros atuais.</p> : null}
                {filteredSources.map((source) => {
                  const typeMeta = sourceTypesConfig[source.sourceType as keyof typeof sourceTypesConfig] || sourceTypesConfig.text
                  const TypeIcon = typeMeta.icon
                  return (
                    <button key={source.id} type="button" onClick={() => setSelectedSourceId(source.id)} className={cn("flex w-full items-center justify-between gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent/50", selectedSourceId === source.id && "bg-accent/50")}>
                      <div className="flex gap-3 items-center min-w-0">
                        <div className={cn("p-2 rounded-md bg-muted", typeMeta.color)}>
                          <TypeIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-medium truncate">{source.name}</div>
                            {source.status === "indexed" ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-resolved-bg)] bg-[var(--status-resolved-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-resolved)]">
                                <DatabaseZap className="h-3 w-3" />
                                Pronta
                              </span>
                            ) : source.status === "ingesting" ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)] px-1.5 py-0.5 text-[10px] font-medium text-amber-500">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Indexando...
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--status-pending)]">
                                <Clock3 className="h-3 w-3" />
                                Pendente
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{typeMeta.label} · {source.lastIngestedAt ? formatDate(source.lastIngestedAt) : "não executado"}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  )
                })}
                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo da source selecionada</CardTitle>
                <CardDescription>Contexto operacional rápido da fonte e pipeline.</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSource ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-lg">{selectedSource.name}</div>
                        <Badge variant="secondary">{selectedSource.status}</Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{(sourceTypesConfig[selectedSource.sourceType as keyof typeof sourceTypesConfig] || sourceTypesConfig.text).label} · {selectedSource.lastIngestedAt ? formatDate(selectedSource.lastIngestedAt) : "nunca indexado"}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <SummaryMetricCard label="Status" value={selectedSource.status} />
                      <SummaryMetricCard label="Tipo" value={(sourceTypesConfig[selectedSource.sourceType as keyof typeof sourceTypesConfig] || sourceTypesConfig.text).label} />
                      <SummaryMetricCard label="Docs" value={String(selectedSourceDocuments.length)} />
                      <SummaryMetricCard label="Prontidão" value={selectedSource.status === "indexed" ? "Retrieval" : "Ingestão"} />
                    </div>

                    {selectedSource.status === "ingesting" ? (
                      <div className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin text-primary" /> Scanning &amp; Indexing...</span>
                          <span className="text-muted-foreground font-mono">45%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mb-3 overflow-hidden">
                          <div className="bg-primary h-1.5 rounded-full transition-all duration-500 w-[45%]" />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">Extraindo tokens, vetorizando conteúdo e mapeando entidades semânticas para RAG. Isso pode levar alguns minutos.</p>
                      </div>
                    ) : (
                      <NextActionCard
                        icon={CheckCircle2}
                        description={selectedSource.status === "indexed"
                          ? "Validar qualidade de retrieval, chunks e cobertura da fonte antes de expandir o volume."
                          : "Executar ou revisar ingestão para disponibilizar esta fonte no fluxo de retrieval."}
                      />
                    )}
                  </div>
                ) : (
                  <SelectionEmptyState message="Selecione uma source para inspecionar o contexto." />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="m-0 border-0 p-0 outline-none">
          <Card>
            <CardContent className="pt-6 space-y-3">
              {loading ? <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="animate-spin h-4 w-4" /> Carregando documentos...</p> : null}
              {!loading && filteredDocuments.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum documento encontrado nas sources atuais.</p> : null}
              <div className="grid gap-3 md:grid-cols-2">
                {filteredDocuments.map((document) => (
                  <Link key={document.id} href={`/knowledge/documents/${document.id}`} className="flex flex-col gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50">
                    <div className="min-w-0">
                      <div className="font-medium text-base truncate">{document.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{document.mimeType} · source {document.sourceId}</div>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground flex-1">{document.body}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">pronto para chunking</span>
                      <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">inspecionável</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
}
