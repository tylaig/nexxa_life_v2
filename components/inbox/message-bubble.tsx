import {
  Check,
  CheckCheck,
  Bot,
  Workflow,
  Info,
  Lock,
  FileText,
  Paperclip,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Message } from "@/lib/inbox/types"
import { avatarColor, formatTime, initials } from "@/lib/inbox/helpers"

export function MessageBubble({ message: m }: { message: Message }) {
  // System events — full width chip
  if (m.direction === "system") {
    return (
      <div className="flex justify-center py-2">
        <div className="inline-flex max-w-[80%] items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground">
          <Info className="size-3" />
          <span>{m.content}</span>
          <span aria-hidden>·</span>
          <span className="font-mono">{formatTime(m.timestamp)}</span>
        </div>
      </div>
    )
  }

  // Internal note — yellow-tinted card, full width
  if (m.direction === "internal_note") {
    return (
      <div className="flex justify-center py-1.5">
        <div className="w-full max-w-[80%] rounded-lg border border-[var(--ai-border)] bg-[var(--ai-bg)] p-3 text-[13px]">
          <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-[var(--ai)]">
            <Lock className="size-3" />
            Nota interna · {m.sender.name}
            <span className="ml-auto font-mono font-normal text-muted-foreground">
              {formatTime(m.timestamp)}
            </span>
          </div>
          <p className="leading-relaxed text-foreground">{m.content}</p>
        </div>
      </div>
    )
  }

  const isInbound = m.direction === "inbound"
  const isAutomation = m.sender.type === "automation"
  const isAi = m.sender.type === "ai"

  return (
    <div
      className={cn(
        "flex gap-2.5 py-1",
        isInbound ? "justify-start" : "justify-end"
      )}
    >
      {isInbound && (
        <Avatar className="size-7 shrink-0 self-end border border-border">
          <AvatarFallback className={cn("text-[10px] font-medium", avatarColor(m.sender.id))}>
            {initials(m.sender.name)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex max-w-[68%] flex-col gap-1", isInbound ? "items-start" : "items-end")}>
        {/* Sender pill for outbound non-agent */}
        {!isInbound && (isAutomation || isAi) && (
          <div className="inline-flex items-center gap-1 px-1 text-[10px] font-medium text-muted-foreground">
            {isAutomation ? <Workflow className="size-3" /> : <Bot className="size-3" />}
            <span>
              {m.sender.name}
              {m.templateName && (
                <span className="ml-1 font-mono text-muted-foreground">· {m.templateName}</span>
              )}
            </span>
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-[13.5px] leading-relaxed shadow-sm",
            isInbound
              ? "rounded-bl-sm border border-border bg-card text-card-foreground"
              : isAutomation
                ? "rounded-br-sm border border-[var(--status-automation-bg)] bg-[var(--status-automation-bg)] text-[var(--status-automation)] dark:text-foreground"
                : "rounded-br-sm bg-primary text-primary-foreground"
          )}
        >
          {m.attachments?.map((a) => (
            <div
              key={a.name}
              className={cn(
                "mb-1 flex items-center gap-2 rounded-md border px-2 py-1.5",
                isInbound ? "border-border bg-background" : "border-primary-foreground/20 bg-primary-foreground/10"
              )}
            >
              {a.type === "file" ? <FileText className="size-3.5" /> : <Paperclip className="size-3.5" />}
              <span className="text-[12px] font-medium">{a.name}</span>
            </div>
          ))}
          <p className="whitespace-pre-wrap text-pretty">{m.content}</p>
        </div>

        <div
          className={cn(
            "flex items-center gap-1 px-1 text-[10px] text-muted-foreground",
            isInbound ? "" : "flex-row-reverse"
          )}
        >
          <span className="font-mono">{formatTime(m.timestamp)}</span>
          {!isInbound && m.status && (
            <>
              <span aria-hidden>·</span>
              {m.status === "read" ? (
                <CheckCheck className="size-3 text-[var(--status-open)]" aria-label="Lida" />
              ) : m.status === "delivered" ? (
                <CheckCheck className="size-3" aria-label="Entregue" />
              ) : m.status === "sent" ? (
                <Check className="size-3" aria-label="Enviada" />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
