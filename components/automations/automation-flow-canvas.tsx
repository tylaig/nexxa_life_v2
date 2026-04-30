"use client"

import * as React from "react"
import {
  ArrowRight,
  Bot,
  Clock,
  GitBranch,
  Send,
  StopCircle,
  Zap,
} from "lucide-react"

import type { AutomationNode } from "@/lib/mock/automations"
import { cn } from "@/lib/utils"

export function AutomationFlowCanvas({ flow }: { flow: AutomationNode[] }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 px-6 py-10">
      {flow.map((node, idx) => (
        <React.Fragment key={node.id}>
          <FlowNode node={node} />
          {idx < flow.length - 1 ? <Connector /> : null}
        </React.Fragment>
      ))}
    </div>
  )
}

function Connector() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-6 w-px bg-border" />
      <ArrowRight className="-mt-1 h-3 w-3 rotate-90 text-muted-foreground" />
    </div>
  )
}

function FlowNode({ node }: { node: AutomationNode }) {
  if (node.kind === "trigger") {
    return <NodeCard accent="primary" icon={Zap} eyebrow="Trigger" title={node.title} subtitle={node.subtitle} meta={node.meta} />
  }
  if (node.kind === "wait") {
    return <NodeCard accent="muted" icon={Clock} eyebrow="Aguardar" title={node.title} subtitle={node.subtitle} />
  }
  if (node.kind === "ai") {
    return <NodeCard accent="ai" icon={Bot} eyebrow="IA" title={node.title} subtitle={node.subtitle} meta={node.model} />
  }
  if (node.kind === "action") {
    return <NodeCard accent="action" icon={Send} eyebrow={node.channel ? `Ação · ${node.channel}` : "Ação"} title={node.title} subtitle={node.subtitle} />
  }
  if (node.kind === "condition") {
    return (
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <GitBranch className="h-3.5 w-3.5" />
          Condição
        </div>
        <div className="mt-1 text-sm font-medium">{node.title}</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {node.branches.map((branch, index) => (
            <div key={index} className="rounded-lg border border-dashed border-border bg-background/50 px-3 py-2 text-xs">
              <span className="text-muted-foreground">Se</span> <span className="font-medium">{branch.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (node.kind === "end") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
        <StopCircle className="h-3.5 w-3.5" />
        {node.title}
      </div>
    )
  }
  return null
}

function NodeCard({ accent, icon: Icon, eyebrow, title, subtitle, meta }: { accent: "primary" | "muted" | "ai" | "action"; icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string; subtitle?: string; meta?: string }) {
  const accentClass =
    accent === "primary"
      ? "border-primary/40 bg-primary/5"
      : accent === "ai"
        ? "border-ai/40 bg-ai/5"
        : accent === "action"
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-border bg-card"

  const iconBg =
    accent === "primary"
      ? "bg-primary text-primary-foreground"
      : accent === "ai"
        ? "bg-ai text-ai-foreground"
        : accent === "action"
          ? "bg-blue-500 text-white"
          : "bg-muted text-foreground"

  return (
    <div className={cn("w-full max-w-md rounded-xl border p-4 shadow-sm", accentClass)}>
      <div className="flex items-start gap-3">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", iconBg)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
          <div className="mt-0.5 truncate text-sm font-medium">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div> : null}
        </div>
        {meta ? <span className="shrink-0 rounded-md bg-background/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{meta}</span> : null}
      </div>
    </div>
  )
}
