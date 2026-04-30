"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Save, Sparkles } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer, PageHeader } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { agents, type AiAgent } from "@/lib/mock/ai-agents"

type Props = {
  mode: "create" | "edit"
  agentId?: string
}

export function AiAgentStudioView({ mode, agentId }: Props) {
  const agent = agents.find((item) => item.id === agentId) ?? agents[0]
  const [form, setForm] = React.useState({
    name: mode === "edit" ? agent.name : "",
    role: mode === "edit" ? agent.role : "Novo agente",
    description: mode === "edit" ? agent.description : "",
    status: (mode === "edit" ? agent.status : "draft") as AiAgent["status"],
    model: (mode === "edit" ? agent.model : "GPT-4o-mini") as AiAgent["model"],
    temperature: mode === "edit" ? String(agent.temperature) : "0.3",
    tools: mode === "edit" ? agent.tools.join("\n") : "",
    guardrails: mode === "edit" ? agent.guardrails.join("\n") : "",
  })

  return (
    <PageContainer className="pb-28">
      <AppBreadcrumbs items={mode === "create" ? [{ label: "AI Studio", href: "/ai-studio" }, { label: "Agentes", href: "/ai-studio/agents" }, { label: "Novo agente" }] : [{ label: "AI Studio", href: "/ai-studio" }, { label: "Agentes", href: "/ai-studio/agents" }, ...(agentId ? [{ label: "Detalhe", href: `/ai-studio/agents/${agentId}` }] : []), { label: "Editar" }]} />
      <PageHeader
        title={mode === "create" ? "Novo agente" : `Editar · ${agent.name}`}
        description="Editor full screen para definir função, modelo, ferramentas, guardrails e contexto operacional do agente."
        actions={<Button asChild variant="outline" size="sm" className="gap-2"><Link href={mode === "edit" && agentId ? `/ai-studio/agents/${agentId}` : "/ai-studio/agents"}><ArrowLeft className="h-3.5 w-3.5" />Voltar</Link></Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          <Section title="Identidade" description="Dados principais e posicionamento do agente dentro da operação.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Função"><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></Field>
              <Field label="Status">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AiAgent["status"] })}>
                  <option value="draft">Rascunho</option>
                  <option value="shadow">Sombra</option>
                  <option value="live">Em produção</option>
                </select>
              </Field>
              <Field label="Modelo">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value as AiAgent["model"] })}>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="GPT-4o-mini">GPT-4o-mini</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                </select>
              </Field>
            </div>
            <Field label="Descrição"><Textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
          </Section>

          <Section title="Orquestração" description="Temperatura, ferramentas, integrações e guardrails do agente.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Temperatura"><Input value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} /></Field>
              <Field label="Knowledge vinculado"><Input value="políticas, catálogo, logística" disabled /></Field>
            </div>
            <Field label="Ferramentas (1 por linha)"><Textarea rows={5} value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} /></Field>
            <div className="space-y-3 rounded-xl border border-border bg-background/50 p-4">
              <div>
                <div className="text-sm font-medium">Integrações ativadas</div>
                <div className="text-xs text-muted-foreground">Selecione plataformas mock/configuráveis que o agente poderá usar.</div>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {agent.platformBindings.map((binding) => (
                  <label key={binding.provider} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                    <input type="checkbox" defaultChecked={binding.status !== "disabled"} />
                    <div>
                      <div className="font-medium">{binding.displayName}</div>
                      <div className="text-xs text-muted-foreground">{binding.configSummary}</div>
                    </div>
                  </label>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/apps">Configurar integrações</Link>
              </Button>
            </div>
            <Field label="Guardrails (1 por linha)"><Textarea rows={5} value={form.guardrails} onChange={(e) => setForm({ ...form, guardrails: e.target.value })} /></Field>
          </Section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de publicação</CardTitle>
              <CardDescription>Contexto rápido para revisão antes de salvar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{form.status}</Badge>
                <Badge variant="outline">{form.model}</Badge>
                <Badge variant="outline">temp {form.temperature}</Badge>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Checklist</div>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• função do agente revisada</li>
                  <li>• guardrails mínimos definidos</li>
                  <li>• ferramentas essenciais conectadas</li>
                </ul>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled>
                <Sparkles className="h-3.5 w-3.5" />
                Executar avaliação
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="text-sm text-muted-foreground">Editor estrutural ativo. Persistência real de agentes entra na próxima rodada.</div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href={mode === "edit" && agentId ? `/ai-studio/agents/${agentId}` : "/ai-studio/agents"}>Cancelar</Link></Button>
            <Button disabled className="gap-2"><Save className="h-3.5 w-3.5" />{mode === "create" ? "Criar agente" : "Salvar alterações"}</Button>
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
