// Mock analytics data — 14 days of operational, commercial, automation and AI metrics

const DAYS = 14
const startDate = new Date("2026-04-14T00:00:00Z")

function dayLabel(i: number): string {
  const d = new Date(startDate.getTime() + i * 86_400_000)
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" })
}

// Daily volume: conversations and messages
export const dailyVolume = Array.from({ length: DAYS }, (_, i) => {
  // weekend dip + slight upward trend
  const dow = (new Date(startDate.getTime() + i * 86_400_000).getUTCDay() + 6) % 7
  const weekendFactor = dow >= 5 ? 0.65 : 1
  const trend = 1 + i * 0.012
  const base = 280
  return {
    date: dayLabel(i),
    conversations: Math.round(base * weekendFactor * trend + (i % 3) * 12),
    messages: Math.round(base * 4.2 * weekendFactor * trend + (i % 3) * 30),
    automation: Math.round(base * 0.38 * weekendFactor * trend),
  }
})

// First response time (minutes) by day, p50 and p90
export const responseTime = Array.from({ length: DAYS }, (_, i) => ({
  date: dayLabel(i),
  p50: Math.round(2 + Math.sin(i / 2) * 0.6 + (i % 4 === 0 ? 1 : 0)),
  p90: Math.round(8 + Math.sin(i / 1.5) * 2 + (i % 5 === 0 ? 3 : 0)),
  target: 5,
}))

// Channel mix (last 30 days)
export const channelMix = [
  { channel: "WhatsApp", conversations: 4820, share: 0.78, color: "var(--chart-1)" },
  { channel: "Webchat", conversations: 612, share: 0.10, color: "var(--chart-2)" },
  { channel: "Instagram DM", conversations: 384, share: 0.06, color: "var(--chart-3)" },
  { channel: "Email", conversations: 248, share: 0.04, color: "var(--chart-4)" },
  { channel: "Telefone", conversations: 124, share: 0.02, color: "var(--chart-5)" },
]

// Top agents
export const topAgents = [
  { name: "Você", conversations: 184, csat: 4.8, avgFrt: 1.4, resolution: 0.92 },
  { name: "Bruno Tavares", conversations: 162, csat: 4.6, avgFrt: 2.1, resolution: 0.88 },
  { name: "Larissa Souza", conversations: 158, csat: 4.7, avgFrt: 1.8, resolution: 0.91 },
  { name: "Pedro Henrique", conversations: 142, csat: 4.5, avgFrt: 2.4, resolution: 0.85 },
  { name: "Camila Reis", conversations: 128, csat: 4.7, avgFrt: 1.6, resolution: 0.89 },
]

// Conversion funnel (cart recovery)
export const cartFunnel = [
  { stage: "Carrinhos abandonados", value: 1842, color: "var(--chart-3)" },
  { stage: "Mensagem enviada", value: 1726, color: "var(--chart-2)" },
  { stage: "Mensagem lida", value: 1245, color: "var(--chart-1)" },
  { stage: "Clique no link", value: 612, color: "var(--chart-1)" },
  { stage: "Pagamento iniciado", value: 384, color: "var(--chart-1)" },
  { stage: "Pedido pago", value: 248, color: "var(--chart-1)" },
]

// Revenue attributed by automation
export const revenueByAutomation = [
  { name: "Recupera carrinho 30min", revenue: 84_320, conversions: 142 },
  { name: "Pagamento recusado · resgate", revenue: 62_150, conversions: 98 },
  { name: "Pós-venda · cross-sell 14d", revenue: 38_400, conversions: 76 },
  { name: "Reativação 60d", revenue: 24_180, conversions: 42 },
  { name: "Aniversário cliente VIP", revenue: 18_960, conversions: 28 },
  { name: "Reabastecimento (consumíveis)", revenue: 12_400, conversions: 31 },
]

// Daily revenue trend
export const revenueTrend = Array.from({ length: DAYS }, (_, i) => {
  const dow = (new Date(startDate.getTime() + i * 86_400_000).getUTCDay() + 6) % 7
  const weekendFactor = dow >= 5 ? 0.7 : 1
  const trend = 1 + i * 0.018
  return {
    date: dayLabel(i),
    organic: Math.round(8500 * weekendFactor * trend),
    automated: Math.round(4200 * weekendFactor * trend),
    aiAssisted: Math.round(2800 * weekendFactor * trend),
  }
})

// Workflow execution health
export const workflowHealth = [
  { name: "Carrinho 30min", runs: 1842, success: 0.94, errors: 0.04, dlq: 0.02 },
  { name: "Pagamento recusado", runs: 612, success: 0.91, errors: 0.06, dlq: 0.03 },
  { name: "Pós-venda 14d", runs: 384, success: 0.96, errors: 0.03, dlq: 0.01 },
  { name: "Reativação 60d", runs: 248, success: 0.88, errors: 0.08, dlq: 0.04 },
  { name: "Aniversário VIP", runs: 124, success: 0.99, errors: 0.01, dlq: 0.0 },
  { name: "Reabastecimento", runs: 92, success: 0.84, errors: 0.10, dlq: 0.06 },
]

// Automation runs per day stacked
export const automationRuns = Array.from({ length: DAYS }, (_, i) => ({
  date: dayLabel(i),
  succeeded: Math.round(420 + i * 8 + (i % 4) * 18),
  failed: Math.round(28 + (i % 5) * 6),
  retried: Math.round(18 + (i % 3) * 4),
}))

// AI deflection over time
export const aiDeflection = Array.from({ length: DAYS }, (_, i) => ({
  date: dayLabel(i),
  ai: Math.round(58 + i * 0.7 + (i % 4) * 2),
  human: Math.round(42 - i * 0.7 - (i % 4) * 2),
}))

// AI metrics by use case
export const aiUseCases = [
  { useCase: "Sugestão de resposta", calls: 18420, accept: 0.74, avgConfidence: 0.86, avgLatency: 940 },
  { useCase: "Classificação de intenção", calls: 24180, accept: 0.92, avgConfidence: 0.91, avgLatency: 320 },
  { useCase: "Resumo de conversa", calls: 6420, accept: 0.88, avgConfidence: 0.83, avgLatency: 1240 },
  { useCase: "Resposta automática", calls: 12180, accept: 0.68, avgConfidence: 0.79, avgLatency: 1480 },
  { useCase: "Detecção de fraude", calls: 4280, accept: 0.95, avgConfidence: 0.93, avgLatency: 280 },
]

// Cost per resolved conversation (BRL)
export const costPerResolution = Array.from({ length: DAYS }, (_, i) => ({
  date: dayLabel(i),
  ai: Number((1.2 - i * 0.018 + (i % 3) * 0.04).toFixed(2)),
  human: Number((4.6 + (i % 4) * 0.12).toFixed(2)),
}))

// CSAT distribution last 30 days
export const csatDistribution = [
  { score: "5", count: 642, color: "var(--chart-1)" },
  { score: "4", count: 218, color: "var(--chart-2)" },
  { score: "3", count: 84, color: "var(--chart-3)" },
  { score: "2", count: 28, color: "var(--chart-4)" },
  { score: "1", count: 12, color: "var(--chart-5)" },
]

// Hourly heatmap (24h x 7d) — message volume
export const hourlyHeatmap = (() => {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  return days.map((day, di) => ({
    day,
    cells: Array.from({ length: 24 }, (_, h) => {
      // peak at lunch and evening, lower on weekends
      const isWeekend = di >= 5
      const peak = h >= 11 && h <= 14 ? 1.4 : h >= 19 && h <= 22 ? 1.6 : h >= 8 && h <= 17 ? 1 : 0.3
      const value = Math.round(60 * peak * (isWeekend ? 0.6 : 1) + Math.random() * 12)
      return value
    }),
  }))
})()

// Top intents (last 30d)
export const topIntents = [
  { intent: "Onde está meu pedido?", count: 1842, change: 0.06 },
  { intent: "Pagamento recusado", count: 612, change: 0.18 },
  { intent: "Trocar tamanho/cor", count: 484, change: -0.04 },
  { intent: "Cupom de desconto", count: 412, change: 0.32 },
  { intent: "Estoque/disponibilidade", count: 318, change: 0.08 },
  { intent: "Cancelamento", count: 184, change: -0.12 },
]

// Headline KPIs
export const kpis = {
  attributedRevenue: { value: 240_410, change: 0.184 },
  aiAssistedRevenue: { value: 84_180, change: 0.231 },
  conversations30d: { value: 6_188, change: 0.092 },
  avgFirstResponse: { value: "1m 48s", change: -0.14 },
  csat30d: { value: 4.6, change: 0.04 },
  aiDeflection: { value: 0.68, change: 0.05 },
  cartRecoveryRate: { value: 0.135, change: 0.024 },
  automationSuccess: { value: 0.927, change: 0.012 },
}
