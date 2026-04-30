import type { LucideIcon } from "lucide-react"
import { AlertTriangle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ErrorStateCard({
  title = "Algo deu errado",
  description,
  tone = "default",
  icon: Icon = AlertTriangle,
  action,
}: {
  title?: string
  description: string
  tone?: "default" | "degraded" | "critical"
  icon?: LucideIcon
  action?: React.ReactNode
}) {
  const toneClassName =
    tone === "critical"
      ? "border-rose-300/80"
      : tone === "degraded"
        ? "border-amber-200/70"
        : "border-rose-200/60"

  const titleClassName =
    tone === "critical"
      ? "text-rose-700 dark:text-rose-300"
      : tone === "degraded"
        ? "text-amber-700 dark:text-amber-300"
        : "text-rose-700 dark:text-rose-300"

  return (
    <Card className={toneClassName}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 text-base ${titleClassName}`}>
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {action ? <CardContent>{action}</CardContent> : null}
    </Card>
  )
}
