"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Eye,
  Pencil,
  ShieldCheck,
  BrainCircuit,
  Activity,
  MessageSquare,
  Clock,
  PlayCircle,
  Settings2,
  Blocks,
  Mic,
  DatabaseZap,
  Volume2,
  ListTree,
} from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { agents } from "@/lib/mock/ai-agents"
import { cn } from "@/lib/utils"

const statusConfig = {
  live: { label: "Em produção", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  shadow: { label: "Sombra (A/B)", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
} as const

const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "settings", label: "Prompt & Behavior", icon: Settings2 },
  { id: "tools", label: "Tools & Bindings", icon: Blocks },
  { id: "voice", label: "Voice & Timing", icon: Mic },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
] as const

type TabId = typeof TABS[number]["id"]

export function AiAgentDetailView({ agentId }: { agentId: string }) {
  const agent = agents.find((item) => item.id === agentId)
  const [activeTab, setActiveTab] = React.useState<TabId>("overview")

  if (!agent) {
    return (
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "AI Studio", href: "/ai-studio" }, { label: "Agentes", href: "/ai-studio/agents" }, { label: "Não encontrado" }]} />
        <PageHeader title="Agente não encontrado" description="Não foi possível localizar o agente solicitado." actions={<Button asChild variant="outline" size="sm"><Link href="/ai-studio/agents">Voltar</Link></Button>} />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "AI Studio", href: "/ai-studio" }, { label: "Agentes", href: "/ai-studio/agents" }, { label: agent.name }]} />
      <PageHeader
        title={agent.name}
        description="Painel de comando do agente. Configure prompt, integrações, ferramentas e bases de conhecimento ativas."
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link href="/ai-studio/agents"><ArrowLeft className="h-3.5 w-3.5" />Agentes</Link></Button>
            <Button variant="outline" size="sm" className="gap-2"><Eye className="h-3.5 w-3.5" />Logs</Button>
            <Button size="sm" className="gap-2"><Pencil className="h-3.5 w-3.5" />Salvar alterações</Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className={cn("border-0 font-medium", statusConfig[agent.status].className)}>{statusConfig[agent.status].label}</Badge>
        <Badge variant="outline">{agent.model}</Badge>
        <span className="text-sm text-muted-foreground">{agent.role}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-8">
        <StatCard label="Conversas 30d" value={agent.conversations30d.toLocaleString("pt-BR")} icon={Bot} />
        <StatCard label="Deflection" value={`${(agent.deflectionRate * 100).toFixed(0)}%`} icon={CheckCircle2} />
        <StatCard label="CSAT" value={agent.csat.toFixed(1).replace(".", ",")} icon={ShieldCheck} />
        <StatCard label="Latência" value={`${agent.avgLatencyMs}ms`} icon={Clock} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="flex flex-row gap-1 overflow-x-auto pb-2 xl:flex-col xl:overflow-x-visible xl:pb-0">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                {tab.label}
              </button>
            )
          })}
        </aside>

        <main className="min-w-0 space-y-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="space-y-4"><div><h3 className="text-lg font-medium">Performance & Saúde</h3><p className="text-sm text-muted-foreground">Indicadores operacionais recentes.</p></div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuração Operacional</CardTitle>
                      <CardDescription>Parâmetros fundamentais instanciados.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 grid-cols-2">
                      <Detail label="Função">{agent.role}</Detail>
                      <Detail label="Modelo">{agent.model}</Detail>
                      <Detail label="Temperatura">{agent.temperature.toFixed(1)}</Detail>
                      <Detail label="Escalation">{`${(agent.escalationRate * 100).toFixed(0)}%`}</Detail>
                      <Detail label="Status">{statusConfig[agent.status].label}</Detail>
                      <Detail label="Tools">{agent.tools.length}</Detail>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Limites de Ativação</CardTitle>
                      <CardDescription>Triggers macro e fallback loop.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex gap-2 items-start"><PlayCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />Ativação no primeiro turn de entrada se canal for compatível.</div>
                      <div className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />Handoff após 3 tentativas falhas de tool.</div>
                      <div className="flex gap-2 items-start"><MessageSquare className="h-4 w-4 shrink-0 text-primary mt-0.5" />Respostas priorizam Markdown.</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="space-y-4"><div><h3 className="text-lg font-medium">System Prompt</h3><p className="text-sm text-muted-foreground">Instruções fundamentais que ditam a personalidade e as restrições críticas deste agente.</p></div>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Descrição do Papel (Role)</Label>
                      <Input defaultValue={agent.description} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Instruções Principais (System Prompt)</Label>
                        <Button variant="link" size="sm" className="h-auto p-0">Gerar com IA</Button>
                      </div>
                      <Textarea rows={8} defaultValue={`Você é o ${agent.name}, responsável por ${agent.role}.\n\nSeja prestativo, objetivo e direto ao ponto.\nNão prometa o que não pode cumprir.`} className="font-mono text-sm" />
                      <p className="text-xs text-muted-foreground">O prompt é combinado com as descrições das ferramentas conectadas em tempo de execução.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4"><div><h3 className="text-lg font-medium">Guardrails Ativos</h3><p className="text-sm text-muted-foreground">Regras imutáveis de segurança.</p></div>
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    {agent.guardrails.map((rule, index) => (
                      <div key={index} className="flex gap-2 rounded-lg border border-border bg-background/50 p-3 text-sm text-muted-foreground">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{rule}</span>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2 border-dashed">Adicionar Guardrail</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "tools" && (
            <div className="space-y-6">
              <div className="space-y-4"><div><h3 className="text-lg font-medium">Bindings e Integrações</h3><p className="text-sm text-muted-foreground">Sistemas externos a que este agente tem acesso.</p></div>
                <div className="grid gap-4 xl:grid-cols-2">
                  <Card className="xl:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Plataformas Conectadas</CardTitle>
                        <CardDescription>Bridges autorizados para este agente.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">Gerenciar</Button>
                    </CardHeader>
                    <CardContent className="space-y-3 mt-4">
                      {agent.platformBindings.map((binding) => (
                        <div key={binding.provider} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-3">
                          <div>
                            <div className="font-medium">{binding.displayName}</div>
                            <div className="text-xs text-muted-foreground">{binding.configSummary}</div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {binding.capabilities.map((capability) => <Badge key={capability} variant="outline" className="text-[10px]">{capability}</Badge>)}
                            </div>
                          </div>
                          <Badge variant={binding.status === "connected" ? "default" : "secondary"}>{binding.status}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="xl:col-span-2">
                    <CardHeader>
                      <CardTitle>Tools Ativas</CardTitle>
                      <CardDescription>Funções específicas que o agente pode chamar.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {agent.tools.map((tool) => <Badge key={tool} variant="outline" className="font-mono text-[11px] py-1 px-2">{tool}</Badge>)}
                      <Badge variant="outline" className="font-mono text-[11px] border-dashed text-muted-foreground py-1 px-2">+ Adicionar tool</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-6">
              <div className="space-y-4"><div><h3 className="text-lg font-medium">Voice Provider</h3><p className="text-sm text-muted-foreground">Habilitar interação vocal.</p></div>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md"><Volume2 className="h-5 w-5 text-primary" /></div>
                        <div>
                          <div className="font-medium">Síntese de Voz Ativada</div>
                          <div className="text-sm text-muted-foreground">O agente poderá enviar respostas em áudio.</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={agent.voiceSettings?.enabled ? "default" : "secondary"}>
                          {agent.voiceSettings?.enabled ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                    {agent.voiceSettings?.enabled && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Provider</Label>
                          <Input value={agent.voiceSettings.provider} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Voz Clone (Voice ID)</Label>
                          <Input value={agent.voiceSettings.voiceId} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Velocidade (Speed)</Label>
                          <Input value={agent.voiceSettings.speed} readOnly />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4"><div><h3 className="text-lg font-medium">Message Timing</h3><p className="text-sm text-muted-foreground">Comportamento humanoide de digitação.</p></div>
                <Card>
                  <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Debounce Time (ms)</Label>
                      <Input type="number" defaultValue={agent.operationalSettings?.debounceTimeMs} />
                      <p className="text-xs text-muted-foreground">Tempo de espera antes de processar mensagens sequenciais do cliente.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Typing Speed (chars/sec)</Label>
                      <Input type="number" defaultValue={agent.operationalSettings?.typingSpeedCharsPerSec} />
                      <p className="text-xs text-muted-foreground">Simulação de atraso de digitação na resposta.</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2 flex items-center justify-between rounded-lg border border-border p-3 mt-2">
                      <div>
                        <div className="text-sm font-medium">Split Messages</div>
                        <div className="text-xs text-muted-foreground">Quebrar respostas longas em múltiplos balões.</div>
                      </div>
                      <Badge variant={agent.operationalSettings?.splitMessages ? "default" : "secondary"}>
                        {agent.operationalSettings?.splitMessages ? "Sim" : "Não"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="space-y-4"><div><h3 className="text-lg font-medium">Knowledge Base (RAG)</h3><p className="text-sm text-muted-foreground">Fontes de verdade que o agente consulta antes de responder.</p></div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Bases Vinculadas</CardTitle>
                      <CardDescription>Escopo de busca liberado para o agente.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild><Link href="/knowledge">Knowledge Hub</Link></Button>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {agent.linkedKnowledgeIds && agent.linkedKnowledgeIds.length > 0 ? (
                      agent.linkedKnowledgeIds.map((kid) => (
                        <div key={kid} className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-3">
                          <div className="flex items-center gap-3">
                            <DatabaseZap className="h-4 w-4 text-emerald-500" />
                            <div>
                              <div className="text-sm font-medium">{kid}</div>
                              <div className="text-xs text-muted-foreground">Fonte indexada</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Remover</Button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <ListTree className="mx-auto h-6 w-6 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-medium">Nenhuma base vinculada</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Este agente responderá apenas com seu próprio conhecimento base e tools.</p>
                        <Button variant="outline" size="sm" className="mt-4">Vincular Base</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

        </main>
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{children}</div>
    </div>
  )
}
