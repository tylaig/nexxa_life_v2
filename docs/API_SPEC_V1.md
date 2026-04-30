# API_SPEC_V1

## Objetivo

Definir a API v1 inicial para transformar a UI atual em produto funcional, preservando o foco em:
- Inbox
- WhatsApp oficial
- templates Meta
- contexto de pedido
- integrações

Convenções gerais:
- prefixo: `/api/v1`
- JSON como formato padrão
- datas em ISO-8601 UTC
- autenticação por sessão/token no BFF
- escopo resolvido pelo backend via contexto da sessão

---

## 1. Convenções transversais

### Headers recomendados
- `X-Request-Id`
- `X-Workspace-Id` quando houver troca explícita de workspace
- `Idempotency-Key` para operações críticas de envio/processamento

### Envelope de sucesso

```json
{
  "item": {}
}
```

ou

```json
{
  "items": [],
  "page": 1,
  "pageSize": 20,
  "total": 143
}
```

### Envelope de erro

```json
{
  "error": {
    "code": "validation_error",
    "message": "content is required",
    "details": {}
  }
}
```

---

## 2. Inbox / Conversations

## 2.1 List conversations

`GET /api/v1/conversations`

Query params:
- `status`
- `assignee=me|unassigned|{userId}`
- `teamId`
- `channelAccountId`
- `priority`
- `search`
- `page`
- `pageSize`

Resposta:

```json
{
  "items": [
    {
      "id": "conv_001",
      "contact": {
        "id": "c_001",
        "name": "Juliana Souza",
        "phone": "+5511984217732",
        "isVip": true
      },
      "status": "open",
      "priority": "high",
      "preview": "Meu pedido está atrasado.",
      "unreadCount": 2,
      "lastActivityAt": "2026-04-28T01:00:00Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 1
}
```

## 2.2 Get conversation detail

`GET /api/v1/conversations/{conversationId}`

Retorna:
- conversa completa
- mensagens paginadas iniciais
- contexto do contato
- vínculo de pedido principal
- sugestão de IA se disponível

## 2.3 Send message

`POST /api/v1/conversations/{conversationId}/messages`

Body:

```json
{
  "content": "Seu pedido foi priorizado.",
  "mode": "reply",
  "senderName": "Você"
}
```

Regras:
- `mode=reply` gera outbound
- `mode=note` gera nota interna
- exigir `Idempotency-Key` quando houver provider real

Resposta:

```json
{
  "item": {
    "id": "conv_001",
    "status": "pending_customer",
    "preview": "Seu pedido foi priorizado.",
    "messages": []
  }
}
```

## 2.4 Update conversation status

`POST /api/v1/conversations/{conversationId}/status`

Body:

```json
{
  "status": "resolved"
}
```

Status válidos:
- `open`
- `pending_customer`
- `pending_internal`
- `in_automation`
- `escalated`
- `resolved`
- `snoozed`

## 2.5 Assign conversation

`POST /api/v1/conversations/{conversationId}/assign`

Body:

```json
{
  "userId": "u_123",
  "teamId": "team_support",
  "reason": "handoff_from_automation"
}
```

## 2.6 Update tags

`POST /api/v1/conversations/{conversationId}/tags`

Body:

```json
{
  "add": ["vip", "atraso-logistico"],
  "remove": ["novo"]
}
```

## 2.7 Link order to conversation

`POST /api/v1/conversations/{conversationId}/orders/link`

Body:

```json
{
  "orderId": "order_123",
  "linkType": "primary"
}
```

---

## 3. Contacts

## 3.1 List contacts

`GET /api/v1/contacts`

Filtros:
- `search`
- `tag`
- `segment`
- `vip=true|false`
- `page`
- `pageSize`

## 3.2 Get contact detail

`GET /api/v1/contacts/{contactId}`

Retorna:
- perfil
- identities
- tags
- consentimentos
- últimas conversas
- últimos pedidos

## 3.3 Update contact

`PATCH /api/v1/contacts/{contactId}`

Body parcial:

```json
{
  "fullName": "Juliana Souza",
  "languageCode": "pt-BR",
  "city": "São Paulo"
}
```

## 3.4 Update contact consent

`POST /api/v1/contacts/{contactId}/consents`

Body:

```json
{
  "consentType": "marketing_whatsapp",
  "status": "opt_in",
  "source": "checkout"
}
```

---

## 4. Orders

## 4.1 List orders

`GET /api/v1/orders`

Filtros:
- `contactId`
- `paymentStatus`
- `fulfillmentStatus`
- `search`
- `page`
- `pageSize`

## 4.2 Get order detail

`GET /api/v1/orders/{orderId}`

Retorna:
- cabeçalho do pedido
- itens
- pagamentos
- shipments
- timeline/eventos
- conversas relacionadas

## 4.3 Search order by number

`GET /api/v1/orders/search?query=GS-2741`

---

## 5. Templates Meta

## 5.1 List templates

`GET /api/v1/templates`

Filtros:
- `channelAccountId`
- `status`
- `category`
- `languageCode`
- `search`

## 5.2 Sync templates

`POST /api/v1/templates/sync`

Body:

```json
{
  "channelAccountId": "ca_001"
}
```

## 5.3 Send template to contact/conversation

`POST /api/v1/templates/{templateId}/send`

Body:

```json
{
  "conversationId": "conv_001",
  "contactId": "c_001",
  "variables": {
    "first_name": "Juliana",
    "order_number": "GS-2741"
  }
}
```

Regras:
- validar janela e elegibilidade
- registrar `template_send_log`
- usar `Idempotency-Key`

---

## 6. Integrations

## 6.1 List connections

`GET /api/v1/integrations`

## 6.2 Create/update connection

`POST /api/v1/integrations`

Body exemplo WhatsApp:

```json
{
  "provider": "meta",
  "connectionType": "whatsapp_cloud_api",
  "displayName": "WABA Games Safari",
  "workspaceId": "ws_games_safari",
  "config": {
    "businessAccountId": "123",
    "phoneNumberId": "456"
  },
  "credentials": {
    "accessToken": "secret"
  }
}
```

## 6.3 Validate connection

`POST /api/v1/integrations/{connectionId}/validate`

## 6.4 Get connection health

`GET /api/v1/integrations/{connectionId}/health`

---

## 7. Channel accounts / WhatsApp

## 7.1 List channel accounts

`GET /api/v1/channel-accounts`

## 7.2 Get channel account detail

`GET /api/v1/channel-accounts/{channelAccountId}`

## 7.3 Refresh quality/status

`POST /api/v1/channel-accounts/{channelAccountId}/refresh`

---

## 8. Automations

## 8.1 List automations

`GET /api/v1/automations`

## 8.2 Get automation detail

`GET /api/v1/automations/{automationId}`

## 8.3 Activate/pause automation

`POST /api/v1/automations/{automationId}/status`

Body:

```json
{
  "status": "active"
}
```

## 8.4 List automation executions

`GET /api/v1/automation-executions?automationId=auto_001`

---

## 9. Knowledge / AI assistiva

## 9.1 List knowledge sources

`GET /api/v1/knowledge/sources`

## 9.2 Create knowledge source

`POST /api/v1/knowledge/sources`

## 9.3 Trigger ingest

`POST /api/v1/knowledge/sources/{sourceId}/ingest`

## 9.4 Get AI suggestion for conversation

`POST /api/v1/ai/conversations/{conversationId}/suggestions`

Body opcional:

```json
{
  "mode": "reply"
}
```

Resposta:

```json
{
  "item": {
    "draft": "Olá Juliana, vimos aqui que seu pedido GS-2741...",
    "confidence": 0.87,
    "sources": [
      { "type": "order", "title": "Pedido GS-2741" },
      { "type": "policy", "title": "Política de atraso logístico" }
    ]
  }
}
```

---

## 10. Analytics operacional mínimo

## 10.1 Inbox metrics

`GET /api/v1/analytics/inbox/summary`

Campos esperados:
- openConversations
- firstResponseTimeMinutes
- resolutionRate
- slaBreachedCount
- templateSendCount
- deliveryFailureRate

---

## 11. Webhooks de entrada

## 11.1 Meta webhook

`POST /api/v1/webhooks/meta`

Responsabilidades:
- validar assinatura
- persistir raw ingest
- deduplicar
- normalizar eventos
- enfileirar processamento

## 11.2 Shopify webhook

`POST /api/v1/webhooks/shopify`

Responsabilidades análogas.

---

## 12. Prioridade de implementação da API

### P0
1. `GET /conversations`
2. `GET /conversations/{id}`
3. `POST /conversations/{id}/messages`
4. `POST /conversations/{id}/status`
5. `GET /contacts/{id}`
6. `GET /orders/{id}`
7. `GET /templates`
8. `POST /templates/{id}/send`
9. `GET /integrations`
10. `POST /integrations`

### P1
- assign
- tags
- sync templates
- validate integration
- webhooks
- automations
- ai suggestions

---

## 13. Recomendação final

A API v1 deve nascer como BFF interno, mas já com contratos limpos o suficiente para permitir:
- persistência real
- integração oficial Meta
- automações orientadas a eventos
- futura separação por serviços, se um dia for necessário
