import { AppTopbar } from "@/components/app-shell/app-topbar"
import { journalHero } from "@/components/meu-dia/journal-content"
import { MeuDiaJournalView } from "@/components/meu-dia/meu-dia-journal-view"

export default function JournalPage() {
  return (
    <>
      <AppTopbar title={journalHero.title} subtitle={journalHero.description} />
      <MeuDiaJournalView />
    </>
  )
}
