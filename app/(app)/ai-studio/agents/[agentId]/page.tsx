import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiAgentDetailView } from "@/components/ai-studio/ai-agent-detail-view"

export default async function AiAgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>
}) {
  const { agentId } = await params

  return (
    <>
      <AppTopbar
        title="Agent detail"
        subtitle="Resumo executivo, performance, guardrails e relacionamentos do agente"
      />
      <AiAgentDetailView agentId={agentId} />
    </>
  )
}
