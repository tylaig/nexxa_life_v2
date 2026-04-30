"use client"

import * as React from "react"
import Link from "next/link"
import { Blocks, BrainCircuit, Building2, ChevronRight, CreditCard, FolderTree, Radio, Rows3, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react"

import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { tenants } from "@/lib/mock/tenants"

const cards = [
  {
    href: "/settings/workspace",
    title: "Workspace",
    description: "Identidade operacional, fuso, times, políticas e contexto do ambiente atual.",
    icon: Building2,
    group: "Workspace",
  },
  {
    href: "/settings/users",
    title: "Usuários",
    description: "Membros, convites, papéis e acesso ao ambiente operacional.",
    icon: Users,
    group: "Workspace",
  },
  {
    href: "/settings/channels",
    title: "Canais",
    description: "Configuração dos canais ativos, fallback e janelas operacionais.",
    icon: Radio,
    group: "Workspace",
  },
  {
    href: "/settings/integrations",
    title: "Integrações",
    description: "Conexões do workspace, validação, mapeamentos e uso por agentes.",
    icon: BrainCircuit,
    group: "Conectividade",
  },
  {
    href: "/settings/providers",
    title: "Providers",
    description: "Providers nativos e custom com credenciais seguras, tools e auth modes.",
    icon: FolderTree,
    group: "Conectividade",
  },
  {
    href: "/settings/contact-fields",
    title: "Contact fields",
    description: "Campos internos usados por mappings, agentes, automações e perfil 360.",
    icon: Rows3,
    group: "Conectividade",
  },
  {
    href: "/settings/security",
    title: "Segurança e acesso",
    description: "Permissões, auditoria, segurança e políticas de operação da suíte.",
    icon: ShieldCheck,
    group: "Configurações",
  },
  {
    href: "/settings/billing",
    title: "Billing",
    description: "Plano, cobrança, capacidade e visão contratual do workspace.",
    icon: CreditCard,
    group: "Configurações",
  },
]

export function SettingsOverviewView() {
  const activeWorkspace = tenants[0]
  
  // Grouping cards to map them in sections
  const workspaceCards = cards.filter(c => c.group === "Workspace")
  const conectividadeCards = cards.filter(c => c.group === "Conectividade")
  const configCards = cards.filter(c => c.group === "Configurações")

  return (
    <PageContainer>
      <AppBreadcrumbs items={[{ label: "Configurações" }]} />
      <PageHeader
        title="Centro de configuração"
        description="Superfície administrativa unificada da plataforma com workspace, conectividade, segurança, billing e infraestrutura operacional."
        actions={<div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/settings/providers">Abrir providers</Link></Button><Button asChild size="sm"><Link href="/settings/workspace">Configurar workspace</Link></Button></div>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Módulos ativos" value="12" hint="superfícies operacionais" icon={Blocks} />
        <StatCard label="Plano" value={activeWorkspace.plan} hint="capacidade atual" icon={Workflow} />
        <StatCard label="Conectividade" value="Estruturada" hint="providers + integrations + fields" icon={BrainCircuit} />
        <StatCard label="Estado" value="Produção" hint="admin operacional" icon={Sparkles} />
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{activeWorkspace.name}</div>
              <div className="text-sm text-muted-foreground">Plano {activeWorkspace.plan} · Região BR · Fuso BRT (UTC-3)</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            ● Operacional
          </span>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="mt-6">
        <NavTabsList className="mb-6">
          <NavTabsTrigger value="workspace">Workspace &amp; Identidade</NavTabsTrigger>
          <NavTabsTrigger value="conectividade">Conectividade &amp; Dados</NavTabsTrigger>
          <NavTabsTrigger value="administracao">Administração &amp; Segurança</NavTabsTrigger>
        </NavTabsList>

        <TabsContent value="workspace" className="m-0 border-0 p-0 outline-none">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workspaceCards.map(card => <SettingsCard key={card.href} card={card} />)}
          </div>
        </TabsContent>

        <TabsContent value="conectividade" className="m-0 border-0 p-0 outline-none">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conectividadeCards.map(card => <SettingsCard key={card.href} card={card} />)}
          </div>
        </TabsContent>

        <TabsContent value="administracao" className="m-0 border-0 p-0 outline-none">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {configCards.map(card => <SettingsCard key={card.href} card={card} />)}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}

function SettingsCard({ card }: { card: typeof cards[0] }) {
  const Icon = card.icon
  return (
    <Link href={card.href} className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent/40">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">{card.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{card.description}</p>
      </div>
    </Link>
  )
}
