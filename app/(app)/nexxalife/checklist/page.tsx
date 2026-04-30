import { ChecklistTaskList } from "../../../../components/nexxalife/new/checklist/task-list"
import { PlannedActionButton } from "../../../../components/nexxalife/new/shell/planned-action-button"
import { SectionHeading } from "../../../../components/nexxalife/new/shell/section-heading"
import { StatePill } from "../../../../components/nexxalife/new/shell/state-pill"
import { SurfaceCard } from "../../../../components/nexxalife/new/shell/surface-card"
import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockChecklistTasks } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeChecklistPage() {
  const completed = mockChecklistTasks.filter((task) => task.status === "done").length
  const blocked = mockChecklistTasks.filter((task) => task.status === "blocked").length
  const pending = mockChecklistTasks.filter((task) => task.status === "pending").length
  const blockedTasks = mockChecklistTasks.filter((task) => task.status === "blocked")

  return (
    <ContentContainer>
      <ModuleContextBar
        phase="Phase 1 • Visual Controlled"
        subtitle="Checklist diário com estados explícitos, pronto para validação de UX e posterior ligação com persistência real."
        action={<PlannedActionButton label="Habilitar interação" message="Interações reais de checklist entram depois da camada de contratos evolutivos e persistência controlada." />}
      />
      <NexxaLifePageHeader
        eyebrow="Checklist"
        title="Execução do dia"
        description="A superfície de checklist prioriza leitura rápida, status claros e diferenciação entre progresso e bloqueio."
        primaryAction={{ label: "Voltar ao dashboard", href: "/nexxalife", tone: "primary" }}
        secondaryActions={[{ label: "Ver objetivos", href: "/nexxalife/goals" }]}
      />
      <NexxaLifeLocalNav currentPath="/nexxalife/checklist" />
      <MockContextNote label="Checklist com tarefas controladas" />

      <section className="grid gap-4 md:grid-cols-3">
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Concluídas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{completed}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bloqueadas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{blocked}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Em aberto</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{pending}</p>
        </SurfaceCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Lista principal"
            title="Tarefas do dia"
            description="A composição reforça leitura operacional rápida, com cards homogêneos e status explícitos."
          />
          <ChecklistTaskList tasks={mockChecklistTasks} />
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Risco operacional"
            title="Bloqueios e atenção"
            description="Separação explícita entre execução normal e itens travados para evitar confusão de estado."
            aside={<StatePill label={blocked > 0 ? "Há bloqueios" : "Fluxo livre"} tone={blocked > 0 ? "danger" : "success"} />}
          />
          {blockedTasks.length > 0 ? (
            <ChecklistTaskList tasks={blockedTasks} />
          ) : (
            <p className="text-sm text-slate-600">Nenhuma tarefa bloqueada nas fixtures atuais.</p>
          )}
        </SurfaceCard>
      </section>
    </ContentContainer>
  )
}
