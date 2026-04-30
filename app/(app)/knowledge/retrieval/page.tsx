import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeRetrievalView } from "@/components/knowledge/knowledge-retrieval-view"

export default function KnowledgeRetrievalPage() {
  return (
    <>
      <AppTopbar title="Retrieval console" subtitle="Consulta, debugging e leitura observável do fluxo RAG" />
      <KnowledgeRetrievalView />
    </>
  )
}
