"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, FileText, RefreshCw, ScanSearch } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { listKnowledgeChunks, listKnowledgeDocuments, listKnowledgeSources } from "@/lib/knowledge/api"

import type { KnowledgeChunkItem, KnowledgeDocumentItem, KnowledgeSourceItem } from "./knowledge-types"

export function KnowledgeDocumentDetailView({ documentId }: { documentId: string }) {
  const [document, setDocument] = React.useState<KnowledgeDocumentItem | null>(null)
  const [chunks, setChunks] = React.useState<KnowledgeChunkItem[]>([])
  const [source, setSource] = React.useState<KnowledgeSourceItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const sources = await listKnowledgeSources<KnowledgeSourceItem[]>()
      let foundDocument: KnowledgeDocumentItem | null = null
      let foundSource: KnowledgeSourceItem | null = null

      for (const item of sources) {
        const docs = await listKnowledgeDocuments<KnowledgeDocumentItem[]>(item.id)
        const match = docs.find((doc) => doc.id === documentId)
        if (match) {
          foundDocument = match
          foundSource = item
          break
        }
      }

      setDocument(foundDocument)
      setSource(foundSource)
      setChunks(foundDocument ? await listKnowledgeChunks<KnowledgeChunkItem[]>(foundDocument.id) : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar documento")
    } finally {
      setLoading(false)
    }
  }, [documentId])

  React.useEffect(() => { void load() }, [load])

  if (!loading && !document) {
    return <PageContainer><AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Documento não encontrado" }]} /><PageHeader title="Documento não encontrado" description="Não foi possível localizar o documento solicitado." actions={<Button asChild variant="outline" size="sm"><Link href="/knowledge">Voltar</Link></Button>} /></PageContainer>
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, ...(source ? [{ label: source.name, href: `/knowledge/sources/${source.id}` }] : []), { label: document?.title ?? "Documento" }]} />
      <PageHeader
        title={document?.title ?? "Documento"}
        description="Inspeção do documento com conteúdo bruto, chunks materializados e vínculo com a source de origem."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href={source ? `/knowledge/sources/${source.id}` : "/knowledge"}><ArrowLeft className="h-3.5 w-3.5" />{source ? "Source" : "Knowledge"}</Link></Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}><RefreshCw className="h-3.5 w-3.5" />Atualizar</Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="outline">{document?.mimeType}</Badge>
        {source ? <Badge variant="secondary">{source.name}</Badge> : null}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Chunks" value={String(chunks.length)} icon={ScanSearch} />
        <StatCard label="Tokens estimados" value={String(chunks.reduce((sum, chunk) => sum + chunk.tokenEstimate, 0))} icon={FileText} />
        <StatCard label="Source" value={source?.sourceType ?? "—"} />
        <StatCard label="Estado" value={loading ? "Sync" : "Live"} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo do documento</CardTitle>
            <CardDescription>Texto bruto persistido para ingestão e retrieval.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-sm text-muted-foreground whitespace-pre-wrap">{document?.body}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chunks materializados</CardTitle>
            <CardDescription>Fragmentos usados no retrieval e na remontagem por documento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {chunks.map((chunk) => (
              <div key={chunk.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">Chunk #{chunk.chunkIndex + 1}</div>
                  <Badge variant="outline">~{chunk.tokenEstimate} tokens</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{chunk.content}</p>
              </div>
            ))}
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
