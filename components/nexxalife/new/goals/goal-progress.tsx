export function GoalProgress({ progressPercent }: { progressPercent: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Progresso</span>
        <span>{progressPercent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-900" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  )
}
