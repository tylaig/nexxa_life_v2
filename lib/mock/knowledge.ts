export type KbSource =
  | { kind: "doc"; id: string; title: string; type: "Política" | "FAQ" | "Procedimento" | "Catálogo" }
  | { kind: "site"; id: string; title: string; type: "Web" | "Help Center" | "Blog" }
  | { kind: "file"; id: string; title: string; type: "PDF" | "DOCX" | "Sheet" }
  | { kind: "integration"; id: string; title: string; type: "Shopify" | "VTEX" | "Notion" | "Zendesk" }

export type KbDocument = {
  id: string
  title: string
  collection: string
  status: "indexed" | "indexing" | "error" | "pending"
  source: "Manual" | "URL" | "PDF" | "Notion" | "Shopify"
  language: "pt-BR" | "en"
  chunks: number
  updatedAt: string
  freshness: "fresh" | "stale"
  excerpt: string
  embeddings: "ada-002" | "text-embedding-3-large"
  usageCount30d: number
  helpfulRate: number
}

export const collections = [
  { id: "all", label: "Todas", count: 124 },
  { id: "politicas", label: "Políticas", count: 18 },
  { id: "produtos", label: "Catálogo de produtos", count: 62 },
  { id: "logistica", label: "Logística e prazos", count: 14 },
  { id: "trocas", label: "Trocas e devoluções", count: 8 },
  { id: "pagamento", label: "Pagamentos", count: 12 },
  { id: "marketing", label: "Campanhas", count: 10 },
]

export const knowledge: KbDocument[] = [
  {
    id: "kb_001",
    title: "Política de trocas e devoluções 2026",
    collection: "trocas",
    status: "indexed",
    source: "Manual",
    language: "pt-BR",
    chunks: 14,
    updatedAt: "2026-04-25T10:00:00Z",
    freshness: "fresh",
    excerpt:
      "Aceitamos trocas em até 30 dias após o recebimento. Para produtos lacrados, o prazo é estendido para 45 dias para clientes VIP.",
    embeddings: "text-embedding-3-large",
    usageCount30d: 1240,
    helpfulRate: 0.92,
  },
  {
    id: "kb_002",
    title: "Prazos de entrega — Sudeste",
    collection: "logistica",
    status: "indexed",
    source: "Manual",
    language: "pt-BR",
    chunks: 8,
    updatedAt: "2026-04-20T15:00:00Z",
    freshness: "fresh",
    excerpt:
      "Capitais Sudeste: 2-3 dias úteis. Interior: 4-6 dias úteis. Frete grátis acima de R$ 299. Cliente VIP tem entrega expressa em 24h em SP capital.",
    embeddings: "text-embedding-3-large",
    usageCount30d: 2890,
    helpfulRate: 0.96,
  },
  {
    id: "kb_003",
    title: "FAQ: Pagamento recusado, e agora?",
    collection: "pagamento",
    status: "indexed",
    source: "Notion",
    language: "pt-BR",
    chunks: 6,
    updatedAt: "2026-04-22T09:00:00Z",
    freshness: "fresh",
    excerpt:
      "1) Verificar limite e dados; 2) Tentar PIX (5% OFF automático); 3) Confirmar cliente com Konduto se risk score > 50.",
    embeddings: "text-embedding-3-large",
    usageCount30d: 612,
    helpfulRate: 0.88,
  },
  {
    id: "kb_004",
    title: "Console PS5 Slim — Especificações",
    collection: "produtos",
    status: "indexed",
    source: "Shopify",
    language: "pt-BR",
    chunks: 22,
    updatedAt: "2026-04-26T14:00:00Z",
    freshness: "fresh",
    excerpt:
      "PS5 Slim 1TB · Branco · 2 controles · Garantia Sony 12 meses · Disponível em estoque · Frete grátis · Parcelamos 12x sem juros.",
    embeddings: "text-embedding-3-large",
    usageCount30d: 1890,
    helpfulRate: 0.94,
  },
  {
    id: "kb_005",
    title: "Programa VIP — Benefícios",
    collection: "politicas",
    status: "indexed",
    source: "Manual",
    language: "pt-BR",
    chunks: 9,
    updatedAt: "2026-03-12T11:00:00Z",
    freshness: "stale",
    excerpt:
      "Clientes com LTV > R$ 2.000 recebem: frete expresso, garantia estendida, atendimento prioritário e ofertas exclusivas.",
    embeddings: "ada-002",
    usageCount30d: 240,
    helpfulRate: 0.81,
  },
  {
    id: "kb_006",
    title: "Cupons ativos — Abril 2026",
    collection: "marketing",
    status: "indexed",
    source: "Manual",
    language: "pt-BR",
    chunks: 4,
    updatedAt: "2026-04-27T08:00:00Z",
    freshness: "fresh",
    excerpt:
      "WELCOME8 (8% novos) · VIP15 (15% VIPs) · FRETE49 (frete fixo) · PIX5 (5% PIX). Não cumulativos.",
    embeddings: "text-embedding-3-large",
    usageCount30d: 421,
    helpfulRate: 0.97,
  },
  {
    id: "kb_007",
    title: "Procedimento: Reembolso PIX",
    collection: "pagamento",
    status: "indexing",
    source: "PDF",
    language: "pt-BR",
    chunks: 0,
    updatedAt: "2026-04-27T15:10:00Z",
    freshness: "fresh",
    excerpt: "Indexando 12 páginas...",
    embeddings: "text-embedding-3-large",
    usageCount30d: 0,
    helpfulRate: 0,
  },
  {
    id: "kb_008",
    title: "Garantia estendida — Termos",
    collection: "politicas",
    status: "error",
    source: "URL",
    language: "pt-BR",
    chunks: 0,
    updatedAt: "2026-04-26T20:00:00Z",
    freshness: "stale",
    excerpt: "Falha ao buscar URL · 403 Forbidden",
    embeddings: "text-embedding-3-large",
    usageCount30d: 0,
    helpfulRate: 0,
  },
]

export const playgroundExample = {
  question: "Comprei um console na semana passada e ainda não chegou, o que faço?",
  answer:
    "Que pena ouvir isso! Posso te ajudar a destravar agora. Olhei aqui e o seu pedido **#1842** foi enviado em 23/04 com previsão para 29/04 — ou seja, ainda está dentro do prazo. Posso te enviar o link de rastreio direto da Frenet ou abrir um caso com a transportadora se preferir. Como posso ajudar?",
  sources: [
    { title: "Prazos de entrega — Sudeste", chunk: "kb_002:3" },
    { title: "Pedido #1842 (Shopify)", chunk: "order:o_001" },
  ],
  latencyMs: 842,
  tokensIn: 412,
  tokensOut: 128,
  confidence: 0.91,
}
