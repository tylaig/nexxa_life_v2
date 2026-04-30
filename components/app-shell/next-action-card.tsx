import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type NextActionCardProps = {
  title?: string
  description: React.ReactNode
  icon?: LucideIcon
  className?: string
}

export function NextActionCard({
  title = "Próxima ação sugerida",
  description,
  icon: Icon,
  className,
}: NextActionCardProps) {
  return (
    <div className={cn("rounded-lg border border-dashed border-border p-3", className)}>
      <div className="flex items-center gap-2 text-sm font-medium">
        {Icon ? <Icon className="h-4 w-4 text-emerald-600" /> : null}
        {title}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{description}</div>
    </div>
  )
}
