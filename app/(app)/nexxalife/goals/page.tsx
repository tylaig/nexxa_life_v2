import { GoalCard } from "../../../../components/nexxalife/new/goals/goal-card"
import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockGoals } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeGoalsPage() {
  return (
    <ContentContainer>
      <ModuleContextBar phase="Phase 1 • Visual Controlled" subtitle="Objetivos e metas recriados com contratos novos e progressos honestos, sem importar a lógica antiga." />
      <NexxaLifePageHeader
        eyebrow="Objetivos & Metas"
        title="Objetivos e metas"
        description="Lista inicial para validar cards, progresso, priorização e leitura estratégica do módulo."
        primaryAction={{ label: "Voltar ao dashboard", href: "/nexxalife", tone: "primary" }}
        secondaryActions={[{ label: "Abrir checklist", href: "/nexxalife/checklist" }]}
      />
      <NexxaLifeLocalNav currentPath="/nexxalife/goals" />
      <MockContextNote label="Goals controladas da onda 1" />

      <section className="grid gap-4 md:grid-cols-2">
        {mockGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </section>
    </ContentContainer>
  )
}
