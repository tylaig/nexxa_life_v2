// @ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import {
  Brain, Send, Sparkles, Heart, Target, Wallet, Users, Compass,
  Loader2, ArrowRight, CheckCircle2, MessageSquare, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { markUserOnboarded } from "@/lib/db/actions"

const AREA_META: Record<string, { label: string; icon: any; color: string; emoji: string }> = {
  health:       { label: "Saúde",         icon: Heart,   color: "text-rose-400",    emoji: "🫀" },
  mind:         { label: "Mente",         icon: Brain,   color: "text-violet-400",  emoji: "🧠" },
  productivity: { label: "Produtividade", icon: Target,  color: "text-blue-400",    emoji: "🎯" },
  finances:     { label: "Finanças",      icon: Wallet,  color: "text-emerald-400", emoji: "💰" },
  relations:    { label: "Relações",      icon: Users,   color: "text-amber-400",   emoji: "🤝" },
  purpose:      { label: "Propósito",     icon: Compass, color: "text-cyan-400",    emoji: "🧭" },
}

const AREA_ORDER = ["health", "mind", "productivity", "finances", "relations", "purpose"]

type PlanningSessionProps = {
  diagnosticData: any
}

type Phase = "overview" | "chat" | "complete"

export function PlanningSession({ diagnosticData }: PlanningSessionProps) {
  const router = useRouter()
  const [phase, setPhase] = React.useState<Phase>("overview")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const { messages, input = "", handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat/planning",
    body: { diagnosticData },
    initialMessages: [],
  } as any) as any

  // Auto-scroll
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-trigger first AI message when entering chat
  const hasSentInitial = React.useRef(false)
  React.useEffect(() => {
    if (phase === "chat" && messages?.length === 0 && !hasSentInitial.current) {
      hasSentInitial.current = true
      const fakeEvent = { preventDefault: () => {} } as any
      setInput?.("Olá! Acabei de fazer meu diagnóstico. Vamos criar meu plano de evolução!")
      setTimeout(() => {
        handleSubmit?.(fakeEvent)
      }, 500)
    }
  }, [phase])

  const scores = diagnosticData ? {
    health: diagnosticData.score_health ?? 5,
    mind: diagnosticData.score_mind ?? 5,
    productivity: diagnosticData.score_productivity ?? 5,
    finances: diagnosticData.score_finances ?? 5,
    relations: diagnosticData.score_relations ?? 5,
    purpose: diagnosticData.score_purpose ?? 5,
  } : null

  const overallScore = scores
    ? Math.round(Object.values(scores).reduce((a: number, b: number) => a + b, 0) / 6 * 10)
    : 50

  // Count what IA created (by parsing tool invocations in messages)
  const createdItems = React.useMemo(() => {
    let goals = 0, tasks = 0, events = 0
    for (const msg of (messages || [])) {
      if (msg.role === "assistant" && msg.content) {
        const text = typeof msg.content === "string" ? msg.content : ""
        if (text.includes("Meta") && text.includes("criada")) goals++
        if (text.includes("Tarefa") && text.includes("adicionada")) tasks++
        if (text.includes("Evento") && text.includes("agendado")) events++
      }
      // AI SDK v6: tool results live in message.parts
      const parts = (msg as any).parts || []
      for (const part of parts) {
        if (part.type === "tool-invocation" && part.state === "result" && part.result?.success) {
          if (part.toolName === "addGoal") goals++
          if (part.toolName === "addChecklistItem") tasks++
          if (part.toolName === "addAgendaEvent") events++
        }
      }
    }
    return { goals, tasks, events }
  }, [messages])

  async function handleFinish() {
    await markUserOnboarded()
    router.push("/dashboard")
    router.refresh()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit?.(e)
    }
  }

  // ─── OVERVIEW PHASE ─────────────────────────────────────────────────────────
  if (phase === "overview") {
    return (
      <div className="fixed inset-0 z-40 bg-background overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl animate-pulse [animation-delay:1s]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/10 shadow-lg">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Seu Diagnóstico está Pronto</h1>
              <p className="text-muted-foreground">Agora vamos criar seu plano de evolução personalizado com a IA</p>
            </div>

            {/* Score Overview */}
            {scores && (
              <div className="space-y-4">
                {/* Overall */}
                <div className="flex items-center justify-center gap-4 p-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-2xl font-bold text-primary">{overallScore}%</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-foreground">Score Geral</span>
                    <p className="text-xs text-muted-foreground">Panorama do seu momento atual</p>
                  </div>
                </div>

                {/* Per-area mini bars */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AREA_ORDER.map((area) => {
                    const meta = AREA_META[area]
                    const score = scores[area] ?? 5
                    return (
                      <div key={area} className="flex items-center gap-2 rounded-xl border border-border/40 bg-card/50 p-3">
                        <span className="text-lg">{meta.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-muted-foreground">{meta.label}</span>
                            <span className="text-[11px] font-bold text-foreground tabular-nums">{score}</span>
                          </div>
                          <Progress value={score * 10} className="h-1 mt-1" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center space-y-3">
              <Button size="lg" className="px-10 h-12 text-base" onClick={() => setPhase("chat")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Iniciar Sessão de Planejamento
              </Button>
              <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
                <Zap className="h-3 w-3" /> A IA vai criar metas, tarefas e eventos para você
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── CHAT PHASE ─────────────────────────────────────────────────────────────
  if (phase === "chat") {
    return (
      <div className="fixed inset-0 z-40 bg-background flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">IA Estrategista NexxaLife</h2>
              <p className="text-[11px] text-muted-foreground">Sessão de Planejamento Pessoal</p>
            </div>
          </div>

          {/* Created items counter */}
          <div className="flex items-center gap-3">
            {createdItems.goals > 0 && (
              <div className="flex items-center gap-1 text-xs text-emerald-500 animate-in fade-in duration-300">
                <Target className="h-3 w-3" /> {createdItems.goals} {createdItems.goals === 1 ? "meta" : "metas"}
              </div>
            )}
            {createdItems.tasks > 0 && (
              <div className="flex items-center gap-1 text-xs text-blue-500 animate-in fade-in duration-300">
                <CheckCircle2 className="h-3 w-3" /> {createdItems.tasks} {createdItems.tasks === 1 ? "tarefa" : "tarefas"}
              </div>
            )}
            {createdItems.events > 0 && (
              <div className="flex items-center gap-1 text-xs text-violet-500 animate-in fade-in duration-300">
                <Zap className="h-3 w-3" /> {createdItems.events} {createdItems.events === 1 ? "evento" : "eventos"}
              </div>
            )}
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setPhase("complete")}>
              Concluir <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {(messages || []).filter((m: any) => m.role !== "system").map((msg: any, i: number) => {
              // AI SDK v6: text lives in parts[], not msg.content
              const textPart = ((msg as any).parts || []).find((p: any) => p.type === 'text')
              const text = textPart?.text || (typeof msg.content === "string" ? msg.content : "")
              if (!text) return null
              return (
              <div
                key={msg.id || i}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 mt-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted/50 text-foreground border border-border/30 rounded-bl-md"
                  )}
                >
                  <div className="whitespace-pre-wrap">{text}</div>
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-foreground/10 mt-1">
                    <span className="text-xs font-bold text-foreground">EU</span>
                  </div>
                )}
              </div>
              )
            })}

            {isLoading && (
              <div className="flex gap-3 animate-in fade-in duration-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 mt-1">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="bg-muted/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/40 bg-card/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input || ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Conte mais sobre seus objetivos..."
                rows={1}
                className="w-full resize-none rounded-xl border border-border/50 bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input?.trim?.()}
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ─── COMPLETE PHASE ─────────────────────────────────────────────────────────
  if (phase === "complete") {
    return (
      <div className="fixed inset-0 z-40 bg-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/20 to-primary/10 shadow-lg">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Seu Plano Está Pronto! 🚀</h1>
              <p className="text-muted-foreground">A IA criou sua fundação de evolução pessoal</p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                <Target className="h-5 w-5 text-emerald-500 mx-auto" />
                <p className="text-2xl font-bold text-foreground">{createdItems.goals || "—"}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Metas</p>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-1">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mx-auto" />
                <p className="text-2xl font-bold text-foreground">{createdItems.tasks || "—"}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tarefas</p>
              </div>
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-1">
                <Zap className="h-5 w-5 text-violet-500 mx-auto" />
                <p className="text-2xl font-bold text-foreground">{createdItems.events || "—"}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Eventos</p>
              </div>
            </div>

            <Button size="lg" className="w-full h-12 text-base" onClick={handleFinish}>
              <Sparkles className="h-4 w-4 mr-2" />
              Ir para o meu Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
