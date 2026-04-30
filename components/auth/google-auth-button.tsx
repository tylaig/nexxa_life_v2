"use client"

import { useState } from "react"
import { Chrome, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/client/oauth"

export function GoogleAuthButton({
  next = "/dashboard",
  label = "Continuar com Google",
}: {
  next?: string
  label?: string
}) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setSubmitting(true)
    setError(null)

    try {
      await signInWithGoogle(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o login com Google.")
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" className="h-11 w-full rounded-xl" disabled={submitting} onClick={handleClick}>
        <Chrome className="h-4 w-4" />
        {submitting ? "Conectando ao Google..." : label}
      </Button>
      {error ? (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  )
}
