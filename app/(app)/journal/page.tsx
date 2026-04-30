import { AppTopbar } from "@/components/app-shell/app-topbar"
import { journalHero } from "@/components/meu-dia/journal-content"
import { NexxaLifeJournalView } from "@/components/meu-dia/meu-dia-journal-view"

export default function JournalPage() {
  return (
    <>
      <AppTopbar title={journalHero.title} subtitle={journalHero.description} />
      <NexxaLifeJournalView />
    </>
  )
}
