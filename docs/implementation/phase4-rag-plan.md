# Fase 4 — Knowledge/RAG Estrutural

## Objetivo

Evoluir o módulo de Knowledge de source registry para a primeira espinha dorsal real de RAG, começando por `sources -> documents -> retrieval_logs`, mantendo TDD, persistência inicial e UI utilizável.

## Ordem de execução

1. Bloco A — documents reais por source
2. Bloco B — retrieval console e retrieval logs
3. Bloco C — preparar extensão para chunks persistidos na próxima rodada

## Escopo desta rodada

- contracts para knowledge documents e retrieval queries
- store/repository para create/list documents
- endpoint para listar/criar documents por source
- endpoint para executar retrieval simplificado e persistir retrieval logs
- UI básica para visualizar documents e executar consulta simulada por source
- progresso salvo em documentação

## Fora desta rodada

- embeddings reais
- chunking semântico completo
- ranking vetorial
- conectores externos de ingestão
- console avançado de debugging RAG
