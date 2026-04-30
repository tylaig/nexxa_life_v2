import { PlannedActionButton } from "../../../components/nexxalife/new/shell/planned-action-button"
import { SectionHeading } from "../../../components/nexxalife/new/shell/section-heading"
import { StatePill } from "../../../components/nexxalife/new/shell/state-pill"
import { SurfaceCard } from "../../../components/nexxalife/new/shell/surface-card"
import { ContentContainer } from "../../../components/nexxalife/new/shell/content-container"
import { NexxaLifeSummaryCard } from "../../../components/nexxalife/new/dashboard/summary-card"
import { GoalCard } from "../../../components/nexxalife/new/goals/goal-card"
import { ChecklistTaskList } from "../../../components/nexxalife/new/checklist/task-list"
import { MockContextNote } from "../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../components/nexxalife/new/shell/page-header"
import { mockChecklistTasks, mockDashboardSummary, mockGoals, mockProfile } from "../../../lib/nexxalife/mock"

export default function NexxaLifeDashboardPage() {
  const todayCompletionRate = `${Math.round((mockDashboardSummary.completedTasksToday / mockDashboardSummary.plannedTasksToday) * 100)}%`
  const blockedTasks = mockChecklistTasks.filter((task) => task.status === "blocked")

  return (
    <ContentContainer>
      <ModuleContextBar
        phase="Phase 1 • Visual Controlled"
        subtitle={`Base nova do NexxaLife para ${mockProfile.displayName}, com narrativa guiada por clareza, execução e rotina.`}
        action={<PlannedActionButton label="Preparar persistência" message="A persistência real entra na próxima macro-rodada com contratos evolutivos e repositórios desacoplados." />}
      />
      <NexxaLifePageHeader
        eyebrow="Dashboard"
        title="Seu panorama atual"
        description={mockDashboardSummary.focusMessage}
        primaryAction={{ label: "Continuar onboarding", href: "/nexxalife/onboarding", tone: "primary" }}
        secondaryActions={[{ label: "Ver objetivos", href: "/nexxalife/goals" }, { label: "Abrir checklist", href: "/nexxalife/checklist", tone: "ghost" }]}
      />
      <NexxaLifeLocalNav currentPath="/nexxalife" />
      <MockContextNote />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <NexxaLifeSummaryCard label="Base" value={mockDashboardSummary.scoreLabel} hint="Leitura honesta da fase atual sem score diagnóstico definitivo." tone="accent" />
        <NexxaLifeSummaryCard label="Focos principais" value={mockProfile.focusAreas.join(" • ")} hint="Áreas usadas para orientar a primeira onda visual." />
        <NexxaLifeSummaryCard label="Objetivos ativos" value={String(mockDashboardSummary.activeGoals)} hint="Recorte operacional inicial do módulo." />
        <NexxaLifeSummaryCard label="Execução do dia" value={todayCompletionRate} hint={`${mockDashboardSummary.completedTasksToday} de ${mockDashboardSummary.plannedTasksToday} tarefas previstas.`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Objetivos em curso"
            title="Frentes prioritárias da primeira onda"
            description="O dashboard passa a reforçar o mesmo recorte narrativo das superfícies de goals e checklist."
            aside={<StatePill label="Wave 1" tone="success" />}
          />
          <div className="grid gap-4">
            {mockGoals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Execução do dia"
            title="Ritmo operacional controlado"
            description="Uma leitura rápida da cadência diária, com foco no que já andou e no que ainda bloqueia o avanço."
          />
          <ChecklistTaskList tasks={mockChecklistTasks.slice(0, 3)} />
        </SurfaceCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Narrativa atual"
            title="Momento do usuário nesta fundação"
            description={mockProfile.lifeContext}
          />
          <div className="grid gap-3 md:grid-cols-3">
            {mockProfile.focusAreas.map((area) => (
              <div key={area} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                {area}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Atenção"
            title="Bloqueios ainda visíveis"
            description="A fundação nova já explicita o que ainda está travado, sem esconder o estado real do fluxo."
          />
          {blockedTasks.length > 0 ? <ChecklistTaskList tasks={blockedTasks} /> : <p className="text-sm text-slate-600">Nenhum bloqueio registrado nas fixtures atuais.</p>}
        </SurfaceCard>
      </section>
    </ContentContainer>
  )
}
