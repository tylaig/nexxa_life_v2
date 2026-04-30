import type { Conversation, Contact, Order, Message } from "./types"

const now = new Date("2026-04-27T15:32:00Z").getTime()
const minutesAgo = (m: number) => new Date(now - m * 60_000).toISOString()
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString()
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString()
const minutesAhead = (m: number) => new Date(now + m * 60_000).toISOString()

// ---------- Contacts ----------
const julianaSouza: Contact = {
  id: "c_001",
  name: "Juliana Souza",
  phone: "+55 11 98421-7732",
  email: "ju.souza@email.com",
  tags: ["vip", "high-ltv", "ps5"],
  isVip: true,
  segment: "VIP Gamers",
  lifetimeValue: "R$ 14.820,00",
  totalOrders: 11,
  language: "pt-BR",
  city: "São Paulo, SP",
  consentMarketing: true,
  firstSeenAt: daysAgo(412),
}

const ricardoAlves: Contact = {
  id: "c_002",
  name: "Ricardo Alves",
  phone: "+55 21 99812-4410",
  email: "ricardo.alves@email.com",
  tags: ["recompra", "switch"],
  isVip: false,
  segment: "Recorrente",
  lifetimeValue: "R$ 3.240,00",
  totalOrders: 4,
  language: "pt-BR",
  city: "Rio de Janeiro, RJ",
  consentMarketing: true,
  firstSeenAt: daysAgo(186),
}

const carolinaMendes: Contact = {
  id: "c_003",
  name: "Carolina Mendes",
  phone: "+55 31 98774-1029",
  tags: ["primeira-compra"],
  isVip: false,
  segment: "Lead",
  lifetimeValue: "R$ 0,00",
  totalOrders: 0,
  language: "pt-BR",
  city: "Belo Horizonte, MG",
  consentMarketing: true,
  firstSeenAt: hoursAgo(3),
}

const brunoFerreira: Contact = {
  id: "c_004",
  name: "Bruno Ferreira",
  phone: "+55 47 99320-8841",
  email: "bruno.f@email.com",
  tags: ["pagamento-falhou"],
  isVip: false,
  segment: "Recuperação",
  lifetimeValue: "R$ 890,00",
  totalOrders: 2,
  language: "pt-BR",
  city: "Joinville, SC",
  consentMarketing: false,
  firstSeenAt: daysAgo(94),
}

const marianaLima: Contact = {
  id: "c_005",
  name: "Mariana Lima",
  phone: "+55 85 98123-7711",
  tags: ["devolucao", "logistica"],
  isVip: false,
  segment: "Pós-venda",
  lifetimeValue: "R$ 1.580,00",
  totalOrders: 3,
  language: "pt-BR",
  city: "Fortaleza, CE",
  consentMarketing: true,
  firstSeenAt: daysAgo(58),
}

const andreCunha: Contact = {
  id: "c_006",
  name: "André Cunha",
  phone: "+55 11 98034-2287",
  tags: ["pré-venda", "xbox"],
  isVip: false,
  segment: "Lead qualificado",
  lifetimeValue: "R$ 0,00",
  totalOrders: 0,
  language: "pt-BR",
  city: "Campinas, SP",
  consentMarketing: true,
  firstSeenAt: hoursAgo(28),
}

const fernandaCosta: Contact = {
  id: "c_007",
  name: "Fernanda Costa",
  phone: "+55 51 99821-3340",
  tags: ["fraude-suspeita"],
  isVip: false,
  segment: "Risco",
  lifetimeValue: "R$ 220,00",
  totalOrders: 1,
  language: "pt-BR",
  city: "Porto Alegre, RS",
  consentMarketing: false,
  firstSeenAt: daysAgo(12),
}

const pedroRamos: Contact = {
  id: "c_008",
  name: "Pedro Ramos",
  phone: "+55 27 99123-8847",
  email: "pedro.ramos@email.com",
  tags: ["vip", "colecionador"],
  isVip: true,
  segment: "VIP Colecionadores",
  lifetimeValue: "R$ 22.110,00",
  totalOrders: 18,
  language: "pt-BR",
  city: "Vitória, ES",
  consentMarketing: true,
  firstSeenAt: daysAgo(820),
}

const luanaSilveira: Contact = {
  id: "c_009",
  name: "Luana Silveira",
  phone: "+55 81 98221-6643",
  tags: ["carrinho-abandonado"],
  isVip: false,
  segment: "Recuperação",
  lifetimeValue: "R$ 480,00",
  totalOrders: 1,
  language: "pt-BR",
  city: "Recife, PE",
  consentMarketing: true,
  firstSeenAt: daysAgo(31),
}

const tiagoMoreira: Contact = {
  id: "c_010",
  name: "Tiago Moreira",
  phone: "+55 41 99812-0042",
  tags: ["suporte", "garantia"],
  isVip: false,
  segment: "Pós-venda",
  lifetimeValue: "R$ 4.290,00",
  totalOrders: 6,
  language: "pt-BR",
  city: "Curitiba, PR",
  consentMarketing: true,
  firstSeenAt: daysAgo(220),
}

// ---------- Orders ----------
const orderJuliana: Order = {
  id: "o_2741",
  number: "GS-2741",
  total: "R$ 4.299,00",
  currency: "BRL",
  status: "delayed",
  paymentMethod: "Cartão de crédito · 10x",
  createdAt: daysAgo(7),
  items: [
    {
      sku: "PS5-PRO-2TB",
      name: "PlayStation 5 Pro 2TB Edição Limitada",
      qty: 1,
      price: "R$ 4.299,00",
    },
  ],
  trackingCode: "BR98442178821BR",
  carrier: "Loggi",
  timeline: [
    { id: "t1", label: "Pedido confirmado", timestamp: daysAgo(7), status: "completed" },
    { id: "t2", label: "Pagamento aprovado", timestamp: daysAgo(7), status: "completed" },
    { id: "t3", label: "Separação no CD", timestamp: daysAgo(6), status: "completed" },
    { id: "t4", label: "Despachado", timestamp: daysAgo(5), status: "completed" },
    {
      id: "t5",
      label: "Atraso na transportadora",
      timestamp: daysAgo(1),
      status: "current",
      detail: "Previsão original: 25/04 · Nova previsão: 28/04",
    },
    { id: "t6", label: "Entregue", timestamp: "", status: "pending" },
  ],
}

const orderRicardo: Order = {
  id: "o_2698",
  number: "GB-2698",
  total: "R$ 2.149,00",
  currency: "BRL",
  status: "shipped",
  paymentMethod: "Pix",
  createdAt: daysAgo(2),
  items: [
    { sku: "NSW-OLED", name: "Nintendo Switch OLED Branco", qty: 1, price: "R$ 2.149,00" },
  ],
  trackingCode: "BR77123908112BR",
  carrier: "Correios",
  timeline: [
    { id: "t1", label: "Pedido confirmado", timestamp: daysAgo(2), status: "completed" },
    { id: "t2", label: "Pagamento aprovado", timestamp: daysAgo(2), status: "completed" },
    { id: "t3", label: "Despachado", timestamp: daysAgo(1), status: "current" },
    { id: "t4", label: "Em trânsito", timestamp: "", status: "pending" },
    { id: "t5", label: "Entregue", timestamp: "", status: "pending" },
  ],
}

const orderBruno: Order = {
  id: "o_2802",
  number: "GS-2802",
  total: "R$ 899,00",
  currency: "BRL",
  status: "payment_failed",
  paymentMethod: "Cartão de crédito · Itaú **** 4421",
  createdAt: hoursAgo(2),
  items: [
    { sku: "XBX-CTRL-ELITE", name: "Controle Xbox Elite Series 2", qty: 1, price: "R$ 899,00" },
  ],
  timeline: [
    { id: "t1", label: "Pedido criado", timestamp: hoursAgo(2), status: "completed" },
    {
      id: "t2",
      label: "Pagamento recusado",
      timestamp: hoursAgo(2),
      status: "failed",
      detail: "Motivo: Cartão sem saldo · Antifraude OK",
    },
    { id: "t3", label: "Aguardando novo pagamento", timestamp: "", status: "current" },
  ],
}

const orderMariana: Order = {
  id: "o_2611",
  number: "GB-2611",
  total: "R$ 1.580,00",
  currency: "BRL",
  status: "delivered",
  paymentMethod: "Pix",
  createdAt: daysAgo(11),
  items: [
    { sku: "PS5-DIGITAL", name: "PlayStation 5 Slim Digital", qty: 1, price: "R$ 1.580,00" },
  ],
  timeline: [
    { id: "t1", label: "Pedido confirmado", timestamp: daysAgo(11), status: "completed" },
    { id: "t2", label: "Pagamento aprovado", timestamp: daysAgo(11), status: "completed" },
    { id: "t3", label: "Despachado", timestamp: daysAgo(10), status: "completed" },
    { id: "t4", label: "Entregue", timestamp: daysAgo(7), status: "completed" },
    {
      id: "t5",
      label: "Solicitação de devolução",
      timestamp: hoursAgo(4),
      status: "current",
      detail: "Motivo informado: produto com defeito no controle",
    },
  ],
}

const orderPedro: Order = {
  id: "o_2755",
  number: "GS-2755",
  total: "R$ 6.890,00",
  currency: "BRL",
  status: "processing",
  paymentMethod: "Cartão de crédito · 12x sem juros",
  createdAt: hoursAgo(8),
  items: [
    { sku: "PS5-PRO-30TH", name: "PlayStation 5 Pro 30th Anniversary", qty: 1, price: "R$ 5.999,00" },
    { sku: "DS-EDGE", name: "Controle DualSense Edge", qty: 1, price: "R$ 891,00" },
  ],
  timeline: [
    { id: "t1", label: "Pedido confirmado", timestamp: hoursAgo(8), status: "completed" },
    { id: "t2", label: "Pagamento aprovado", timestamp: hoursAgo(7), status: "completed" },
    { id: "t3", label: "Em separação", timestamp: hoursAgo(2), status: "current" },
  ],
}

const orderLuana: Order = {
  id: "o_cart_8821",
  number: "Carrinho #8821",
  total: "R$ 1.299,00",
  currency: "BRL",
  status: "processing",
  paymentMethod: "—",
  createdAt: hoursAgo(6),
  items: [
    { sku: "MS-FLEX", name: "Headset Astro A50 X", qty: 1, price: "R$ 1.299,00" },
  ],
  timeline: [
    { id: "t1", label: "Carrinho criado", timestamp: hoursAgo(6), status: "completed" },
    {
      id: "t2",
      label: "Carrinho abandonado",
      timestamp: hoursAgo(2),
      status: "current",
      detail: "Saiu do checkout sem finalizar o pagamento",
    },
  ],
}

const orderTiago: Order = {
  id: "o_2502",
  number: "GB-2502",
  total: "R$ 3.299,00",
  currency: "BRL",
  status: "delivered",
  paymentMethod: "Cartão de crédito · 6x",
  createdAt: daysAgo(64),
  items: [
    { sku: "ROG-ALLY-X", name: "ASUS ROG Ally X 1TB", qty: 1, price: "R$ 3.299,00" },
  ],
  timeline: [
    { id: "t1", label: "Pedido confirmado", timestamp: daysAgo(64), status: "completed" },
    { id: "t2", label: "Entregue", timestamp: daysAgo(60), status: "completed" },
    {
      id: "t3",
      label: "Acionamento de garantia",
      timestamp: hoursAgo(1),
      status: "current",
      detail: "Cliente relata travamentos · dentro da janela de 90 dias",
    },
  ],
}

// ---------- Conversations ----------
function msg(
  id: string,
  direction: Message["direction"],
  content: string,
  ts: string,
  sender: Message["sender"],
  extra: Partial<Message> = {}
): Message {
  return { id, direction, content, timestamp: ts, sender, ...extra }
}

const customer = (c: Contact): Message["sender"] => ({
  id: c.id,
  name: c.name,
  type: "customer",
})

const agent = (name: string, id: string): Message["sender"] => ({
  id,
  name,
  type: "agent",
})

const aiSender: Message["sender"] = { id: "ai_copilot", name: "Onda AI", type: "ai" }
const automationSender: Message["sender"] = {
  id: "auto_engine",
  name: "Automação",
  type: "automation",
}
const systemSender: Message["sender"] = { id: "system", name: "Sistema", type: "system" }

export const conversations: Conversation[] = [
  {
    id: "conv_001",
    contact: julianaSouza,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "open",
    priority: "urgent",
    assignee: { id: "u_me", name: "Você" },
    team: "suporte",
    tags: ["vip", "atraso-entrega", "ps5-pro"],
    unreadCount: 2,
    lastActivityAt: minutesAgo(3),
    slaDueAt: minutesAhead(12),
    preview: "Oi, meu pedido tá atrasado já 2 dias. Preciso pra um aniversário sábado…",
    intent: "Reclamação de atraso · pedido VIP",
    sentiment: "negative",
    order: orderJuliana,
    messages: [
      msg(
        "m1",
        "system",
        "Conversa atribuída a Você por SLA de cliente VIP",
        minutesAgo(28),
        systemSender
      ),
      msg(
        "m2",
        "inbound",
        "Oi! Tudo bem? Comprei o PS5 Pro semana passada (pedido GS-2741) e o site dizia que chegaria sexta.",
        minutesAgo(26),
        customer(julianaSouza),
        { status: "read" }
      ),
      msg(
        "m3",
        "inbound",
        "Hoje é segunda e ainda não chegou. Era presente de aniversário do meu filho no sábado 😞",
        minutesAgo(25),
        customer(julianaSouza),
        { status: "read" }
      ),
      msg(
        "m4",
        "internal_note",
        "Confirmei com a Loggi: pacote retido no CD de Cajamar por falha de bipagem. Reentrega prevista para 28/04 (terça).",
        minutesAgo(18),
        agent("Você", "u_me")
      ),
      msg(
        "m5",
        "outbound",
        "Juliana, sinto muito pelo ocorrido. Acabei de verificar com a transportadora — o pacote teve um problema de bipagem no centro de distribuição e está sendo reendereçado. A nova previsão é amanhã (28/04).",
        minutesAgo(12),
        agent("Você", "u_me"),
        { status: "read" }
      ),
      msg(
        "m6",
        "inbound",
        "Entendo, mas e o aniversário? Tem como compensar de alguma forma?",
        minutesAgo(4),
        customer(julianaSouza),
        { status: "delivered" }
      ),
      msg(
        "m7",
        "inbound",
        "Eu sou cliente de vocês há anos, isso me chateou bastante.",
        minutesAgo(3),
        customer(julianaSouza),
        { status: "delivered" }
      ),
    ],
    aiSuggestion: {
      id: "sug_001",
      intent: "Compensação por atraso · cliente VIP",
      confidence: 0.92,
      draft:
        "Juliana, entendo completamente — e eu também ficaria chateada. Pelo seu histórico de cliente VIP e pela situação, vou aplicar um cupom de R$ 250 no seu próximo pedido e 1 ano grátis de PS Plus Premium. Te envio agora pelo WhatsApp e você pode usar quando quiser. Posso fazer isso?",
      sources: [
        { title: "Política de compensação · VIP · atraso > 48h", type: "policy" },
        { title: "Pedido GS-2741 · timeline logística", type: "order" },
        { title: "Catálogo: PS Plus Premium · 12 meses", type: "catalog" },
      ],
    },
  },
  {
    id: "conv_002",
    contact: brunoFerreira,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "in_automation",
    priority: "high",
    team: "vendas",
    tags: ["pagamento-falhou", "rescue-flow"],
    unreadCount: 0,
    lastActivityAt: minutesAgo(11),
    preview: "Automação 'Rescue Pagamento' enviou link de pagamento alternativo",
    intent: "Recuperação de pagamento",
    sentiment: "neutral",
    order: orderBruno,
    isAiHandled: true,
    messages: [
      msg(
        "m1",
        "system",
        "Evento payment_failed recebido · pedido GS-2802",
        hoursAgo(2),
        systemSender
      ),
      msg(
        "m2",
        "outbound",
        "Oi Bruno! 👋 Notamos que seu pagamento do pedido GS-2802 (Controle Xbox Elite Series 2) não foi aprovado. Quer tentar pagar com Pix? É instantâneo e mantém seu pedido reservado por mais 24h.",
        hoursAgo(2),
        automationSender,
        { templateName: "rescue_payment_pix_v3" }
      ),
      msg("m3", "inbound", "Oi, sim por favor!", minutesAgo(95), customer(brunoFerreira)),
      msg(
        "m4",
        "outbound",
        "Perfeito! Aqui está seu link de pagamento via Pix: https://pay.gms.app/p/8821a · válido por 30min.",
        minutesAgo(94),
        automationSender
      ),
      msg(
        "m5",
        "inbound",
        "Tô tentando mas dá erro no Pix também",
        minutesAgo(11),
        customer(brunoFerreira)
      ),
    ],
    aiSuggestion: {
      id: "sug_002",
      intent: "Escalar para humano · falha múltipla",
      confidence: 0.78,
      draft:
        "Sugiro escalar para o time de Vendas. Cliente teve 2 falhas consecutivas (cartão e Pix) — possível problema na conta bancária ou QR Code. Recomendo gerar boleto manualmente ou oferecer link de pagamento via PagSeguro.",
      sources: [
        { title: "Política de retry · pagamento", type: "policy" },
        { title: "Histórico do pedido GS-2802", type: "order" },
      ],
    },
  },
  {
    id: "conv_003",
    contact: carolinaMendes,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "open",
    priority: "normal",
    team: "vendas",
    tags: ["pré-venda", "estoque"],
    unreadCount: 1,
    lastActivityAt: minutesAgo(8),
    slaDueAt: minutesAhead(45),
    preview: "Tem PS5 Slim em estoque pra pronta entrega em BH?",
    intent: "Consulta de estoque · pré-venda",
    sentiment: "positive",
    messages: [
      msg(
        "m1",
        "inbound",
        "Boa tarde! Tem PS5 Slim em estoque pra pronta entrega em BH?",
        minutesAgo(8),
        customer(carolinaMendes)
      ),
    ],
    aiSuggestion: {
      id: "sug_003",
      intent: "Confirmação de estoque · pré-venda",
      confidence: 0.96,
      draft:
        "Olá Carolina! Tudo bem? Sim, temos PS5 Slim Digital (R$ 3.799) e PS5 Slim com Disco (R$ 4.299) em estoque com pronta entrega em BH — chegam em 1 dia útil. Posso te mandar o link de cada um?",
      sources: [
        { title: "Catálogo: PS5 Slim Digital · estoque CD-MG", type: "catalog" },
        { title: "Catálogo: PS5 Slim Disco · estoque CD-MG", type: "catalog" },
        { title: "FAQ: prazo de entrega Belo Horizonte", type: "faq" },
      ],
    },
  },
  {
    id: "conv_004",
    contact: ricardoAlves,
    channel: "whatsapp",
    channelNumber: "Game Box · +55 21 4002-7700",
    brand: "Game Box",
    status: "pending_customer",
    priority: "normal",
    assignee: { id: "u_2", name: "Marina Castro" },
    team: "logistica",
    tags: ["rastreio", "switch"],
    unreadCount: 0,
    lastActivityAt: hoursAgo(1),
    preview: "Te enviei o código de rastreio. Me avisa qualquer coisa! 🙂",
    intent: "Rastreio de pedido",
    sentiment: "positive",
    order: orderRicardo,
    messages: [
      msg(
        "m1",
        "inbound",
        "Ricardo aqui, queria saber onde está meu Switch OLED",
        hoursAgo(2),
        customer(ricardoAlves)
      ),
      msg(
        "m2",
        "outbound",
        "Oi Ricardo! Pedido GB-2698 saiu do CD ontem. Código: BR77123908112BR (Correios). Te envio o link de rastreio?",
        hoursAgo(2),
        agent("Marina Castro", "u_2")
      ),
      msg("m3", "inbound", "Por favor!", hoursAgo(2), customer(ricardoAlves)),
      msg(
        "m4",
        "outbound",
        "https://www.linkcorreios.com.br/?id=BR77123908112BR · Te enviei o código de rastreio. Me avisa qualquer coisa! 🙂",
        hoursAgo(1),
        agent("Marina Castro", "u_2")
      ),
    ],
  },
  {
    id: "conv_005",
    contact: marianaLima,
    channel: "whatsapp",
    channelNumber: "Game Box · +55 21 4002-7700",
    brand: "Game Box",
    status: "escalated",
    priority: "high",
    team: "suporte",
    tags: ["devolucao", "defeito"],
    unreadCount: 3,
    lastActivityAt: minutesAgo(34),
    slaDueAt: minutesAgo(8), // SLA breached
    preview: "Já é a terceira vez que tento contato! Quero meu dinheiro de volta.",
    intent: "Devolução · defeito de produto",
    sentiment: "negative",
    order: orderMariana,
    messages: [
      msg(
        "m1",
        "inbound",
        "O controle do PS5 que comprei semana passada já tá com drift no analógico esquerdo",
        hoursAgo(4),
        customer(marianaLima)
      ),
      msg(
        "m2",
        "inbound",
        "Quero devolver e ser reembolsada",
        hoursAgo(4),
        customer(marianaLima)
      ),
      msg(
        "m3",
        "outbound",
        "Mariana, sinto muito! Vou abrir uma RMA agora pra você. Pode me enviar uma foto/vídeo do problema?",
        hoursAgo(3),
        agent("Tiago Mendes", "u_3")
      ),
      msg(
        "m4",
        "inbound",
        "[vídeo enviado]",
        hoursAgo(3),
        customer(marianaLima),
        { attachments: [{ type: "file", name: "drift_video.mp4" }] }
      ),
      msg(
        "m5",
        "internal_note",
        "Bug confirmado pelo vídeo. Já abri RMA #4421. Vou alinhar com logística reversa.",
        hoursAgo(2),
        agent("Tiago Mendes", "u_3")
      ),
      msg(
        "m6",
        "inbound",
        "Já é a terceira vez que tento contato! Quero meu dinheiro de volta.",
        minutesAgo(34),
        customer(marianaLima)
      ),
    ],
  },
  {
    id: "conv_006",
    contact: andreCunha,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "open",
    priority: "normal",
    team: "vendas",
    tags: ["pré-venda", "xbox"],
    unreadCount: 0,
    lastActivityAt: hoursAgo(2),
    preview: "Vocês têm o Xbox Series X em 12x sem juros?",
    intent: "Consulta de parcelamento",
    sentiment: "positive",
    messages: [
      msg(
        "m1",
        "inbound",
        "Vocês têm o Xbox Series X em 12x sem juros?",
        hoursAgo(2),
        customer(andreCunha)
      ),
    ],
  },
  {
    id: "conv_007",
    contact: fernandaCosta,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "escalated",
    priority: "urgent",
    team: "fraude",
    tags: ["fraude-suspeita", "antifraude"],
    unreadCount: 1,
    lastActivityAt: minutesAgo(22),
    slaDueAt: minutesAhead(8),
    preview: "Antifraude: 3 tentativas com cartões diferentes em 10min",
    intent: "Possível fraude · análise manual",
    sentiment: "neutral",
    isAiHandled: false,
    messages: [
      msg(
        "m1",
        "system",
        "Antifraude · score 0.87 · 3 cartões em 10min · IPs distintos",
        minutesAgo(40),
        systemSender
      ),
      msg(
        "m2",
        "inbound",
        "Por que meu pedido foi cancelado?? Eu paguei!",
        minutesAgo(22),
        customer(fernandaCosta)
      ),
    ],
  },
  {
    id: "conv_008",
    contact: pedroRamos,
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "resolved",
    priority: "high",
    assignee: { id: "u_4", name: "Camila Rocha" },
    team: "vendas",
    tags: ["vip", "edição-limitada"],
    unreadCount: 0,
    lastActivityAt: hoursAgo(6),
    preview: "Obrigado Camila! Vocês são incríveis 🙏",
    intent: "Pré-venda concluída · edição limitada",
    sentiment: "positive",
    order: orderPedro,
    messages: [
      msg(
        "m1",
        "inbound",
        "Camila, conseguiu separar o PS5 Pro 30th pra mim?",
        hoursAgo(10),
        customer(pedroRamos)
      ),
      msg(
        "m2",
        "outbound",
        "Pedro!! Consegui sim! Reservei a última unidade no seu nome. Te envio o link de checkout exclusivo agora.",
        hoursAgo(9),
        agent("Camila Rocha", "u_4")
      ),
      msg(
        "m3",
        "inbound",
        "Obrigado Camila! Vocês são incríveis 🙏",
        hoursAgo(6),
        customer(pedroRamos)
      ),
    ],
  },
  {
    id: "conv_009",
    contact: luanaSilveira,
    channel: "whatsapp",
    channelNumber: "Game Box · +55 21 4002-7700",
    brand: "Game Box",
    status: "in_automation",
    priority: "normal",
    team: "vendas",
    tags: ["carrinho-abandonado", "headset"],
    unreadCount: 0,
    lastActivityAt: hoursAgo(2),
    preview: "Automação 'Carrinho Abandonado · 2h' disparada",
    intent: "Recuperação de carrinho",
    sentiment: "neutral",
    order: orderLuana,
    isAiHandled: true,
    messages: [
      msg(
        "m1",
        "system",
        "Evento abandoned_cart · janela 2h · template aprovado pela Meta",
        hoursAgo(2),
        systemSender
      ),
      msg(
        "m2",
        "outbound",
        "Oi Luana! 👋 Vimos que você deixou o Headset Astro A50 X no carrinho. Ainda quer levar? Tá com 8% off só hoje. 🎮",
        hoursAgo(2),
        automationSender,
        { templateName: "cart_recovery_8off_v2" }
      ),
    ],
  },
  {
    id: "conv_010",
    contact: tiagoMoreira,
    channel: "whatsapp",
    channelNumber: "Game Box · +55 21 4002-7700",
    brand: "Game Box",
    status: "pending_internal",
    priority: "high",
    assignee: { id: "u_5", name: "Bianca Alves" },
    team: "suporte",
    tags: ["garantia", "rog-ally"],
    unreadCount: 0,
    lastActivityAt: minutesAgo(58),
    slaDueAt: hoursAgo(-3), // 3h ahead
    preview: "Aguardando retorno da ASUS sobre acionamento de garantia",
    intent: "Garantia · troca técnica",
    sentiment: "neutral",
    order: orderTiago,
    messages: [
      msg(
        "m1",
        "inbound",
        "Comprei o ROG Ally X com vocês e tá travando direto. Tem como acionar a garantia?",
        hoursAgo(3),
        customer(tiagoMoreira)
      ),
      msg(
        "m2",
        "outbound",
        "Tiago, claro! Vou abrir o chamado com a ASUS agora. Te dou retorno em até 24h com o protocolo.",
        hoursAgo(2),
        agent("Bianca Alves", "u_5")
      ),
      msg(
        "m3",
        "internal_note",
        "Chamado #ASU-99812 aberto. SLA da ASUS: 48h.",
        minutesAgo(58),
        agent("Bianca Alves", "u_5")
      ),
    ],
  },
  {
    id: "conv_011",
    contact: {
      ...julianaSouza,
      id: "c_011",
      name: "Camila Tavares",
      phone: "+55 11 98123-4421",
      isVip: false,
      tags: ["promo"],
      segment: "Reativação",
    },
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "snoozed",
    priority: "low",
    team: "vendas",
    tags: ["snoozed-3d", "promo"],
    unreadCount: 0,
    lastActivityAt: daysAgo(2),
    preview: "Soneca até quarta-feira (29/04) — campanha Black Gamer",
    intent: "Reativação programada",
    sentiment: "neutral",
    messages: [
      msg(
        "m1",
        "system",
        "Conversa em soneca até 29/04 às 09:00 · campanha 'Black Gamer'",
        daysAgo(2),
        systemSender
      ),
    ],
  },
  {
    id: "conv_012",
    contact: {
      ...andreCunha,
      id: "c_012",
      name: "Felipe Nogueira",
      phone: "+55 11 98821-9912",
      tags: ["recompra"],
      segment: "Recorrente",
    },
    channel: "whatsapp",
    channelNumber: "Games Safari · +55 11 4040-1100",
    brand: "Games Safari",
    status: "resolved",
    priority: "normal",
    assignee: { id: "u_2", name: "Marina Castro" },
    team: "vendas",
    tags: ["upsell", "concluído"],
    unreadCount: 0,
    lastActivityAt: hoursAgo(20),
    preview: "Beleza, fechado! Manda o Pix",
    intent: "Upsell concluído",
    sentiment: "positive",
    messages: [
      msg(
        "m1",
        "inbound",
        "Beleza, fechado! Manda o Pix",
        hoursAgo(20),
        customer({
          ...andreCunha,
          id: "c_012",
          name: "Felipe Nogueira",
        } as Contact)
      ),
    ],
  },
]

export const teamMembers = [
  { id: "u_me", name: "Você", initials: "VC" },
  { id: "u_2", name: "Marina Castro", initials: "MC" },
  { id: "u_3", name: "Tiago Mendes", initials: "TM" },
  { id: "u_4", name: "Camila Rocha", initials: "CR" },
  { id: "u_5", name: "Bianca Alves", initials: "BA" },
]

export const inboxes = [
  { id: "all", label: "Todas as caixas", count: conversations.length },
  {
    id: "games-safari",
    label: "Games Safari",
    count: conversations.filter((c) => c.brand === "Games Safari").length,
    sub: "+55 11 4040-1100",
  },
  {
    id: "game-box",
    label: "Game Box",
    count: conversations.filter((c) => c.brand === "Game Box").length,
    sub: "+55 21 4002-7700",
  },
]

export const teams = [
  { id: "vendas", label: "Vendas", count: conversations.filter((c) => c.team === "vendas").length },
  { id: "suporte", label: "Suporte", count: conversations.filter((c) => c.team === "suporte").length },
  { id: "logistica", label: "Logística", count: conversations.filter((c) => c.team === "logistica").length },
  { id: "fraude", label: "Antifraude", count: conversations.filter((c) => c.team === "fraude").length },
]
