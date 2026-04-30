import { AppTopbar } from "@/components/app-shell/app-topbar"
import { goalsHero } from "@/components/meu-dia/goals-content"
import { MeuDiaGoalsView } from "@/components/meu-dia/meu-dia-goals-view"

export default function GoalsPage() {
  return (
    <>
      <AppTopbar title="Metas Meu Dia" subtitle={goalsHero.description} />
      <MeuDiaGoalsView />
    </>
  )
}
