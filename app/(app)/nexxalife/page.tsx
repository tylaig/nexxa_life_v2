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

  return (
    <ContentContainer>
      <ModuleContextBar
        phase="Phase 1 • Visual Controlled"
        subtitle={`Base nova do NexxaLife para ${mockProfile.displayName}, com narrativa guiada por clareza, execução e rotina.`}
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
        <NexxaLifeSummaryCard label="Base" value={mockDashboardSummary.scoreLabel} hint="Leitura honesta da fase atual sem score diagnóstico definitivo." />
        <NexxaLifeSummaryCard label="Focos principais" value={mockProfile.focusAreas.join(" • ")} hint="Áreas usadas para orientar a primeira onda visual." />
        <NexxaLifeSummaryCard label="Objetivos ativos" value={String(mockDashboardSummary.activeGoals)} hint="Recorte operacional inicial do módulo." />
        <NexxaLifeSummaryCard label="Execução do dia" value={todayCompletionRate} hint={`${mockDashboardSummary.completedTasksToday} de ${mockDashboardSummary.plannedTasksToday} tarefas previstas.`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Objetivos em curso</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Frentes prioritárias da primeira onda</h3>
          </div>
          <div className="grid gap-4">
            {mockGoals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Execução do dia</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Ritmo operacional controlado</h3>
          </div>
          <ChecklistTaskList tasks={mockChecklistTasks.slice(0, 3)} />
        </div>
      </section>
    </ContentContainer>
  )
}
