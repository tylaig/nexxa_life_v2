"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Play, Save, Sparkles } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { automations, type Automation } from "@/lib/mock/automations"

import { AutomationFlowCanvas } from "./automation-flow-canvas"

type Props = {
  mode: "create" | "edit"
  automationId?: string
}

export function AutomationStudioView({ mode, automationId }: Props) {
  const automation = automations.find((item) => item.id === automationId) ?? automations[0]
  const [form, setForm] = React.useState({
    name: mode === "edit" ? automation.name : "",
    description: mode === "edit" ? automation.description : "",
    status: (mode === "edit" ? automation.status : "draft") as Automation["status"],
    trigger: mode === "edit" ? automation.trigger : "Novo trigger",
    category: (mode === "edit" ? automation.category : "carrinho") as Automation["category"],
    owner: mode === "edit" ? automation.lastEditedBy : "",
    notes: "Versão estrutural do builder. Persistência real entra na próxima rodada.",
  })

  return (
    <PageContainer className="pb-28">
      <AppBreadcrumbs items={mode === "create" ? [{ label: "Automações", href: "/automations" }, { label: "Novo fluxo" }] : [{ label: "Automações", href: "/automations" }, ...(automationId ? [{ label: "Detalhe", href: `/automations/${automationId}` }] : []), { label: "Editar" }]} />
      <PageHeader
        title={mode === "create" ? "Novo fluxo" : `Editar · ${automation.name}`}
        description="Builder full screen dedicado para configurar trigger, contexto do fluxo e revisar o mapa antes da publicação."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href={mode === "edit" && automationId ? `/automations/${automationId}` : "/automations"}><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          <Section title="Configuração principal" description="Identidade e lifecycle operacional do fluxo.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Owner"><Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} /></Field>
              <Field label="Status"><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Automation["status"] })}><option value="draft">Rascunho</option><option value="paused">Pausado</option><option value="active">Ativo</option></select></Field>
              <Field label="Categoria"><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Automation["category"] })}><option value="carrinho">Carrinho</option><option value="pos-venda">Pós-venda</option><option value="logistica">Logística</option><option value="fidelizacao">Fidelização</option><option value="fraude">Fraude</option></select></Field>
            </div>
            <Field label="Descrição"><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
            <Field label="Trigger"><Input value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })} /></Field>
          </Section>

          <Section title="Notas operacionais" description="Checklist de rollout e observações do fluxo.">
            <Field label="Notas"><Textarea rows={6} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
          </Section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do builder</CardTitle>
              <CardDescription>Contexto lateral para revisão rápida.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{form.status}</Badge>
                <Badge variant="outline">{form.category}</Badge>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Trigger</div>
                <div className="mt-1 font-medium">{form.trigger}</div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled>
                <Sparkles className="h-3.5 w-3.5" />
                Gerar ramificação com IA
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa atual</CardTitle>
              <CardDescription>Preview do fluxo usado como base estrutural.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[480px] overflow-auto bg-[radial-gradient(circle_at_1px_1px,_var(--border)_1px,_transparent_0)] [background-size:16px_16px] p-0">
              <AutomationFlowCanvas flow={automation.flow} />
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="text-sm text-muted-foreground">Builder estrutural ativo. Persistência real e edição de nós entram na próxima rodada.</div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href={mode === "edit" && automationId ? `/automations/${automationId}` : "/automations"}>Cancelar</Link></Button>
            <Button variant="outline" className="gap-2" disabled><Play className="h-3.5 w-3.5" />Testar</Button>
            <Button disabled className="gap-2"><Save className="h-3.5 w-3.5" />{mode === "create" ? "Criar fluxo" : "Salvar alterações"}</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="space-y-4">{children}</CardContent></Card>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>
}
