"use client"

import { Bot, Crown, MessageSquareText, ShieldAlert } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import type { Conversation } from "@/lib/inbox/types"
import { relativeTime } from "@/lib/inbox/helpers"

export function InboxCommandDialog({
  open,
  onOpenChange,
  conversations,
  onSelectConversation,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
}) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Ir para conversa"
      description="Busque rapidamente por cliente, pedido, tag, intenção ou marca"
      className="max-w-2xl"
    >
      <CommandInput placeholder="Buscar conversa, pedido, tag ou intenção..." />
      <CommandList>
        <CommandEmpty>Nenhuma conversa encontrada.</CommandEmpty>
        <CommandGroup heading="Conversas">
          {conversations.map((conversation) => (
            <CommandItem
              key={conversation.id}
              value={[
                conversation.contact.name,
                conversation.contact.phone,
                conversation.brand,
                conversation.preview,
                conversation.intent ?? "",
                conversation.order?.number ?? "",
                conversation.tags.join(" "),
              ].join(" ")}
              onSelect={() => {
                onSelectConversation(conversation.id)
                onOpenChange(false)
              }}
              className="items-start gap-3 py-3"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                <MessageSquareText className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{conversation.contact.name}</span>
                  {conversation.contact.isVip ? <Crown className="size-3.5 text-[oklch(0.65_0.15_75)]" /> : null}
                  {conversation.status === "escalated" ? <ShieldAlert className="size-3.5 text-[var(--status-escalated)]" /> : null}
                  {conversation.isAiHandled ? <Bot className="size-3.5 text-[var(--ai)]" /> : null}
                </div>
                <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{conversation.preview}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{conversation.brand}</span>
                  {conversation.order?.number ? <span>· {conversation.order.number}</span> : null}
                  <span>· {relativeTime(conversation.lastActivityAt)}</span>
                </div>
              </div>
              <CommandShortcut>{conversation.unreadCount > 0 ? `${conversation.unreadCount} novas` : "abrir"}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
