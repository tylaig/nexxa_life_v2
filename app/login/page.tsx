import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | NexxaLife",
  description: "Acesse sua área do NexxaLife para retomar diagnóstico, plano, execução e evolução.",
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="Entre para retomar seu sistema pessoal com clareza e continuidade."
      description="A entrada do NexxaLife foi retematizada para o ciclo principal do produto: diagnóstico, metas, checklist, agenda, reflexão e relatórios no mesmo workspace oficial."
      asideTitle="Uma entrada alinhada ao MVP real"
      asideDescription="Nos documentos do legado, cadastro/login fazem parte do núcleo do MVP. Esta superfície já abandona o posicionamento anterior de CRM/commerce e passa a refletir o produto NexxaLife."
      highlights={[
        "Retomar rapidamente o ponto atual do seu ciclo",
        "Manter acesso ao dashboard, agenda e relatórios",
        "Entrar com e-mail/senha ou Google no mesmo fluxo oficial",
        "Eliminar desalinhamento semântico com o produto legado",
      ]}
      footer={
        <>
          Ainda não possui conta?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Criar acesso ao NexxaLife
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
