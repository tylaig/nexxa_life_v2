# P5 — Padronização transversal de estados em Knowledge + primitives reutilizáveis

## Escopo desta rodada
- criar primitive compartilhada `BlockedStateCard`
- evoluir as primitives `EmptyStateCard`, `LoadingStateCard` e `ErrorStateCard`
- aplicar o novo contrato nos fluxos principais de Knowledge:
  - `/knowledge/retrieval`
  - `/knowledge/logs`
- registrar validação técnica completa da rodada

## Objetivo
Fechar o próximo bloco do P0.5 de estados transversais, reduzindo variação entre telas e removendo estados vazios/de bloqueio pouco explícitos nas superfícies de Knowledge mais críticas para operação observável.

## Implementação concluída

### Nova primitive compartilhada
Arquivo criado:
- `components/ui/blocked-state-card.tsx`

Função:
- formalizar estados `BLOCKED` com visual próprio
- exibir pré-requisito explícito
- permitir CTA contextual para o próximo passo
- evitar botões visualmente ativos sem consequência operacional honesta

### Primitives evoluídas
Arquivos alterados:
- `components/ui/empty-state-card.tsx`
- `components/ui/loading-state-card.tsx`
- `components/ui/error-state-card.tsx`

Evoluções entregues:
- `EmptyStateCard`
  - suporte a `eyebrow`
  - melhora de hierarquia para estados iniciais/vazios
- `LoadingStateCard`
  - suporte a `title` e `description`
  - loading deixa de ser apenas skeleton genérico e passa a comunicar contexto operacional
- `ErrorStateCard`
  - suporte a `tone: default | degraded | critical`
  - diferenciação visual entre falha crítica e degradação operacional

### Knowledge retrieval padronizado
Arquivo alterado:
- `components/knowledge/knowledge-retrieval-view.tsx`

Melhorias:
- loading inicial agora usa `LoadingStateCard` com mensagem contextual de sincronização de sources
- ausência de sources passou a renderizar `BlockedStateCard` com pré-requisito explícito
- estado inicial sem consulta passou a usar `EmptyStateCard` com `eyebrow`
- estado de execução de retrieval agora mostra loading contextual no painel de resultados
- erro passou a usar `ErrorStateCard` com `tone="critical"`
- console deixa de parecer apenas vazio e passa a comunicar claramente quando está pronto, bloqueado ou executando

### Knowledge logs padronizado
Arquivo alterado:
- `components/knowledge/knowledge-logs-view.tsx`

Melhorias:
- loading inicial agora usa `LoadingStateCard` com mensagem contextual
- falhas de leitura passaram a usar `ErrorStateCard` com `tone="degraded"`
- ausência de logs com sources disponíveis usa `EmptyStateCard` com próximo passo explícito
- ausência total de sources usa `BlockedStateCard` com CTA para o hub de Knowledge
- diferenciação entre `sem dados ainda` e `bloqueado por pré-condição` fica explícita

## Testes adicionados
Arquivo criado:
- `tests/ui-state-cards.test.ts`

Cobertura:
- renderização do novo `BlockedStateCard`
- renderização do `eyebrow` em `EmptyStateCard`
- renderização contextual de `LoadingStateCard`
- renderização parametrizada de `ErrorStateCard`

## Validação executada

### RED/GREEN do slice
- `pnpm exec vitest run tests/ui-state-cards.test.ts`
- resultado final: `1 file / 2 tests passed`

### Suite direcionada
- `pnpm test -- tests/ui-state-cards.test.ts tests/knowledge-documents-api.test.ts tests/knowledge-chunks-api.test.ts tests/knowledge-repository.test.ts tests/knowledge-chunks-repository.test.ts`
- resultado: `30 files / 62 tests passed`

### Build
- `pnpm run build`
- resultado: `exit 0`
- geração final confirmada: `58/58` páginas

## Efeito no backlog
- P0.5 deixa de ser apenas diretriz abstrata e ganha primitives reais reutilizáveis
- Knowledge retrieval/logs passam a seguir um contrato mais honesto para `loading`, `empty`, `blocked` e `error`
- backlog residual de estados transversais fica menor e mais concentrado em expansão para outras superfícies, não mais na ausência das primitives base

## Gaps remanescentes após esta rodada
1. expandir o novo contrato de estados para outras superfícies principais além de Knowledge
2. investigar e corrigir a aba `Histórico` do Inbox contextual
3. revalidar no browser os estados recém-padronizados para atualizar a auditoria exaustiva com evidência navegável

## Próximo foco natural
1. browser QA em `/knowledge/retrieval` e `/knowledge/logs` para promover a nova classificação
2. correção/investigação da aba `Histórico` do Inbox contextual
3. continuação da propagação das primitives para outras páginas críticas do Phase 5
