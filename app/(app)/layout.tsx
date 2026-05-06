import type React from "react"
import { headers } from "next/headers"
import Link from "next/link"
import { Lock } from "lucide-react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { AiChatAssistant } from "@/components/ai/ai-chat-assistant"
import { getUserOnboardingStatus } from "@/lib/db/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { onboarded } = await getUserOnboardingStatus()
  
  // Use Next.js headers to check the current pathname.
  // We don't want to block the /diagnostic page itself!
  const headerList = await headers()
  const pathname = headerList.get("x-invoke-path") || ""
  
  const isDiagnosticPage = pathname.includes("/diagnostic")
  const isBlocked = !onboarded && !isDiagnosticPage

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background relative">
        {isBlocked ? (
          <div className="relative h-screen w-full overflow-hidden">
            {/* Fundo Desfocado (Conteúdo Real) */}
            <div className="pointer-events-none blur-md opacity-30 select-none h-full">
              {children}
            </div>
            
            {/* Overlay de Bloqueio Fixo */}
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-4">
              <Card className="max-w-md text-center shadow-2xl border-border/50 bg-background">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Diagnóstico Pendente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>O NexxaLife é um Sistema Operacional Pessoal moldado <strong>exclusivamente para você</strong>.</p>
                  <p>Antes de acessar seu painel, precisamos mapear suas áreas da vida (Saúde, Mente, Produtividade, etc) para calibrarmos o sistema e suas metas.</p>
                  <Button asChild size="lg" className="mt-4 w-full">
                    <Link href="/diagnostic">Fazer Meu Diagnóstico Agora</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          children
        )}
        <AiChatAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
