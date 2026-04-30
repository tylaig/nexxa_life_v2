# Fase 4.3 — Gap Analysis

## O que ficou operacional nesta rodada

- configuração server-only de embeddings em `lib/server/env.ts`
- wrapper real/fallback de embeddings em `lib/server/embeddings.ts`
- criação de documentos no caminho SQL agora persiste:
  - `knowledge_documents`
  - `knowledge_chunks`
  - `knowledge_embeddings`
  - `knowledge_chunk_embeddings`
- retrieval logs agora são persistidos em SQL e no caminho Supabase server-only
- retrieval vetorial do Supabase agora:
  - gera embedding de query via gateway quando configurado
  - faz ranking por chunk
  - remonta contexto consolidado por documento
  - preserva fallback local/textual quando necessário

## Validação executada

- `npm test`
  - 60 testes passando
- `npm run build`
  - build OK

## Gaps prioritários seguintes

1. expor configuração/status de embeddings e vector retrieval na UI de Integrations/Knowledge
2. criar ingest automático para URL/PDF com pipeline document -> chunks -> embeddings
3. adicionar leitura/listagem operacional de `retrieval_logs` para debugging e observabilidade
4. considerar fila assíncrona para embeddings de documentos grandes
5. validar o fluxo fim a fim contra um gateway real e base Supabase real, não só com mocks/unit tests

## Próxima prioridade recomendada

Implementar a camada operacional de observabilidade e ingest automático, começando por listagem de retrieval logs e status de embeddings no módulo de Knowledge.
