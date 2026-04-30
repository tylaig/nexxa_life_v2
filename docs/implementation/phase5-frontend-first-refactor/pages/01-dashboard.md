# Dashboard

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Dashboard`.

## Rotas atuais
- /dashboard

## Rotas alvo
- /dashboard

## O que já está forte
- Boa base executiva com KPIs, alertas e tabs temáticas.
- Sidebar e topbar integram bem a leitura macro do workspace.

## Gaps validados nesta rodada
- Vários CTAs de drilldown ficaram sem ação perceptível.
- Exportar não mostra feedback.
- Hierarquia pode ficar densa em viewport menor.

## Blocos e superfícies que faltam
- Drilldown funcional para cada insight principal.
- Feedback de export e filtros persistentes.
- Modo mobile/tablet supervision-only bem definido.

## Estrutura de refatoração sugerida
- Extrair grid de insights acionáveis.
- Padronizar card com CTA principal + CTA secundário.
- Criar `DashboardActionPanel` e `DashboardInsightCard`.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
