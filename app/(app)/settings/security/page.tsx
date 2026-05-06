import { ShieldCheck, KeyRound, Smartphone, Laptop, History } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function SecurityPage() {
  return (
    <>
      <AppTopbar title="Segurança e Acesso" subtitle="Gerencie sua senha e sessões ativas" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <PageHeader
        eyebrow="Configurações"
        title="Segurança e Acesso"
        description="Gerencie sua senha, autenticação de dois fatores e sessões ativas."
      />

      <div className="grid gap-6">
        <SectionCard title="Autenticação e Senha">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Senha da conta</span>
                </div>
                <p className="text-xs text-muted-foreground">Última alteração: há 3 meses.</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">Mudar senha</Button>
            </div>

            <div className="border-t border-border/50 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">Autenticação de Dois Fatores (2FA)</span>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[300px]">Adiciona uma camada extra de segurança usando um aplicativo autenticador.</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Sessões Ativas">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border border-border/50">
                  <Laptop className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mac OS · Chrome <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full ml-2 font-bold uppercase tracking-wider">Sessão Atual</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">São Paulo, BR · Há poucos segundos</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border/30 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground/80">iPhone 14 Pro · Safari</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Campinas, BR · Há 2 horas</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs text-destructive hover:bg-destructive/10">Revogar</Button>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full h-9 rounded-xl text-xs gap-2">
                <History className="h-3.5 w-3.5" /> Encerrar todas as outras sessões
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
    </>
  )
}
