"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { sendPasswordRecovery } from "@/lib/client/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const recoverySchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
})

type RecoveryValues = z.infer<typeof recoverySchema>

function getRecoveryErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return "Não foi possível enviar as instruções de recuperação agora."
}

export function RecoveryForm() {
  const form = useForm<RecoveryValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  })

  const serverError = form.formState.errors.root?.message ?? null
  const successMessage = form.formState.errors.success?.message ?? null

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

  function setSuccessMessage(message: string | null) {
    if (!message) {
      form.clearErrors("success")
      return
    }

    form.setError("success", {
      type: "success",
      message,
    })
  }

  async function onSubmit(values: RecoveryValues) {
    setServerError(null)
    setSuccessMessage(null)

    try {
      await sendPasswordRecovery({ email: values.email })
      setSuccessMessage("Enviamos as instruções de recuperação para o e-mail informado.")
      form.reset({ email: values.email })
    } catch (error) {
      setServerError(getRecoveryErrorMessage(error))
    }
  }

  return (
    <div className="space-y-4">
      {successMessage ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>E-mail enviado</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Não foi possível iniciar a recuperação</AlertTitle>
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

          <Button type="submit" className="h-11 w-full rounded-xl" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando instruções...
              </>
            ) : (
              "Enviar instruções"
            )}
          </Button>

          <p className="text-xs leading-5 text-muted-foreground">
            Se lembrar sua senha antes de redefinir, você pode voltar ao login normal a qualquer momento.
          </p>

          <Button asChild variant="ghost" className="h-11 w-full rounded-xl">
            <Link href="/login">Voltar para o login</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
