"use client"

import { KeyRound, ShieldCheck, EyeOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function IntegrationCredentialsPanel({
  mode,
  storage,
  configured = true,
}: {
  mode?: string
  storage?: string
  configured?: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-primary" />Credenciais e segredos</CardTitle>
        <CardDescription>Separação entre metadata pública, segredos privados e readiness de ativação no workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Modo</div>
          <div className="mt-1 font-medium">{mode ?? "—"}</div>
        </div>
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Storage</div>
          <div className="mt-1 font-medium">{storage ?? "—"}</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge variant="secondary"><ShieldCheck className="mr-1 h-3 w-3" />server-only</Badge>
            <Badge variant="outline"><EyeOff className="mr-1 h-3 w-3" />segredo mascarado</Badge>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</div>
          <div className="mt-1 font-medium">{configured ? "Configuradas" : "Pendentes"}</div>
          <div className="text-xs text-muted-foreground">A UI expõe apenas metadata pública. Valores reais ficam protegidos.</div>
        </div>
      </CardContent>
    </Card>
  )
}
