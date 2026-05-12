import type React from "react"
import { redirect } from "next/navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { CommandMenu } from "@/components/app-shell/command-menu"
import { getUserOnboardingStatus, getDiagnosticResult } from "@/lib/db/actions"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { DiagnosticBlocker } from "@/components/nexxa-life/diagnostic-blocker"
import { AnalysisToast } from "@/components/onboarding/analysis-toast"

export const dynamic = "force-dynamic"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthenticatedAppUser() as any
  if (!auth || (!auth.user && !auth.isDatabaseError)) redirect("/login")

  if (auth.isDatabaseError) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="rounded-lg border bg-destructive/10 p-6 text-center max-w-md border-destructive">
          <h2 className="text-xl font-bold text-destructive mb-2">Erro de Conexão com Banco de Dados</h2>
          <p className="text-sm text-foreground/80 mb-4">
            O login funcionou, mas a Vercel não conseguiu conectar ao Supabase (timeout). 
            Se você estiver usando o Supabase, certifique-se de que a <strong>DATABASE_URL</strong> na Vercel 
            usa a porta <strong>6543</strong> (Connection Pooler) que suporta IPv4, pois a Vercel não suporta a porta 5432 (IPv6).
          </p>
          <div className="text-xs font-mono bg-background p-2 rounded text-left overflow-x-auto text-muted-foreground">
            {auth.errorDetails}
          </div>
        </div>
      </div>
    )
  }

  const { onboarded, step } = await getUserOnboardingStatus()
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
