"use client"

import * as React from "react"
import { BarChart3, Clock, Copy, Megaphone, Play, Plus, RefreshCw, Users, Mail, MessageCircle, Send } from "lucide-react"

import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCampaign, listCampaigns } from "@/lib/campaigns/api"
import { cn } from "@/lib/utils"

type CampaignItem = {
  id: string
  name: string
  objective: string
  status: string
  channel: string
  senderId: string
  templateId: string
  audienceId: string
  createdBy: string
  createdAt?: string
  metrics?: { sent: number; delivered: number; read: number; replied: number; conversion: number }
}

const mockMetrics = { sent: 1250, delivered: 1240, read: 890, replied: 120, conversion: 4.5 }

export function CampaignsView() {
  const [items, setItems] = React.useState<CampaignItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState("history")
  
  const [form, setForm] = React.useState({
    name: "",
    objective: "recover_cart",
    channel: "whatsapp",
    senderId: "sender_main",
    templateId: "tmpl_default",
    templateVersion: "v1",
    audienceId: "aud_saved_01",
    createdBy: "samuel",
  })

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetched = await listCampaigns<CampaignItem[]>()
      // Inject mock metrics for visual completeness
      const withMetrics = fetched.map(c => ({
        ...c, 
        metrics: c.status === "completed" || c.status === "running" ? mockMetrics : undefined 
      }))
      setItems(withMetrics)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar campaigns")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const created = await createCampaign<CampaignItem>(form)
      setItems((current) => [created, ...current])
      setForm((current) => ({ ...current, name: "" }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar campaign")
    } finally {
      setSaving(false)
    }
  }

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    draft: { label: "Rascunho", color: "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400", icon: Clock },
    running: { label: "Em disparo", color: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400", icon: Play },
    completed: { label: "Concluída", color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", icon: BarChart3 },
  }

  return (
    <PageContainer>
      <PageHeader
        title="Campanhas"
        description="Crie disparos em massa, gerencie réguas de relacionamento e acompanhe métricas de conversão."
        actions={
          <Button variant="outline" size="sm" className="gap-2" onClick={() => void load()}>
            <RefreshCw className="h-3.5 w-3.5" />
            Atualizar
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Campanhas" value={String(items.length)} hint="histórico total" icon={Megaphone} />
        <StatCard label="Em disparo" value={String(items.filter((i) => i.status === "running").length)} hint="ativas agora" icon={Send} />
        <StatCard label="Audiência" value="12.5k" hint="alcance potencial" icon={Users} />
        <StatCard label="Conversão Média" value="4.2%" hint="últimos 30 dias" icon={BarChart3} />
      </div>

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="history">Histórico e Métricas</NavTabsTrigger>
              <NavTabsTrigger value="new">Nova Campanha</NavTabsTrigger>
            </NavTabsList>
          </div>

          <TabsContent value="new" className="m-0 border-0 p-0 outline-none">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Nova Campanha</CardTitle>
                <CardDescription>Configure um novo disparo escolhendo audiência e template.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Nome da campanha</Label>
                    <Input id="campaign-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Black Friday VIP" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Canal de disparo</Label>
                    <Select value={form.channel} onValueChange={(v) => setForm({ ...form, channel: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp"><div className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</div></SelectItem>
                        <SelectItem value="email"><div className="flex items-center gap-2"><Mail className="h-4 w-4" /> E-mail</div></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Audiência (Segmento)</Label>
                    <Select value={form.audienceId} onValueChange={(v) => setForm({ ...form, audienceId: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aud_saved_01">VIPs (+R$ 10k LTV) - 342 contatos</SelectItem>
                        <SelectItem value="aud_saved_02">Carrinhos Abandonados 24h - 128 contatos</SelectItem>
                        <SelectItem value="aud_saved_03">Todos os Clientes - 12.5k contatos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Template de Mensagem</Label>
                    <Select value={form.templateId} onValueChange={(v) => setForm({ ...form, templateId: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tmpl_default">Oferta Relâmpago (Aprovado)</SelectItem>
                        <SelectItem value="tmpl_recovery">Recuperação de Carrinho (Aprovado)</SelectItem>
                        <SelectItem value="tmpl_welcome">Boas-vindas (Aprovado)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                  <Button type="submit" className="w-full gap-2 mt-2" disabled={saving || !form.name.trim()}>
                    {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    {saving ? "Criando..." : "Criar Rascunho"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="m-0 border-0 p-0 outline-none">
            <div className="space-y-3">
              {loading ? <p className="text-sm text-muted-foreground p-4">Carregando campaigns...</p> : null}
              {!loading && items.length === 0 ? <p className="text-sm text-muted-foreground p-4">Nenhuma campaign criada ainda.</p> : null}
              
              {items.map((item) => {
                const cfg = statusConfig[item.status] || statusConfig.draft
                const StatusIcon = cfg.icon

                return (
                  <div key={item.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/20">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{item.name}</span>
                          <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", cfg.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          {item.channel === "whatsapp" ? <MessageCircle className="h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
                          <span className="capitalize">{item.channel}</span>
                          <span>·</span>
                          <span>Audiência: {item.audienceId}</span>
                          <span>·</span>
                          <span>{new Date(item.createdAt || Date.now()).toLocaleDateString("pt-BR")}</span>
                        </div>
                        
                        {item.metrics && (
                          <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border/50 pt-4">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Enviados</div>
                              <div className="font-medium">{item.metrics.sent.toLocaleString("pt-BR")}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Entregues</div>
                              <div className="font-medium">{item.metrics.delivered.toLocaleString("pt-BR")} <span className="text-xs text-muted-foreground font-normal">({Math.round(item.metrics.delivered/item.metrics.sent*100)}%)</span></div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Lidos</div>
                              <div className="font-medium">{item.metrics.read.toLocaleString("pt-BR")} <span className="text-xs text-muted-foreground font-normal">({Math.round(item.metrics.read/item.metrics.delivered*100)}%)</span></div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Conversão</div>
                              <div className="font-medium text-emerald-600 dark:text-emerald-400">{item.metrics.conversion}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.status === "draft" && (
                          <Button size="sm" className="gap-2">
                            <Send className="h-3.5 w-3.5" />
                            Agendar Disparo
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
