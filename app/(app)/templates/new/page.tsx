import { AppTopbar } from "@/components/app-shell/app-topbar"
import { TemplateStudioView } from "@/components/templates/template-studio-view"

export default function NewTemplatePage() {
  return (
    <>
      <AppTopbar
        title="Novo template"
        subtitle="Criação full screen com preview lateral e governança inicial"
      />
      <TemplateStudioView mode="create" />
    </>
  )
}
