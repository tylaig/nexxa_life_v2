// @ts-nocheck
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import { useRouter } from "next/navigation"
import {
  Bot, Send, Sparkles, Loader2,
  CheckCircle2, Target, Calendar, BookText, Network, ChevronRight, ChevronDown, ChevronUp, Activity, RefreshCw, Pencil, Image as ImageIcon, X, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { markUserOnboarded, addGoal, addChecklistItem, addAgendaEvent, addJournalEntry } from "@/lib/db/actions"
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

  const storageKey = isPlanningMode ? STORAGE_KEY_PLANNING : STORAGE_KEY_STUDIO

  // Restore saved messages from localStorage
  const savedMessages = React.useMemo(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null
      if (raw) return JSON.parse(raw)
    } catch {}
    return undefined
  }, [storageKey])

  const { messages, sendMessage, status, setMessages, error, reload, addToolResult } = useChat({
    api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
    body: isPlanningMode ? { diagnosticData } : undefined,
    initialMessages: savedMessages,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  })

  const isLoading = status === "submitted" || status === "streaming"

  // Mark hydrated after first render
  React.useEffect(() => { setIsHydrated(true) }, [])

  // Persist messages to localStorage
  React.useEffect(() => {
    if (!isHydrated || !messages || messages.length === 0) return
    try { localStorage.setItem(storageKey, JSON.stringify(messages)) } catch {}
  }, [messages, storageKey, isHydrated])

  // Auto-trigger first AI message (delay to let useChat fully hydrate)
  const hasSentInitial = React.useRef(false)
  React.useEffect(() => {
    if (isPlanningMode && (messages || []).length === 0 && !isLoading && !hasSentInitial.current) {
      hasSentInitial.current = true
      const timer = setTimeout(() => {
        sendMessage({
          text: "Olá! Terminei meu diagnóstico. Vamos começar a organizar meu plano estratégico.",
        })
      }, 300)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlanningMode])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function submitMessage(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if ((!inputValue?.trim() && attachments.length === 0) || isLoading) return
    
    const messageOpts: any = { text: inputValue }
    
    // In AI SDK v3/v4, if you want to pass images, you can pass dataUrls
    // or use experimental_attachments. For now, we'll map them if provided.
    if (attachments.length > 0) {
      messageOpts.experimental_attachments = attachments.map(url => ({
        url,
        contentType: url.startsWith("data:image/png") ? "image/png" : "image/jpeg",
        name: "pasted-image"
      }))
    }
    
    sendMessage(messageOpts)
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
    const textPart = (msg.parts || []).find((p: any) => p.type === 'text')
    setInputValue(textPart?.text || msg.content || msg.text || "")
    setMessages(messages.slice(0, index))
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

    // Add tool invocations — in AI SDK v6 they live in message.parts
    messages.forEach(m => {
      const parts = (m as any).parts || []
      parts.forEach((part: any) => {
        if (part.type && part.type.startsWith('tool-')) {
          // Extract tool name from type like "tool-addGoal"
          const toolName = part.toolName || part.type.replace(/^tool-/, '')
          events.push({
            type: 'tool',
            id: part.toolCallId || `${m.id}-${toolName}`,
            inv: {
              toolName,
              toolCallId: part.toolCallId,
              args: part.input,
              state: part.state === 'output-available' ? 'result' : part.state,
            },
            messageId: m.id
          })
        }
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
                  await markUserOnboarded()
                  router.push("/dashboard")
                }}
              >
                Finalizar Plano <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
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
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-6 space-y-6 custom-scrollbar">
          {(messages || []).map((m: any) => {
            const parts = m.parts || []
            const textParts = parts.filter((p: any) => p.type === 'text' && p.text?.trim())
            const toolParts = parts.filter((p: any) => p.type?.startsWith('tool-') || p.type === 'dynamic-tool')
            const mutatingToolParts = toolParts.filter((p: any) => MUTATING_TOOLS.includes(p.toolName))
            const hasContent = textParts.length > 0 || toolParts.length > 0
            const text = textParts.map((p: any) => p.text).join('\n') || m.content || m.text || ''

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
                {m.role === "assistant" && !text && toolParts.length > 0 && mutatingToolParts.length === 0 && (
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
        <div className="p-4 bg-background border-t border-border/50 relative">
          
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-3 px-2 overflow-x-auto">
              {attachments.map((url, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-border/60 bg-muted/30 w-16 h-16 flex-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Pasted attachment" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submitMessage} className="relative max-w-4xl mx-auto flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="O que vamos construir hoje? (Cole uma imagem ou digite)"
              rows={1}
              disabled={isLoading}
              className="w-full min-h-[56px] resize-none rounded-2xl border border-border/60 bg-muted/30 py-4 pl-5 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              style={{ overflow: 'hidden' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = '56px'
                target.style.height = `${Math.min(target.scrollHeight, 200)}px`
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || (!inputValue?.trim?.() && attachments.length === 0)}
              className="absolute right-2 bottom-2 h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-center mt-3 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium flex items-center justify-center gap-2">
            <span>NexxaLife Engine v2.0</span>
            <span className="w-1 h-1 rounded-full bg-border/50"></span>
            <span className="flex items-center"><ImageIcon className="h-3 w-3 mr-1 opacity-70" /> Suporta imagens</span>
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
          
          <div className="sticky top-0 bg-background/90 backdrop-blur-sm pb-3 mb-4 z-20 border-b border-border/40">
            <div className="flex items-center gap-2 opacity-70 text-primary">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Insights</span>
            </div>
          </div>

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
          </div>
          
          {isLoading && (
            <div className="flex items-center gap-3 mt-4 animate-in fade-in duration-500 opacity-60">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Coletando insights...</span>
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
