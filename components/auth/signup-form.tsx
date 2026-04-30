"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
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
    nickname: z.string().optional(),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(8, "Use uma senha com pelo menos 8 caracteres."),
    phone: z.string().optional(),
    acceptedTerms: z.boolean().refine((value) => value, "Você precisa aceitar os termos para continuar."),
  })

type SignupValues = z.infer<typeof signupSchema>

function getSignupErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return "Não foi possível criar sua conta agora. Tente novamente em instantes."
}

export function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      nickname: "",
      email: "",
      password: "",
      phone: "",
      acceptedTerms: false,
    },
  })

  const serverError = form.formState.errors.root?.message ?? null

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
        nickname: values.nickname,
        phone: values.phone,
      })
      router.push("/onboarding?welcome=1")
      router.refresh()
    } catch (error) {
      setServerError(getSignupErrorMessage(error))
    }
  }

  return (
    <div className="space-y-4">
      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Não foi possível criar sua conta</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-3">
        <GoogleAuthButton next="/onboarding" label="Criar conta com Google" />
        <p className="text-xs leading-5 text-muted-foreground">
          Google é o caminho mais rápido para iniciar. Se a configuração OAuth ainda não estiver ativa, finalize o acesso pelo formulário abaixo.
        </p>
      </div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="bg-background px-3">ou cadastre manualmente</span>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" required placeholder="Seu nome" className="h-11 rounded-xl px-3 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apelido</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Como prefere ser chamado" className="h-11 rounded-xl px-3 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" required className="h-11 rounded-xl px-3 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="(11) 99999-9999" className="h-11 rounded-xl px-3 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptedTerms"
            render={({ field }) => (
              <FormItem>
                <label className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} className="mt-1" />
                  </FormControl>
                  <span>
                    Concordo com os termos, política de privacidade e consentimento inicial de uso de dados para operar o ciclo NexxaLife.
                  </span>
                </label>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="h-11 w-full rounded-xl" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
