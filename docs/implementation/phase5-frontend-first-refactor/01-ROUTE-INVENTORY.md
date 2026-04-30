# Inventário de Rotas e Superfícies

## 1. Shell global auditada

Rotas atuais auditadas no browser:
- `/dashboard`
- `/inbox`
- `/contacts`
- `/orders`
- `/audience`
- `/products`
- `/campaigns`
- `/automations`
- `/templates`
- `/analytics`
- `/ai-studio`
- `/ai-studio/agents`
- `/ai-studio/agents/new`
- `/ai-studio/agents/[agentId]`
- `/knowledge`
- `/knowledge/new`
- `/knowledge/sources`
- `/knowledge/retrieval`
- `/skills`
- `/apps`
- `/apps/catalog`
- `/apps/providers`
- `/settings/workspace`
- `/settings/users`
- `/settings/channels`
- `/settings/security`
- `/settings/billing`
- `/logs`
- `/storage`

## 2. Mapa-alvo principal

### Núcleo operacional
- `/dashboard`
- `/inbox`
- `/contacts`
- `/orders`
- `/audience`
- `/products`

### Growth & marketing
- `/campaigns`
- `/campaigns/new`
- `/campaigns/[campaignId]`
- `/campaigns/[campaignId]/edit`
- `/automations`
- `/automations/new`
- `/automations/[automationId]`
- `/automations/[automationId]/edit`
- `/templates`
- `/templates/new`
- `/templates/[templateId]`
- `/templates/[templateId]/edit`

### AI Studio como suíte
- `/ai-studio`
- `/ai-studio/agents`
- `/ai-studio/agents/new`
- `/ai-studio/agents/[agentId]`
- `/ai-studio/agents/[agentId]/edit`
- `/ai-studio/knowledge`
- `/ai-studio/knowledge/new`
- `/ai-studio/knowledge/sources`
- `/ai-studio/knowledge/sources/[sourceId]`
- `/ai-studio/knowledge/documents/[documentId]`
- `/ai-studio/knowledge/retrieval`
- `/ai-studio/knowledge/logs`
- `/ai-studio/skills`
- `/ai-studio/skills/new` or modal/sheet within shell
- `/ai-studio/integrations`
- `/ai-studio/evals`
- `/ai-studio/guardrails`
- `/ai-studio/costs`

### Conexões
- `/integrations`
- `/integrations/catalog`
- `/integrations/providers`
- `/integrations/webhooks`
- `/integrations/new`
- `/integrations/[integrationId]`
- `/integrations/[integrationId]/edit`
- `/integrations/[integrationId]/mapping`

### Administração
- `/settings`
- `/settings/profile`
- `/settings/workspace`
- `/settings/users`
- `/settings/channels`
- `/settings/security`
- `/settings/billing`
- `/settings/setup`
- `/settings/health`
- `/settings/checklist`
- `/logs`
- `/storage`

## 3. Superfícies faltantes ou que devem ser promovidas

### AI Studio
- `AI Studio Tabs Shell`
- `Agent executions history`
- `Agent cost center`
- `Agent triggers panel`
- `Evaluations dashboard`
- `Guardrails detail`

### Knowledge
- `Knowledge pipeline health`
- `Retrieval logs catalog`
- `Chunk inspector`
- `Batch ingest history`

### Integrations
- `Connection test result modal`
- `Secrets rotation flow`
- `Inbound webhook replay history`
- `Provider/tool capabilities detail`

### Settings
- `Setup progress center`
- `Workspace health`
- `Onboarding checklist`

## 4. Regra de migração de namespaces

1. Primeiro criar shell/tabs e alias de navegação.
2. Depois migrar links do menu lateral.
3. Depois redirecionar rotas legadas.
4. Só no final remover duplicações visuais e técnicas.
