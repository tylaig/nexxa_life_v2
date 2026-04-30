import { cn } from "@/lib/utils"

export function GoalProgress({
  progressPercent,
  tone = "default",
}: {
  progressPercent: number
  tone?: "default" | "success" | "muted"
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Progresso</span>
        <span>{progressPercent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            "h-full rounded-full bg-slate-900",
            tone === "success" && "bg-emerald-500",
            tone === "muted" && "bg-slate-400",
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
