import { ContentContainer } from "../../../../components/nexxalife/new/shell/content-container"
import { MockContextNote } from "../../../../components/nexxalife/new/shell/mock-context-note"
import { NexxaLifeLocalNav } from "../../../../components/nexxalife/new/shell/local-nav"
import { ModuleContextBar } from "../../../../components/nexxalife/new/shell/module-context-bar"
import { NexxaLifePageHeader } from "../../../../components/nexxalife/new/shell/page-header"
import { mockOnboarding, mockOnboardingSteps, mockProfile } from "../../../../lib/nexxalife/mock"

export default function NexxaLifeOnboardingPage() {
  return (
    <ContentContainer>
      <ModuleContextBar phase="Phase 1 • Visual Controlled" subtitle="Onboarding reconstruído como trilha clara de ativação, sem carregar a engine do legado." />
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
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Etapas</p>
          <div className="mt-4 space-y-3">
            {mockOnboardingSteps.map((step, index) => {
              const tone = step.status === "completed" ? "bg-emerald-100 text-emerald-800" : step.status === "current" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
              return (
                <div key={step.key} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${tone}`}>{index + 1}</span>
                  <div>
                    <h3 className="font-medium text-slate-950">{step.label}</h3>
                    <p className="text-sm text-slate-600">Status atual: {step.status}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Resumo de ativação</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Perfil em construção</h3>
          </div>
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-medium text-slate-950">Step atual</dt>
              <dd>{mockOnboarding.currentStep}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-950">Etapas concluídas</dt>
              <dd>{mockOnboarding.completedSteps.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-950">Readiness</dt>
              <dd>{mockOnboarding.readinessLevel}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-950">Focos iniciais</dt>
              <dd>{mockProfile.focusAreas.join(" • ")}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </ContentContainer>
  )
}
