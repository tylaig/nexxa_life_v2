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
  const isPlanningMode = step === "planning" || step === "welcome" || step === "diagnostic" // Show planning mode if not fully onboarded
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const { messages, input = "", handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
    body: isPlanningMode ? { diagnosticData } : undefined,
  } as any) as any

  // Auto-trigger first AI message
  React.useEffect(() => {
    if (isPlanningMode && (messages || []).length === 0) {
      const fakeEvent = { preventDefault: () => {} } as any
      setInput?.("Olá! Vamos começar a organizar meu plano baseado no meu diagnóstico.")
      setTimeout(() => {
        handleSubmit?.(fakeEvent)
      }, 800)
    }
  }, [isPlanningMode])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit?.(e)
    }
  }

  // Find the last tool invocation to display in the right panel
  const lastMessageWithTool = [...(messages || [])].reverse().find(m => m.toolInvocations && m.toolInvocations.length > 0)
  const lastToolInvocations = lastMessageWithTool?.toolInvocations || []

  // If we have diagnosticData but no active tools, we can show the radar chart
  const showDiagnosticChart = diagnosticData && lastToolInvocations.length === 0

  return (
    <div className="flex h-[calc(100vh-16px)] m-2 rounded-3xl overflow-hidden border border-border/50 bg-background shadow-2xl">
      
      {/* LEFT COLUMN: CHAT INTERFACE */}
      <div className="flex flex-col w-full lg:w-3/5 border-r border-border/50 relative bg-muted/5">
        
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
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-6 space-y-6 custom-scrollbar">
          {(messages || []).map((m: any) => (
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
                {m.content && <div className="whitespace-pre-wrap">{m.content}</div>}
              </div>
            </div>
          ))}
          
          {isLoading && (messages || []).length > 0 && (messages || [])[messages.length - 1]?.role === "user" && (
            <div className="flex w-full justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 flex-none border border-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-background border border-border/50 px-5 py-4 flex items-center gap-1.5 shadow-sm">
                <span className="text-sm text-muted-foreground mr-2 font-medium">Processando</span>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border/50">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-end gap-2">
            <textarea
              value={input || ""}
              onChange={(e) => handleInputChange?.(e)}
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
              disabled={isLoading || !input?.trim?.()}
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

      {/* RIGHT COLUMN: DYNAMIC CONTEXT PANEL */}
      <div className="hidden lg:flex w-2/5 flex-col bg-background relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex-1 overflow-y-auto p-8 z-10 custom-scrollbar">
          
          <div className="flex items-center gap-2 mb-8 opacity-50">
            <Network className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Painel de Contexto</span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-muted-foreground animate-in fade-in duration-1000">
              <div className="relative flex items-center justify-center h-24 w-24">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <Activity className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <p className="text-sm font-medium tracking-wide">Sincronizando estratégias...</p>
            </div>
          ) : lastToolInvocations.length > 0 ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <h3 className="text-lg font-bold text-foreground">Ações Recentes da IA</h3>
              <div className="space-y-4">
                {lastToolInvocations.map((inv: any) => {
                  const meta = TOOL_META[inv.toolName] || { icon: Sparkles, label: inv.toolName, color: "text-primary", desc: "Ação do sistema" }
                  const Icon = meta.icon
                  const isDone = inv.state === "result"
                  
                  return (
                    <div key={inv.toolCallId} className={cn(
                      "p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden",
                      isDone ? "bg-background border-border/80 shadow-md" : "bg-muted/30 border-dashed border-border/50 opacity-70"
                    )}>
                      {isDone && <div className={cn("absolute left-0 top-0 bottom-0 w-1", meta.color.replace("text-", "bg-"))} />}
                      
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2.5 rounded-xl flex-none", isDone ? cn(meta.color.replace("text-", "bg-").replace("500", "500/10"), meta.color) : "bg-muted text-muted-foreground")}>
                          {isDone ? <Icon className="h-5 w-5" /> : <Loader2 className="h-5 w-5 animate-spin" />}
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-sm font-bold text-foreground">{meta.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{meta.desc}</p>
                          
                          {/* Render preview of arguments if available */}
                          {inv.args && typeof inv.args === "object" && (
                            <div className="mt-3 p-3 rounded-lg bg-muted/40 text-xs font-mono text-muted-foreground overflow-x-auto">
                              {Object.entries(inv.args).map(([k, v]) => (
                                <div key={k} className="flex gap-2">
                                  <span className="opacity-60">{k}:</span>
                                  <span className="truncate text-foreground/80">{String(v)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : showDiagnosticChart ? (
            <div className="space-y-8 animate-in fade-in duration-1000">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Sua Roda da Vida</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A IA está utilizando esses dados em tempo real para calibrar o seu planejamento estratégico.
                </p>
              </div>
              <div className="rounded-3xl bg-muted/5 border border-border/50 p-6 shadow-inner">
                <AreaRadarChart
                  scores={{
                    mind: diagnosticData.scores?.mind ?? 5,
                    health: diagnosticData.scores?.health ?? 5,
                    wealth: diagnosticData.scores?.wealth ?? 5,
                    relationships: diagnosticData.scores?.relationships ?? 5,
                    spirituality: diagnosticData.scores?.spirituality ?? 5,
                    productivity: diagnosticData.scores?.productivity ?? 5
                  }}
                  className="mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center opacity-60">
              <Sparkles className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">AI Studio Standby</p>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  As ações executadas pela IA aparecerão aqui em tempo real.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
