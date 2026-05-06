"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

import { getSupabaseBrowserClient } from "@/lib/client/supabase"

/**
 * Página de fallback para OAuth com Implicit Flow (hash fragment).
 * Quando o Supabase retorna #access_token=... no hash, o server não consegue
 * ler isso. Esta página roda no client-side, lê a sessão via detectSessionInUrl,
 * e redireciona para o destino correto.
 */
export default function AuthConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") || "/dashboard"
  const processed = useRef(false)

  useEffect(() => {
    if (processed.current) return
    processed.current = true

    async function handleSession() {
      try {
        const supabase = getSupabaseBrowserClient()

        // O SDK detecta automaticamente o hash fragment ou o code na URL
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("[auth/confirm] getSession error:", error.message)
          router.replace(`/login?error=session_failed`)
          return
        }

        if (data.session) {
          // Sessão encontrada — redireciona para o destino
          router.replace(next)
          return
        }

        // Sem sessão — volta para o login
        router.replace(`/login?error=missing_code`)
      } catch (err) {
        console.error("[auth/confirm] unexpected error:", err)
        router.replace(`/login?error=session_failed`)
      }
    }

    handleSession()
  }, [next, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Finalizando autenticação...</p>
          <p className="text-xs text-muted-foreground">Aguarde enquanto validamos seu acesso ao NexxaLife.</p>
        </div>
      </div>
    </div>
  )
}
