import type { ReactNode } from "react"

export function ContentContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">{children}</div>
}
