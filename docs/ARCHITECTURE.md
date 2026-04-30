# Architecture — Omnichannel Commerce Automation Platform 2026

## 1. Architectural overview

A plataforma deve ser construída como um sistema orientado a eventos, multi-tenant e modular, com separação clara entre:

- ingestão de canais
- core conversacional
- automações
- IA/RAG
- integrações de e-commerce
- analytics e observabilidade

## 2. High-level domains

### 2.1 Channel ingestion layer
Responsável por:
- receber webhooks da Meta e outros canais
- validar assinatura
- normalizar eventos
- garantir idempotência
- publicar eventos internos

### 2.2 Conversation core
Responsável por:
- contatos
- conversas
- mensagens
- participantes
- states/status
- assignment e colaboração
- timeline de eventos

### 2.3 Automation engine
Responsável por:
- triggers
- execução de workflows
- delays
- branches
- ações internas/externas
- retries e DLQ

### 2.4 AI orchestration layer
Responsável por:
- prompts por caso de uso
- policy checks
- modelos e fallback
- tool calling interno
- grounding via RAG e dados operacionais

### 2.5 Knowledge / RAG services
Responsável por:
- ingestão
- chunking
- embeddings
- vector search
- reranking
- source attribution

### 2.6 Commerce integration layer
Responsável por:
- pedidos
- pagamentos
- logística
- catálogo
- clientes
- eventos do e-commerce

### 2.7 Analytics layer
Responsável por:
- métricas operacionais
- eventos de produto
- dashboards
- agregações e exportações

## 3. Suggested service topology

### Option recommended for initial scale

- **API Gateway / BFF**
- **Auth / Identity service**
- **Tenant service**
- **Contacts service**
- **Conversation service**
- **Messaging delivery service**
- **Channel adapters service**
- **Workflow engine service**
- **AI orchestration service**
- **Knowledge ingestion service**
- **Search / RAG query service**
- **Commerce connectors service**
- **Template sync service**
- **Analytics pipeline**
- **Notification/internal events service**

No início, parte disso pode estar agrupada em um modular monolith com fronteiras internas bem definidas.

## 4. Data and infra building blocks

### Primary stores
- relational DB para entidades transacionais
- object storage para mídia, documentos e exports
- queue/broker para eventos assíncronos
- cache para sessões, resoluções frequentes e rate-limit state
- vector store para embeddings e retrieval
- analytics warehouse opcional conforme maturidade

### Typical stack direction
- Postgres
- Redis
- Kafka/NATS/RabbitMQ/SQS conforme estratégia
- S3-compatible object storage
- OpenSearch/ClickHouse/warehouse para analytics e busca operacional, conforme necessidade
- vector DB dedicado ou pgvector no início

## 5. WhatsApp official integration architecture

### Inbound
1. Meta webhook recebe evento
2. webhook gateway valida assinatura
3. evento é normalizado
4. idempotency key é checada
5. evento é persistido e publicado
6. conversation core atualiza estado/thread
7. automations e IA são acionadas conforme regras

### Outbound
1. usuário/fluxo decide enviar
2. policy engine valida janela e tipo de mensagem
3. template resolver injeta variáveis
4. delivery service chama Graph API
5. status assíncronos retornam via webhook
6. conversation timeline é atualizada

## 6. Event model recommendation

Tratar eventos como first-class citizens.

Exemplos:
- `message.received`
- `message.sent`
- `message.delivered`
- `message.read`
- `conversation.opened`
- `conversation.assigned`
- `conversation.resolved`
- `template.approved`
- `workflow.triggered`
- `workflow.step_succeeded`
- `workflow.step_failed`
- `order.updated`
- `payment.approved`
- `shipment.delayed`
- `rag.ingestion.completed`
- `ai.reply_suggested`

## 7. Multi-tenant strategy

- tenant_id em todas as entidades críticas
- isolamento rígido em authz, queries, indexing e storage paths
- keys e secrets por tenant ou por integration context
- quotas e rate limits por tenant/plano
- auditoria por tenant e usuário

## 8. Security and compliance

- assinatura e verificação de webhook
- secrets manager
- RBAC forte
- trilha de auditoria imutável sempre que possível
- criptografia em trânsito e em repouso
- retenção configurável
- políticas de masking/redaction para dados sensíveis
- base LGPD com consentimento, finalidade e retenção

## 9. Reliability concerns

- idempotência de webhook e reprocessamento
- filas para burst handling
- fallback de provider/modelo na IA
- circuit breakers para integrações instáveis
- DLQ + replay
- backpressure control
- bulkheads entre módulos pesados

## 10. RAG architecture stance

RAG não deve depender só de FAQ livre. Deve combinar:

- conteúdo não estruturado
- políticas estruturadas
- dados transacionais de pedidos/pagamentos
- catálogo e atributos de produto
- contexto atual da conversa
- memória operacional aprovada

### Query plan sugerido
1. entender intenção
2. definir filtros de tenant/canal/idioma/marca
3. buscar fontes relevantes
4. reranquear
5. compor contexto curto e confiável
6. gerar resposta com citation map

## 11. Deployment stance

### Phase 1
- modular monolith + workers + filas
- infra simples porém production-grade

### Phase 2
- extração dos módulos mais críticos
- analytics separado
- AI/RAG escalados separadamente

### Phase 3
- domain services desacoplados e escaláveis
- multi-region ou estratégia regional se necessário

## 12. Recommended architecture opinion

O melhor caminho é **não começar com microservices demais**. Começar com um **modular monolith orientado a eventos**, mais workers especializados, dá velocidade e mantém boa evolução. O que não pode faltar desde o início é:

- contratos de evento bem definidos
- idempotência
- observabilidade
- separação forte de domínios
