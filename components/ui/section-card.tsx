import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionCardProps {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  variant?: "default" | "highlight" | "muted"
  className?: string
  bodyClassName?: string
  noPadding?: boolean
}

/**
 * Card padronizado para seções de conteúdo dentro das páginas.
 */
export function SectionCard({
  title,
  description,
  action,
  children,
  variant = "default",
  className,
  bodyClassName,
  noPadding = false,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border",
        {
          "border-border/70 bg-card": variant === "default",
          "border-primary/20 bg-primary/5": variant === "highlight",
          "border-border/40 bg-muted/30": variant === "muted",
        },
        className
      )}
    >
      {(title || action) ? (
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
          <div>
            {title ? (
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className={cn(noPadding ? "" : "p-5", bodyClassName)}>{children}</div>
    </div>
  )
}
