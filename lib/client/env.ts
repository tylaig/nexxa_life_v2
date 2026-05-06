"use client"

/**
 * Variáveis de ambiente seguras para o browser.
 * No Next.js, NEXT_PUBLIC_* devem ser lidas diretamente via process.env
 * para que o bundler injete os valores em tempo de build.
 * NÃO importar de @/lib/server/env aqui — aquele módulo usa zod.parse
 * sobre process.env completo, que não funciona corretamente no browser.
 */

export function getClientSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

export function getClientSupabaseKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function getClientAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

export function hasClientSupabaseConfig(): boolean {
  return Boolean(getClientSupabaseUrl() && getClientSupabaseKey())
}
