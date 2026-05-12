import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { CommandMenu } from "@/components/app-shell/command-menu"
import { getUserOnboardingStatus, getDiagnosticResult } from "@/lib/db/actions"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { DiagnosticBlocker } from "@/components/meu-dia/diagnostic-blocker"
import { AnalysisToast } from "@/components/onboarding/analysis-toast"

export const dynamic = "force-dynamic"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { onboarded, step } = await getUserOnboardingStatus()
  const auth = await getAuthenticatedAppUser()
  const diagnosticData = await getDiagnosticResult()

  return (
    <SidebarProvider>
      <AppSidebar profile={auth?.profile ?? null} />
      <SidebarInset className="bg-background relative">
        <DiagnosticBlocker onboarded={onboarded} step={step}>
          {children}
        </DiagnosticBlocker>
        <CommandMenu profile={auth?.profile ?? null} />
        <AnalysisToast />
      </SidebarInset>
    </SidebarProvider>
  )
}
