import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
  children?: ReactNode
}

/**
 * Estado vazio reutilizável para listas, tabelas e painéis sem dados.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-12 text-center",
        className
      )}
    >
      {Icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}

      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="max-w-xs text-xs leading-5 text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {children}

      {(action || secondaryAction) ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {action ? (
            action.href ? (
              <Button asChild size="sm" className="h-8 rounded-xl px-4 text-xs">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button size="sm" className="h-8 rounded-xl px-4 text-xs" onClick={action.onClick}>
                {action.label}
              </Button>
            )
          ) : null}
          {secondaryAction ? (
            secondaryAction.href ? (
              <Button asChild variant="outline" size="sm" className="h-8 rounded-xl px-4 text-xs">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="h-8 rounded-xl px-4 text-xs" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
