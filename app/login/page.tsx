import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { redirect } from "next/navigation"

import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"

export const metadata: Metadata = {
  title: "Entrar | NexxaLife",
  description: "Acesse o NexxaLife para retomar seu ciclo de diagnóstico, metas, execução e evolução pessoal.",
}

export default async function LoginPage() {
  const auth = await getAuthenticatedAppUser()
  if (auth) {
    redirect("/dashboard")
  }

  return (
    <AuthShell
      eyebrow="Acesso"
      title="Bem-vindo de volta ao seu ciclo."
      description="Entre no NexxaLife para acessar dashboard, agenda, checklist, diário e relatórios — tudo integrado em um único workspace pessoal."
      asideTitle="Seu sistema pessoal de evolução"
      asideDescription="O NexxaLife organiza diagnóstico, planejamento estratégico e execução diária em uma jornada contínua e observável."
      highlights={[
        "Retome rapidamente o ponto atual do seu ciclo",
        "Acesse dashboard, agenda e relatórios integrados",
        "Entre com e-mail/senha ou Google — sem fricção",
        "Mantenha consistência e evolução ao longo do tempo",
      ]}
      footer={
        <>
          Ainda não possui conta?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Criar conta gratuita
          </Link>
          .
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
