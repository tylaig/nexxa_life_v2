import { AppTopbar } from "@/components/app-shell/app-topbar"
import { SkillsView } from "@/components/skills/skills-view"

export default function SkillsPage() {
  return (
    <>
      <AppTopbar title="AI Skills" subtitle="Catálogo real com versionamento inicial e variáveis detectadas" />
      <SkillsView />
    </>
  )
}
