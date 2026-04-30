import { AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlockedStateCard({
  title,
  description,
  requirement,
  action,
}: {
  title: string
  description: string
  requirement?: string
  action?: React.ReactNode
}) {
  return (
    <Card className="border-amber-200/70 bg-amber-50/40 dark:border-amber-500/30 dark:bg-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-amber-900 dark:text-amber-100">
          <AlertCircle className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription className="text-amber-800/80 dark:text-amber-100/70">{description}</CardDescription>
      </CardHeader>
      {requirement || action ? (
        <CardContent className="space-y-3">
          {requirement ? (
            <div className="rounded-lg border border-amber-200/80 bg-background/80 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-background/20 dark:text-amber-100">
              Pré-requisito: {requirement}
            </div>
          ) : null}
          {action}
        </CardContent>
      ) : null}
    </Card>
  )
}
