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
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Knowledge" }]} />
      <PageHeader
        title="Knowledge"
        description="Infraestrutura de grounding, ingestão e retrieval observável que alimenta agentes, contexto e memória operacional do NexxaLife."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => toast.success("Hub de Knowledge recarregado com resumo operacional atual")}
            ><RefreshCw className="h-3.5 w-3.5" />Atualizar hub</Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge/logs"><TerminalSquare className="h-3.5 w-3.5" />Pipelines</Link></Button>
            <Button asChild variant="default" size="sm" className="gap-2"><Link href="/knowledge/new"><Plus className="h-3.5 w-3.5" />Expandir conhecimento</Link></Button>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  Grounding operacional
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Estruture memória, fontes e retrieval sem transformar conhecimento em um silo paralelo da operação.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    Knowledge existe para sustentar agentes, contexto e busca observável. Seu papel é complementar AI Studio e a operação central do NexxaLife com base confiável de grounding.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Papel da página</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Infraestrutura de memória e retrieval</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    A prioridade aqui é ingestão, indexação, observabilidade e prontidão para uso por agentes e fluxos inteligentes.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Próxima conexão</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Knowledge → AI Studio → operação</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    O valor aparece quando a memória melhora resposta, grounding e decisão sem disputar o papel do dashboard principal.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard label="Sources ingeridas" value="12" hint="fontes conectadas" icon={BookOpen} />
              <StatCard label="Chunks vetoriais" value="8.421" hint="fragmentos semânticos" icon={FileText} />
              <StatCard label="Total indexado" value="2" hint="fontes prontas para RAG" icon={ScanSearch} />
              <StatCard label="Estado" value="Ao vivo" hint="RAG operacional" icon={DatabaseZap} />
            </div>
          </CardContent>
        </Card>

        <OperationalAlertBanner
          className="h-full"
          icon={AlertTriangle}
          title="A base de conhecimento não é atrelada a um agente específico"
          description="Knowledge é a infraestrutura pura de grounding (RAG). Aqui você ingere e estrutura os dados. O uso desse conhecimento é configurado individualmente na aba 'Knowledge' de cada Agente no AI Studio."
        />
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
