"use client"

import { useState } from "react"
import { Search, Clock, Bookmark, ExternalLink, Flame, Filter } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ArticleCategory = "Produtividade" | "Mentalidade" | "Saúde" | "Tecnologia" | "Negócios"
type Article = {
  id: string; title: string; summary: string; source: string
  category: ArticleCategory; readTime: string; date: string; trending?: boolean; saved?: boolean
}

const ARTICLES: Article[] = [
  { id: "1", title: "Por que os melhores fazedores não se preocupam com motivação", summary: "A motivação é superestimada. O que os high performers fazem é criar sistemas.", source: "James Clear", category: "Produtividade", readTime: "6 min", date: "Hoje", trending: true },
  { id: "2", title: "O efeito composto: como pequenas ações se tornam grandes resultados", summary: "Melhorar 1% por dia parece insignificante, mas ao longo de um ano a diferença é exponencial.", source: "Darren Hardy", category: "Mentalidade", readTime: "9 min", date: "Ontem", saved: true },
  { id: "3", title: "Sono profundo: o ativo mais subestimado da alta performance", summary: "Pesquisas confirmam que qualidade do sono afeta criatividade, memória e tomada de decisão.", source: "Matthew Walker", category: "Saúde", readTime: "12 min", date: "2 dias atrás" },
  { id: "4", title: "IA como parceira de produtividade: o que realmente funciona", summary: "Como integrar ferramentas de IA no fluxo de trabalho sem se tornar dependente.", source: "NexxaLife", category: "Tecnologia", readTime: "7 min", date: "3 dias atrás" },
]

const CATEGORIES: ArticleCategory[] = ["Produtividade", "Mentalidade", "Saúde", "Tecnologia", "Negócios"]
const CAT_COLORS: Record<ArticleCategory, string> = {
  Produtividade: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Mentalidade: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Saúde: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Tecnologia: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Negócios: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const [saved, setSaved] = useState(article.saved ?? false)
  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border p-4 transition-all hover:border-primary/20",
      featured ? "border-primary/20 bg-primary/5 md:col-span-2" : "border-border/70 bg-card")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn("rounded-full px-2.5 py-0.5 text-[11px]", CAT_COLORS[article.category])} variant="secondary">{article.category}</Badge>
          {article.trending ? <span className="flex items-center gap-1 text-[11px] font-medium text-amber-600"><Flame className="h-3 w-3" /> Trending</span> : null}
        </div>
        <button onClick={() => setSaved((s) => !s)} className={cn("shrink-0 transition-colors", saved ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
          <Bookmark className={cn("h-4 w-4", saved ? "fill-current" : "")} />
        </button>
      </div>
      <div className="space-y-1">
        <h3 className={cn("font-semibold leading-snug text-foreground", featured ? "text-base" : "text-sm")}>{article.title}</h3>
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{article.summary}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          {article.source} · <Clock className="h-3 w-3" />{article.readTime} · {article.date}
        </span>
        <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground">
          <ExternalLink className="h-3 w-3" /> Ler
        </Button>
      </div>
    </div>
  )
}

export function NexxaLifeNewsView() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<ArticleCategory | "all">("all")
  const filtered = ARTICLES.filter((a) => {
    const ms = a.title.toLowerCase().includes(search.toLowerCase())
    const mc = category === "all" || a.category === category
    return ms && mc
  })
  const featured = filtered.find((a) => a.trending)
  const rest = filtered.filter((a) => !a.trending)

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader eyebrow="Conteúdo" title="News & Leituras" description="Artigos e insights curados para o seu crescimento." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Buscar artigos..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {(["all", ...CATEGORIES] as const).map((cat) => (
            <button key={cat} onClick={() => setCategory(cat as typeof category)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
                category === cat ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted")}>
              {cat === "all" ? "Todas" : cat}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">Nenhum artigo encontrado.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {featured ? <ArticleCard article={featured} featured /> : null}
          {rest.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
      <SectionCard title="Leitura salva" description="Artigos que você marcou para ler depois">
        <p className="py-4 text-center text-xs text-muted-foreground">Salve artigos clicando no ícone 🔖 acima.</p>
      </SectionCard>
    </div>
  )
}
