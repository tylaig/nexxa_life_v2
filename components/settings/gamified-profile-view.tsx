"use client"

import { useMemo, useState, useTransition } from "react"
import {
  Award,
  BadgeCheck,
  BrainCircuit,
  Crown,
  Flame,
  Heart,
  Loader2,
  Mail,
  Palette,
  Phone,
  Save,
  Settings2,
  Shield,
  Sparkles,
  Star,
  Swords,
  Target,
  Wand2,
} from "lucide-react"

import { updateProfileIdentity } from "@/lib/db/actions"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type TarotAvatar = {
  key: string
  name: string
  title: string
  short: string
  motto: string
  icon: any
  gradient: string
  accent: string
  border: string
}

const TAROT_AVATARS: TarotAvatar[] = [
  { key: "fool", name: "O Louco", title: "Explorador do Novo", short: "Começos, coragem e liberdade.", motto: "Eu avanço antes do mapa estar pronto.", icon: Sparkles, gradient: "from-sky-400/25 via-cyan-300/10 to-amber-300/20", accent: "text-sky-500", border: "border-sky-400/35" },
  { key: "magician", name: "O Mago", title: "Executor Alquímico", short: "Foco, ferramenta e manifestação.", motto: "Eu transformo intenção em ação.", icon: Wand2, gradient: "from-violet-500/25 via-fuchsia-400/10 to-amber-300/20", accent: "text-violet-500", border: "border-violet-400/35" },
  { key: "priestess", name: "A Sacerdotisa", title: "Guardião da Intuição", short: "Silêncio, percepção e estratégia interna.", motto: "Eu escuto antes de agir.", icon: BrainCircuit, gradient: "from-indigo-500/25 via-blue-400/10 to-slate-300/20", accent: "text-indigo-500", border: "border-indigo-400/35" },
  { key: "empress", name: "A Imperatriz", title: "Criador de Abundância", short: "Nutrição, criação e expansão.", motto: "Eu faço crescer o que toco.", icon: Heart, gradient: "from-rose-500/25 via-pink-300/10 to-emerald-300/20", accent: "text-rose-500", border: "border-rose-400/35" },
  { key: "emperor", name: "O Imperador", title: "Arquiteto de Ordem", short: "Estrutura, comando e direção.", motto: "Eu construo sistemas que sustentam o futuro.", icon: Crown, gradient: "from-red-500/25 via-orange-400/10 to-stone-300/20", accent: "text-red-500", border: "border-red-400/35" },
  { key: "hierophant", name: "O Hierofante", title: "Mestre do Método", short: "Tradição, ensino e disciplina.", motto: "Eu transformo sabedoria em prática.", icon: Shield, gradient: "from-emerald-500/25 via-teal-400/10 to-lime-300/20", accent: "text-emerald-500", border: "border-emerald-400/35" },
  { key: "lovers", name: "Os Enamorados", title: "Integrador de Escolhas", short: "Valores, vínculos e alinhamento.", motto: "Eu escolho o que me torna inteiro.", icon: Heart, gradient: "from-pink-500/25 via-rose-300/10 to-purple-300/20", accent: "text-pink-500", border: "border-pink-400/35" },
  { key: "chariot", name: "O Carro", title: "Condutor da Vitória", short: "Direção, ritmo e conquista.", motto: "Eu conduzo minha energia até o resultado.", icon: Target, gradient: "from-blue-600/25 via-cyan-400/10 to-slate-300/20", accent: "text-blue-500", border: "border-blue-400/35" },
  { key: "strength", name: "A Força", title: "Domador do Impulso", short: "Coragem, presença e autocontrole.", motto: "Eu venço sem perder minha calma.", icon: Flame, gradient: "from-orange-500/25 via-amber-300/10 to-rose-300/20", accent: "text-orange-500", border: "border-orange-400/35" },
  { key: "hermit", name: "O Eremita", title: "Estrategista Interior", short: "Clareza, estudo e profundidade.", motto: "Eu encontro luz no foco profundo.", icon: Star, gradient: "from-slate-500/25 via-zinc-400/10 to-yellow-300/20", accent: "text-yellow-500", border: "border-yellow-400/35" },
  { key: "wheel", name: "A Roda", title: "Navegador de Ciclos", short: "Timing, mudança e adaptação.", motto: "Eu leio o ciclo e mudo com ele.", icon: Sparkles, gradient: "from-teal-500/25 via-cyan-300/10 to-violet-300/20", accent: "text-teal-500", border: "border-teal-400/35" },
  { key: "justice", name: "A Justiça", title: "Calibrador de Verdade", short: "Decisão, ética e equilíbrio.", motto: "Eu ajo de acordo com o que é certo.", icon: Swords, gradient: "from-lime-500/25 via-emerald-300/10 to-slate-300/20", accent: "text-lime-600", border: "border-lime-400/35" },
  { key: "hanged", name: "O Enforcado", title: "Transmutador de Perspectiva", short: "Pausa, inversão e rendição inteligente.", motto: "Eu mudo o ângulo antes de forçar a porta.", icon: BrainCircuit, gradient: "from-purple-500/25 via-indigo-300/10 to-sky-300/20", accent: "text-purple-500", border: "border-purple-400/35" },
  { key: "death", name: "A Morte", title: "Renovador Radical", short: "Fim, corte e renascimento.", motto: "Eu libero o velho para abrir espaço ao vivo.", icon: Swords, gradient: "from-zinc-700/30 via-neutral-400/10 to-red-300/20", accent: "text-zinc-500", border: "border-zinc-400/35" },
  { key: "temperance", name: "A Temperança", title: "Alquimista do Equilíbrio", short: "Ritmo, integração e cura.", motto: "Eu combino forças até encontrar harmonia.", icon: BadgeCheck, gradient: "from-cyan-500/25 via-blue-300/10 to-amber-300/20", accent: "text-cyan-500", border: "border-cyan-400/35" },
  { key: "star", name: "A Estrela", title: "Visionário Regenerador", short: "Esperança, visão e inspiração.", motto: "Eu sigo a visão que me puxa para cima.", icon: Star, gradient: "from-fuchsia-500/25 via-sky-300/10 to-blue-300/20", accent: "text-fuchsia-500", border: "border-fuchsia-400/35" },
]

function normalizeProfile(profile: any) {
  return {
    fullName: profile?.full_name || "Tylaig",
    nickname: profile?.nickname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    profileTitle: profile?.profile_title || "Admin do workspace",
    personalMission: profile?.personal_mission || "",
    identityMotto: profile?.identity_motto || "",
    avatarKey: profile?.avatar_key || profile?.archetype_key || "magician",
    archetypeKey: profile?.archetype_key || profile?.avatar_key || "magician",
    totalXp: Number(profile?.total_xp || 0),
    highestLevel: Number(profile?.highest_level || 1),
    averageLifeScore: Math.round(Number(profile?.average_life_score || 0)),
    achievementsUnlocked: Number(profile?.achievements_unlocked || 0),
  }
}

export function GamifiedProfileView({ profile }: { profile: any }) {
  const initial = normalizeProfile(profile)
  const [fullName, setFullName] = useState(initial.fullName)
  const [nickname, setNickname] = useState(initial.nickname)
  const [phone, setPhone] = useState(initial.phone)
  const [profileTitle, setProfileTitle] = useState(initial.profileTitle)
  const [activePanel, setActivePanel] = useState<"identity" | "avatar" | "mission">("identity")
  const [personalMission, setPersonalMission] = useState(initial.personalMission)
  const [identityMotto, setIdentityMotto] = useState(initial.identityMotto)
  const [selectedKey, setSelectedKey] = useState(initial.avatarKey)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const selectedAvatar = useMemo(
    () => TAROT_AVATARS.find((avatar) => avatar.key === selectedKey) || TAROT_AVATARS[1],
    [selectedKey]
  )
  const Icon = selectedAvatar.icon
  const levelProgress = Math.min(100, initial.totalXp % 100)

  function save() {
    startTransition(async () => {
      await updateProfileIdentity({
        fullName,
        nickname: nickname || null,
        phone: phone || null,
        profileTitle: profileTitle || null,
        personalMission: personalMission || null,
        identityMotto: identityMotto || selectedAvatar.motto,
        avatarKey: selectedAvatar.key,
        archetypeKey: selectedAvatar.key,
        archetypeName: selectedAvatar.name,
        archetypeTitle: selectedAvatar.title,
        identityColor: selectedAvatar.accent,
      })
      setSavedAt(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Identidade gamificada"
        title="Meu Perfil"
        description="Escolha seu avatar-arquétipo, ajuste sua presença e conecte sua identidade ao progresso do ciclo."
        actions={
          <div className="flex items-center gap-2">
            {savedAt && <span className="hidden text-xs text-muted-foreground sm:inline">Salvo às {savedAt}</span>}
            <Button size="sm" className="h-9 gap-2 rounded-xl px-4 text-xs shadow-sm" onClick={save} disabled={isPending}>
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Salvar identidade
            </Button>
          </div>
        }
      />

      <div className={cn("relative overflow-hidden rounded-[36px] border p-6 shadow-sm", selectedAvatar.border, "bg-gradient-to-br", selectedAvatar.gradient)}>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-background/30 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
          <div className="flex flex-col items-center text-center">
            <div className={cn("relative flex h-40 w-40 items-center justify-center rounded-[40px] border bg-background/75 shadow-xl backdrop-blur", selectedAvatar.border)}>
              <div className="absolute inset-2 rounded-[32px] border border-white/10" />
              <Icon className={cn("h-20 w-20", selectedAvatar.accent)} />
            </div>
            <Badge className="mt-4 rounded-full px-3 py-1 text-xs" variant="secondary">{selectedAvatar.name}</Badge>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground">{selectedAvatar.title}</h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{identityMotto || selectedAvatar.motto}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: "Nível", value: initial.highestLevel, icon: Crown, tone: "text-amber-500" },
              { label: "XP total", value: initial.totalXp, icon: Flame, tone: "text-orange-500" },
              { label: "Score médio", value: `${initial.averageLifeScore}%`, icon: Target, tone: "text-primary" },
              { label: "Conquistas", value: initial.achievementsUnlocked, icon: Award, tone: "text-emerald-500" },
            ].map((stat) => {
              const StatIcon = stat.icon
              return (
                <div key={stat.label} className="rounded-3xl border border-border/45 bg-background/70 p-4 backdrop-blur">
                  <StatIcon className={cn("h-4 w-4", stat.tone)} />
                  <p className="mt-3 text-2xl font-black tabular-nums text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
            <div className="rounded-3xl border border-border/45 bg-background/70 p-4 backdrop-blur sm:col-span-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Progresso para o próximo nível</span>
                <span className="text-muted-foreground">{levelProgress}/100 XP</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <SectionCard noPadding className="h-fit overflow-hidden">
          <div className="space-y-1 p-2">
            {[
              { id: "identity" as const, label: "Identidade", icon: Settings2, description: "Nome, título e contato." },
              { id: "avatar" as const, label: "Avatar", icon: Palette, description: "Arquétipo visual do ciclo." },
              { id: "mission" as const, label: "Missão", icon: Target, description: "Mote, bio e direção." },
            ].map((panel) => {
              const PanelIcon = panel.icon
              const active = activePanel === panel.id
              return (
                <button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                    active ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/70"
                  )}
                >
                  <PanelIcon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{panel.label}</p>
                    <p className={cn("mt-0.5 text-[11px]", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{panel.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </SectionCard>

        {activePanel === "avatar" && (
        <SectionCard title="Escolha seu avatar-arquétipo" description="16 arquétipos inspirados no tarot para representar seu modo de jogar o ciclo.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TAROT_AVATARS.map((avatar) => {
              const AvatarIcon = avatar.icon
              const active = selectedKey === avatar.key
              return (
                <button
                  key={avatar.key}
                  onClick={() => {
                    setSelectedKey(avatar.key)
                    setIdentityMotto((current: string) => current || avatar.motto)
                  }}
                  className={cn(
                    "group rounded-3xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                    active ? cn("bg-gradient-to-br", avatar.gradient, avatar.border, "shadow-sm") : "border-border/55 bg-card hover:border-primary/25"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-background/75", active ? avatar.border : "border-border/50")}> 
                      <AvatarIcon className={cn("h-5 w-5", avatar.accent)} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">{avatar.name}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">{avatar.title}</p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">{avatar.short}</p>
                </button>
              )
            })}
          </div>
        </SectionCard>
        )}

        {activePanel === "identity" && (
        <div className="space-y-6">
          <SectionCard title="Dados de presença" description="Essas informações aparecem no app e podem guiar personalização da IA.">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Nome de exibição</label>
                <Input value={fullName} onChange={(event) => setFullName(event.target.value)} className="rounded-xl" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Apelido</label>
                  <Input value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="Como quer ser chamado" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Título</label>
                  <Input value={profileTitle} onChange={(event) => setProfileTitle(event.target.value)} placeholder="Ex: Arquiteto do ciclo" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input value={initial.email} readOnly className="cursor-not-allowed rounded-xl bg-muted/35 pl-9 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input value={phone} onChange={(event) => setPhone(event.target.value)} className="rounded-xl pl-9" />
                </div>
              </div>
            </div>
          </SectionCard>

        </div>
        )}

        {activePanel === "mission" && (
        <div className="space-y-6">
          <SectionCard title="Missão pessoal" description="Use isso como norte narrativo do ciclo.">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Mote do arquétipo</label>
                <Input value={identityMotto} onChange={(event) => setIdentityMotto(event.target.value)} placeholder={selectedAvatar.motto} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Bio ou missão</label>
                <Textarea value={personalMission} onChange={(event) => setPersonalMission(event.target.value)} rows={5} placeholder="Qual evolução você está construindo agora?" className="resize-none rounded-xl" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Preferências de perfil" description="Configurações limpas que serão usadas futuramente para personalizar dashboard e IA.">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">Avatar no dashboard</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">O arquétipo salvo poderá aparecer no cockpit, sidebar e relatórios.</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">Tom da IA</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">O mote e a missão podem orientar sugestões mais alinhadas ao seu perfil.</p>
              </div>
            </div>
          </SectionCard>
        </div>
        )}
      </div>
    </div>
  )
}
