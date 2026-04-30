import { PlannedActionButton } from "../../../../components/nexxalife/new/shell/planned-action-button"
import { SectionHeading } from "../../../../components/nexxalife/new/shell/section-heading"
import { StatePill } from "../../../../components/nexxalife/new/shell/state-pill"
import { SurfaceCard } from "../../../../components/nexxalife/new/shell/surface-card"
import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockOnboarding, mockOnboardingSteps, mockProfile } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeOnboardingPage() {
  return (
    <ContentContainer>
      <ModuleContextBar
        phase="Phase 1 • Visual Controlled"
        subtitle="Onboarding reconstruído como trilha clara de ativação, sem carregar a engine do legado."
        action={<PlannedActionButton label="Abrir formulário real" message="O formulário real será conectado depois da estabilização visual e da modelagem de domínio." />}
      />
      <NexxaLifePageHeader
        eyebrow="Onboarding"
        title="Começar sua base"
        description={`O perfil de ${mockProfile.displayName} já possui contexto inicial e agora precisa fechar disponibilidade, ritmo e revisão final.`}
        primaryAction={{ label: "Voltar ao dashboard", href: "/nexxalife", tone: "primary" }}
        secondaryActions={[{ label: "Ver objetivos", href: "/nexxalife/goals" }]}
      />
      <NexxaLifeLocalNav currentPath="/nexxalife/onboarding" />
      <MockContextNote label="Fixture de onboarding controlada" />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard className="space-y-4">
          <SectionHeading
            eyebrow="Etapas"
            title="Trilha de ativação"
            description="A estrutura desta página já prepara uma futura progressão real sem depender da lógica antiga."
            aside={<StatePill label={mockOnboarding.readinessLevel === "in_progress" ? "Em andamento" : "Inicial"} tone="warning" />}
          />
          <div className="space-y-3">
            {mockOnboardingSteps.map((step, index) => {
              const tone = step.status === "completed" ? "bg-emerald-100 text-emerald-800" : step.status === "current" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"
              const subtitle = step.status === "completed" ? "Etapa já consolidada na fixture." : step.status === "current" ? "Etapa ativa na macro-rodada atual." : "Etapa futura preparada na sequência do fluxo."

              return (
                <div key={step.key} className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${tone}`}>{index + 1}</span>
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-950">{step.label}</h3>
                    <p className="text-sm text-slate-600">{subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <SectionHeading eyebrow="Resumo de ativação" title="Perfil em construção" description="O painel lateral resume o contexto que já existe para orientar próximas decisões de UX e domínio." />
          <dl className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <dt className="font-medium text-slate-950">Step atual</dt>
              <dd>{mockOnboarding.currentStep}</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-slate-950">Etapas concluídas</dt>
              <dd>{mockOnboarding.completedSteps.join(", ")}</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-slate-950">Readiness</dt>
              <dd>{mockOnboarding.readinessLevel}</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-slate-950">Focos iniciais</dt>
              <dd>{mockProfile.focusAreas.join(" • ")}</dd>
            </div>
          </dl>
        </SurfaceCard>
      </section>
    </ContentContainer>
  )
}
