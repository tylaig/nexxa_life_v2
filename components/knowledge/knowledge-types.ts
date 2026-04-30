export type KnowledgeSourceItem = {
  id: string
  sourceType: string
  name: string
  status: string
  config: Record<string, unknown>
  lastIngestedAt?: string | null
}

export type KnowledgeDocumentItem = {
  id: string
  sourceId: string
  title: string
  body: string
  mimeType: string
  metadata: Record<string, unknown>
}

export type KnowledgeChunkItem = {
  id: string
  documentId: string
  sourceId: string
  chunkIndex: number
  content: string
  tokenEstimate: number
}

export type KnowledgeRetrievalLogItem = {
  id: string
  sourceId: string
  query: string
  limit: number
  matchedDocumentIds: string[]
  createdAt: string
}

export type KnowledgeRetrievalResult = {
  items: KnowledgeDocumentItem[]
  logs: KnowledgeRetrievalLogItem[]
}
