import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function ContentContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.12),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <div className={cn("flex w-full flex-col gap-6", className)}>{children}</div>
      </div>
    </div>
  )
}
