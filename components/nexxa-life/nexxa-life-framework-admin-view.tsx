import Link from "next/link"
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  CreditCard,
  FileText,
  Flag,
  Globe2,
  LockKeyhole,
  Palette,
  PlugZap,
  ShieldCheck,
  Sparkles,
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
import type { FrameworkAdminModule, FrameworkAdminWorkspace } from "@/modules/framework-admin/workspace"

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
  live: "Conectado",
  planned: "Roadmap",
  "needs-data": "Precisa de dados",
}

function statusVariant(status: FrameworkAdminModule["status"]) {
  return status === "live" ? "default" : status === "needs-data" ? "destructive" : "secondary"
}

export function NexxaLifeFrameworkAdminView({ workspace }: NexxaLifeFrameworkAdminViewProps) {
  const kpis = [
    {
      label: "Usuários totais",
      value: String(workspace.kpis.totalUsers),
      hint: `${workspace.kpis.onboardedUsers} perfis com onboarding concluído.`,
      icon: Users,
    },
    {
      label: "Admins ativos",
      value: String(workspace.kpis.adminUsers),
      hint: "Perfis com permissão para acessar este workspace.",
      icon: ShieldCheck,
    },
    {
      label: "Perguntas ativas",
      value: String(workspace.kpis.activeQuestions),
      hint: `${workspace.kpis.inactiveQuestions} perguntas pausadas para auditoria.`,
      icon: CheckCircle2,
    },
    {
      label: "Módulos admin",
      value: String(workspace.adminModules.length),
      hint: "Mapa de operação SaaS em uma única página administrativa.",
      icon: Globe2,
    },
  ]

  const liveModules = workspace.adminModules.filter((module) => module.status === "live").length

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Painel Admin" }]} />
      <PageHeader
        title="Painel Admin NexxaLife"
        description="Uma única central admin para governar usuários, framework, billing, IA, integrações, segurança, conteúdo e automações do SaaS."
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

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  {frameworkAdminHero.kicker} consolidado
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Admin operacional do SaaS, sem duplicar páginas na sidebar.
                  </h2>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                    O acesso visual sai da barra lateral e fica no menu flutuante de comandos. A rota permanece protegida no servidor por role admin e concentra as áreas que um administrador precisa configurar.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Entrada</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Menu flutuante ⌘K</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Admin aparece como comando, não como item fixo da navegação lateral.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Cobertura</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{liveModules}/{workspace.adminModules.length} módulos conectados</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Usuários e diagnóstico já leem dados persistidos; demais áreas viram roadmap configurável.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {kpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Prioridades do admin SaaS</CardTitle>
            <CardDescription>O que esta página deve permitir configurar conforme o produto evolui.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Controle de roles, usuários, onboarding e acesso sensível.",
              "Edição segura do framework diagnóstico e das perguntas ativas.",
              "Planos, limites, feature flags, prompts de IA e integrações.",
              "Auditoria, logs, compliance, conteúdo e automações de lifecycle.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-background/60 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6" id="admin-modules">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Mapa completo de módulos admin</h2>
            <p className="text-sm text-muted-foreground">Uma página única com todas as opções que o administrador do SaaS tende a precisar.</p>
          </div>
          <Badge variant="outline" className="rounded-full">{workspace.adminModules.length} áreas</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workspace.adminModules.map((module) => {
            const Icon = moduleIcons[module.id] ?? ShieldCheck

            return (
              <Card key={module.id} id={module.id} className="border-border/80 bg-card/80">
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
                  <Button variant="outline" size="sm" className="w-full justify-between rounded-lg" disabled={module.status !== "live"}>
                    {module.primaryAction}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/80" id="diagnostic-framework">
          <CardHeader>
            <CardTitle>Framework diagnóstico conectado</CardTitle>
            <CardDescription>
              {workspace.kpis.activeAxes} eixos com registros persistidos em diagnostic_questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workspace.axes.map((axis) => (
              <div key={axis.area} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{axis.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{axis.summary}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full">
                    {axis.activeQuestions}/{axis.totalQuestions} ativas
                  </Badge>
                </div>
                <div className="mt-3 space-y-2">
                  {axis.questions.slice(0, 3).map((question) => (
                    <div key={question.id} className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">#{question.questionOrder}</span> {question.questionText}
                    </div>
                  ))}
                  {axis.questions.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                      Nenhuma pergunta cadastrada para este eixo.
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80" id="users-access">
          <CardHeader>
            <CardTitle>Usuários e acesso</CardTitle>
            <CardDescription>Últimos perfis encontrados em app_user_profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell className="text-xs text-muted-foreground">
                      {user.onboarded ? "Onboarded" : "Pendente"}
                    </TableCell>
                  </TableRow>
                ))}
                {workspace.recentUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center text-sm text-muted-foreground">
                      Nenhum perfil encontrado no banco configurado.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 p-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Próximo incremento sugerido
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Transformar os módulos roadmap em CRUDs reais, começando por edição de perguntas e roles.
          </p>
        </div>
        <Button asChild variant="link" className="px-0">
          <Link href="/logs">
            Ver logs e auditoria
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
