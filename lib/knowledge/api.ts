export async function listKnowledgeSources<T = unknown[]>(): Promise<T> {
  const response = await fetch("/api/v1/knowledge", { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load knowledge sources")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function createKnowledgeSource<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/knowledge", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to create knowledge source")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function createKnowledgeDocument<T = unknown>(sourceId: string, input: unknown): Promise<T> {
  const response = await fetch(`/api/v1/knowledge/sources/${sourceId}/documents`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to create knowledge document")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function listKnowledgeDocuments<T = unknown[]>(sourceId: string): Promise<T> {
  const response = await fetch(`/api/v1/knowledge/sources/${sourceId}/documents`, { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load knowledge documents")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function listKnowledgeChunks<T = unknown[]>(documentId: string): Promise<T> {
  const response = await fetch(`/api/v1/knowledge/documents/${documentId}/chunks`, { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load knowledge chunks")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function runKnowledgeRetrieval<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/knowledge/retrieval", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to run knowledge retrieval")
  return (await response.json()) as T
}

export async function runKnowledgeIngest<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/knowledge/ingest", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to run knowledge ingest")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function listKnowledgeRetrievalLogs<T = unknown[]>(sourceId?: string): Promise<T> {
  const suffix = sourceId ? `?sourceId=${encodeURIComponent(sourceId)}` : ""
  const response = await fetch(`/api/v1/knowledge/logs${suffix}`, { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load knowledge retrieval logs")
  const payload = (await response.json()) as { items: T }
  return payload.items
}
