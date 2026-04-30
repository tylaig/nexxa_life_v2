import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Receipt, Wallet, BrainCircuit, Bot } from "lucide-react"
import { PlannedActionButton } from "@/components/settings/planned-action-button"
import { tenants } from "@/lib/mock/tenants"

export default function SettingsBillingPage() {
  const workspace = tenants[0]

  return (
    <>
      <AppTopbar title="Billing" subtitle="Plano, cobrança e capacidade contratada do workspace" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Billing" }]} />
        <PageHeader title="Billing e plano" description="Leitura inicial de cobrança, capacidade e distribuição de consumo do ambiente atual." actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/settings/providers">Providers</Link></Button><PlannedActionButton size="sm" message="Gestão de assinatura secundária">Gerenciar assinatura</PlannedActionButton></div>} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Plano" value={workspace.plan} icon={Wallet} />
          <StatCard label="Cobrança" value="Mensal" icon={Receipt} />
          <StatCard label="Pagamento" value="Cartão" icon={CreditCard} />
          <StatCard label="Uso IA/integrações" value="Saudável" icon={BrainCircuit} hint="dentro da capacidade" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Resumo contratual</CardTitle>
              <CardDescription>Superfície inicial para visibilidade de plano, limites e faturamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border border-border bg-background/50 p-3">Plano atual com capacidade para expansão de agentes, integrações, providers e volume operacional.</div>
              <div className="rounded-lg border border-border bg-background/50 p-3">Próxima evolução: consumo por módulo, limites, counters por integration e histórico de faturas.</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Atalhos administrativos relacionados ao billing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PlannedActionButton variant="outline" className="w-full" message="Atualização de método de pagamento secundária">Atualizar método de pagamento</PlannedActionButton>
              <PlannedActionButton variant="outline" className="w-full" message="Histórico de faturas secundário">Ver histórico de faturas</PlannedActionButton>
              <PlannedActionButton variant="outline" className="w-full gap-2" message="Consumo de agentes secundário"><Bot className="h-4 w-4" />Ver consumo de agentes</PlannedActionButton>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
