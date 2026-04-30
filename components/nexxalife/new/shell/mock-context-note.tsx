export function MockContextNote({ label = "Dados controlados da onda 1" }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
      <span className="font-medium">Modo atual:</span> {label}. Esta superfície valida estrutura, narrativa e composição sem depender do legado em runtime.
    </div>
  )
}
