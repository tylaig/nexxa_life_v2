import { cn } from "@/lib/utils"

import { SurfaceCard } from "../shell/surface-card"

export function NexxaLifeSummaryCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string
  value: string
  hint?: string
  tone?: "neutral" | "accent"
}) {
  return (
    <SurfaceCard className={cn(tone === "accent" && "border-slate-900/10 bg-slate-950 text-white") }>
      <p className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-slate-500", tone === "accent" && "text-slate-300")}>{label}</p>
      <div className="mt-2 space-y-1.5">
        <p className={cn("text-2xl font-semibold tracking-tight text-slate-950", tone === "accent" && "text-white")}>{value}</p>
        {hint ? <p className={cn("text-sm text-slate-600", tone === "accent" && "text-slate-300")}>{hint}</p> : null}
      </div>
    </SurfaceCard>
  )
}
