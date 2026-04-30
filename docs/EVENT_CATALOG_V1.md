# EVENT_CATALOG_V1

## Objetivo

Definir o catálogo inicial de eventos para operar a plataforma de forma orientada a eventos, com foco em:
- WhatsApp oficial
- contexto de pedidos
- automações prioritárias
- trilha auditável
- idempotência

---

## 1. Princípios

1. Todo evento normalizado deve ser imutável.
2. Todo evento relevante deve ter `event_id` único.
3. Todo evento externo deve carregar `idempotency_key`.
4. Eventos brutos e normalizados devem coexistir.
5. Eventos nunca podem cruzar tenants.
6. Eventos precisam carregar `tenant_id` e, quando aplicável, `workspace_id`.

---

## 2. Envelope canônico

```json
{
  "event_id": "evt_01J...",
  "tenant_id": "ten_001",
  "workspace_id": "ws_001",
  "aggregate_type": "conversation",
  "aggregate_id": "conv_001",
  "event_type": "message.received",
  "source": "meta.webhook",
  "idempotency_key": "meta:wamid:abc123",
  "correlation_id": "req_123",
  "causation_id": null,
  "occurred_at": "2026-04-28T01:00:00Z",
  "received_at": "2026-04-28T01:00:02Z",
  "payload": {}
}
```

Campos obrigatórios:
- event_id
- tenant_id
- event_type
- source
- idempotency_key
- occurred_at
- payload

---

## 3. Fontes de eventos v1

### Externas
- Meta Webhooks
- Shopify Webhooks
- gateways de pagamento
- logística/carriers

### Internas
- API/BFF
- automações
- IA assistiva/autônoma governada
- ações humanas na inbox

---

## 4. Eventos de conversa e inbox

## 4.1 conversation.created

Quando:
- nova thread criada a partir de inbound válido

Aggregate:
- conversation

Payload mínimo:
- conversation_id
- contact_id
- channel_account_id
- initial_message_id

## 4.2 conversation.assigned

Quando:
- conversa atribuída a usuário/time

Payload mínimo:
- conversation_id
- assigned_user_id nullable
- assigned_team_id nullable
- assigned_by_user_id
- reason

## 4.3 conversation.status_changed

Quando:
- open -> pending_customer, resolved, snoozed etc.

Payload mínimo:
- conversation_id
- previous_status
- new_status
- actor_type
- actor_user_id nullable

## 4.4 conversation.priority_changed

Payload mínimo:
- conversation_id
- previous_priority
- new_priority

## 4.5 note.added

Quando:
- nota interna criada

Payload mínimo:
- conversation_id
- message_id
- actor_user_id

---

## 5. Eventos de mensagem / WhatsApp

## 5.1 message.received

Quando:
- mensagem inbound recebida e normalizada

Payload mínimo:
- message_id
- conversation_id
- contact_id
- channel_account_id
- provider_message_id
- message_type
- text_preview

Fonte típica:
- `meta.webhook`

## 5.2 message.sent

Quando:
- plataforma aceita envio outbound

Payload mínimo:
- message_id
- conversation_id
- channel_account_id
- outbound_type (`freeform`|`template`|`note`)
- provider_message_id nullable

## 5.3 message.delivery_updated

Quando:
- provider informa `sent`, `delivered`, `read`, `failed`

Payload mínimo:
- message_id
- provider_message_id
- previous_status nullable
- new_status
- failure_reason nullable

## 5.4 template.sent

Payload mínimo:
- template_id
- conversation_id nullable
- contact_id
- provider_message_id nullable
- variables

## 5.5 template.status_updated

Quando:
- Meta atualiza status/quality do template

Payload mínimo:
- template_id
- external_template_id
- previous_status
- new_status
- quality_rating nullable

---

## 6. Eventos de contato

## 6.1 contact.created
- contact_id
- primary_identity

## 6.2 contact.updated
- contact_id
- changed_fields[]

## 6.3 contact.consent_updated
- contact_id
- consent_type
- previous_status
- new_status
- source

---

## 7. Eventos de commerce

## 7.1 order.created

Payload mínimo:
- order_id
- external_order_id
- order_number
- contact_id
- total_amount_cents
- order_status

## 7.2 order.updated

Payload mínimo:
- order_id
- changed_fields[]

## 7.3 payment.failed

Payload mínimo:
- order_id
- payment_id
- method
- declined_reason
- amount_cents

## 7.4 payment.approved

Payload mínimo:
- order_id
- payment_id
- method
- amount_cents

## 7.5 shipment.created

Payload mínimo:
- shipment_id
- order_id
- carrier
- tracking_code

## 7.6 shipment.updated

Payload mínimo:
- shipment_id
- order_id
- previous_status
- new_status
- tracking_code

## 7.7 shipment.delayed

Payload mínimo:
- shipment_id
- order_id
- carrier
- eta_at
- reason nullable

## 7.8 shipment.delivered

Payload mínimo:
- shipment_id
- order_id
- delivered_at

---

## 8. Eventos de automação

## 8.1 automation.triggered

Quando:
- um evento elegível inicia um fluxo

Payload mínimo:
- automation_id
- trigger_event_id
- target_type
- target_id

## 8.2 automation.execution_started
- automation_execution_id
- automation_id

## 8.3 automation.action_executed
- automation_execution_id
- action_type
- action_result

## 8.4 automation.execution_failed
- automation_execution_id
- error_message
- failed_step

## 8.5 automation.execution_completed
- automation_execution_id
- result_summary
- revenue_attributed_cents nullable

---

## 9. Eventos de IA / RAG

## 9.1 ai.suggestion_requested
- conversation_id
- requested_by_user_id

## 9.2 ai.suggestion_generated
- conversation_id
- model_name
- confidence_score nullable
- sources_count
- policy_version

## 9.3 ai.suggestion_accepted
- conversation_id
- suggestion_log_id
- actor_user_id

## 9.4 ai.autonomous_action_blocked
- policy_name
- block_reason
- target_type
- target_id

---

## 10. Eventos de integração

## 10.1 integration.connected
- integration_connection_id
- provider

## 10.2 integration.health_changed
- integration_connection_id
- previous_health_status
- new_health_status

## 10.3 integration.sync_started
- integration_connection_id
- sync_type

## 10.4 integration.sync_completed
- integration_connection_id
- sync_type
- records_processed

## 10.5 integration.sync_failed
- integration_connection_id
- sync_type
- error_message

---

## 11. Idempotência por fonte

### Meta

Recomendação de chave:
- `meta:{provider_message_id}` para mensagens
- `meta-status:{provider_message_id}:{status}:{timestamp}` para status

### Shopify

Recomendação de chave:
- usar webhook event id quando existir
- fallback: `shopify:{topic}:{shop_domain}:{resource_id}:{updated_at}`

### Ações internas

- `ui:{request_id}:{action}`
- `automation:{execution_id}:{step}`

---

## 12. Automations prioritárias mapeadas a eventos

## 12.1 Recuperação de pagamento recusado

Trigger:
- `payment.failed`

Ações típicas:
- abrir/atualizar conversa
- enviar template com alternativa Pix
- registrar execução

## 12.2 Atualização de envio / atraso

Triggers:
- `shipment.updated`
- `shipment.delayed`
- `shipment.delivered`

Ações típicas:
- atualizar contexto da conversa
- enviar template status
- escalar se atraso crítico

## 12.3 Carrinho abandonado

Trigger futuro:
- `cart.abandoned`

Ação:
- disparo template/campanha governada

---

## 13. Pipeline de processamento recomendado

1. Receber webhook/API input
2. Validar assinatura/autorização
3. Persistir raw ingest
4. Gerar `idempotency_key`
5. Deduplicar
6. Normalizar para evento canônico
7. Persistir `domain_event`
8. Disparar handlers:
   - update read model
   - automações
   - analytics
   - auditoria

---

## 14. Eventos que devem existir primeiro

### P0
- message.received
- message.sent
- message.delivery_updated
- conversation.status_changed
- order.created
- order.updated
- payment.failed
- shipment.updated
- shipment.delayed
- template.sent
- template.status_updated

### P1
- automation.triggered
- automation.execution_started
- automation.execution_completed
- ai.suggestion_generated
- integration.sync_failed

---

## 15. Recomendação final

O catálogo v1 deve nascer pequeno, mas já disciplinado.

A vitória aqui não é ter muitos eventos.
É ter eventos confiáveis, deduplicáveis, tenant-aware e diretamente úteis para:
- inbox operacional
- templates Meta
- contexto de pedido
- automações de maior ROI
- auditoria e analytics básicos
