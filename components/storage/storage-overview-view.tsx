"use client"

import * as React from "react"
import Link from "next/link"
import { Bot, FolderTree, HardDrive, ImageIcon, UploadCloud, AlertTriangle, Eye, ChevronRight, ShieldCheck, FolderOpen, FileText, Search, MoreVertical, ExternalLink } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const folders = [
  { id: "f1", name: "brand", path: "/workspace-assets/brand", files: 128, access: "workspace" },
  { id: "f2", name: "concierge-vip", path: "/agents/concierge-vip", files: 42, access: "agent" },
  { id: "f3", name: "uploads", path: "/knowledge/uploads", files: 317, access: "pipeline" },
  { id: "f4", name: "media", path: "/campaigns/media", files: 64, access: "workspace" },
  { id: "f5", name: "tool-inputs", path: "/integrations/tool-inputs", files: 211, access: "integration-runtime" },
]

const assets = [
  { id: "a1", name: "abril-vip-cupons.pdf", type: "pdf", owner: "agent.concierge-vip", size: "2.1 MB", modifiedAt: "Ontem, 14:30" },
  { id: "a2", name: "playbook-logistica-v4.docx", type: "doc", owner: "knowledge", size: "680 KB", modifiedAt: "24/04/2026" },
  { id: "a3", name: "banner-campanha-maio.png", type: "image", owner: "campaigns", size: "4.8 MB", modifiedAt: "22/04/2026" },
  { id: "a4", name: "erp-create-order-input.json", type: "json", owner: "integration-tool", size: "24 KB", modifiedAt: "19/04/2026" },
]

export function StorageOverviewView() {
  const [selectedFolder, setSelectedFolder] = React.useState<typeof folders[0] | null>(null)
  const [selectedAsset, setSelectedAsset] = React.useState<typeof assets[0] | null>(null)
  const [query, setQuery] = React.useState("")

  const filteredFolders = folders.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase()))
  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Storage" }]} />
      <PageHeader
        title="Storage do workspace"
        description="Gerencie arquivos, documentos e dados utilizados pelos agentes e automações."
        actions={<Button variant="outline" size="sm" className="gap-2"><UploadCloud className="h-4 w-4" />Upload</Button>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Assets" value="3.421" icon={HardDrive} />
        <StatCard label="Pastas" value="184" icon={FolderTree} />
        <StatCard label="Agentes com acesso" value="12" icon={Bot} />
        <StatCard label="Uso total" value="84.3 GB" icon={ImageIcon} />
      </div>

      <div className="mt-6">
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col min-h-[500px]">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border p-3 bg-muted/20">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar arquivos e pastas..." 
                className="pl-9 h-9" 
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><FolderOpen className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-auto">
            {filteredFolders.length === 0 && filteredAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                <HardDrive className="h-12 w-12 mb-4 opacity-20" />
                <p>Nenhum item encontrado.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {/* Folders */}
                {filteredFolders.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pastas</div>
                    <div className="grid gap-1">
                      {filteredFolders.map((folder) => (
                        <button
                          key={folder.id}
                          type="button"
                          onClick={() => setSelectedFolder(folder)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors hover:bg-accent/50 group text-left",
                            selectedFolder?.id === folder.id && "bg-accent/60"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className="h-5 w-5 text-blue-500 fill-blue-500/20" />
                            <div>
                              <div className="text-sm font-medium text-foreground">{folder.name}</div>
                              <div className="text-xs text-muted-foreground font-mono">{folder.path}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground hidden sm:block">{folder.files} itens</span>
                            <Badge variant="secondary" className="text-[10px] bg-muted">{folder.access}</Badge>
                            <MoreVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                {filteredAssets.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Arquivos</div>
                    <div className="grid gap-1">
                      {filteredAssets.map((asset) => (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => setSelectedAsset(asset)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors hover:bg-accent/50 group text-left",
                            selectedAsset?.id === asset.id && "bg-accent/60"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {asset.type === "image" ? (
                              <ImageIcon className="h-5 w-5 text-emerald-500 fill-emerald-500/20" />
                            ) : asset.type === "pdf" ? (
                              <FileText className="h-5 w-5 text-rose-500 fill-rose-500/20" />
                            ) : (
                              <FileText className="h-5 w-5 text-foreground/60 fill-foreground/10" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-foreground">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">owner: {asset.owner}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="text-xs text-muted-foreground hidden sm:block">{asset.modifiedAt}</span>
                            <span className="text-xs font-medium tabular-nums hidden sm:block w-16 text-right">{asset.size}</span>
                            <MoreVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sheets para inspeção */}
      <Sheet open={!!selectedFolder} onOpenChange={(open) => !open && setSelectedFolder(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades da Pasta</SheetTitle>
            <SheetDescription>Inspecionando diretório do workspace.</SheetDescription>
          </SheetHeader>
          
          {selectedFolder && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Caminho da Pasta</div>
                <div className="mt-2 font-mono text-sm text-foreground break-all">{selectedFolder.path}</div>
                <div className="mt-1 text-sm text-muted-foreground">{selectedFolder.files} arquivos armazenados</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StorageMetric label="Escopo de Acesso" value={selectedFolder.access} />
                <StorageMetric label="Visibilidade" value="Operacional" />
              </div>

              <div className="rounded-lg border border-dashed border-border p-4 bg-muted/20">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Contexto de Segurança
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {selectedFolder.access === "integration-runtime"
                    ? "Revisar retenção, segurança e exposição de payloads usados por integrações e tools."
                    : selectedFolder.access === "agent"
                      ? "Validar permissões, atualização de materiais e dependência direta dos agentes ativos."
                      : selectedFolder.access === "pipeline"
                        ? "Monitorar volume, ingestão e impacto sobre knowledge e processamento."
                        : "Garantir governança de acesso e consistência dos assets compartilhados no workspace."}
                </div>
              </div>
              
              <Button className="w-full gap-2 mt-4" variant="outline"><FolderOpen className="h-4 w-4" /> Entrar na pasta</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Propriedades do Asset</SheetTitle>
            <SheetDescription>Inspecionando metadados do arquivo.</SheetDescription>
          </SheetHeader>
          
          {selectedAsset && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Nome do Arquivo</div>
                <div className="mt-2 text-sm font-medium text-foreground break-all">{selectedAsset.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{selectedAsset.size} · Modificado em {selectedAsset.modifiedAt}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StorageMetric label="Tipo" value={selectedAsset.type} />
                <StorageMetric label="Owner" value={selectedAsset.owner} />
              </div>

              <div className="rounded-lg border border-dashed border-border p-4 bg-muted/20">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Status Operacional
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Este asset está atrelado ao owner <strong className="text-foreground">{selectedAsset.owner}</strong>. Qualquer modificação ou exclusão poderá impactar diretamente as execuções dependentes neste escopo.
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full gap-2"><ExternalLink className="h-4 w-4" /> Abrir Arquivo</Button>
                <Button className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" variant="ghost">Excluir Asset</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function StorageMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
