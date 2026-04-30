"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, PlayCircle, RefreshCw, TerminalSquare } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { listKnowledgeDocuments, listKnowledgeSources, runKnowledgeIngest } from "@/lib/knowledge/api"

import type { KnowledgeDocumentItem, KnowledgeSourceItem } from "./knowledge-types"

export function KnowledgeSourceDetailView({ sourceId }: { sourceId: string }) {
  const [source, setSource] = React.useState<KnowledgeSourceItem | null>(null)
  const [documents, setDocuments] = React.useState<KnowledgeDocumentItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [ingesting, setIngesting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const sources = await listKnowledgeSources<KnowledgeSourceItem[]>()
      const found = sources.find((item) => item.id === sourceId) ?? null
      setSource(found)
      if (found) {
        setDocuments(await listKnowledgeDocuments<KnowledgeDocumentItem[]>(found.id))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar source")
    } finally {
      setLoading(false)
    }
  }, [sourceId])

  React.useEffect(() => { void load() }, [load])

  async function handleIngest() {
    if (!source) return
    setIngesting(true)
    setMessage(null)
    setError(null)
    try {
      const result = await runKnowledgeIngest<KnowledgeSourceItem>({ sourceType: source.sourceType, name: source.name, config: source.config })
      setMessage(`Ingest concluído com status ${result.status}`)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no ingest")
    } finally {
      setIngesting(false)
    }
  }

  if (!loading && !source) {
    return <PageContainer><AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Source não encontrada" }]} /><PageHeader title="Source não encontrada" description="Não foi possível localizar a source solicitada." actions={<Button asChild variant="outline" size="sm"><Link href="/knowledge">Voltar</Link></Button>} /></PageContainer>
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: source?.name ?? "Source" }]} />
      <PageHeader
        title={source?.name ?? "Source"}
        description="Inspeção operacional da fonte com documentos, status de ingestão e acesso ao retrieval console."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge"><ArrowLeft className="h-3.5 w-3.5" />Knowledge</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void handleIngest()} disabled={ingesting}><PlayCircle className="h-3.5 w-3.5" />{ingesting ? "Indexando..." : "Rodar ingest"}</Button>
            <Button asChild size="sm" className="gap-2"><Link href="/knowledge/retrieval"><TerminalSquare className="h-3.5 w-3.5" />Retrieval</Link></Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{source?.status ?? "loading"}</Badge>
        <Badge variant="outline">{source?.sourceType}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Documents" value={String(documents.length)} icon={FileText} />
        <StatCard label="Chunks estimados" value={String(documents.reduce((sum, document) => sum + estimateChunks(document.body), 0))} icon={BookOpen} />
        <StatCard label="Último ingest" value={source?.lastIngestedAt ? formatDate(source.lastIngestedAt) : "—"} />
        <StatCard label="Estado" value={loading ? "Sync" : "Live"} hint="source observável" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Resumo da source</CardTitle>
            <CardDescription>Metadados principais e parâmetros da origem.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Detail label="Nome">{source?.name}</Detail>
            <Detail label="Tipo">{source?.sourceType}</Detail>
            <Detail label="Configuração"><pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify(source?.config ?? {}, null, 2)}</pre></Detail>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents da source</CardTitle>
            <CardDescription>Inspecione documentos indexados antes de entrar no console de retrieval.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((document) => (
              <Link key={document.id} href={`/knowledge/documents/${document.id}`} className="block rounded-lg border border-border p-3 transition-colors hover:bg-accent/50">
                <div className="font-medium">{document.title}</div>
                <div className="text-xs text-muted-foreground">{document.mimeType}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{document.body}</p>
              </Link>
            ))}
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-sm font-medium">{children}</div></div>
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
}

function estimateChunks(body: string) {
  return Math.max(1, Math.ceil(body.length / 400))
}
