# Fase 3 — UI Real + Knowledge/RAG

## Objetivo

Transformar os módulos recém-operacionais em experiência utilizável no app, conectando Campaigns, Integrations e AI Skills às APIs reais, e depois iniciar o bloco de Knowledge/RAG com persistência e endpoints mínimos.

## Ordem desta rodada

1. UI real de Campaigns
   - client API
   - listagem real
   - formulário de criação draft
   - estados de loading/erro/sucesso
2. UI real de Integrations
   - listagem real
   - criação de conexão draft
   - action de health bootstrap
3. UI real de Skills
   - listagem real
   - criação de skill
   - exibir versão atual e variáveis detectadas
4. Knowledge/RAG foundation
   - contracts
   - repository/store
   - APIs para source create/list e ingest bootstrap
5. validação
   - `npm test`
   - `npm run build`
6. análise de gaps remanescentes e continuidade

## Registro de progresso
Toda entrega desta fase deve refletir imediatamente em:
- checklist da sessão
- `docs/implementation/phase3-progress.md`
