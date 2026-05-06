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
  Store,
  Target,
} from "lucide-react"

import type { AppUserProfile } from "@/modules/auth-profile/contracts"
import { isAdminProfile } from "@/modules/auth-profile/contracts"

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

/** Item único de destaque: Dashboard e Studio */
export const primaryItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studio", label: "AI Studio", icon: Sparkles },
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

export const adminOnlySettingsItems: NavItem[] = [
  { href: "/framework-admin", label: "Framework Admin", icon: ShieldCheck },
]

export const sharedSettingsItems: NavItem[] = [
  { href: "/settings", label: "Configurações", icon: Settings },
]

export const settingsSections: NavSection[] = [
  {
    label: "Administração",
    icon: ShieldCheck,
    children: [...adminOnlySettingsItems, ...sharedSettingsItems],
  },
]

export type MeuDiaNavigation = {
  primaryItems: NavItem[]
  accordionSections: NavSection[]
  settingsSections: NavSection[]
}

export function getMeuDiaNavigationForProfile(profile: Pick<AppUserProfile, "role"> | null | undefined): MeuDiaNavigation {
  return {
    primaryItems,
    accordionSections,
    settingsSections: [
      {
        label: "Administração",
        icon: ShieldCheck,
        children: [...(isAdminProfile(profile) ? adminOnlySettingsItems : []), ...sharedSettingsItems],
      },
    ],
  }
}
