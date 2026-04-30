"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Globe, FileText, AlignLeft, HardDrive, DatabaseZap } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function KnowledgeIngestChoiceView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Nova Source" }]} />
      <PageHeader
        title="Adicionar Conhecimento"
        description="Escolha a origem dos dados para treinar o RAG. O conteúdo será extraído, transformado em chunks semânticos e indexado no vector database."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge"><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
        <Link href="/knowledge/import/crawler">
          <Card className="h-full transition-colors hover:bg-accent/50 hover:border-primary/50 cursor-pointer">
            <CardHeader>
              <div className="p-2.5 w-max rounded-lg bg-blue-500/10 text-blue-500 mb-2">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle>Site Crawler / URL</CardTitle>
              <CardDescription>Escaneie sites inteiros ou baixe o conteúdo de URLs específicas automaticamente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">Scraping automático</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">Extração de links</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/knowledge/manual">
          <Card className="h-full transition-colors hover:bg-accent/50 hover:border-primary/50 cursor-pointer">
            <CardHeader>
              <div className="p-2.5 w-max rounded-lg bg-amber-500/10 text-amber-500 mb-2">
                <AlignLeft className="h-6 w-6" />
              </div>
              <CardTitle>Editor Manual (Markdown)</CardTitle>
              <CardDescription>Crie diretrizes, FAQs e políticas diretamente em um editor editorial focado em markdown.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">WYSIWYG Markdown</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">Inputs granulares</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="h-full opacity-60">
          <CardHeader>
            <div className="p-2.5 w-max rounded-lg bg-emerald-500/10 text-emerald-500 mb-2">
              <HardDrive className="h-6 w-6" />
            </div>
            <CardTitle>Upload de Arquivos</CardTitle>
            <CardDescription>Importe PDFs, Docs e planilhas CSV. (Em breve)</CardDescription>
          </CardHeader>
        </Card>

        <Card className="h-full opacity-60">
          <CardHeader>
            <div className="p-2.5 w-max rounded-lg bg-purple-500/10 text-purple-500 mb-2">
              <DatabaseZap className="h-6 w-6" />
            </div>
            <CardTitle>Integrações Nativas</CardTitle>
            <CardDescription>Sincronize Zendesk, Notion, Confluence ou Google Drive. (Em breve)</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </PageContainer>
  )
}
