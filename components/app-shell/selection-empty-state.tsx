import * as React from "react"

import { cn } from "@/lib/utils"

type SelectionEmptyStateProps = {
  message: string
  className?: string
}

export function SelectionEmptyState({ message, className }: SelectionEmptyStateProps) {
  return (
    <div className={cn("rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground", className)}>
      {message}
    </div>
  )
}
