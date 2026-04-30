# Fase 4.2 — Supabase Vector Foundation

## Objetivo

Adicionar a fundação real para Supabase + vector store ao módulo de Knowledge/RAG, preservando fallback local e sem quebrar o fluxo atual.

## Escopo desta rodada

1. expandir env/config para Supabase e pgvector
2. adicionar client server-only do Supabase
3. adicionar artifacts locais com Docker para Postgres+pgvector
4. criar migration/schema de knowledge vector store
5. evoluir retrieval para suportar caminho opcional Supabase/vector/text fallback
6. manter fallback local atual quando Supabase não estiver configurado

## Ordem de execução

- RED: testes de configuração e retrieval path opcional
- GREEN: env + client + migration + docker artifacts
- GREEN: retrieval opcional com fallback
- VALIDATE: test + build
- PERSIST: progresso e gaps seguintes

## Critérios de pronto

- existe client server-only para Supabase
- existe `.env.example` com chaves relevantes
- existe `docker-compose.yml` para pgvector local
- existe migration SQL para vector store
- retrieval não quebra sem Supabase
- retrieval consegue escolher caminho Supabase quando configurado
