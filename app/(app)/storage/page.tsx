import { AppTopbar } from "@/components/app-shell/app-topbar"
import { StorageOverviewView } from "@/components/storage/storage-overview-view"

export default function StoragePage() {
  return (
    <>
      <AppTopbar title="Storage" subtitle="Assets, pastas e materiais acessíveis no contexto do workspace e dos agentes" />
      <StorageOverviewView />
    </>
  )
}
