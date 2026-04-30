"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, RefreshCw, TerminalSquare } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { BlockedStateCard } from "@/components/ui/blocked-state-card"
import { EmptyStateCard } from "@/components/ui/empty-state-card"
import { ErrorStateCard } from "@/components/ui/error-state-card"
import { LoadingStateCard } from "@/components/ui/loading-state-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { listKnowledgeRetrievalLogs, listKnowledgeSources } from "@/lib/knowledge/api"

import type { KnowledgeRetrievalLogItem, KnowledgeSourceItem } from "./knowledge-types"

export function KnowledgeLogsView() {
  const [sources, setSources] = React.useState<KnowledgeSourceItem[]>([])
  const [logs, setLogs] = React.useState<KnowledgeRetrievalLogItem[]>([])
  const [selectedSourceId, setSelectedSourceId] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (sourceId?: string, announceEmpty = false) => {
    setLoading(true)
    setError(null)
    try {
      const [nextSources, nextLogs] = await Promise.all([
        listKnowledgeSources<KnowledgeSourceItem[]>(),
        listKnowledgeRetrievalLogs<KnowledgeRetrievalLogItem[]>(sourceId),
      ])
      setSources(nextSources)
      setLogs(nextLogs)
      if (announceEmpty && nextSources.length === 0) {
        toast.info("Nenhuma source disponível ainda. Crie ou conecte uma source para começar a observar logs de retrieval.")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao carregar logs"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Logs" }]} />
      <PageHeader
        title="Retrieval logs"
        description="Observabilidade inicial do fluxo RAG com consultas recentes, source associada e documentos encontrados."
        actions={
          <>
            <Button asChild variant="outline" size="sm"><Link href="/knowledge/retrieval">Console de retrieval</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load(selectedSourceId || undefined, true)}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Logs" value={String(logs.length)} icon={TerminalSquare} />
        <StatCard label="Sources" value={String(sources.length)} icon={BookOpen} />
        <StatCard label="Filtrada" value={selectedSourceId ? "Sim" : "Não"} />
        <StatCard label="Estado" value={loading ? "Sync" : "Live"} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Filtro</CardTitle>
            <CardDescription>Restrinja os logs por source e recarregue a leitura operacional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Source</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={selectedSourceId} onChange={(e) => setSelectedSourceId(e.target.value)}>
                <option value="">Todas as sources</option>
                {sources.map((source) => <option key={source.id} value={source.id}>{source.name}</option>)}
              </select>
            </div>
            <Button className="w-full" onClick={() => void load(selectedSourceId || undefined, true)}>Aplicar filtro</Button>
            <div className="space-y-2">
              <Label>Busca rápida</Label>
              <Input disabled placeholder="Próxima etapa: busca textual nos logs" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logs recentes</CardTitle>
            <CardDescription>Consultas registradas no fluxo de retrieval.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? <LoadingStateCard title="Sincronizando logs" description="Coletando observabilidade recente por source." lines={5} /> : null}
            {!loading && error ? <ErrorStateCard description={error} tone="degraded" action={<Button variant="outline" size="sm" onClick={() => void load(selectedSourceId || undefined)}>Tentar novamente</Button>} /> : null}
            {!loading && !error && logs.length === 0 && sources.length > 0 ? <EmptyStateCard title="Sem logs ainda" description="Execute consultas no console de retrieval para começar a observar o pipeline." eyebrow="Estado vazio" action={<Button asChild size="sm"><Link href="/knowledge/retrieval">Executar retrieval</Link></Button>} /> : null}
            {!loading && !error && logs.length === 0 && sources.length === 0 ? <BlockedStateCard title="Observabilidade bloqueada" description="Os painéis de logs dependem de pelo menos uma source para começar a registrar consultas." requirement="conectar ou criar a primeira source de knowledge" action={<Button asChild size="sm"><Link href="/knowledge">Abrir hub de knowledge</Link></Button>} /> : null}
            {!loading && !error && logs.map((log) => {
              const source = sources.find((item) => item.id === log.sourceId)
              return (
                <div key={log.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{source?.name ?? log.sourceId}</Badge>
                    <Badge variant="outline">{log.matchedDocumentIds.length} docs</Badge>
                  </div>
                  <div className="mt-2 text-sm font-medium">{log.query}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatDateTime(log.createdAt)}</div>
                  <div className="mt-3 text-sm text-muted-foreground">matchedDocumentIds: {log.matchedDocumentIds.join(", ") || "nenhum"}</div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
