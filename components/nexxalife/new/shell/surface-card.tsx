import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </section>
  )
}
