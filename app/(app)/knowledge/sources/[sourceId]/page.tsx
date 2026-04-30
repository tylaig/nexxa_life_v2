import { AppTopbar } from "@/components/app-shell/app-topbar"
import { KnowledgeSourceDetailView } from "@/components/knowledge/knowledge-source-detail-view"

export default async function KnowledgeSourcePage({
  params,
}: {
  params: Promise<{ sourceId: string }>
}) {
  const { sourceId } = await params

  return (
    <>
      <AppTopbar title="Source detail" subtitle="Status de ingestão, documentos e acesso ao retrieval console" />
      <KnowledgeSourceDetailView sourceId={sourceId} />
    </>
  )
}
