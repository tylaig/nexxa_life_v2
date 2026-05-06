"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  CreditCard,
  FileText,
  Goal,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Bell
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Digite um comando ou busque uma tela..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        
        <CommandGroup heading="Meu Ciclo">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/studio"))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Studio</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/agenda"))}>
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Agenda</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/goals"))}>
            <Goal className="mr-2 h-4 w-4" />
            <span>Metas</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/journal"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Diário</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Configurações & Perfil">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings/profile"))}>
            <UserCircle2 className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/logs"))}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificações</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings/security"))}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Segurança e Acesso</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings/billing"))}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Plano e Faturamento</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Preferências</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
