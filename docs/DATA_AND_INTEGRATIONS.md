# Data and Integrations — Omnichannel Commerce Automation Platform 2026

## 1. Core data domains

### Identity and org
- tenants
- workspaces
- users
- teams
- roles
- permissions

### Customer
- contacts
- companies
- identities (phone, email, channel ids)
- consent records
- tags
- custom attributes

### Conversation
- conversations
- messages
- participants
- notes
- events
- assignments
- SLAs

### Messaging channel
- channel accounts
- WhatsApp business accounts
- phone numbers
- templates
- delivery statuses
- webhooks

### Automation
- workflows
- workflow versions
- triggers
- executions
- step executions
- errors
- replays

### AI/RAG
- knowledge sources
- documents
- chunks
- embeddings
- retrieval logs
- prompts/policies
- AI generations

### Commerce
- customers external refs
- orders
- order items
- payments
- shipments
- returns
- incidents

## 2. Entity relationships

- um tenant possui múltiplos workspaces
- um workspace possui múltiplos canais e números
- um contato pode participar de múltiplas conversas
- uma conversa possui múltiplas mensagens e eventos
- um contato pode ter múltiplos pedidos
- workflows observam eventos de conversa e de comércio
- AI e RAG leem fontes aprovadas e contexto do workspace

## 3. Integration categories

### Official messaging
- WhatsApp Business Platform (Cloud API / Graph API / Webhooks)
- Meta template sync and quality status

### Ecommerce platforms
- Shopify
- WooCommerce
- Nuvemshop
- VTEX
- Tray
- APIs custom

### Support/ops ecosystem
- ERPs
- CRMs
- helpdesk legados
- WMS/logística
- gateways de pagamento

### Automation ecosystem
- generic webhooks
- Zapier/Make/n8n connectors opcionais
- internal event subscriptions

## 4. Integration design principles

- contratos explícitos
- idempotência
- retries
- observabilidade
- versionamento
- isolamento por tenant
- mapeamento de credenciais por conector

## 5. Webhook strategy

### Inbound webhooks
- validate signature
- normalize payload
- persist raw event
- transform into internal event
- ack quickly
- process asynchronously

### Outbound webhooks
- emitir eventos de negócio relevantes
- assinaturas HMAC opcionais
- retries exponenciais
- logs por destino

## 6. Commerce event examples

- `cart.abandoned`
- `checkout.started`
- `payment.failed`
- `payment.approved`
- `order.created`
- `order.paid`
- `order.fulfilled`
- `shipment.delayed`
- `order.delivered`
- `return.requested`
- `refund.completed`

## 7. Data governance

- retenção por tipo de dado
- opt-in/consentimento quando aplicável
- minimização de dados
- export/delete do titular
- logs de acesso a dados sensíveis

## 8. Recommendation

A modelagem deve nascer **event-first e conversation-centric**, mas enriquecida por entidades de e-commerce. Esse é o ponto que transforma uma inbox comum em uma plataforma operacional de verdade.
