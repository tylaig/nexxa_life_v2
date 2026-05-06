"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  CalendarDays,
  CreditCard,
  FileText,
  Goal,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
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
import type { AppUserProfile } from "@/modules/auth-profile/contracts"
import { isAdminProfile } from "@/modules/auth-profile/contracts"

export type CommandMenuItem = {
  href: string
  label: string
  shortcut?: string
  icon: React.ComponentType<{ className?: string }>
}

export type CommandMenuGroup = {
  heading: string
  items: CommandMenuItem[]
}

const mainCommandGroups: CommandMenuGroup[] = [
  {
    heading: "Meu Ciclo",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/studio", label: "AI Studio", icon: Sparkles },
      { href: "/agenda", label: "Agenda", icon: CalendarDays },
      { href: "/goals", label: "Metas", icon: Goal },
      { href: "/journal", label: "Diário", icon: FileText },
    ],
  },
  {
    heading: "Configurações & Perfil",
    items: [
      { href: "/settings/profile", label: "Meu Perfil", icon: UserCircle2 },
      { href: "/logs", label: "Notificações", icon: Bell },
      { href: "/settings/security", label: "Segurança e Acesso", icon: ShieldCheck },
      { href: "/settings/billing", label: "Plano e Faturamento", icon: CreditCard },
      { href: "/settings", label: "Preferências", shortcut: "⌘S", icon: Settings },
    ],
  },
]

const adminCommandGroup: CommandMenuGroup = {
  heading: "Admin SaaS",
  items: [
    { href: "/framework-admin", label: "Painel Admin", shortcut: "admin", icon: ShieldCheck },
  ],
}

export function getCommandMenuForProfile(profile: Pick<AppUserProfile, "role"> | null | undefined): CommandMenuGroup[] {
  return isAdminProfile(profile) ? [...mainCommandGroups, adminCommandGroup] : mainCommandGroups
}

export type CommandMenuProps = {
  profile?: Pick<AppUserProfile, "role"> | null
}

export function CommandMenu({ profile }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const groups = React.useMemo(() => getCommandMenuForProfile(profile), [profile])

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

        {groups.map((group, index) => (
          <React.Fragment key={group.heading}>
            {index > 0 ? <CommandSeparator /> : null}
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => {
                const Icon = item.icon

                return (
                  <CommandItem key={item.href} onSelect={() => runCommand(() => router.push(item.href))}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
