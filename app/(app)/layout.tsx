import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { AiChatAssistant } from "@/components/ai/ai-chat-assistant"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        {children}
        <AiChatAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
