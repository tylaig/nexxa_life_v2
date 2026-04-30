import { GoalCard } from "../../../../components/nexxalife/new/goals/goal-card"
import { PlannedActionButton } from "../../../../components/nexxalife/new/shell/planned-action-button"
import { SectionHeading } from "../../../../components/nexxalife/new/shell/section-heading"
import { StatePill } from "../../../../components/nexxalife/new/shell/state-pill"
import { SurfaceCard } from "../../../../components/nexxalife/new/shell/surface-card"
import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockGoals } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeGoalsPage() {
  const activeGoals = mockGoals.filter((goal) => goal.status === "active").length
  const completedGoals = mockGoals.filter((goal) => goal.status === "completed").length

  return (
    <ContentContainer>
      <ModuleContextBar
        phase="Phase 1 • Visual Controlled"
        subtitle="Objetivos e metas recriados com contratos novos e progressos honestos, sem importar a lógica antiga."
        action={<PlannedActionButton label="Abrir filtros reais" message="Filtros interativos entram na próxima iteração, depois da consolidação visual e dos adapters de dados." />}
      />
      <NexxaLifePageHeader
        eyebrow="Objetivos & Metas"
        title="Objetivos e metas"
        description="Lista inicial para validar cards, progresso, priorização e leitura estratégica do módulo."
        primaryAction={{ label: "Voltar ao dashboard", href: "/nexxalife", tone: "primary" }}
        secondaryActions={[{ label: "Abrir checklist", href: "/nexxalife/checklist" }]}
      />
      <NexxaLifeLocalNav currentPath="/nexxalife/goals" />
      <MockContextNote label="Goals controladas da onda 1" />

      <section className="grid gap-4 md:grid-cols-3">
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Objetivos ativos</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{activeGoals}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Concluídos</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{completedGoals}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Leitura atual</p>
          <div className="mt-2 flex items-center gap-2">
            <StatePill label="Sem engine final" tone="warning" />
          </div>
        </SurfaceCard>
      </section>

      <SurfaceCard className="space-y-4">
        <SectionHeading
          eyebrow="Portfólio atual"
          title="Objetivos priorizados"
          description="A página já suporta leitura estratégica, mesmo antes de existir filtro, persistência ou detalhamento real."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {mockGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </SurfaceCard>
    </ContentContainer>
  )
}
