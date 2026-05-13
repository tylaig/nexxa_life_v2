import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileBarChart2,
  FileText,
  Goal,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Store,
  Target,
} from "lucide-react"

import type { AppUserProfile } from "@/modules/auth-profile/contracts"

export type NavItem = {
  href: string
  label: string
  icon?: unknown
}

export type NavSection = {
  label: string
  icon: unknown
  children: NavItem[]
}

/** Item único de destaque: Dashboard e Nexxa, com /nexxa canônico e /studio compatível. */
export const primaryItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/nexxa", label: "Nexxa", icon: Sparkles },
]

/**
 * Seções expansíveis do ciclo principal.
 * O /diagnostic foi removido — aparece apenas no /onboarding.
 */
export const accordionSections: NavSection[] = [
  {
    label: "Meu Ciclo",
    icon: Target,
    children: [
      { href: "/goals", label: "Metas", icon: Goal },
      { href: "/checklist", label: "Checklist", icon: ClipboardList },
      { href: "/agenda", label: "Agenda", icon: CalendarDays },
      { href: "/journal", label: "Diário", icon: FileText },
      { href: "/reports", label: "Relatórios", icon: FileBarChart2 },
    ],
  },
  {
    label: "Ecossistema",
    icon: Sparkles,
    children: [
      { href: "/academy", label: "Academia", icon: BookOpen },
      { href: "/apps", label: "Integrações", icon: Sparkles },
      { href: "/news", label: "News", icon: FileText },
      { href: "/marketplace", label: "Marketplace", icon: Store },
    ],
  },
]

export const adminOnlySettingsItems: NavItem[] = []

export const sharedSettingsItems: NavItem[] = [
  { href: "/settings", label: "Configurações", icon: Settings },
  { href: "/settings/profile", label: "Perfil", icon: UserCircle2 },
  { href: "/settings/security", label: "Segurança", icon: ShieldCheck },
]

export const settingsSections: NavSection[] = [
  {
    label: "Configurações",
    icon: Settings,
    children: sharedSettingsItems,
  },
]

export type NexxaLifeNavigation = {
  primaryItems: NavItem[]
  accordionSections: NavSection[]
  settingsSections: NavSection[]
}

export function getNexxaLifeNavigationForProfile(profile: Pick<AppUserProfile, "role"> | null | undefined): NexxaLifeNavigation {
  return {
    primaryItems,
    accordionSections,
    settingsSections: [
      {
        label: "Configurações",
        icon: Settings,
        children: sharedSettingsItems,
      },
    ],
  }
}
