"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, FileText, Plus, RefreshCw, ScanSearch, TerminalSquare, AlertTriangle, DatabaseZap, CheckCircle2, LayoutGrid, Globe, HardDrive } from "lucide-react"
import { toast } from "sonner"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { OperationalAlertBanner } from "@/components/app-shell/operational-alert-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function KnowledgeOverviewView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge" }]} />
      <PageHeader
        title="Knowledge Base (RAG)"
        description="Centro de comando para expansão de memória corporativa. Ingestão, indexação vetorial e testes de retrieval."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => toast.success("Hub de Knowledge recarregado com resumo operacional atual")}
            ><RefreshCw className="h-3.5 w-3.5" />Atualizar Hub</Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge/logs"><TerminalSquare className="h-3.5 w-3.5" />Pipelines</Link></Button>
            <Button asChild variant="default" size="sm" className="gap-2"><Link href="/knowledge/new"><Plus className="h-3.5 w-3.5" />Expandir Conhecimento</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-8">
        <StatCard label="Sources Ingeridas" value="12" hint="fontes conectadas" icon={BookOpen} />
        <StatCard label="Chunks Vetoriais" value="8.421" hint="fragmentos semânticos" icon={FileText} />
        <StatCard label="Total Indexado" value="2" hint="fontes prontas para RAG" icon={ScanSearch} />
        <StatCard label="Estado" value="Ao Vivo" hint="RAG operacional" icon={DatabaseZap} />
      </div>

      <OperationalAlertBanner
        className="mb-8"
        icon={AlertTriangle}
        title="A base de conhecimento não é atrelada a um agente específico"
        description="Knowledge é a infraestrutura pura de grounding (RAG). Aqui você ingere e estrutura os dados. O uso desse conhecimento é configurado individualmente na aba 'Knowledge' de cada Agente no AI Studio."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Ingestão de Dados
            </CardTitle>
            <CardDescription>Escaneie URLs, suba PDFs ou escreva regras.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                Web Crawler, Sitemap e URLs.
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <LayoutGrid className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                Editor de Markdown Nativo.
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <HardDrive className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                Upload e Processamento de Documentos.
              </div>
            </div>
            <Button asChild className="w-full"><Link href="/knowledge/new">Nova Ingestão</Link></Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Catálogo de Fontes
            </CardTitle>
            <CardDescription>Gerencie todas as fontes importadas.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <DatabaseZap className="h-4 w-4 shrink-0 mt-0.5" />
                Revise chunks e force re-indexação.
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                Acompanhe status de embedding em tempo real.
              </div>
            </div>
            <Button asChild variant="secondary" className="w-full"><Link href="/knowledge/sources">Abrir Catálogo</Link></Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanSearch className="h-5 w-5 text-purple-500" />
              Testes de Retrieval
            </CardTitle>
            <CardDescription>Consulte o vector DB antes do agente.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <TerminalSquare className="h-4 w-4 shrink-0 mt-0.5" />
                Simule prompts do usuário para ver quais chunks o RAG traz.
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                Valide distâncias de similaridade e score de relevância.
              </div>
            </div>
            <Button asChild variant="outline" className="w-full border-dashed"><Link href="/knowledge/retrieval">Simular Busca RAG</Link></Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
