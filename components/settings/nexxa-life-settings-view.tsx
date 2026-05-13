"use client"

import { useMemo, useState, useTransition } from "react"
import {
  Bell,
  BrainCircuit,
  CalendarClock,
  CheckSquare,
  ChevronRight,
  Globe2,
  Layers3,
  Link2,
  Loader2,
  MonitorCog,
  RotateCcw,
  Save,
  Trash2,
  ShieldCheck,
  Sparkles,
  Volume2,
  Wand2,
} from "lucide-react"

import { resetUserProgress, updateUserPreferences } from "@/lib/db/actions"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type SettingsTab = "cycle" | "interface" | "notifications" | "calendar" | "ai" | "security"

type SettingsState = {
  theme: "dark" | "light" | "system"
  timezone: string
  dateFormat: string
  weekStartsOn: number
  language: string
  dailySummaryEnabled: boolean
  dailySummaryTime: string
  goalRemindersEnabled: boolean
  eventRemindersEnabled: boolean
  soundEnabled: boolean
  reduceMotion: boolean
  cycleDefaultArea: string
  cycleReviewDay: number
  cycleAutoScoreEnabled: boolean
  cycleAutoPlanEnabled: boolean
  checklistGrouping: "goal" | "priority" | "area" | "manual"
  calendarProvider: string
  calendarSyncEnabled: boolean
  calendarSyncDirection: "import_only" | "export_only" | "two_way"
  calendarDefaultId: string
  calendarConflictStrategy: "ask" | "prefer_nexxa" | "prefer_external"
  aiProactivity: "low" | "balanced" | "high"
  aiContextMemoryEnabled: boolean
  aiAutoCreateTasks: boolean
}

const DEFAULT_SETTINGS: SettingsState = {
  theme: "dark",
  timezone: "America/Sao_Paulo",
  dateFormat: "DD/MM/YYYY",
  weekStartsOn: 1,
  language: "pt-BR",
  dailySummaryEnabled: true,
  dailySummaryTime: "07:00",
  goalRemindersEnabled: true,
  eventRemindersEnabled: true,
  soundEnabled: true,
  reduceMotion: false,
  cycleDefaultArea: "productivity",
  cycleReviewDay: 1,
  cycleAutoScoreEnabled: true,
  cycleAutoPlanEnabled: true,
  checklistGrouping: "goal",
  calendarProvider: "google",
  calendarSyncEnabled: false,
  calendarSyncDirection: "two_way",
  calendarDefaultId: "",
  calendarConflictStrategy: "ask",
  aiProactivity: "balanced",
  aiContextMemoryEnabled: true,
  aiAutoCreateTasks: false,
}

const TABS: { id: SettingsTab; label: string; icon: any; description: string }[] = [
  { id: "cycle", label: "Meu Ciclo", icon: Layers3, description: "Metas, checklist, score e planejamento." },
  { id: "calendar", label: "Calendário", icon: CalendarClock, description: "Recorrências e sync futuro com Google Calendar." },
  { id: "ai", label: "IA", icon: BrainCircuit, description: "Proatividade, memória e automações." },
  { id: "notifications", label: "Alertas", icon: Bell, description: "Resumo diário, lembretes e sons." },
  { id: "interface", label: "Interface", icon: MonitorCog, description: "Tema, idioma, data e acessibilidade." },
  { id: "security", label: "Segurança", icon: ShieldCheck, description: "Status de conta e sessões." },
]

const AREA_LABELS: Record<string, string> = {
  health: "Saúde",
  mind: "Mente",
  productivity: "Produtividade",
  finances: "Finanças",
  relations: "Relações",
  purpose: "Propósito",
}

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

function normalizeSettings(raw: any): SettingsState {
  if (!raw) return DEFAULT_SETTINGS
  return {
    theme: raw.theme || DEFAULT_SETTINGS.theme,
    timezone: raw.timezone || DEFAULT_SETTINGS.timezone,
    dateFormat: raw.date_format || DEFAULT_SETTINGS.dateFormat,
    weekStartsOn: raw.week_starts_on ?? DEFAULT_SETTINGS.weekStartsOn,
    language: raw.language || DEFAULT_SETTINGS.language,
    dailySummaryEnabled: raw.daily_summary_enabled ?? DEFAULT_SETTINGS.dailySummaryEnabled,
    dailySummaryTime: String(raw.daily_summary_time || DEFAULT_SETTINGS.dailySummaryTime).slice(0, 5),
    goalRemindersEnabled: raw.goal_reminders_enabled ?? DEFAULT_SETTINGS.goalRemindersEnabled,
    eventRemindersEnabled: raw.event_reminders_enabled ?? DEFAULT_SETTINGS.eventRemindersEnabled,
    soundEnabled: raw.sound_enabled ?? DEFAULT_SETTINGS.soundEnabled,
    reduceMotion: raw.reduce_motion ?? DEFAULT_SETTINGS.reduceMotion,
    cycleDefaultArea: raw.cycle_default_area || DEFAULT_SETTINGS.cycleDefaultArea,
    cycleReviewDay: raw.cycle_review_day ?? DEFAULT_SETTINGS.cycleReviewDay,
    cycleAutoScoreEnabled: raw.cycle_auto_score_enabled ?? DEFAULT_SETTINGS.cycleAutoScoreEnabled,
    cycleAutoPlanEnabled: raw.cycle_auto_plan_enabled ?? DEFAULT_SETTINGS.cycleAutoPlanEnabled,
    checklistGrouping: raw.checklist_grouping || DEFAULT_SETTINGS.checklistGrouping,
    calendarProvider: raw.calendar_provider || DEFAULT_SETTINGS.calendarProvider,
    calendarSyncEnabled: raw.calendar_sync_enabled ?? DEFAULT_SETTINGS.calendarSyncEnabled,
    calendarSyncDirection: raw.calendar_sync_direction || DEFAULT_SETTINGS.calendarSyncDirection,
    calendarDefaultId: raw.calendar_default_id || DEFAULT_SETTINGS.calendarDefaultId,
    calendarConflictStrategy: raw.calendar_conflict_strategy || DEFAULT_SETTINGS.calendarConflictStrategy,
    aiProactivity: raw.ai_proactivity || DEFAULT_SETTINGS.aiProactivity,
    aiContextMemoryEnabled: raw.ai_context_memory_enabled ?? DEFAULT_SETTINGS.aiContextMemoryEnabled,
    aiAutoCreateTasks: raw.ai_auto_create_tasks ?? DEFAULT_SETTINGS.aiAutoCreateTasks,
  }
}

function SettingRow({ icon: Icon, title, description, children }: { icon: any; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/45 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 max-w-xl text-xs leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="shrink-0 sm:min-w-[220px]">{children}</div>
    </div>
  )
}

export function NexxaLifeSettingsView({ preferences }: { preferences: any }) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("cycle")
  const [settings, setSettings] = useState<SettingsState>(() => normalizeSettings(preferences))
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [resetText, setResetText] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isResetPending, startResetTransition] = useTransition()

  const connectedScore = useMemo(() => {
    let score = 0
    if (settings.cycleAutoScoreEnabled) score += 20
    if (settings.cycleAutoPlanEnabled) score += 20
    if (settings.checklistGrouping === "goal") score += 15
    if (settings.calendarProvider) score += 15
    if (settings.dailySummaryEnabled) score += 10
    if (settings.goalRemindersEnabled) score += 10
    if (settings.aiContextMemoryEnabled) score += 10
    return Math.min(score, 100)
  }, [settings])

  function patch(partial: Partial<SettingsState>) {
    setSettings((current) => ({ ...current, ...partial }))
  }

  function resetProgress() {
    startResetTransition(async () => {
      await resetUserProgress(resetText)
      setResetText("")
      setSavedAt("progresso resetado")
    })
  }

  function save() {
    startTransition(async () => {
      await updateUserPreferences({
        theme: settings.theme,
        timezone: settings.timezone,
        dateFormat: settings.dateFormat,
        weekStartsOn: settings.weekStartsOn,
        language: settings.language,
        dailySummaryEnabled: settings.dailySummaryEnabled,
        dailySummaryTime: settings.dailySummaryTime,
        goalRemindersEnabled: settings.goalRemindersEnabled,
        eventRemindersEnabled: settings.eventRemindersEnabled,
        soundEnabled: settings.soundEnabled,
        reduceMotion: settings.reduceMotion,
        cycleDefaultArea: settings.cycleDefaultArea as any,
        cycleReviewDay: settings.cycleReviewDay,
        cycleAutoScoreEnabled: settings.cycleAutoScoreEnabled,
        cycleAutoPlanEnabled: settings.cycleAutoPlanEnabled,
        checklistGrouping: settings.checklistGrouping,
        calendarProvider: settings.calendarProvider ? settings.calendarProvider as any : null,
        calendarSyncEnabled: settings.calendarSyncEnabled,
        calendarSyncDirection: settings.calendarSyncDirection,
        calendarDefaultId: settings.calendarDefaultId || null,
        calendarConflictStrategy: settings.calendarConflictStrategy,
        aiProactivity: settings.aiProactivity,
        aiContextMemoryEnabled: settings.aiContextMemoryEnabled,
        aiAutoCreateTasks: settings.aiAutoCreateTasks,
      })
      setSavedAt(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Configurações"
        title="Centro de controle NexxaLife"
        description="Ajuste como o Meu Ciclo, a IA, os lembretes e futuras integrações funcionam juntos."
        actions={
          <div className="flex items-center gap-2">
            {savedAt && <span className="hidden text-xs text-muted-foreground sm:inline">Salvo às {savedAt}</span>}
            <Button variant="outline" size="sm" className="h-9 gap-2 rounded-xl px-3 text-xs" onClick={() => setSettings(DEFAULT_SETTINGS)} disabled={isPending}>
              <RotateCcw className="h-3.5 w-3.5" /> Restaurar
            </Button>
            <Button size="sm" className="h-9 gap-2 rounded-xl px-4 text-xs shadow-sm" onClick={save} disabled={isPending}>
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Salvar
            </Button>
          </div>
        }
      />

      <div className="overflow-hidden rounded-[32px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-emerald-500/5 p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Índice de ciclo conectado</p>
            </div>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">
              Mede se configurações essenciais estão alinhadas para metas, checklist, agenda, calendário e IA operarem como um sistema só.
            </p>
          </div>
          <div className="min-w-[220px]">
            <div className="flex items-end justify-between gap-4">
              <span className="text-4xl font-black tracking-tight text-foreground">{connectedScore}</span>
              <Badge className="rounded-full px-3 py-1 text-xs" variant="secondary">/100</Badge>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${connectedScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[300px_1fr]">
        <SectionCard noPadding className="h-fit overflow-hidden">
          <div className="space-y-1 p-2">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                    active ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/70"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{tab.label}</p>
                    <p className={cn("mt-0.5 truncate text-[11px]", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{tab.description}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                </button>
              )
            })}
          </div>
        </SectionCard>

        <div className="space-y-5">
          {activeTab === "cycle" && (
            <SectionCard title="Meu Ciclo" description="Define como metas, checklist e score conversam entre si.">
              <div className="space-y-3">
                <SettingRow icon={Layers3} title="Área padrão do ciclo" description="Usada quando uma tarefa/meta nasce sem área explícita.">
                  <Select value={settings.cycleDefaultArea} onValueChange={(value) => patch({ cycleDefaultArea: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(AREA_LABELS).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={CheckSquare} title="Agrupamento do checklist" description="Controla como o checklist deve ser organizado por padrão.">
                  <Select value={settings.checklistGrouping} onValueChange={(value: any) => patch({ checklistGrouping: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goal">Por meta</SelectItem>
                      <SelectItem value="priority">Por prioridade</SelectItem>
                      <SelectItem value="area">Por área</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={Sparkles} title="Score automático" description="Ao concluir ações conectadas, atualizar XP e score das áreas.">
                  <Switch checked={settings.cycleAutoScoreEnabled} onCheckedChange={(value) => patch({ cycleAutoScoreEnabled: value })} />
                </SettingRow>
                <SettingRow icon={Wand2} title="Planejamento automático do ciclo" description="Permitir que a IA sugira próximas ações com base nas metas ativas.">
                  <Switch checked={settings.cycleAutoPlanEnabled} onCheckedChange={(value) => patch({ cycleAutoPlanEnabled: value })} />
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {activeTab === "calendar" && (
            <SectionCard title="Calendário e recorrências" description="Preparação para sincronizar blocos de meta com Google Calendar.">
              <div className="space-y-3">
                <SettingRow icon={Link2} title="Provedor de calendário" description="Define o provedor alvo para futura sincronização externa.">
                  <Select value={settings.calendarProvider} onValueChange={(value) => patch({ calendarProvider: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Calendar</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="apple">Apple Calendar</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={CalendarClock} title="Sincronização externa" description="Mantido desligado até a integração OAuth/API ser implementada.">
                  <Switch checked={settings.calendarSyncEnabled} onCheckedChange={(value) => patch({ calendarSyncEnabled: value })} />
                </SettingRow>
                <SettingRow icon={RotateCcw} title="Direção da sincronização" description="Como resolver fluxo de dados entre NexxaLife e calendário externo.">
                  <Select value={settings.calendarSyncDirection} onValueChange={(value: any) => patch({ calendarSyncDirection: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="two_way">Duas vias</SelectItem>
                      <SelectItem value="export_only">Exportar Nexxa → Calendar</SelectItem>
                      <SelectItem value="import_only">Importar Calendar → Nexxa</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={Globe2} title="Calendário padrão" description="ID/nome do calendário que receberá eventos de metas futuramente.">
                  <Input value={settings.calendarDefaultId} onChange={(event) => patch({ calendarDefaultId: event.target.value })} placeholder="primary ou NexxaLife" className="rounded-xl" />
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {activeTab === "ai" && (
            <SectionCard title="IA operacional" description="Define o nível de autonomia da Nexxa no ciclo.">
              <div className="space-y-3">
                <SettingRow icon={BrainCircuit} title="Proatividade da IA" description="Quanto a IA deve sugerir, reorganizar e antecipar próximas ações.">
                  <Select value={settings.aiProactivity} onValueChange={(value: any) => patch({ aiProactivity: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="balanced">Equilibrada</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={Layers3} title="Memória contextual" description="Usar histórico do ciclo para melhorar sugestões futuras.">
                  <Switch checked={settings.aiContextMemoryEnabled} onCheckedChange={(value) => patch({ aiContextMemoryEnabled: value })} />
                </SettingRow>
                <SettingRow icon={Wand2} title="Criar tarefas automaticamente" description="Quando ligado, a IA pode montar tarefas sem aprovação individual. Recomendado manter desligado por enquanto.">
                  <Switch checked={settings.aiAutoCreateTasks} onCheckedChange={(value) => patch({ aiAutoCreateTasks: value })} />
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {activeTab === "notifications" && (
            <SectionCard title="Alertas e lembretes" description="Controle os lembretes do ciclo sem poluir a rotina.">
              <div className="space-y-3">
                <SettingRow icon={Bell} title="Resumo diário" description="Receber um resumo matinal com foco, agenda e próxima ação.">
                  <div className="flex items-center gap-3">
                    <Input type="time" value={settings.dailySummaryTime} onChange={(event) => patch({ dailySummaryTime: event.target.value })} className="w-28 rounded-xl" />
                    <Switch checked={settings.dailySummaryEnabled} onCheckedChange={(value) => patch({ dailySummaryEnabled: value })} />
                  </div>
                </SettingRow>
                <SettingRow icon={CheckSquare} title="Lembretes de metas" description="Notificar quando uma meta ativa ficar sem ação conectada.">
                  <Switch checked={settings.goalRemindersEnabled} onCheckedChange={(value) => patch({ goalRemindersEnabled: value })} />
                </SettingRow>
                <SettingRow icon={CalendarClock} title="Lembretes de eventos" description="Alertas para blocos de agenda vinculados ao ciclo.">
                  <Switch checked={settings.eventRemindersEnabled} onCheckedChange={(value) => patch({ eventRemindersEnabled: value })} />
                </SettingRow>
                <SettingRow icon={Volume2} title="Sons do sistema" description="Feedback sonoro sutil ao concluir ações e missões.">
                  <Switch checked={settings.soundEnabled} onCheckedChange={(value) => patch({ soundEnabled: value })} />
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {activeTab === "interface" && (
            <SectionCard title="Interface" description="Preferências visuais e regionais.">
              <div className="space-y-3">
                <SettingRow icon={MonitorCog} title="Tema" description="Escolha entre escuro, claro ou automático pelo sistema.">
                  <Select value={settings.theme} onValueChange={(value: any) => patch({ theme: value })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={Globe2} title="Fuso horário" description="Base para agenda, recorrências e resumo diário.">
                  <Input value={settings.timezone} onChange={(event) => patch({ timezone: event.target.value })} className="rounded-xl" />
                </SettingRow>
                <SettingRow icon={CalendarClock} title="Semana começa em" description="Afeta calendário, relatórios e revisão semanal.">
                  <Select value={String(settings.weekStartsOn)} onValueChange={(value) => patch({ weekStartsOn: Number(value) })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>{WEEKDAYS.map((day, index) => <SelectItem key={day} value={String(index)}>{day}</SelectItem>)}</SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow icon={MonitorCog} title="Reduzir animações" description="Diminui transições visuais para conforto e acessibilidade.">
                  <Switch checked={settings.reduceMotion} onCheckedChange={(value) => patch({ reduceMotion: value })} />
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {activeTab === "security" && (
            <div className="space-y-5">
              <SectionCard title="Segurança" description="Resumo rápido. Ações sensíveis continuam em Segurança e Perfil.">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      <ShieldCheck className="h-4 w-4" /> Conta protegida
                    </div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Esta central concentra preferências. Use a página full page de Segurança para senha, sessões e acessos.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" className="justify-start rounded-2xl" asChild><a href="/settings/profile">Editar perfil</a></Button>
                    <Button variant="outline" className="justify-start rounded-2xl" asChild><a href="/settings/security">Segurança e sessões</a></Button>
                    <Button variant="outline" className="justify-start rounded-2xl" asChild><a href="/settings/billing">Plano e faturamento</a></Button>
                    <Button variant="outline" className="justify-start rounded-2xl" asChild><a href="/integrations">Integrações</a></Button>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Resetar progresso" description="Zona de risco para recomeçar diagnóstico, metas, tarefas, agenda, diário, score e conquistas.">
                <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">Recomeçar evolução</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Isso limpa progresso operacional e gamificado do usuário atual, mantendo conta e preferências. Para confirmar, digite <strong>RESETAR PROGRESSO</strong>.
                      </p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Input value={resetText} onChange={(event) => setResetText(event.target.value)} placeholder="RESETAR PROGRESSO" className="rounded-xl" />
                        <Button variant="destructive" className="rounded-xl" disabled={resetText !== "RESETAR PROGRESSO" || isResetPending} onClick={resetProgress}>
                          {isResetPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                          Resetar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Próxima evolução</Label>
                <p className="mt-1 text-sm text-foreground">Ligar estas preferências ao agente, agenda recorrente e integração Google Calendar real.</p>
              </div>
              <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">settings-core v1</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
