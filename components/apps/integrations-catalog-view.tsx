"use client"

import Link from "next/link"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Blocks, Compass, PlugZap, Sparkles, ArrowRightLeft, Wrench } from "lucide-react"
import { integrationMockCatalog } from "./integration-mock-catalog"

export function IntegrationsCatalogView() {
  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Integrações", href: "/apps" }, { label: "Catálogo" }]} />
      <PageHeader
        title="Catálogo de integrações"
        description="Visão comercial/técnica das integrações disponíveis para ativação, com capacidades, tools e preparação para runtime."
        actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/apps/providers">Providers</Link></Button><Button asChild size="sm"><Link href="/apps/new">Nova integração</Link></Button></div>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Catálogo" value={String(integrationMockCatalog.length)} icon={Blocks} />
        <StatCard label="Nativas" value={String(integrationMockCatalog.filter((item) => item.category === "native").length)} icon={PlugZap} />
        <StatCard label="Custom" value={String(integrationMockCatalog.filter((item) => item.category === "custom").length)} icon={Compass} />
        <StatCard label="Ready for tools" value="Sim" icon={Sparkles} hint="actions reutilizáveis" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrationMockCatalog.map((item) => (
          <Card key={item.provider} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{item.displayName}</CardTitle>
                  <CardDescription>{item.authMode} · {item.category}</CardDescription>
                </div>
                <Badge variant="outline">{item.limitPerWorkspace}/workspace</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">{item.tools.length} tools/actions · {item.schema.length} campos configuráveis · uso acumulado {item.usageCount.toLocaleString("pt-BR")}</div>
              <div className="flex flex-wrap gap-1.5">
                {item.capabilities.map((capability) => <Badge key={capability} variant="secondary">{capability}</Badge>)}
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3 text-sm">
                <div className="font-medium">Tools iniciais</div>
                <div className="mt-2 space-y-2">
                  {item.tools.slice(0, 2).map((tool) => (
                    <div key={tool.key} className="flex items-center justify-between gap-2">
                      <span className="truncate">{tool.label}</span>
                      <Badge variant="outline" className="gap-1"><Wrench className="h-3 w-3" />{tool.inputSchema.length}/{tool.outputSchema.length}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm"><Link href="/apps/providers">Ver provider</Link></Button>
                <Button asChild size="sm"><Link href="/apps/new"><ArrowRightLeft className="mr-2 h-4 w-4" />Ativar</Link></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
