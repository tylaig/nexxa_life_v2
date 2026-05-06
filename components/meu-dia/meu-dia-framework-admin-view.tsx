import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { frameworkAdminGuardrails, frameworkAdminHero } from "@/components/meu-dia/framework-admin-content"
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
import type { FrameworkAdminWorkspace } from "@/modules/framework-admin/workspace"

type NexxaLifeFrameworkAdminViewProps = {
  workspace: FrameworkAdminWorkspace
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
  ]

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "NexxaLife", href: "/dashboard" }, { label: "Framework Admin" }]} />
      <PageHeader
        title={frameworkAdminHero.title}
        description={frameworkAdminHero.description}
        actions={
          <>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              Admin-only
            </Badge>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/settings">Configurações</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="space-y-6 p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  Governança estrutural
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Painel administrativo real, conectado aos perfis e perguntas persistidas.
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    Esta superfície consolida usuários, papéis e a matriz de diagnóstico para que apenas administradores governem o framework que sustenta a experiência NexxaLife.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Acesso</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">Somente role admin</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Usuários comuns não recebem navegação para /framework-admin e são bloqueados server-side.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Fonte de dados</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">app_user_profiles + diagnostic_questions</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    KPIs derivados de registros persistidos, sem depender de conteúdo estático legado.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {kpis.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} icon={item.icon} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Guardrails de governança</CardTitle>
            <CardDescription>Critérios para evoluir o framework sem perder coerência sistêmica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {frameworkAdminGuardrails.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Matriz de perguntas por eixo</CardTitle>
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

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Perfis recentes</CardTitle>
            <CardDescription>Últimos perfis administrativos/usuários encontrados em app_user_profiles.</CardDescription>
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

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="px-0">
          <Link href="/academy">
            Seguir para academia
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
