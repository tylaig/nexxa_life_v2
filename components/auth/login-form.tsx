"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signInWithPassword } from "@/lib/client/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "Informe sua senha com pelo menos 6 caracteres."),
})

type LoginValues = z.infer<typeof loginSchema>

function getLoginErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return "Não foi possível entrar agora. Tente novamente em instantes."
}

function sanitizeNext(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/dashboard"
  }

  return next
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = sanitizeNext(searchParams.get("next"))
  const recovered = searchParams.get("recovered") === "1"

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [serverError, setServerError] = [form.formState.errors.root?.message ?? null, (message: string | null) => {
    if (!message) {
      form.clearErrors("root")
      return
    }

    form.setError("root", {
      type: "server",
      message,
    })
  }] as const

  async function onSubmit(values: LoginValues) {
    setServerError(null)

    try {
      await signInWithPassword(values)
      router.push(next)
      router.refresh()
    } catch (error) {
      setServerError(getLoginErrorMessage(error))
    }
  }

  return (
    <div className="space-y-4">
      {recovered ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acesso redefinido</AlertTitle>
          <AlertDescription>Se sua senha foi alterada com sucesso, entre novamente para continuar seu ciclo no NexxaLife.</AlertDescription>
        </Alert>
      ) : null}

      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" required placeholder="voce@exemplo.com" className="h-11 rounded-xl px-3 py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-3">
                  <FormLabel>Senha</FormLabel>
                  <Link href="/recover" className="text-xs text-primary hover:underline">
                    Recuperar acesso
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} type="password" required className="h-11 rounded-xl px-3 py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="h-11 w-full rounded-xl" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar no NexxaLife"
            )}
          </Button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span className="bg-background px-3">ou</span>
            </div>
          </div>

          <GoogleAuthButton next={next} />
          <p className="text-xs leading-5 text-muted-foreground">
            Se o Google ainda não estiver configurado no ambiente, use o login por e-mail como fallback até concluirmos a integração OAuth.
          </p>
        </form>
      </Form>
    </div>
  )
}
