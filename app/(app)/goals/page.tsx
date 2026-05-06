import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeGoalsView } from "@/components/meu-dia/meu-dia-goals-view"
import { getGoals } from "@/lib/db/actions"

export default async function GoalsPage() {
  const goals = await getGoals()

  return (
    <>
      <AppTopbar title="Metas NexxaLife" subtitle="Defina, acompanhe e conquiste seus objetivos" />
      <NexxaLifeGoalsView goals={goals} />
    </>
  )
}
