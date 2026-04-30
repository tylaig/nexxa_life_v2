# Fase 5.2 — Frontend-first Refactor Blueprint

Este diretório consolida a auditoria navegável, o inventário de rotas, os gaps transversais e o plano por página para uma rodada grande de refatoração UI/UX com execução incremental, QA formal e preservação de consistência arquitetural.

## Objetivo

Transformar o produto em uma suíte operacional sólida, profissional e homogênea, com:
- IA de navegação consistente
- tabs persistentes nas áreas principais
- CTAs com comportamento explícito
- superfícies list/detail/new/edit bem separadas
- estados reais de loading/empty/error/degraded
- feedback visual confiável
- código mais limpo, performático e sem resíduos editoriais de construção por IA

## Pilares definidos nesta rodada

1. AI Studio vira shell principal da suíte de IA com tabs persistentes.
2. Agentes deixam de ser cards superficiais e passam a usar blocos horizontais ricos.
3. Knowledge deixa de parecer hub conceitual e vira operação observável homogênea.
4. CTAs mock/no-op passam a ter status explícito: real, mock com feedback ou disabled com motivo.
5. Toda página principal precisa respeitar o mesmo contrato estrutural:
   - topbar
   - breadcrumbs
   - tabs quando houver suíte
   - KPIs
   - barra de filtros/ações
   - lista ou grid operacional
   - detalhe ou drilldown
   - feedback de ação
6. A fase continua frontend-first, mas preparando contratos, estados e rotas para backend real.

## Estrutura

- `00-GLOBAL-STANDARDS.md` — padrões globais de UX/UI, IA, feedback e navegação
- `01-ROUTE-INVENTORY.md` — mapa atual vs mapa-alvo de rotas e páginas faltantes
- `02-GLOBAL-GAP-MATRIX.md` — matriz consolidada de gaps e prioridades
- `03-CTA-ACTION-MATRIX.md` — classificação dos CTAs auditados no browser
- `04-CODE-HYGIENE-AND-PERFORMANCE.md` — limpeza de comentários, mocks, performance e arquitetura
- `05-QA-VALIDATION-LOOP.md` — loop obrigatório de QA, prints e validação antes/depois
- `08-PAGE-STATE-MATRIX.md` — matriz consolidada dos estados validados por página auditada
- `09-MVP-QA-BACKLOG-PRIORITIZED.md` — backlog final priorizado para fechar MVP/QA 100%
- `10-P0-EXECUTION-PLAN.md` — plano incremental da rodada corretiva P0
- `11-P0-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada P0 em execução
- `12-P1-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada seguinte de eliminação de NO-OPs centrais
- `13-P2-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada seguinte em Settings, Knowledge profundo e Automations detail
- `14-P3-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada de reclassificação de residuais em Dashboard/Inbox e feedback explícito em Templates edit
- `15-P4-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada de fechamento de superfícies secundárias de Settings e revalidação contextual do Inbox
- `16-P5-EXECUTION-PROGRESS.md` — progresso, evidências e validação da rodada de padronização transversal de estados em Knowledge e primitives reutilizáveis
- `99-EXECUTION-MASTER-CHECKLIST.md` — checklist mestre de execução incremental
- `pages/` — plano e backlog por página/módulo

## Ordem recomendada de execução

1. Shell global + primitives transversais
2. AI Studio shell com tabs persistentes
3. Agentes em bloco horizontal rico + detalhe + editor
4. Knowledge unificado ao shell de IA
5. Integrations / Providers / Webhooks
6. Campaigns / Automations / Templates
7. Settings e superfícies administrativas
8. Dashboard, Audience, Products, Storage, Logs
9. Polimento final, acessibilidade, performance e code hygiene

## Loop operacional da fase

A execução desta fase deve seguir um loop fechado e repetível:
1. estudar o domínio e os arquivos reais da próxima frente
2. navegar e auditar as rotas/CTAs/estados envolvidos
3. atualizar checklist, status e backlog com evidências
4. executar a implementação incremental correspondente
5. validar no browser, registrar prints e revisar gaps remanescentes
6. preparar a próxima frente já com contexto consolidado

Última macro-rodada concluída:
- P5 fechou a primeira aplicação real do contrato transversal de estados com `BlockedStateCard` novo e evolução de `EmptyStateCard`, `LoadingStateCard` e `ErrorStateCard`, já aplicado em Knowledge retrieval/logs.

Esse loop só deve ser interrompido para um único gatilho externo do usuário: `ok`.

## Gatilho para execução

Quando o usuário responder apenas `ok`, a próxima rodada pode iniciar ou continuar a execução grande seguindo:
- `99-EXECUTION-MASTER-CHECKLIST.md`
- os arquivos em `pages/`
- o loop de QA e prints de `05-QA-VALIDATION-LOOP.md`
- o status vivo em `07-EXHAUSTIVE-AUDIT-STATUS.md`
