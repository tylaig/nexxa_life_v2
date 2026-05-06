import { Bell, Sparkles, CheckCircle2, ShieldAlert, Target } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function LogsPage() {
  const notifications = [
    {
      id: 1,
      type: "ai",
      icon: Sparkles,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      title: "Planejamento Semanal Gerado",
      desc: "A IA Estrategista finalizou a organização da sua semana com base no seu último check-in.",
      time: "Há 10 minutos"
    },
    {
      id: 2,
      type: "goal",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      title: "Meta Concluída",
      desc: "Você completou 'Correr 5km 3x na semana'. Seu score de Saúde aumentou!",
      time: "Há 2 horas"
    },
    {
      id: 3,
      type: "system",
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      title: "Novo Acesso Detectado",
      desc: "Um novo login foi feito a partir de 'Mac OS / Chrome' em São Paulo, BR.",
      time: "Ontem às 14:30"
    },
    {
      id: 4,
      type: "task",
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      title: "Lembrete de Tarefa",
      desc: "Não esqueça: 'Reunião de Alinhamento' começa em 30 minutos.",
      time: "Ontem às 09:00"
    }
  ]

  return (
    <>
      <AppTopbar title="Notificações e Logs" subtitle="Acompanhe todas as atividades e alertas do seu sistema" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <PageHeader
        eyebrow="Central de Avisos"
        title="Notificações"
        description="Acompanhe atividades da IA, metas e alertas do sistema."
        actions={
          <Button variant="outline" size="sm" className="h-9 rounded-xl px-4 text-xs">
            Marcar todas como lidas
          </Button>
        }
      />

      <div className="grid gap-4">
        <SectionCard noPadding className="overflow-hidden">
          <div className="divide-y divide-border/40">
            {notifications.map((notif) => {
              const Icon = notif.icon
              return (
                <div key={notif.id} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors flex gap-4">
                  <div className={`flex-none h-10 w-10 rounded-full flex items-center justify-center ${notif.bg} ${notif.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{notif.title}</h4>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notif.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
    </>
  )
}
