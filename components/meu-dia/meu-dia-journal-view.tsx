"use client"

import { useState } from "react"
import { BookText, Plus, Search, Smile, Meh, Frown, Zap, Heart } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Mood = "great" | "good" | "neutral" | "bad" | "awful"

const MOOD_CONFIG: Record<Mood, { icon: typeof Smile; label: string; color: string; bg: string }> = {
  great:   { icon: Zap,   label: "Incrível",  color: "text-yellow-500", bg: "bg-yellow-500/10" },
  good:    { icon: Smile, label: "Bem",       color: "text-emerald-500", bg: "bg-emerald-500/10" },
  neutral: { icon: Meh,   label: "Neutro",    color: "text-blue-400",    bg: "bg-blue-400/10" },
  bad:     { icon: Frown, label: "Mal",       color: "text-orange-500",  bg: "bg-orange-500/10" },
  awful:   { icon: Heart, label: "Difícil",   color: "text-red-500",     bg: "bg-red-500/10" },
}

type JournalEntry = {
  id: string
  date: string
  dateLabel: string
  content: string
  mood: Mood
  tags: string[]
}

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: "1", date: "2025-05-05", dateLabel: "Ontem", mood: "great",
    content: "Hoje foi um dia de clareza rara. Consegui finalizar o módulo de auth e ainda sobrou tempo para pensar na estrutura do dashboard. Sinto que estou no trilho certo.",
    tags: ["produtividade", "código"],
  },
  {
    id: "2", date: "2025-05-04", dateLabel: "Ante-ontem", mood: "good",
    content: "Dia agitado mas produtivo. A reunião de alinhamento ajudou a clarear prioridades. Li 30 páginas do livro à noite — boa sensação.",
    tags: ["equilíbrio", "leitura"],
  },
  {
    id: "3", date: "2025-05-03", dateLabel: "Sábado", mood: "neutral",
    content: "Fim de semana mais tranquilo. Aproveitei para descansar e reorganizar pensamentos. Sem grande produtividade mas foi necessário.",
    tags: ["descanso"],
  },
]

function MoodPicker({ value, onChange }: { value: Mood | null; onChange: (m: Mood) => void }) {
  return (
    <div className="flex items-center gap-2">
      {(Object.entries(MOOD_CONFIG) as [Mood, (typeof MOOD_CONFIG)[Mood]][]).map(([key, cfg]) => {
        const Icon = cfg.icon
        const selected = value === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            title={cfg.label}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
              selected ? cn(cfg.bg, cfg.color, "ring-2 ring-current") : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        )
      })}
    </div>
  )
}

function EntryCard({ entry, active, onClick }: { entry: JournalEntry; active: boolean; onClick: () => void }) {
  const mood = MOOD_CONFIG[entry.mood]
  const MoodIcon = mood.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border p-3 text-left transition-all hover:bg-accent/40",
        active ? "border-primary/40 bg-primary/5" : "border-border/60 bg-transparent"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs", mood.bg, mood.color)}>
            <MoodIcon className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-foreground">{entry.dateLabel}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">{entry.date}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{entry.content}</p>
      {entry.tags.length > 0 ? (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {entry.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">#{tag}</span>
          ))}
        </div>
      ) : null}
    </button>
  )
}

export function NexxaLifeJournalView() {
  const [activeId, setActiveId] = useState<string | null>(MOCK_ENTRIES[0]?.id ?? null)
  const [newMode, setNewMode] = useState(false)
  const [draft, setDraft] = useState("")
  const [draftMood, setDraftMood] = useState<Mood | null>(null)
  const [search, setSearch] = useState("")

  const activeEntry = MOCK_ENTRIES.find((e) => e.id === activeId)
  const filtered = MOCK_ENTRIES.filter(
    (e) => e.content.toLowerCase().includes(search.toLowerCase()) || e.tags.some((t) => t.includes(search.toLowerCase()))
  )

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Reflexão"
        title="Diário"
        description={`Registre e reveja o seu dia — ${MOCK_ENTRIES.length} entradas`}
        actions={
          <Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs" onClick={() => { setNewMode(true); setActiveId(null) }}>
            <Plus className="h-3.5 w-3.5" /> Nova entrada
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Lista de entradas */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar entradas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          {filtered.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-8">Nenhuma entrada encontrada.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((entry) => (
                <EntryCard key={entry.id} entry={entry} active={activeId === entry.id} onClick={() => { setActiveId(entry.id); setNewMode(false) }} />
              ))}
            </div>
          )}
        </div>

        {/* Editor / visualizador */}
        {newMode ? (
          <SectionCard title={`Nova entrada — ${today}`}
            action={<Button size="sm" className="h-7 rounded-xl px-3 text-xs" onClick={() => setNewMode(false)}>Salvar</Button>}>
            <div className="space-y-4">
              <textarea
                placeholder="Como foi o seu dia? O que você sentiu, aprendeu ou quer lembrar..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={10}
                className="w-full resize-none rounded-xl border border-border/60 bg-background p-3 text-sm leading-7 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Como você está hoje?</p>
                  <MoodPicker value={draftMood} onChange={setDraftMood} />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{draft.length} caracteres</span>
              </div>
            </div>
          </SectionCard>
        ) : activeEntry ? (
          <SectionCard
            title={activeEntry.dateLabel}
            action={
              <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-xs", MOOD_CONFIG[activeEntry.mood].bg, MOOD_CONFIG[activeEntry.mood].color)}>
                {(() => { const Icon = MOOD_CONFIG[activeEntry.mood].icon; return <Icon className="h-4 w-4" /> })()}
              </div>
            }
          >
            <div className="space-y-4">
              <p className="text-sm leading-8 text-foreground/90">{activeEntry.content}</p>
              {activeEntry.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                  {activeEntry.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">#{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </SectionCard>
        ) : (
          <EmptyState icon={BookText} title="Selecione uma entrada" description="Escolha uma entrada à esquerda para ler, ou crie uma nova." />
        )}
      </div>
    </div>
  )
}
