# PRD — Omnichannel Commerce Automation Platform 2026

## 1. Product summary

Construir uma **plataforma omnichannel de atendimento, automação e IA para e-commerce**, com foco inicial em **WhatsApp Business Platform oficial**, inbox colaborativa estilo **Intercom + Chatwoot**, automações orientadas a eventos, templates Meta, copilotos de IA, base de conhecimento com RAG e integrações operacionais para vendas, suporte, retenção e pós-venda.

A solução deve permitir que uma operação comercial ou de suporte gerencie conversas, contatos, campanhas transacionais, fluxos automatizados e atendimento assistido por IA em um só ambiente.

## 2. Problem statement

Empresas de e-commerce em 2026 enfrentam alguns gargalos recorrentes:

- atendimento fragmentado entre WhatsApp, e-mail, Instagram, chat e ferramentas internas
- dependência de operadores humanos para tarefas repetitivas
- baixa orquestração entre mensagens, CRM, pedidos, catálogo e logística
- dificuldade de usar **WhatsApp oficial** com boa UX de operação
- pouco contexto unificado para IA responder com qualidade
- automações engessadas ou excessivamente técnicas
- ausência de visão clara de funil conversacional, SLA, conversão e impacto em receita

O mercado possui ferramentas fortes em partes isoladas, mas raramente uma solução que una:

- **inbox premium de atendimento**
- **automação real de jornadas**
- **IA + RAG aplicada ao comércio**
- **governança e analytics robustos**
- **integração nativa com WhatsApp oficial e templates Meta**

## 3. Vision

Ser a camada central de relacionamento conversacional e automação operacional de marcas digitais, unindo **mensageria oficial, colaboração humana, IA operacional e dados de e-commerce**.

## 4. Product goals

### 4.1 Business goals

- reduzir custo operacional por conversa
- aumentar taxa de resposta e velocidade de atendimento
- elevar conversão em vendas originadas por conversa
- recuperar carrinhos, pagamentos e pedidos travados
- aumentar retenção e recompra por comunicação automatizada
- criar uma oferta com valor claro para SMB, mid-market e operações enterprise

### 4.2 Product goals

- entregar inbox compartilhada robusta e agradável de operar
- fornecer construtor de automações flexível e confiável
- disponibilizar IA útil para agentes e para autoatendimento
- habilitar RAG com contexto de negócio real
- suportar múltiplos números WhatsApp oficiais por tenant
- oferecer observabilidade de conversas, fluxos e performance comercial

### 4.3 User goals

#### Gestor de atendimento
- acompanhar SLAs, filas, equipes e qualidade
- distribuir trabalho de forma previsível
- reduzir gargalos e falhas de operação

#### Atendente
- responder rápido com contexto
- usar templates, snippets e IA sem perder controle
- escalar casos complexos com histórico preservado

#### Marketing/CRM
- disparar comunicações transacionais e reengajamento com compliance
- medir impacto de templates e jornadas

#### Operação de e-commerce
- conectar mensagens a pedidos, pagamentos, estoque e fulfillment
- automatizar notificações e ações pós-evento

#### Dono do negócio
- entender impacto em receita, suporte e retenção
- consolidar stack em menos ferramentas

## 5. Target customers

### 5.1 ICP inicial

- e-commerces SMB e mid-market com alto volume em WhatsApp
- operações que vendem produtos de ticket médio ou alto suporte
- lojas com recorrência, catálogo amplo ou suporte consultivo
- marcas digitais, infoprodutos, eletrônicos, games, presentes, utilidades e nichos com muito atendimento pré e pós-venda

### 5.2 Vertical focus examples

- Games Safari
- Game Box
- lojas de eletrônicos/acessórios
- cosméticos e suplementos
- moda com atendimento consultivo
- operações D2C com suporte intenso no pós-venda

## 6. Product principles

1. **Official-first**: canais oficiais sempre que possível.
2. **Human-in-control**: IA ajuda, humano governa.
3. **Conversation-native**: tudo parte do evento conversacional.
4. **Commerce-aware**: dados de pedido, catálogo e cliente fazem parte do produto.
5. **Automation without chaos**: flexível, mas auditável.
6. **Enterprise reliability**: rastreabilidade, permissão, filas, retries e logs.
7. **Operator delight**: UI rápida, clara e produtiva.

## 7. Core use cases

### 7.1 Atendimento inbound
- cliente envia mensagem no WhatsApp
- conversa cai na inbox correta
- regras classificam intenção, idioma, prioridade e time
- IA resume contexto e sugere resposta
- agente assume quando necessário

### 7.2 Pré-venda
- cliente pergunta sobre produto, estoque, prazo, meios de pagamento
- bot ou copiloto usa catálogo + FAQ + políticas + preço
- agente entra apenas em casos de objeção, exceção ou fechamento

### 7.3 Pós-venda
- pedido confirmado, faturado, atrasado, entregue ou devolvido gera eventos
- plataforma aciona mensagens e fluxos apropriados
- suporte consulta pedido sem sair da conversa

### 7.4 Recuperação de carrinho / checkout
- abandono gera evento
- fluxo escolhe janela, template e CTA
- IA personaliza abordagem dentro de limites aprovados
- analytics mede recuperação por jornada

### 7.5 Reativação e retenção
- segmentos inativos recebem campanhas compatíveis com consentimento e política do canal
- respostas voltam para a caixa compartilhada

### 7.6 Suporte com RAG
- IA consulta políticas, manuais, catálogo, histórico de pedidos e notas internas
- responde ou sugere rascunho com fonte e confiança

## 8. Scope

## 8.1 MVP scope

### Channel and inbox
- onboarding de tenant e workspaces
- conexão com WhatsApp Business Platform oficial
- suporte a múltiplos números por tenant
- inbox compartilhada com filas, assignment, tags, notas internas e status
- contatos, empresas e histórico completo de conversas
- snippets, macros e templates rápidos

### Automations
- workflow builder baseado em triggers e conditions
- gatilhos de mensagem, template, webhook, evento de pedido e evento manual
- ações de enviar template, taguear, atribuir, atualizar contato, chamar webhook e abrir task

### AI/RAG
- sugestão de resposta
- resumo de conversa
- classificação de intenção
- base de conhecimento simples com retrieval
- resposta assistida com fontes

### Commerce basics
- integração com pedidos e status
- linha do tempo operacional na conversa
- gatilhos de abandono, pagamento aprovado, envio, atraso e entrega

### Analytics
- volume por canal, fila, agente e tag
- SLA inicial
- tempo de primeira resposta
- taxa de resolução
- métricas de template e workflow

## 8.2 Post-MVP

- omnichannel adicional: Instagram DM, Facebook Messenger, webchat, e-mail e Telegram/Line conforme estratégia
- campanhas outbound mais avançadas
- CDP leve e segmentação dinâmica
- journey builder visual avançado
- voice/assistente híbrido
- quality scoring com IA
- experimentation / A/B testing em fluxos e templates
- billing por uso detalhado
- marketplace de integrações

## 8.3 Out of scope inicial

- discador telefônico tradicional
- ERP completo próprio
- WMS/TMS próprios
- full marketing automation cross-channel nível enterprise logo no primeiro release

## 9. Functional requirements

### 9.1 Tenant and workspace management
- multi-tenant com isolamento lógico e forte governança
- múltiplos workspaces por organização opcionalmente
- múltiplos números/canais por workspace
- usuários, equipes, papéis e permissões granulares

### 9.2 Contacts and customer 360
- perfil unificado do contato
- múltiplos identificadores por pessoa
- custom fields
- tags e segmentos
- vínculo com empresa, pedidos, tickets, eventos e consentimentos

### 9.3 Shared inbox
- lista de conversas com filtros avançados
- estados: open, pending, snoozed, resolved, archived
- assignee, team, priority, SLA, unread count
- notas internas, menções, colaboração e histórico de ações
- composer com mídia, template, variáveis, snippets e IA

### 9.4 WhatsApp official integration
- onboarding via Meta app / system user / WABA / phone number id
- webhooks para mensagens, status e templates
- suporte a cloud API
- envio de templates aprovados e mensagens em janela válida
- tratamento de erro de entrega, qualidade do número, limites e categorias de template

### 9.5 Template manager
- biblioteca de templates
- sincronização com Meta
- versionamento interno e status
- preview com variáveis
- analytics por template, categoria, idioma e campanha

### 9.6 Workflow automation engine
- editor visual de fluxos
- triggers, conditions, delays e branching
- ações internas e externas
- retries, dead-letter, logs e replay controlado
- testes/sandbox de fluxos

### 9.7 AI assistant layer
- sugestão de resposta contextual
- rewrite por tom
- tradução
- classificação automática
- extração de entidades
- próximos passos recomendados
- copiloto para agente e bot assistido

### 9.8 RAG knowledge system
- ingestão de PDFs, docs, URLs, políticas, FAQs, catálogo e snippets internos
- indexação vetorial + filtros estruturados
- versionamento de fonte
- citações/sources no output
- escopo por tenant/brand/canal/idioma

### 9.9 Commerce orchestration
- conectores com Shopify, WooCommerce, Nuvemshop, Tray, VTEX, APIs custom e ERPs
- timeline de pedido dentro da conversa
- eventos de pedido e pagamento
- quick actions: reenviar link, confirmar status, gerar segunda via, escalar exceção

### 9.10 Reporting and analytics
- dashboards operacionais
- dashboards comerciais por conversa
- funis de automação
- métricas de IA e RAG
- exportação e webhooks analíticos

## 10. Non-functional requirements

- alta disponibilidade para ingestão de mensagens
- processamento assíncrono com retries e idempotência
- trilha de auditoria completa
- LGPD/privacy by design
- criptografia em trânsito e em repouso
- multi-tenant seguro
- observabilidade com logs, métricas e tracing
- capacidade de lidar com picos promocionais
- UX responsiva e muito rápida para operadores

## 11. Success metrics

### 11.1 Operational
- first response time
- resolution time
- backlog por fila
- occupancy por agente
- SLA compliance

### 11.2 Commercial
- conversão por conversa
- receita assistida por atendimento
- recuperação de carrinho
- recuperação de pagamento
- recompra/reengajamento

### 11.3 Automation
- % de contatos resolvidos sem humano
- save time estimado
- completion rate de fluxos
- erro por fluxo / etapa

### 11.4 AI
- acceptance rate de sugestões
- deflection com qualidade aceitável
- grounded answer rate
- hallucination incident rate

## 12. Risks

- dependência de políticas e limites da Meta
- complexidade de UX ao unir inbox + automação + IA + analytics
- qualidade ruim de dados de origem no cliente
- expectativa exagerada de autonomia da IA
- integração difícil com stacks legados de e-commerce

## 13. Open questions

- o produto terá forte foco Brasil/LATAM no início ou já nascerá bilíngue/global?
- a primeira versão de campanhas outbound será operacional/transacional ou também promocional?
- billing inicial será por assento, por conversa, por número, por uso de IA ou híbrido?
- quão profundo deve ser o módulo CRM próprio no MVP?

## 14. Launch recommendation

Recomendo um **MVP forte e verticalizado para e-commerce com WhatsApp oficial**, em vez de tentar ser omnichannel total no dia 1. Isso aumenta clareza comercial, simplifica onboarding e cria diferencial real mais rápido.
