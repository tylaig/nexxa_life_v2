import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeOverviewView } from "@/components/knowledge/knowledge-overview-view"

export default function KnowledgePage() {
  return (
    <>
      <AppTopbar title="Knowledge" subtitle="Infraestrutura de grounding e retrieval que complementa AI Studio e a operação do NexxaLife" />
      <KnowledgeOverviewView />
    </>
  )
}
