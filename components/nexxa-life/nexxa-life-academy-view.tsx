"use client"

import { useState } from "react"
import { BookOpen, Play, Clock, Star, Filter, CheckCircle2, Lock } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type TrackCategory = "Produtividade" | "Mentalidade" | "Saúde" | "Finanças" | "Liderança"
type ContentType = "course" | "article" | "podcast" | "video"

type Track = {
  id: string
  title: string
  description: string
  category: TrackCategory
  progress: number
  totalModules: number
  doneModules: number
  duration: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  featured?: boolean
}

type Content = {
  id: string
  title: string
  type: ContentType
  category: TrackCategory
  duration: string
  author: string
  done: boolean
  locked?: boolean
}

const TRACKS: Track[] = [
  {
    id: "1", title: "Foco Profundo", description: "Elimine distrações e entre em estado de fluxo consistentemente.",
    category: "Produtividade", progress: 65, totalModules: 8, doneModules: 5,
    duration: "4h 30min", level: "Intermediário", featured: true,
  },
  {
    id: "2", title: "Mentalidade de Crescimento", description: "Transforme desafios em oportunidades de evolução real.",
    category: "Mentalidade", progress: 20, totalModules: 6, doneModules: 1,
    duration: "3h 15min", level: "Iniciante",
  },
  {
    id: "3", title: "Gestão de Energia", description: "Otimize seus níveis de energia para alta performance sustentável.",
    category: "Saúde", progress: 0, totalModules: 10, doneModules: 0,
    duration: "5h", level: "Iniciante",
  },
]

const CONTENTS: Content[] = [
  { id: "1", title: "Como construir sistemas, não apenas metas", type: "article", category: "Produtividade", duration: "8 min", author: "James Clear", done: true },
  { id: "2", title: "O poder do descanso ativo", type: "podcast", category: "Saúde", duration: "42 min", author: "Andrew Huberman", done: false },
  { id: "3", title: "Técnicas avançadas de recuperação cognitiva", type: "video", category: "Mentalidade", duration: "18 min", author: "NexxaLife", done: false },
  { id: "4", title: "Finanças para quem odeia planilhas", type: "course", category: "Finanças", duration: "2h", author: "Ramit Sethi", done: false, locked: true },
]

const CATEGORY_COLORS: Record<TrackCategory, string> = {
  Produtividade: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Mentalidade: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Saúde: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Finanças: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Liderança: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

const TYPE_ICONS: Record<ContentType, typeof BookOpen> = {
  course: BookOpen, article: BookOpen, podcast: Play, video: Play,
}

const CATEGORIES: TrackCategory[] = ["Produtividade", "Mentalidade", "Saúde", "Finanças", "Liderança"]

function TrackCard({ track }: { track: Track }) {
  return (
    <div className={cn(
      "flex flex-col gap-4 rounded-2xl border p-5 transition-all hover:border-primary/20",
      track.featured ? "border-primary/30 bg-primary/5" : "border-border/70 bg-card"
    )}>
      {track.featured ? (
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Em andamento</span>
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <h3 className="text-sm font-semibold text-foreground">{track.title}</h3>
          <p className="text-xs leading-5 text-muted-foreground">{track.description}</p>
        </div>
        <Badge className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px]", CATEGORY_COLORS[track.category])} variant="secondary">
          {track.category}
        </Badge>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{track.duration}</span>
        <span>{track.level}</span>
        <span className="ml-auto text-xs font-medium text-foreground">{track.doneModules}/{track.totalModules} módulos</span>
      </div>
      <div className="space-y-1.5">
        <Progress value={track.progress} className="h-1.5" />
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>{track.progress}% concluído</span>
        </div>
      </div>
      <Button size="sm" className="h-8 w-full rounded-xl text-xs" variant={track.progress > 0 ? "default" : "outline"}>
        {track.progress > 0 ? "Continuar trilha" : "Começar trilha"}
      </Button>
    </div>
  )
}

function ContentRow({ content }: { content: Content }) {
  const Icon = TYPE_ICONS[content.type]
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
      content.locked ? "opacity-50" : "hover:bg-accent/40"
    )}>
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", CATEGORY_COLORS[content.category])}>
        {content.locked ? <Lock className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", content.done ? "text-muted-foreground line-through" : "text-foreground")}>
          {content.title}
        </p>
        <p className="text-xs text-muted-foreground">{content.author} · {content.duration}</p>
      </div>
      {content.done ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> : null}
      {content.locked ? <span className="shrink-0 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">Pro</span> : null}
    </div>
  )
}

export function NexxaLifeAcademyView() {
  const [category, setCategory] = useState<TrackCategory | "all">("all")

  const filteredTracks = category === "all" ? TRACKS : TRACKS.filter((t) => t.category === category)

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Aprendizado"
        title="Academia"
        description="Trilhas e conteúdos curados para sua evolução pessoal e profissional."
      />

      {/* Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <button onClick={() => setCategory("all")}
          className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
            category === "all" ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
          Todas
        </button>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
              category === cat ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
            {cat}
          </button>
        ))}
      </div>

      {/* Trilhas */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trilhas de aprendizado</h2>
        {filteredTracks.length === 0 ? (
          <EmptyState icon={BookOpen} title="Nenhuma trilha nesta categoria" description="Escolha outra categoria ou explore todas as trilhas." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTracks.map((track) => <TrackCard key={track.id} track={track} />)}
          </div>
        )}
      </div>

      {/* Conteúdos recomendados */}
      <SectionCard title="Recomendados para você" description="Baseado no seu ciclo e metas ativas">
        <div className="divide-y divide-border/40">
          {CONTENTS.map((c) => <ContentRow key={c.id} content={c} />)}
        </div>
      </SectionCard>
    </div>
  )
}
