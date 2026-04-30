# Knowledge

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Knowledge`.

## Rotas atuais
- /knowledge
- /knowledge/new
- /knowledge/sources
- /knowledge/sources/[sourceId]
- /knowledge/documents/[documentId]
- /knowledge/retrieval
- /knowledge/logs

## Rotas alvo
- /ai-studio/knowledge
- /ai-studio/knowledge/new
- /ai-studio/knowledge/sources
- /ai-studio/knowledge/sources/[sourceId]
- /ai-studio/knowledge/documents/[documentId]
- /ai-studio/knowledge/retrieval
- /ai-studio/knowledge/logs
- /ai-studio/knowledge/pipeline

## O que já está forte
- Fluxos de ingestão manual e crawler já existem.
- Sources catalog e retrieval já têm base útil.

## Gaps validados nesta rodada
- Hub ainda conceitual demais.
- Relação com agentes não está materializada na navegação.
- Retrieval sem sources deixa a UX pouco orientada.

## Blocos e superfícies que faltam
- Pipeline health.
- Chunk inspector.
- Batch ingest history.
- Vínculos source <-> agent.

## Estrutura de refatoração sugerida
- Homogeneizar com o shell do AI Studio.
- Reduzir banners editoriais desnecessários.
- Criar `KnowledgePipelineHealth`, `SourceToAgentBindings`, `ChunkInspectorDrawer`.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
