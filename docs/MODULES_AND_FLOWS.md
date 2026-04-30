# Modules and Flows — Omnichannel Commerce Automation Platform 2026

## 1. Product modules

### 1.1 Inbox and collaboration
- shared inbox
- team inboxes
- assignments
- collision detection / presence
- notes and mentions
- SLAs and priorities
- saved views

### 1.2 Contacts and companies
- contact profiles
- custom attributes
- segments
- consent and preferences
- company accounts

### 1.3 Channel hub
- WhatsApp official numbers
- future channels
- channel health
- webhook diagnostics
- message status monitoring

### 1.4 Template center
- Meta templates
- snippets/macros
- reusable content blocks
- localization and variables

### 1.5 Automation studio
- event triggers
- conditional logic
- delays
- API/webhook actions
- internal actions
- AI steps
- flow testing and logs

### 1.6 AI studio
- copilots
- reply suggestions
- classification policies
- tone rules
- escalation rules
- prompt/config profiles

### 1.7 Knowledge hub
- docs and policies
- ecommerce FAQs
- product catalog enrichment
- versioned knowledge sources

### 1.8 Commerce operations
- orders
- payments
- shipments
- returns/refunds
- incidents and exceptions

### 1.9 Analytics and quality
- ops dashboards
- revenue attribution
- automation performance
- template performance
- QA review

## 2. Essential flows

### Flow A — inbound routing
1. mensagem recebida
2. enrich do contato
3. detecção de intenção e prioridade
4. match em regras
5. atribuição a fila/time/agente
6. possível resposta automática inicial

### Flow B — abandoned cart recovery
1. evento de carrinho abandonado
2. validação de elegibilidade
3. espera programada
4. envio de template apropriado
5. branching por resposta/sem resposta
6. handoff opcional para vendedor
7. medição de recuperação

### Flow C — payment failure rescue
1. evento de pagamento falhou
2. segmentação por motivo
3. template com novo link ou instrução
4. follow-up automático
5. escalonamento para humano se houver objeção

### Flow D — order status automation
1. evento de pedido atualizado
2. decisão por tipo de evento
3. envio de atualização transacional
4. abertura de exceção se atraso crítico
5. entrada em fila especializada

### Flow E — support bot with escalation
1. cliente pergunta
2. classificador identifica tema
3. RAG monta base de resposta
4. resposta automática assistida por policy
5. se confiança baixa, escalar
6. resumo entregue ao humano

### Flow F — VIP customer handling
1. contato reconhecido como VIP/high value
2. regra de prioridade especial
3. SLA diferenciado
4. sugestão de compensação/personalização

## 3. Workflow building blocks

### Triggers
- message received
- message contains intent/tag/entity
- conversation opened/resolved
- order created/updated
- payment approved/failed
- shipment delayed/delivered
- template status changed
- webhook/custom event
- schedule/time-based

### Conditions
- canal
- número
- idioma
- tag
- segmento
- pedido/status
- valor do pedido
- tempo sem resposta
- score de confiança da IA
- horário/janela operacional

### Actions
- enviar mensagem/template
- atribuir fila/agente
- adicionar/remover tag
- atualizar atributos
- criar nota interna
- chamar API
- aguardar
- branch
- invocar etapa de IA
- encerrar fluxo

## 4. Human handoff model

Todo fluxo com IA precisa suportar handoff limpo:

- histórico preservado
- resumo automático
- motivo do handoff
- artigos usados pela IA
- confiança estimada
- sugestão de próxima ação

## 5. SLA and queue model

- fila por tema
- fila por marca/tenant
- fila por prioridade
- fila por exceção operacional
- políticas de rebalanceamento
- escalonamento por tempo e risco

## 6. Operational views that matter

- novas conversas sem dono
- aguardando cliente
- aguardando operação interna
- casos VIP
- atraso logístico
- pagamento falho
- risco de churn
- automações com erro

## 7. Recommendation

O produto deve lançar com foco nos fluxos que mais geram ROI em e-commerce:

- pré-venda
- abandono de carrinho
- pagamento falho
- pós-venda/transacional
- suporte com políticas e pedidos

Isso cria valor comercial rápido e prova o diferencial da plataforma.
