import type { CreateSkillInput } from "./contracts"

export type SkillVersionRecord = {
  id: string
  version: number
  promptTemplate: string
  inputSchema: Record<string, unknown>
  detectedVariables: string[]
  createdAt: string
}

export type SkillRecord = Omit<CreateSkillInput, "promptTemplate" | "inputSchema"> & {
  id: string
  createdAt: string
  updatedAt: string
  currentVersion: SkillVersionRecord
}

type StoreOptions = {
  createId?: (prefix: string) => string
  now?: () => string
}

function defaultCreateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function defaultNow() {
  return new Date().toISOString()
}

export function createSkillStore(seed: SkillRecord[] = [], options: StoreOptions = {}) {
  let items = structuredClone(seed)
  const createId = options.createId ?? defaultCreateId
  const now = options.now ?? defaultNow

  function listSkills() {
    return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function createSkill(input: CreateSkillInput, detectedVariables: string[]) {
    const timestamp = now()
    const item: SkillRecord = {
      id: createId("skill"),
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category,
      status: input.status,
      outputMode: input.outputMode,
      createdAt: timestamp,
      updatedAt: timestamp,
      currentVersion: {
        id: createId("skillv"),
        version: 1,
        promptTemplate: input.promptTemplate,
        inputSchema: input.inputSchema,
        detectedVariables,
        createdAt: timestamp,
      },
    }

    items = [item, ...items]
    return item
  }

  function reset(nextSeed: SkillRecord[] = seed) {
    items = structuredClone(nextSeed)
  }

  return {
    listSkills,
    createSkill,
    reset,
  }
}

export const skillStore = createSkillStore()
