import Link from "next/link"

import type { NexxaLifePageAction } from "../../../../lib/nexxalife/contracts"

function actionClassName(tone: NexxaLifePageAction["tone"] = "secondary") {
  if (tone === "primary") {
    return "bg-slate-950 text-white hover:bg-slate-800"
  }

  if (tone === "ghost") {
    return "bg-transparent text-slate-700 hover:bg-slate-100"
  }

  return "bg-slate-100 text-slate-900 hover:bg-slate-200"
}

export function NexxaLifePageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryActions = [],
}: {
  eyebrow: string
  title: string
  description: string
  primaryAction?: NexxaLifePageAction
  secondaryActions?: NexxaLifePageAction[]
}) {
  const actions = [...secondaryActions, ...(primaryAction ? [primaryAction] : [])]

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="max-w-3xl text-sm text-slate-600">{description}</p>
        </div>
      </div>
      {actions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((action) => {
            const commonClassName = `inline-flex rounded-xl px-3 py-2 text-sm font-medium transition ${actionClassName(action.tone)}`

            if (action.href) {
              return (
                <Link key={`${action.label}-${action.href}`} className={commonClassName} href={action.href}>
                  {action.label}
                </Link>
              )
            }

            return (
              <span key={action.label} className={commonClassName}>
                {action.label}
              </span>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
