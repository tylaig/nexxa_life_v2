"use client"

import * as React from "react"
import { Bot, RefreshCw, Sparkles, AlertTriangle, Eye, Variable, Wand2, Search, ChevronRight, CheckCircle2, Plus } from "lucide-react"

import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { createSkill, listSkills } from "@/lib/skills/api"
import { cn } from "@/lib/utils"
import { extractSkillVariables, renderSkillTemplate } from "@/modules/skills/parser"

type SkillItem = {
  id: string
  name: string
  slug: string
  description: string
  status: string
  category: string
  outputMode: string
  currentVersion: {
    version: number
    promptTemplate: string
    detectedVariables: string[]
  }
}

export function SkillsView() {
  const [items, setItems] = React.useState<SkillItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [previewValues, setPreviewValues] = React.useState<Record<string, string>>({ order_id: "ORD-1001", agent_name: "Josefino" })
  const [form, setForm] = React.useState({ name: "", slug: "", description: "", promptTemplate: "Resuma {{$order_id}} para {{$agent_name}}" })
  const [query, setQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<"all" | "draft" | "published">("all")
  
  // Sheet states
  const [selectedSkillId, setSelectedSkillId] = React.useState<string | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)

  const detectedVariables = React.useMemo(() => extractSkillVariables(form.promptTemplate), [form.promptTemplate])
  const renderedPreview = React.useMemo(() => renderSkillTemplate(form.promptTemplate, previewValues), [form.promptTemplate, previewValues])

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const nextItems = await listSkills<SkillItem[]>()
      setItems(nextItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar skills")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter
      const haystack = [item.name, item.slug, item.description, item.category, item.outputMode].join(" ").toLowerCase()
      const matchesQuery = query.trim().length === 0 ? true : haystack.includes(query.trim().toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [items, query, statusFilter])

  const selectedSkill = items.find((item) => item.id === selectedSkillId) ?? null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const item = await createSkill<SkillItem>({ ...form })
      setItems((current) => [item, ...current])
      setIsCreating(false)
      setSelectedSkillId(item.id)
      setForm((current) => ({ ...current, name: "", slug: "" }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar skill")
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Skills de IA" 
        description="Catálogo operacional de prompts reutilizáveis com detecção automática de variáveis." 
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}>
              <RefreshCw className="h-3.5 w-3.5" />Atualizar
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setIsCreating(true)}>
              <Plus className="h-3.5 w-3.5" />Nova Skill
            </Button>
          </>
        } 
      />
      
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <StatCard label="Skills" value={String(items.length)} hint="catálogo operacional" icon={Bot} />
        <StatCard label="Versões" value={String(items.length)} hint="1 por skill nesta fase" icon={Sparkles} />
        <StatCard label="Rascunhos" value={String(items.filter((item) => item.status === "draft").length)} hint="prontas para revisar" icon={Wand2} />
        <StatCard label="Estado" value={loading ? "Sincronizando" : "Ao vivo"} hint="parser de variáveis ativo" icon={Variable} />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertTriangle className="h-4 w-4 text-[var(--status-pending)]" />
              Skill boa precisa nascer com contexto, variáveis previsíveis e preview confiável
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Antes de publicar, valide se o template é claro, se as variáveis cobrem o caso real e se a saída final faz sentido para operação.
            </p>
          </div>
          <div className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            Fluxo recomendado: criar → revisar → publicar
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills existentes</CardTitle>
            <CardDescription>Catálogo de habilidades e prompts estruturados que podem ser injetados nos Agentes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome, slug, categoria..." className="pl-8 h-9" />
              </div>
              <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1">
                {(["all", "draft", "published"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStatusFilter(value)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      statusFilter === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {value === "all" ? "Todas" : value === "draft" ? "Rascunhos" : "Publicadas"}
                  </button>
                ))}
              </div>
            </div>

            {loading ? <p className="text-sm text-muted-foreground">Carregando skills...</p> : null}
            {!loading && filteredItems.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma skill encontrada para os filtros atuais.</p> : null}
            
            <div className="grid gap-3 xl:grid-cols-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSkillId(item.id)}
                  className={cn(
                    "w-full rounded-xl border border-border p-4 text-left transition-colors hover:bg-accent/40",
                    selectedSkillId === item.id && "bg-accent/50 border-primary/40"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <Wand2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.slug} · v{item.currentVersion.version}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{item.status}</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.currentVersion.detectedVariables.length > 0 ? item.currentVersion.detectedVariables.map((variable) => <Badge key={variable} variant="outline" className="text-[10px]">{variable}</Badge>) : <Badge variant="outline" className="text-[10px]">Sem variáveis</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.outputMode}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet: Nova Skill */}
      <Sheet open={isCreating} onOpenChange={setIsCreating}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Nova skill</SheetTitle>
            <SheetDescription>{"Crie o template inicial e valide as variáveis {{$var}}."}</SheetDescription>
          </SheetHeader>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Field label="Nome" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
              <Field label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: value })} />
              <Field label="Descrição" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
              <div className="space-y-2"><Label>Prompt template</Label><Textarea value={form.promptTemplate} onChange={(e) => setForm({ ...form, promptTemplate: e.target.value })} rows={6} /></div>
            </div>

            <div className="rounded-lg border border-dashed border-border p-4 space-y-4 bg-muted/20">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-background border p-2 text-muted-foreground shadow-sm"><Eye className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium">Preview operacional</div>
                  <div className="text-xs text-muted-foreground mt-1">Edite valores para validar o prompt final antes de publicar.</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {detectedVariables.length > 0 ? detectedVariables.map((variable) => (
                  <span key={variable} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-foreground/80">
                    {variable}
                  </span>
                )) : <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-muted-foreground">Nenhuma variável detectada</span>}
              </div>

              {detectedVariables.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {detectedVariables.map((variable) => (
                    <div key={variable} className="space-y-2">
                      <Label className="text-[10px] uppercase">{variable}</Label>
                      <Input className="h-8 text-sm" value={previewValues[variable] ?? ""} onChange={(e) => setPreviewValues((current) => ({ ...current, [variable]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="rounded-md border border-border bg-background p-3 text-sm text-muted-foreground break-words whitespace-pre-wrap">
                {renderedPreview || "O preview aparecerá aqui..."}
              </div>
            </div>

            {error ? <p className="text-sm text-rose-600 rounded-md bg-rose-500/10 p-2">{error}</p> : null}
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={() => setIsCreating(false)}>Cancelar</Button>
              <Button type="submit" className="w-full" disabled={saving || !form.name.trim() || !form.slug.trim()}>{saving ? "Criando..." : "Criar skill"}</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Sheet: Inspeção de Skill Existente */}
      <Sheet open={!!selectedSkill} onOpenChange={(open) => !open && setSelectedSkillId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Resumo da skill</SheetTitle>
            <SheetDescription>Inspeção rápida para revisar contexto, variáveis e prontidão operacional.</SheetDescription>
          </SheetHeader>
          
          {selectedSkill && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">{selectedSkill.name}</div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{selectedSkill.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground font-mono">{selectedSkill.slug} · {selectedSkill.category} · v{selectedSkill.currentVersion.version}</div>
              </div>

              <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground leading-relaxed">
                {selectedSkill.description || "Sem descrição operacional informada para esta skill."}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SkillMetric label="Modo de saída" value={selectedSkill.outputMode} />
                <SkillMetric label="Variáveis" value={String(selectedSkill.currentVersion.detectedVariables.length)} />
                <SkillMetric label="Status" value={selectedSkill.status} />
                <SkillMetric label="Prontidão" value={selectedSkill.status === "draft" ? "Revisar" : "Produção"} />
              </div>

              <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Checklist rápido
                </div>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div>• O nome comunica claramente o caso de uso.</div>
                  <div>• As variáveis detectadas cobrem o input real.</div>
                  <div>• O prompt final está compreensível e seguro.</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">Template atual</div>
                <div className="rounded-lg border border-border bg-background p-4 font-mono text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {selectedSkill.currentVersion.promptTemplate}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">Variáveis Detectadas</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.currentVersion.detectedVariables.length > 0 ? selectedSkill.currentVersion.detectedVariables.map((variable) => <Badge key={variable} variant="outline" className="px-2 font-mono text-[10px]">{variable}</Badge>) : <Badge variant="outline" className="text-[10px]">Sem variáveis</Badge>}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 pt-4 border-t border-border mt-4">
                <Button className="w-full gap-2"><Wand2 className="h-4 w-4"/>Editar skill</Button>
                <Button variant="outline" className="w-full">Nova versão</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label className="text-sm font-medium">{label}</Label><Input className="h-9" value={value} onChange={(e) => onChange(e.target.value)} /></div>
}

function SkillMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
