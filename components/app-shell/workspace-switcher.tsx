"use client"

import * as React from "react"
import Link from "next/link"
import { Check, ChevronsUpDown, Plus, Settings } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { tenants } from "@/lib/mock/tenants"
import { useActiveWorkspace } from "@/lib/workspaces/use-active-workspace"
import { OndaLogo } from "@/components/inbox/onda-logo"

export function WorkspaceSwitcher({ compact = false }: { compact?: boolean }) {
  const { activeWorkspace, setActiveWorkspaceId } = useActiveWorkspace()

  return (
    <div className="flex w-full items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={compact ? "sm" : "default"}
            className={compact ? "h-9 min-w-0 flex-1 justify-between gap-2 rounded-xl border-border/60 bg-background/80 px-2.5 shadow-none hover:bg-accent/60" : "h-10 min-w-0 flex-1 justify-between rounded-xl border-border/60 bg-background/80 px-3 shadow-none hover:bg-accent/60"}
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                <OndaLogo className="h-4 w-4" />
              </div>
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-medium">{activeWorkspace.name}</div>
                {!compact ? <div className="truncate text-xs text-muted-foreground">{activeWorkspace.domain}</div> : null}
              </div>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-xl" align="start">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
          {tenants.map((tenant) => (
            <DropdownMenuItem key={tenant.id} className="gap-3" onSelect={() => setActiveWorkspaceId(tenant.id)}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                {tenant.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{tenant.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{tenant.domain}</div>
              </div>
              {tenant.id === activeWorkspace.id ? <Check className="h-4 w-4 text-primary" /> : null}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings/workspace" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurar workspace
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="h-4 w-4" />
            Adicionar workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button asChild variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl border border-border/60 bg-background/80 text-muted-foreground hover:bg-accent/60 hover:text-foreground">
        <Link href="/settings/workspace">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Abrir configurações do workspace</span>
        </Link>
      </Button>
    </div>
  )
}
