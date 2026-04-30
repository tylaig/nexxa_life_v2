# TENANCY_MODEL

## Objetivo

Definir o modelo de tenancy executável para a plataforma `chat.meusuper.app`, com foco em:
- isolamento multi-tenant desde a base
- operação WhatsApp-first para e-commerce
- suporte a múltiplos workspaces, marcas, números e equipes por tenant
- segurança, auditoria e extensibilidade para integrações e IA

---

## 1. Recomendação de modelo

### Modelo recomendado

`Single database + shared schema + row-level tenancy`

Cada registro operacional deve carregar, no mínimo:
- `tenant_id`
- `workspace_id` quando houver escopo operacional interno

### Por que este modelo é o melhor agora

1. É o caminho de menor atrito para sair do protótipo e virar produto funcional.
2. Mantém custo e complexidade iniciais menores que database-per-tenant.
3. Permite onboarding rápido e analytics cross-tenant controlado no nível interno.
4. Funciona bem para o estágio atual de `modular monolith`.
5. Pode evoluir depois para isolamento premium por banco/schema para enterprise, sem quebrar o domínio.

### O que não recomendamos agora

- database-per-tenant desde o dia 1
- schema-per-tenant desde o dia 1
- ausência de `tenant_id` por confiar só em contexto de sessão

---

## 2. Hierarquia de escopo

### Tenant

Representa a conta cliente principal da plataforma.

Exemplos:
- uma operação D2C com uma marca
- um grupo com múltiplas marcas de e-commerce
- uma operação com times distintos de suporte e vendas

Responsabilidades do tenant:
- faturamento
- plano e limites
- configurações globais
- políticas de retenção
- credenciais de integrações principais
- governança de IA
- trilha de auditoria macro

### Workspace

Representa uma unidade operacional dentro do tenant.

Pode mapear para:
- marca
- operação
- país
- BU
- loja

Responsabilidades do workspace:
- filas e inboxes
- usuários e memberships
- números/contas conectadas
- equipes
- templates disponíveis
- workflows ativos
- documentos de knowledge com escopo local

### Team

Representa uma equipe operacional dentro do workspace.

Exemplos:
- vendas
- suporte
- logística
- fraude
- retenção

### Inbox / Channel Account

Representa um canal operacional concreto dentro do workspace.

Exemplos:
- número oficial do WhatsApp de uma marca
- futura conta Instagram DM
- futuro webchat

---

## 3. Regras de isolamento

### Regra-mãe

Nenhum dado operacional pode existir sem `tenant_id`.

### Regra de escopo

Entidades operacionais de uso diário devem carregar também `workspace_id`, exceto quando forem explicitamente globais ao tenant.

### Regra de consulta

Toda query de leitura e escrita deve ser filtrada por `tenant_id`, e quando aplicável por `workspace_id`.

### Regra de integridade

Relações entre tabelas devem respeitar coerência de tenancy:
- `child.tenant_id = parent.tenant_id`
- `child.workspace_id = parent.workspace_id`, quando aplicável

### Regra de API

O backend nunca deve aceitar `tenant_id` livre vindo do frontend como fonte de verdade.

Fonte de verdade do escopo:
- sessão autenticada
- membership ativa
- contexto resolvido de workspace

---

## 4. Tipos de dados por escopo

### Escopo tenant

Dados que pertencem ao tenant inteiro:
- tenant
- billing_account
- plan_subscription
- global_ai_policy
- global_integration_credentials
- retention_policy
- audit exports

### Escopo workspace
n
Dados que pertencem a uma operação concreta:
- workspace
- team
- user_membership
- inbox
- channel_account
- contact
- contact_identity
- conversation
- message
- order
- shipment
- template_usage
- automation
- automation_execution
- knowledge_source
- knowledge_document
- ai_suggestion_log
- audit_log

### Escopo misto

Dados definidos no tenant mas aplicados por workspace:
- roles
- permissions
- templates globais aprovados
- catálogos de workflow
- policies de IA

---

## 5. Identidade e membership

### Usuário

`user` representa a identidade da pessoa na plataforma.

Não deve carregar permissões operacionais diretas.

### Membership

A autorização real vive em `workspace_membership`.

Campos mínimos:
- `id`
- `tenant_id`
- `workspace_id`
- `user_id`
- `role`
- `status`
- `team_ids[]` ou relação secundária
- `created_at`
- `updated_at`

### Roles v1 recomendadas

- `owner`
- `admin`
- `supervisor`
- `agent`
- `analyst`
- `viewer`

### Matriz operacional simplificada

- owner: tudo, inclusive billing, integrações e políticas
- admin: tudo no tenant/workspace exceto billing sensível
- supervisor: gestão operacional, filas, templates, workflows e analytics
- agent: atendimento, notas, tags, uso assistivo de IA
- analyst: leitura expandida, analytics, QA, auditoria
- viewer: leitura limitada

---

## 6. Modelo de brands e múltiplos números

### Decisão recomendada

Uma `brand` não precisa ser uma tabela obrigatória no primeiro corte.

No v1, o mais simples é:
- `workspace` representar a operação/marca principal
- `channel_account` representar cada número oficial do WhatsApp

Se necessário depois:
- introduzir `brand` como entidade acima de inbox/channel

### Múltiplos números

Cada `channel_account` deve guardar:
- `tenant_id`
- `workspace_id`
- `channel_type`
- `provider`
- `external_account_id`
- `external_phone_number_id`
- `display_name`
- `status`
- `quality_rating`
- `throughput_tier`

---

## 7. Tenancy para integrações

### Recomendação

Integrações externas devem ser modeladas em dois níveis:

1. `integration_connection`
- credenciais
- health
- escopo
- status de sincronização

2. `integration_binding`
- mapeia a conexão para recursos locais
- ex.: qual loja Shopify alimenta qual workspace

### Exemplos

Meta / WhatsApp:
- tenant ou workspace, dependendo da operação
- geralmente workspace-scoped no uso diário

Shopify:
- normalmente workspace-scoped

ERP / logística / antifraude:
- workspace-scoped por padrão

---

## 8. Tenancy para IA e knowledge

### Knowledge

`knowledge_source`, `knowledge_document`, `knowledge_chunk` devem ser, por padrão:
- `tenant_id`
- `workspace_id`

### Política de IA

Recomendação v1:
- política global por tenant
- overrides opcionais por workspace

Estrutura:
- `ai_policy`
- `ai_policy_workspace_override`

### Segurança

Recuperação RAG nunca pode cruzar tenant.
Workspace crossing só pode existir se explicitamente configurado pelo tenant.

---

## 9. Tenancy para eventos e auditoria

### Event log

Todo evento normalizado deve carregar:
- `event_id`
- `tenant_id`
- `workspace_id` se aplicável
- `aggregate_type`
- `aggregate_id`
- `source`
- `occurred_at`
- `received_at`
- `idempotency_key`

### Audit log

Toda ação mutável deve registrar:
- ator
- tenant
- workspace
- entidade afetada
- before/after quando aplicável
- request_id / correlation_id

---

## 10. Estratégia de enforcement no backend

### Regra de implementação

Criar um `RequestContext` interno com:
- `tenantId`
- `workspaceId`
- `userId`
- `role`
- `requestId`

Todos os casos de uso devem receber esse contexto.

### Regras de código

- repositories nunca fazem query sem `tenant_id`
- serviços de domínio nunca recebem escopo implícito
- webhooks externos resolvem `tenant_id/workspace_id` via `integration_connection`
- caches devem incluir chave de tenant/workspace

---

## 11. Estratégia futura de evolução

### Quando considerar isolamento mais forte

Migrar tenants enterprise para schema/banco dedicado quando houver:
- requisito contratual
- volume extremo
- retenção/região especial
- compliance reforçado

### Pré-requisito para migração futura

Manter desde já:
- IDs globais estáveis
- escopo explícito em todas as entidades
- camada de repository desacoplada

---

## 12. Decisões finais para implementação imediata

1. Adotar `single database + shared schema + tenant_id obrigatório`.
2. Tornar `workspace` a unidade operacional principal do v1.
3. Toda entidade operacional nova deve incluir `tenant_id` e, em geral, `workspace_id`.
4. Permissões devem viver em `workspace_membership`, não em `user`.
5. `channel_account` será a entidade-base para o WhatsApp oficial.
6. RAG, automações, inbox e integrações nunca podem cruzar tenant.
7. O backend deve resolver tenancy pela sessão/contexto, nunca confiar em campo arbitrário do cliente.
