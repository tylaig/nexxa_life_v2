import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiAgentStudioView } from "@/components/ai-studio/ai-agent-studio-view"

export default function NewAiAgentPage() {
  return (
    <>
      <AppTopbar
        title="Novo agente"
        subtitle="Criação full screen para função, modelo, ferramentas e guardrails"
      />
      <AiAgentStudioView mode="create" />
    </>
  )
}
