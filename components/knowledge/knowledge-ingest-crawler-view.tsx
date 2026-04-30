"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Play, Loader2, CheckCircle2, DatabaseZap, LayoutGrid, TerminalSquare } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function KnowledgeIngestCrawlerView() {
  const [url, setUrl] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "scanning" | "processing" | "indexing" | "done">("idle")
  const [progress, setProgress] = React.useState(0)
  const [pagesFound, setPagesFound] = React.useState(0)

  // Mock progression
  React.useEffect(() => {
    if (status === "idle" || status === "done") return

    let interval: NodeJS.Timeout
    if (status === "scanning") {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 33) {
            setStatus("processing")
            return 33
          }
          setPagesFound(Math.floor((p / 33) * 124))
          return p + 2
        })
      }, 200)
    } else if (status === "processing") {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 75) {
            setStatus("indexing")
            return 75
          }
          return p + 1.5
        })
      }, 150)
    } else if (status === "indexing") {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setStatus("done")
            return 100
          }
          return p + 1
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [status])

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Nova Source", href: "/knowledge/new" }, { label: "Web Crawler" }]} />
      <PageHeader
        title="Web Crawler Pipeline"
        description="Ingestão automatizada de site. Descobrimos as páginas, limpamos o HTML, fragmentamos em chunks e vetorizamos no RAG."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href="/knowledge/new"><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Alvo</CardTitle>
              <CardDescription>Defina a URL raiz que deseja escanear.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL do Site</Label>
                <div className="flex gap-3">
                  <Input 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="https://sua-empresa.com.br" 
                    disabled={status !== "idle"} 
                    className="flex-1"
                  />
                  <Button 
                    disabled={status !== "idle" || !url} 
                    onClick={() => setStatus("scanning")}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" /> Iniciar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  O crawler respeitará o robots.txt e fará varredura recursiva de até 300 páginas.
                </p>
              </div>
            </CardContent>
          </Card>

          {status !== "idle" && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {status === "done" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                  Pipeline de Indexação Ativo
                </CardTitle>
                <CardDescription>
                  {status === "scanning" && "Descobrindo URLs e mapeando sitemap..."}
                  {status === "processing" && "Extraindo conteúdo útil, limpando HTML e convertendo para Markdown..."}
                  {status === "indexing" && "Criando semantic chunks e gerando embeddings..."}
                  {status === "done" && "Ingestão concluída com sucesso. Base pronta para RAG."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progresso Total</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <PipelineStep 
                    title="1. Scanning" 
                    active={status === "scanning"} 
                    done={status === "processing" || status === "indexing" || status === "done"} 
                    metric={`${pagesFound} URLs`} 
                    icon={Globe}
                  />
                  <PipelineStep 
                    title="2. Processing" 
                    active={status === "processing"} 
                    done={status === "indexing" || status === "done"} 
                    metric={progress > 33 ? `${Math.floor((pagesFound * 0.8) * ((progress - 33)/42))} HTML limpados` : "-"} 
                    icon={LayoutGrid}
                  />
                  <PipelineStep 
                    title="3. Indexing" 
                    active={status === "indexing"} 
                    done={status === "done"} 
                    metric={progress > 75 ? `${Math.floor(pagesFound * 15 * ((progress - 75)/25))} chunks vetoriais` : "-"} 
                    icon={DatabaseZap}
                  />
                </div>
                
                {status === "done" && (
                  <div className="pt-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => { setStatus("idle"); setProgress(0); setPagesFound(0); setUrl(""); }}>Escanear outro</Button>
                    <Button asChild><Link href="/knowledge">Ir para o Hub</Link></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TerminalSquare className="h-4 w-4" /> Live Tail Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background rounded-lg border border-border p-3 font-mono text-[10px] text-muted-foreground h-[400px] overflow-y-auto flex flex-col-reverse gap-1.5">
                {status === "done" && <div className="text-emerald-500">[INFO] Indexação concluída. 124 URLs processadas.</div>}
                {progress > 85 && <div>[INFO] Upserting batch 3/3 para namespace web_crawler...</div>}
                {progress > 80 && <div>[INFO] Upserting batch 2/3 para namespace web_crawler...</div>}
                {progress > 76 && <div>[INFO] Upserting batch 1/3 para namespace web_crawler...</div>}
                {progress > 75 && <div>[INFO] Vector DB connection established. Iniciando embeddings...</div>}
                {progress > 60 && <div>[DEBUG] Limpando tags nav e footer da URL /sobre...</div>}
                {progress > 45 && <div>[DEBUG] Limpando tags nav e footer da URL /precos...</div>}
                {progress > 34 && <div>[INFO] Iniciando pipeline de extração Markdown DOM-to-Text...</div>}
                {progress > 33 && <div className="text-amber-500">[WARN] 3 URLs retornaram 404. Ignorando.</div>}
                {progress > 20 && <div>[DEBUG] Fetching sitemap.xml... Encontradas {pagesFound} rotas.</div>}
                {progress > 5 && <div>[INFO] Resolving DNS para {url || "target"}...</div>}
                {status !== "idle" && <div>[INFO] Iniciando Web Crawler Job...</div>}
                {status === "idle" && <div>Aguardando input de URL para iniciar o stream.</div>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

function PipelineStep({ title, active, done, metric, icon: Icon }: { title: string, active: boolean, done: boolean, metric: string, icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className={cn("p-3 rounded-lg border", 
      done ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600" :
      active ? "border-primary/50 bg-primary/10 text-primary" : 
      "border-border bg-background/50 text-muted-foreground"
    )}>
      <div className="flex items-center gap-2 mb-2 font-medium text-xs uppercase tracking-wider">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <div className="text-sm font-semibold">{metric}</div>
    </div>
  )
}
