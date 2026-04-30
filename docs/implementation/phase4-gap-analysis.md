# Fase 4 — Gaps Restantes

## O que passou a existir nesta rodada

- knowledge sources
- knowledge documents por source
- retrieval console básico
- retrieval logs iniciais
- endpoints dedicados para documents e retrieval
- UI real para criar document e consultar o corpus da source ativa

## Gaps restantes prioritários

1. chunking persistido por document
2. embeddings/provider adapter
3. retrieval ranking mais inteligente
4. histórico navegável de retrieval logs
5. ingestão que materializa documents automaticamente a partir de URLs/PDFs

## Próxima prioridade recomendada

Implementar `document -> chunks` com chunking textual simples e exibição de chunks por document. Isso prepara o caminho para embeddings e ranking posterior sem quebrar a UX já construída.
