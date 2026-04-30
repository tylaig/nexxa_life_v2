import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeDocumentDetailView } from "@/components/knowledge/knowledge-document-detail-view"

export default async function KnowledgeDocumentPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params

  return (
    <>
      <AppTopbar title="Document detail" subtitle="Conteúdo bruto, chunks materializados e vínculo com a source" />
      <KnowledgeDocumentDetailView documentId={documentId} />
    </>
  )
}
