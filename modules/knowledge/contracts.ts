import { z } from "zod"

export const KNOWLEDGE_CAPABILITIES = [
  "source_ingestion",
  "chunking_pipeline",
  "embedding_index",
  "retrieval_console",
] as const

export type KnowledgeCapability = (typeof KNOWLEDGE_CAPABILITIES)[number]

export const createKnowledgeSourceSchema = z.object({
  sourceType: z.enum(["url", "pdf", "manual", "shopify", "notion"]),
  name: z.string().trim().min(1, "name is required"),
  status: z.enum(["draft", "indexing", "indexed", "error"]).default("draft"),
  config: z.record(z.string(), z.unknown()).default({}),
})

export const createKnowledgeDocumentSchema = z.object({
  sourceId: z.string().trim().min(1, "sourceId is required"),
  title: z.string().trim().min(1, "title is required"),
  body: z.string().trim().min(1, "body is required"),
  mimeType: z.string().trim().min(1, "mimeType is required"),
  metadata: z.record(z.string(), z.unknown()).default({}),
})

export const knowledgeRetrievalQuerySchema = z.object({
  sourceId: z.string().trim().min(1, "sourceId is required"),
  query: z.string().trim().min(1, "query is required"),
  limit: z.number().int().positive().max(20).default(5),
})

export const knowledgeChunkQuerySchema = z.object({
  documentId: z.string().trim().min(1, "documentId is required"),
})

export type CreateKnowledgeSourceInput = z.infer<typeof createKnowledgeSourceSchema>
export type CreateKnowledgeDocumentInput = z.infer<typeof createKnowledgeDocumentSchema>
export type KnowledgeRetrievalQueryInput = z.infer<typeof knowledgeRetrievalQuerySchema>
export type KnowledgeChunkQueryInput = z.infer<typeof knowledgeChunkQuerySchema>

export function listKnowledgeCapabilities(): KnowledgeCapability[] {
  return [...KNOWLEDGE_CAPABILITIES]
}

export function parseCreateKnowledgeSourceInput(payload: unknown): CreateKnowledgeSourceInput {
  return createKnowledgeSourceSchema.parse(payload)
}

export function parseCreateKnowledgeDocumentInput(payload: unknown): CreateKnowledgeDocumentInput {
  return createKnowledgeDocumentSchema.parse(payload)
}

export function parseKnowledgeRetrievalQueryInput(payload: unknown): KnowledgeRetrievalQueryInput {
  return knowledgeRetrievalQuerySchema.parse(payload)
}

export function parseKnowledgeChunkQueryInput(payload: unknown): KnowledgeChunkQueryInput {
  return knowledgeChunkQuerySchema.parse(payload)
}
