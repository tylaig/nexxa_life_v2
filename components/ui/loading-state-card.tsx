import { Skeleton } from "@/components/ui/skeleton"

export function LoadingStateCard({
  title = "Carregando",
  description = "Sincronizando dados operacionais.",
  lines = 3,
}: {
  title?: string
  description?: string
  lines?: number
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    </div>
  )
}
