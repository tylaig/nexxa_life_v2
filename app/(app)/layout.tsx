import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { CommandMenu } from "@/components/app-shell/command-menu"
import { getUserOnboardingStatus, getDiagnosticResult } from "@/lib/db/actions"
import { DiagnosticBlocker } from "@/components/meu-dia/diagnostic-blocker"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { onboarded, step } = await getUserOnboardingStatus()
  const diagnosticData = await getDiagnosticResult()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background relative">
        <DiagnosticBlocker onboarded={onboarded} step={step}>
          {children}
        </DiagnosticBlocker>
        <CommandMenu />
      </SidebarInset>
    </SidebarProvider>
  )
}
