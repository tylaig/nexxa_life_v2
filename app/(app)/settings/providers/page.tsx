import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, CheckCircle2, KeyRound, ShieldCheck, ArrowRightLeft, FileJson2 } from "lucide-react"
import { integrationMockCatalog } from "@/components/apps/integration-mock-catalog"

export default function SettingsProvidersPage() {
  const nativeProviders = integrationMockCatalog.filter((item) => item.category === "native")
  const customProviders = integrationMockCatalog.filter((item) => item.category === "custom")

  return (
    <>
      <AppTopbar title="Providers" subtitle="Administração de providers nativos e custom com credenciais seguras, tools, parsers e políticas de ativação" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Providers" }]} />
        <PageHeader
          title="Providers"
          description="Centro administrativo de providers com credenciais, auth modes, tools/actions, parser JSON e vínculo futuro com integrações do workspace."
          actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/apps/providers">Abrir catálogo técnico</Link></Button><Button asChild size="sm"><Link href="/apps/new">Ativar no workspace</Link></Button></div>}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Providers" value={String(integrationMockCatalog.length)} icon={BrainCircuit} hint="nativos + custom" />
          <StatCard label="Credenciais" value="Server-only" icon={KeyRound} hint="metadata pública apenas" />
          <StatCard label="Tools" value={String(integrationMockCatalog.reduce((sum, item) => sum + item.tools.length, 0))} icon={CheckCircle2} hint="ações reutilizáveis" />
          <StatCard label="Parser JSON" value="Pronto" icon={FileJson2} hint="webhooks e outputs" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {[{ title: "Providers nativos", items: nativeProviders }, { title: "Providers custom", items: customProviders }].map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>Visão administrativa dos conectores com políticas, schema, credenciais e tools.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.items.map((provider) => (
                  <div key={provider.provider} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium">{provider.displayName}</div>
                        <div className="text-xs text-muted-foreground">{provider.authMode} · {provider.credentials.mode}</div>
                      </div>
                      <Badge variant="outline">limite {provider.limitPerWorkspace}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {provider.capabilities.map((capability) => <Badge key={capability} variant="secondary">{capability}</Badge>)}
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                      <div>{provider.schema.length} campos configuráveis · {provider.tools.length} tools disponíveis</div>
                      <div>{provider.credentials.storage}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm"><Link href="/apps/providers">Detalhe técnico</Link></Button>
                      <Button asChild variant="outline" size="sm"><Link href="/apps/webhooks"><ArrowRightLeft className="mr-2 h-4 w-4" />Webhooks</Link></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Política de uso e segurança</CardTitle>
            <CardDescription>Base administrativa para rotation, escopo, seleção de credenciais e ativação por workspace.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-border bg-background/50 p-4">Credenciais ficam fora da UI e são expostas apenas como metadata pública.</div>
            <div className="rounded-xl border border-border bg-background/50 p-4">Cada provider poderá ofertar múltiplas tools, parsers e schemas por contexto operacional.</div>
            <div className="rounded-xl border border-border bg-background/50 p-4">O próximo passo é consolidar rotação, health e vínculo provider → workspace integration.</div>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  )
}
