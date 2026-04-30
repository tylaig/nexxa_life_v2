# Auditoria Exaustiva MVP — Cobertura Total de Rotas e Fluxos

Status inicial desta rodada: inventário gerado automaticamente a partir das rotas `page.tsx` do App Router e corrigido para espelhar fielmente os namespaces atuais.

## Legenda de status

- `PENDING` — ainda não auditado exaustivamente
- `IN_PROGRESS` — auditoria aberta
- `DONE` — auditado com evidência suficiente
- `N/A` — fora do escopo desta rodada

## Cobertura por rota

### ai-studio

- [ ] `/ai-studio`  
  - file: `app/(app)/ai-studio/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/ai-studio/agents`  
  - file: `app/(app)/ai-studio/agents/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/ai-studio/agents/[agentId]`  
  - file: `app/(app)/ai-studio/agents/[agentId]/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/ai-studio/agents/[agentId]/edit`  
  - file: `app/(app)/ai-studio/agents/[agentId]/edit/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/ai-studio/agents/new`  
  - file: `app/(app)/ai-studio/agents/new/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/ai-studio/skills`  
  - file: `app/(app)/ai-studio/skills/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### analytics

- [ ] `/analytics`  
  - file: `app/(app)/analytics/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### apps

- [ ] `/apps`  
  - file: `app/(app)/apps/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/apps/[integrationId]`  
  - file: `app/(app)/apps/[integrationId]/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado via `/apps/shopify`; tela abre, mas permanece degradada com status `unknown`, campos observáveis vazios e sem hidratação confiável do registro.

- [x] `/apps/[integrationId]/edit`  
  - file: `app/(app)/apps/[integrationId]/edit/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado via `/apps/shopify/edit` e slug inválido; ambos carregam a mesma tela mock/prefill de Shopify, indicando falha de validação de entidade por rota.

- [x] `/apps/[integrationId]/mapping`  
  - file: `app/(app)/apps/[integrationId]/mapping/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado via `/apps/shopify/mapping`; tabela de mapping existe, mas entidade continua `Carregando` e o detalhe da integração não resolve por completo.

- [ ] `/apps/catalog`  
  - file: `app/(app)/apps/catalog/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/apps/new`  
  - file: `app/(app)/apps/new/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: tela de criação acessível e coerente, porém explicitamente frontend-first/mock; persistência real, health check e segredos ainda ficam para rodadas futuras.

- [ ] `/apps/providers`  
  - file: `app/(app)/apps/providers/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### audience

- [ ] `/audience`  
  - file: `app/(app)/audience/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### automations

- [ ] `/automations`  
  - file: `app/(app)/automations/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/automations/[automationId]`  
  - file: `app/(app)/automations/[automationId]/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/automations/[automationId]/edit`  
  - file: `app/(app)/automations/[automationId]/edit/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado com amostra real `auto_001`; builder é rico e coerente, mas persistência e ações principais seguem mock/desabilitadas.

- [ ] `/automations/new`  
  - file: `app/(app)/automations/new/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### campaigns

- [ ] `/campaigns`  
  - file: `app/(app)/campaigns/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/campaigns/[campaignId]`  
  - file: `app/(app)/campaigns/[campaignId]/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: sem campanhas clicáveis na lista; teste direto em `cmp_001` cai em estado `Não encontrada`, então a rota existe mas está bloqueada por ausência de dado real.

- [x] `/campaigns/[campaignId]/edit`  
  - file: `app/(app)/campaigns/[campaignId]/edit/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: rota abre editor scaffold, mas com fallback/defaults, banner `Failed to load campaign`, preview `Sem nome` e ações de salvar/publicar desabilitadas; classificar como BROKEN.

- [ ] `/campaigns/new`  
  - file: `app/(app)/campaigns/new/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### contacts

- [ ] `/contacts`  
  - file: `app/(app)/contacts/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### dashboard

- [ ] `/dashboard`  
  - file: `app/(app)/dashboard/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### inbox

- [ ] `/inbox`  
  - file: `app/(app)/inbox/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### knowledge

- [ ] `/knowledge`  
  - file: `app/(app)/knowledge/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/knowledge/documents/[documentId]`  
  - file: `app/(app)/knowledge/documents/[documentId]/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: sem documentos indexados no catálogo; nenhum link/href de detalhe foi exposto na UI nem no DOM auditado, então a cobertura fica marcada como FALTANTE por ausência de dados clicáveis.

- [ ] `/knowledge/import/crawler`  
  - file: `app/(app)/knowledge/import/crawler/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/knowledge/logs`  
  - file: `app/(app)/knowledge/logs/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: página acessível; estado vazio forte com logs=0 e sources=0. Links para retrieval funcionam, mas `Atualizar` e `Aplicar filtro` ficaram como NO-OP nesse estado.

- [ ] `/knowledge/manual`  
  - file: `app/(app)/knowledge/manual/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/knowledge/new`  
  - file: `app/(app)/knowledge/new/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/knowledge/retrieval`  
  - file: `app/(app)/knowledge/retrieval/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: console de retrieval abre corretamente, mas está bloqueado por catálogo vazio; `Executar retrieval` desabilitado e `Atualizar` sem efeito observável.

- [ ] `/knowledge/sources`  
  - file: `app/(app)/knowledge/sources/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/knowledge/sources/[sourceId]`  
  - file: `app/(app)/knowledge/sources/[sourceId]/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: catálogo de sources está zerado; nenhum item clicável ou href de detalhe foi exposto, então a rota fica coberta como FALTANTE/BLOCKED por ausência de dado real.

### login

- [ ] `/login`  
  - file: `app/login/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### logs

- [ ] `/logs`  
  - file: `app/(app)/logs/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### orders

- [ ] `/orders`  
  - file: `app/(app)/orders/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### products

- [ ] `/products`  
  - file: `app/(app)/products/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### root

- [ ] `/`  
  - file: `app/(app)/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/`  
  - file: `app/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### settings

- [ ] `/settings`  
  - file: `app/(app)/settings/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/billing`  
  - file: `app/(app)/settings/billing/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/channels`  
  - file: `app/(app)/settings/channels/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/contact-fields`  
  - file: `app/(app)/settings/contact-fields/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/settings/integrations`  
  - file: `app/(app)/settings/integrations/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado como hub administrativo raso; links funcionam, porém apenas redistribuem para superfícies genéricas de `/apps`, `/apps/providers` e ativações/webhooks.

- [ ] `/settings/profile`  
  - file: `app/(app)/settings/profile/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/settings/providers`  
  - file: `app/(app)/settings/providers/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: catálogo técnico acessível e informativo, mas CTAs repetem destinos genéricos (`/apps/providers`, `/apps/webhooks`, `/apps/new`) sem drilldown específico por provider.

- [ ] `/settings/security`  
  - file: `app/(app)/settings/security/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/users`  
  - file: `app/(app)/settings/users/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/webhooks`  
  - file: `app/(app)/settings/webhooks/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/settings/workspace`  
  - file: `app/(app)/settings/workspace/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### skills

- [ ] `/skills`  
  - file: `app/(app)/skills/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### storage

- [ ] `/storage`  
  - file: `app/(app)/storage/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

### templates

- [ ] `/templates`  
  - file: `app/(app)/templates/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [ ] `/templates/[templateId]`  
  - file: `app/(app)/templates/[templateId]/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

- [x] `/templates/[templateId]/edit`  
  - file: `app/(app)/templates/[templateId]/edit/page.tsx`  
  - status: `DONE`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações: auditado com amostra real `tpl_001`; editor carrega populado, mas ações de salvar/sugerir variante estão desabilitadas. O CTA `Editar` no modal anterior ficou NO-OP apesar de href válido.

- [ ] `/templates/new`  
  - file: `app/(app)/templates/new/page.tsx`  
  - status: `PENDING`  
  - page load  
  - principal CTAs  
  - navegação interna  
  - estados críticos  
  - observações:

## Matriz de classificação obrigatória por ação

- `FUNCTIONAL`
- `MOCK_WITH_FEEDBACK`
- `NO_OP`
- `BROKEN`
- `BLOCKED_BY_PREREQUISITE`
- `MISSING_ACTION`

## Estados obrigatórios por página

- loading
- empty
- error
- degraded
- success feedback
- dirty state (quando houver edição)