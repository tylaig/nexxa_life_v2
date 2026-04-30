import type { CreateKnowledgeDocumentInput, CreateKnowledgeSourceInput, KnowledgeRetrievalQueryInput } from "./contracts"

export type KnowledgeSourceRecord = CreateKnowledgeSourceInput & {
  id: string
  lastIngestedAt: string | null
  createdAt: string
  updatedAt: string
}

export type KnowledgeDocumentRecord = CreateKnowledgeDocumentInput & {
  id: string
  createdAt: string
  updatedAt: string
}

export type KnowledgeChunkRecord = {
  id: string
  documentId: string
  sourceId: string
  chunkIndex: number
  content: string
  tokenEstimate: number
  createdAt: string
}

export type KnowledgeRetrievalLogRecord = KnowledgeRetrievalQueryInput & {
  id: string
  matchedDocumentIds: string[]
  createdAt: string
}

type StoreOptions = {
  createId?: (prefix?: string) => string
  now?: () => string
}

function defaultCreateId(prefix = "ks") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function defaultNow() {
  return new Date().toISOString()
}

export function splitIntoChunks(body: string, size = 8) {
  const words = body.split(/\s+/).filter(Boolean)
  const chunks: string[] = []
  for (let index = 0; index < words.length; index += size) {
    chunks.push(words.slice(index, index + size).join(" "))
  }
  return chunks.length > 0 ? chunks : [body]
}

export function createKnowledgeStore(
  seed: {
    sources?: KnowledgeSourceRecord[]
    documents?: KnowledgeDocumentRecord[]
    chunks?: KnowledgeChunkRecord[]
    retrievalLogs?: KnowledgeRetrievalLogRecord[]
  } = {},
  options: StoreOptions = {}
) {
  let sources = structuredClone(seed.sources ?? [])
  let documents = structuredClone(seed.documents ?? [])
  let chunks = structuredClone(seed.chunks ?? [])
  let retrievalLogs = structuredClone(seed.retrievalLogs ?? [])
  const createId = options.createId ?? defaultCreateId
  const now = options.now ?? defaultNow

  function listKnowledgeSources() {
    return [...sources].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function createKnowledgeSource(input: CreateKnowledgeSourceInput) {
    const timestamp = now()
    const record: KnowledgeSourceRecord = {
      id: createId("ks"),
      ...input,
      lastIngestedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    sources = [record, ...sources]
    return record
  }

  function listKnowledgeDocuments(sourceId: string) {
    return documents.filter((document) => document.sourceId === sourceId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function listKnowledgeChunks(documentId: string) {
    return chunks.filter((chunk) => chunk.documentId === documentId).sort((a, b) => a.chunkIndex - b.chunkIndex)
  }

  function createKnowledgeDocument(input: CreateKnowledgeDocumentInput) {
    const timestamp = now()
    const record: KnowledgeDocumentRecord = {
      id: createId("kd"),
      ...input,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    documents = [record, ...documents]
    const nextChunks = splitIntoChunks(input.body).map((content, chunkIndex) => ({
      id: createId("kc"),
      documentId: record.id,
      sourceId: record.sourceId,
      chunkIndex,
      content,
      tokenEstimate: Math.max(1, Math.ceil(content.length / 4)),
      createdAt: timestamp,
    }))
    chunks = [...nextChunks, ...chunks]
    return record
  }

  function createRetrievalLog(input: KnowledgeRetrievalQueryInput, matchedDocumentIds: string[]) {
    const record: KnowledgeRetrievalLogRecord = {
      id: createId("kr"),
      ...input,
      matchedDocumentIds,
      createdAt: now(),
    }
    retrievalLogs = [record, ...retrievalLogs]
    return record
  }

  function listRetrievalLogs(sourceId?: string) {
    return retrievalLogs.filter((log) => !sourceId || log.sourceId === sourceId)
  }

  function reset(nextSeed: { sources?: KnowledgeSourceRecord[]; documents?: KnowledgeDocumentRecord[]; chunks?: KnowledgeChunkRecord[]; retrievalLogs?: KnowledgeRetrievalLogRecord[] } = {}) {
    sources = structuredClone(nextSeed.sources ?? [])
    documents = structuredClone(nextSeed.documents ?? [])
    chunks = structuredClone(nextSeed.chunks ?? [])
    retrievalLogs = structuredClone(nextSeed.retrievalLogs ?? [])
  }

  return { listKnowledgeSources, createKnowledgeSource, listKnowledgeDocuments, listKnowledgeChunks, createKnowledgeDocument, createRetrievalLog, listRetrievalLogs, reset }
}

export const knowledgeStore = createKnowledgeStore()
