import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { AiChatAssistant } from "@/components/ai/ai-chat-assistant"
import { getUserOnboardingStatus } from "@/lib/db/actions"
import { DiagnosticBlocker } from "@/components/meu-dia/diagnostic-blocker"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { onboarded } = await getUserOnboardingStatus()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background relative">
        <DiagnosticBlocker onboarded={onboarded}>
          {children}
        </DiagnosticBlocker>
        <AiChatAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
