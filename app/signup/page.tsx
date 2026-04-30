import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"

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
      asideDescription="A tela foi criada como base honesta para a próxima onda funcional. A semântica, os CTAs e o discurso agora pertencem ao produto NexxaLife, não ao contexto anterior da plataforma."
      highlights={[
        "Criar conta com foco em continuidade do ciclo pessoal",
        "Preparar a entrada para onboarding guiado",
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
      <form className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Seu nome"
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="nickname">
              Apelido
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="Como prefere ser chamado"
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phone">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
          <input type="checkbox" required className="mt-1" />
          <span>
            Concordo com os termos, política de privacidade e consentimento inicial de uso de dados para operar o ciclo NexxaLife.
          </span>
        </label>

        <Button type="submit" className="h-11 w-full rounded-xl">
          Criar conta
        </Button>
      </form>
    </AuthShell>
  )
}
