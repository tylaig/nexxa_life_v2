import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeChecklistView } from "@/components/meu-dia/meu-dia-checklist-view"
import { checklistHero } from "@/components/meu-dia/checklist-content"

export default function ChecklistPage() {
  return (
    <>
      <AppTopbar title="Checklist NexxaLife" subtitle={checklistHero.description} />
      <NexxaLifeChecklistView />
    </>
  )
}
