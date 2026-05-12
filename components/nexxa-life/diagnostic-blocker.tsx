"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DiagnosticBlocker({
  onboarded,
  step,
  children,
}: {
  onboarded: boolean
  step: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const isOnboardingPage = pathname?.includes("/setup") || pathname?.includes("/diagnostic") || pathname?.includes("/planning") || pathname?.includes("/studio") || false
  // Block only if user never completed diagnostic (step is still welcome)
  // Once they've done the diagnostic (step=goals/planning/complete), let them through
  const isBlocked = !onboarded && step === "welcome" && !isOnboardingPage

  if (isBlocked) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <div className="pointer-events-none blur-md opacity-30 select-none h-full">
          {children}
        </div>
        
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm p-4">
          {/* Ambient */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl animate-pulse [animation-delay:1s]" />

          <div className="relative z-10 max-w-md text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/10 shadow-lg">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Configuração Inicial</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O NexxaLife é um Sistema Operacional Pessoal moldado exclusivamente para você. Precisamos mapear suas áreas da vida para calibrar o sistema.
              </p>
            </div>
            <Button asChild size="lg" className="px-10 h-12 text-base">
              <Link href="/setup">
                <Sparkles className="h-4 w-4 mr-2" />
                Iniciar Configuração
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
