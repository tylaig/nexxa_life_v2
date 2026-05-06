import { Settings, SlidersHorizontal, Bell, Monitor, Globe, Accessibility } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function PreferencesPage() {
  return (
    <>
      <AppTopbar title="Preferências" subtitle="Configurações globais da sua conta" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <PageHeader
        eyebrow="Configurações"
        title="Preferências"
        description="Gerencie as configurações gerais da sua conta e interface."
        actions={
          <Button size="sm" className="h-9 gap-2 rounded-xl px-4 shadow-sm">
            <SlidersHorizontal className="h-4 w-4" /> Salvar preferências
          </Button>
        }
      />

      <div className="grid gap-6">
        <SectionCard title="Interface e Apresentação">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tema da aplicação</span>
                </div>
                <p className="text-xs text-muted-foreground">Escolha entre o modo claro, escuro ou siga o sistema.</p>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs bg-background shadow-sm">Escuro</Button>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs text-muted-foreground">Claro</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Fuso horário e Data</span>
                </div>
                <p className="text-xs text-muted-foreground">GMT-03:00 (Brasília) — Formato DD/MM/AAAA</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">Alterar formato</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notificações Globais">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Alertas Diários</span>
                </div>
                <p className="text-xs text-muted-foreground">Receba resumos pela manhã com seu planejamento gerado pela IA.</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">Som de sistema</span>
                <p className="text-xs text-muted-foreground">Tocar efeitos sonoros sutis ao completar metas e tarefas.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Acessibilidade">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Reduzir animações</span>
              </div>
              <p className="text-xs text-muted-foreground">Desativa efeitos visuais intensos e transições de página.</p>
            </div>
            <Switch />
          </div>
        </SectionCard>
      </div>
    </div>
    </>
  )
}
