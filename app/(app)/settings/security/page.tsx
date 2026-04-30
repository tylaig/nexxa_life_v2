import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, KeyRound, Eye, LockKeyhole, FileCheck2, Siren } from "lucide-react"
import { PlannedActionButton } from "@/components/settings/planned-action-button"

export default function SettingsSecurityPage() {
  return (
    <>
      <AppTopbar title="Governança" subtitle="Segurança, auditoria e regras operacionais do workspace" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Governança" }]} />
        <PageHeader title="Governança e segurança" description="Defina a postura mínima de segurança e governança para operação humana, automações, integrações e agentes." actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/logs">Abrir logs</Link></Button><Button asChild variant="outline" size="sm"><Link href="/settings/users">Papéis e acesso</Link></Button></div>} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="MFA" value="Opcional" hint="pode ser exigido" icon={KeyRound} />
          <StatCard label="Auditoria" value="Ativa" hint="ações críticas" icon={Eye} />
          <StatCard label="Sessões" value="Protegidas" hint="reautenticação sensível" icon={LockKeyhole} />
          <StatCard label="Política" value="Workspace" hint="governança central" icon={ShieldCheck} />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
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
                <CardDescription>Diretrizes que podem ser refletidas futuramente em agentes, automações e compliance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <Item>Logs de alterações de configuração devem permanecer acessíveis ao time admin.</Item>
                <Item>Fluxos financeiros e reembolsos exigem confirmação humana.</Item>
                <Item>Ações críticas em canais e integrações devem registrar ator e horário.</Item>
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
              <div className="grid gap-2">
                <PlannedActionButton className="w-full" message="Política de governança secundária">Salvar política atual</PlannedActionButton>
                <Button asChild variant="outline" className="w-full"><Link href="/settings/providers">Revisar providers</Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-3 text-sm"><span>{label}</span><Switch defaultChecked={defaultChecked} /></div>
}

function Item({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3">{children}</div>
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-background/50 p-3"><div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-medium">{children}</div></div>
}
