// @ts-nocheck
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { useRouter } from "next/navigation"
import {
  Bot, Send, Sparkles, Loader2,
  CheckCircle2, Target, Calendar, BookText, Network, ChevronRight, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { markUserOnboarded } from "@/lib/db/actions"
import { AreaRadarChart } from "@/components/meu-dia/charts/area-radar-chart"

const TOOL_META: Record<string, { icon: any; label: string; color: string; desc: string }> = {
  addGoal:          { icon: Target,       label: "Meta Criada",       color: "text-emerald-500", desc: "Uma nova meta foi estabelecida" },
  addChecklistItem: { icon: CheckCircle2, label: "Tarefa Adicionada", color: "text-blue-500",    desc: "Nova ação na sua checklist" },
  addAgendaEvent:   { icon: Calendar,     label: "Evento Agendado",   color: "text-violet-500",  desc: "Tempo bloqueado na agenda" },
  addJournalEntry:  { icon: BookText,     label: "Diário Salvo",      color: "text-amber-500",   desc: "Nova reflexão capturada" },
}

export function AiStudioView({ step, diagnosticData }: { step?: string; diagnosticData?: any }) {
  const router = useRouter()
  const isPlanningMode = step !== "complete" // Show planning mode if not fully onboarded
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = React.useState("")

  const { messages, sendMessage, status, setMessages } = useChat({
    api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
    body: isPlanningMode ? { diagnosticData } : undefined,
  })

  const isLoading = status === "submitted" || status === "streaming"

  // Auto-trigger first AI message
  React.useEffect(() => {
    if (isPlanningMode && (messages || []).length === 0 && !isLoading) {
      sendMessage({
        text: "Olá! Terminei meu diagnóstico. Vamos começar a organizar meu plano estratégico.",
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlanningMode])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function submitMessage(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!inputValue?.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
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

    // Add tool invocations
    messages.forEach(m => {
      if (m.toolInvocations) {
        m.toolInvocations.forEach(inv => {
          events.push({
            type: 'tool',
            id: inv.toolCallId,
            inv: inv,
            messageId: m.id
          })
        })
      }
    })

    return events
  }, [messages, diagnosticData])

  const [isPanelOpen, setIsPanelOpen] = React.useState(true)

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
            const text = m.content || m.text
            if (!text && m.role === "user") return null
            return (
              <div key={m.id} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role !== "user" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 flex-none border border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-background border border-border/50 text-foreground rounded-tl-sm"
                )}>
                  {text && <div className="whitespace-pre-wrap">{text}</div>}
                </div>
              </div>
            )
          })}
          
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
          <form onSubmit={submitMessage} className="relative max-w-4xl mx-auto flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="O que vamos construir hoje?"
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
              disabled={isLoading || !inputValue?.trim?.()}
              className="absolute right-2 bottom-2 h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-center mt-3 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
            NexxaLife Engine v2.0
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

        <div className="flex-1 overflow-y-auto p-8 z-10 custom-scrollbar relative">
          
          <div className="sticky top-0 bg-background/90 backdrop-blur-sm pb-4 mb-6 z-20 border-b border-border/40">
            <div className="flex items-center gap-2 opacity-70 text-primary">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Painel de Insights</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Timeline de coleta de dados e ações da IA</p>
          </div>

          <div className="relative pl-4 border-l-2 border-muted">
            {timelineEvents.length === 0 ? (
              <div className="py-10 text-center opacity-60 ml-[-16px]">
                <Sparkles className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm font-medium">Nenhum insight coletado ainda.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {timelineEvents.map((item, index) => {
                  
                  if (item.type === 'diagnostic') {
                    return (
                      <div key={item.id} className="relative animate-in slide-in-from-right-4 duration-500">
                        {/* Timeline dot */}
                        <div className="absolute -left-[25px] top-4 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary ring-4 ring-background" />
                        
                        <div className="p-5 rounded-2xl border bg-muted/5 shadow-sm space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              <Network className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground">Diagnóstico Inicial</h4>
                              <p className="text-xs text-muted-foreground">Contexto basal capturado</p>
                            </div>
                          </div>
                          <div className="pt-2">
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
                        </div>
                      </div>
                    )
                  }

                  if (item.type === 'tool') {
                    const inv = item.inv
                    const meta = TOOL_META[inv.toolName] || { icon: Sparkles, label: inv.toolName, color: "text-primary", desc: "Ação do sistema" }
                    const Icon = meta.icon
                    const isDone = inv.state === "result"

                    return (
                      <div key={item.id} className="relative animate-in slide-in-from-right-4 duration-500">
                        {/* Timeline dot */}
                        <div className={cn(
                          "absolute -left-[25px] top-4 h-4 w-4 rounded-full ring-4 ring-background border-2",
                          isDone ? cn(meta.color.replace("text-", "bg-"), "border-background") : "bg-muted border-muted-foreground animate-pulse"
                        )} />

                        <div className={cn(
                          "p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden",
                          isDone ? "bg-background border-border/80 shadow-sm" : "bg-muted/30 border-dashed border-border/50 opacity-70"
                        )}>
                          <div className="flex items-start gap-3">
                            <div className={cn("p-2 rounded-xl flex-none", isDone ? cn(meta.color.replace("text-", "bg-").replace("500", "500/10"), meta.color) : "bg-muted text-muted-foreground")}>
                              {isDone ? <Icon className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                              <p className="text-sm font-bold text-foreground">{meta.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{meta.desc}</p>
                              
                              {/* Preview args as collected insights */}
                              {inv.args && typeof inv.args === "object" && (
                                <div className="mt-3 grid grid-cols-1 gap-1.5 p-3 rounded-xl bg-muted/40 text-xs text-muted-foreground">
                                  {Object.entries(inv.args).map(([k, v]) => (
                                    <div key={k} className="flex gap-2 items-start">
                                      <span className="font-medium text-foreground/60 w-20 shrink-0 capitalize">{k}:</span>
                                      <span className="text-foreground/90">{String(v)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
          
          {isLoading && (
            <div className="flex items-center gap-3 mt-6 pl-4 animate-in fade-in duration-500 opacity-60">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Coletando novos insights...</span>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
