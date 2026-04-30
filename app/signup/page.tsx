import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Cadastro | NexxaLife",
  description: "Crie sua conta no NexxaLife para iniciar diagnóstico, planejamento e execução diária.",
}

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Cadastro"
      title="Crie seu acesso e comece a transformar diagnóstico em plano executável."
      description="Esta entrada substitui a antiga ausência de cadastro na raiz atual e se alinha ao recorte do legado: autenticação como parte do MVP, com onboarding e continuidade do ciclo NexxaLife."
      asideTitle="Cadastro já posicionado no domínio certo"
      asideDescription="A tela agora combina Google OAuth com fallback real por e-mail/senha para manter a jornada honesta enquanto evoluímos o onboarding persistente."
      highlights={[
        "Criar conta com foco em continuidade do ciclo pessoal",
        "Entrar no onboarding com fluxo funcional mínimo",
        "Apoiar diagnóstico, metas, checklist e agenda",
        "Reduzir o gap da rota /signup (+ alias /cadastro)",
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
      <SignupForm />
    </AuthShell>
  )
}
