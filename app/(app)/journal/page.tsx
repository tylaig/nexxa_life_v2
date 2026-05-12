import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeJournalView } from "@/components/nexxa-life/nexxa-life-journal-view"
import { getJournalEntries } from "@/lib/db/actions"

export default async function JournalPage() {
  const entries = await getJournalEntries()

  return (
    <>
      <AppTopbar title="Diário NexxaLife" subtitle="Registre reflexões e acompanhe sua evolução" />
      <NexxaLifeJournalView entries={entries} />
    </>
  )
}
