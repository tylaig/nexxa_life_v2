import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck, UserPlus, Users, KeySquare, Activity } from "lucide-react"
import { PlannedActionButton } from "@/components/settings/planned-action-button"

const users = [
  { id: "u1", name: "Samuel Costa", role: "Admin", team: "Operações", status: "active" },
  { id: "u2", name: "Bianca Reis", role: "Manager", team: "CRM", status: "active" },
  { id: "u3", name: "Lucas Prado", role: "Analyst", team: "Suporte", status: "invite_pending" },
]

export default function SettingsUsersPage() {
  return (
    <>
      <AppTopbar title="Usuários" subtitle="Pessoas, papéis e acesso ao workspace" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Usuários" }]} />
        <PageHeader title="Usuários e acesso" description="Administre membros do workspace, convites, papéis operacionais e trilhas de acesso." actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/settings/security">Políticas</Link></Button><PlannedActionButton size="sm" className="gap-2" message="Convite de usuário secundário"><UserPlus className="h-3.5 w-3.5" />Convidar usuário</PlannedActionButton></div>} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Usuários" value={String(users.length)} icon={Users} />
          <StatCard label="Admins" value={String(users.filter((user) => user.role === "Admin").length)} icon={ShieldCheck} />
          <StatCard label="Convites" value={String(users.filter((user) => user.status !== "active").length)} icon={KeySquare} />
          <StatCard label="Auditoria" value="Ativa" hint="acesso centralizado" icon={Activity} />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Membros</CardTitle>
            <CardDescription>Base inicial para RBAC, convites e auditoria por usuário.</CardDescription>
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
                    <Badge variant={user.status === "active" ? "secondary" : "outline"}>{user.status === "active" ? "Ativo" : "Convite pendente"}</Badge>
                    <PlannedActionButton variant="outline" size="sm" message={`Acesso de ${user.name}`}>Editar acesso</PlannedActionButton>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leitura rápida</CardTitle>
            <CardDescription>Base inicial para RBAC, acesso por time e superfícies críticas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Info label="Papéis atuais">Admin, Manager e Analyst</Info>
            <Info label="Próximo passo">Permissões granulares por módulo, provider e action runtime.</Info>
            <Info label="Conexão futura">Trilha de auditoria compartilhada com governança e logs.</Info>
          </CardContent>
        </Card>
        </div>
      </PageContainer>
    </>
  )
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-medium">{children}</div></div>
}
