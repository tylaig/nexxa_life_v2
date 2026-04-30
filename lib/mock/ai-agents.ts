export type AgentPlatformBinding = {
  provider: string
  displayName: string
  status: "connected" | "mock" | "disabled"
  capabilities: string[]
  configSummary: string
}

export type AiAgent = {
  id: string
  name: string
  role: string
  description: string
  status: "live" | "shadow" | "draft"
  model: "GPT-4o" | "GPT-4o-mini" | "Claude 3.5 Sonnet" | "Gemini 2.5 Flash"
  temperature: number
  conversations30d: number // % de conversas resolvidas sem humano
  deflectionRate: number
  csat: number
  escalationRate: number
  avgLatencyMs: number
  tools: string[]
  guardrails: string[]
  platformBindings: AgentPlatformBinding[]
  avatar: string
  voiceSettings?: {
    enabled: boolean
    provider: string
    voiceId: string
    speed: number
  }
  operationalSettings?: {
    debounceTimeMs: number
    splitMessages: boolean
    typingSpeedCharsPerSec: number
  }
  linkedKnowledgeIds?: string[]
}

export const agents: AiAgent[] = [
  {
    id: "ai_001",
    name: "Sofia",
    role: "Vendas e recuperação",
    description:
      "Especialista em recuperação de carrinho, oferta de PIX e cross-sell de acessórios. Trabalha em horário comercial e aciona humano quando ticket > R$ 3k.",
    status: "live",
    model: "GPT-4o",
    temperature: 0.4,
    conversations30d: 4892,
    deflectionRate: 0.62,
    csat: 4.6,
    escalationRate: 0.18,
    avgLatencyMs: 920,
    tools: ["Shopify · pedidos", "WhatsApp · enviar template", "Catálogo · busca", "Cupons · aplicar"],
    guardrails: [
      "Nunca prometer prazo fora do estoque",
      "Cupom máximo 15% sem aprovação",
      "Escalar VIPs imediatamente",
    ],
    platformBindings: [
      {
        provider: "shopify",
        displayName: "Shopify Storefront",
        status: "connected",
        capabilities: ["pedidos", "carrinho", "catálogo"],
        configSummary: "Loja principal · token mock ativo",
      },
      {
        provider: "whatsapp",
        displayName: "WhatsApp Cloud",
        status: "connected",
        capabilities: ["templates", "envio", "janela 24h"],
        configSummary: "WABA principal · sender default",
      },
      {
        provider: "erp",
        displayName: "ERP Comercial",
        status: "mock",
        capabilities: ["estoque", "preço", "pedido"],
        configSummary: "Config mock pronta para ativação",
      },
    ],
    avatar: "S",
    voiceSettings: { enabled: true, provider: "ElevenLabs", voiceId: "Rachel", speed: 1.0 },
    operationalSettings: { debounceTimeMs: 2500, splitMessages: true, typingSpeedCharsPerSec: 45 },
    linkedKnowledgeIds: ["ks_mock_politicas", "ks_mock_produtos"],
  },
  {
    id: "ai_002",
    name: "Bruno",
    role: "Pós-venda e logística",
    description:
      "Lida com rastreio, troca, devolução e atrasos. Tem acesso a Frenet, Melhor Envio e ao ERP. Resolve 70%+ dos casos sem humano.",
    status: "live",
    model: "GPT-4o-mini",
    temperature: 0.2,
    conversations30d: 6214,
    deflectionRate: 0.78,
    csat: 4.7,
    escalationRate: 0.09,
    avgLatencyMs: 720,
    tools: ["Frenet · rastrear", "Melhor Envio · etiqueta", "Shopify · status", "RAG · políticas"],
    guardrails: [
      "Reembolso só após confirmação humana",
      "Nunca reabrir caso fechado",
      "Sempre citar fonte da política",
    ],
    platformBindings: [
      {
        provider: "frenet",
        displayName: "Frenet",
        status: "connected",
        capabilities: ["tracking", "prazo", "status"],
        configSummary: "Webhook de rastreio ativo",
      },
      {
        provider: "melhor_envio",
        displayName: "Melhor Envio",
        status: "connected",
        capabilities: ["etiqueta", "tracking"],
        configSummary: "Conta logística principal",
      },
      {
        provider: "whatsapp",
        displayName: "WhatsApp Cloud",
        status: "mock",
        capabilities: ["notificações", "templates"],
        configSummary: "Sandbox mock para fluxos pós-venda",
      },
    ],
    avatar: "B",
    voiceSettings: { enabled: false, provider: "ElevenLabs", voiceId: "Adam", speed: 1.1 },
    operationalSettings: { debounceTimeMs: 1500, splitMessages: false, typingSpeedCharsPerSec: 60 },
    linkedKnowledgeIds: ["ks_mock_logistica"],
  },
  {
    id: "ai_003",
    name: "Ana",
    role: "SDR · Qualificação",
    description:
      "Qualifica leads que chegam por anúncios e webchat. Faz pré-venda, agenda demo e envia material para closer humano.",
    status: "shadow",
    model: "Claude 3.5 Sonnet",
    temperature: 0.5,
    conversations30d: 312,
    deflectionRate: 0.41,
    csat: 4.4,
    escalationRate: 0.32,
    avgLatencyMs: 1140,
    tools: ["Calendly · agendar", "HubSpot · criar deal", "RAG · institucional"],
    guardrails: [
      "Nunca prometer desconto",
      "Sempre transferir para closer humano em B2B",
    ],
    platformBindings: [
      {
        provider: "hubspot",
        displayName: "HubSpot",
        status: "connected",
        capabilities: ["deals", "contatos", "pipeline"],
        configSummary: "Workspace comercial ativo",
      },
      {
        provider: "calendly",
        displayName: "Calendly",
        status: "connected",
        capabilities: ["agenda", "slots"],
        configSummary: "Links de booking sincronizados",
      },
      {
        provider: "whatsapp",
        displayName: "WhatsApp Cloud",
        status: "mock",
        capabilities: ["qualificação", "handoff"],
        configSummary: "Mock pronto para testes SDR",
      },
    ],
    avatar: "A",
    voiceSettings: { enabled: true, provider: "ElevenLabs", voiceId: "Bella", speed: 1.0 },
    operationalSettings: { debounceTimeMs: 3000, splitMessages: true, typingSpeedCharsPerSec: 35 },
    linkedKnowledgeIds: ["ks_mock_vendas", "ks_mock_concorrentes"],
  },
  {
    id: "ai_004",
    name: "Carlos",
    role: "Triagem e roteamento",
    description:
      "Primeiro contato em todas as conversas: classifica intenção, identifica VIP/risco e roteia para o agente humano ou IA correto.",
    status: "live",
    model: "Gemini 2.5 Flash",
    temperature: 0.1,
    conversations30d: 12480,
    deflectionRate: 0,
    csat: 4.5,
    escalationRate: 1.0,
    avgLatencyMs: 320,
    tools: ["Onda · classificar", "Onda · rotear", "CRM · ler perfil"],
    guardrails: [
      "Nunca responder pergunta de produto",
      "Sempre identificar VIP",
      "Latência máxima 500ms",
    ],
    platformBindings: [
      {
        provider: "crm",
        displayName: "CRM Onda",
        status: "connected",
        capabilities: ["perfil", "segmento", "vip"],
        configSummary: "Leitura de perfil em tempo real",
      },
      {
        provider: "whatsapp",
        displayName: "WhatsApp Cloud",
        status: "connected",
        capabilities: ["entrada", "roteamento"],
        configSummary: "Canal principal conectado",
      },
      {
        provider: "zendesk",
        displayName: "Zendesk",
        status: "disabled",
        capabilities: ["tickets", "handoff"],
        configSummary: "Desabilitado até configuração na aba Integrações",
      },
    ],
    avatar: "C",
    voiceSettings: { enabled: false, provider: "ElevenLabs", voiceId: "Callum", speed: 1.0 },
    operationalSettings: { debounceTimeMs: 1000, splitMessages: false, typingSpeedCharsPerSec: 100 },
    linkedKnowledgeIds: [],
  },
]
