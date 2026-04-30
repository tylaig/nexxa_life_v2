# Implementation Merge Plan

## Objetivo deste documento

Consolidar:
- a visão estratégica já presente em `docs/*.md`
- o estado real da base atual em `~/repo/chat.meusuper.app`
- a sequência recomendada para transformar o protótipo em uma plataforma funcional

Este documento passa a ser a ponte entre produto, UX e engenharia para a próxima fase de implementação.

---

## 1. Leitura consolidada do estado atual

### O que os documentos definem com clareza

A base documental converge para a mesma tese:
- plataforma de conversational commerce
- WhatsApp Business Platform oficial como canal inicial dominante
- operação de atendimento humano premium
- automações orientadas a eventos de e-commerce
- IA assistiva e IA autônoma apenas sob política
- RAG grounded em pedidos, políticas, catálogo e base institucional
- arquitetura multi-tenant desde a origem

### O que a implementação atual realmente entrega

A base atual entrega muito bem:
- shell visual de produto SaaS
- inbox visual de alto nível
- templates Meta em modo demo
- automations, contacts, orders, knowledge e analytics como superfícies de produto
- narrativa muito convincente para visão e UX

A base atual ainda não entrega de forma funcional:
- backend real
- persistência
- contratos canônicos de domínio
- API operacional
- ingestão de webhooks
- eventos e filas
- integrações reais Meta / Shopify
- governança operacional real

### Conclusão executiva

O repositório estava forte como demo navegável e fraco como plataforma operacional.
A decisão correta é evoluir a estrutura atual sem reescrever a UI, introduzindo backend modular por trás dela.

---

## 2. Decisão de arquitetura para a fase atual

### Recomendação

Começar por um `modular monolith` dentro do próprio app Next.js.

### Motivos

1. A UI já está madura o suficiente para virar camada real.
2. Microservices agora aumentariam risco e latência de delivery.
3. O produto ainda precisa provar profundidade operacional antes de escalar a topologia.
4. Next.js App Router permite iniciar com:
   - UI
   - BFF/API routes
   - contratos
   - módulos internos
   - depois banco e workers

### Direção estrutural recomendada

- `app/api/v1/*` para endpoints iniciais
- `modules/*` para domínio e aplicação
- `lib/*` para client-side API, mapeadores e utilitários
- `lib/mock/*` deve virar fixture/prototipação, não fonte oficial de domínio

---

## 3. Slice funcional escolhido para começar

### Slice 1 recomendado

`Inbox operacional + contexto de conversa + transições de status`

### Por que esse slice vem primeiro

É o melhor ponto de entrada porque:
- aproveita a melhor tela já pronta
- está alinhado com o wedge WhatsApp-first
- força a criação dos primeiros contratos reais
- prepara o caminho para Meta, templates e order context
- reduz a distância entre demo e operação real

### O que este slice deve cobrir

- listar conversas de forma servida pelo backend
- enviar resposta e nota interna via endpoint
- mudar status operacional da conversa
- manter o painel contextual e a thread consumindo dados do mesmo objeto de domínio
- deixar a UI pronta para trocar store in-memory por banco sem reescrever a tela

---

## 4. O que foi implementado nesta iteração

### Infra de teste

Foi adicionada base inicial de testes com Vitest:
- `vitest.config.ts`
- script `pnpm test`

### Módulos novos

- `modules/conversations/store.ts`
  - store in-memory com operações reais de:
    - listagem
    - leitura por id
    - envio de mensagem
    - transição de status
- `modules/conversations/contracts.ts`
  - validação de payloads com Zod

### API/BFF inicial

- `app/api/v1/conversations/route.ts`
- `app/api/v1/conversations/[id]/messages/route.ts`
- `app/api/v1/conversations/[id]/status/route.ts`

### Client API da inbox

- `lib/inbox/api.ts`

### UI conectada ao backend local

- `components/inbox/inbox-app.tsx`
  - deixou de depender exclusivamente de mutação local com mock
  - agora faz bootstrap via `/api/v1/conversations`
  - envia mensagens via endpoint
  - resolve/soneca via endpoint

### Testes adicionados

- `tests/conversation-store.test.ts`
- `tests/conversation-contracts.test.ts`
- `tests/inbox-api.test.ts`

### Verificações executadas

- `pnpm test` ✅
- `pnpm build` ✅

---

## 5. Diagnóstico consolidado por prioridade

### P0 — base obrigatória do MVP

1. Inbox operacional real
2. Integração WhatsApp oficial
3. Templates Meta sincronizados
4. Contatos mínimos reais
5. Contexto transacional de pedido dentro da conversa
6. Auditoria básica e trilha de ações

### P1 — logo após o core

1. Shopify como conector prioritário
2. Eventos canônicos de commerce
3. Fluxos prontos de automação:
   - carrinho abandonado
   - pagamento recusado
   - atualização de envio
4. Base de conhecimento mínima com ingestão
5. Sugestão de IA assistiva grounded

### P2 — depois do core provar valor

1. Analytics operacional e comercial mais profundo
2. Knowledge console expandido
3. AI Studio separado
4. Omnichannel adicional
5. Builder visual de automações mais genérico

---

## 6. Gaps ainda abertos

### Técnicos

- não há banco relacional ainda
- não há tenancy model explícito no código
- não há autenticação/RBAC real
- não há event log/outbox
- não há webhook ingestion real
- não há integração Meta real
- não há integração Shopify real
- não há observabilidade real
- `next.config.mjs` ainda ignora erros de TypeScript
- o script de lint existe, mas o projeto não tem ESLint configurado corretamente

### Produto/operação

- o frontend ainda comunica omnichannel cedo demais em alguns pontos
- `AI Studio` segue mais amplo do que a maturidade funcional atual
- `Analytics` ainda tem amplitude acima do estágio real do produto
- `Orders` deveria apoiar a inbox, não competir com ela no MVP

---

## 7. Próxima sequência recomendada de implementação

### Fase imediata

1. Introduzir contratos canônicos compartilhados
   - Tenant
   - Workspace
   - Contact
   - ContactIdentity
   - Conversation
   - Message
   - Order
   - Shipment
   - Template

2. Adicionar persistência real
   - banco relacional
   - repositories por domínio
   - troca gradual do store in-memory

3. Implementar `settings/integrations` como fluxo real
   - conexão WhatsApp Cloud API
   - credenciais e health status
   - sync inicial de templates

4. Implementar `templates` como módulo funcional
   - listagem real
   - status real Meta
   - preview
   - envio a partir da inbox

5. Implementar contexto de pedido real
   - pedido vinculado à conversa
   - timeline de status
   - quick actions básicas

### Depois disso

6. Event log + outbox
7. ingestão de webhook Meta
8. ingestão de webhook Shopify
9. automações P0 por catálogo configurável
10. knowledge + RAG assistivo mínimo

---

## 8. Artefatos obrigatórios a produzir em seguida

1. `docs/TENANCY_MODEL.md`
2. `docs/ERD_V1.md`
3. `docs/API_SPEC_V1.md`
4. `docs/EVENT_CATALOG_V1.md`
5. `docs/WORKFLOW_CATALOG_V1.md`
6. `docs/PERMISSION_MATRIX.md`
7. `docs/OBSERVABILITY_PLAN.md`
8. `docs/ROLLOUT_PLAN.md`
9. `docs/PRICING_PACKAGING_HYPOTHESIS.md`

---

## 9. Recomendação firme

### O que construir primeiro

1. Inbox funcional com backend real
2. Integração WhatsApp oficial
3. Templates Meta reais
4. Contexto de pedido na conversa

### O que evitar no MVP

- omnichannel amplo
- AI autônoma ampla
- builder genérico complexo de automação
- analytics excessivamente abrangente
- CRM pesado

### O que mais aumenta a chance de vencer

Resolver muito bem, antes dos concorrentes, este loop:
- cliente fala no WhatsApp oficial
- operação vê contexto real do pedido
- agente responde com velocidade e precisão
- automações cobrem exceções repetíveis
- IA assiste com grounding e governança
- a marca enxerga ROI operacional e comercial rapidamente
