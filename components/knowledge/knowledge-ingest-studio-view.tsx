"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createKnowledgeDocument, createKnowledgeSource } from "@/lib/knowledge/api"

export function KnowledgeIngestStudioView() {
  const [sourceName, setSourceName] = React.useState("")
  const [sourceType, setSourceType] = React.useState("url")
  const [url, setUrl] = React.useState("https://example.com/faq")
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [mimeType, setMimeType] = React.useState("text/plain")
  const [saving, setSaving] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)
    try {
      const source = await createKnowledgeSource<{ id: string }>({ sourceType, name: sourceName, config: { url } })
      if (title.trim() && body.trim()) {
        await createKnowledgeDocument(source.id, { title, body, mimeType, metadata: {} })
      }
      setMessage("Source criada com sucesso. Documento inicial materializado quando informado.")
      setSourceName("")
      setTitle("")
      setBody("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar source")
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageContainer className="pb-28">
      <PageHeader
        title="Nova source"
        description="Fluxo full screen para ingestão inicial de source e documento, separado do catálogo principal."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge"><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <form className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source</CardTitle>
              <CardDescription>Defina a origem base do conhecimento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Tipo"><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={sourceType} onChange={(e) => setSourceType(e.target.value)}><option value="url">URL</option><option value="manual">Manual</option><option value="pdf">PDF</option></select></Field>
              <Field label="Nome"><Input value={sourceName} onChange={(e) => setSourceName(e.target.value)} /></Field>
              <Field label="URL"><Input value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documento inicial</CardTitle>
              <CardDescription>Opcionalmente crie um documento inicial já vinculado à source.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Título"><Input value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
              <Field label="Conteúdo"><Textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} /></Field>
              <Field label="Mime type"><Input value={mimeType} onChange={(e) => setMimeType(e.target.value)} /></Field>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Revise a ingestão antes de salvar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Source</div><div className="mt-1 font-medium">{sourceName || "Sem nome"}</div></div>
            <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Documento inicial</div><div className="mt-1 font-medium">{title || "Nenhum"}</div></div>
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </CardContent>
        </Card>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
            <div className="text-sm text-muted-foreground">Ingestão inicial separada do catálogo principal para reduzir carga cognitiva.</div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline"><Link href="/knowledge">Cancelar</Link></Button>
              <Button type="submit" disabled={saving || !sourceName.trim()} className="gap-2"><Save className="h-3.5 w-3.5" />{saving ? "Salvando..." : "Criar source"}</Button>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}
