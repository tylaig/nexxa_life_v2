import { createHash } from "node:crypto"

import { dbQuery } from "@/lib/server/db"
import { embeddingToPgVector, generateTextEmbedding } from "@/lib/server/embeddings"
import { getAppEnv, hasDatabaseUrl } from "@/lib/server/env"
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/server/supabase"

import type { CreateKnowledgeDocumentInput, CreateKnowledgeSourceInput, KnowledgeRetrievalQueryInput } from "./contracts"
import {
  knowledgeStore,
  splitIntoChunks,
  type KnowledgeChunkRecord,
  type KnowledgeDocumentRecord,
  type KnowledgeRetrievalLogRecord,
  type KnowledgeSourceRecord,
} from "./store"

type RetrievalLogRow = {
  id: string
  source_context_id: string | null
  query_text: string
  results: Array<{ documentId?: string }> | null
  created_at: string | Date
}

type KnowledgeSourceRow = {
  id: string
  source_type: string
  name: string
  status: string
  config: Record<string, unknown> | null
  last_ingested_at: string | Date | null
  created_at: string | Date
  updated_at: string | Date
}

type KnowledgeDocumentRow = {
  id: string
  source_id: string
  title: string
  content_text: string
  mime_type: string
  metadata: Record<string, unknown> | null
  created_at: string | Date
  updated_at: string | Date
}

type KnowledgeChunkRow = {
  id: string
  document_id: string
  source_id: string
  chunk_index: number
  content: string
  token_count: number
  embedding_status?: string | null
  metadata?: Record<string, unknown> | null
  created_at: string | Date
}

type SupabaseKnowledgeMatchRow = {
  chunk_id: string
  document_id: string
  source_id: string
  content: string | null
  metadata?: Record<string, unknown> | null
  similarity?: number | null
}

function createId(prefix = "ks") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function toIso(value: string | Date | null) {
  if (!value) return null
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function mapSourceRow(row: KnowledgeSourceRow): KnowledgeSourceRecord {
  return {
    id: row.id,
    sourceType: row.source_type as KnowledgeSourceRecord["sourceType"],
    name: row.name,
    status: row.status as KnowledgeSourceRecord["status"],
    config: row.config ?? {},
    lastIngestedAt: toIso(row.last_ingested_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapDocumentRow(row: KnowledgeDocumentRow): KnowledgeDocumentRecord {
  return {
    id: row.id,
    sourceId: row.source_id,
    title: row.title,
    body: row.content_text,
    mimeType: row.mime_type,
    metadata: row.metadata ?? {},
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  }
}

function mapChunkRow(row: KnowledgeChunkRow): KnowledgeChunkRecord {
  return {
    id: row.id,
    documentId: row.document_id,
    sourceId: row.source_id,
    chunkIndex: row.chunk_index,
    content: row.content,
    tokenEstimate: row.token_count,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
  }
}

function buildChecksum(input: CreateKnowledgeDocumentInput) {
  return createHash("sha256")
    .update(`${input.sourceId}\n${input.title}\n${input.mimeType}\n${input.body}`)
    .digest("hex")
}

async function persistRetrievalLog(
  input: KnowledgeRetrievalQueryInput,
  items: KnowledgeDocumentRecord[],
  mode: "supabase_vector" | "text_fallback" | "local_fallback"
): Promise<KnowledgeRetrievalLogRecord> {
  const record: KnowledgeRetrievalLogRecord = {
    id: createId("kr"),
    ...input,
    matchedDocumentIds: items.map((item) => item.id),
    createdAt: new Date().toISOString(),
  }

  if (!hasDatabaseUrl() && !isSupabaseConfigured()) {
    return knowledgeStore.createRetrievalLog(input, record.matchedDocumentIds)
  }

  const env = getAppEnv()
  const results = items.map((item) => ({
    documentId: item.id,
    title: item.title,
    mimeType: item.mimeType,
    similarity: typeof item.metadata?.similarity === "number" ? item.metadata.similarity : null,
    matchedChunkCount: item.metadata?.matchedChunkCount ?? null,
  }))

  if (hasDatabaseUrl()) {
    await dbQuery(
      `insert into retrieval_logs (id, tenant_id, workspace_id, source_context_type, source_context_id, query_text, filters, top_k, results, grounding_required, status)
       values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9::jsonb,$10,$11)`,
      [
        record.id,
        env.APP_TENANT_ID,
        env.APP_WORKSPACE_ID,
        "knowledge_source",
        input.sourceId,
        input.query,
        JSON.stringify({ mode }),
        input.limit,
        JSON.stringify(results),
        true,
        "completed",
      ]
    )

    return record
  }

  const client = getSupabaseAdminClient()
  await client.from("retrieval_logs").insert({
    id: record.id,
    tenant_id: env.APP_TENANT_ID,
    workspace_id: env.APP_WORKSPACE_ID,
    source_context_type: "knowledge_source",
    source_context_id: input.sourceId,
    query_text: input.query,
    filters: { mode },
    top_k: input.limit,
    results,
    grounding_required: true,
    status: "completed",
  })

  return record
}

async function runSupabaseVectorRetrieval(
  input: KnowledgeRetrievalQueryInput
): Promise<{ items: KnowledgeDocumentRecord[]; logs: KnowledgeRetrievalLogRecord[] } | null> {
  const env = getAppEnv()

  if (!env.RAG_USE_PGVECTOR || !isSupabaseConfigured()) {
    return null
  }

  const embedding = await generateTextEmbedding(input.query)
  const client = getSupabaseAdminClient()
  const { data, error } = await client.rpc("match_knowledge_chunks", {
    query_embedding: embeddingToPgVector(embedding.values),
    match_threshold: env.RAG_MATCH_THRESHOLD,
    match_count: input.limit,
    filter_source_id: input.sourceId,
    filter_tenant_id: env.APP_TENANT_ID,
    filter_workspace_id: env.APP_WORKSPACE_ID,
  })

  if (error || !Array.isArray(data) || data.length === 0) {
    return null
  }

  const grouped = new Map<
    string,
    {
      documentId: string
      sourceId: string
      title: string
      mimeType: string
      metadata: Record<string, unknown>
      similarities: number[]
      chunks: Array<{ chunkIndex: number; content: string; similarity: number }>
    }
  >()

  for (const row of data as SupabaseKnowledgeMatchRow[]) {
    const metadata = row.metadata ?? {}
    const current = grouped.get(row.document_id) ?? {
      documentId: row.document_id,
      sourceId: row.source_id,
      title: typeof metadata.title === "string" ? metadata.title : "Chunk match",
      mimeType: typeof metadata.mimeType === "string" ? metadata.mimeType : "text/plain",
      metadata,
      similarities: [],
      chunks: [],
    }

    current.similarities.push(row.similarity ?? 0)
    current.chunks.push({
      chunkIndex: typeof metadata.chunkIndex === "number" ? metadata.chunkIndex : current.chunks.length,
      content: row.content ?? "",
      similarity: row.similarity ?? 0,
    })
    grouped.set(row.document_id, current)
  }

  const items = Array.from(grouped.values())
    .map<KnowledgeDocumentRecord>((entry) => {
      const orderedChunks = [...entry.chunks].sort((a, b) => a.chunkIndex - b.chunkIndex)
      const rankedChunks = [...entry.chunks].sort((a, b) => b.similarity - a.similarity)
      const topSimilarity = Math.max(...entry.similarities)
      return {
        id: entry.documentId,
        sourceId: entry.sourceId,
        title: entry.title,
        body: orderedChunks.map((chunk) => chunk.content).join("\n\n"),
        mimeType: entry.mimeType,
        metadata: {
          ...entry.metadata,
          similarity: topSimilarity,
          matchedChunkCount: entry.chunks.length,
          matchedChunks: rankedChunks.map((chunk) => ({
            chunkIndex: chunk.chunkIndex,
            similarity: chunk.similarity,
            excerpt: chunk.content,
          })),
          embeddingProvider: embedding.provider,
          embeddingModel: embedding.model,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    })
    .sort((a, b) => Number(b.metadata?.similarity ?? 0) - Number(a.metadata?.similarity ?? 0))
    .slice(0, input.limit)

  const log = await persistRetrievalLog(input, items, "supabase_vector")
  return { items, logs: [log] }
}

export async function listKnowledgeSources(): Promise<KnowledgeSourceRecord[]> {
  if (!hasDatabaseUrl()) return knowledgeStore.listKnowledgeSources()
  const env = getAppEnv()
  const result = await dbQuery<KnowledgeSourceRow>(
    `select id, source_type, name, status, config, last_ingested_at, created_at, updated_at
     from knowledge_sources
     where tenant_id = $1 and workspace_id = $2
     order by created_at desc, id desc`,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID]
  )
  return result.rows.map(mapSourceRow)
}

export async function createKnowledgeSource(input: CreateKnowledgeSourceInput): Promise<KnowledgeSourceRecord> {
  if (!hasDatabaseUrl()) return knowledgeStore.createKnowledgeSource(input)
  const env = getAppEnv()
  const id = createId("ks")
  const result = await dbQuery<KnowledgeSourceRow>(
    `insert into knowledge_sources (id, tenant_id, workspace_id, source_type, name, status, config)
     values ($1,$2,$3,$4,$5,$6,$7::jsonb)
     returning id, source_type, name, status, config, last_ingested_at, created_at, updated_at`,
    [id, env.APP_TENANT_ID, env.APP_WORKSPACE_ID, input.sourceType, input.name, input.status, JSON.stringify(input.config ?? {})]
  )
  return mapSourceRow(result.rows[0])
}

export async function listKnowledgeDocuments(sourceId: string): Promise<KnowledgeDocumentRecord[]> {
  if (!hasDatabaseUrl()) return knowledgeStore.listKnowledgeDocuments(sourceId)
  const env = getAppEnv()
  const result = await dbQuery<KnowledgeDocumentRow>(
    `select id, source_id, title, content_text, mime_type, metadata, created_at, updated_at
     from knowledge_documents
     where tenant_id = $1 and workspace_id = $2 and source_id = $3
     order by created_at desc, id desc`,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, sourceId]
  )
  return result.rows.map(mapDocumentRow)
}

export async function listKnowledgeChunks(documentId: string): Promise<KnowledgeChunkRecord[]> {
  if (!hasDatabaseUrl()) return knowledgeStore.listKnowledgeChunks(documentId)
  const env = getAppEnv()
  const result = await dbQuery<KnowledgeChunkRow>(
    `select kc.id, kc.document_id, kd.source_id, kc.chunk_index, kc.content, kc.token_count, kc.embedding_status, kc.metadata, kc.created_at
     from knowledge_chunks kc
     join knowledge_documents kd on kd.id = kc.document_id
     where kc.tenant_id = $1 and kc.workspace_id = $2 and kc.document_id = $3
     order by kc.chunk_index asc`,
    [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, documentId]
  )
  return result.rows.map(mapChunkRow)
}

export async function createKnowledgeDocument(input: CreateKnowledgeDocumentInput): Promise<KnowledgeDocumentRecord> {
  if (!hasDatabaseUrl()) return knowledgeStore.createKnowledgeDocument(input)

  const env = getAppEnv()
  const documentId = createId("kd")
  const checksum = buildChecksum(input)
  const documentInsert = await dbQuery<KnowledgeDocumentRow>(
    `insert into knowledge_documents (
      id, tenant_id, workspace_id, source_id, title, mime_type, checksum, status, metadata, content_text, published_at
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,now())
     returning id, source_id, title, content_text, mime_type, metadata, created_at, updated_at`,
    [
      documentId,
      env.APP_TENANT_ID,
      env.APP_WORKSPACE_ID,
      input.sourceId,
      input.title,
      input.mimeType,
      checksum,
      "indexed",
      JSON.stringify(input.metadata ?? {}),
      input.body,
    ]
  )

  const document = mapDocumentRow(documentInsert.rows[0])
  const chunks = splitIntoChunks(input.body)

  for (const [chunkIndex, content] of chunks.entries()) {
    const chunkId = createId("kc")
    const tokenEstimate = Math.max(1, Math.ceil(content.length / 4))
    const embedding = await generateTextEmbedding(content)
    const chunkMetadata = {
      ...(input.metadata ?? {}),
      title: input.title,
      mimeType: input.mimeType,
      chunkIndex,
      embeddingProvider: embedding.provider,
      embeddingModel: embedding.model,
    }

    await dbQuery(
      `insert into knowledge_chunks (
        id, tenant_id, workspace_id, document_id, chunk_index, content, token_count, metadata, embedding_status
       ) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9)`,
      [
        chunkId,
        env.APP_TENANT_ID,
        env.APP_WORKSPACE_ID,
        document.id,
        chunkIndex,
        content,
        tokenEstimate,
        JSON.stringify(chunkMetadata),
        embedding.provider === "gateway" ? "completed" : "fallback",
      ]
    )

    await dbQuery(
      `insert into knowledge_embeddings (
        id, tenant_id, workspace_id, chunk_id, provider, model, embedding, dimensions
       ) values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8)`,
      [
        createId("ke"),
        env.APP_TENANT_ID,
        env.APP_WORKSPACE_ID,
        chunkId,
        embedding.provider,
        embedding.model,
        JSON.stringify(embedding.values),
        embedding.dimensions,
      ]
    )

    await dbQuery(
      `insert into knowledge_chunk_embeddings (
        id, tenant_id, workspace_id, source_id, document_id, chunk_id, content, metadata, embedding
       ) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::vector)`,
      [
        createId("kce"),
        env.APP_TENANT_ID,
        env.APP_WORKSPACE_ID,
        input.sourceId,
        document.id,
        chunkId,
        content,
        JSON.stringify(chunkMetadata),
        embeddingToPgVector(embedding.values),
      ]
    )
  }

  return document
}

export async function listKnowledgeRetrievalLogs(sourceId?: string): Promise<KnowledgeRetrievalLogRecord[]> {
  if (!hasDatabaseUrl() && !isSupabaseConfigured()) {
    return knowledgeStore.listRetrievalLogs(sourceId)
  }

  const env = getAppEnv()

  if (hasDatabaseUrl()) {
    const result = await dbQuery<RetrievalLogRow>(
      `select id, source_context_id, query_text, results, created_at
       from retrieval_logs
       where tenant_id = $1 and workspace_id = $2
         and ($3::text is null or source_context_id = $3)
       order by created_at desc
       limit 100`,
      [env.APP_TENANT_ID, env.APP_WORKSPACE_ID, sourceId ?? null]
    )

    return result.rows.map((row) => ({
      id: row.id,
      sourceId: row.source_context_id ?? "unknown",
      query: row.query_text,
      limit: Array.isArray(row.results) ? row.results.length : 0,
      matchedDocumentIds: Array.isArray(row.results)
        ? row.results.map((item) => item.documentId).filter((value): value is string => Boolean(value))
        : [],
      createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    }))
  }

  const client = getSupabaseAdminClient()
  const query = client
    .from("retrieval_logs")
    .select("id, source_context_id, query_text, results, created_at")
    .eq("tenant_id", env.APP_TENANT_ID)
    .eq("workspace_id", env.APP_WORKSPACE_ID)
    .order("created_at", { ascending: false })
    .limit(100)

  if (sourceId) query.eq("source_context_id", sourceId)

  const { data } = await query
  const rows = Array.isArray(data) ? data : []

  return rows.map((row) => ({
    id: String(row.id),
    sourceId: typeof row.source_context_id === "string" ? row.source_context_id : "unknown",
    query: typeof row.query_text === "string" ? row.query_text : "",
    limit: Array.isArray(row.results) ? row.results.length : 0,
    matchedDocumentIds: Array.isArray(row.results)
      ? row.results.map((item: { documentId?: string }) => item.documentId).filter((value): value is string => Boolean(value))
      : [],
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
  }))
}

export async function runKnowledgeRetrieval(
  input: KnowledgeRetrievalQueryInput
): Promise<{ items: KnowledgeDocumentRecord[]; logs: KnowledgeRetrievalLogRecord[] }> {
  const supabaseResult = await runSupabaseVectorRetrieval(input)
  if (supabaseResult) {
    return supabaseResult
  }

  const items = (await listKnowledgeDocuments(input.sourceId))
    .filter((document) => {
      const haystack = `${document.title} ${document.body}`.toLowerCase()
      const terms = input.query.toLowerCase().split(/\s+/).filter(Boolean)
      return terms.some((term) => haystack.includes(term))
    })
    .slice(0, input.limit)

  const mode = hasDatabaseUrl() ? "text_fallback" : "local_fallback"
  const log = await persistRetrievalLog(input, items, mode)
  return { items, logs: [log] }
}

export async function runKnowledgeIngest(input: CreateKnowledgeSourceInput): Promise<KnowledgeSourceRecord> {
  const now = new Date().toISOString()
  return {
    id: `ingest_${Date.now()}`,
    sourceType: input.sourceType,
    name: input.name,
    status: "indexed",
    config: input.config ?? {},
    lastIngestedAt: now,
    createdAt: now,
    updatedAt: now,
  }
}

export function resetKnowledgeStore() {
  knowledgeStore.reset()
}
