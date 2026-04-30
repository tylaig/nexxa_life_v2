import type { CreateIntegrationInput, UpdateIntegrationInput } from "./contracts"

export type IntegrationConnectionRecord = CreateIntegrationInput & {
  id: string
  healthStatus: "unknown" | "validated" | "error"
  checkedAt: string | null
  createdAt: string
  updatedAt: string
}

type StoreOptions = {
  createId?: () => string
  now?: () => string
}

function defaultCreateId() {
  return `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function defaultNow() {
  return new Date().toISOString()
}

const defaultIntegrationSeed: IntegrationConnectionRecord[] = [
  {
    id: "int_n8n_ops",
    provider: "n8n",
    displayName: "n8n Ops",
    baseUrl: "https://n8n.meusuper.app",
    authMode: "bearer",
    status: "validated",
    configPublic: { environment: "production", notes: "Fluxos operacionais e webhooks inbound" },
    healthStatus: "validated",
    checkedAt: "2026-04-29T11:00:00.000Z",
    createdAt: "2026-04-27T12:00:00.000Z",
    updatedAt: "2026-04-29T11:00:00.000Z",
  },
  {
    id: "int_supabase_knowledge",
    provider: "supabase",
    displayName: "Supabase Knowledge",
    baseUrl: "https://project.supabase.co",
    authMode: "service_role",
    status: "validated",
    configPublic: { environment: "production", notes: "Documentos, retrieval logs e vetores opt-in" },
    healthStatus: "validated",
    checkedAt: "2026-04-29T10:45:00.000Z",
    createdAt: "2026-04-27T12:30:00.000Z",
    updatedAt: "2026-04-29T10:45:00.000Z",
  },
  {
    id: "int_openai_assistants",
    provider: "openai",
    displayName: "OpenAI Assistants",
    baseUrl: "https://api.openai.com",
    authMode: "bearer",
    status: "draft",
    configPublic: { environment: "staging", notes: "Avaliação de agentes e prompts operacionais" },
    healthStatus: "unknown",
    checkedAt: null,
    createdAt: "2026-04-28T09:15:00.000Z",
    updatedAt: "2026-04-29T09:15:00.000Z",
  },
]

export function createIntegrationStore(seed: IntegrationConnectionRecord[] = defaultIntegrationSeed, options: StoreOptions = {}) {
  let items = structuredClone(seed)
  const createId = options.createId ?? defaultCreateId
  const now = options.now ?? defaultNow

  function listIntegrationConnections() {
    return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function getIntegrationConnection(id: string) {
    return items.find((item) => item.id === id) ?? null
  }

  function createIntegrationConnection(input: CreateIntegrationInput) {
    const timestamp = now()
    const record: IntegrationConnectionRecord = {
      id: createId(),
      ...input,
      healthStatus: input.status === "validated" ? "validated" : "unknown",
      checkedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    items = [record, ...items]
    return record
  }

  function updateIntegrationConnection(id: string, input: UpdateIntegrationInput) {
    const current = items.find((item) => item.id === id)
    if (!current) return null

    const next: IntegrationConnectionRecord = {
      ...current,
      ...input,
      configPublic: input.configPublic ? { ...current.configPublic, ...input.configPublic } : current.configPublic,
      healthStatus:
        input.status === "validated"
          ? "validated"
          : input.status === "error"
            ? "error"
            : current.healthStatus,
      updatedAt: now(),
    }

    items = items.map((item) => (item.id === id ? next : item))
    return next
  }

  function reset(nextSeed: IntegrationConnectionRecord[] = []) {
    items = structuredClone(nextSeed)
  }

  return {
    listIntegrationConnections,
    getIntegrationConnection,
    createIntegrationConnection,
    updateIntegrationConnection,
    reset,
  }
}

export const integrationStore = createIntegrationStore()
