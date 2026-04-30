import { AppTopbar } from "@/components/app-shell/app-topbar"
import { TemplateDetailView } from "@/components/templates/template-detail-view"

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ templateId: string }>
}) {
  const { templateId } = await params

  return (
    <>
      <AppTopbar
        title="Template detail"
        subtitle="Preview, métricas, metadados e governança de publicação"
      />
      <TemplateDetailView templateId={templateId} />
    </>
  )
}
