# Fase 5.1 — Information Architecture e Routing

## Objetivo

Estabelecer a base estrutural de navegação do produto para separar, em todos os módulos complexos, os níveis de:

1. overview/list
2. detail/inspect
3. create/edit full screen

Esta etapa existe para reduzir retrabalho nas próximas refatorações e alinhar a evolução de Campaigns, Templates, AI Studio, Automations, Knowledge, Integrations e Settings ao mesmo modelo operacional.

## Princípios adotados

- preservar o shell atual com sidebar + topbar + conteúdo principal
- manter `PageContainer`, `PageHeader` e `StatCard` como primitives-base
- usar `Inbox`, `Analytics`, `Contacts` e `Orders` como baseline de clareza operacional
- evitar mistura de listagem com formulários complexos
- priorizar navegação previsível entre operar, inspecionar e editar

## Convenção de rotas

### Padrão principal

Para módulos complexos, adotar:

- `/<module>` → overview/list
- `/<module>/new` → criação full screen
- `/<module>/[id]` → detalhe/inspeção
- `/<module>/[id]/edit` → edição full screen

### Subáreas especializadas

Quando o domínio exigir subdomínios próprios:

- `/<module>/<subarea>` → overview da subárea
- `/<module>/<subarea>/new`
- `/<module>/<subarea>/[id]`
- `/<module>/<subarea>/[id]/edit`

## Mapa-alvo de rotas por módulo

### Campaigns
- `/campaigns`
- `/campaigns/new`
- `/campaigns/[campaignId]`
- `/campaigns/[campaignId]/edit`

### Templates
- `/templates`
- `/templates/new`
- `/templates/[templateId]`
- `/templates/[templateId]/edit`

### AI Studio
- `/ai-studio`
- `/ai-studio/agents`
- `/ai-studio/agents/new`
- `/ai-studio/agents/[agentId]`
- `/ai-studio/agents/[agentId]/edit`
- integrações por agente devem ser configuradas dentro do fluxo de agente, consumindo providers disponíveis em `/integrations`
- a antiga subárea de skills deixa de ser prioridade conceitual e passa a ser absorvida pela orquestração do próprio agente
- `/ai-studio/evals`

### Automations
- `/automations`
- `/automations/new`
- `/automations/[automationId]`
- `/automations/[automationId]/edit`

### Knowledge
- `/knowledge`
- `/knowledge/new`
- `/knowledge/sources/[sourceId]`
- `/knowledge/documents/[documentId]`
- `/knowledge/retrieval`
- `/knowledge/logs`

### Integrations
- `/integrations`
- `/integrations/new`
- `/integrations/[integrationId]`
- `/integrations/[integrationId]/edit`
- catálogo mock/configurável de plataformas disponíveis para vínculo com agentes e automações
- detalhe dedicado para inspeção operacional, capacidades e health check
- edição estrutural separada do catálogo principal

### Settings
- `/settings`
- `/settings/profile`
- `/settings/workspace`
- `/settings/users`
- `/settings/channels`
- `/settings/integrations`
- `/settings/security`
- `/settings/billing`

## Decisão estrutural sobre AI Skills

O módulo legado `/skills` deve ser tratado como transição. A arquitetura alvo evolui para um modelo centrado em agentes:

- navegação primária deve favorecer `AI Studio`
- a antiga noção de `Skills` isoladas deixa de ser destino principal do produto
- ativações operacionais passam a acontecer no contexto do agente: modelo, knowledge, guardrails, ferramentas e integrações
- `/skills` permanece apenas como legado/transição enquanto a arquitetura final é consolidada

## Marco implementado nesta rodada

### Campaigns
A primeira aplicação prática da convenção foi concluída em Campaigns com:

- `/campaigns` → catálogo operacional
- `/campaigns/new` → criação full screen
- `/campaigns/[campaignId]` → detalhe/inspeção
- `/campaigns/[campaignId]/edit` → edição full screen

Também foi adicionada a base backend/frontend para:

- `GET /api/v1/campaigns/[campaignId]`
- `PATCH /api/v1/campaigns/[campaignId]`
- leitura individual por id
- atualização de campaign no store fallback e no caminho SQL

### Templates
A segunda aplicação prática da convenção foi concluída em Templates com:

- `/templates` → catálogo operacional
- `/templates/new` → criação full screen
- `/templates/[templateId]` → detalhe/inspeção
- `/templates/[templateId]/edit` → edição full screen

Nesta etapa, o fluxo foi estruturado com:

- listagem operacional dedicada
- detalhe com preview e métricas
- editor full screen com governança e preview lateral
- persistência ainda local/mock para o editor, preservando evolução incremental sem acoplar backend prematuramente

### AI Studio / Agents
A camada estrutural de agents foi iniciada com:

- `/ai-studio` como hub resumido
- `/ai-studio/agents` como catálogo operacional
- `/ai-studio/agents/new` como criação full screen
- `/ai-studio/agents/[agentId]` como detalhe/inspeção
- `/ai-studio/agents/[agentId]/edit` como edição full screen

Nesta etapa, o fluxo foi estruturado com:

- hub resumido com atalhos para agentes, integrações, knowledge e analytics
- catálogo dedicado de agentes com busca e filtros
- detalhe operacional com performance, guardrails, ferramentas, integrações ativadas e relacionamentos
- editor full screen estrutural com configuração de integrações por agente
- persistência ainda local/mock para o editor de agents
- refinamento visual adicional do hub e do board de agentes para apresentar melhor toda a malha de IA do workspace

### Automations
A camada estrutural de Automations foi iniciada com:

- `/automations` como catálogo operacional
- `/automations/new` como builder full screen
- `/automations/[automationId]` como detalhe/inspeção
- `/automations/[automationId]/edit` como builder dedicado de edição

Nesta etapa, o fluxo foi estruturado com:

- catálogo operacional com busca, filtros e health resumido
- detalhe com mapa reduzido do fluxo, dependências e resumo executivo
- builder full screen com rail lateral e preview do mapa atual
- canvas compartilhado extraído para componente reutilizável
- persistência ainda local/mock para o builder estrutural

### Integrations
A camada estrutural de Integrations foi ajustada para suportar a nova arquitetura centrada em agentes:

- `/integrations` como catálogo operacional e catálogo mock de plataformas configuráveis
- `/integrations/new` como configuração estrutural inicial de provider
- `/integrations/[integrationId]` como detalhe/inspeção da conexão
- `/integrations/[integrationId]/edit` como edição estrutural dedicada
- create, detail e update conectados ao backend/fallback existente
- providers mock preparados para ativação futura em agentes
- integrações expostas como dependência configurável do AI Studio

### Knowledge
A camada estrutural de Knowledge foi iniciada com:

- `/knowledge` como catálogo operacional de sources e documents
- `/knowledge/new` como fluxo dedicado de ingestão inicial
- `/knowledge/sources/[sourceId]` como detalhe da source
- `/knowledge/documents/[documentId]` como detalhe do documento
- `/knowledge/retrieval` como console dedicado de retrieval observável

Nesta etapa, o fluxo foi estruturado com:

- overview separado para operar sources e documentos
- detalhe de source com ingest, status e lista de documentos
- detalhe de documento com conteúdo bruto e chunks materializados
- retrieval console isolado para debugging e leitura de logs
- ingestão inicial separada do catálogo principal para reduzir carga cognitiva

### Settings / Sidebar / Workspace switcher
A camada estrutural de Settings e navegação global foi refinada com:

- `/settings` como overview administrativo
- `/settings/profile` para preferências da conta
- `/settings/workspace` para configurações específicas do ambiente atual
- `/settings/users` para membros e acesso
- `/settings/channels` para governança de canais
- `/settings/security` para governança e segurança
- `/settings/billing` para leitura contratual inicial
- `/settings/integrations` como ponte para a superfície operacional de integrações
- substituição do item de suporte por perfil e centro de configuração no rodapé da sidebar
- ação de engrenagem junto ao seletor de workspace para reforçar a administrabilidade do ambiente atual

## Próximos passos recomendados

1. expandir e refinar breadcrumbs consistentes para list → detail → edit em todo o produto
2. padronizar toolbars de listagem e footers sticky de edição
3. migrar gradualmente fluxos legados que ainda misturam catálogo com edição inline
4. evoluir persistência real para módulos que hoje ainda usam editor mock/local
5. expandir Knowledge com listagem dedicada de retrieval logs e observabilidade operacional mais rica
