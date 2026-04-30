import { AppTopbar } from "@/components/app-shell/app-topbar"
import { academyHero } from "@/components/meu-dia/academy-content"
import { NexxaLifeAcademyView } from "@/components/meu-dia/meu-dia-academy-view"

export default function AcademyPage() {
  return (
    <>
      <AppTopbar title={academyHero.title} subtitle={academyHero.description} />
      <NexxaLifeAcademyView />
    </>
  )
}
