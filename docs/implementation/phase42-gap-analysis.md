# Fase 4.2 — Gap Analysis

## O que ficou operacional nesta rodada

- client server-only do Supabase em `lib/server/supabase.ts`
- env/config expandido para `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SCHEMA`, `RAG_USE_PGVECTOR` e `RAG_MATCH_THRESHOLD`
- `docker-compose.yml` com pgvector local
- `.env.example` com defaults para banco local e Supabase
- migration `003_supabase_vector_store.sql` aplicada com sucesso em banco local Docker
- `supabase/schema.sql` com tabela vetorial e RPC `match_knowledge_chunks`
- retrieval opcional via RPC do Supabase com fallback local preservado

## Validação executada

- `npm test`
- `npm run build`
- `docker compose ps`
- `DATABASE_URL=postgres://postgres:postgres@localhost:54322/chat_meusuper npm run db:migrate`
- query direta confirmando:
  - extensão `vector`
  - função `match_knowledge_chunks`
  - migrations `001`, `002`, `003`

## Próximos gaps prioritários

1. gerar embeddings reais para `knowledge_chunks`
2. persistir retrieval logs em SQL/Supabase
3. retrieval rankeado por chunk com reconstrução de contexto por documento
4. tela operacional de configuração Supabase/vector dentro de Integrations
5. ingest automático URL/PDF -> document -> chunks -> embeddings

## Próxima prioridade recomendada

Implementar pipeline de embeddings reais para `knowledge_chunks` e persistir retrieval logs em Postgres/Supabase.
