import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Database,
  FileText,
  Flag,
  Globe2,
  KeyRound,
  LockKeyhole,
  Palette,
  PlugZap,
  ShieldCheck,
  Sparkles,
  ToggleRight,
  Users,
  Workflow,
} from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { frameworkAdminHero } from "@/components/nexxa-life/framework-admin-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs"
import type { FrameworkAdminModule, FrameworkAdminWorkspace } from "@/modules/framework-admin/workspace"

const adminTabs = [
  "Visão geral",
  "Usuários",
  "Diagnóstico",
  "Planos",
  "Flags",
  "IA",
  "Integrações",
  "Auditoria",
  "Segurança",
  "Conteúdo",
] as const

type NexxaLifeFrameworkAdminViewProps = {
  workspace: FrameworkAdminWorkspace
}

const moduleIcons: Record<FrameworkAdminModule["id"], React.ComponentType<{ className?: string }>> = {
  "users-access": Users,
  "diagnostic-framework": Sparkles,
  "plans-billing": CreditCard,
  "feature-flags": Flag,
  "ai-prompts": Bot,
  "integrations-webhooks": PlugZap,
  "analytics-logs": Activity,
  "security-compliance": LockKeyhole,
  "branding-content": Palette,
  "automations-lifecycle": Workflow,
}

const statusLabels: Record<FrameworkAdminModule["status"], string> = {
  live: "Operacional",
  planned: "Roadmap",
  "needs-data": "Precisa de dados",
}

function statusVariant(status: FrameworkAdminModule["status"]) {
  return status === "live" ? "default" : status === "needs-data" ? "destructive" : "secondary"
}

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(cents / 100)
}

function dateLabel(value?: string | null) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(value))
}

function EmptyPanel({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
      {label}
    </div>
  )
}

function DisabledAdminAction({ label = "Server action pendente" }: { label?: string }) {
  return (
    <Button size="sm" variant="outline" className="rounded-lg" disabled>
      {label}
    </Button>
  )
}

function OperationalCard({ module }: { module: FrameworkAdminModule }) {
  const Icon = moduleIcons[module.id] ?? ShieldCheck

  return (
    <Card id={module.id} className="border-border/80 bg-card/80">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={statusVariant(module.status)} className="rounded-full">
            {statusLabels[module.status]}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-base">{module.title}</CardTitle>
          <CardDescription className="mt-2 leading-6">{module.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Responsável</span>
          <span className="font-medium text-foreground">{module.owner}</span>
        </div>
        <div className="space-y-2">
          {module.capabilities.map((capability) => (
            <div key={capability} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {capability}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function NexxaLifeFrameworkAdminView({ workspace }: NexxaLifeFrameworkAdminViewProps) {
  const liveModules = workspace.adminModules.filter((module) => module.status === "live").length
  const settingsByCategory = workspace.settings.reduce<Record<string, number>>((acc, setting) => {
    acc[setting.category] = (acc[setting.category] ?? 0) + 1
    return acc
  }, {})

  const kpis = [
    {
      label: "Usuários",
      value: String(workspace.kpis.totalUsers),
      hint: `${workspace.kpis.adminUsers} admins · ${workspace.kpis.onboardedUsers} onboarded`,
      icon: Users,
    },
    {
      label: "Diagnóstico",
      value: `${workspace.kpis.activeQuestions}/${workspace.kpis.totalQuestions}`,
      hint: "Perguntas ativas em eixos persistidos.",
      icon: CheckCircle2,
    },
    {
      label: "Operação SaaS",
      value: `${liveModules}/${workspace.adminModules.length}`,
      hint: "Módulos admin com dados reais conectados.",
      icon: Globe2,
    },
    {
      label: "Alertas críticos",
      value: String(workspace.kpis.criticalAuditEvents),
      hint: "Eventos críticos recentes na auditoria.",
      icon: AlertTriangle,
    },
  ]

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Painel Admin" }]} />
      <PageHeader
        title="Painel Admin NexxaLife"
        description="Central operacional com abas reais para usuários, diagnóstico, planos, flags, IA, integrações, auditoria, segurança e conteúdo."
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              Acesso via ⌘K · admin-only
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/settings/security">Revisar segurança</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
        ))}
      </section>

      <Tabs defaultValue="Visão geral" className="mt-6 w-full gap-5">
        <div className="flex flex-col gap-3 border-b border-border/70 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="outline" className="rounded-full">{frameworkAdminHero.kicker}</Badge>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">Workspace administrativo completo</h2>
            <p className="text-sm text-muted-foreground">Cada aba usa dados persistidos ou fallback seguro para manter o produto operável.</p>
          </div>
          <NavTabsList className="lg:max-w-[760px]">
            {adminTabs.map((tab) => (
              <NavTabsTrigger key={tab} value={tab}>
                {tab}
              </NavTabsTrigger>
            ))}
          </NavTabsList>
        </div>

        <TabsContent value="Visão geral" className="mt-0 space-y-5">
          <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl space-y-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                      Operação consolidada
                    </Badge>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                        Admin operacional do SaaS em abas, com banco e governança real.
                      </h2>
                      <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                        A rota permanece protegida por role admin no servidor e concentra as decisões sensíveis do produto em um layout consistente com as demais páginas NexxaLife.
                      </p>
                    </div>
                  </div>

                  <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Entrada</div>
                      <div className="mt-2 text-sm font-semibold text-foreground">Menu flutuante ⌘K</div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">Admin aparece como comando sensível, não como item fixo da sidebar.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Persistência</div>
                      <div className="mt-2 text-sm font-semibold text-foreground">{workspace.billingPlans.length + workspace.featureFlags.length + workspace.aiPrompts.length} registros operacionais</div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">Planos, flags, prompts, integrações, políticas, conteúdo e settings.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader>
                <CardTitle>Configurações gerais</CardTitle>
                <CardDescription>Chaves em admin_settings agrupadas por categoria.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(settingsByCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between rounded-2xl border border-border bg-background/60 p-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{category}</p>
                      <p className="text-xs text-muted-foreground">{count} configuração(ões)</p>
                    </div>
                    <Database className="h-4 w-4 text-primary" />
                  </div>
                ))}
                {Object.keys(settingsByCategory).length === 0 ? <EmptyPanel label="Nenhuma configuração cadastrada." /> : null}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workspace.adminModules.map((module) => (
              <OperationalCard key={module.id} module={module} />
            ))}
          </section>
        </TabsContent>

        <TabsContent value="Usuários" className="mt-0">
          <Card className="border-border/80" id="users-access">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>Usuários e acesso</CardTitle>
                <CardDescription>Últimos perfis encontrados em app_user_profiles.</CardDescription>
              </div>
              <DisabledAdminAction label="Editar roles em breve" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Atualizado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workspace.recentUsers.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>
                        <div className="font-medium text-foreground">{user.fullName}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.onboarded ? "Onboarded" : "Pendente"}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{dateLabel(user.updatedAt)}</TableCell>
                    </TableRow>
                  ))}
                  {workspace.recentUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                        Nenhum perfil encontrado no banco configurado.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Diagnóstico" className="mt-0">
          <Card className="border-border/80" id="diagnostic-framework">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>Framework diagnóstico conectado</CardTitle>
                <CardDescription>{workspace.kpis.activeAxes} eixos com registros persistidos em diagnostic_questions.</CardDescription>
              </div>
              <DisabledAdminAction label="Editar perguntas em breve" />
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {workspace.axes.map((axis) => (
                <div key={axis.area} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{axis.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{axis.summary}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">{axis.activeQuestions}/{axis.totalQuestions} ativas</Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    {axis.questions.slice(0, 3).map((question) => (
                      <div key={question.id} className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">#{question.questionOrder}</span> {question.questionText}
                      </div>
                    ))}
                    {axis.questions.length === 0 ? <EmptyPanel label="Nenhuma pergunta cadastrada para este eixo." /> : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Planos" className="mt-0">
          <section className="grid gap-4 lg:grid-cols-3" id="plans-billing">
            {workspace.billingPlans.map((plan) => (
              <Card key={plan.id} className="border-border/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription className="mt-2 leading-6">{plan.description}</CardDescription>
                    </div>
                    <Badge variant={plan.active ? "default" : "secondary"}>{plan.active ? "Ativo" : "Pausado"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{money(plan.monthlyPriceCents, plan.currency)}<span className="text-xs font-normal text-muted-foreground">/mês</span></p>
                    <p className="text-xs text-muted-foreground">Anual: {money(plan.yearlyPriceCents, plan.currency)} · Trial {plan.trialDays} dias</p>
                  </div>
                  <div className="grid gap-2 text-xs text-muted-foreground">
                    <span>Assentos: {plan.seatLimit ?? "ilimitado"}</span>
                    <span>IA/mês: {plan.aiRequestsLimit ?? "ilimitado"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.features.map((feature) => <Badge key={feature} variant="outline">{feature}</Badge>)}
                  </div>
                  <DisabledAdminAction label="Editar plano" />
                </CardContent>
              </Card>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="Flags" className="mt-0">
          <Card className="border-border/80" id="feature-flags">
            <CardHeader>
              <CardTitle>Feature flags e releases</CardTitle>
              <CardDescription>Rollout controlado por chave, público e percentual.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.featureFlags.map((flag) => (
                <div key={flag.id} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <ToggleRight className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">{flag.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{flag.description}</p>
                    </div>
                    <Badge variant={flag.enabled ? "default" : "secondary"}>{flag.enabled ? "Ligada" : "Desligada"}</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                    <span>Key: {flag.flagKey}</span>
                    <span>Rollout: {flag.rolloutPercentage}%</span>
                    <span>Público: {flag.audience}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="IA" className="mt-0">
          <section className="grid gap-4 lg:grid-cols-2" id="ai-prompts">
            {workspace.aiPrompts.map((prompt) => (
              <Card key={prompt.id} className="border-border/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{prompt.name}</CardTitle>
                      <CardDescription className="mt-2 leading-6">{prompt.description}</CardDescription>
                    </div>
                    <Badge variant={prompt.active ? "default" : "secondary"}>v{prompt.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                    <span>Modelo: {prompt.model}</span>
                    <span>Temp: {prompt.temperature}</span>
                    <span>Dono: {prompt.owner}</span>
                  </div>
                  <div className="space-y-2">
                    {prompt.guardrails.map((guardrail) => (
                      <div key={guardrail} className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        {guardrail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="Integrações" className="mt-0">
          <section className="grid gap-4 lg:grid-cols-3" id="integrations-webhooks">
            {workspace.integrations.map((integration) => (
              <Card key={integration.id} className="border-border/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <PlugZap className="h-5 w-5 text-primary" />
                    <Badge variant={integration.status === "connected" ? "default" : integration.status === "error" ? "destructive" : "secondary"}>{integration.status}</Badge>
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>Auth: {integration.authType}</p>
                  <p>Secret: {integration.maskedSecret ?? "não configurado"}</p>
                  <p>Último sync: {dateLabel(integration.lastSyncAt)}</p>
                  <DisabledAdminAction label="Conectar" />
                </CardContent>
              </Card>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="Auditoria" className="mt-0">
          <Card className="border-border/80" id="analytics-logs">
            <CardHeader>
              <CardTitle>Analytics, logs e auditoria</CardTitle>
              <CardDescription>Eventos administrativos recentes em admin_audit_events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.auditEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{event.summary}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{event.eventType} · {event.entityType}{event.entityId ? ` · ${event.entityId}` : ""}</p>
                    </div>
                    <Badge variant={event.severity === "critical" ? "destructive" : event.severity === "warning" ? "secondary" : "outline"}>{event.severity}</Badge>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{dateLabel(event.createdAt)} · {event.actorEmail ?? "sistema"}</p>
                </div>
              ))}
              {workspace.auditEvents.length === 0 ? <EmptyPanel label="Nenhum evento administrativo recente." /> : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Segurança" className="mt-0">
          <section className="grid gap-4 lg:grid-cols-3" id="security-compliance">
            {workspace.securityPolicies.map((policy) => (
              <Card key={policy.id} className="border-border/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <KeyRound className="h-5 w-5 text-primary" />
                    <Badge variant={policy.status === "active" ? "default" : "secondary"}>{policy.status}</Badge>
                  </div>
                  <CardTitle>{policy.name}</CardTitle>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>Enforcement: {policy.enforcementLevel}</p>
                  <p>Revisão a cada {policy.reviewFrequencyDays} dias</p>
                  <p>Última revisão: {dateLabel(policy.lastReviewedAt)}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="Conteúdo" className="mt-0">
          <Card className="border-border/80" id="branding-content">
            <CardHeader>
              <CardTitle>Branding e conteúdo</CardTitle>
              <CardDescription>Blocos editáveis para superfícies do produto.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {workspace.contentBlocks.map((block) => (
                <div key={block.id} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{block.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{block.surface} · {block.audience}</p>
                    </div>
                    <Badge variant={block.status === "published" ? "default" : "secondary"}>{block.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{block.content}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{block.owner}</span>
                    <span>{dateLabel(block.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 p-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Próximo incremento sugerido
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Criar server actions com auditoria para editar planos, flags, prompts, políticas e blocos de conteúdo diretamente neste painel.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          Gerado em {dateLabel(workspace.generatedAt)}
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </PageContainer>
  )
}
