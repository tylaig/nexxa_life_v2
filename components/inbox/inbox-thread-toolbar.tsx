"use client"

import { CheckCircle2, CircleDot, MoreHorizontal, PanelRightClose, PanelRightOpen, Tag, UserPlus, AlarmClock, Maximize2, Minimize2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { InboxDialogType } from "./inbox-types"

export function InboxThreadToolbar({
  onResolve,
  onSnooze,
  onTogglePanel,
  panelOpen,
  onOpenDialog,
  focusMode,
  onToggleFocus,
}: {
  onResolve: () => void
  onSnooze: () => void
  onTogglePanel: () => void
  panelOpen: boolean
  onOpenDialog: (type: Exclude<InboxDialogType, null>) => void
  focusMode?: boolean
  onToggleFocus?: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card/40 px-3 py-1.5">
      <ThreadAction onClick={onResolve} icon={CheckCircle2}>Resolver</ThreadAction>
      <ThreadAction onClick={onSnooze} icon={AlarmClock}>Soneca</ThreadAction>
      <ThreadAction onClick={() => onOpenDialog("assign")} icon={UserPlus}>Atribuir</ThreadAction>
      <ThreadAction onClick={() => onOpenDialog("tag")} icon={Tag}>Tag</ThreadAction>
      <ThreadAction onClick={() => onOpenDialog("status")} icon={CircleDot}>Mudar status</ThreadAction>
      <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7" aria-label="Mais ações">
              <MoreHorizontal className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onOpenDialog("profile")}>Abrir perfil 360</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenDialog("order")}>Inspecionar pedido</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("Conversa copiada para auditoria (mock)")}>Copiar link da conversa</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.success("Escalonamento para coordenação marcado (mock)")}>Escalar para coordenação</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {onToggleFocus && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            aria-label={focusMode ? "Sair do modo foco" : "Modo foco"}
            onClick={onToggleFocus}
          >
            {focusMode ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          aria-label={panelOpen ? "Fechar painel" : "Abrir painel"}
          onClick={onTogglePanel}
        >
          {panelOpen ? <PanelRightClose className="size-3.5" /> : <PanelRightOpen className="size-3.5" />}
        </Button>
      </div>
    </div>
  )
}

function ThreadAction({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode
  icon: React.ElementType
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Icon className="size-3.5" strokeWidth={1.75} />
      {children}
    </button>
  )
}
