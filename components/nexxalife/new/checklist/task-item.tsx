import type { ChecklistTask } from "../../../../lib/nexxalife/contracts"

import { SurfaceCard } from "../shell/surface-card"
import { StatePill } from "../shell/state-pill"

const statusMap: Record<ChecklistTask["status"], { label: string; tone: "neutral" | "success" | "danger" }> = {
  pending: { label: "Pendente", tone: "neutral" },
  done: { label: "Concluída", tone: "success" },
  blocked: { label: "Bloqueada", tone: "danger" },
}

export function ChecklistTaskItem({ task }: { task: ChecklistTask }) {
  const status = statusMap[task.status]

  return (
    <li>
      <SurfaceCard className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatePill label={status.label} tone={status.tone} />
              {task.plannedFor ? <span className="text-xs text-slate-500">{task.plannedFor}</span> : null}
            </div>
            <h3 className="text-base font-semibold text-slate-950">{task.title}</h3>
            {task.notes ? <p className="text-sm leading-6 text-slate-600">{task.notes}</p> : null}
          </div>
        </div>
      </SurfaceCard>
    </li>
  )
}
