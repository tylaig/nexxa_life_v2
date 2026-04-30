import Link from "next/link"

import { nexxaLifeRoutes } from "../../../../lib/nexxalife/routes"

import { cn } from "@/lib/utils"

import { SurfaceCard } from "./surface-card"

export function NexxaLifeLocalNav({ currentPath }: { currentPath: string }) {
  return (
    <SurfaceCard className="border-slate-200/70 bg-white/82 p-3">
      <nav aria-label="Navegação do módulo">
        <ul className="flex flex-wrap gap-2">
          {nexxaLifeRoutes.map((route) => {
            const isActive = currentPath === route.path
            const isPhase1 = route.wave === "phase1"

            return (
              <li key={route.key}>
                <Link
                  href={route.path}
                  className={cn(
                    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive ? "bg-slate-950 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                  )}
                >
                  {route.label}
                  {!isPhase1 ? (
                    <span className={cn("ml-2 rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wide", isActive ? "bg-white/15 text-white" : "bg-white/80 text-slate-500")}>
                      futura
                    </span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </SurfaceCard>
  )
}
