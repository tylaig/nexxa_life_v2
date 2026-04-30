# P3 — Revalidação de CTAs residuais e fechamento adicional de affordances mock

## Escopo desta rodada
- Dashboard `/dashboard`
- Inbox `/inbox`
- Templates `/templates/[templateId]/edit`
- revalidação de build, testes e disponibilidade local do app

## Objetivo
Separar falsos positivos do backlog residual de CTAs realmente quebrados e converter affordances ainda desabilitadas em feedback explícito quando a persistência real ainda não existe.

## Diagnóstico confirmado antes da implementação

### Dashboard
Os links do bloco `Insights da IA` não eram mais NO-OP no código atual.
Eles já estavam ligados a `href` reais:
- `Abrir campaigns` -> `/campaigns`
- `Abrir orders` -> `/orders`
- `Abrir automations` -> `/automations`

Validação real desta rodada:
- clique real em `Abrir campaigns` navegou para `/campaigns`
- inspeção do componente confirmou `href` reais também para `orders` e `automations`

Arquivo inspecionado:
- `components/home/home-overview-view.tsx`

### Inbox secundário
A rodada confirmou que parte das pendências antigas não eram mais NO-OP reais:
- `W Game Box` e `Vendas` filtram a lista operacional
- a lista passou para `1 de 12` com resumo ativo `Caixa game-box` e `Time vendas`
- `Visualizações salvas` continua mock explícito com toast, não silencioso

Arquivos inspecionados:
- `components/inbox/filter-rail.tsx`
- `components/inbox/inbox-app.tsx`
- `components/inbox/inbox-list-toolbar.tsx`
- `components/inbox/context-panel.tsx`
- `components/inbox/inbox-thread-toolbar.tsx`

## Implementação concluída

### Templates edit
Arquivo alterado:
- `components/templates/template-studio-view.tsx`

CTAs que deixaram de ficar desabilitados/silenciosos e passaram a responder com feedback explícito:
- `Sugerir variante`
- `Salvar alterações` / `Criar template`

Padrão adotado:
- manter o editor frontend-first honesto
- não fingir persistência real
- registrar claramente via toast que persistência editorial/publicação entram na próxima rodada

## Validação executada

### Testes
- `pnpm test -- tests/foundations-api.test.ts tests/campaigns-api.test.ts tests/campaigns-repository.test.ts tests/integrations-api.test.ts tests/integrations-repository.test.ts tests/campaigns-client.test.ts tests/integrations-client.test.ts`
- resultado: `exit 0`
- suíte reportada: `29 files / 60 tests passed`

### Build
- primeira tentativa de `pnpm build` falhou com:
  - `Another next build process is already running`
- investigação executada:
  - checagem de processos e artefatos temporários
  - constatação de que o app local havia caído e precisaria ser religado para continuidade da auditoria no browser
- resolução aplicada:
  - subir `pnpm dev` para restaurar o app local e concluir a validação browser
  - depois encerrar o processo de dev e rerodar `pnpm build`
- resultado final:
  - `pnpm build` -> `exit 0`
  - build gerou `58/58` páginas estáticas sem erro

### Browser
- `/dashboard`
  - clique real em `Abrir campaigns` levou para `/campaigns`
  - DOM/código confirmaram `href` reais para `Abrir orders` e `Abrir automations`
- `/inbox`
  - `Visualizações salvas` -> toast `Views salvas ainda não estão disponíveis nesta etapa`
  - `W Game Box` + `Vendas` -> lista filtrada para `1 de 12`, com resumo ativo `Caixa game-box` e `Time vendas`
- `/templates/tpl_001/edit`
  - `Sugerir variante` -> toast `Sugestão de variante registrado no frontend-first. Persistência editorial e publicação entram na próxima rodada.`
  - `Salvar alterações` -> toast `Salvar template registrado no frontend-first. Persistência editorial e publicação entram na próxima rodada.`

## Efeito no backlog
- Dashboard saiu da lista de suspeita de NO-OP para `REAL` nos links de insights
- Inbox secundário teve parte das pendências reclassificada de NO-OP para `FUNCTIONAL` ou `MOCK explícito`
- Templates edit deixou de apresentar ações principais desabilitadas sem resposta

## Pendências abertas após esta rodada
- validação mais profunda e registrada de `Histórico` e `Abrir painel` no Inbox contextual
- superfícies administrativas secundárias em Settings
- padronização transversal de `loading` / `empty` / `error` / `degraded` / `blocked`
- polish transversal: document title e consistência PT-BR/EN
