"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookText, Plus, Search, Smile, Meh, Frown, Zap, Heart, Sparkles, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { addJournalEntry } from "@/lib/db/actions"

type Mood = "great" | "good" | "neutral" | "bad" | "awful"

const MOOD_CONFIG: Record<Mood, { icon: typeof Smile; label: string; color: string; bg: string; score: number }> = {
  great:   { icon: Zap,   label: "Incrível",  color: "text-yellow-500", bg: "bg-yellow-500/10", score: 5 },
  good:    { icon: Smile, label: "Bem",       color: "text-emerald-500", bg: "bg-emerald-500/10", score: 4 },
  neutral: { icon: Meh,   label: "Neutro",    color: "text-blue-400",    bg: "bg-blue-400/10", score: 3 },
  bad:     { icon: Frown, label: "Mal",       color: "text-orange-500",  bg: "bg-orange-500/10", score: 2 },
  awful:   { icon: Heart, label: "Difícil",   color: "text-red-500",     bg: "bg-red-500/10", score: 1 },
}

type JournalEntry = {
  id: string
  date: string
  dateLabel: string
  content: string
  mood: Mood
  tags: string[]
}

const AI_PROMPTS = [
  "Qual foi a maior lição de hoje?",
  "Pelo que você é mais grato agora?",
  "O que você poderia ter feito melhor?",
  "O que está dominando seus pensamentos?"
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
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
              selected ? cn(cfg.bg, cfg.color, "ring-2 ring-current shadow-sm scale-110") : "text-muted-foreground hover:text-foreground hover:bg-accent hover:scale-105"
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
        "w-full rounded-xl border p-4 text-left transition-all hover:bg-accent/40",
        active ? "border-primary/40 bg-primary/5 shadow-sm" : "border-border/60 bg-transparent"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs shadow-sm", mood.bg, mood.color)}>
            <MoodIcon className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-foreground">{entry.dateLabel}</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">{entry.date}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{entry.content}</p>
      {entry.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">#{tag}</span>
          ))}
        </div>
      ) : null}
    </button>
  )
}

function MoodChart({ entries }: { entries: JournalEntry[] }) {
  // Pegar os ultimos 7 dias em ordem reversa
  const recent = [...entries].slice(0, 7).reverse()
  if (recent.length === 0) return null

  return (
    <SectionCard className="bg-gradient-to-br from-primary/5 to-violet-500/5 border-none shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Humor Recente</h3>
      </div>
      <div className="flex items-end justify-between h-24 gap-2 pt-2">
        {recent.map((entry) => {
          const score = MOOD_CONFIG[entry.mood].score
          const height = `${(score / 5) * 100}%`
          const Icon = MOOD_CONFIG[entry.mood].icon
          return (
            <div key={entry.id} className="flex flex-col items-center gap-2 group flex-1">
              <div className="w-full flex justify-center h-full items-end relative">
                <div 
                  className={cn("w-full max-w-[24px] rounded-t-md opacity-80 transition-all group-hover:opacity-100", MOOD_CONFIG[entry.mood].bg)}
                  style={{ height }}
                />
                <div className={cn("absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity", MOOD_CONFIG[entry.mood].color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{entry.date.slice(-2)}</span>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}

export function NexxaLifeJournalView({ entries: rawEntries }: { entries: any[] }) {
  const router = useRouter()

  // Map DB data to UI shape
  const allEntries: JournalEntry[] = rawEntries.map((e: any) => {
    const d = new Date(e.created_at || e.entry_date || Date.now())
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    const dateLabel = diffDays === 0 ? "Hoje" : diffDays === 1 ? "Ontem" : d.toLocaleDateString("pt-BR", { weekday: "long" })
    return {
      id: e.id,
      date: d.toISOString().slice(0, 10),
      dateLabel,
      content: e.content || "",
      mood: (e.mood || "neutral") as Mood,
      tags: e.tags || [],
    }
  })

  const [activeId, setActiveId] = useState<string | null>(allEntries[0]?.id ?? null)
  const [newMode, setNewMode] = useState(false)
  const [draft, setDraft] = useState("")
  const [draftMood, setDraftMood] = useState<Mood | null>(null)
  const [search, setSearch] = useState("")

  const activeEntry = allEntries.find((e) => e.id === activeId)
  const filtered = allEntries.filter(
    (e) => e.content.toLowerCase().includes(search.toLowerCase()) || e.tags.some((t) => t.includes(search.toLowerCase()))
  )

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  async function handleSave() {
    if (!draft.trim()) return
    await addJournalEntry({ content: draft.trim(), mood: draftMood || "neutral" })
    setDraft("")
    setDraftMood(null)
    setNewMode(false)
    router.refresh()
  }

  function handlePromptClick(prompt: string) {
    setDraft((prev) => (prev ? prev + "\n\n" : "") + prompt + "\n")
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Autoconhecimento"
        title="Diário Pessoal"
        description={`Reflexões, ideias e clareza mental — ${allEntries.length} entradas`}
        actions={
          <Button size="sm" className="h-9 gap-2 rounded-xl px-4 shadow-sm" onClick={() => { setNewMode(true); setActiveId(null) }}>
            <Plus className="h-4 w-4" /> Nova reflexão
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Coluna Esquerda: Busca e Lista */}
        <div className="space-y-4">
          <MoodChart entries={allEntries} />

          <div className="relative mt-2">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar memórias..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-muted/20 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-8">Nenhuma entrada encontrada.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} active={activeId === entry.id} onClick={() => { setActiveId(entry.id); setNewMode(false) }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coluna Direita: Editor ou Visualizador */}
        <div className="relative">
          {newMode ? (
            <div className="rounded-2xl border border-border/50 bg-background shadow-lg overflow-hidden flex flex-col h-[700px]">
              <div className="flex items-center justify-between border-b border-border/50 bg-muted/10 px-6 py-4">
                <div>
                  <h3 className="font-semibold text-foreground">Nova Entrada</h3>
                  <p className="text-xs text-muted-foreground">{today}</p>
                </div>
                <Button size="sm" className="h-8 rounded-lg px-4" onClick={handleSave}>
                  Salvar
                </Button>
              </div>

              <div className="p-6 flex flex-col h-full gap-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-foreground">Como você está se sentindo?</p>
                  <MoodPicker value={draftMood} onChange={setDraftMood} />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> Sugestões de IA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AI_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handlePromptClick(prompt)}
                        className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary hover:bg-primary/10 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 relative mt-2">
                  <textarea
                    placeholder="Escreva livremente... Este espaço é todo seu."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="absolute inset-0 h-full w-full resize-none bg-transparent p-0 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none custom-scrollbar"
                  />
                </div>
              </div>
            </div>
          ) : activeEntry ? (
            <div className="rounded-2xl border border-border/50 bg-background shadow-md overflow-hidden min-h-[500px]">
              <div className="flex items-center justify-between border-b border-border/50 bg-muted/5 px-8 py-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{activeEntry.dateLabel}</h2>
                  <p className="text-sm text-muted-foreground">{activeEntry.date}</p>
                </div>
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner", MOOD_CONFIG[activeEntry.mood].bg, MOOD_CONFIG[activeEntry.mood].color)}>
                  {(() => { const Icon = MOOD_CONFIG[activeEntry.mood].icon; return <Icon className="h-6 w-6" /> })()}
                </div>
              </div>
              <div className="p-8">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-[15px] leading-8 text-foreground/90">{activeEntry.content}</p>
                </div>
                {activeEntry.tags.length > 0 ? (
                  <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/30">
                    {activeEntry.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="h-[500px] rounded-2xl border border-border/50 border-dashed flex items-center justify-center">
              <EmptyState icon={BookText} title="Selecione uma memória" description="Escolha uma entrada à esquerda para reler, ou registre um novo pensamento." />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
