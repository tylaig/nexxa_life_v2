import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AiAgentsListView } from "@/components/ai-studio/ai-agents-list-view"

export default function AiAgentsPage() {
  return (
    <>
      <AppTopbar
        title="AI Studio · Agentes"
        subtitle="Board operacional com apresentação mais clara dos agentes, métricas e integrações conectadas"
      />
      <AiAgentsListView />
    </>
  )
}
