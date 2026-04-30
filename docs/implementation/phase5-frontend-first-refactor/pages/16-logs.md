# Logs

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Logs`.

## Rotas atuais
- /logs

## Rotas alvo
- /logs
- /logs/[logId] or drawer

## O que já está forte
- Boa percepção de módulo operacional.
- Boa taxonomia inicial.

## Gaps validados nesta rodada
- Clique em evento sem detalhe funcional.
- Faltam filtros avançados e correlação.
- Sem drilldown de payload/contexto.

## Blocos e superfícies que faltam
- Drawer de detalhe.
- Filtros por severidade/período/actor/provider.
- Ações de export/correlation.

## Estrutura de refatoração sugerida
- Criar `LogDetailDrawer`, `LogFiltersBar`, `CorrelationLinksPanel`.
- Integrar com integrations, knowledge e agents.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
