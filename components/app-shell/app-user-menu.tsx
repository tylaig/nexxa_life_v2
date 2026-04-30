"use client"

import Link from "next/link"
import { Bell, ChevronDown, CreditCard, LogOut, Settings, ShieldCheck, UserCircle2 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppUserMenu() {
  const user = {
    name: "Tylaig",
    email: "tylaig@meusuper.app",
    role: "Admin do workspace",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 rounded-full px-1.5 md:px-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">T</AvatarFallback>
          </Avatar>
          <div className="hidden text-left md:block">
            <div className="text-xs font-medium leading-none">{user.name}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{user.role}</div>
          </div>
          <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 rounded-2xl p-2">
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">T</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{user.role}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">
            <UserCircle2 className="h-4 w-4" />
            Meu perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/logs">
            <Bell className="h-4 w-4" />
            Notificações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/security">
            <ShieldCheck className="h-4 w-4" />
            Segurança e acesso
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/billing">
            <CreditCard className="h-4 w-4" />
            Plano e faturamento
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            Preferências
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
