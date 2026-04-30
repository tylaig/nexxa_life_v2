import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type OperationalAlertBannerProps = {
  icon: LucideIcon
  title: string
  description: string
  meta?: React.ReactNode
  className?: string
}

export function OperationalAlertBanner({
  icon: Icon,
  title,
  description,
  meta,
  className,
}: OperationalAlertBannerProps) {
  return (
    <div className={cn("rounded-2xl border border-[var(--status-pending-bg)] bg-[var(--status-pending-bg)]/60 px-4 py-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Icon className="h-4 w-4 text-[var(--status-pending)]" />
            {title}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {meta ? (
          <div className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  )
}
