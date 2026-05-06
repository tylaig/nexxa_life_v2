"use client"
// @ts-nocheck
import * as React from "react"
// @ts-ignore
import { useChat } from "@ai-sdk/react"
import { Bot, Send, X, MessageSquare, Loader2, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AiChatAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const { messages, input = "", handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 z-50"
      >
        <Bot className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl transition-all duration-300 ease-in-out sm:right-6",
        isExpanded ? "h-[80vh] w-[90vw] sm:w-[600px]" : "h-[500px] w-[350px] sm:w-[400px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">NexxaLife AI</h3>
            <p className="text-[10px] text-muted-foreground">Assistente de Evolução Pessoal</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <Minimize2 className="h-4 w-4 text-muted-foreground" /> : <Maximize2 className="h-4 w-4 text-muted-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center space-y-3 opacity-70">
            <MessageSquare className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Como posso ajudar hoje?</p>
              <p className="text-xs text-muted-foreground max-w-[250px]">
                Posso adicionar tarefas, consultar sua agenda, registrar seu diário ou revisar suas metas.
              </p>
            </div>
          </div>
        ) : (
          messages.map((m: any) => (
            <div key={m.id} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                )}
              >
                {/* Text Content */}
                {m.content && <div className="whitespace-pre-wrap">{m.content}</div>}

                {/* Tool Calls Handling */}
                {m.toolInvocations?.map((toolInvocation: any) => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  if (state === 'result') {
                    return (
                      <div key={toolCallId} className="mt-2 flex items-center gap-2 rounded bg-background/50 px-2 py-1.5 text-xs text-muted-foreground border border-border/50">
                        <CheckCircle2Icon className="h-3 w-3 text-emerald-500" />
                        <span>Ação {toolName} executada.</span>
                      </div>
                    )
                  } else {
                    return (
                      <div key={toolCallId} className="mt-2 flex items-center gap-2 rounded bg-background/50 px-2 py-1.5 text-xs text-muted-foreground border border-border/50">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Executando {toolName}...</span>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ))
        )}
        
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
          <div className="flex w-full justify-start">
            <div className="max-w-[85%] rounded-2xl bg-muted rounded-tl-sm px-4 py-3 text-sm text-foreground flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-3 bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
          <input
            className="flex-1 rounded-xl border border-border/60 bg-muted/30 py-2.5 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            value={input}
            onChange={handleInputChange}
            placeholder="Digite uma mensagem..."
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input?.trim()}
            className="absolute right-1 top-1 h-8 w-8 rounded-lg"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

function CheckCircle2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
