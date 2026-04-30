import type { ChecklistTask } from "../../../../lib/nexxalife/contracts"

const statusMap: Record<ChecklistTask["status"], { label: string; className: string }> = {
  pending: { label: "Pendente", className: "bg-slate-100 text-slate-700" },
  done: { label: "Concluída", className: "bg-emerald-100 text-emerald-800" },
  blocked: { label: "Bloqueada", className: "bg-rose-100 text-rose-800" },
}

export function ChecklistTaskItem({ task }: { task: ChecklistTask }) {
  const status = statusMap[task.status]

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
            {task.plannedFor ? <span className="text-xs text-slate-500">{task.plannedFor}</span> : null}
          </div>
          <h3 className="text-base font-semibold text-slate-950">{task.title}</h3>
          {task.notes ? <p className="text-sm text-slate-600">{task.notes}</p> : null}
        </div>
      </div>
    </li>
  )
}
