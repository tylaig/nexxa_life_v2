import * as React from "react"

import { cn } from "@/lib/utils"

type SummaryMetricCardProps = {
  label: string
  value: React.ReactNode
  className?: string
}

export function SummaryMetricCard({ label, value, className }: SummaryMetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-background/60 p-3", className)}>
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
