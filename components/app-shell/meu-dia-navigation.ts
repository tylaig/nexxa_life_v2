import {
  BookOpen,
  Brain,
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
  Workflow,
} from "lucide-react"

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

export const primaryItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/diagnostic", label: "Diagnóstico", icon: Brain },
  { href: "/checklist", label: "Checklist", icon: ClipboardList },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/goals", label: "Metas", icon: Target },
]

export const accordionSections: NavSection[] = [
  {
    label: "Planejamento",
    icon: Workflow,
    children: [
      { href: "/checklist", label: "Checklist", icon: ClipboardList },
      { href: "/agenda", label: "Agenda", icon: CalendarDays },
      { href: "/goals", label: "Metas", icon: Goal },
    ],
  },
  {
    label: "Reflexão",
    icon: FileText,
    children: [
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

export const settingsSections: NavSection[] = [
  {
    label: "Administração",
    icon: ShieldCheck,
    children: [
      { href: "/framework-admin", label: "Framework Admin", icon: ShieldCheck },
      { href: "/settings", label: "Configurações", icon: Settings },
    ],
  },
]
