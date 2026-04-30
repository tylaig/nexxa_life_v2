# Fase 4.1 — Gaps Restantes

## O que ficou operacional nesta rodada

- geração automática de chunks ao criar documents
- listagem de chunks por document via API
- visualização de chunks na UI de Knowledge
- token estimate simples por chunk

## Próximos gaps prioritários

1. retrieval logs históricos navegáveis
2. ranking por chunks em vez de documento inteiro
3. embeddings/provider adapter
4. ingest automático que cria documents a partir de URL/PDF
5. persistência SQL real para documents/chunks/logs

## Próxima prioridade recomendada

Implementar histórico navegável de retrieval logs e, em seguida, trocar o retrieval para operar sobre chunks com ranking textual simples.
