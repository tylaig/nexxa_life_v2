"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, TerminalSquare } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { BlockedStateCard } from "@/components/ui/blocked-state-card"
import { EmptyStateCard } from "@/components/ui/empty-state-card"
import { ErrorStateCard } from "@/components/ui/error-state-card"
import { LoadingStateCard } from "@/components/ui/loading-state-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { listKnowledgeSources, runKnowledgeRetrieval } from "@/lib/knowledge/api"

import type { KnowledgeRetrievalResult, KnowledgeSourceItem } from "./knowledge-types"

export function KnowledgeRetrievalView() {
  const [sources, setSources] = React.useState<KnowledgeSourceItem[]>([])
  const [selectedSourceId, setSelectedSourceId] = React.useState("")
  const [query, setQuery] = React.useState("qual o prazo de entrega?")
  const [result, setResult] = React.useState<KnowledgeRetrievalResult | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [retrieving, setRetrieving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (announceEmpty = false) => {
    setLoading(true)
    setError(null)
    try {
      const nextSources = await listKnowledgeSources<KnowledgeSourceItem[]>()
      setSources(nextSources)
      setSelectedSourceId((current) => current || nextSources[0]?.id || "")
      if (announceEmpty && nextSources.length === 0) {
        toast.info("Nenhuma source disponível ainda. Crie ou conecte uma source antes de recarregar o console de retrieval.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar sources")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  async function handleRetrieve() {
    if (!selectedSourceId || !query.trim()) return
    setRetrieving(true)
    setError(null)
    try {
      const next = await runKnowledgeRetrieval<KnowledgeRetrievalResult>({ sourceId: selectedSourceId, query, limit: 5 })
      setResult(next)
      toast.success(`Retrieval executado com ${next.items.length} resultado(s)`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha na consulta"
      setError(message)
      toast.error(message)
    } finally {
      setRetrieving(false)
    }
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Retrieval" }]} />
      <PageHeader
        title="Retrieval console"
        description="Console dedicado para consulta, debugging e leitura de logs do fluxo RAG."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge"><ArrowLeft className="h-3.5 w-3.5" />Knowledge</Link></Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge/logs"><TerminalSquare className="h-3.5 w-3.5" />Logs</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load(true)}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Sources" value={String(sources.length)} />
        <StatCard label="Resultados" value={String(result?.items.length ?? 0)} />
        <StatCard label="Logs" value={String(result?.logs.length ?? 0)} icon={TerminalSquare} />
        <StatCard label="Estado" value={retrieving ? "Query" : loading ? "Sync" : "Live"} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Executar consulta</CardTitle>
            <CardDescription>Selecione a source e rode retrieval observável.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <LoadingStateCard title="Sincronizando sources" description="Carregando catálogo operacional para habilitar o retrieval." lines={2} /> : null}
            {!loading ? (
              <>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={selectedSourceId} onChange={(e) => setSelectedSourceId(e.target.value)}>
                    <option value="">Selecione uma source</option>
                    {sources.map((source) => <option key={source.id} value={source.id}>{source.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Pergunta</Label>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                {sources.length === 0 ? (
                  <BlockedStateCard
                    title="Retrieval bloqueado"
                    description="Crie ou conecte uma source antes de consultar o corpus."
                    requirement="pelo menos uma source indexável"
                    action={<Button asChild size="sm"><Link href="/knowledge">Abrir hub de knowledge</Link></Button>}
                  />
                ) : null}
                <Button onClick={() => void handleRetrieve()} disabled={retrieving || !selectedSourceId || !query.trim() || sources.length === 0}>{retrieving ? "Consultando..." : "Executar retrieval"}</Button>
                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
              </>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados e logs</CardTitle>
            <CardDescription>Leitura consolidada do que foi encontrado e registrado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {retrieving ? <LoadingStateCard title="Executando retrieval" description="Buscando chunks e consolidando logs observáveis." lines={3} /> : null}
            {error ? <ErrorStateCard description={error} tone="critical" action={<Button variant="outline" size="sm" onClick={() => void handleRetrieve()}>Tentar novamente</Button>} /> : null}
            {result?.items.map((item) => (
              <div key={item.id} className="rounded-lg border border-border p-3">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-3">{item.body}</div>
              </div>
            ))}
            {result?.logs.map((log) => (
              <div key={log.id} className="rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
                <div className="font-medium text-foreground">{log.query}</div>
                <div className="mt-1">matchedDocumentIds: {log.matchedDocumentIds.join(", ")}</div>
              </div>
            ))}
            {!result && !error && !retrieving && sources.length > 0 ? <EmptyStateCard title="Nenhuma consulta executada" description="Execute uma consulta para visualizar resultados e logs do retrieval." eyebrow="Estado inicial" /> : null}
            {!result && !error && !retrieving && sources.length === 0 && !loading ? <BlockedStateCard title="Sem corpus disponível" description="O console está pronto, mas ainda não existe nenhuma source para alimentar resultados e logs." requirement="criar ou conectar a primeira source no hub de knowledge" action={<Button asChild size="sm"><Link href="/knowledge">Configurar source</Link></Button>} /> : null}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
