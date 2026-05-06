import { CreditCard, Sparkles, Download, ArrowRight, Zap } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function BillingPage() {
  return (
    <>
      <AppTopbar title="Plano e Faturamento" subtitle="Gerencie sua assinatura" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <PageHeader
        eyebrow="Configurações"
        title="Plano e Faturamento"
        description="Acompanhe sua assinatura e histórico de cobranças."
      />

      <div className="grid gap-6">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-violet-500/10 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Premium Life</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-[300px]">
                Acesso completo à Inteligência Estratégica NexxaLife, gráficos avançados e histórico ilimitado.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">R$ 49</span>
                <span className="text-sm text-muted-foreground mb-1">/mês</span>
              </div>
              <Button size="sm" className="w-full h-10 rounded-xl font-semibold gap-2">
                <Zap className="h-4 w-4" /> Fazer Upgrade para Anual
              </Button>
            </div>
          </div>
        </div>

        <SectionCard title="Método de Pagamento">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-muted border border-border/60">
                <CreditCard className="h-6 w-6 text-foreground/80" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Mastercard terminando em 4242</p>
                <p className="text-xs text-muted-foreground mt-0.5">Expira em 12/2028</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">Atualizar</Button>
          </div>
        </SectionCard>

        <SectionCard title="Histórico de Faturas">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border/50 text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Valor</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Recibo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {[
                  { date: "05 Mai 2026", amount: "R$ 49,00", status: "Pago" },
                  { date: "05 Abr 2026", amount: "R$ 49,00", status: "Pago" },
                  { date: "05 Mar 2026", amount: "R$ 49,00", status: "Pago" },
                ].map((invoice, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 text-foreground font-medium">{invoice.date}</td>
                    <td className="py-4 text-muted-foreground">{invoice.amount}</td>
                    <td className="py-4">
                      <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground group-hover:text-foreground">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
    </>
  )
}
