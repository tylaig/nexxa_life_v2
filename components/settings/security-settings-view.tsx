import { AlertTriangle, History, KeyRound, Laptop, ShieldCheck, Smartphone } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export function SecuritySettingsView() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Configurações"
        title="Segurança e Acesso"
        description="Controle senha, 2FA, sessões e auditoria de acesso em uma tela full page."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <SectionCard title="Autenticação" description="Proteja a entrada da conta e prepare a camada de segurança para integrações externas.">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary"><KeyRound className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Senha da conta</p>
                    <p className="mt-1 text-xs text-muted-foreground">Última alteração: não disponível neste ambiente.</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl">Mudar senha</Button>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600"><ShieldCheck className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Autenticação de dois fatores</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Camada extra para proteger conta, calendário e automações futuras.</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Sessões ativas" description="Visualize e encerre acessos conectados.">
            <div className="space-y-3">
              {[
                { icon: Laptop, title: "Linux · Browser atual", meta: "São Paulo, BR · agora", current: true },
                { icon: Smartphone, title: "Dispositivo móvel", meta: "Última atividade simulada · aguardando integração real", current: false },
              ].map((session) => {
                const Icon = session.icon
                return (
                  <div key={session.title} className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><Icon className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{session.title} {session.current && <Badge variant="secondary" className="ml-2 rounded-full text-[10px]">Atual</Badge>}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{session.meta}</p>
                      </div>
                    </div>
                    {!session.current && <Button variant="ghost" className="rounded-xl text-destructive hover:text-destructive">Revogar</Button>}
                  </div>
                )
              })}
              <Button variant="outline" className="w-full rounded-2xl"><History className="mr-2 h-4 w-4" /> Encerrar todas as outras sessões</Button>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Postura de risco" description="Resumo operacional de segurança.">
            <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <p className="mt-4 text-3xl font-black text-foreground">Boa</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Nenhum alerta crítico local. Ative 2FA quando a integração de auth avançada estiver disponível.</p>
            </div>
          </SectionCard>

          <SectionCard title="Ações sensíveis" description="Área reservada para ações que afetam conta e dados.">
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-xs leading-5 text-muted-foreground">Reset de progresso fica em Configurações → Segurança para evitar confundir com exclusão de conta.</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
