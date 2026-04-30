"use client"

import * as React from "react"
import { CalendarClock, Link2, UserPlus, Wand2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Conversation } from "@/lib/inbox/types"

import type { InboxDialogType } from "./inbox-types"

export function InboxActionDialogs({
  type,
  conversation,
  onOpenChange,
  onAppendComposer,
  onReplaceComposer,
}: {
  type: InboxDialogType
  conversation?: Conversation
  onOpenChange: (open: boolean) => void
  onAppendComposer?: (text: string) => void
  onReplaceComposer?: (text: string) => void
}) {
  const open = type !== null

  if (!conversation || !type) {
    return <Dialog open={false} onOpenChange={onOpenChange} />
  }

  const close = () => onOpenChange(false)

  if (type === "assign") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Atribuir conversa" description="Fluxo mock para roteamento operacional da conversa.">
        <div className="grid gap-3">
          {[
            "Você",
            "Marina Castro",
            "Camila Rocha",
            "Bianca Alves",
            "Fila de Suporte VIP",
          ].map((option) => (
            <button key={option} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              toast.success(`Conversa atribuída para ${option} (mock)`)
              close()
            }}>
              <div className="flex items-center gap-2"><UserPlus className="h-4 w-4 text-primary" />{option}</div>
            </button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "tag") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Gerenciar tags" description="Adicione contexto operacional para roteamento, SLA e automações.">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {conversation.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs">{tag}</span>)}
          </div>
          <div className="grid gap-2">
            <Label>Nova tag</Label>
            <Input placeholder="ex: prioridade-vip" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>Cancelar</Button>
          <Button onClick={() => { toast.success("Tag adicionada ao fluxo mock") ; close() }}>Salvar tag</Button>
        </DialogFooter>
      </BaseDialog>
    )
  }

  if (type === "status") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Mudar status" description="Escolha um novo estado operacional para esta conversa.">
        <div className="grid gap-2">
          {["open", "pending_customer", "pending_internal", "escalated", "resolved", "snoozed"].map((status) => (
            <button key={status} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              toast.success(`Status alterado para ${status} (mock visual)`)
              close()
            }}>{status}</button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "snooze") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Colocar em soneca" description="Pausar atendimento até um horário específico.">
        <div className="grid gap-3">
          {["Hoje 18:00", "Amanhã 09:00", "Em 2 dias", "Próxima segunda 08:30"].map((slot) => (
            <button key={slot} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              toast.success(`Conversa colocada em soneca até ${slot} (mock)`)
              close()
            }}>
              <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" />{slot}</div>
            </button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "order") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Pedido vinculado" description="Atalhos mock para inspeção e ações do pedido relacionado.">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="font-medium">{conversation.order?.number ?? "Sem pedido"}</div>
            <div className="text-muted-foreground">{conversation.order?.total ?? "Sem valor"}</div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Consultar tracking",
              "Reenviar link de pagamento",
              "Abrir devolução",
              "Enviar segunda via",
            ].map((action) => (
              <Button key={action} variant="outline" onClick={() => toast.success(`${action} acionado (mock)`)}>{action}</Button>
            ))}
          </div>
        </div>
      </BaseDialog>
    )
  }

  if (type === "profile") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Perfil 360" description="Visão expandida mock do cliente, jornada e sinais de operação.">
        <div className="space-y-4 text-sm">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="font-medium">{conversation.contact.name}</div>
            <div className="text-muted-foreground">{conversation.contact.phone} · {conversation.contact.city ?? "Cidade não informada"}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MiniMetric label="Pedidos" value={String(conversation.contact.totalOrders)} />
            <MiniMetric label="LTV" value={conversation.contact.lifetimeValue} />
            <MiniMetric label="Segmento" value={conversation.contact.segment} />
            <MiniMetric label="Consent." value={conversation.contact.consentMarketing ? "Opt-in" : "Não"} />
          </div>
        </div>
      </BaseDialog>
    )
  }

  if (type === "source") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Fonte de conhecimento" description="Abra a superfície de origem usada pela IA nesta conversa.">
        <div className="space-y-2">
          {(conversation.aiSuggestion?.sources ?? []).map((source) => (
            <button key={source.title} type="button" className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              toast.success(`Abrindo fonte ${source.title} (mock)`)
              close()
            }}>
              <Link2 className="h-4 w-4 text-primary" />
              <span className="flex-1">{source.title}</span>
              <span className="text-xs uppercase text-muted-foreground">{source.type}</span>
            </button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "template") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Templates Meta" description="Selecione um template aprovado para continuar o atendimento.">
        <div className="grid gap-2">
          {[
            "Acompanhamento de pedido",
            "Cobrança de pagamento pendente",
            "Retomada de atendimento",
          ].map((template) => (
            <button key={template} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              onAppendComposer?.(`{{template:${template}}}`)
              toast.success(`Template ${template} inserido no composer`)
              close()
            }}>{template}</button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "snippet") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Snippets rápidos" description="Insira respostas padrão e blocos operacionais.">
        <div className="grid gap-2">
          {[
            "Olá! Vou verificar isso para você agora.",
            "Obrigado pelo envio. Vou acionar o time responsável.",
            "Consegue me confirmar o número do pedido, por favor?",
          ].map((snippet) => (
            <button key={snippet} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              onAppendComposer?.(snippet)
              toast.success("Snippet inserido")
              close()
            }}>{snippet}</button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "emoji") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Inserir emoji" description="Atalho mock para tom mais humano na resposta.">
        <div className="flex flex-wrap gap-2 text-2xl">
          {["🙂", "🙏", "🎮", "🚚", "✅", "⚠️", "💬", "✨"].map((emoji) => (
            <button key={emoji} type="button" className="rounded-lg border border-border bg-card px-3 py-2 hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              onAppendComposer?.(emoji)
              close()
            }}>{emoji}</button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "variables") {
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Variáveis" description="Atalhos de personalização para respostas e templates.">
        <div className="grid gap-2">
          {["{{first_name}}", "{{order_number}}", "{{tracking_code}}", "{{agent_name}}"].map((variable) => (
            <button key={variable} type="button" className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm font-mono hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
              onAppendComposer?.(variable)
              close()
            }}>{variable}</button>
          ))}
        </div>
      </BaseDialog>
    )
  }

  if (type === "rewrite") {
    const suggestion = conversation.aiSuggestion?.draft ?? "Posso te ajudar com isso agora mesmo."
    return (
      <BaseDialog open={open} onOpenChange={onOpenChange} title="Reescrever com IA" description="Refino mock de tom, clareza e objetivo comercial.">
        <div className="space-y-3">
          <div className="rounded-lg border border-[var(--ai-border)] bg-[var(--ai-bg)] p-3 text-sm">{suggestion}</div>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: "Mais empática", value: `${suggestion}\n\nQuero muito resolver isso da melhor forma para você.` },
              { label: "Mais objetiva", value: `Resumo: ${suggestion}` },
              { label: "Mais comercial", value: `${suggestion}\n\nSe quiser, já te envio a melhor opção disponível agora.` },
            ].map((option) => (
              <button key={option.label} type="button" className="rounded-lg border border-border bg-card px-3 py-3 text-left text-sm hover:border-foreground/20 hover:bg-accent/40" onClick={() => {
                onReplaceComposer?.(option.value)
                toast.success(`Versão '${option.label}' aplicada`)
                close()
              }}>
                <div className="flex items-center gap-2 font-medium"><Wand2 className="h-4 w-4 text-primary" />{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      </BaseDialog>
    )
  }

  return null
}

function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  )
}
