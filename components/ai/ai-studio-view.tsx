// @ts-nocheck
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import { useRouter } from "next/navigation"
import {
  Bot, Send, Sparkles, Loader2, Brain,
  CheckCircle2, Target, Calendar, BookText, Network, ChevronRight, ChevronDown, ChevronUp, Activity, RefreshCw, Pencil, Image as ImageIcon, X, AlertCircle,
  Paperclip, Mic, Square, Trash2, Heart, Wallet, Users, Compass, TrendingUp, Gauge, Flame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { markUserOnboarded, addGoal, addChecklistItem, addAgendaEvent, addJournalEntry, saveChatSession, deleteChatSession, getAllMemory, createMission, recordScoreEvent, answerAdaptiveQuestion } from "@/lib/db/actions"
import { AreaRadarChart } from "@/components/nexxa-life/charts/area-radar-chart"
import { ToolApprovalBatch } from "@/components/ai/tool-approval-card"

const TOOL_META: Record<string, { icon: any; label: string; color: string; desc: string }> = {
  addGoal:          { icon: Target,       label: "Meta Criada",       color: "text-emerald-500", desc: "Uma nova meta foi estabelecida" },
  addChecklistItem: { icon: CheckCircle2, label: "Tarefa Adicionada", color: "text-blue-500",    desc: "Nova ação na sua checklist" },
  addAgendaEvent:   { icon: Calendar,     label: "Evento Agendado",   color: "text-violet-500",  desc: "Tempo bloqueado na agenda" },
  addJournalEntry:  { icon: BookText,     label: "Diário Salvo",      color: "text-amber-500",   desc: "Nova reflexão capturada" },
  createMission:    { icon: Flame,        label: "Missão Criada",     color: "text-orange-500",  desc: "Novo desafio gamificado" },
  recordScoreEvent: { icon: TrendingUp,   label: "Score Atualizado",  color: "text-cyan-500",    desc: "Evolução registrada" },
  answerAdaptiveQuestion: { icon: Gauge,  label: "Avaliação Salva",   color: "text-fuchsia-500", desc: "Resposta impactou o score" },
  getGoals:         { icon: Target,       label: "Metas Consultadas", color: "text-emerald-400", desc: "Metas existentes verificadas" },
  getChecklist:     { icon: CheckCircle2, label: "Checklist Lido",    color: "text-blue-400",    desc: "Checklist do dia verificado" },
  getAgenda:        { icon: Calendar,     label: "Agenda Consultada", color: "text-violet-400",  desc: "Agenda do dia verificada" },
  readMemory:       { icon: Brain,        label: "Memória Lida",      color: "text-pink-400",    desc: "Contexto do usuário consultado" },
  appendMemory:     { icon: Brain,        label: "Memória Salva",     color: "text-pink-500",    desc: "Nova observação registrada" },
  searchMemory:     { icon: Brain,        label: "Memória Buscada",   color: "text-pink-400",    desc: "Busca na memória do agente" },
}

const MUTATING_TOOLS = ["addGoal", "addChecklistItem", "addAgendaEvent", "addJournalEntry", "createMission", "recordScoreEvent", "answerAdaptiveQuestion"]

const DIAGNOSTIC_AREAS = [
  { key: "health", scoreKey: "score_health", label: "Saúde", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10", ring: "ring-rose-500/20", action: "recuperar energia física" },
  { key: "mind", scoreKey: "score_mind", label: "Mente", icon: Brain, color: "text-violet-500", bg: "bg-violet-500/10", ring: "ring-violet-500/20", action: "reduzir ruído mental" },
  { key: "productivity", scoreKey: "score_productivity", label: "Produtividade", icon: Target, color: "text-blue-500", bg: "bg-blue-500/10", ring: "ring-blue-500/20", action: "criar execução diária" },
  { key: "finances", scoreKey: "score_finances", label: "Finanças", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", action: "dar clareza financeira" },
  { key: "relations", scoreKey: "score_relations", label: "Relações", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10", ring: "ring-amber-500/20", action: "fortalecer vínculos" },
  { key: "purpose", scoreKey: "score_purpose", label: "Propósito", icon: Compass, color: "text-cyan-500", bg: "bg-cyan-500/10", ring: "ring-cyan-500/20", action: "alinhar direção" },
]

function getDiagnosticScore(diagnosticData: any, area: any) {
  const raw = diagnosticData?.[area.scoreKey] ?? diagnosticData?.scores?.[area.key] ?? 0
  const score = Number(raw)
  return Number.isFinite(score) ? Math.max(0, Math.min(10, score)) : 0
}

function getDiagnosticSummary(diagnosticData: any) {
  const areas = DIAGNOSTIC_AREAS.map((area) => ({
    ...area,
    score: getDiagnosticScore(diagnosticData, area),
  }))
  const total = areas.reduce((sum, area) => sum + area.score, 0)
  const overall = Math.round((total / Math.max(areas.length, 1)) * 10)
  const sorted = [...areas].sort((a, b) => a.score - b.score)
  const priorities = sorted.slice(0, 3)
  const strengths = [...sorted].reverse().slice(0, 2)
  const primary = priorities[0] || areas[0]
  const readiness = overall >= 75 ? "aceleração" : overall >= 55 ? "reorganização" : "recuperação estratégica"

  return { areas, overall, priorities, strengths, primary, readiness }
}

function getInitialPlanningPrompt(diagnosticData: any) {
  const summary = getDiagnosticSummary(diagnosticData)
  const priorities = summary.priorities.map((area) => `${area.label} ${area.score}/10`).join(", ")
  const strengths = summary.strengths.map((area) => `${area.label} ${area.score}/10`).join(", ")

  return `Acabei de finalizar meu diagnóstico inicial no NexxaLife. Comece a sessão já com uma leitura estratégica do meu perfil, baseada nesses dados: score geral ${summary.overall}%, prioridades ${priorities}, alavancas ${strengths}. Quero que você entregue um plano inicial curto com: 1 insight central, 3 prioridades, primeiras ações recomendadas e uma pergunta profunda sobre ${summary.primary.label}. Não faça saudação genérica.`
}

// Map tool names to server actions
const TOOL_EXECUTORS: Record<string, (args: any) => Promise<any>> = {
  addGoal: async (args) => { await addGoal(args); return { success: true, message: `Meta "${args.title}" criada` } },
  addChecklistItem: async (args) => { await addChecklistItem(args); return { success: true, message: `Tarefa "${args.label}" adicionada` } },
  addAgendaEvent: async (args) => { await addAgendaEvent(args); return { success: true, message: `Evento "${args.title}" agendado` } },
  addJournalEntry: async (args) => { await addJournalEntry(args); return { success: true, message: "Reflexão salva" } },
  createMission: async (args) => { const mission = await createMission(args); return { success: true, message: `Missão "${args.title}" criada`, mission } },
  recordScoreEvent: async (args) => { const score = await recordScoreEvent(args); return { success: true, message: "Score atualizado", score } },
  answerAdaptiveQuestion: async (args) => { const answer = await answerAdaptiveQuestion(args); return { success: true, message: "Avaliação registrada", answer } },
}

const STORAGE_KEY_PLANNING = "nexxa_chat_planning"
const STORAGE_KEY_STUDIO = "nexxa_chat_studio"

function getMessageText(message: any) {
  if (!message) return ""
  if (typeof message.content === "string") return message.content
  if (typeof message.text === "string") return message.text
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part: any) => part?.type === "text")
      .map((part: any) => part.text || "")
      .join("")
  }
  return ""
}

function getMessageFiles(message: any) {
  if (!message) return []
  if (Array.isArray(message.experimental_attachments)) return message.experimental_attachments
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part: any) => part?.type === "file")
      .map((part: any) => ({
        url: part.url,
        name: part.filename || "attachment",
        contentType: part.mediaType,
      }))
  }
  return []
}

function getToolInvocations(message: any) {
  if (!message) return []
  if (Array.isArray(message.toolInvocations)) return message.toolInvocations
  if (!Array.isArray(message.parts)) return []

  return message.parts
    .filter((part: any) => typeof part?.type === "string" && part.type.startsWith("tool-"))
    .map((part: any) => ({
      ...part,
      toolName: part.toolName || part.type.replace(/^tool-/, ""),
      args: part.args ?? part.input,
      input: part.input ?? part.args,
      output: part.output ?? part.result,
      state: part.state === "output-available" ? "result" : part.state,
    }))
}

export function AiStudioView({
  step,
  diagnosticData,
  prefillSession,
}: {
  step?: string
  diagnosticData?: any
  prefillSession?: any
}) {
  const router = useRouter()
  const isPlanningMode = step !== "complete"
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = React.useState("")
  const [attachments, setAttachments] = React.useState<string[]>([])
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'insights' | 'memory'>('insights')
  const [liveMemory, setLiveMemory] = React.useState<{soul: string, memory: string, skills: string}>({ soul: '', memory: '', skills: '' })

  // New States for File/Audio
  const [isDragging, setIsDragging] = React.useState(false)
  const [isRecording, setIsRecording] = React.useState(false)
  const [recordingDuration, setRecordingDuration] = React.useState(0)
  const [audioData, setAudioData] = React.useState<number[]>(new Array(40).fill(2))
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const analyserRef = React.useRef<AnalyserNode | null>(null)
  const animationFrameRef = React.useRef<number | null>(null)

  const storageKey = isPlanningMode ? STORAGE_KEY_PLANNING : STORAGE_KEY_STUDIO
  const sessionType = isPlanningMode ? "planning" : "studio"

  const { messages, sendMessage, status, setMessages, error, regenerate, addToolOutput } = useChat({
    transport: new DefaultChatTransport({
      api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
      body: isPlanningMode ? { diagnosticData } : undefined,
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  })

  const isLoading = status === "submitted" || status === "streaming"

  // Fetch memory
  React.useEffect(() => {
    if (activeTab === 'memory') {
      getAllMemory().then(setLiveMemory).catch(() => {})
    }
  }, [activeTab, messages])

  // Restore from localStorage on mount (client-side only)
  const didRestore = React.useRef(false)
  React.useEffect(() => {
    if (didRestore.current) return
    didRestore.current = true
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const saved = JSON.parse(raw)
        if (Array.isArray(saved) && saved.length > 0) {
          setMessages(saved)
          setIsHydrated(true)
          return
        }
      }
    } catch {}
    setIsHydrated(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist messages to localStorage + DB (debounced)
  const saveTimerRef = React.useRef<NodeJS.Timeout>()
  React.useEffect(() => {
    if (!isHydrated || !messages || messages.length === 0) return
    try { localStorage.setItem(storageKey, JSON.stringify(messages)) } catch {}
    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveChatSession(sessionType, messages).catch(() => {})
    }, 2000)
  }, [messages, storageKey, sessionType, isHydrated])

  // Auto-trigger first AI planning turn ONLY if no saved messages were restored
  const hasSentInitial = React.useRef(false)
  React.useEffect(() => {
    if (!isHydrated) return // Wait for restore attempt to finish
    if ((messages || []).length === 0 && !isLoading && !hasSentInitial.current) {
      hasSentInitial.current = true
      
      const timer = setTimeout(() => {
        if (isPlanningMode && diagnosticData) {
          sendMessage({ text: getInitialPlanningPrompt(diagnosticData) })
          return
        }

        setMessages((current: any[]) => [
          ...current,
          {
            id: `assistant-greeting-${Date.now()}`,
            role: "assistant",
            parts: [{ type: "text", text: "Sessão iniciada. O que vamos construir, organizar ou revisar hoje?" }],
          },
        ])
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [isPlanningMode, diagnosticData, isHydrated, messages.length, isLoading, sendMessage, setMessages])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function submitMessage(e?: React.FormEvent) {
    if (e) e.preventDefault()
    
    const content = inputValue.trim()
    if (!content && attachments.length === 0 && !isLoading) return
    if (isLoading) return
    
    sendMessage({ text: content || (attachments.length > 0 ? "[Arquivo(s) Anexado(s)]" : "") })
    setInputValue("")
    setAttachments([])
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items
    if (!items) return
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              setAttachments(prev => [...prev, event.target!.result as string])
            }
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  function handleEditMessage(id: string) {
    const index = messages.findIndex(m => m.id === id)
    if (index === -1) return
    
    const msg = messages[index]
    setInputValue(getMessageText(msg))
    setMessages(messages.slice(0, index))
  }

  // ─── AUDIO RECORDING LOGIC ─────────────────────────────────
  
  const updateWaveform = () => {
    if (!analyserRef.current) return
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)
    
    // Normalize to 40 bars
    const newAudioData = []
    const step = Math.floor(dataArray.length / 40)
    for (let i = 0; i < 40; i++) {
      const val = dataArray[i * step] / 4 // Scale for height
      newAudioData.push(Math.max(val, 2))
    }
    setAudioData(newAudioData)
    animationFrameRef.current = requestAnimationFrame(updateWaveform)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      // Setup Analyser
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64 = reader.result as string
            setAttachments(prev => [...prev, base64])
          }
          reader.readAsDataURL(e.data)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingDuration(0)
      updateWaveform()
    } catch (err) {
      console.error("Microphone access denied:", err)
      alert("Permissão de microfone negada.")
    }
  }

  const stopRecording = (shouldSend: boolean) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
    
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    if (audioContextRef.current) audioContextRef.current.close()
    
    setIsRecording(false)
    if (!shouldSend) {
      // If cancelled, we need to remove the last attachment if it was added by ondataavailable
      // But ondataavailable fires after stop, so we'll just handle it there.
    }
  }

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const s = sec % 60
    return `${mins}:${s.toString().padStart(2, '0')}`
  }

  // ─── FILE HANDLING LOGIC ────────────────────────────────────

  const handleFileUpload = (files: FileList | File[]) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAttachments(prev => [...prev, event.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => {
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  // Aggregate all tool invocations across all messages for the timeline
  const timelineEvents = React.useMemo(() => {
    const events: any[] = []
    
    // Add initial context if available
    if (diagnosticData) {
      events.push({
        type: 'diagnostic',
        id: 'diag-init',
        data: diagnosticData,
        timestamp: new Date().toISOString()
      })
    }

    // Add tool invocations from AI SDK
    messages.forEach((m: any) => {
      const toolInvocations = getToolInvocations(m)
      toolInvocations.forEach((inv: any) => {
        events.push({
          type: 'tool',
          id: inv.toolCallId || `${m.id}-${inv.toolName}`,
          inv: {
            toolName: inv.toolName,
            toolCallId: inv.toolCallId,
            args: inv.args,
            state: inv.state === 'result' ? 'result' : inv.state,
          },
          messageId: m.id
        })
      })
    })

    return events
  }, [messages, diagnosticData])

  const [isPanelOpen, setIsPanelOpen] = React.useState(false)

  return (
    <div className="flex h-[calc(100vh-16px)] m-2 rounded-3xl overflow-hidden border border-border/50 bg-background shadow-2xl relative">
      
      {/* LEFT COLUMN: CHAT INTERFACE */}
      <div className={cn(
        "flex flex-col h-full border-border/50 relative bg-muted/5 transition-all duration-300",
        isPanelOpen ? "w-full lg:w-[60%] border-r" : "w-full"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md px-6 py-4 absolute top-0 w-full z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/10 text-primary shadow-inner">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-foreground">
                {isPlanningMode ? "Sessão de Planejamento" : "Nexxa"}
              </h2>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                NexxaLife Inteligência Estratégica
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isPlanningMode && (
              <Button
                variant="default"
                size="sm"
                className="rounded-xl px-4 h-9 shadow-md"
                onClick={async () => {
                  try { localStorage.removeItem(STORAGE_KEY_PLANNING) } catch {}
                  deleteChatSession("planning").catch(() => {})
                  await markUserOnboarded()
                  router.push("/dashboard")
                }}
              >
                Finalizar Plano <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (!confirm("Resetar conversa? Sua memória será mantida.")) return
                try { localStorage.removeItem(storageKey) } catch {}
                deleteChatSession(sessionType).catch(() => {})
                setMessages([])
                hasSentInitial.current = false
              }}
              className="rounded-xl h-9 px-3 text-muted-foreground hover:text-foreground"
              title="Resetar conversa (mantém memória)"
            >
              <RefreshCw className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Resetar</span>
            </Button>
            {/* Panel Toggle Button (visible on lg screens) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="hidden lg:flex rounded-xl h-9 px-3 text-muted-foreground hover:text-foreground"
            >
              <Network className="h-4 w-4 mr-2" />
              {isPanelOpen ? "Ocultar Insights" : "Ver Insights"}
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-6 space-y-6 custom-scrollbar relative">
          {isPlanningMode && diagnosticData && <InitialDiagnosticBrief diagnosticData={diagnosticData} />}
          
          {prefillSession && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-4 w-4" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Pré-preenchimento em revisão
                    </div>
                    <h3 className="mt-1 font-semibold text-foreground">{prefillSession.headline}</h3>
                    <p className="mt-1 leading-6 text-muted-foreground">{prefillSession.disclosure}</p>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-background/70 p-3">
                      <div className="text-[11px] font-medium text-muted-foreground">Meta sugerida</div>
                      <div className="mt-1 font-medium text-foreground">{prefillSession.drafts.goal.title}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">Não persistida</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/70 p-3">
                      <div className="text-[11px] font-medium text-muted-foreground">Checklist sugerido</div>
                      <div className="mt-1 font-medium text-foreground">{prefillSession.drafts.checklist.title}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">Não persistido</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/70 p-3">
                      <div className="text-[11px] font-medium text-muted-foreground">Agenda sugerida</div>
                      <div className="mt-1 font-medium text-foreground">{prefillSession.drafts.agenda.title}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">Não persistida</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Confirmação obrigatória: a Nexxa só deve criar metas, checklist ou agenda após sua aprovação explícita.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State Animation */}
          {(!messages || messages.length === 0) && !isLoading && !prefillSession && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500 delay-150 pointer-events-none">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary/20 to-violet-500/20 flex items-center justify-center mb-6 shadow-inner relative">
                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-[-20px] rounded-full border border-violet-500/20 animate-ping opacity-10" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">Conectando Inteligência...</h3>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                {isPlanningMode 
                  ? "Analisando seu diagnóstico e preparando o terreno." 
                  : "Sincronizando com sua memória e ferramentas."}
              </p>
            </div>
          )}

          {(messages || []).map((m: any) => {
            const toolInvocations = getToolInvocations(m)
            const mutatingToolParts = toolInvocations.filter((inv: any) => MUTATING_TOOLS.includes(inv.toolName))
            const text = getMessageText(m)
            const files = getMessageFiles(m)
            const hasContent = !!text.trim() || files.length > 0 || toolInvocations.length > 0

            if (!hasContent && m.role === 'assistant') return null

            return (
              <div key={m.id} className="space-y-3">
                {/* User message */}
                {m.role === "user" && (
                  <div className="flex w-full justify-end">
                    <div className="relative group max-w-[80%] rounded-2xl rounded-tr-sm px-5 py-4 text-[15px] leading-relaxed shadow-sm bg-primary text-primary-foreground">
                      <button 
                        onClick={() => handleEditMessage(m.id)}
                        className="absolute -left-10 top-2 p-1.5 rounded-full bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:text-primary"
                        title="Editar mensagem"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <div className="whitespace-pre-wrap">{text}</div>
                      {files.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {files.map((att: any, i: number) => (
                            <div key={i} className="relative rounded-lg overflow-hidden border border-border/50">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={att.url} alt="Attachment" className="h-20 w-auto object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Assistant text */}
                {m.role === "assistant" && text && (
                  <div className="flex w-full justify-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 flex-none border border-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-background border border-border/50 text-foreground px-5 py-4 text-[15px] leading-relaxed shadow-sm">
                      <div className="whitespace-pre-wrap">{text}</div>
                    </div>
                  </div>
                )}

                {/* Approval package for mutating tools */}
                {m.role === "assistant" && mutatingToolParts.length > 0 && (
                  <ToolApprovalBatch
                    tools={mutatingToolParts}
                    onApproveMany={async (items) => {
                      for (const item of items) {
                        const executor = TOOL_EXECUTORS[item.toolName]
                        if (!executor) continue
                        try {
                          const result = await executor(item.input)
                          addToolOutput({
                            tool: item.toolName,
                            toolCallId: item.toolCallId,
                            output: {
                              ...result,
                              note: item.note || undefined,
                              reviewedInput: item.input,
                            },
                          })
                        } catch (e) {
                          addToolOutput({
                            tool: item.toolName,
                            toolCallId: item.toolCallId,
                            output: { success: false, message: "Erro ao salvar", note: item.note || undefined },
                          })
                        }
                      }
                    }}
                    onRejectMany={(items) => {
                      for (const item of items) {
                        addToolOutput({
                          tool: item.toolName,
                          toolCallId: item.toolCallId,
                          output: {
                            rejected: true,
                            message: "Removido do pacote de aprovação pelo usuário",
                            note: item.note || undefined,
                            reviewedInput: item.input,
                          },
                        })
                      }
                    }}
                  />
                )}

                {/* Thinking indicator for tool-only messages with no text */}
                {m.role === "assistant" && !text && toolInvocations.length > 0 && mutatingToolParts.length === 0 && (
                  <div className="flex w-full justify-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 flex-none border border-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-background border border-border/50 px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Consultando dados...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          
          {error && (
            <div className="flex w-full justify-start animate-in fade-in duration-300">
              <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center mr-3 mt-1 flex-none border border-destructive/20">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-destructive/5 border border-destructive/20 px-5 py-4 shadow-sm max-w-[80%]">
                <p className="text-sm font-medium text-destructive mb-2">Ops! Tivemos um problema de conexão com a IA.</p>
                <p className="text-xs text-destructive/80 mb-3">{error.message || "A requisição falhou. Tente novamente."}</p>
                <Button variant="outline" size="sm" onClick={() => regenerate()} className="h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10">
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Tentar novamente
                </Button>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex w-full justify-start animate-in fade-in duration-300">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 flex-none border border-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-background border border-border/50 px-5 py-4 flex items-center gap-1.5 shadow-sm">
                <span className="text-sm text-muted-foreground mr-2 font-medium">Estrategista digitando</span>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div 
          className={cn(
            "p-4 bg-background border-t border-border/50 relative transition-all duration-200",
            isDragging && "bg-primary/5 ring-2 ring-primary/20 ring-inset"
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-3 px-2 overflow-x-auto pb-2 scrollbar-hide">
              {attachments.map((url, idx) => {
                const isAudio = url.startsWith("data:audio")
                return (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-border/60 bg-muted/30 w-16 h-16 flex-none flex items-center justify-center">
                    {isAudio ? (
                      <Mic className="h-6 w-6 text-primary" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                    )}
                    <button 
                      type="button"
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-0.5 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div className="relative w-full">
            {/* Recording Overlay (WhatsApp Style) */}
            {isRecording ? (
              <div className="flex items-center gap-3 w-full min-h-[56px] rounded-2xl border border-primary/40 bg-primary/5 py-2 px-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 text-primary font-medium min-w-[60px]">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-mono">{formatDuration(recordingDuration)}</span>
                </div>
                
                {/* Waveform Visualization */}
                <div className="flex-1 flex items-center justify-center gap-[2px] h-8">
                  {audioData.map((val, i) => (
                    <div 
                      key={i} 
                      className="w-[3px] bg-primary/60 rounded-full transition-all duration-75"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => stopRecording(false)}
                    className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="icon"
                    onClick={() => stopRecording(true)}
                    className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitMessage} className="flex items-end gap-2 w-full">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 flex-none mb-1.5"
                  disabled={isLoading}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder={isDragging ? "Solte para anexar" : "Digite uma mensagem..."}
                  rows={1}
                  disabled={isLoading}
                  className={cn(
                    "w-full min-h-[56px] max-h-[300px] resize-none rounded-2xl border border-border/60 bg-muted/30 py-4 px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 custom-scrollbar",
                    isDragging && "border-primary bg-primary/5"
                  )}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = '56px'
                    target.style.height = `${Math.min(target.scrollHeight, 300)}px`
                  }}
                />

                <div className="flex items-center gap-1.5 flex-none mb-1.5">
                  {!inputValue.trim() && attachments.length === 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={startRecording}
                      disabled={isLoading}
                      className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading}
                      className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md hover:scale-105 transition-transform"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: INSIGHTS PANEL (TIMELINE) */}
      <div className={cn(
        "hidden lg:flex flex-col bg-background relative overflow-hidden transition-all duration-300 ease-in-out border-l border-transparent",
        isPanelOpen ? "w-[40%] translate-x-0" : "w-0 translate-x-full border-none opacity-0"
      )}>
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex-1 overflow-y-auto p-6 z-10 custom-scrollbar relative">
          
          <div className="sticky top-0 bg-background/90 backdrop-blur-sm pb-3 mb-4 z-20 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-70 text-primary">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Workspace</span>
            </div>
          </div>

          <div className="flex gap-2 mb-6 bg-muted/30 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('insights')}
              className={cn("flex-1 text-xs font-medium py-1.5 rounded-md transition-all", activeTab === 'insights' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Timeline
            </button>
            <button 
              onClick={() => setActiveTab('memory')}
              className={cn("flex-1 text-xs font-medium py-1.5 rounded-md transition-all", activeTab === 'memory' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Memória
            </button>
          </div>

          {activeTab === 'insights' ? (
            <div className="space-y-2">
              {timelineEvents.length === 0 ? (
                <div className="py-10 text-center opacity-60">
                  <Sparkles className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm font-medium">Nenhum insight ainda.</p>
                </div>
              ) : (
                timelineEvents.map((item) => (
                  <InsightCard key={item.id} item={item} />
                ))
              )}
              
              {isLoading && (
                <div className="flex items-center gap-3 mt-4 animate-in fade-in duration-500 opacity-60">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Coletando insights...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="rounded-xl border bg-muted/5 p-4">
                <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-2"><Brain className="h-3 w-3 text-pink-500"/> Soul (Personalidade)</h3>
                <div className="text-[11px] text-muted-foreground whitespace-pre-wrap">{liveMemory.soul || "Vazio"}</div>
              </div>
              <div className="rounded-xl border bg-muted/5 p-4">
                <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-2"><BookText className="h-3 w-3 text-amber-500"/> Memory (Fatos/Contexto)</h3>
                <div className="text-[11px] text-muted-foreground whitespace-pre-wrap">{liveMemory.memory || "Vazio"}</div>
              </div>
              <div className="rounded-xl border bg-muted/5 p-4">
                <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-2"><Target className="h-3 w-3 text-emerald-500"/> Skills (Padrões)</h3>
                <div className="text-[11px] text-muted-foreground whitespace-pre-wrap">{liveMemory.skills || "Vazio"}</div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

// ─── InitialDiagnosticBrief ─────────────────────────────────────

function InitialDiagnosticBrief({ diagnosticData }: { diagnosticData: any }) {
  const summary = getDiagnosticSummary(diagnosticData)
  const PrimaryIcon = summary.primary.icon

  return (
    <div className="overflow-hidden rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="relative p-5 md:p-6">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-12 left-1/4 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Diagnóstico interpretado pela Nexxa
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Seu plano inicial começa por {summary.primary.label.toLowerCase()}.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Detectei um momento de <span className="font-medium text-foreground">{summary.readiness}</span>: antes de empilhar metas, o sistema precisa transformar o diagnóstico em prioridades, ritmo e primeiras ações concretas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl border border-border/60 bg-background/75 p-4 shadow-sm backdrop-blur">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
              <Gauge className="absolute h-9 w-9 text-primary/15" />
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight text-primary">{summary.overall}%</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">score</div>
              </div>
            </div>
            <div className="min-w-32">
              <div className="text-xs font-semibold text-foreground">Leitura geral</div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">Base inicial para priorizar evolução sem dispersão.</div>
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {summary.areas.map((area) => {
            const Icon = area.icon
            return (
              <div key={area.key} className="rounded-2xl border border-border/50 bg-background/70 p-3 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl ring-1", area.bg, area.color, area.ring)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{area.label}</div>
                      <div className="text-[11px] text-muted-foreground">{area.action}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-nums text-foreground">{Math.round(area.score * 10)}%</div>
                    <div className="text-[10px] text-muted-foreground">{area.score}/10</div>
                  </div>
                </div>
                <Progress value={area.score * 10} className="mt-3 h-1.5 bg-muted" />
              </div>
            )
          })}
        </div>

        <div className="relative mt-5 grid gap-3 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Flame className="h-4 w-4 text-amber-500" />
              Prioridades imediatas
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {summary.priorities.map((area, index) => (
                <div key={area.key} className="rounded-xl bg-background/70 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">#{index + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{area.label}</div>
                  <div className="text-xs text-muted-foreground">{area.action}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Alavancas do perfil
            </div>
            <div className="space-y-2">
              {summary.strengths.map((area) => (
                <div key={area.key} className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-2">
                  <span className="text-sm font-medium text-foreground">{area.label}</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{Math.round(area.score * 10)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
          <PrimaryIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm leading-6 text-muted-foreground">
            A IA vai usar esse mapa para abrir a conversa com <span className="font-medium text-foreground">insights, plano inicial e pergunta de causa raiz</span>, não com uma saudação genérica.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── InsightCard (compact, expandable) ──────────────────────────

function InsightCard({ item }: { item: any }) {
  const [expanded, setExpanded] = React.useState(false)

  if (item.type === 'diagnostic') {
    return (
      <div className="rounded-xl border bg-muted/5 p-3 animate-in fade-in duration-300">
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 text-left">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex-none">
            <Network className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground">Diagnóstico Inicial</p>
            <p className="text-[10px] text-muted-foreground truncate">Contexto basal capturado</p>
          </div>
          {expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground flex-none" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-none" />}
        </button>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <AreaRadarChart
              scores={{
                mind: item.data?.score_mind ?? item.data?.scores?.mind ?? 5,
                health: item.data?.score_health ?? item.data?.scores?.health ?? 5,
                wealth: item.data?.score_finances ?? item.data?.scores?.wealth ?? 5,
                relationships: item.data?.score_relations ?? item.data?.scores?.relationships ?? 5,
                spirituality: item.data?.score_purpose ?? item.data?.scores?.spirituality ?? 5,
                productivity: item.data?.score_productivity ?? item.data?.scores?.productivity ?? 5
              }}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    )
  }

  if (item.type === 'tool') {
    const inv = item.inv
    const meta = TOOL_META[inv.toolName] || { icon: Sparkles, label: inv.toolName, color: "text-primary", desc: "Ação do sistema" }
    const Icon = meta.icon
    const isDone = inv.state === "result" || inv.state === "output-available"
    const summary = inv.args?.title || inv.args?.label || inv.args?.content?.slice(0, 40) || inv.args?._reason || meta.desc

    return (
      <div className="rounded-xl border bg-background p-3 animate-in fade-in duration-300">
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 text-left">
          <div className={cn("p-1.5 rounded-lg flex-none", isDone ? cn(meta.color.replace("text-", "bg-").replace("500", "500/10"), meta.color) : "bg-muted text-muted-foreground")}>
            {isDone ? <Icon className="h-3.5 w-3.5" /> : <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground">{meta.label}</p>
            <p className="text-[10px] text-muted-foreground truncate">{summary}</p>
          </div>
          {inv.args && (expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground flex-none" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-none" />)}
        </button>
        {expanded && inv.args && typeof inv.args === "object" && (
          <div className="mt-2 pt-2 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 gap-1 text-[11px]">
              {Object.entries(inv.args).filter(([k]) => k !== '_reason').map(([k, v]) => (
                <div key={k} className="flex gap-1.5 items-start">
                  <span className="font-medium text-muted-foreground capitalize shrink-0">{k}:</span>
                  <span className="text-foreground/90 break-words">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
