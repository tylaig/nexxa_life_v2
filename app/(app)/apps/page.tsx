import { Network, Activity, Calendar, FileText, CheckCircle2, Zap, Bell, Smartphone, BarChart3, Music, MessageSquare, CreditCard, Globe, Dumbbell, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { cn } from "@/lib/utils"

export default function AppsIntegrationPage() {
  const integrations = [
    // Produtividade
    {
      id: "calendar",
      name: "Google Calendar",
      desc: "Sincronize seus eventos da agenda e blocos de tempo gerados pela IA.",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      category: "Produtividade",
      connected: true,
      status: "Última sincronização: há 5 min",
    },
    {
      id: "notion",
      name: "Notion",
      desc: "Exporte seu Diário e as Metas para databases do Notion automaticamente.",
      icon: FileText,
      color: "text-foreground",
      bg: "bg-muted",
      category: "Produtividade",
      connected: false,
      status: "Em breve",
    },
    {
      id: "todoist",
      name: "Todoist",
      desc: "Importe suas tarefas do Todoist e sincronize com o checklist NexxaLife.",
      icon: CheckCircle2,
      color: "text-red-500",
      bg: "bg-red-500/10",
      category: "Produtividade",
      connected: false,
      status: "Em breve",
    },
    {
      id: "slack",
      name: "Slack",
      desc: "Receba notificações e insights diários no seu workspace do Slack.",
      icon: MessageSquare,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      category: "Produtividade",
      connected: false,
      status: "Em breve",
    },
    // Saúde & Corpo
    {
      id: "apple_health",
      name: "Apple Health",
      desc: "Importe dados de sono, exercícios e sinais vitais para o diagnóstico de Saúde.",
      icon: Activity,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      category: "Saúde & Corpo",
      connected: false,
      status: "Em breve",
    },
    {
      id: "strava",
      name: "Strava",
      desc: "Registre automaticamente suas atividades físicas na checklist diária.",
      icon: Dumbbell,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      category: "Saúde & Corpo",
      connected: false,
      status: "Em breve",
    },
    {
      id: "fitbit",
      name: "Fitbit / Google Fit",
      desc: "Conecte seus wearables para importar métricas de saúde e fitness.",
      icon: Activity,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      category: "Saúde & Corpo",
      connected: false,
      status: "Em breve",
    },
    // Finanças
    {
      id: "open_finance",
      name: "Open Finance",
      desc: "Conecte suas contas bancárias para alimentar o score de Finanças automaticamente.",
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      category: "Finanças",
      connected: false,
      status: "Em breve",
    },
    // Comunicação
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      desc: "Receba check-ins diários e lembretes de missões via WhatsApp.",
      icon: Smartphone,
      color: "text-green-500",
      bg: "bg-green-500/10",
      category: "Comunicação",
      connected: false,
      status: "Em breve",
    },
    {
      id: "telegram",
      name: "Telegram Bot",
      desc: "Interaja com a Nexxa diretamente pelo Telegram com comandos rápidos.",
      icon: Globe,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      category: "Comunicação",
      connected: false,
      status: "Em breve",
    },
    // Conhecimento
    {
      id: "kindle",
      name: "Kindle / Readwise",
      desc: "Importe seus destaques e anotações de leitura para o diário e memória da IA.",
      icon: BookOpen,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      category: "Conhecimento",
      connected: false,
      status: "Em breve",
    },
    {
      id: "spotify",
      name: "Spotify",
      desc: "Analise padrões de escuta para insights de humor e produtividade.",
      icon: Music,
      color: "text-green-600",
      bg: "bg-green-600/10",
      category: "Conhecimento",
      connected: false,
      status: "Em breve",
    },
    // Automações
    {
      id: "zapier",
      name: "Zapier",
      desc: "Conecte o NexxaLife a +5.000 aplicativos via automações customizadas.",
      icon: Zap,
      color: "text-orange-600",
      bg: "bg-orange-600/10",
      category: "Automações",
      connected: false,
      status: "Em breve",
    },
    {
      id: "webhooks",
      name: "Webhooks Customizados",
      desc: "Envie e receba dados em tempo real com endpoints webhook dedicados.",
      icon: Network,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      category: "Automações",
      connected: false,
      status: "Em breve",
    },
    {
      id: "api",
      name: "API REST",
      desc: "Acesse todos os seus dados programaticamente via API autenticada.",
      icon: BarChart3,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      category: "Automações",
      connected: false,
      status: "Em breve",
    },
  ]

  const categories = Array.from(new Set(integrations.map(i => i.category)))
  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <>
      <AppTopbar title="Integrações" subtitle="Conecte aplicativos externos ao seu ciclo" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 w-full">
        <PageHeader
          eyebrow="Ecossistema"
          title="Integrações"
          description={`${connectedCount} de ${integrations.length} conectadas — expanda o NexxaLife com seus aplicativos favoritos.`}
          actions={
            <Button variant="outline" size="sm" className="h-9 rounded-xl px-4 text-xs">
              Sugerir integração
            </Button>
          }
        />

        {/* Status resumo */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SectionCard noPadding>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-primary">{connectedCount}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Conectadas</p>
            </div>
          </SectionCard>
          <SectionCard noPadding>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-foreground">{integrations.length}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Disponíveis</p>
            </div>
          </SectionCard>
          <SectionCard noPadding>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-amber-500">{categories.length}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Categorias</p>
            </div>
          </SectionCard>
          <SectionCard noPadding>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-emerald-500">{integrations.length - connectedCount}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Em breve</p>
            </div>
          </SectionCard>
        </div>

        {/* Integration cards by category */}
        <div className="grid gap-8">
          {categories.map((cat) => (
            <SectionCard key={cat} title={cat}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {integrations.filter(i => i.category === cat).map((app) => {
                  const Icon = app.icon
                  return (
                    <div key={app.id} className="flex flex-col justify-between p-5 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-md gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn("flex-none h-12 w-12 rounded-xl flex items-center justify-center shadow-sm border border-border/40", app.bg, app.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-base font-bold text-foreground truncate">{app.name}</h4>
                            {app.connected ? (
                              <Badge variant="secondary" className="gap-1 rounded-full px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-500 font-bold uppercase tracking-wider border-0">
                                <CheckCircle2 className="h-3 w-3" /> Conectado
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-[10px] bg-muted text-muted-foreground font-bold uppercase tracking-wider border-0">
                                {app.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                            {app.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
                        <p className="text-xs font-medium text-muted-foreground">
                          {app.connected ? app.status : "Sincronização bidirecional"}
                        </p>
                        <Switch defaultChecked={app.connected} disabled={!app.connected} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </SectionCard>
          ))}
        </div>

        {/* Coming soon CTA */}
        <SectionCard variant="highlight">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Quer ver uma integração aqui?</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Estamos construindo o ecossistema do NexxaLife. Sugira uma integração e ajude a priorizar o que vem a seguir.
                As integrações marcadas como "Em breve" serão ativadas gradualmente nas próximas versões.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  )
}
