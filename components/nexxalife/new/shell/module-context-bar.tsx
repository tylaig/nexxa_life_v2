import type { ReactNode } from "react"

import { SurfaceCard } from "./surface-card"

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
    <SurfaceCard className="border-slate-200/70 bg-white/80">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Módulo</span>
            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">{phase}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
        {action ? <div className="flex items-center gap-2">{action}</div> : null}
      </div>
    </SurfaceCard>
  )
}
