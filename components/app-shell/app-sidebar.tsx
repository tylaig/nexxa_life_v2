"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getMeuDiaNavigationForProfile, type NavSection } from "@/components/app-shell/meu-dia-navigation"
import type { AppUserProfile } from "@/modules/auth-profile/contracts"

function SidebarExpandableItem({
  item,
  pathname,
  isOpen,
  onOpenChange,
}: {
  item: NavSection
  pathname: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const Icon = item.icon as React.ComponentType<{ className?: string }>
  const hasActiveChild = item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"))

  return (
    <SidebarMenuItem>
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        <div className="group/menu-item relative">
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex h-10 w-full items-center gap-2 rounded-xl px-2.5 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isOpen || hasActiveChild ? "font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground/85",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              <ChevronRight
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover/menu-item:text-foreground",
                  isOpen ? "rotate-90 text-foreground" : "",
                )}
              />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub className="mx-4 mt-1 gap-1 border-l-border/70 py-1 pl-2 pr-0">
            {item.children.map((child) => {
              const ChildIcon = child.icon as React.ComponentType<{ className?: string }> | undefined
              const childActive = pathname === child.href || pathname.startsWith(child.href + "/")

              return (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={childActive}
                    className="h-8 rounded-lg px-2 text-[13px] text-sidebar-foreground/80 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-accent/70 data-[active=true]:text-sidebar-accent-foreground"
                  >
                    <Link href={child.href}>
                      {ChildIcon ? <ChildIcon className="h-3.5 w-3.5" /> : null}
                      <span>{child.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

export function AppSidebar({ profile }: { profile?: AppUserProfile | null }) {
  const pathname = usePathname()
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  const navigation = React.useMemo(() => getMeuDiaNavigationForProfile(profile), [profile])
  const { primaryItems, accordionSections, settingsSections } = navigation

  const allSections = [...accordionSections, ...settingsSections]

  const getActiveSection = () => {
    return allSections.find((section) =>
      section.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/")),
    )?.label ?? null
  }

  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)

  React.useEffect(() => {
    const active = getActiveSection()
    if (active) {
      setExpandedSection(active)
    }
  }, [pathname])

  const handleToggle = (label: string, isOpen: boolean) => {
    if (isOpen) {
      setExpandedSection(label)
    } else if (expandedSection === label) {
      setExpandedSection(null)
    }
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="gap-2 px-3 pt-3">
        <div className={cn(
          "flex items-center gap-2.5 rounded-xl px-2 py-2",
          collapsed ? "justify-center" : ""
        )}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-[11px] font-bold">NL</span>
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">NexxaLife</p>
              <p className="truncate text-[10px] text-muted-foreground">Sistema de evolução pessoal</p>
            </div>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="gap-2 px-2 py-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            NexxaLife
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {primaryItems.map((item) => {
                const Icon = item.icon as React.ComponentType<{ className?: string }> | undefined
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-10 rounded-xl px-2.5 text-sidebar-foreground/85 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent/70"
                    >
                      <Link href={item.href}>
                        {Icon ? <Icon /> : null}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-1" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {collapsed ? (
              <SidebarMenu className="gap-1.5">
                {accordionSections.map((section) => {
                  const Icon = section.icon as React.ComponentType<{ className?: string }>
                  const isActive = section.label === expandedSection
                  return (
                    <SidebarMenuItem key={section.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={section.label}
                        className="h-10 rounded-xl px-2.5 text-sidebar-foreground/85 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent/70"
                      >
                        <Link href={section.children[0]?.href ?? "#"}>
                          <Icon />
                          <span>{section.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            ) : (
              <SidebarMenu className="gap-1.5">
                {accordionSections.map((section) => (
                  <SidebarExpandableItem
                    key={section.label}
                    item={section}
                    pathname={pathname}
                    isOpen={expandedSection === section.label}
                    onOpenChange={(open) => handleToggle(section.label, open)}
                  />
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-2 pb-3 pt-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            Administração
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {collapsed ? (
              <SidebarMenu className="gap-1.5">
                {settingsSections.map((section) => {
                  const Icon = section.icon as React.ComponentType<{ className?: string }>
                  const isActive = section.label === expandedSection
                  return (
                    <SidebarMenuItem key={section.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={section.label}
                        className="h-10 rounded-xl px-2.5 text-sidebar-foreground/85 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent/70"
                      >
                        <Link href={section.children[0]?.href ?? "/settings"}>
                          <Icon />
                          <span>{section.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            ) : (
              <SidebarMenu className="gap-1.5">
                {settingsSections.map((section) => (
                  <SidebarExpandableItem
                    key={section.label}
                    item={section}
                    pathname={pathname}
                    isOpen={expandedSection === section.label}
                    onOpenChange={(open) => handleToggle(section.label, open)}
                  />
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
