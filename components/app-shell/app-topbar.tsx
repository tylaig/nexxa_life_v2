"use client"

import Link from "next/link"
import { Search, Bell, HelpCircle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { AppUserMenu } from "@/components/app-shell/app-user-menu"

export type AppTopbarProps = {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function AppTopbar({ title, subtitle, actions }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="flex min-h-14 flex-wrap items-center gap-2 px-4 py-2 md:px-6 border-b border-border/40">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <SidebarTrigger className="-ml-2 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-medium leading-tight md:text-base">{title}</h1>
            {subtitle ? <p className="truncate text-[13px] text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>

        <div className="order-3 flex w-full items-center gap-2 md:order-none md:w-auto md:flex-1 md:justify-end pr-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-full justify-start gap-2 rounded-lg border-transparent bg-muted/40 text-muted-foreground shadow-none hover:bg-muted/60 md:w-[240px] xl:w-[280px]"
          >
            <Search className="h-4 w-4" />
            <span className="truncate text-xs font-normal">Buscar...</span>
            <Kbd className="ml-auto hidden sm:inline-flex bg-background/50 text-[10px] border-border/50">⌘K</Kbd>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          {actions ? <div className="hidden items-center gap-2 xl:flex">{actions}</div> : null}
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Link href="/settings">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Ajuda e configurações</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
            <Link href="/logs">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="sr-only">Notificações e logs</span>
            </Link>
          </Button>
          <ThemeToggle />
          <div className="pl-2">
            <AppUserMenu />
          </div>
        </div>

        {actions ? <div className="order-4 flex w-full flex-wrap items-center gap-2 xl:hidden mt-2">{actions}</div> : null}
      </div>
    </header>
  )
}
