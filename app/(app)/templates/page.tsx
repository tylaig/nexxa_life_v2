import { AppTopbar } from "@/components/app-shell/app-topbar"
import { TemplatesListView } from "@/components/templates/templates-list-view"

export default function TemplatesPage() {
  return (
    <>
      <AppTopbar
        title="Templates HSM"
        subtitle="Catálogo com detalhe dedicado, edição full screen e governança inicial"
      />
      <TemplatesListView />
    </>
  )
}
