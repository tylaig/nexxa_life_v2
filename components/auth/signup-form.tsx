"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Check, Loader2, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signUpWithPassword } from "@/lib/client/auth"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Informe seu nome completo."),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(8, "Use uma senha com pelo menos 8 caracteres."),
    acceptedTerms: z.boolean().refine((value) => value, "Você precisa aceitar os termos para continuar."),
  })

type SignupValues = z.infer<typeof signupSchema>

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: "Muito fraca", color: "bg-red-500" }
  if (score === 2) return { score, label: "Fraca", color: "bg-orange-500" }
  if (score === 3) return { score, label: "Razoável", color: "bg-yellow-500" }
  if (score === 4) return { score, label: "Boa", color: "bg-emerald-500" }
  return { score, label: "Forte", color: "bg-teal-500" }
}

function getSignupErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    const msg = error.message.toLowerCase()

    if (msg.includes("user already registered") || msg.includes("already registered")) {
      return "Já existe uma conta com esse e-mail. Acesse pelo login ou recupere sua senha."
    }
    if (msg.includes("password should be at least")) {
      return "A senha precisa ter pelo menos 8 caracteres."
    }
    if (msg.includes("invalid email")) {
      return "Informe um endereço de e-mail válido."
    }
    if (msg.includes("signup is disabled")) {
      return "O cadastro está temporariamente indisponível. Tente novamente em breve."
    }

    return error.message
  }

  return "Não foi possível criar sua conta agora. Tente novamente em instantes."
}

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptedTerms: false,
    },
  })

  const serverError = form.formState.errors.root?.message ?? null
  const passwordValue = form.watch("password")
  const passwordStrength = getPasswordStrength(passwordValue)

  function setServerError(message: string | null) {
    if (!message) {
      form.clearErrors("root")
      return
    }

    form.setError("root", {
      type: "server",
      message,
    })
  }

  async function onSubmit(values: SignupValues) {
    setServerError(null)

    try {
      await signUpWithPassword({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      })
      router.push("/onboarding?welcome=1")
      router.refresh()
    } catch (error) {
      setServerError(getSignupErrorMessage(error))
    }
  }

  return (
    <Form {...form}>
    <div className="space-y-4">
      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Não foi possível criar sua conta</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      {/* Checkbox de Termos — Compartilhado */}
      <FormField
        control={form.control}
        name="acceptedTerms"
        render={({ field }) => (
          <FormItem>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background/40 p-4 text-sm text-muted-foreground transition-colors hover:bg-muted/30 has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  className="mt-0.5"
                />
              </FormControl>
              <span className="leading-5">
                Li e aceito os{" "}
                <a href="#" className="font-medium text-foreground underline">Termos de Uso</a>
                {" "}e a{" "}
                <a href="#" className="font-medium text-foreground underline">Política de Privacidade</a>
                {" "}do NexxaLife.
              </span>
            </label>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Google — método principal */}
      <GoogleAuthButton next="/dashboard" label="Criar conta com Google" termsAccepted={form.watch('acceptedTerms')} />

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="px-3 [background:inherit]">ou cadastre com e-mail</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    className="h-11 rounded-xl bg-background/60 px-3 py-2"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Mínimo 8 caracteres"
                      className="h-11 rounded-xl bg-background/60 px-3 py-2 pr-11"
                      autoComplete="new-password"
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
                {/* Indicador de força da senha */}
                {passwordValue && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= passwordStrength.score
                              ? passwordStrength.color
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    {passwordStrength.label && (
                      <p className="text-xs text-muted-foreground">
                        Força da senha:{" "}
                        <span className={
                          passwordStrength.score <= 1 ? "text-red-500" :
                          passwordStrength.score === 2 ? "text-orange-500" :
                          passwordStrength.score === 3 ? "text-yellow-600 dark:text-yellow-500" :
                          "text-emerald-600 dark:text-emerald-400"
                        }>
                          {passwordStrength.label}
                        </span>
                      </p>
                    )}
                  </div>
                )}
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
                Criando sua conta...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Criar conta gratuita
              </>
            )}
          </Button>
        </form>
    </div>
    </Form>
  )
}
