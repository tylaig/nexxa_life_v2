"use client"

import * as React from "react"
import { Eye, MousePointerClick, Send, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ChannelIcon } from "@/components/inbox/channel-icon"
import type { HsmTemplate } from "@/lib/mock/templates"

export function TemplatePreviewPanel({ template }: { template: HsmTemplate }) {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Pré-visualização
          </span>
          <ChannelIcon channel="whatsapp" className="h-4 w-4 text-primary" />
        </div>
        <h3 className="mt-1 font-mono text-sm">{template.name}</h3>
      </div>
      <div className="p-4">
        <PreviewBubble template={template} />
      </div>
      <div className="border-t border-border p-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Metric label="Entrega" value={`${(template.deliveryRate * 100).toFixed(1)}%`} icon={Send} />
          <Metric label="Lidos" value={`${(template.readRate * 100).toFixed(0)}%`} icon={Eye} />
          <Metric label="CTR" value={`${(template.ctr * 100).toFixed(0)}%`} icon={MousePointerClick} />
          <Metric label="Bloqueios" value={`${(template.blockRate * 100).toFixed(2)}%`} icon={TrendingUp} />
        </div>
        {template.variables.length > 0 ? (
          <div className="mt-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Variáveis
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {template.variables.map((v, i) => (
                <Badge key={v} variant="outline" className="font-mono text-[10px]">
                  {`{{${i + 1}}} · ${v}`}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  )
}

function PreviewBubble({ template }: { template: HsmTemplate }) {
  const samples: Record<string, string> = {
    nome: "Carolina",
    produto: "Console PS5 Slim",
    numero_pedido: "#1842",
    status: "enviado",
    codigo_rastreio: "BR123456789",
    previsao: "29/04",
    validade: "amanhã às 23h59",
    codigo: "284 591",
  }
  const filled = template.body.replace(/\{\{(\d+)\}\}/g, (_, idx) => {
    const varName = template.variables[Number(idx) - 1]
    return samples[varName] ?? `{{${varName}}}`
  })

  const lines = filled.split("\n")

  return (
    <div className="relative max-w-[300px] rounded-2xl rounded-tl-sm bg-emerald-500/10 px-3 py-2 text-sm text-foreground shadow-sm">
      {template.header ? <div className="mb-1 font-semibold">{template.header}</div> : null}
      <div className="space-y-1.5">
        {lines.map((l, i) => (
          <p key={i} className="whitespace-pre-wrap leading-snug">
            {renderInlineFormatting(l)}
          </p>
        ))}
      </div>
      {template.footer ? <div className="mt-2 text-[10px] text-muted-foreground">{template.footer}</div> : null}
      {template.buttons && template.buttons.length > 0 ? (
        <div className="mt-2 flex flex-col gap-1 border-t border-emerald-500/20 pt-2">
          {template.buttons.map((b, i) => (
            <div key={i} className="rounded-md bg-card px-2 py-1.5 text-center text-xs font-medium text-primary">
              {b.label}
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-1 text-right text-[10px] text-muted-foreground">15:32</div>
    </div>
  )
}

function renderInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith("*") && p.endsWith("*")) {
      return <strong key={i}>{p.slice(1, -1)}</strong>
    }
    return <React.Fragment key={i}>{p}</React.Fragment>
  })
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/50 p-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
        <div className="font-medium tabular-nums">{value}</div>
      </div>
    </div>
  )
}
