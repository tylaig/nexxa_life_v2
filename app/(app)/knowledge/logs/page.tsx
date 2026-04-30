import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeLogsView } from "@/components/knowledge/knowledge-logs-view"

export default function KnowledgeLogsPage() {
  return (
    <>
      <AppTopbar title="Knowledge logs" subtitle="Observabilidade inicial de retrieval, consultas e documentos encontrados" />
      <KnowledgeLogsView />
    </>
  )
}
