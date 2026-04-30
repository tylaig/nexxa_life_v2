# Implementação dos módulos de Campaigns, Integrações n8n, RAG e AI Skills

## 0. Contexto de encaixe no produto atual

Base atual identificada no projeto:
- frontend em Next.js App Router (`app/(app)/*`)
- APIs internas em `app/api/v1/*`
- banco PostgreSQL com migrations SQL (`db/migrations/001_init.sql`)
- runtime assíncrono com worker (`scripts/worker.ts`) e BullMQ/Redis
- domínios já existentes para conversations, contacts e orders
- navegação principal já organizada em Operação, Automação e Inteligência
- telas existentes de Inbox, Contacts, Orders, Automations, Templates, Knowledge, AI Studio, Analytics e Settings

A evolução proposta preserva a arquitetura atual e adiciona quatro domínios conectados:
- `campaigns`
- `integrations`
- `knowledge`
- `skills`

Todos devem ser multi-tenant, auditáveis e orientados por separação entre configuração e execução.

---

## 1. Visão de arquitetura dos novos módulos

## 1.1 Domínios novos

### Campaigns
Responsável por campanhas outbound operacionais com uso de template aprovado, targeting por audiência, agendamento, batching, tracking e gatilhos de automação pós-envio e pós-resposta.

Responsabilidades:
- CRUD de campanhas
- seleção de audiência
- binding com template/canal/remetente
- mapeamento de variáveis
- preview e dry-run
- agendamento e execução
- tracking de entrega, leitura, resposta e conversão
- vínculo opcional com automações e skills

### Integrations / n8n
Responsável por conectar instâncias externas do n8n por workspace, validar credenciais, sincronizar workflows compatíveis, instalar templates de fluxo e operar n8n como runtime externo das automações.

Responsabilidades:
- conexão e autenticação da instância
- catálogo de workflows compatíveis
- instalação/provisionamento de templates
- binding entre eventos internos e workflows n8n
- registro de execuções e logs
- governança de variáveis de entrada/saída

### Knowledge / RAG
Responsável por conectar Supabase + OpenAI, processar fontes, gerar embeddings, persistir chunks vetoriais e fornecer retrieval governado para IA, skills e automações.

Responsabilidades:
- conexão com Supabase/OpenAI
- ingestão de fontes
- parsing, chunking e versionamento
- indexação vetorial em pgvector
- retrieval com filtros por tenant/workspace/contexto
- observabilidade de buscas e grounding

### AI Skills
Responsável por encapsular prompts reutilizáveis parametrizados com placeholders `{{$var}}`, com validação de variáveis, teste manual, versionamento e bindings com inbox, campanhas, IA e automações.

Responsabilidades:
- CRUD de skills
- parser de placeholders
- schema de entrada
- controle de versão
- execução manual e programática
- suporte a saída em texto ou JSON estruturado
- logs e avaliação de execução

## 1.2 Mapa de relacionamento com o produto existente

### Inbox
- campanhas podem gerar novas conversas ou reativar contatos na inbox
- respostas a campanhas devem aparecer como mensagens normais em `conversations`/`messages`
- skills podem ser executadas no composer, em sugestões de resposta e em triagem
- retrieval RAG pode enriquecer assistentes da inbox
- n8n pode ser acionado por eventos de inbox e retornar ações para a conversa

### Contacts
- audiências e recipients derivam de `contacts`
- skills recebem contexto de contato
- retrieval pode aplicar filtros por segmento/tags/lifecycle stage
- campanhas precisam validar elegibilidade do contato antes do envio

### Templates
- campanhas usam templates aprovados como fonte oficial de outbound
- template bindings armazenam mapeamento entre variáveis do template e dados internos
- skills podem ser usadas para gerar valores de variáveis de template ou decidir qual template usar

### Automations
- campanhas podem iniciar automações após envio, entrega, resposta ou conversão
- n8n atua como runtime externo de automações do cliente
- skills podem ser steps de automação
- retrieval pode ser usado como step de grounding em automações

### Analytics
- campanhas publicam métricas agregadas e eventos por recipient/run
- execuções n8n alimentam dashboards operacionais
- retrieval logs e skill execution logs compõem métricas de IA
- funil: enviado -> entregue -> lido -> respondeu -> converteu

### Settings
- conexões com OpenAI, Supabase, n8n e credenciais externas ficam em Settings/Integrations
- defaults por workspace: remetente padrão, modelo de embeddings, política de grounding, limites de envio

## 1.3 Arquitetura modular recomendada

Estrutura de módulos recomendada:
- `modules/campaigns/*`
- `modules/integrations/*`
- `modules/knowledge/*`
- `modules/skills/*`
- `modules/automations/*` (bindings e orchestration)
- `modules/runtime-events/*` (eventos canônicos internos)

Estrutura de API:
- `app/api/v1/campaigns/*`
- `app/api/v1/integrations/n8n/*`
- `app/api/v1/integrations/supabase/*`
- `app/api/v1/integrations/openai/*`
- `app/api/v1/knowledge/*`
- `app/api/v1/skills/*`

Estrutura frontend:
- `app/(app)/campaigns/*`
- `app/(app)/integrations/*`
- `app/(app)/knowledge/*`
- `app/(app)/ai/skills/*`
- `components/campaigns/*`
- `components/integrations/*`
- `components/knowledge/*`
- `components/skills/*`

Execução assíncrona:
- worker BullMQ para ingestão, chunking, embeddings, campanhas, sync n8n e retries
- filas separadas por domínio:
  - `campaign-dispatch`
  - `campaign-status-reconciliation`
  - `n8n-sync`
  - `n8n-execution`
  - `knowledge-ingestion`
  - `knowledge-embedding`
  - `skill-execution`

---

## 2. Modelo de navegação e novas páginas

## 2.1 Navegação principal recomendada

Sidebar principal:
- Operação
  - Inbox
  - Contatos
  - Pedidos
  - Campaigns
- Automação
  - Automações
  - Templates HSM
  - Integrações
- Inteligência
  - Knowledge
  - AI Skills
  - AI Studio
  - Analytics

O item “Integrações” deve sair do footer isolado e passar a existir também como área operacional principal, porque vira dependência estrutural de automações, IA e campanhas.

## 2.2 Páginas Campaigns

### `/campaigns`
Objetivo:
- listar campanhas e oferecer visão operacional do módulo

Principais componentes:
- header com KPIs (drafts, scheduled, in_progress, completed, failed)
- tabela com filtros
- tabs por status
- cards de métricas por canal/remetente
- CTA “Nova campanha”

Ações do usuário:
- criar campanha
- filtrar por status, canal, template, audiência, período
- abrir detalhe
- duplicar campanha
- cancelar agendamento

Estados:
- vazio sem campanhas
- carregando
- lista paginada
- erro de carregamento

Dados exibidos:
- nome, status, template, audiência, agendamento, remetente, volume, entregas, respostas, conversões

Integrações necessárias:
- campaigns API
- analytics summary
- templates catalog

### `/campaigns/new`
Objetivo:
- wizard de criação de campanha

Principais componentes:
- stepper: objetivo -> audiência -> canal/remetente -> template -> variáveis -> automações -> revisão
- preview lateral
- contador de elegíveis e bloqueados

Ações do usuário:
- escolher audiência
- selecionar template
- mapear variáveis
- configurar gatilhos pós-envio/pós-resposta
- salvar draft
- agendar
- disparar dry-run

Estados:
- draft inicial
- validando elegibilidade
- preview pronto
- erro de validação

Dados exibidos:
- resumo da audiência
- remetente/canal
- template preview
- variáveis obrigatórias e origem dos dados
- estimativa de recipients válidos

Integrações necessárias:
- audiences query engine
- templates API
- contacts data
- automations bindings
- skills catalog opcional

### `/campaigns/[id]`
Objetivo:
- visão 360 da campanha

Principais componentes:
- summary header
- tabs: visão geral, recipients, eventos, automações, logs, métricas
- gráfico de funil
- linha do tempo da execução

Ações do usuário:
- pausar, retomar, cancelar, duplicar
- baixar recipients
- reinspecionar falhas
- abrir automações vinculadas

Estados:
- draft
- scheduled
- processing
- partially_failed
- completed

Dados exibidos:
- run atual
- batches
- eventos por recipient
- métricas de entrega/resposta
- automações disparadas

Integrações necessárias:
- campaign_runs
- campaign_recipients
- campaign_events
- automation events

### `/campaigns/audiences`
Objetivo:
- listar e administrar audiências reutilizáveis

Principais componentes:
- lista de audiências
- builder de filtros
- preview de elegibilidade

Ações do usuário:
- criar audiência
- duplicar
- visualizar elegíveis
- salvar versão

Estados:
- vazio
- preview em execução
- erro de filtro inválido

Dados exibidos:
- nome, tipo, contagem estimada, última atualização

Integrações necessárias:
- contacts/orders
- audience engine

## 2.3 Páginas Integrações

### `/integrations`
Objetivo:
- hub de integrações do workspace

Principais componentes:
- cards de OpenAI, Supabase, n8n, WhatsApp, Shopify etc.
- status badges
- histórico de sync

Ações do usuário:
- conectar/desconectar
- abrir configuração específica

### `/integrations/n8n`
Objetivo:
- configurar instância n8n do cliente

Principais componentes:
- formulário de conexão
- teste de conectividade
- status da instância
- capacidades detectadas

Ações do usuário:
- informar base URL, auth mode, credenciais
- testar conexão
- salvar conexão
- revalidar

Estados:
- desconectado
- conectado
- credenciais inválidas
- timeout/erro de rede

Dados exibidos:
- URL
- tipo de autenticação
- versão detectada do n8n
- última validação

Integrações necessárias:
- connections API
- secret storage
- n8n health endpoint

### `/integrations/n8n/workflows`
Objetivo:
- catálogo de workflows compatíveis, instalados e vinculados

Principais componentes:
- tabs: templates, instalados, bindings
- tabela com compatibilidade/versionamento
- CTA “Instalar workflow”

Ações do usuário:
- instalar template
- sincronizar workflows existentes
- abrir detalhe
- vincular a evento interno

Dados exibidos:
- nome, categoria, versão, status de instalação, eventos compatíveis, última sync

### `/integrations/n8n/workflows/[id]`
Objetivo:
- detalhe de um workflow n8n instalado ou template

Principais componentes:
- summary
- variáveis de entrada/saída
- bindings com automações internas
- logs recentes

Ações do usuário:
- ativar/desativar binding
- editar mapping de payload
- rodar teste

### `/integrations/supabase`
Objetivo:
- configurar projeto Supabase para RAG

Principais componentes:
- formulário de URL/projeto/schema
- teste de conexão
- status da extensão pgvector

Ações do usuário:
- validar conexão
- escolher schema/tabela padrão
- habilitar retrieval para workspace

### `/integrations/openai`
Objetivo:
- configurar credenciais/modelos OpenAI

Principais componentes:
- formulário seguro de API key
- seleção de modelo de embeddings
- teste de embedding
- custos e limites

Ações do usuário:
- salvar credenciais
- executar teste
- definir default por workspace

## 2.4 Páginas Knowledge / RAG

### `/knowledge`
Objetivo:
- visão geral da base de conhecimento

Principais componentes:
- KPIs: fontes, documentos, chunks, embeddings, falhas
- lista de fontes
- status de indexação

### `/knowledge/sources`
Objetivo:
- cadastrar e administrar fontes

Principais componentes:
- tabela por tipo de fonte
- drawer de criação
- filtros por status

Ações do usuário:
- adicionar fonte
- iniciar ingestão
- reindexar
- desativar

### `/knowledge/documents/[id]`
Objetivo:
- inspeção detalhada do documento e sua indexação

Principais componentes:
- metadados do documento
- preview do conteúdo normalizado
- lista de chunks
- status de embeddings
- histórico de versões

Ações do usuário:
- reprocessar
- comparar versão
- excluir documento

### `/knowledge/search`
Objetivo:
- console operacional de retrieval

Principais componentes:
- input de busca
- filtros por workspace/contexto/tags
- lista de chunks retornados
- score e grounding preview

Ações do usuário:
- rodar busca
- depurar query
- testar grounding obrigatório

## 2.5 Páginas AI Skills

### `/ai/skills`
Objetivo:
- catálogo de skills reutilizáveis

Principais componentes:
- lista de skills
- filtros por categoria, output mode, bindings
- cards com última versão e taxa de sucesso

### `/ai/skills/new`
Objetivo:
- criar skill com prompt parametrizado

Principais componentes:
- formulário de metadados
- editor de prompt
- painel de variáveis detectadas
- definição de schema e output mode

Ações do usuário:
- escrever prompt
- validar placeholders
- salvar draft
- testar com mock

### `/ai/skills/[id]`
Objetivo:
- gerenciar versões, bindings e logs da skill

Principais componentes:
- summary
- tabs: detalhes, versões, bindings, execuções

Ações do usuário:
- publicar nova versão
- ativar/desativar bindings
- clonar skill

### `/ai/skills/[id]/test`
Objetivo:
- executar skill manualmente com payload real ou mock

Principais componentes:
- editor de input JSON
- preview de contexto vinculado
- painel de output
- debug de variáveis resolvidas

Ações do usuário:
- executar skill
- validar output texto/JSON
- salvar payload como fixture

---

## 3. Modelagem de dados / entidades

Todas as entidades abaixo devem incluir, salvo exceções operacionais internas:
- `tenant_id text not null`
- `workspace_id text not null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()` quando houver mutabilidade

## 3.1 Campaigns

### `campaigns`
Propósito:
- entidade principal da campanha

Campos principais:
- `id text pk`
- `tenant_id`
- `workspace_id`
- `name text`
- `objective text`
- `status text` (`draft`, `scheduled`, `running`, `paused`, `completed`, `cancelled`, `failed`)
- `channel text`
- `sender_id text`
- `template_id text`
- `template_version text`
- `audience_id text`
- `automation_on_sent_id text null`
- `automation_on_reply_id text null`
- `skill_on_reply_id text null`
- `schedule_at timestamptz null`
- `dry_run_enabled boolean default false`
- `created_by text`
- `launched_at timestamptz null`
- `completed_at timestamptz null`
- `metadata jsonb default '{}'::jsonb`

Relacionamentos:
- N:1 com audiences
- 1:N com `campaign_runs`, `campaign_recipients`, `campaign_events`, `campaign_template_bindings`

Índices/constraints:
- index `(tenant_id, workspace_id, status, schedule_at desc)`
- index `(tenant_id, workspace_id, created_at desc)`

### `campaign_audiences`
Propósito:
- snapshot da audiência usada pela campanha no momento do disparo

Campos principais:
- `id`
- `campaign_id`
- `audience_id`
- `audience_name`
- `filter_snapshot jsonb`
- `estimated_count integer`
- `eligible_count integer`
- `blocked_count integer`
- `snapshot_taken_at timestamptz`

Observação:
- separa o conceito de audiência dinâmica da fotografia usada na execução

### `campaign_template_bindings`
Propósito:
- armazenar o mapeamento entre placeholders do template e dados internos

Campos principais:
- `id`
- `campaign_id`
- `template_id`
- `template_variable_name text`
- `binding_source_type text` (`static`, `contact_field`, `order_field`, `skill_output`, `expression`)
- `binding_source_value text`
- `is_required boolean`
- `fallback_value text null`
- `resolved_preview jsonb`

Constraints:
- unique `(campaign_id, template_variable_name)`

### `campaign_recipients`
Propósito:
- materialização por contato do alvo da campanha

Campos principais:
- `id`
- `campaign_id`
- `contact_id`
- `conversation_id text null`
- `recipient_phone_e164 text`
- `eligibility_status text` (`eligible`, `blocked`, `sent`, `delivered`, `read`, `replied`, `failed`, `converted`)
- `blocked_reason text null`
- `batch_number integer`
- `provider_message_id text null`
- `sent_at timestamptz null`
- `delivered_at timestamptz null`
- `read_at timestamptz null`
- `replied_at timestamptz null`
- `converted_at timestamptz null`
- `payload_snapshot jsonb`

Índices:
- `(campaign_id, eligibility_status)`
- `(campaign_id, contact_id)` unique
- `(tenant_id, workspace_id, provider_message_id)`

### `campaign_runs`
Propósito:
- registrar cada execução/agendamento/reprocessamento da campanha

Campos principais:
- `id`
- `campaign_id`
- `run_type text` (`dry_run`, `scheduled`, `manual`, `retry`)
- `status text`
- `started_at`
- `finished_at`
- `total_recipients integer`
- `success_count integer`
- `failure_count integer`
- `metrics_json jsonb`
- `error_summary jsonb`

### `campaign_events`
Propósito:
- trilha de auditoria granular por recipient e run

Campos principais:
- `id`
- `campaign_id`
- `campaign_run_id`
- `campaign_recipient_id`
- `event_type text` (`validated`, `queued`, `sent`, `delivered`, `read`, `replied`, `failed`, `converted`, `automation_triggered`)
- `event_source text` (`system`, `whatsapp_webhook`, `n8n`, `user`)
- `payload jsonb`
- `occurred_at timestamptz`

## 3.2 n8n / Integrations

### `integration_connections`
Propósito:
- registro unificado de conexões externas por workspace

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `provider text` (`n8n`, `supabase`, `openai`, `whatsapp`, etc.)
- `status text` (`draft`, `active`, `error`, `disabled`)
- `display_name text`
- `config_public jsonb`
- `secret_ref text`
- `last_validated_at timestamptz null`
- `last_error jsonb null`

Constraints:
- unique `(tenant_id, workspace_id, provider, display_name)`

### `n8n_instances`
Propósito:
- configuração específica da instância n8n

Campos principais:
- `id`
- `integration_connection_id`
- `base_url text`
- `auth_mode text` (`api_key`, `basic`, `bearer`)
- `api_version text null`
- `workspace_external_id text null`
- `health_status text`
- `capabilities jsonb`
- `last_sync_at timestamptz null`

### `n8n_workflow_templates`
Propósito:
- catálogo interno de templates compatíveis de workflow

Campos principais:
- `id`
- `slug text unique`
- `name text`
- `category text`
- `description text`
- `workflow_json jsonb`
- `input_schema jsonb`
- `output_schema jsonb`
- `compatibility_version text`
- `is_active boolean`

### `n8n_workflow_bindings`
Propósito:
- vínculo entre workflows instalados e eventos internos do sistema

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `n8n_instance_id`
- `template_id text null`
- `workflow_external_id text`
- `workflow_name text`
- `binding_type text` (`event_trigger`, `campaign_followup`, `manual`, `skill_postprocess`)
- `trigger_event text`
- `input_mapping jsonb`
- `output_mapping jsonb`
- `status text`
- `installed_version text`

Índices:
- `(tenant_id, workspace_id, trigger_event)`
- unique `(workspace_id, workflow_external_id, binding_type, trigger_event)`

### `n8n_execution_logs`
Propósito:
- log operacional de execuções disparadas no n8n

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `n8n_workflow_binding_id`
- `trigger_event text`
- `source_entity_type text`
- `source_entity_id text`
- `request_payload jsonb`
- `response_payload jsonb null`
- `execution_external_id text null`
- `status text` (`queued`, `sent`, `running`, `success`, `failed`, `timeout`)
- `error_message text null`
- `started_at`
- `finished_at null`

### `automation_variable_definitions`
Propósito:
- catálogo de variáveis de entrada/saída disponíveis para automações externas

Campos principais:
- `id`
- `scope_type text` (`campaign`, `conversation`, `contact`, `order`, `skill`, `knowledge_retrieval`)
- `scope_key text`
- `variable_name text`
- `data_type text`
- `description text`
- `example_value jsonb`
- `is_required boolean`

## 3.3 Knowledge / RAG

### `knowledge_sources`
Propósito:
- representar a fonte cadastrada pelo usuário

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `source_type text` (`upload`, `url`, `faq`, `manual`, `policy`, `catalog`)
- `name text`
- `status text` (`draft`, `processing`, `ready`, `failed`, `archived`)
- `config jsonb`
- `last_ingested_at timestamptz null`
- `last_error jsonb null`

### `knowledge_documents`
Propósito:
- documento normalizado derivado de uma fonte

Campos principais:
- `id`
- `source_id`
- `external_ref text null`
- `title text`
- `mime_type text`
- `language text`
- `checksum text`
- `version integer`
- `status text`
- `metadata jsonb`
- `content_text text`
- `published_at timestamptz null`

Constraints:
- unique `(source_id, checksum)`

### `knowledge_chunks`
Propósito:
- chunks textuais com metadados para retrieval

Campos principais:
- `id`
- `document_id`
- `chunk_index integer`
- `content text`
- `token_count integer`
- `metadata jsonb`
- `embedding_status text`

Índices:
- unique `(document_id, chunk_index)`
- index `(tenant_id, workspace_id, document_id)`

### `knowledge_embeddings`
Propósito:
- vetor persistido e dados do embedding

Campos principais:
- `id`
- `chunk_id`
- `provider text` (`openai`)
- `model text`
- `embedding vector(1536)` ou dimensão configurável
- `dimensions integer`
- `embedded_at timestamptz`

Índices:
- ivfflat/hnsw em `embedding`
- index `(tenant_id, workspace_id, chunk_id)`

### `retrieval_logs`
Propósito:
- observabilidade do uso de RAG

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `source_context_type text` (`inbox`, `skill`, `automation`, `campaign`)
- `source_context_id text`
- `query_text text`
- `filters jsonb`
- `top_k integer`
- `results jsonb`
- `grounding_required boolean`
- `status text`
- `created_at`

## 3.4 Skills

### `skills`
Propósito:
- registro lógico da skill

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `name text`
- `slug text`
- `description text`
- `category text`
- `status text` (`draft`, `active`, `archived`)
- `current_version_id text null`
- `output_mode text` (`text`, `json`)
- `default_model text null`

Constraints:
- unique `(tenant_id, workspace_id, slug)`

### `skill_versions`
Propósito:
- versionamento do prompt e do schema da skill

Campos principais:
- `id`
- `skill_id`
- `version integer`
- `prompt_template text`
- `input_schema jsonb`
- `output_schema jsonb null`
- `detected_variables jsonb`
- `execution_context_config jsonb`
- `is_published boolean`
- `published_at timestamptz null`
- `created_by text`

Constraints:
- unique `(skill_id, version)`

### `skill_variables`
Propósito:
- materialização das variáveis detectadas/definidas

Campos principais:
- `id`
- `skill_version_id`
- `variable_name text`
- `data_type text`
- `is_required boolean`
- `default_value jsonb null`
- `description text null`
- `source_binding_type text null`
- `source_binding_value text null`

Constraints:
- unique `(skill_version_id, variable_name)`

### `skill_bindings`
Propósito:
- indicar onde a skill pode ser usada

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `skill_id`
- `binding_target_type text` (`inbox`, `campaign`, `automation`, `ai_assistant`, `template_variable_resolver`)
- `binding_target_id text null`
- `trigger_mode text` (`manual`, `event`, `always_available`)
- `config jsonb`
- `status text`

### `skill_execution_logs`
Propósito:
- trilha completa de execução da skill

Campos principais:
- `id`
- `tenant_id`
- `workspace_id`
- `skill_id`
- `skill_version_id`
- `trigger_source text`
- `source_entity_type text`
- `source_entity_id text`
- `input_payload jsonb`
- `resolved_prompt text`
- `output_text text null`
- `output_json jsonb null`
- `model text null`
- `token_usage jsonb null`
- `status text` (`success`, `failed`, `blocked`)
- `error_message text null`
- `started_at`
- `finished_at`

---

## 4. Fluxos funcionais ponta a ponta

## Fluxo A — Campanha com template
1. usuário acessa `/campaigns/new`
2. define nome, objetivo e canal
3. seleciona audiência salva ou monta uma nova
4. sistema calcula snapshot da audiência
5. usuário escolhe remetente e template aprovado
6. sistema lê variáveis exigidas pelo template
7. usuário mapeia cada variável para fonte interna
8. sistema executa preview com amostra de contatos
9. sistema marca recipients bloqueados por falta de consentimento, telefone inválido ou variável obrigatória ausente
10. usuário salva como draft, agenda ou dispara
11. worker cria `campaign_run`, materializa `campaign_recipients`, enfileira batches
12. envio gera eventos `queued` e `sent`
13. status callbacks atualizam `delivered`, `read` e `failed`
14. respostas entram na inbox e atualizam `replied`
15. tela `/campaigns/[id]` mostra métricas e recipients

## Fluxo B — Campanha que inicia automação
1. campanha possui binding `automation_on_reply_id`
2. template é enviado ao recipient
3. recipient responde no WhatsApp
4. inbound webhook gera/atualiza conversa na inbox
5. correlator localiza `campaign_recipient` pelo `provider_message_id` ou contexto da conversa
6. evento `campaign.reply.received` é emitido
7. automação vinculada é disparada
8. step inicial pode executar uma skill
9. step seguinte pode disparar workflow n8n
10. logs de automação, skill e n8n ficam visíveis no detalhe da campanha e da conversa

## Fluxo C — Skill com variáveis
1. usuário acessa `/ai/skills/new`
2. preenche nome, categoria e descrição
3. escreve prompt com placeholders `{{$name}}`, `{{$order_id}}`, `{{$tracking_url}}`
4. parser detecta automaticamente variáveis e sugere schema
5. usuário ajusta tipos, obrigatoriedade e defaults
6. escolhe modo de saída `text` ou `json`
7. sistema valida consistência entre placeholders e schema
8. usuário executa teste com payload mock
9. sistema persiste `skill_execution_logs`
10. skill fica disponível para binding em campanhas, inbox, automações e AI Studio

## Fluxo D — Integração com n8n
1. usuário acessa `/integrations/n8n`
2. informa URL, auth mode e credenciais
3. sistema testa conectividade e permissões
4. conexão é salva em `integration_connections` + `n8n_instances`
5. usuário acessa `/integrations/n8n/workflows`
6. sistema sincroniza workflows existentes e catálogo compatível
7. usuário instala template padrão ou vincula um workflow já existente
8. define evento gatilho e mapping de entrada/saída
9. quando evento interno ocorre, worker dispara execução no n8n
10. execução gera `n8n_execution_logs`
11. retorno do n8n fica disponível para automações internas, inbox ou analytics

## Fluxo E — RAG com Supabase
1. usuário conecta OpenAI em `/integrations/openai`
2. usuário conecta Supabase em `/integrations/supabase`
3. sistema valida pgvector e permissões
4. usuário cria fonte em `/knowledge/sources`
5. documento é carregado e normalizado
6. worker faz chunking
7. worker gera embeddings com OpenAI
8. vetores são persistidos no Supabase
9. skill ou IA solicita retrieval com filtros de tenant/workspace/contexto
10. busca registra `retrieval_logs`
11. chunks retornados são usados como grounding no prompt final

---

## 5. Regras de negócio e validações

## 5.1 Campanhas
- campanha só pode sair de `draft` se houver audiência snapshot válida
- template deve existir e estar aprovado para o canal escolhido
- todos os placeholders obrigatórios do template devem estar mapeados
- contato sem telefone válido ou com opt-out ativo deve ficar bloqueado
- contato sem consentimento aplicável não entra em lote enviável
- dry-run não pode gerar envio real nem alterar métricas de produção
- toda campanha precisa armazenar snapshot da audiência e do template usado
- envios devem ser executados em batches com rate limit por remetente/número
- campanha pausada não agenda novos batches
- callbacks de entrega/leitura/resposta devem ser idempotentes
- toda transição relevante deve gerar evento auditável

## 5.2 n8n
- conexão não pode ser ativada sem teste de conectividade bem-sucedido
- credenciais não podem ser persistidas em texto puro; usar `secret_ref`
- templates de workflow devem ser separados de workflows instalados
- binding deve registrar versão de compatibilidade
- execução deve ter timeout configurável e retries limitados
- erro externo deve ficar visível para o usuário com mensagem amigável e payload técnico protegido
- input/output mappings devem ser validados antes da ativação

## 5.3 RAG
- todo documento e chunk deve carregar metadados de tenant/workspace
- documentos devem ser versionados por checksum ou versão incremental
- chunking deve ser determinístico para reindexações
- embeddings devem registrar provider/model/dimensão
- retrieval obrigatório deve bloquear resposta quando não houver grounding mínimo
- queries de retrieval devem registrar filtros e resultados
- exclusão de fonte deve acionar limpeza lógica ou física dos chunks/embeddings relacionados

## 5.4 Skills
- placeholders `{{$var}}` devem ser detectados automaticamente via parser
- skill não pode ser publicada se houver placeholder sem definição no schema
- schema não pode conter variáveis declaradas e não utilizadas sem explicitação do usuário
- saída `json` exige `output_schema`
- teste manual deve registrar prompt resolvido, payload e resultado
- bindings só podem usar versão publicada da skill
- skill usada em automação/campanha deve referenciar versão imutável no momento do vínculo

---

## 6. UX / Produto

## 6.1 Princípios de UX
- clareza operacional primeiro
- estado do sistema sempre visível
- logs e preview em primeiro plano
- separação explícita entre configurar e executar
- feedback rápido de validação
- navegação guiada por contexto de uso

## 6.2 Relação entre AI Studio, Knowledge, Automations e Campaigns
- AI Studio = orquestração e governança de IA
- Knowledge = grounding e fontes
- AI Skills = unidade reutilizável de prompt e execução
- Automations = encadeamento operacional
- Campaigns = canal outbound e gatilho de crescimento/retenção

Fluxo mental do produto:
1. conectar integrações
2. configurar conhecimento
3. criar skills
4. montar automações
5. executar campanhas/inbox
6. observar analytics e logs

## 6.3 Padrões de tela
- header com título, subtítulo e status global
- tabs para separar configuração, execução e logs
- painel lateral de preview/debug
- badges de saúde/sync/execução
- tabelas com filtros salvos
- timeline para eventos operacionais

## 6.4 Estados vazios
- Campaigns: explicar valor operacional e CTA “Criar campanha”
- n8n: explicar uso como backend do cliente e CTA “Conectar instância”
- Knowledge: explicar ingestão/RAG e CTA “Adicionar fonte”
- Skills: explicar placeholders e CTA “Criar skill”

## 6.5 Feedback de sincronização
- exibir último sync e próximo retry
- mostrar diferença entre “salvo”, “validado”, “instalado”, “ativo”
- logs resumidos com drill-down técnico

## 6.6 Visualização de variáveis
- tabela com variável, tipo, origem, exemplo, status
- destacar obrigatórias ausentes
- preview com valores resolvidos por contato/documento

## 6.7 Preview / teste
- preview de template com dados reais mascarados
- preview de skill com prompt resolvido
- teste de workflow n8n com payload sample
- teste de retrieval com scores e chunks retornados

A UX esperada deve transmitir:
- controle
- auditabilidade
- robustez
- confiança para operações críticas

---

## 7. Ordem de implementação

## Fase 1 — Fundamentos
Dependências que destravam todos os módulos:
- ampliar schema SQL com tabelas-base de integrations, skills, campaigns e knowledge
- criar infraestrutura de secrets/config por workspace
- criar event bus interno e contratos canônicos para campanhas, skills, retrieval e execuções n8n
- criar parser de placeholders `{{$var}}`
- criar componentes UI base: status badge, variable inspector, execution log viewer

## Fase 2 — Skills + Integrações base
- CRUD de skills
- versionamento de skill
- teste manual de skill
- conexão com OpenAI
- conexão com n8n
- teste de conectividade e armazenamento seguro de credenciais
- catálogo inicial de workflow templates

Dependências:
- Fase 1 pronta

## Fase 3 — RAG
- conexão Supabase
- validação pgvector
- knowledge sources/documents/chunks
- chunking worker
- embeddings OpenAI
- retrieval console
- bindings básicos de retrieval para skills e AI Studio

Dependências:
- OpenAI/Supabase da Fase 2

## Fase 4 — Campaigns
- audiências/snapshots
- campaign builder wizard
- template binding
- scheduler + dispatch queue
- recipients/events/runs
- vínculos com skills e automações/n8n

Dependências:
- templates existentes
- skills base da Fase 2
- event bus consolidado

## Fase 5 — Maturidade operacional
- analytics consolidados por domínio
- retries inteligentes
- observabilidade cross-module
- versionamento forte de bindings
- auditoria administrativa
- dashboards de saúde e custo

---

## 8. Backlog técnico por módulo

## 8.1 Campaigns

### Frontend
- criar rotas `app/(app)/campaigns/*`
- criar `CampaignsListView`
- criar `CampaignBuilderWizard`
- criar `CampaignDetailView`
- criar `AudiencePicker` e `TemplateVariableMapper`
- criar `CampaignMetricsPanel` e `RecipientEventsTable`

### Backend
- criar `modules/campaigns/contracts.ts`
- criar `modules/campaigns/repository.ts`
- criar `modules/campaigns/service.ts`
- criar `modules/campaigns/audience-engine.ts`
- criar `modules/campaigns/template-binding.ts`
- criar `modules/campaigns/dispatcher.ts`
- criar APIs `/api/v1/campaigns/*`

### Banco de dados
- migration `002_campaigns.sql`
- índices para recipients, runs e eventos
- constraints para deduplicação por recipient

### Integrações
- acoplar com templates HSM
- acoplar com webhook/status do provider
- acoplar com automations e n8n

### Observabilidade
- logs por batch/run
- métricas de funil
- trilha de auditoria de criação/edição/disparo

### Testes
- unit tests de audience eligibility
- unit tests de variable binding
- integration tests de scheduler/dispatch
- contract tests de APIs
- e2e do fluxo de campanha

## 8.2 n8n Integrations

### Frontend
- criar rotas `app/(app)/integrations/n8n/*`
- tela de conexão
- catálogo de workflows
- detalhe de binding/log

### Backend
- criar `modules/integrations/n8n/client.ts`
- criar `modules/integrations/n8n/service.ts`
- criar `modules/integrations/n8n/templates.ts`
- criar `modules/integrations/n8n/executions.ts`
- APIs de validate/connect/sync/install/trigger/logs

### Banco de dados
- migration `003_integrations_n8n.sql`
- tabelas de connection, instance, template, binding e execution logs

### Integrações
- autenticação por api key/basic/bearer
- sync com catálogo externo do n8n
- dispatcher de execução via worker

### Observabilidade
- health check periódico
- status de sync
- logs de request/response resumidos

### Testes
- unit tests de mapping
- integration tests do client n8n mockado
- tests de timeout/retry
- API tests de validate/connect

## 8.3 RAG

### Frontend
- expandir `/knowledge`
- criar `/knowledge/sources`
- criar `/knowledge/documents/[id]`
- criar `/knowledge/search`
- criar console de retrieval e viewer de chunks

### Backend
- criar `modules/knowledge/repository.ts`
- criar `modules/knowledge/ingestion.ts`
- criar `modules/knowledge/chunking.ts`
- criar `modules/knowledge/embeddings.ts`
- criar `modules/knowledge/retrieval.ts`
- APIs de sources/documents/search/reindex

### Banco de dados
- migration `004_knowledge_rag.sql`
- criação de tabelas e índices vetoriais
- preparação de schema compatível com Supabase

### Integrações
- client OpenAI embeddings
- client Supabase/pgvector
- loaders de upload/url/texto manual

### Observabilidade
- ingestion logs
- embedding failures
- retrieval logs e latência

### Testes
- unit tests de parser/chunker
- integration tests de ingestion
- tests de retrieval com filtros multi-tenant
- tests de fallback sem grounding

## 8.4 Skills

### Frontend
- criar `app/(app)/ai/skills/*`
- editor de prompt
- inspector de variáveis
- test console
- version history view

### Backend
- criar `modules/skills/parser.ts`
- criar `modules/skills/repository.ts`
- criar `modules/skills/service.ts`
- criar `modules/skills/executor.ts`
- APIs CRUD/publish/test/bindings/logs

### Banco de dados
- migration `005_skills.sql`
- tabelas de skills, versões, variáveis, bindings e logs

### Integrações
- runtime OpenAI
- binding com AI Studio, inbox, campaigns e automations
- consumo opcional de retrieval RAG

### Observabilidade
- logs de execução
- token usage
- falhas por schema/output

### Testes
- unit tests do parser `{{$var}}`
- tests de validação de schema
- tests de output JSON estruturado
- tests de bindings publicados

---

## 9. Critérios de aceite

## 9.1 Campaigns
- usuário consegue criar campanha em draft
- consegue associar audiência e gerar snapshot
- consegue selecionar template e mapear variáveis obrigatórias
- consegue rodar preview/dry-run
- consegue agendar ou disparar
- consegue visualizar status e métricas básicas por campanha
- respostas do recipient aparecem correlacionadas à campanha

## 9.2 n8n
- usuário consegue conectar instância válida
- sistema testa conexão e persiste status
- usuário consegue listar workflows compatíveis
- consegue instalar ou vincular workflow
- workflow pode ser disparado por evento interno
- logs de execução ficam visíveis no app

## 9.3 RAG
- usuário conecta Supabase e OpenAI
- documento gera chunks e embeddings persistidos
- busca com filtros por workspace retorna resultados relevantes
- retrieval logs ficam registrados
- skills e IA conseguem usar grounding a partir do retrieval

## 9.4 Skills
- sistema detecta placeholders automaticamente
- usuário consegue validar schema de entrada
- usuário consegue testar skill com mock payload
- skill pode ser publicada e vinculada a automação/campanha/inbox
- saída estruturada em JSON funciona com schema definido

---

## 10. Diretrizes técnicas importantes

- arquitetura modular por domínio, sem componentes gigantes compartilhando regras de negócio
- multi-tenant na base, nos índices, nas queries e nos logs
- separação explícita entre configuração (`connections`, `skills`, `sources`, `campaign drafts`) e execução (`runs`, `logs`, `events`)
- credenciais externas nunca em texto puro; usar secret storage com referência indireta
- logs, auditoria e idempotência como cidadãos de primeira classe
- versionamento obrigatório para skills, workflow templates, campaign snapshots e documentos
- runtime resiliente com filas, retry controlado, timeout e circuit breaker simples
- frontend desacoplado do runtime externo; UI conversa com APIs internas, nunca direto com n8n/OpenAI/Supabase em operações sensíveis
- IA sempre com governança: contexto explícito, grounding rastreável e bloqueios quando necessário
- evolução preparada para produção real: migrations incrementais, workers dedicados, observabilidade e gestão de falhas

---

## 11. Estrutura de arquivos recomendada

### Frontend
- `app/(app)/campaigns/page.tsx`
- `app/(app)/campaigns/new/page.tsx`
- `app/(app)/campaigns/[id]/page.tsx`
- `app/(app)/campaigns/audiences/page.tsx`
- `app/(app)/integrations/page.tsx`
- `app/(app)/integrations/n8n/page.tsx`
- `app/(app)/integrations/n8n/workflows/page.tsx`
- `app/(app)/integrations/n8n/workflows/[id]/page.tsx`
- `app/(app)/integrations/supabase/page.tsx`
- `app/(app)/integrations/openai/page.tsx`
- `app/(app)/knowledge/sources/page.tsx`
- `app/(app)/knowledge/documents/[id]/page.tsx`
- `app/(app)/knowledge/search/page.tsx`
- `app/(app)/ai/skills/page.tsx`
- `app/(app)/ai/skills/new/page.tsx`
- `app/(app)/ai/skills/[id]/page.tsx`
- `app/(app)/ai/skills/[id]/test/page.tsx`

### Backend/API
- `app/api/v1/campaigns/route.ts`
- `app/api/v1/campaigns/[id]/route.ts`
- `app/api/v1/campaigns/[id]/launch/route.ts`
- `app/api/v1/campaigns/[id]/preview/route.ts`
- `app/api/v1/campaigns/[id]/events/route.ts`
- `app/api/v1/integrations/n8n/connect/route.ts`
- `app/api/v1/integrations/n8n/validate/route.ts`
- `app/api/v1/integrations/n8n/workflows/route.ts`
- `app/api/v1/integrations/n8n/workflows/[id]/install/route.ts`
- `app/api/v1/integrations/supabase/connect/route.ts`
- `app/api/v1/integrations/openai/connect/route.ts`
- `app/api/v1/knowledge/sources/route.ts`
- `app/api/v1/knowledge/documents/[id]/route.ts`
- `app/api/v1/knowledge/search/route.ts`
- `app/api/v1/skills/route.ts`
- `app/api/v1/skills/[id]/route.ts`
- `app/api/v1/skills/[id]/test/route.ts`
- `app/api/v1/skills/[id]/publish/route.ts`

### Domínio
- `modules/campaigns/*`
- `modules/integrations/n8n/*`
- `modules/integrations/openai/*`
- `modules/integrations/supabase/*`
- `modules/knowledge/*`
- `modules/skills/*`

### Infraestrutura
- `db/migrations/002_campaigns.sql`
- `db/migrations/003_integrations_n8n.sql`
- `db/migrations/004_knowledge_rag.sql`
- `db/migrations/005_skills.sql`
- `scripts/worker.ts` expandido com registradores de filas por domínio

---

## 12. Resultado esperado após implementação

Ao final dessas entregas, o produto passa a ter:
- módulo real de campanhas outbound orientado a template e audiência
- backend operacional externo via n8n, sem acoplamento direto do frontend ao runtime do cliente
- base de conhecimento com RAG rastreável e multi-tenant
- skills versionáveis e reutilizáveis com prompts parametrizados
- integração coerente entre inbox, automations, knowledge, templates e AI Studio
- base pronta para evolução para produção com governança, logs e observabilidade

Confirmado para execução.