import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

interface KpiTileProps {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number // positivo = bom, negativo = ruim
    label?: string
  }
  accent?: "teal" | "blue" | "emerald" | "violet" | "amber"
  className?: string
}

const accentMap = {
  teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

/**
 * Tile de métrica compacta para dashboards e relatórios.
 */
export function KpiTile({ label, value, icon: Icon, trend, accent = "teal", className }: KpiTileProps) {
  const isPositive = trend ? trend.value >= 0 : null
  const TrendIcon = trend ? (isPositive ? TrendingUp : TrendingDown) : null

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", accentMap[accent])}>
            <Icon className="h-4.5 w-4.5" />
          </div>
        ) : null}
        {TrendIcon && trend ? (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ""}
          </div>
        ) : null}
      </div>

      <div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}
