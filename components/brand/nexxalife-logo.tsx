import Image from "next/image"

import { cn } from "@/lib/utils"

export function NexxaLifeMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/nexxalife-mark.svg"
      alt="NexxaLife"
      width={48}
      height={48}
      priority={priority}
      className={cn("h-9 w-9 shrink-0", className)}
    />
  )
}

export function NexxaLifeWordmark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/nexxalife-logo-horizontal.svg"
      alt="NexxaLife"
      width={330}
      height={80}
      priority={priority}
      className={cn("h-auto w-40 shrink-0", className)}
    />
  )
}

export function NexxaLifeLogoLockup({
  collapsed = false,
  className,
}: {
  collapsed?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <NexxaLifeMark className="h-8 w-8" />
      {!collapsed ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">NexxaLife</p>
          <p className="truncate text-[10px] text-muted-foreground">Clareza · execução · evolução</p>
        </div>
      ) : null}
    </div>
  )
}
