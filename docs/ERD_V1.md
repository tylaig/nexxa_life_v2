# ERD_V1

## Objetivo

Definir o modelo de dados v1 para a primeira versão funcional da plataforma, priorizando:
- Inbox operacional
- WhatsApp Business Platform oficial
- contexto de contato + conversa + pedido
- templates Meta
- automações por evento
- auditoria e governança

---

## 1. Princípios do modelo

1. Toda entidade operacional carrega `tenant_id`.
2. Quase toda entidade operacional carrega `workspace_id`.
3. Valores monetários no backend devem usar centavos (`amount_cents`).
4. Datas em UTC/ISO.
5. Payloads externos relevantes devem ser armazenados raw + normalizados.
6. O modelo deve privilegiar `append-only logs` para eventos, mensagens e auditoria.

---

## 2. Entidades centrais

## 2.1 Tenant

Campos:
- id
- slug
- legal_name
- display_name
- status
- plan_code
- default_timezone
- default_locale
- created_at
- updated_at

Relacionamentos:
- 1:N workspaces
- 1:N users via memberships
- 1:N integration_connections
- 1:N audit_logs

---

## 2.2 Workspace

Campos:
- id
- tenant_id
- slug
- name
- status
- timezone
- locale
- currency_code
- created_at
- updated_at

Relacionamentos:
- N:1 tenant
- 1:N teams
- 1:N channel_accounts
- 1:N contacts
- 1:N conversations
- 1:N orders
- 1:N templates_local_cache
- 1:N automations
- 1:N knowledge_sources

---

## 2.3 User

Campos:
- id
- email
- full_name
- avatar_url
- status
- last_login_at
- created_at
- updated_at

Relacionamentos:
- 1:N workspace_memberships
- 1:N audit_logs como actor
- 1:N conversation_assignments

---

## 2.4 WorkspaceMembership

Campos:
- id
- tenant_id
- workspace_id
- user_id
- role
- status
- invited_by_user_id
- joined_at
- created_at
- updated_at

Índices:
- unique(workspace_id, user_id)
- index(tenant_id, workspace_id, role)

---

## 2.5 Team

Campos:
- id
- tenant_id
- workspace_id
- name
- code
- status
- created_at
- updated_at

Relacionamentos:
- N:1 workspace
- 1:N conversations
- N:N memberships (pode ser tabela auxiliar team_memberships)

---

## 2.6 ChannelAccount

Representa um canal concreto conectado, começando por WhatsApp oficial.

Campos:
- id
- tenant_id
- workspace_id
- channel_type
- provider
- display_name
- phone_number_e164
- external_business_account_id
- external_phone_number_id
- quality_rating
- throughput_tier
- status
- health_status
- last_webhook_at
- created_at
- updated_at

Relacionamentos:
- N:1 workspace
- 1:N conversations
- 1:N template_syncs
- 1:N inbound provider events

---

## 2.7 Contact

Campos:
- id
- tenant_id
- workspace_id
- external_ref
- full_name
- primary_email
- primary_phone_e164
- language_code
- city
- state
- country_code
- segment_label
- total_orders_count
- lifetime_value_cents
- first_seen_at
- last_seen_at
- is_vip
- status
- created_at
- updated_at

Relacionamentos:
- 1:N contact_identities
- 1:N conversations
- 1:N orders
- N:N tags
- 1:N consent_records

---

## 2.8 ContactIdentity

Guarda identidades por canal/provedor.

Campos:
- id
- tenant_id
- workspace_id
- contact_id
- channel_type
- provider
- external_user_id
- phone_e164
- handle
- is_primary
- created_at
- updated_at

Índices:
- unique(workspace_id, provider, external_user_id)
- unique(workspace_id, phone_e164, channel_type)

---

## 2.9 ContactTag

Campos:
- id
- tenant_id
- workspace_id
- label
- color
- created_at
- updated_at

Tabela de relação:
- contact_tag_links
  - contact_id
  - tag_id
  - linked_at

---

## 2.10 ConsentRecord

Campos:
- id
- tenant_id
- workspace_id
- contact_id
- consent_type
- channel_type
- status
- source
- evidence_ref
- captured_at
- revoked_at
- created_at

Uso:
- marketing opt-in
- consentimento de comunicações
- base para governança LGPD

---

## 2.11 Conversation

Campos:
- id
- tenant_id
- workspace_id
- channel_account_id
- contact_id
- current_assignee_user_id nullable
- current_team_id nullable
- external_thread_id
- subject nullable
- status
- priority
- detected_intent
- detected_sentiment
- preview_text
- unread_count
- first_message_at
- last_message_at
- sla_due_at nullable
- last_customer_message_at nullable
- last_agent_message_at nullable
- is_ai_handled
- created_at
- updated_at
- resolved_at nullable

Relacionamentos:
- N:1 contact
- N:1 channel_account
- 1:N messages
- 1:N conversation_events
- 1:N ai_suggestion_logs
- N:1 current order link opcional via conversation_order_links

---

## 2.12 ConversationParticipant / Assignment History

Recomendação: guardar histórico separado.

Tabela `conversation_assignments`
- id
- tenant_id
- workspace_id
- conversation_id
- assigned_user_id nullable
- assigned_team_id nullable
- assigned_by_user_id
- reason
- created_at

---

## 2.13 Message

Campos:
- id
- tenant_id
- workspace_id
- conversation_id
- provider_message_id nullable
- direction
- message_type
- sender_type
- sender_user_id nullable
- sender_contact_id nullable
- sender_label
- text_content
- normalized_payload_json
- raw_payload_json nullable
- status
- sent_at nullable
- delivered_at nullable
- read_at nullable
- failed_at nullable
- failure_reason nullable
- is_template_message
- template_id nullable
- created_at

Relacionamentos:
- N:1 conversation
- 1:N message_attachments
- 1:N message_status_events

---

## 2.14 MessageAttachment

Campos:
- id
- tenant_id
- workspace_id
- message_id
- attachment_type
- storage_url
- mime_type
- file_name
- file_size_bytes
- created_at

---

## 2.15 MessageStatusEvent

Campos:
- id
- tenant_id
- workspace_id
- message_id
- provider_message_id
- provider_status
- occurred_at
- raw_payload_json
- created_at

---

## 2.16 ConversationEvent
n
Log canônico de fatos da conversa.

Campos:
- id
- tenant_id
- workspace_id
- conversation_id
- event_type
- actor_type
- actor_user_id nullable
- payload_json
- occurred_at
- created_at

Exemplos:
- conversation.created
- conversation.assigned
- conversation.resolved
- conversation.snoozed
- ai.suggestion.generated

---

## 2.17 Order

Campos:
- id
- tenant_id
- workspace_id
- contact_id
- external_order_id
- order_number
- source_platform
- currency_code
- total_amount_cents
- subtotal_amount_cents
- shipping_amount_cents
- discount_amount_cents
- payment_status
- fulfillment_status
- order_status
- risk_status
- placed_at
- cancelled_at nullable
- created_at
- updated_at

Relacionamentos:
- N:1 contact
- 1:N order_items
- 1:N payments
- 1:N shipments
- 1:N order_events
- N:N conversations via conversation_order_links

---

## 2.18 OrderItem

Campos:
- id
- tenant_id
- workspace_id
- order_id
- external_line_item_id
- sku
- product_id nullable
- variant_id nullable
- name
- quantity
- unit_price_cents
- total_price_cents
- image_url nullable
- created_at

---

## 2.19 Payment

Campos:
- id
- tenant_id
- workspace_id
- order_id
- provider
- external_payment_id
- method
- status
- amount_cents
- declined_reason nullable
- paid_at nullable
- failed_at nullable
- created_at
- updated_at

---

## 2.20 Shipment

Campos:
- id
- tenant_id
- workspace_id
- order_id
- carrier
- service_level nullable
- tracking_code
- tracking_url nullable
- shipment_status
- shipped_at nullable
- delivered_at nullable
- eta_at nullable
- last_tracking_sync_at nullable
- created_at
- updated_at

---

## 2.21 OrderEvent

Campos:
- id
- tenant_id
- workspace_id
- order_id
- event_type
- source
- payload_json
- occurred_at
- created_at

Exemplos:
- order.created
- payment.failed
- shipment.delayed
- shipment.delivered

---

## 2.22 ConversationOrderLink

Campos:
- id
- tenant_id
- workspace_id
- conversation_id
- order_id
- link_type
- linked_by
- created_at

Uso:
- uma conversa pode referenciar mais de um pedido
- um pedido pode aparecer em múltiplas conversas

---

## 2.23 Template

Cache local dos templates aprovados pela Meta.

Campos:
- id
- tenant_id
- workspace_id
- channel_account_id
- external_template_id
- name
- language_code
- category
- status
- quality_rating
- body_text
- header_type nullable
- footer_text nullable
- buttons_json nullable
- variables_json nullable
- last_synced_at
- created_at
- updated_at

---

## 2.24 TemplateSendLog

Campos:
- id
- tenant_id
- workspace_id
- template_id
- conversation_id nullable
- contact_id
- provider_message_id nullable
- variables_json
- send_status
- sent_at nullable
- delivered_at nullable
- read_at nullable
- failed_at nullable
- failure_reason nullable
- created_at

---

## 2.25 IntegrationConnection

Campos:
- id
- tenant_id
- workspace_id nullable
- provider
- connection_type
- display_name
- status
- encrypted_credentials_ref
- config_json
- health_status
- last_success_at nullable
- last_error_at nullable
- last_error_message nullable
- created_at
- updated_at

---

## 2.26 IntegrationEventIngest

Tabela de entrada bruta para webhooks.

Campos:
- id
- tenant_id nullable
- workspace_id nullable
- integration_connection_id nullable
- source
- external_event_id nullable
- idempotency_key
- signature_valid
- payload_json
- headers_json
- received_at
- processed_at nullable
- processing_status
- error_message nullable

---

## 2.27 DomainEvent

Catálogo operacional normalizado.

Campos:
- id
- tenant_id
- workspace_id nullable
- aggregate_type
- aggregate_id
- event_type
- source
- idempotency_key
- correlation_id nullable
- causation_id nullable
- payload_json
- occurred_at
- created_at

---

## 2.28 Automation

Campos:
- id
- tenant_id
- workspace_id
- name
- code
- category
- status
- trigger_type
- config_json
- created_by_user_id
- created_at
- updated_at

---

## 2.29 AutomationExecution

Campos:
- id
- tenant_id
- workspace_id
- automation_id
- trigger_event_id nullable
- target_contact_id nullable
- target_conversation_id nullable
- target_order_id nullable
- status
- started_at
- finished_at nullable
- result_summary nullable
- error_message nullable
- revenue_attributed_cents nullable
- created_at

---

## 2.30 KnowledgeSource

Campos:
- id
- tenant_id
- workspace_id
- name
- source_type
- status
- external_ref nullable
- config_json
- created_by_user_id
- created_at
- updated_at

---

## 2.31 KnowledgeDocument

Campos:
- id
- tenant_id
- workspace_id
- knowledge_source_id
- title
- source_uri nullable
- mime_type nullable
- status
- checksum_sha256 nullable
- version_label nullable
- ingested_at nullable
- created_at
- updated_at

---

## 2.32 KnowledgeChunk

Campos:
- id
- tenant_id
- workspace_id
- knowledge_document_id
- chunk_index
- content_text
- embedding_ref nullable
- token_count
- metadata_json
- created_at

---

## 2.33 AiSuggestionLog

Campos:
- id
- tenant_id
- workspace_id
- conversation_id
- message_id nullable
- model_name
- policy_version
- suggestion_text
- confidence_score nullable
- grounding_sources_json
- action_taken
- created_at

---

## 2.34 AuditLog

Campos:
- id
- tenant_id
- workspace_id nullable
- actor_user_id nullable
- actor_type
- action
- entity_type
- entity_id
- before_json nullable
- after_json nullable
- request_id nullable
- ip_address nullable
- user_agent nullable
- created_at

---

## 3. Relacionamentos-chave resumidos

- tenant 1:N workspace
- workspace 1:N team
- workspace 1:N channel_account
- workspace 1:N contact
- contact 1:N contact_identity
- contact 1:N conversation
- conversation 1:N message
- conversation N:N order
- contact 1:N order
- order 1:N order_item
- order 1:N payment
- order 1:N shipment
- workspace 1:N template
- template 1:N template_send_log
- workspace 1:N automation
- automation 1:N automation_execution
- workspace 1:N knowledge_source
- knowledge_source 1:N knowledge_document
- knowledge_document 1:N knowledge_chunk

---

## 4. Índices prioritários

### Conversations
- index(tenant_id, workspace_id, status, last_message_at desc)
- index(tenant_id, workspace_id, current_assignee_user_id, status)
- index(tenant_id, workspace_id, contact_id)
- index(tenant_id, workspace_id, channel_account_id)

### Messages
- index(tenant_id, workspace_id, conversation_id, created_at)
- unique(workspace_id, provider_message_id) where not null

### Contacts
- index(tenant_id, workspace_id, full_name)
- index(tenant_id, workspace_id, primary_phone_e164)

### Orders
- unique(workspace_id, source_platform, external_order_id)
- index(tenant_id, workspace_id, contact_id, placed_at desc)
- index(tenant_id, workspace_id, payment_status, fulfillment_status)

### Domain/Event ingestion
- unique(source, idempotency_key)
- index(tenant_id, workspace_id, event_type, occurred_at desc)

---

## 5. Particionamento futuro recomendado

Não precisa particionar no primeiro dia, mas preparar:
- `domain_events` por tempo
- `integration_event_ingest` por tempo
- `audit_logs` por tempo
- `messages` por volume/tempo em tenants maiores

---

## 6. Decisão de implementação imediata

Primeiras tabelas que devem existir no banco:
1. tenants
2. workspaces
3. users
4. workspace_memberships
5. teams
6. channel_accounts
7. contacts
8. contact_identities
9. conversations
10. messages
11. orders
12. shipments
13. templates
14. integration_connections
15. domain_events
16. audit_logs

Este é o menor núcleo útil para sair do store in-memory e preparar o WhatsApp-first operacional.
