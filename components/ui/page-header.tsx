import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  badge?: ReactNode
  actions?: ReactNode
  className?: string
}

/**
 * Cabeçalho padronizado para todas as páginas do ciclo NexxaLife.
 * Uso: <PageHeader title="Metas" description="Acompanhe seu progresso" />
 */
export function PageHeader({ eyebrow, title, description, badge, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="space-y-1">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
        ) : null}
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h1>
          {badge ? badge : null}
        </div>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2 pt-1 sm:pt-0">{actions}</div>
      ) : null}
    </div>
  )
}
