"use client"

import * as React from "react"
import Link from "next/link"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getIntegration } from "@/lib/integrations/api"
import { ArrowRightLeft, Bug, Database, TestTube2, FileJson2 } from "lucide-react"
import { integrationMockCatalog } from "./integration-mock-catalog"
import type { IntegrationItem } from "./integration-types"

const contactFields = ["first_name", "email", "phone", "lifetime_value", "vip_tier", "last_order_payload"]
const sampleSources = ["customer.first_name", "customer.email", "customer.phone", "order.total_price", "order.tags", "raw.payload"]

export function IntegrationMappingView({ integrationId }: { integrationId: string }) {
  const [item, setItem] = React.useState<IntegrationItem | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const next = await getIntegration<IntegrationItem>(integrationId).catch(() => null)
      if (!cancelled) {
        setItem(next)
        setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [integrationId])

  const preset = item ? integrationMockCatalog.find((entry) => entry.provider === item.provider) : null
  const firstTool = preset?.tools[0]
  const mappingRows = contactFields.slice(0, 4).map((field, index) => ({ target: field, source: sampleSources[index] }))

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Integrações", href: "/apps" }, ...(item ? [{ label: item.displayName, href: `/apps/${integrationId}` }] : []), { label: "Mapping" }]} />
      <PageHeader
        title="Mapping"
        description="Mapeamento de payloads, contact fields, outputs de tools e preparação para parser JSON e webhooks inbound."
        actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href={`/apps/${integrationId}`}>Voltar ao detalhe</Link></Button><Button size="sm">Salvar mapping</Button></div>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Integração" value={item?.displayName ?? (loading ? "Carregando" : "Não encontrada")} icon={ArrowRightLeft} />
        <StatCard label="Contact fields" value={String(contactFields.length)} icon={Database} />
        <StatCard label="Tools" value={String(preset?.tools.length ?? 0)} icon={TestTube2} />
        <StatCard label="Debug" value="Pronto" icon={Bug} hint="payload + parser" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Mapa inicial de campos</CardTitle>
            <CardDescription>Base para vincular payload externo a campos internos de contato, pedido e contexto operacional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!loading && !item ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                Não foi possível localizar a integração solicitada para montar o mapping.
              </div>
            ) : null}
            {mappingRows.map((row) => (
              <div key={row.target} className="grid gap-3 rounded-xl border border-border p-3 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">source</div>
                  <div className="font-mono text-sm">{row.source}</div>
                </div>
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">target</div>
                  <div className="font-medium text-sm">{row.target}</div>
                </div>
                <Badge variant="outline">ativo</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tool inicial</CardTitle>
              <CardDescription>Exemplo de tool/action associada ao provider.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <div className="font-medium">{firstTool?.label ?? "Sem tool"}</div>
                <div className="mt-1 text-muted-foreground">{firstTool?.description ?? "Sem descrição disponível."}</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {firstTool?.supportsJsonParser ? <Badge variant="secondary">json parser</Badge> : null}
                {(firstTool?.inputSchema ?? []).map((field) => <Badge key={field.key} variant="outline">input:{field.key}</Badge>)}
                {(firstTool?.outputSchema ?? []).map((field) => <Badge key={field.key} variant="outline">output:{field.key}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payload de teste</CardTitle>
              <CardDescription>Preview de entrada persistível para debug, parser e replay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <div className="mb-2 flex items-center gap-2 font-medium"><FileJson2 className="h-4 w-4 text-primary" />Sample JSON</div>
                <pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify({ customer: { first_name: "Samuel", email: "samuel@onda.app", phone: "+551199999999" }, order: { total_price: 1299, tags: ["vip", "console"] } }, null, 2)}</pre>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3 text-muted-foreground">Saída observável para automations, agents e webhooks</div>
              <Button variant="outline" className="w-full">Abrir console mock</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
