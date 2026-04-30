import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer } from "@/components/layout/page-container"
import { PageSection } from "@/components/layout/page-section"
import { PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Mail, Smartphone, Plus, Workflow, RadioTower, Globe, Instagram, CheckCircle2 } from "lucide-react"
import { PlannedActionButton } from "@/components/settings/planned-action-button"

const channels = [
  { id: "c1", name: "WhatsApp Cloud", type: "WhatsApp", status: "connected", owner: "CRM", emoji: "💬", number: "+55 11 99421-3344", lastSync: "Agora" },
  { id: "c2", name: "Email transacional", type: "Email", status: "connected", owner: "Lifecycle", emoji: "📧", number: "noreply@meusuper.app", lastSync: "2min atrás" },
  { id: "c3", name: "SMS fallback", type: "SMS", status: "paused", owner: "Operações", emoji: "📱", number: "+55 11 3000-0001", lastSync: "Pausado" },
  { id: "c4", name: "Instagram DM", type: "Instagram", status: "draft", owner: "Marketing", emoji: "📸", number: "@meusuper.app", lastSync: "Não conectado" },
  { id: "c5", name: "Web Chat", type: "Webchat", status: "connected", owner: "Suporte", emoji: "🌐", number: "chat.meusuper.app", lastSync: "Online" },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  connected: { label: "Conectado", color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  draft: { label: "Rascunho", color: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  paused: { label: "Pausado", color: "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400" },
  error: { label: "Erro", color: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400" },
}

export default function SettingsChannelsPage() {
  return (
    <>
      <AppTopbar title="Canais" subtitle="Configuração de canais de comunicação: WhatsApp, Email, SMS, Instagram, Webchat" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Canais" }]} />
        <PageHeader title="Canais" description="Gerencie os canais ativos do workspace, configure conexões, roteamento e fallback operacional." actions={<PlannedActionButton size="sm" className="gap-2" message="Conexão de canal"><Plus className="h-3.5 w-3.5" />Conectar canal</PlannedActionButton>} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Conectados" value={String(channels.filter((c) => c.status === "connected").length)} icon={CheckCircle2} />
          <StatCard label="WhatsApp" value="1" icon={MessageCircle} hint="Cloud API" />
          <StatCard label="Canais" value={String(channels.length)} icon={RadioTower} hint="total configurados" />
          <StatCard label="Fallbacks" value="2" icon={Workflow} hint="SMS + Email" />
        </div>

        <Tabs defaultValue="configurados" className="mt-6">
          <NavTabsList className="mb-6">
            <NavTabsTrigger value="configurados">Canais Configurados</NavTabsTrigger>
            <NavTabsTrigger value="roteamento">Roteamento e Fallback</NavTabsTrigger>
            <NavTabsTrigger value="conectar">Conectar Novo</NavTabsTrigger>
          </NavTabsList>

          <TabsContent value="configurados" className="m-0 border-0 p-0 outline-none">
            <PageSection title="Canais Configurados" description="Todos os canais ativos, em rascunho ou pausados no workspace.">
              <div className="space-y-3">
                {channels.map((ch) => {
                  const cfg = statusConfig[ch.status]
                  return (
                    <div key={ch.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/20">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">{ch.emoji}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{ch.name}</span>
                              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <span className="font-mono">{ch.number}</span> · owner {ch.owner} · {ch.lastSync}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {ch.status === "draft" ? (
                            <PlannedActionButton size="sm" className="gap-1.5 text-xs" message={`Conexão do canal ${ch.name}`}>Conectar</PlannedActionButton>
                          ) : (
                            <PlannedActionButton variant="outline" size="sm" className="text-xs" message={`Configuração do canal ${ch.name}`}>Configurar</PlannedActionButton>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </PageSection>
          </TabsContent>

          <TabsContent value="roteamento" className="m-0 border-0 p-0 outline-none">
            <PageSection title="Roteamento e Fallback" description="Políticas de canal principal, escalonamento e fallback automático.">
              <div className="grid gap-3 md:grid-cols-3">
                <Info label="Canal prioritário" emoji="💬">WhatsApp Cloud</Info>
                <Info label="Fallback 1" emoji="📧">Email após 15 min sem resposta</Info>
                <Info label="Fallback 2" emoji="📱">SMS para mensagens críticas de transação</Info>
              </div>
            </PageSection>
          </TabsContent>

          <TabsContent value="conectar" className="m-0 border-0 p-0 outline-none">
            <PageSection title="Conectar Novo Canal" description="Adicione novos canais nativos ao workspace.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "WhatsApp Business", emoji: "💬", desc: "Cloud API oficial do Meta" },
                  { name: "Instagram DM", emoji: "📸", desc: "Mensagens diretas via Graph API" },
                  { name: "Facebook Messenger", emoji: "📘", desc: "Integração com páginas do FB" },
                  { name: "Telegram", emoji: "✈️", desc: "Bot API para atendimento" },
                ].map((ch) => (
                  <div key={ch.name} className="rounded-xl border border-dashed border-border bg-card/50 p-5">
                    <div className="text-2xl">{ch.emoji}</div>
                    <h3 className="mt-3 font-semibold text-foreground">{ch.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{ch.desc}</p>
                    <PlannedActionButton variant="outline" size="sm" className="mt-4 w-full text-xs" message={`Configuração do canal ${ch.name}`}>Configurar</PlannedActionButton>
                  </div>
                ))}
              </div>
            </PageSection>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </>
  )
}

function Info({ label, children, emoji }: { label: string; children: React.ReactNode; emoji: string }) {
  return <div className="rounded-lg border border-border bg-background/50 p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><span>{emoji}</span>{label}</div><div className="mt-2 text-sm font-medium">{children}</div></div>
}
