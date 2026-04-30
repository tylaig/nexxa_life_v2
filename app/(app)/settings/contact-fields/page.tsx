import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AppBreadcrumbs } from "@/components/app-shell/app-breadcrumbs"
import { PageContainer } from "@/components/layout/page-container"
import { PageSection } from "@/components/layout/page-section"
import { PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Hash, Plus, Rows3, Sparkles, Tag, Workflow } from "lucide-react"
import { PlannedActionButton } from "@/components/settings/planned-action-button"

const fields = [
  { key: "first_name", label: "Primeiro nome", type: "string", source: "core", flags: ["perfil", "integrações"] },
  { key: "email", label: "E-mail", type: "string", source: "core", flags: ["perfil", "campanhas"] },
  { key: "phone", label: "Telefone", type: "string", source: "core", flags: ["perfil", "inbox"] },
  { key: "lifetime_value", label: "LTV", type: "number", source: "custom", flags: ["analytics", "agentes"] },
  { key: "vip_tier", label: "Nível VIP", type: "select", source: "custom", flags: ["automações", "perfil"] },
  { key: "last_order_payload", label: "Último payload pedido", type: "json", source: "integration", flags: ["integrações", "debug"] },
  { key: "nps_score", label: "Score NPS", type: "number", source: "custom", flags: ["analytics", "segmentação"] },
]

const tags = [
  { name: "VIP", color: "#f59e0b", category: "lifecycle", usedIn: ["contatos", "automações", "campanhas"], count: 342 },
  { name: "Promotor", color: "#10b981", category: "nps", usedIn: ["segmentação", "campanhas"], count: 891 },
  { name: "Churn Risk", color: "#ef4444", category: "lifecycle", usedIn: ["agentes", "automações"], count: 64 },
  { name: "Recompra", color: "#6366f1", category: "comportamento", usedIn: ["campanhas", "automações"], count: 512 },
  { name: "Primeira compra", color: "#06b6d4", category: "comportamento", usedIn: ["automações", "inbox"], count: 1203 },
  { name: "B2B", color: "#8b5cf6", category: "segmento", usedIn: ["contatos", "segmentação"], count: 78 },
]

const sourceConfig: Record<string, { label: string; color: string }> = {
  core: { label: "Nativo", color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  custom: { label: "Custom", color: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  integration: { label: "Integração", color: "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400" },
}

export default function SettingsContactFieldsPage() {
  return (
    <>
      <AppTopbar title="Campos e Tags" subtitle="Estrutura de dados do contato: campos nativos, custom e taxonomia de tags" />
      <PageContainer>
        <AppBreadcrumbs items={[{ label: "Configurações", href: "/settings" }, { label: "Campos e Tags" }]} />
        <PageHeader
          title="Campos e Tags"
          description="Governança unificada da estrutura de dados do contato. Gerencie campos nativos, custom e tags reutilizáveis em toda a plataforma."
          actions={<PlannedActionButton size="sm" className="gap-2" message="Novo campo secundário"><Plus className="h-3.5 w-3.5" />Novo campo</PlannedActionButton>}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Campos" value={String(fields.length)} icon={Rows3} />
          <StatCard label="Custom" value={String(fields.filter((f) => f.source !== "core").length)} icon={Database} />
          <StatCard label="Tags" value={String(tags.length)} icon={Tag} />
          <StatCard label="Agentes" value={String(fields.filter((f) => f.flags.includes("agentes")).length)} icon={Sparkles} hint="campos para IA" />
        </div>

        <PageSection title="Catálogo de Campos" description="Campos nativos e customizados que alimentam perfil 360, integrações, automações e agentes.">
          <div className="rounded-xl border border-border bg-card">
            <div className="divide-y divide-border">
              {fields.map((field) => {
                const src = sourceConfig[field.source] ?? sourceConfig.core
                return (
                  <div key={field.key} className="flex flex-col gap-2 p-4 transition-colors hover:bg-accent/40 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{field.label}</span>
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${src.color}`}>{src.label}</span>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">{field.key} · {field.type}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {field.flags.map((flag) => <Badge key={flag} variant="secondary" className="text-[10px]">{flag}</Badge>)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </PageSection>

        <PageSection title="Taxonomia de Tags" description="Tags reutilizáveis com governança. Usadas em segmentação, contatos, campanhas, automações e agentes." headerActions={<PlannedActionButton variant="outline" size="sm" className="gap-2" message="Nova tag secundária"><Hash className="h-3.5 w-3.5" />Nova tag</PlannedActionButton>}>
          <div className="rounded-xl border border-border bg-card">
            <div className="divide-y divide-border">
              {tags.map((tag) => (
                <div key={tag.name} className="flex flex-col gap-2 p-4 transition-colors hover:bg-accent/40 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: tag.color }} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tag.name}</span>
                        <Badge variant="outline" className="text-[10px]">{tag.category}</Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{tag.count.toLocaleString("pt-BR")} contatos · Usado em: {tag.usedIn.join(", ")}</div>
                    </div>
                  </div>
                  <PlannedActionButton variant="ghost" size="sm" className="text-xs" message={`Tag ${tag.name} secundária`}>Editar</PlannedActionButton>
                </div>
              ))}
            </div>
          </div>
        </PageSection>
      </PageContainer>
    </>
  )
}

