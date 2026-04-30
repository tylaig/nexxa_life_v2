create extension if not exists vector;

create table if not exists knowledge_chunk_embeddings (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  source_id text not null,
  document_id text not null,
  chunk_id text not null,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create index if not exists idx_knowledge_chunk_embeddings_lookup
  on knowledge_chunk_embeddings (tenant_id, workspace_id, source_id, document_id, chunk_id);

create index if not exists idx_knowledge_chunk_embeddings_embedding
  on knowledge_chunk_embeddings using hnsw (embedding vector_cosine_ops);

create or replace function match_knowledge_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  filter_source_id text default null,
  filter_tenant_id text default null,
  filter_workspace_id text default null
)
returns table (
  chunk_id text,
  document_id text,
  source_id text,
  content text,
  metadata jsonb,
  similarity float
)
language sql
as $$
  select
    knowledge_chunk_embeddings.chunk_id,
    knowledge_chunk_embeddings.document_id,
    knowledge_chunk_embeddings.source_id,
    knowledge_chunk_embeddings.content,
    knowledge_chunk_embeddings.metadata,
    1 - (knowledge_chunk_embeddings.embedding <=> query_embedding) as similarity
  from knowledge_chunk_embeddings
  where knowledge_chunk_embeddings.embedding is not null
    and (filter_source_id is null or knowledge_chunk_embeddings.source_id = filter_source_id)
    and (filter_tenant_id is null or knowledge_chunk_embeddings.tenant_id = filter_tenant_id)
    and (filter_workspace_id is null or knowledge_chunk_embeddings.workspace_id = filter_workspace_id)
    and 1 - (knowledge_chunk_embeddings.embedding <=> query_embedding) >= match_threshold
  order by knowledge_chunk_embeddings.embedding <=> query_embedding
  limit match_count;
$$;
