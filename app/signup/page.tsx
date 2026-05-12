import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { redirect } from "next/navigation"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignupForm } from "@/components/auth/signup-form"
import { getAuthenticatedAppUser } from "@/lib/server/auth-user"

export const metadata: Metadata = {
  title: "Criar conta | NexxaLife",
  description: "Crie sua conta no NexxaLife e comece a transformar diagnóstico em metas, execução e evolução contínua.",
}

export default async function SignupPage() {
  const auth = await getAuthenticatedAppUser()
  if (auth) {
    redirect("/dashboard")
  }

  return (
    <AuthShell
      eyebrow="Cadastro"
      title="Crie sua conta e comece sua jornada de evolução."
      description="O NexxaLife conecta diagnóstico, planejamento e execução diária em um único sistema — feito para quem leva crescimento a sério."
      asideTitle="Seu sistema operacional de evolução pessoal"
      asideDescription="Entre no ciclo NexxaLife: diagnostique seu momento, defina metas, execute com consistência e acompanhe sua evolução ao longo do tempo."
      highlights={[
        "Diagnóstico guiado para clareza imediata do momento atual",
        "Metas conectadas à execução diária com checklist",
        "Agenda e diário integrados em um único workspace",
        "Relatórios de evolução para leitura histórica e decisão",
      ]}
      footer={
        <>
          Já possui conta?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Entrar agora
          </Link>
          .
        </>
      }
    >
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  )
}
