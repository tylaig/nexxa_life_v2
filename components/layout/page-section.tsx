import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  headerActions?: React.ReactNode
}

export const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
  ({ className, title, description, headerActions, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("flex flex-col gap-5", className)} {...props}>
        {(title || description || headerActions) && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
              {description && <p className="text-[13px] text-muted-foreground">{description}</p>}
            </div>
            {headerActions && <div className="flex items-center shrink-0">{headerActions}</div>}
          </div>
        )}
        <div className="flex-1">{children}</div>
      </section>
    )
  }
)
PageSection.displayName = "PageSection"
