import { Network, Activity, Calendar, FileText, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function AppsIntegrationPage() {
  const integrations = [
    {
      id: "calendar",
      name: "Google Calendar",
      desc: "Sincronize seus eventos da agenda e blocos de tempo gerados pela IA.",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      category: "Produtividade",
      connected: true
    },
    {
      id: "notion",
      name: "Notion",
      desc: "Exporte seu Diário e as Metas para databases do Notion.",
      icon: FileText,
      color: "text-foreground",
      bg: "bg-muted",
      category: "Produtividade",
      connected: false
    },
    {
      id: "apple_health",
      name: "Apple Health",
      desc: "Importe dados de sono e exercícios para o diagnóstico de Saúde.",
      icon: Activity,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      category: "Saúde & Corpo",
      connected: false
    },
    {
      id: "strava",
      name: "Strava",
      desc: "Registre automaticamente suas atividades físicas na checklist diária.",
      icon: Network,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      category: "Saúde & Corpo",
      connected: false
    }
  ]

  const categories = Array.from(new Set(integrations.map(i => i.category)))

  return (
    <>
      <AppTopbar title="Integrações" subtitle="Conecte aplicativos externos ao seu ciclo" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
      <PageHeader
        eyebrow="Ecossistema"
        title="Integrações"
        description="Conecte o NexxaLife aos seus aplicativos favoritos para automatizar sua rotina."
        actions={
          <Button variant="outline" size="sm" className="h-9 rounded-xl px-4 text-xs">
            Sugerir integração
          </Button>
        }
      />

      <div className="grid gap-8">
        {categories.map((cat) => (
          <SectionCard key={cat} title={cat}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.filter(i => i.category === cat).map((app) => {
                const Icon = app.icon
                return (
                  <div key={app.id} className="flex flex-col justify-between p-5 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-colors gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-none h-12 w-12 rounded-xl flex items-center justify-center ${app.bg} ${app.color} shadow-sm border border-border/40`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-bold text-foreground truncate">{app.name}</h4>
                          {app.connected ? (
                            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <CheckCircle2 className="h-3 w-3" /> Conectado
                            </span>
                          ) : (
                            <span className="text-[10px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Inativo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                          {app.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
                      <p className="text-xs font-medium text-muted-foreground">Sincronização bidirecional</p>
                      <Switch defaultChecked={app.connected} />
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
    </>
  )
}
