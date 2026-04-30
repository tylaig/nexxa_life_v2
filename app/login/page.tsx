import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Login | nexxa_life",
  description: "Acesse sua área do nexxa_life para retomar diagnóstico, plano, execução e evolução.",
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="Entre para retomar seu sistema pessoal com clareza e continuidade."
      description="A entrada do nexxa_life foi retematizada para o ciclo principal do produto: diagnóstico, metas, checklist, agenda, reflexão e relatórios no mesmo workspace oficial."
      asideTitle="Uma entrada alinhada ao MVP real"
      asideDescription="Nos documentos do legado, cadastro/login fazem parte do núcleo do MVP. Esta superfície já abandona o posicionamento anterior de CRM/commerce e passa a refletir o produto nexxa_life."
      highlights={[
        "Retomar rapidamente o ponto atual do seu ciclo",
        "Manter acesso ao dashboard, agenda e relatórios",
        "Preparar a base para onboarding e autenticação final",
        "Eliminar desalinhamento semântico com o produto legado",
      ]}
      footer={
        <>
          Ainda não possui conta?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Criar acesso ao nexxa_life
          </Link>
          .
        </>
      }
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="voce@exemplo.com"
            className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Recuperar acesso
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <Button type="submit" className="h-11 w-full rounded-xl">
          Entrar no nexxa_life
        </Button>

        <Button type="button" variant="outline" className="h-11 w-full rounded-xl">
          Continuar com Google
        </Button>
      </form>
    </AuthShell>
  )
}
