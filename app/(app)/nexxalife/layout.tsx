import type { ReactNode } from "react"

export default function NexxaLifeLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-transparent text-slate-950">{children}</div>
}
