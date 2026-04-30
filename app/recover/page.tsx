import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { RecoveryForm } from "@/components/auth/recovery-form"

export const metadata: Metadata = {
  title: "Recuperar acesso | NexxaLife",
  description: "Receba instruções para redefinir sua senha e retomar seu ciclo no NexxaLife.",
}

export default function RecoverPage() {
  return (
    <AuthShell
      eyebrow="Recuperação"
      title="Recupere seu acesso e volte ao fluxo principal com segurança."
      description="Quando o acesso por senha falhar, esta superfície envia a recuperação por e-mail para devolver o usuário ao ciclo oficial do NexxaLife sem atalhos quebrados."
      asideTitle="Recuperação tratada como parte do produto"
      asideDescription="A recuperação deixa de ser placeholder e passa a existir como etapa pública dedicada, coerente com a promessa de continuidade do sistema pessoal."
      highlights={[
        "Receber instruções reais de redefinição por e-mail",
        "Retomar login sem fricção desnecessária",
        "Preservar a jornada oficial de onboarding e dashboard",
        "Eliminar CTA quebrado na tela de entrada",
      ]}
      footer={
        <>
          Lembrou sua senha?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Voltar para o login
          </Link>
          .
        </>
      }
    >
      <RecoveryForm />
    </AuthShell>
  )
}
