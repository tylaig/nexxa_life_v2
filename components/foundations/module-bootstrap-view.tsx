import { CheckCircle2, Clock3, Rocket, Wrench } from "lucide-react"

import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type ModuleBootstrapViewProps = {
  title: string
  description: string
  phaseLabel: string
  capabilities: string[]
  nextSteps: string[]
}

export function ModuleBootstrapView({
  title,
  description,
  phaseLabel,
  capabilities,
  nextSteps,
}: ModuleBootstrapViewProps) {
  return (
    <PageContainer>
      <PageHeader
        title={title}
        description={description}
        actions={<Badge variant="outline">{phaseLabel}</Badge>}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <StatCard label="Status" value="Foundation" hint="Estrutura inicial criada" icon={Rocket} />
        <StatCard label="APIs" value="GET /v1" hint="Bootstrap mínimo disponível" icon={Wrench} />
        <StatCard label="Capacidades" value={String(capabilities.length)} hint="Contratos iniciais expostos" icon={CheckCircle2} />
        <StatCard label="Próxima fase" value="CRUD" hint="Persistência e fluxos reais" icon={Clock3} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Capacidades já registradas</CardTitle>
            <CardDescription>Contratos e responsabilidades mínimos já materializados na base.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <Badge key={capability} variant="secondary">{capability}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos passos</CardTitle>
            <CardDescription>Backlog imediato após a fundação já salva nesta etapa.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
