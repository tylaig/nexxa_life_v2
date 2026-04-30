import Link from "next/link"

import { nexxaLifeRoutes } from "../../../../lib/nexxalife/routes"

export function NexxaLifeLocalNav({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Navegação do módulo" className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <ul className="flex flex-wrap gap-2">
        {nexxaLifeRoutes.map((route) => {
          const isActive = currentPath === route.path
          const isPhase1 = route.wave === "phase1"

          return (
            <li key={route.key}>
              <Link
                href={route.path}
                className={[
                  "inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                {route.label}
                {!isPhase1 ? <span className="ml-2 rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">futura</span> : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
