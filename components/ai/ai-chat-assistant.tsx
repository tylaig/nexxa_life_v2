// @ts-nocheck
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import {
  Bot, Send, X, Sparkles, Loader2, Maximize2, Minimize2,
  CheckCircle2, Target, Calendar, BookText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const TOOL_LABELS: Record<string, { icon: any; label: string; color: string }> = {
  addGoal:          { icon: Target,     label: "Meta criada",      color: "text-emerald-500" },
  addChecklistItem: { icon: CheckCircle2, label: "Tarefa adicionada", color: "text-blue-500" },
  addAgendaEvent:   { icon: Calendar,   label: "Evento agendado",  color: "text-violet-500" },
  addJournalEntry:  { icon: BookText,   label: "Diário salvo",     color: "text-amber-500" },
  getGoals:         { icon: Target,     label: "Consultando metas", color: "text-muted-foreground" },
  getChecklist:     { icon: CheckCircle2, label: "Consultando checklist", color: "text-muted-foreground" },
  getAgenda:        { icon: Calendar,   label: "Consultando agenda", color: "text-muted-foreground" },
  getJournalEntries:{ icon: BookText,   label: "Consultando diário", color: "text-muted-foreground" },
  toggleChecklistItem:{ icon: CheckCircle2, label: "Tarefa atualizada", color: "text-blue-500" },
}

export function AiChatAssistant({ step, diagnosticData }: { step?: string; diagnosticData?: any }) {
  const isPlanningMode = step === "planning"
  const [isOpen, setIsOpen] = React.useState(isPlanningMode)
  const [isExpanded, setIsExpanded] = React.useState(isPlanningMode)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const { messages, input = "", handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: isPlanningMode ? "/api/chat/planning" : "/api/chat",
    body: isPlanningMode ? { diagnosticData } : undefined,
  } as any) as any

  // Auto-trigger first AI message when entering planning chat
  React.useEffect(() => {
    if (isPlanningMode && isOpen && (messages || []).length === 0) {
      const fakeEvent = { preventDefault: () => {} } as any
      setInput?.("Olá! Acabei de fazer meu diagnóstico. Vamos criar meu plano de evolução!")
      setTimeout(() => {
        handleSubmit?.(fakeEvent)
      }, 500)
    }
  }, [isPlanningMode, isOpen])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit?.(e)
    }
  }

  // Floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-white shadow-xl shadow-primary/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
      >
        <Sparkles className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
      </button>
    )
  }

  // Count what IA created if in planning mode
  let goalsCount = 0, tasksCount = 0, eventsCount = 0
  if (isPlanningMode) {
    for (const msg of (messages || [])) {
      if (msg.toolInvocations) {
        for (const inv of msg.toolInvocations) {
          if (inv.state === "result" && inv.result?.success) {
            if (inv.toolName === "addGoal") goalsCount++
            if (inv.toolName === "addChecklistItem") tasksCount++
            if (inv.toolName === "addAgendaEvent") eventsCount++
          }
        }
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background shadow-2xl shadow-black/10 transition-all duration-300 ease-out",
        isExpanded
          ? "inset-4 sm:bottom-6 sm:right-6 sm:top-auto sm:left-auto sm:h-[85vh] sm:w-[600px]"
          : "bottom-6 right-6 h-[520px] w-[380px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-primary/5 via-transparent to-violet-500/5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/10 text-primary">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {isPlanningMode ? "IA Estrategista NexxaLife" : "NexxaLife IA"}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {isPlanningMode ? "Sessão de Planejamento Pessoal" : "Assistente de Evolução"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isPlanningMode && (goalsCount > 0 || tasksCount > 0 || eventsCount > 0) && (
             <div className="hidden sm:flex items-center gap-3 mr-4">
              {goalsCount > 0 && <span className="text-xs text-emerald-500 flex items-center gap-1"><Target className="h-3 w-3"/>{goalsCount}</span>}
              {tasksCount > 0 && <span className="text-xs text-blue-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/>{tasksCount}</span>}
              {eventsCount > 0 && <span className="text-xs text-violet-500 flex items-center gap-1"><Calendar className="h-3 w-3"/>{eventsCount}</span>}
             </div>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5 text-muted-foreground" /> : <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />}
          </Button>
          {!isPlanningMode && (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setIsOpen(false)}>
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {(messages || []).length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center space-y-4 opacity-80">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/5">
              <Sparkles className="h-7 w-7 text-primary/60" />
            </div>
            <div className="space-y-1.5 max-w-[260px]">
              <p className="text-sm font-semibold text-foreground">Como posso ajudar?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Posso gerenciar suas metas, tarefas, agenda e diário. É só pedir!
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {["Minhas metas", "Checklist de hoje", "Criar tarefa"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    handleInputChange?.({ target: { value: s } } as any)
                    setTimeout(() => handleSubmit?.({ preventDefault: () => {} } as any), 100)
                  }}
                  className="rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          (messages || []).map((m: any) => (
            <div key={m.id} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted/50 text-foreground border border-border/20 rounded-bl-md"
              )}>
                {m.content && <div className="whitespace-pre-wrap">{m.content}</div>}
                {m.toolInvocations?.map((inv: any) => {
                  const meta = TOOL_LABELS[inv.toolName] || { icon: CheckCircle2, label: inv.toolName, color: "text-muted-foreground" }
                  const Icon = meta.icon
                  return (
                    <div key={inv.toolCallId} className="mt-2 flex items-center gap-2 rounded-lg bg-background/60 px-2.5 py-1.5 text-xs border border-border/30">
                      {inv.state === "result" ? (
                        <Icon className={cn("h-3 w-3", meta.color)} />
                      ) : (
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                      )}
                      <span className="text-muted-foreground">{meta.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (messages || []).length > 0 && (messages || [])[messages.length - 1]?.role === "user" && (
          <div className="flex w-full justify-start">
            <div className="rounded-2xl rounded-bl-md bg-muted/50 border border-border/20 px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/30 p-3 bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input || ""}
            onChange={(e) => handleInputChange?.(e)}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem..."
            rows={1}
            disabled={isLoading}
            className="w-full resize-none rounded-xl border border-border/40 bg-muted/20 py-2.5 pl-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input?.trim?.()}
            className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
