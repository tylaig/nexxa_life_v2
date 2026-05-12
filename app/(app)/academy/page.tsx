import { AppTopbar } from "@/components/app-shell/app-topbar"
import { academyHero } from "@/components/nexxa-life/academy-content"
import { NexxaLifeAcademyView } from "@/components/nexxa-life/nexxa-life-academy-view"

export default function AcademyPage() {
  return (
    <>
      <AppTopbar title={academyHero.title} subtitle={academyHero.description} />
      <NexxaLifeAcademyView />
    </>
  )
}
