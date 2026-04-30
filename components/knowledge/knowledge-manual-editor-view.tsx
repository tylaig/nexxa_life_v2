"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Save, Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Code, Image as ImageIcon, Link as LinkIcon, Sparkles } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

export function KnowledgeManualEditorView() {
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      // redirect or show success toast in real app
    }, 1000)
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Nova Source", href: "/knowledge/new" }, { label: "Editor Manual" }]} />
      <PageHeader
        title="Editor de Conhecimento"
        description="Redija manuais, políticas ou FAQs diretamente no formato nativo que a IA compreende com maior precisão."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge/new"><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>
            <Button size="sm" className="gap-2" onClick={handleSave} disabled={saving || !title || !body}><Save className="h-3.5 w-3.5" />{saving ? "Salvando..." : "Salvar e Indexar"}</Button>
          </>
        }
      />

      <div className="mx-auto max-w-4xl bg-background rounded-xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2">
          <div className="flex items-center border-r border-border pr-2 mr-1">
            <Toggle size="sm" aria-label="Heading 1"><Heading1 className="h-4 w-4" /></Toggle>
            <Toggle size="sm" aria-label="Heading 2"><Heading2 className="h-4 w-4" /></Toggle>
            <Toggle size="sm" aria-label="Heading 3"><Heading3 className="h-4 w-4" /></Toggle>
          </div>
          <div className="flex items-center border-r border-border pr-2 mr-1">
            <Toggle size="sm" aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
            <Toggle size="sm" aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
          </div>
          <div className="flex items-center border-r border-border pr-2 mr-1">
            <Toggle size="sm" aria-label="Bullet List"><List className="h-4 w-4" /></Toggle>
            <Toggle size="sm" aria-label="Numbered List"><ListOrdered className="h-4 w-4" /></Toggle>
          </div>
          <div className="flex items-center border-r border-border pr-2 mr-1">
            <Toggle size="sm" aria-label="Quote"><Quote className="h-4 w-4" /></Toggle>
            <Toggle size="sm" aria-label="Code"><Code className="h-4 w-4" /></Toggle>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="px-2"><LinkIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="px-2"><ImageIcon className="h-4 w-4" /></Button>
          </div>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="text-emerald-600 gap-1.5"><Sparkles className="h-4 w-4" /> IA Format</Button>
          </div>
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 flex flex-col p-8 md:p-12">
          <input
            type="text"
            placeholder="Título do Documento..."
            className="text-4xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Comece a digitar em markdown... Pressione '/' para comandos."
            className="flex-1 text-base leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/40 font-mono"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
    </PageContainer>
  )
}
