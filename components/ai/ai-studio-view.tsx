// @ts-nocheck
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import { useRouter } from "next/navigation"
import {
  Bot, Send, Sparkles, Loader2, Brain,
  CheckCircle2, Target, Calendar, BookText, Network, ChevronRight, ChevronDown, ChevronUp, Activity, RefreshCw, Pencil, Image as ImageIcon, X, AlertCircle,
  Paperclip, Mic, Square, Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { markUserOnboarded, addGoal, addChecklistItem, addAgendaEvent, addJournalEntry, saveChatSession, deleteChatSession, getAllMemory } from "@/lib/db/actions"
import { AreaRadarChart } from "@/components/nexxa-life/charts/area-radar-chart"
import { ToolApprovalCard } from "@/components/ai/tool-approval-card"

const TOOL_META: Record<string, { icon: any; label: string; color: string; desc: string }> = {
  addGoal:          { icon: Target,       label: "Meta Criada",       color: "text-emerald-500", desc: "Uma nova meta foi estabelecida" },
  addChecklistItem: { icon: CheckCircle2, label: "Tarefa Adicionada", color: "text-blue-500",    desc: "Nova ação na sua checklist" },
  addAgendaEvent:   { icon: Calendar,     label: "Evento Agendado",   color: "text-violet-500",  desc: "Tempo bloqueado na agenda" },
  addJournalEntry:  { icon: BookText,     label: "Diário Salvo",      color: "text-amber-500",   desc: "Nova reflexão capturada" },
  getGoals:         { icon: Target,       label: "Metas Consultadas", color: "text-emerald-400", desc: "Metas existentes verificadas" },
  getChecklist:     { icon: CheckCircle2, label: "Checklist Lido",    color: "text-blue-400",    desc: "Checklist do dia verificado" },
  getAgenda:        { icon: Calendar,     label: "Agenda Consultada", color: "text-violet-400",  desc: "Agenda do dia verificada" },
  readMemory:       { icon: Brain,        label: "Memória Lida",      color: "text-pink-400",    desc: "Contexto do usuário consultado" },
  appendMemory:     { icon: Brain,        label: "Memória Salva",     color: "text-pink-500",    desc: "Nova observação registrada" },
  searchMemory:     { icon: Brain,        label: "Memória Buscada",   color: "text-pink-400",    desc: "Busca na memória do agente" },
}

const MUTATING_TOOLS = ["addGoal", "addChecklistItem", "addAgendaEvent", "addJournalEntry"]

// Map tool names to server actions
const TOOL_EXECUTORS: Record<string, (args: any) => Promise<any>> = {
  addGoal: async (args) => { await addGoal(args); return { success: true, message: `Meta "${args.title}" criada` } },
  addChecklistItem: async (args) => { await addChecklistItem(args); return { success: true, message: `Tarefa "${args.label}" adicionada` } },
  addAgendaEvent: async (args) => { await addAgendaEvent(args); return { success: true, message: `Evento "${args.title}" agendado` } },
  addJournalEntry: async (args) => { await addJournalEntry(args); return { success: true, message: "Reflexão salva" } },
}

const STORAGE_KEY_PLANNING = "nexxa_chat_planning"
const STORAGE_KEY_STUDIO = "nexxa_chat_studio"

export function AiStudioView({ step, diagnosticData }: { step?: string; diagnosticData?: any }) {
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

  const { messages, append, status, setMessages, error, reload, addToolResult } = useChat({
    api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
    body: isPlanningMode ? { diagnosticData } : undefined,
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

  // Auto-trigger first AI message ONLY if no saved messages were restored
  const hasSentInitial = React.useRef(false)
  React.useEffect(() => {
    if (!isHydrated) return // Wait for restore attempt to finish
    if ((messages || []).length === 0 && !isLoading && !hasSentInitial.current) {
      hasSentInitial.current = true
      
      const greeting = isPlanningMode
        ? "Olá! Terminei meu diagnóstico. Vamos começar a organizar seu plano estratégico."
        : "Sessão iniciada. O que vamos construir, organizar ou revisar hoje?"
        
      const timer = setTimeout(() => {
        append({
          role: "assistant",
          content: greeting,
        })
      }, 1200) // Delay to show the empty state animation
      return () => clearTimeout(timer)
    }
  }, [isPlanningMode, isHydrated, messages.length, isLoading, append])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function submitMessage(e?: React.FormEvent) {
    if (e) e.preventDefault()
    
    const content = inputValue.trim()
    if (!content && attachments.length === 0 && !isLoading) return
    if (isLoading) return
    
    const messageOpts: any = { 
      role: 'user',
      content: content || (attachments.length > 0 ? "[Arquivo(s) Anexado(s)]" : "")
    }
    
    // In AI SDK v3/v4, if you want to pass images, you can pass dataUrls
    // or use experimental_attachments. For now, we'll map them if provided.
    if (attachments.length > 0) {
      messageOpts.experimental_attachments = attachments.map(url => {
        const isAudio = url.startsWith("data:audio")
        return {
          url,
          contentType: isAudio ? "audio/mpeg" : (url.startsWith("data:image/png") ? "image/png" : "image/jpeg"),
          name: isAudio ? "voice-note" : "attachment"
        }
      })
    }
    
    append(messageOpts)
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
    setInputValue(msg.content || msg.text || "")
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitMessage()
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
      const toolInvocations = m.toolInvocations || []
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
                {isPlanningMode ? "Sessão de Planejamento" : "AI Studio"}
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
          
          {/* Empty State Animation */}
          {(!messages || messages.length === 0) && !isLoading && (
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
            const toolInvocations = m.toolInvocations || []
            const mutatingToolParts = toolInvocations.filter((inv: any) => MUTATING_TOOLS.includes(inv.toolName))
            const hasContent = !!m.content?.trim() || toolInvocations.length > 0
            const text = m.content || ''

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
                      {m.experimental_attachments && m.experimental_attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {m.experimental_attachments.map((att: any, i: number) => (
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

                {/* Approval cards for mutating tools */}
                {m.role === "assistant" && mutatingToolParts.map((part: any) => (
                  <div key={part.toolCallId} className="flex w-full justify-start pl-11">
                    <ToolApprovalCard
                      toolName={part.toolName}
                      toolCallId={part.toolCallId}
                      state={part.state}
                      input={part.input}
                      output={part.output}
                      approvalId={part.toolCallId}
                      onApprove={async (toolCallId) => {
                        const executor = TOOL_EXECUTORS[part.toolName]
                        if (executor) {
                          try {
                            const result = await executor(part.input)
                            addToolResult({ toolCallId, result })
                          } catch (e) {
                            addToolResult({ toolCallId, result: { success: false, message: "Erro ao salvar" } })
                          }
                        }
                      }}
                      onReject={(toolCallId) => {
                        addToolResult({ toolCallId, result: { rejected: true, message: "Rejeitado pelo usuário" } })
                      }}
                    />
                  </div>
                ))}

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
                <Button variant="outline" size="sm" onClick={() => reload()} className="h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10">
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
                mind: item.data?.scores?.mind ?? 5,
                health: item.data?.scores?.health ?? 5,
                wealth: item.data?.scores?.wealth ?? 5,
                relationships: item.data?.scores?.relationships ?? 5,
                spirituality: item.data?.scores?.spirituality ?? 5,
                productivity: item.data?.scores?.productivity ?? 5
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
