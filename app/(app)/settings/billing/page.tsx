import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Receipt, Wallet, Sparkles } from "lucide-react"

export default function SettingsBillingPage() {
  return (
    <>
      <AppTopbar title="Assinatura" subtitle="Seu plano e faturamento do NexxaLife" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Assinatura" }]} />
        <PageHeader title="Assinatura" description="Gerencie seu plano, faturamento e recursos premium da sua conta pessoal." />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Plano" value="Free" icon={Wallet} />
          <StatCard label="Cobrança" value="-" icon={Receipt} />
          <StatCard label="Pagamento" value="-" icon={CreditCard} />
          <StatCard label="Recursos AI" value="Ativo" icon={Sparkles} hint="Gateway de IA liberado" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Meu Plano Atual</CardTitle>
              <CardDescription>Você está utilizando o plano gratuito do NexxaLife.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border border-border bg-background/50 p-4">
                O plano gratuito inclui acesso ao Ciclo completo (Metas, Checklist, Agenda e Diário) e uso do assistente básico. Em breve, novos planos permitirão integrações profundas com Notion, Google Calendar e saúde.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Gerenciamento da assinatura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="default" className="w-full">Fazer Upgrade (Em Breve)</Button>
              <Button variant="outline" className="w-full">Ver histórico de faturas</Button>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
