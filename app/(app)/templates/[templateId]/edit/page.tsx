import { AppTopbar } from "@/components/app-shell/app-topbar"
import { TemplateStudioView } from "@/components/templates/template-studio-view"

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ templateId: string }>
}) {
  const { templateId } = await params

  return (
    <>
      <AppTopbar
        title="Editar template"
        subtitle="Edição full screen com rail lateral de preview e revisão"
      />
      <TemplateStudioView mode="edit" templateId={templateId} />
    </>
  )
}
