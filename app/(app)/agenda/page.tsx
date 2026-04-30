import { AppTopbar } from "@/components/app-shell/app-topbar"
import { agendaHero } from "@/components/meu-dia/agenda-content"
import { NexxaLifeAgendaView } from "@/components/meu-dia/meu-dia-agenda-view"

export default function AgendaPage() {
  return (
    <>
      <AppTopbar title="Agenda nexxa_life" subtitle={agendaHero.description} />
      <NexxaLifeAgendaView />
    </>
  )
}
