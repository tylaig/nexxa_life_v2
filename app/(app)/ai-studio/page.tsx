import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiStudioHubView } from "@/components/ai-studio/ai-studio-hub-view"

export default function AiStudioPage() {
  return (
    <>
      <AppTopbar
        title="AI Studio"
        subtitle="Hub de agentes, knowledge e integrações que complementa a operação principal do NexxaLife"
      />
      <AiStudioHubView />
    </>
  )
}
