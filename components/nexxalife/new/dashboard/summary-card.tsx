export function NexxaLifeSummaryCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="mt-2 space-y-1">
        <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
        {hint ? <p className="text-sm text-slate-600">{hint}</p> : null}
      </div>
    </article>
  )
}
