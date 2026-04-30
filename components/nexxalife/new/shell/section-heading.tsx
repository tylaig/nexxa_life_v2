import type { ReactNode } from "react"

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow?: string
  title: string
  description?: string
  aside?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1.5">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p> : null}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
          {description ? <p className="max-w-2xl text-sm text-slate-600">{description}</p> : null}
        </div>
      </div>
      {aside ? <div className="text-sm text-slate-500">{aside}</div> : null}
    </div>
  )
}
