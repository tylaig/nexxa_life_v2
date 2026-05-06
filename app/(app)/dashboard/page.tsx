import Link from "next/link"
import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeDashboardView } from "@/components/meu-dia/meu-dia-dashboard-view"
import { getSupabaseServerClient, getAuthenticatedAppUser } from "@/lib/server/auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default async function DashboardPage() {
  const auth = await getAuthenticatedAppUser()
  let isBlocked = false

  if (auth) {
    const supabase = await getSupabaseServerClient()
    const { data } = await supabase
      .from("app_user_profiles")
      .select("onboarded")
      .eq("user_id", auth.user.id)
      .single()
      
    if (data && data.onboarded === false) {
      isBlocked = true
    }
  }

  if (isBlocked) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Fundo Desfocado (Dashboard Real) */}
        <div className="pointer-events-none blur-md opacity-30 select-none h-full">
          <AppTopbar title="Dashboard NexxaLife" subtitle="Centro de clareza, execução e evolução do seu ciclo principal" />
          <NexxaLifeDashboardView />
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
              <p>Antes de acessar seu painel de execução, precisamos mapear suas áreas da vida (Saúde, Mente, Produtividade, etc) para calibrarmos o assistente e suas metas.</p>
              <Button asChild size="lg" className="mt-4 w-full">
                <Link href="/diagnostic">Fazer Meu Diagnóstico Agora</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <>
      <AppTopbar title="Dashboard NexxaLife" subtitle="Centro de clareza, execução e evolução do seu ciclo principal" />
      <NexxaLifeDashboardView />
    </>
  )
}
