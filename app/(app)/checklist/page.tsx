import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeChecklistView } from "@/components/nexxa-life/nexxa-life-checklist-view"
import { getChecklist } from "@/lib/db/actions"

export default async function ChecklistPage() {
  const items = await getChecklist()

  return (
    <>
      <AppTopbar title="Checklist NexxaLife" subtitle="Foco diário — conquiste o dia, um item por vez" />
      <NexxaLifeChecklistView initialItems={items} />
    </>
  )
}
