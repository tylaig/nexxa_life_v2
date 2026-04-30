"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity,
  Bot,
  Building2,
  Clock3,
  CreditCard,
  Database,
  Eye,
  Hash,
  KeyRound,
  LockKeyhole,
  Plus,
  RadioTower,
  Receipt,
  RotateCcw,
  Search,
  ShieldCheck,
  Tag,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  Rows3,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { tenants } from "@/lib/mock/tenants"

// ── Mock data ────────────────────────────────────────────────────────────────

const users = [
  { id: "u1", name: "Samuel Costa", role: "Admin", team: "Operações", status: "active" },
  { id: "u2", name: "Bianca Reis", role: "Manager", team: "CRM", status: "active" },
  { id: "u3", name: "Lucas Prado", role: "Analyst", team: "Suporte", status: "invite_pending" },
]

const fields = [
  { key: "first_name", label: "Primeiro nome", type: "string", source: "core", flags: ["perfil", "integrações"] },
  { key: "email", label: "E-mail", type: "string", source: "core", flags: ["perfil", "campanhas"] },
  { key: "phone", label: "Telefone", type: "string", source: "core", flags: ["perfil", "inbox"] },
  { key: "lifetime_value", label: "LTV", type: "number", source: "custom", flags: ["analytics", "agentes"] },
  { key: "vip_tier", label: "Nível VIP", type: "select", source: "custom", flags: ["automações", "perfil"] },
  { key: "last_order_payload", label: "Último payload pedido", type: "json", source: "integration", flags: ["integrações", "debug"] },
  { key: "nps_score", label: "Score NPS", type: "number", source: "custom", flags: ["analytics", "segmentação"] },
]

const tags = [
  { name: "VIP", color: "#f59e0b", category: "lifecycle", usedIn: ["contatos", "automações", "campanhas"], count: 342 },
  { name: "Promotor", color: "#10b981", category: "nps", usedIn: ["segmentação", "campanhas"], count: 891 },
  { name: "Churn Risk", color: "#ef4444", category: "lifecycle", usedIn: ["agentes", "automações"], count: 64 },
  { name: "Recompra", color: "#6366f1", category: "comportamento", usedIn: ["campanhas", "automações"], count: 512 },
  { name: "Primeira compra", color: "#06b6d4", category: "comportamento", usedIn: ["automações", "inbox"], count: 1203 },
  { name: "B2B", color: "#8b5cf6", category: "segmento", usedIn: ["contatos", "segmentação"], count: 78 },
]

const sourceConfig: Record<string, { label: string; color: string }> = {
  core: { label: "Nativo", color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  custom: { label: "Custom", color: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  integration: { label: "Integração", color: "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400" },
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsWorkspacePage() {
  const workspace = tenants[0]

  function notifyPlanned(scope: string) {
    toast.success(`${scope} registrado no frontend-first. Persistência administrativa entra na próxima rodada.`)
  }

  return (
    <>
      <AppTopbar title="Configurações" subtitle="Centro administrativo complementar do workspace NexxaLife" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Configurações" }]} />
        <PageHeader
          title="Configurações"
          description="Administração complementar do workspace NexxaLife com identidade, equipe, dados, segurança e billing em uma superfície unificada."
          actions={
            <div className="flex gap-2">
              <Button size="sm" className="gap-2" onClick={() => notifyPlanned("Alterações gerais de configurações")}>Salvar alterações</Button>
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Workspace" value={workspace.name} icon={Building2} hint={workspace.domain} />
          <StatCard label="Usuários" value={String(users.length)} icon={UsersRound} hint={`${users.filter(u => u.status === "active").length} ativos`} />
          <StatCard label="Campos" value={String(fields.length)} icon={Rows3} hint={`${fields.filter(f => f.source !== "core").length} custom`} />
          <StatCard label="Plano" value={workspace.plan} icon={Wallet} hint="capacidade atual" />
        </div>

        <Tabs defaultValue="workspace" className="mt-6">
          <NavTabsList className="mb-6">
            <NavTabsTrigger value="workspace">Workspace</NavTabsTrigger>
            <NavTabsTrigger value="usuarios">Usuários &amp; Papéis</NavTabsTrigger>
            <NavTabsTrigger value="campos">Campos de Contato</NavTabsTrigger>
            <NavTabsTrigger value="tags">Tags</NavTabsTrigger>
            <NavTabsTrigger value="seguranca">Segurança &amp; Logs</NavTabsTrigger>
            <NavTabsTrigger value="billing">Billing</NavTabsTrigger>
          </NavTabsList>

          {/* ── Workspace ── */}
          <TabsContent value="workspace" className="m-0 border-0 p-0 outline-none">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Identidade</CardTitle>
                    <CardDescription>Dados-base do workspace atual.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <Field label="Nome do workspace"><Input defaultValue={workspace.name} /></Field>
                    <Field label="Domínio"><Input defaultValue={workspace.domain} /></Field>
                    <Field label="Plano"><Input defaultValue={workspace.plan} /></Field>
                    <Field label="Fuso horário"><Input defaultValue="America/Sao_Paulo (BRT)" /></Field>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Operação</CardTitle>
                    <CardDescription>Parâmetros de operação compartilhados pela equipe.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <Field label="Canal principal"><Input defaultValue="WhatsApp" /></Field>
                    <Field label="Janela comercial"><Input defaultValue="08:00 — 20:00" /></Field>
                    <Field label="Equipe padrão"><Input defaultValue="Suporte + CRM" /></Field>
                    <Field label="Escalonamento"><Input defaultValue="Humano em tickets críticos" /></Field>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Políticas do workspace</CardTitle>
                    <CardDescription>Regras contextuais usadas pela operação, agentes e automações.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="secondary">MFA para admins</Badge>
                    <Badge variant="secondary">Knowledge compartilhado</Badge>
                    <Badge variant="secondary">Providers server-only</Badge>
                    <Badge variant="outline">Webhook inbound planejado</Badge>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Governança do ambiente</CardTitle>
                  <CardDescription>Resumo do contexto usado por agentes, automações e operação humana.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <Info label="Workspace ativo">{workspace.name}</Info>
                  <Info label="Uso esperado">Operação omnichannel com IA, integrações e knowledge compartilhados.</Info>
                  <Info label="Próximo passo">Evoluir canais, papéis, providers e permissões por time.</Info>
                  <div className="space-y-2 pt-2">
                    <Button className="w-full" onClick={() => notifyPlanned("Configurações do workspace")}>Salvar configurações do workspace</Button>
                    <Button asChild variant="outline" className="w-full"><Link href="/settings/providers">Abrir providers</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Usuários ── */}
          <TabsContent value="usuarios" className="m-0 border-0 p-0 outline-none">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Membros</CardTitle>
                      <CardDescription>Base inicial para RBAC, convites e auditoria por usuário.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-2" onClick={() => notifyPlanned("Convite de usuário")}>
                      <UserPlus className="h-3.5 w-3.5" />
                      Convidar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative max-w-sm">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar usuário, cargo ou time..." className="pl-8" />
                  </div>
                  <div className="divide-y divide-border rounded-xl border border-border">
                    {users.map((user) => (
                      <div key={user.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.role} · {user.team}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.status === "active" ? "secondary" : "outline"}>
                            {user.status === "active" ? "Ativo" : "Convite pendente"}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => notifyPlanned(`Acesso de ${user.name}`)}>Editar acesso</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leitura rápida</CardTitle>
                  <CardDescription>Base inicial para RBAC e superfícies críticas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <Info label="Papéis atuais">Admin, Manager e Analyst</Info>
                  <Info label="Próximo passo">Permissões granulares por módulo, provider e action runtime.</Info>
                  <Info label="Conexão futura">Trilha de auditoria compartilhada com governança e logs.</Info>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Campos ── */}
          <TabsContent value="campos" className="m-0 border-0 p-0 outline-none">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catálogo de Campos</CardTitle>
                    <CardDescription>Campos nativos e customizados que alimentam perfil 360, integrações, automações e agentes.</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2" onClick={() => notifyPlanned("Novo campo de contato")}>
                    <Plus className="h-3.5 w-3.5" />
                    Novo campo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-xl border border-border">
                  <div className="divide-y divide-border">
                    {fields.map((field) => {
                      const src = sourceConfig[field.source] ?? sourceConfig.core
                      return (
                        <div key={field.key} className="flex flex-col gap-2 p-4 transition-colors hover:bg-accent/40 md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{field.label}</span>
                              <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${src.color}`}>{src.label}</span>
                            </div>
                            <div className="font-mono text-xs text-muted-foreground mt-1">{field.key} · {field.type}</div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {field.flags.map((flag) => <Badge key={flag} variant="secondary" className="text-[10px]">{flag}</Badge>)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Tags ── */}
          <TabsContent value="tags" className="m-0 border-0 p-0 outline-none">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Taxonomia de Tags</CardTitle>
                    <CardDescription>Tags reutilizáveis com governança. Usadas em segmentação, contatos, campanhas, automações e agentes.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => notifyPlanned("Nova tag")}>
                    <Hash className="h-3.5 w-3.5" />
                    Nova tag
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-xl border border-border">
                  <div className="divide-y divide-border">
                    {tags.map((tag) => (
                      <div key={tag.name} className="flex flex-col gap-2 p-4 transition-colors hover:bg-accent/40 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: tag.color }} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{tag.name}</span>
                              <Badge variant="outline" className="text-[10px]">{tag.category}</Badge>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{tag.count.toLocaleString("pt-BR")} contatos · Usado em: {tag.usedIn.join(", ")}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => notifyPlanned(`Tag ${tag.name}`)}>Editar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Segurança ── */}
          <TabsContent value="seguranca" className="m-0 border-0 p-0 outline-none">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Controles principais</CardTitle>
                    <CardDescription>Regras mínimas para contas administrativas e operações sensíveis.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Toggle label="Exigir MFA para administradores" defaultChecked />
                    <Toggle label="Reconfirmar ações críticas" defaultChecked />
                    <Toggle label="Bloquear exportações sem permissão" defaultChecked />
                    <Toggle label="Permitir links públicos de debug" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Políticas operacionais</CardTitle>
                    <CardDescription>Diretrizes refletidas em agentes, automações e compliance.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <PolicyItem>Logs de alterações de configuração devem permanecer acessíveis ao time admin.</PolicyItem>
                    <PolicyItem>Fluxos financeiros e reembolsos exigem confirmação humana.</PolicyItem>
                    <PolicyItem>Ações críticas em canais e integrações devem registrar ator e horário.</PolicyItem>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Postura atual</CardTitle>
                    <CardDescription>Leitura executiva das regras mais sensíveis em vigor.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Auditoria ativa</Badge>
                    <Badge variant="secondary">Segredos server-only</Badge>
                    <Badge variant="secondary">Ações críticas confirmadas</Badge>
                    <Badge variant="outline">Webhook governance planejado</Badge>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Próximos passos</CardTitle>
                  <CardDescription>Superfície pronta para evoluir para permissões, auditoria e papéis detalhados.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <Info label="Em seguida">Usuários, papéis, auditoria detalhada e governança de webhook/provider.</Info>
                  <Info label="Conexão futura">Regras de governança compartilhadas com agentes, automações e integrações.</Info>
                  <div className="grid gap-2 pt-2">
                    <Button className="w-full" onClick={() => notifyPlanned("Política de segurança")}>Salvar política atual</Button>
                    <Button asChild variant="outline" className="w-full"><Link href="/logs">Ver system logs</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Billing ── */}
          <TabsContent value="billing" className="m-0 border-0 p-0 outline-none">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo contratual</CardTitle>
                  <CardDescription>Superfície inicial para visibilidade de plano, limites e faturamento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <Info label="Plano">{workspace.plan}</Info>
                    <Info label="Cobrança">Mensal</Info>
                    <Info label="Pagamento">Cartão</Info>
                    <Info label="Uso IA">Saudável</Info>
                  </div>
                  <div className="rounded-lg border border-border bg-background/50 p-3">Plano atual com capacidade para expansão de agentes, integrações, providers e volume operacional.</div>
                  <div className="rounded-lg border border-border bg-background/50 p-3">Próxima evolução: consumo por módulo, limites, counters por integration e histórico de faturas.</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ações de billing</CardTitle>
                  <CardDescription>Atalhos administrativos relacionados ao plano.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" onClick={() => notifyPlanned("Gestão de assinatura")}>Gerenciar assinatura</Button>
                  <Button variant="outline" className="w-full" onClick={() => notifyPlanned("Atualização de método de pagamento")}>Atualizar método de pagamento</Button>
                  <Button variant="outline" className="w-full" onClick={() => notifyPlanned("Histórico de faturas")}>Ver histórico de faturas</Button>
                  <Button asChild variant="outline" className="w-full"><Link href="/settings/providers">Ver consumo de agentes</Link></Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </PageContainer>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{children}</div>
    </div>
  )
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-3 text-sm">
      <span>{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function PolicyItem({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3">{children}</div>
}
