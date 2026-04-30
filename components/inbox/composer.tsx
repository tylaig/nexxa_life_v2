"use client"

import * as React from "react"
import {
  Paperclip,
  ChevronDown,
  Send,
  Lock,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InboxComposerTools } from "./inbox-composer-tools"
import type { InboxDialogType } from "./inbox-types"

export type ComposerMode = "reply" | "note"

export function Composer({
  value,
  onChange,
  onSend,
  mode,
  onModeChange,
  onAiRewrite,
  onOpenDialog,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  mode: ComposerMode
  onModeChange: (m: ComposerMode) => void
  onAiRewrite?: () => void
  onOpenDialog?: (type: Exclude<InboxDialogType, null>) => void
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "0px"
    el.style.height = Math.min(el.scrollHeight, 200) + "px"
  }, [value])

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "border-t border-border bg-background",
          mode === "note" && "bg-[var(--ai-bg)]/50"
        )}
      >
        {/* Tabs */}
        <div className="flex items-center gap-0.5 border-b border-border px-3 pt-2">
          <TabButton active={mode === "reply"} onClick={() => onModeChange("reply")}>
            Resposta
          </TabButton>
          <TabButton active={mode === "note"} onClick={() => onModeChange("note")}>
            <Lock className="size-3" />
            Nota interna
          </TabButton>
          {onOpenDialog ? <InboxComposerTools onOpenDialog={onOpenDialog} /> : <div className="ml-auto" />}
        </div>

        <div className="px-3 pt-2.5 pb-2">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder={
              mode === "note"
                ? "Adicionar nota interna · só visível pro time"
                : "Mensagem para o cliente · use ⌘K para snippets"
            }
            className="min-h-[44px] w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            aria-label={mode === "note" ? "Nota interna" : "Resposta ao cliente"}
          />
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-3 py-2">
          <div className="flex items-center gap-0.5">
            <IconBtn label="Anexar arquivo">
              <Paperclip className="size-3.5" />
            </IconBtn>
            <IconBtn label="Emoji" onClick={() => onOpenDialog?.("emoji")}>
              <span className="text-sm">🙂</span>
            </IconBtn>
            <IconBtn label="Variáveis" onClick={() => onOpenDialog?.("variables")} extra="text-muted-foreground font-mono text-[11px] px-1.5">
              {"{{}}"}
            </IconBtn>
          </div>

          <div className="flex items-center gap-2">
            {onAiRewrite && mode === "reply" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAiRewrite}
                className="h-7 gap-1 border-[var(--ai-border)] bg-[var(--ai-bg)] text-[var(--ai)] hover:bg-[var(--ai-bg)]/80 hover:text-[var(--ai)]"
              >
                <Wand2 className="size-3.5" />
                <span className="text-[12px]">Reescrever com IA</span>
              </Button>
            )}
            <div className="flex items-center overflow-hidden rounded-md">
              <Button
                type="button"
                size="sm"
                onClick={onSend}
                disabled={!value.trim()}
                className={cn(
                  "h-7 gap-1.5 rounded-r-none px-3",
                  mode === "note" &&
                    "bg-[var(--ai)] text-[var(--ai-foreground)] hover:bg-[var(--ai)]/90"
                )}
              >
                {mode === "note" ? (
                  <Lock className="size-3.5" />
                ) : (
                  <Send className="size-3.5" />
                )}
                <span className="text-[12px] font-medium">
                  {mode === "note" ? "Adicionar nota" : "Enviar"}
                </span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="default"
                className={cn(
                  "h-7 rounded-l-none border-l border-primary-foreground/20 px-2",
                  mode === "note" &&
                    "bg-[var(--ai)] text-[var(--ai-foreground)] hover:bg-[var(--ai)]/90"
                )}
                aria-label="Mais opções de envio"
              >
                <ChevronDown className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12px] font-medium transition-colors",
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

function IconBtn({
  children,
  label,
  extra,
  onClick,
}: {
  children: React.ReactNode
  label: string
  extra?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
        extra
      )}
      aria-label={label}
    >
      {children}
    </button>
  )
}
