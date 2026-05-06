"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react"
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
    const msg = error.message.toLowerCase()

    if (msg.includes("email not confirmed")) {
      return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada e clique no link enviado pelo NexxaLife."
    }
    if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
      return "E-mail ou senha incorretos. Verifique os dados e tente novamente."
    }
    if (msg.includes("user not found")) {
      return "Não encontramos uma conta com esse e-mail. Crie sua conta primeiro."
    }
    if (msg.includes("too many requests") || msg.includes("rate limit")) {
      return "Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente."
    }

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
  const oauthError = searchParams.get("error")

  const [showPassword, setShowPassword] = useState(false)

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
        <Alert className="border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <AlertTitle className="text-emerald-700 dark:text-emerald-300">Acesso redefinido</AlertTitle>
          <AlertDescription className="text-emerald-600 dark:text-emerald-400">
            Se sua senha foi alterada com sucesso, entre novamente para continuar seu ciclo no NexxaLife.
          </AlertDescription>
        </Alert>
      ) : null}

      {oauthError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Falha no login com Google</AlertTitle>
          <AlertDescription>
            {oauthError === "missing_code"
              ? "O código de autorização não foi encontrado. Tente novamente."
              : "Não foi possível concluir o login com Google. Use e-mail e senha ou tente novamente."}
          </AlertDescription>
        </Alert>
      ) : null}

      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      {/* Google primeiro — reduz fricção */}
      <GoogleAuthButton next={next} />

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="px-3 [background:inherit]">ou entre com e-mail</span>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                    placeholder="voce@exemplo.com"
                    className="h-11 rounded-xl bg-background/60 px-3 py-2"
                    autoComplete="email"
                  />
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
                    Esqueci minha senha
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      required
                      className="h-11 rounded-xl bg-background/60 px-3 py-2 pr-11"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-11 w-full rounded-xl font-medium"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar no NexxaLife"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
