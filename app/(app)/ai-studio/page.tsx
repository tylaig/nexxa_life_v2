import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiStudioHubView } from "@/components/ai-studio/ai-studio-hub-view"

export default function AiStudioPage() {
  return (
    <>
      <AppTopbar
        title="AI Studio"
        subtitle="Hub visual dos agentes, integrações ativas, knowledge e postura operacional da malha de IA"
      />
      <AiStudioHubView />
    </>
  )
}
