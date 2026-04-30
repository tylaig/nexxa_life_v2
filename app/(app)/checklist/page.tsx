import { AppTopbar } from "@/components/app-shell/app-topbar"
import { MeuDiaChecklistView } from "@/components/meu-dia/meu-dia-checklist-view"
import { checklistHero } from "@/components/meu-dia/checklist-content"

export default function ChecklistPage() {
  return (
    <>
      <AppTopbar title="Checklist Meu Dia" subtitle={checklistHero.description} />
      <MeuDiaChecklistView />
    </>
  )
}
