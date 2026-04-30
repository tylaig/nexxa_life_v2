import type { Goal } from "../../../../lib/nexxalife/contracts"
import { GoalProgress } from "./goal-progress"

const statusLabel: Record<Goal["status"], string> = {
  draft: "Rascunho",
  active: "Ativo",
  paused: "Pausado",
  completed: "Concluído",
}

export function GoalCard({ goal }: { goal: Goal }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{statusLabel[goal.status]}</span>
        {goal.pillar ? <span>{goal.pillar}</span> : null}
        {goal.targetDate ? <span>• alvo {goal.targetDate}</span> : null}
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold text-slate-950">{goal.title}</h3>
        {goal.description ? <p className="text-sm text-slate-600">{goal.description}</p> : null}
      </div>
      <div className="mt-4">
        <GoalProgress progressPercent={goal.progressPercent} />
      </div>
    </article>
  )
}
