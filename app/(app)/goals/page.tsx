import { AppTopbar } from "@/components/app-shell/app-topbar"
import { goalsHero } from "@/components/meu-dia/goals-content"
import { NexxaLifeGoalsView } from "@/components/meu-dia/meu-dia-goals-view"

export default function GoalsPage() {
  return (
    <>
      <AppTopbar title="Metas nexxa_life" subtitle={goalsHero.description} />
      <NexxaLifeGoalsView />
    </>
  )
}
