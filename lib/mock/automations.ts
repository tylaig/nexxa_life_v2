export type AutomationNode =
  | { kind: "trigger"; id: string; title: string; subtitle: string; meta?: string }
  | { kind: "condition"; id: string; title: string; branches: { label: string; targetId?: string }[] }
  | { kind: "action"; id: string; title: string; subtitle: string; channel?: string }
  | { kind: "ai"; id: string; title: string; subtitle: string; model?: string }
  | { kind: "wait"; id: string; title: string; subtitle: string }
  | { kind: "end"; id: string; title: string }

export type Automation = {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "draft"
  trigger: string
  triggerCount24h: number
  successRate: number
  revenue30d: number
  lastEditedAt: string
  lastEditedBy: string
  flow: AutomationNode[]
  category: "carrinho" | "pos-venda" | "logistica" | "fidelizacao" | "fraude"
}

export const automations: Automation[] = [
  {
    id: "auto_001",
    name: "Recuperação de carrinho · 3 toques",
    description: "Ativa quando carrinho fica abandonado por 30min, com cupom progressivo se cliente engaja.",
    status: "active",
    trigger: "Carrinho abandonado · Shopify",
    triggerCount24h: 312,
    successRate: 0.34,
    revenue30d: 89420.5,
    lastEditedAt: "2026-04-25T14:00:00Z",
    lastEditedBy: "Carla Souza",
    category: "carrinho",
    flow: [
      { kind: "trigger", id: "n1", title: "Carrinho abandonado", subtitle: "Shopify · há 30 min", meta: "Cliente com opt-in WhatsApp" },
      { kind: "wait", id: "n2", title: "Esperar 30 minutos", subtitle: "Janela 9h-21h" },
      { kind: "ai", id: "n3", title: "IA gerar mensagem personalizada", subtitle: "Usa nome, item e estoque", model: "GPT-4o-mini" },
      { kind: "action", id: "n4", title: "Enviar template HSM", subtitle: "carrinho_recuperacao_v3", channel: "WhatsApp" },
      { kind: "condition", id: "n5", title: "Cliente respondeu em 2h?", branches: [{ label: "Sim" }, { label: "Não" }] },
      { kind: "action", id: "n6", title: "Aplicar cupom 8% OFF", subtitle: "WELCOME8 · validade 24h", channel: "WhatsApp" },
      { kind: "end", id: "n7", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_002",
    name: "Pós-venda · Atualizações de envio",
    description: "Envia tracking automático em mudanças de status do pedido (Melhor Envio + Frenet).",
    status: "active",
    trigger: "Mudança de status · Pedido",
    triggerCount24h: 184,
    successRate: 0.97,
    revenue30d: 0,
    lastEditedAt: "2026-04-20T10:00:00Z",
    lastEditedBy: "Pedro Lima",
    category: "logistica",
    flow: [
      { kind: "trigger", id: "n1", title: "Status do pedido mudou", subtitle: "Shopify webhook" },
      { kind: "condition", id: "n2", title: "Qual status?", branches: [{ label: "Enviado" }, { label: "Saiu para entrega" }, { label: "Entregue" }] },
      { kind: "action", id: "n3", title: "Enviar template", subtitle: "pedido_status_envio", channel: "WhatsApp" },
      { kind: "end", id: "n4", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_003",
    name: "Recuperação de pagamento recusado",
    description: "Identifica recusa de cartão e oferece PIX em até 5 minutos.",
    status: "active",
    trigger: "Pagamento recusado",
    triggerCount24h: 47,
    successRate: 0.42,
    revenue30d: 28940.0,
    lastEditedAt: "2026-04-18T16:00:00Z",
    lastEditedBy: "Carla Souza",
    category: "carrinho",
    flow: [
      { kind: "trigger", id: "n1", title: "Pagamento recusado", subtitle: "Cartão · risk score < 50" },
      { kind: "wait", id: "n2", title: "Esperar 5 minutos", subtitle: "" },
      { kind: "action", id: "n3", title: "Oferecer PIX 5% OFF", subtitle: "pix_recuperacao_v2", channel: "WhatsApp" },
      { kind: "end", id: "n4", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_004",
    name: "NPS automático pós-entrega",
    description: "Coleta NPS 7 dias após entrega e cria ticket para detratores.",
    status: "active",
    trigger: "Pedido entregue + 7 dias",
    triggerCount24h: 22,
    successRate: 0.58,
    revenue30d: 0,
    lastEditedAt: "2026-04-15T11:00:00Z",
    lastEditedBy: "Roberto Mello",
    category: "pos-venda",
    flow: [
      { kind: "trigger", id: "n1", title: "Pedido entregue há 7 dias", subtitle: "" },
      { kind: "action", id: "n2", title: "Enviar pesquisa NPS", subtitle: "nps_pos_compra", channel: "WhatsApp" },
      { kind: "condition", id: "n3", title: "Score recebido?", branches: [{ label: "9-10" }, { label: "0-6" }] },
      { kind: "action", id: "n4", title: "Pedir review Trustvox", subtitle: "Promotor", channel: "WhatsApp" },
      { kind: "action", id: "n5", title: "Abrir ticket suporte", subtitle: "Time: experiência", channel: "Onda" },
      { kind: "end", id: "n6", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_005",
    name: "Programa VIP · Recompra",
    description: "Identifica clientes >R$2k LTV e envia oferta exclusiva mensal.",
    status: "paused",
    trigger: "Segmento VIP · 30 dias sem compra",
    triggerCount24h: 0,
    successRate: 0.61,
    revenue30d: 14290.0,
    lastEditedAt: "2026-04-10T09:00:00Z",
    lastEditedBy: "Carla Souza",
    category: "fidelizacao",
    flow: [
      { kind: "trigger", id: "n1", title: "Cliente VIP sem compra há 30d", subtitle: "" },
      { kind: "ai", id: "n2", title: "IA escolher produto ideal", subtitle: "Histórico + estoque", model: "GPT-4o" },
      { kind: "action", id: "n3", title: "Enviar oferta exclusiva", subtitle: "vip_recompra", channel: "WhatsApp" },
      { kind: "end", id: "n4", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_006",
    name: "Detecção de fraude · Pedido alto",
    description: "Pedidos > R$ 5k em primeira compra escalam para análise manual.",
    status: "active",
    trigger: "Pedido > R$ 5.000",
    triggerCount24h: 8,
    successRate: 0.99,
    revenue30d: 0,
    lastEditedAt: "2026-04-05T14:00:00Z",
    lastEditedBy: "Roberto Mello",
    category: "fraude",
    flow: [
      { kind: "trigger", id: "n1", title: "Pedido criado > R$ 5k", subtitle: "Primeira compra" },
      { kind: "condition", id: "n2", title: "Risk score Konduto?", branches: [{ label: "< 30" }, { label: ">= 30" }] },
      { kind: "action", id: "n3", title: "Aprovar automaticamente", subtitle: "", channel: "ERP" },
      { kind: "action", id: "n4", title: "Pausar e escalar", subtitle: "Time: fraude", channel: "Onda" },
      { kind: "end", id: "n5", title: "Encerrar fluxo" },
    ],
  },
  {
    id: "auto_007",
    name: "Pré-lançamento · Lista de espera",
    description: "Notifica lista de espera quando produto volta ao estoque.",
    status: "draft",
    trigger: "Produto disponível",
    triggerCount24h: 0,
    successRate: 0,
    revenue30d: 0,
    lastEditedAt: "2026-04-26T18:00:00Z",
    lastEditedBy: "Pedro Lima",
    category: "fidelizacao",
    flow: [
      { kind: "trigger", id: "n1", title: "Produto disponível", subtitle: "Lista de espera ativa" },
      { kind: "action", id: "n2", title: "Notificar lista", subtitle: "produto_volta_estoque", channel: "WhatsApp" },
      { kind: "end", id: "n3", title: "Encerrar fluxo" },
    ],
  },
]
