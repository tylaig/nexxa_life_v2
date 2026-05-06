import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, KeyRound, LockKeyhole } from "lucide-react"

export default function SettingsSecurityPage() {
  return (
    <>
      <AppTopbar title="Segurança" subtitle="Proteção e acesso da sua conta" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Segurança" }]} />
        <PageHeader title="Segurança" description="Proteja seus dados, diário e histórico com camadas extras de segurança." />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <StatCard label="MFA" value="Desativado" hint="recomendado" icon={KeyRound} />
          <StatCard label="Sessões" value="1 Ativa" hint="neste dispositivo" icon={LockKeyhole} />
          <StatCard label="Proteção de Dados" value="Privada" hint="RLS ativo" icon={ShieldCheck} />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Controles de Acesso</CardTitle>
                <CardDescription>Gerencie métodos de login e segurança adicional.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Toggle label="Autenticação em duas etapas (MFA)" />
                <Toggle label="Exigir reautenticação ao abrir Diário" />
                <Toggle label="Bloquear capturas de tela no celular" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Postura Atual</CardTitle>
                <CardDescription>Resumo das suas defesas.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="secondary">Login Seguro (Supabase Auth)</Badge>
                <Badge variant="secondary">Banco de dados Isolado</Badge>
                <Badge variant="outline">MFA Recomendado</Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Atalhos rápidos para segurança.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid gap-2">
                <Button variant="default" className="w-full">Alterar Senha</Button>
                <Button variant="outline" className="w-full text-destructive">Sair de todos os dispositivos</Button>
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
