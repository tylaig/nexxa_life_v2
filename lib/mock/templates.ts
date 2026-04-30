export type HsmStatus = "approved" | "pending" | "rejected" | "paused"
export type HsmCategory = "MARKETING" | "UTILITY" | "AUTHENTICATION"

export type HsmTemplate = {
  id: string
  name: string
  category: HsmCategory
  language: string
  status: HsmStatus
  qualityRating: "high" | "medium" | "low" | "unknown"
  body: string
  header?: string
  footer?: string
  buttons?: { kind: "url" | "phone" | "quick_reply"; label: string; value?: string }[]
  variables: string[]
  sentLast30d: number
  deliveryRate: number
  readRate: number
  ctr: number
  blockRate: number
  lastUsedAt?: string
}

export const templates: HsmTemplate[] = [
  {
    id: "tpl_001",
    name: "carrinho_recuperacao_v3",
    category: "MARKETING",
    language: "pt_BR",
    status: "approved",
    qualityRating: "high",
    body:
      "Oi {{1}}, esquecemos algo? 👀\n\nVi que você deixou *{{2}}* no carrinho. Posso reservar por mais 24h e enviar com frete grátis. Quer que eu garanta?",
    footer: "Games Safari · responda PARAR para sair",
    buttons: [
      { kind: "quick_reply", label: "Sim, garantir" },
      { kind: "quick_reply", label: "Mais tarde" },
      { kind: "url", label: "Ver carrinho", value: "https://gamessafari.com.br/cart" },
    ],
    variables: ["nome", "produto"],
    sentLast30d: 4820,
    deliveryRate: 0.98,
    readRate: 0.86,
    ctr: 0.34,
    blockRate: 0.004,
    lastUsedAt: "2026-04-27T15:00:00Z",
  },
  {
    id: "tpl_002",
    name: "pedido_status_envio",
    category: "UTILITY",
    language: "pt_BR",
    status: "approved",
    qualityRating: "high",
    body:
      "Olá {{1}}! Seu pedido *{{2}}* foi {{3}}.\n\nCódigo de rastreio: {{4}}\nPrevisão de entrega: {{5}}",
    buttons: [{ kind: "url", label: "Rastrear", value: "https://melhorenvio.com.br/track/{{4}}" }],
    variables: ["nome", "numero_pedido", "status", "codigo_rastreio", "previsao"],
    sentLast30d: 8214,
    deliveryRate: 0.99,
    readRate: 0.94,
    ctr: 0.62,
    blockRate: 0.001,
    lastUsedAt: "2026-04-27T14:32:00Z",
  },
  {
    id: "tpl_003",
    name: "pix_recuperacao_v2",
    category: "MARKETING",
    language: "pt_BR",
    status: "approved",
    qualityRating: "high",
    body:
      "{{1}}, vi que seu cartão não passou. Posso te enviar um PIX com 5% OFF? Validade: hoje. 🔥",
    buttons: [
      { kind: "quick_reply", label: "Quero o PIX" },
      { kind: "quick_reply", label: "Tentar cartão de novo" },
    ],
    variables: ["nome"],
    sentLast30d: 612,
    deliveryRate: 0.97,
    readRate: 0.81,
    ctr: 0.42,
    blockRate: 0.008,
    lastUsedAt: "2026-04-27T11:14:00Z",
  },
  {
    id: "tpl_004",
    name: "nps_pos_compra",
    category: "UTILITY",
    language: "pt_BR",
    status: "approved",
    qualityRating: "medium",
    body:
      "{{1}}, em uma escala de 0 a 10, o quanto você indicaria a Games Safari para um amigo? Sua resposta vale muito pra gente. 💚",
    variables: ["nome"],
    sentLast30d: 1240,
    deliveryRate: 0.99,
    readRate: 0.74,
    ctr: 0.58,
    blockRate: 0.002,
    lastUsedAt: "2026-04-26T19:00:00Z",
  },
  {
    id: "tpl_005",
    name: "vip_recompra",
    category: "MARKETING",
    language: "pt_BR",
    status: "approved",
    qualityRating: "high",
    body:
      "{{1}}, você é VIP. 👑\n\nReservamos *{{2}}* com 15% OFF exclusivo até {{3}}. Quer que eu separe?",
    buttons: [{ kind: "quick_reply", label: "Quero reservar" }],
    variables: ["nome", "produto", "validade"],
    sentLast30d: 184,
    deliveryRate: 1.0,
    readRate: 0.92,
    ctr: 0.61,
    blockRate: 0.0,
    lastUsedAt: "2026-04-25T10:00:00Z",
  },
  {
    id: "tpl_006",
    name: "produto_volta_estoque",
    category: "MARKETING",
    language: "pt_BR",
    status: "pending",
    qualityRating: "unknown",
    body:
      "{{1}}, o produto *{{2}}* que você esperava voltou ao estoque! Aproveita antes que acabe.",
    buttons: [{ kind: "url", label: "Comprar agora", value: "https://gamessafari.com.br" }],
    variables: ["nome", "produto"],
    sentLast30d: 0,
    deliveryRate: 0,
    readRate: 0,
    ctr: 0,
    blockRate: 0,
  },
  {
    id: "tpl_007",
    name: "otp_login",
    category: "AUTHENTICATION",
    language: "pt_BR",
    status: "approved",
    qualityRating: "high",
    body: "Seu código de verificação é {{1}}. Não compartilhe.",
    variables: ["codigo"],
    sentLast30d: 2410,
    deliveryRate: 1.0,
    readRate: 0.97,
    ctr: 0,
    blockRate: 0.0,
    lastUsedAt: "2026-04-27T15:20:00Z",
  },
  {
    id: "tpl_008",
    name: "cupom_aniversario",
    category: "MARKETING",
    language: "pt_BR",
    status: "rejected",
    qualityRating: "unknown",
    body:
      "Parabéns, {{1}}! 🎂 Cupom de 20% só pra você: ANIV20. Validade: 7 dias.",
    variables: ["nome"],
    sentLast30d: 0,
    deliveryRate: 0,
    readRate: 0,
    ctr: 0,
    blockRate: 0,
  },
]
