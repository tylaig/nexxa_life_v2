import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, FolderTree, GaugeCircle, Plug, Webhook } from "lucide-react"
import { integrationMockCatalog } from "@/components/apps/integration-mock-catalog"

export default function IntegrationsSettingsPage() {
  return (
    <>
      <AppTopbar title="Configurações · Integrações" subtitle="Centro administrativo para conexões do workspace, providers, webhooks, mappings e ativação operacional" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Integrações" }]} />
        <PageHeader
          title="Configuração de integrações"
          description="Ponte administrativa entre catálogo técnico, ativações do workspace, webhooks inbound, credenciais, mappings e tools/actions."
          actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/apps/providers">Providers</Link></Button><Button asChild size="sm"><Link href="/apps">Abrir integrações do workspace</Link></Button></div>}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Providers" value={String(integrationMockCatalog.length)} icon={FolderTree} hint="catálogo técnico" />
          <StatCard label="Conexões" value="Workspace" icon={Plug} hint="ativações operacionais" />
          <StatCard label="Webhooks" value="Inbound" icon={Webhook} hint="parser + debug" />
          <StatCard label="Uso" value={integrationMockCatalog.reduce((sum, item) => sum + item.usageCount, 0).toLocaleString("pt-BR")} icon={GaugeCircle} hint="contador acumulado" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <AdminCard
            title="Integrações do workspace"
            description="Conexões ativas, health check, credenciais, usage counters e contexto operacional."
            href="/apps"
            cta="Abrir ativações"
          />
          <AdminCard
            title="Providers"
            description="Schema, auth mode, tools/actions, limites, credenciais e parser JSON por provider."
            href="/apps/providers"
            cta="Abrir providers"
          />
          <AdminCard
            title="Webhooks inbound"
            description="Endpoints de entrada, mapping, payload de teste, replay/debug e ativação de automações."
            href="/apps/webhooks"
            cta="Abrir webhooks"
          />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Camadas administrativas da arquitetura</CardTitle>
            <CardDescription>Separação entre administração, catálogo técnico e execução operacional.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-border bg-background/50 p-4">Settings atua como centro administrativo e de governança da malha de integrações.</div>
            <div className="rounded-xl border border-border bg-background/50 p-4">Integrations concentra ativações reais do workspace, details, mappings, tools e execução mock.</div>
            <div className="rounded-xl border border-border bg-background/50 p-4">O próximo passo é ligar webhook → mapping → action/tool → automation runtime.</div>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  )
}

function AdminCard({ title, description, href, cta }: { title: string; description: string; href: string; cta: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline"><Link href={href}><ArrowRightLeft className="mr-2 h-4 w-4" />{cta}</Link></Button>
      </CardContent>
    </Card>
  )
}
