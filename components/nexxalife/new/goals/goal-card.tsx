import type { Goal } from "../../../../lib/nexxalife/contracts"

import { SurfaceCard } from "../shell/surface-card"
import { StatePill } from "../shell/state-pill"
import { GoalProgress } from "./goal-progress"

const statusLabel: Record<Goal["status"], string> = {
  draft: "Rascunho",
  active: "Ativo",
  paused: "Pausado",
  completed: "Concluído",
}

const statusTone: Record<Goal["status"], "neutral" | "success" | "warning"> = {
  draft: "neutral",
  active: "success",
  paused: "warning",
  completed: "success",
}

export function GoalCard({ goal }: { goal: Goal }) {
  const progressTone = goal.status === "completed" ? "success" : goal.status === "paused" ? "muted" : "default"

  return (
    <SurfaceCard>
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <StatePill label={statusLabel[goal.status]} tone={statusTone[goal.status]} />
        {goal.pillar ? <span>{goal.pillar}</span> : null}
        {goal.targetDate ? <span>• alvo {goal.targetDate}</span> : null}
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold text-slate-950">{goal.title}</h3>
        {goal.description ? <p className="text-sm leading-6 text-slate-600">{goal.description}</p> : null}
      </div>
      <div className="mt-4">
        <GoalProgress progressPercent={goal.progressPercent} tone={progressTone} />
      </div>
    </SurfaceCard>
  )
}
