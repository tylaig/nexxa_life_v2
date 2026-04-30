import type { CreateCampaignInput } from "./contracts"

export type CampaignRecord = CreateCampaignInput & {
  id: string
  launchedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

type StoreOptions = {
  createId?: () => string
  now?: () => string
}

function defaultCreateId() {
  return `camp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function defaultNow() {
  return new Date().toISOString()
}

const defaultCampaignSeed: CampaignRecord[] = [
  {
    id: "camp_cart_recovery",
    name: "Carrinho 24h · VIP",
    objective: "recover_cart",
    status: "running",
    channel: "whatsapp",
    senderId: "sender_whatsapp_main",
    templateId: "tpl_001",
    templateVersion: "v3",
    audienceId: "aud_vip_cart_24h",
    createdBy: "samuel",
    scheduleAt: "2026-04-28T14:00:00.000Z",
    dryRunEnabled: false,
    metadata: { compliance: "approved", owner_team: "crm", priority: "high" },
    launchedAt: "2026-04-28T14:05:00.000Z",
    completedAt: null,
    createdAt: "2026-04-27T15:30:00.000Z",
    updatedAt: "2026-04-29T11:10:00.000Z",
  },
  {
    id: "camp_pix_retry",
    name: "PIX retry · 2h",
    objective: "payment_retry",
    status: "scheduled",
    channel: "whatsapp",
    senderId: "sender_whatsapp_main",
    templateId: "tpl_003",
    templateVersion: "v2",
    audienceId: "aud_pix_retry",
    createdBy: "samuel",
    scheduleAt: "2026-04-30T16:00:00.000Z",
    dryRunEnabled: true,
    metadata: { compliance: "needs_review", owner_team: "revenue", priority: "medium" },
    launchedAt: null,
    completedAt: null,
    createdAt: "2026-04-28T09:00:00.000Z",
    updatedAt: "2026-04-29T10:00:00.000Z",
  },
  {
    id: "camp_winback_console",
    name: "Winback console premium",
    objective: "winback",
    status: "draft",
    channel: "email",
    senderId: "sender_email_growth",
    templateId: "tpl_005",
    templateVersion: "v1",
    audienceId: "aud_console_buyers_90d",
    createdBy: "samuel",
    dryRunEnabled: true,
    metadata: { compliance: "draft", owner_team: "growth", priority: "medium" },
    launchedAt: null,
    completedAt: null,
    createdAt: "2026-04-29T08:45:00.000Z",
    updatedAt: "2026-04-29T08:45:00.000Z",
  },
]

export function createCampaignStore(seed: CampaignRecord[] = defaultCampaignSeed, options: StoreOptions = {}) {
  let campaigns = structuredClone(seed)
  const createId = options.createId ?? defaultCreateId
  const now = options.now ?? defaultNow

  function listCampaigns() {
    return [...campaigns].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function getCampaign(id: string) {
    return campaigns.find((campaign) => campaign.id === id) ?? null
  }

  function createCampaign(input: CreateCampaignInput) {
    const timestamp = now()
    const campaign: CampaignRecord = {
      id: createId(),
      ...input,
      launchedAt: null,
      completedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    campaigns = [campaign, ...campaigns]
    return campaign
  }

  function updateCampaign(id: string, input: Partial<CreateCampaignInput>) {
    const current = campaigns.find((campaign) => campaign.id === id)
    if (!current) return null

    const next: CampaignRecord = {
      ...current,
      ...input,
      updatedAt: now(),
    }

    campaigns = campaigns.map((campaign) => (campaign.id === id ? next : campaign))
    return next
  }

  function reset(nextSeed: CampaignRecord[] = []) {
    campaigns = structuredClone(nextSeed)
  }

  return {
    listCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    reset,
  }
}

export const campaignStore = createCampaignStore()
