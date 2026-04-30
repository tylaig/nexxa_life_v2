import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiAgentStudioView } from "@/components/ai-studio/ai-agent-studio-view"

export default async function EditAiAgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>
}) {
  const { agentId } = await params

  return (
    <>
      <AppTopbar
        title="Editar agente"
        subtitle="Edição full screen com resumo lateral e governança inicial"
      />
      <AiAgentStudioView mode="edit" agentId={agentId} />
    </>
  )
}
