import { ChecklistTaskList } from "../../../../components/nexxalife/new/checklist/task-list"
import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockChecklistTasks } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeChecklistPage() {
  const completed = mockChecklistTasks.filter((task) => task.status === "done").length
  const blocked = mockChecklistTasks.filter((task) => task.status === "blocked").length

  return (
    <ContentContainer>
      <ModuleContextBar phase="Phase 1 • Visual Controlled" subtitle="Checklist diário com estados explícitos, pronto para validação de UX e posterior ligação com persistência real." />
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Concluídas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{completed}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bloqueadas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{blocked}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Em aberto</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{mockChecklistTasks.length - completed}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <ChecklistTaskList tasks={mockChecklistTasks} />
      </section>
    </ContentContainer>
  )
}
