import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PlannedActionButton } from "@/components/settings/planned-action-button"

export default function SettingsProfilePage() {
  return (
    <>
      <AppTopbar title="Perfil" subtitle="Preferências da conta, notificações e segurança básica" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Perfil" }]} />
        <PageHeader title="Perfil" description="Ajuste dados pessoais e preferências operacionais da sua conta." />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Dados pessoais</CardTitle>
              <CardDescription>Informações principais exibidas nos fluxos internos do produto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Nome completo"><Input defaultValue="Samuel Costa" /></Field>
              <Field label="Email"><Input defaultValue="samuel@onda.app" /></Field>
              <Field label="Cargo"><Input defaultValue="Operations Lead" /></Field>
              <Field label="Idioma"><Input defaultValue="Português (Brasil)" /></Field>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Controles rápidos para o dia a dia da operação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Toggle label="Receber alertas críticos" defaultChecked />
                <Toggle label="Resumo diário por email" defaultChecked />
                <Toggle label="Ativar confirmações sensíveis" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
                <CardDescription>Persistência visual inicial para a superfície de perfil.</CardDescription>
              </CardHeader>
              <CardContent>
                <PlannedActionButton message="Preferências de perfil">Salvar preferências</PlannedActionButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-3 text-sm"><span>{label}</span><Switch defaultChecked={defaultChecked} /></div>
}
