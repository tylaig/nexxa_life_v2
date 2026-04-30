import { Activity, BarChart2, Brain, Heart, Moon, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"

export const reportsHero = {
  kicker: "Relatórios",
  title: "Leia padrões de evolução com mais clareza e menos ruído visual.",
  description:
    "A superfície inicial de relatórios consolida leituras de bem-estar, produtividade, humor e diagnóstico em um formato pronto para evoluir para dados reais do domínio Meu Dia.",
} as const

export const reportsChartTabs = ["Evolução 7 Dias", "Comparativo %"] as const

export const reportsKpis = [
  {
    label: "Bem-estar médio",
    value: "76%",
    hint: "Baseado na síntese recente dos registros do diário.",
    icon: Heart,
  },
  {
    label: "Produtividade média",
    value: "68%",
    hint: "Leitura consolidada do checklist e das entregas do período.",
    icon: TrendingUp,
  },
  {
    label: "Saúde mental",
    value: "72%",
    hint: "Interpretação agregada do humor e do ritmo percebido.",
    icon: Brain,
  },
] as const

export const reportsQuickSignals = [
  {
    label: "Último diagnóstico",
    value: "74%",
    hint: "Score mais recente já refletido no painel de leitura.",
    icon: ShieldCheck,
  },
  {
    label: "Dias monitorados",
    value: "7",
    hint: "Janela inicial usada para consolidar a visão de evolução.",
    icon: BarChart2,
  },
  {
    label: "Alertas ativos",
    value: "1",
    hint: "Sinais de atenção que merecem revisão na próxima rodada.",
    icon: Moon,
  },
] as const

export const reportsInsightTemplates = [
  {
    title: "Alta execução",
    text: "Sua taxa de entrega está consistente e indica boa cadência de execução no período.",
    icon: Activity,
  },
  {
    title: "Bem-estar otimizado",
    text: "Os registros mostram um estado geral favorável para manter ritmo e constância.",
    icon: Sparkles,
  },
  {
    title: "Leitura sistêmica em formação",
    text: "Continue alimentando diagnóstico, checklist e diário para aprofundar a precisão analítica.",
    icon: BarChart2,
  },
] as const

export const reportsWeeklySeries = [
  { day: "Seg", wellBeing: 70, productivity: 62, mood: 68 },
  { day: "Ter", wellBeing: 74, productivity: 65, mood: 70 },
  { day: "Qua", wellBeing: 72, productivity: 60, mood: 66 },
  { day: "Qui", wellBeing: 79, productivity: 72, mood: 75 },
  { day: "Sex", wellBeing: 81, productivity: 78, mood: 80 },
  { day: "Sáb", wellBeing: 76, productivity: 58, mood: 74 },
  { day: "Dom", wellBeing: 80, productivity: 42, mood: 79 },
] as const
