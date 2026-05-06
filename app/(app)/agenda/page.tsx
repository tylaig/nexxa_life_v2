import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeAgendaView } from "@/components/meu-dia/meu-dia-agenda-view"
import { getAgenda } from "@/lib/db/actions"

export default async function AgendaPage() {
  const events = await getAgenda()

  return (
    <>
      <AppTopbar title="Agenda NexxaLife" subtitle="Organize e otimize seu tempo com clareza" />
      <NexxaLifeAgendaView events={events} />
    </>
  )
}
