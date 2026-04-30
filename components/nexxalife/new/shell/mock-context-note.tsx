import { SurfaceCard } from "./surface-card"

export function MockContextNote({ label = "Dados controlados da onda 1" }: { label?: string }) {
  return (
    <SurfaceCard className="border-amber-200 bg-amber-50/90 p-4 shadow-[0_12px_30px_-24px_rgba(180,83,9,0.45)]">
      <div className="flex flex-col gap-1 text-sm text-amber-950">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Modo atual</p>
        <p>
          <span className="font-semibold">{label}.</span> Esta superfície valida estrutura, narrativa e composição sem depender do legado em runtime.
        </p>
      </div>
    </SurfaceCard>
  )
}
