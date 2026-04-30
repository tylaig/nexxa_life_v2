# P0 Execution Plan — Rodada 1

## Objetivo desta rodada
Atacar os bloqueios P0 mais objetivos e reproduzíveis observados na auditoria real do navegador para destravar a futura revalidação MVP/QA.

## Escopo imediato
1. Corrigir rotas dinâmicas de Apps para evitar hidratação fraca, breadcrumbs quebrados e estados infinitos/degradados em `/apps/[integrationId]`, `/apps/[integrationId]/edit` e `/apps/[integrationId]/mapping`.
2. Corrigir o editor de campanha em `/campaigns/[campaignId]/edit` com fallback robusto quando o fetch direto falhar, evitando tela quebrada por 404 transitório ou lookup inconsistente.
3. Normalizar `/analytics` para um destino explícito e consistente em vez de comportamento ambíguo.
4. Validar com testes + navegador e refletir o resultado nos documentos da fase.

## Estratégia
- Estudar: inspecionar rotas, clientes API e componentes ligados aos fluxos auditados como BROKEN/DEGRADED.
- Executar: corrigir primeiro os fluxos de Apps e Campaigns, porque são bloqueios P0 diretamente ligados a navegação real já auditada.
- Validar: rodar testes direcionados, abrir o app no browser e reclassificar o estado real.
- Registrar: atualizar imediatamente checklist/docs/status ao final da rodada.

## Critérios de saída da rodada
- `/apps/[integrationId]` abre sem depender de paths legados `/integrations/*`.
- `/apps/[integrationId]/edit` e `/apps/[integrationId]/mapping` exibem estados explícitos de loading/not-found em vez de degradação silenciosa.
- `/campaigns/[campaignId]/edit` carrega um registro válido sempre que o item existir na listagem/API auditada, mesmo se o endpoint de detalhe falhar.
- `/analytics` deixa de ser um redirecionamento inconsistente e passa a comunicar claramente seu papel.
- Evidência real registrada via testes e browser.
