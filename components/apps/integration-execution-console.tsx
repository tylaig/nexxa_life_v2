"use client"

import * as React from "react"
import { Play, FileJson2, Bug, CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { IntegrationToolAction } from "./integration-types"

export function IntegrationExecutionConsole({ tool }: { tool?: IntegrationToolAction }) {
  const [executed, setExecuted] = React.useState(false)

  const payload = React.useMemo(() => {
    if (!tool) return {}
    return Object.fromEntries(tool.inputSchema.map((field) => [field.key, field.type === "boolean" ? true : field.type === "number" ? 1 : `sample_${field.key}`]))
  }, [tool])

  const result = React.useMemo(() => {
    if (!tool) return {}
    return Object.fromEntries(tool.outputSchema.map((field) => [field.key, field.type === "boolean" ? true : field.type === "number" ? 42 : field.type === "json" ? { ok: true, source: field.key } : `result_${field.key}`]))
  }, [tool])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Play className="h-4 w-4 text-primary" />Console de execução mock</CardTitle>
        <CardDescription>Base inicial para testar tools/actions, payloads e saídas observáveis antes do runtime real.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tool?.supportsJsonParser ? <Badge variant="secondary">json parser</Badge> : null}
          <Badge variant="outline">payload persistível</Badge>
          <Badge variant="outline">replay futuro</Badge>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium"><FileJson2 className="h-4 w-4 text-primary" />Input mock</div>
            <pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify(payload, null, 2)}</pre>
          </div>
          <div className="rounded-xl border border-border bg-background/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Bug className="h-4 w-4 text-primary" />Output mock</div>
            <pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify(executed ? result : { status: "aguardando execução" }, null, 2)}</pre>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setExecuted(true)} className="gap-2"><Play className="h-4 w-4" />Executar tool</Button>
          <Button variant="outline" className="gap-2"><CheckCircle2 className="h-4 w-4" />Salvar payload</Button>
        </div>
      </CardContent>
    </Card>
  )
}
