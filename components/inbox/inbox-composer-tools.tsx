"use client"

import { FileText, Hash, Smile } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { InboxDialogType } from "./inbox-types"

export function InboxComposerTools({
  onOpenDialog,
}: {
  onOpenDialog: (type: Exclude<InboxDialogType, null>) => void
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="ml-auto flex items-center gap-1 pb-1">
        <ToolButton label="Snippets · /" onClick={() => onOpenDialog("snippet")}>
          <Hash className="size-3.5" />
        </ToolButton>
        <ToolButton label="Templates Meta" onClick={() => onOpenDialog("template")}>
          <FileText className="size-3.5" />
        </ToolButton>
        <ToolButton label="Emoji" onClick={() => onOpenDialog("emoji")}>
          <Smile className="size-3.5" />
        </ToolButton>
      </div>
    </TooltipProvider>
  )
}

function ToolButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label={label}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
