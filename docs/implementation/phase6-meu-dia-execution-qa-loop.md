# Phase 6 — Loop de execução, QA e validação browser-first do nexxa_life

## Objetivo
Estabelecer um loop operacional fechado para cada rodada de porte do `old/meu-dia-flow` para a base atual, seguindo as diretrizes dos documentos legados e o runbook de QA do app raiz.

## Fontes usadas nesta rodada
- `old/meu-dia-flow/docs/03_scope_and_prioritization.md`
- `old/meu-dia-flow/docs/07_qa_and_testing.md`
- `old/meu-dia-flow/docs/18_implementation_status_and_plan.md`
- `old/meu-dia-flow/docs/NEXXA_LIFE_IMPLEMENTATION_BLUEPRINT.md`
- `docs/implementation/phase5-frontend-first-refactor/05-QA-VALIDATION-LOOP.md`
- `docs/implementation/phase6-meu-dia-flow-root-adaptation-master-plan.md`

## Princípios aplicados
1. implementar em blocos fechados por domínio
2. validar com testes antes de avançar
3. fazer QA browser-first nas superfícies alteradas
4. registrar status funcional: `REAL`, `MOCK`, `BLOCKED`, `MISSING`
5. não promover para concluído sem evidência mínima

## Loop obrigatório por rodada
1. estudar a superfície alvo no legado, docs e base atual
2. mapear tabs, gráficos, CTAs, estados e dependências
3. implementar incrementalmente no shell atual
4. rodar testes automatizados do slice e suíte relacionada
5. rodar build/lint relevante
6. validar no navegador a rota alterada
7. registrar resultado e pendências

## Rodada atual — tabs e gráficos
### Escopo
- `/reports`
- `/agenda`
- preparação de padrão para `/dashboard`

### O que foi feito
- `components/meu-dia/meu-dia-reports-view.tsx`
  - trocado modo estático por painel real com tabs funcionais
- `components/meu-dia/reports-chart-panel.tsx`
  - criado painel com `Tabs` + `Recharts` via wrapper oficial `components/ui/chart.tsx`
- `components/meu-dia/reports-content.ts`
  - adicionados datasets e `reportsChartConfig`
- `components/meu-dia/meu-dia-agenda-view.tsx`
  - badges de visão substituídos por tabs reais
- `components/meu-dia/agenda-view-tabs.tsx`
  - criado wrapper funcional para as tabs da agenda
- `tests/meu-dia-dashboard-interactions.test.ts`
  - criado teste contratual para datasets/config do slice

## Critérios de QA desta rodada
### Reports
- [x] tabs alternam entre dois modos
- [x] gráfico de evolução 7 dias renderiza séries principais
- [x] gráfico comparativo renderiza barras por métrica
- [x] usa wrapper oficial de charts
- [x] segue diretriz do legado de dashboard/relatórios básicos com gráfico

### Agenda
- [x] tabs de visualização existem como componente funcional
- [x] `Dia` é a visão primária real
- [x] `Semana/Mês/Ano` ficam explicitamente degradadas, sem no-op silencioso
- [x] alinhado com docs do legado que apontam múltiplas visualizações como should-have/pós-MVP

## Estados atuais por superfície
### `/reports`
- charts: `MOCK` com estrutura pronta para dados reais
- tabs: `REAL`
- quick signals: `MOCK`
- insights: `MOCK`

### `/agenda`
- aba `Dia`: `REAL` no contexto do frontend portado
- abas `Semana/Mês/Ano`: `BLOCKED` com mensagem explícita
- timeline: `MOCK`

## Comandos de validação da rodada
- `pnpm test`
- `pnpm build`
- validação no navegador das rotas `/reports` e `/agenda`

## Próximos passos recomendados
1. consolidar o mesmo padrão de tabs + painel analítico em `components/meu-dia/meu-dia-dashboard-view.tsx`
2. adicionar testes de contrato para tabs de agenda e dashboard
3. se necessário, instalar Playwright para smoke browser real das rotas críticas do nexxa_life:
   - `/dashboard`
   - `/reports`
   - `/agenda`
4. evoluir datasets mock para adaptadores de domínio reais quando a camada de persistência estiver pronta

## Atualização da rodada seguinte
- `components/meu-dia/meu-dia-dashboard-view.tsx`
  - ganhou painel analítico com tabs reais para `Execução`, `Bem-estar` e `Evolução`
- `components/meu-dia/dashboard-analytics-panel.tsx`
  - criado como painel compartilhável do dashboard raiz
- `components/meu-dia/dashboard-content.ts`
  - passou a publicar `dashboardAnalyticsTabs`
- `tests/meu-dia-dashboard-analytics.test.ts`
  - criado teste contratual da taxonomia analítica do dashboard
- `docs/implementation/phase6-meu-dia-ok-loop.md`
  - criado loop operacional contínuo para seguir apenas com `ok`
- `app/login/page.tsx`
  - retematizado para nexxa_life
- `app/signup/page.tsx`
  - criado como entrada oficial de cadastro
- `app/onboarding/page.tsx`
  - criado como onboarding inicial no domínio nexxa_life
- aliases criados:
  - `app/cadastro/page.tsx` -> `/signup`
  - `app/diagnostico/page.tsx` -> `/diagnostic`
  - `app/diario/page.tsx` -> `/journal`
  - `app/relatorio/page.tsx` -> `/reports`
- `components/auth/auth-shell.tsx`
  - criado shell reutilizável para autenticação/retematização
- `tests/meu-dia-auth-routing.test.ts`
  - criado teste contratual das rotas de auth/onboarding
