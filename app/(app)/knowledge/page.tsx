import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeOverviewView } from "@/components/knowledge/knowledge-overview-view"

export default function KnowledgePage() {
  return (
    <>
      <AppTopbar title="Base de conhecimento" subtitle="Catálogo operacional com detalhe dedicado e retrieval observável" />
      <KnowledgeOverviewView />
    </>
  )
}
