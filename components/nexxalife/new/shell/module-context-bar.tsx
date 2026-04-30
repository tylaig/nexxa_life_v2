import type { ReactNode } from "react"

export function ModuleContextBar({
  phase,
  title = "NexxaLife",
  subtitle,
  action,
}: {
  phase: string
  title?: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Módulo</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{phase}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="max-w-3xl text-sm text-slate-600">{subtitle}</p>
        </div>
        {action ? <div className="flex items-center gap-2">{action}</div> : null}
      </div>
    </div>
  )
}
