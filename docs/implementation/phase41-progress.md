# Fase 4.1 — Progress

## Status atual

Rodada atual da Fase 4.1 concluída com chunking persistido e visualização de chunks operacional.

## Marcos concluídos

- plano salvo em `docs/implementation/phase41-chunks-plan.md`
- testes RED para geração/listagem de chunks criados
- store/repository expandidos com `knowledge chunks`
- chunks materializados automaticamente no create document
- endpoint `/api/v1/knowledge/documents/[documentId]/chunks` implementado
- UI de Knowledge expandida com seleção de documento ativo e visualização de chunks
- validação concluída com `npm test` e `npm run build`

## Próximo passo em execução

1. histórico navegável de retrieval logs
2. retrieval por chunks com ranking textual simples
3. preparação para embeddings/provider adapter
