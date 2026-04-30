# Design and UX — Omnichannel Commerce Automation Platform 2026

## 1. Product design vision

A experiência deve parecer a fusão entre:

- a **clareza operacional** do Chatwoot
- a **sofisticação de produto e onboarding** do Intercom
- a **profundidade operacional** exigida por times de e-commerce
- a **assistência contextual** de um copiloto moderno de IA

O operador deve sentir que a plataforma é:

- rápida
- confiável
- limpa
- colaborativa
- orientada a ação
- poderosa sem ser confusa

## 2. UX principles

1. **Inbox first** — a caixa de entrada é o centro da operação.
2. **Action in context** — tudo importante deve estar disponível sem trocar demais de tela.
3. **Progressive disclosure** — mostrar complexidade só quando necessário.
4. **AI as assistive layer** — IA ajuda, não atrapalha nem toma a interface.
5. **Operational calm** — reduzir sensação de caos em picos.
6. **Explain automation** — fluxos e estados precisam ser entendíveis.
7. **Commerce visibility** — pedido, pagamento e risco perto da conversa.

## 3. Main navigation

### Estrutura principal
- Inbox
- Contacts
- Companies
- Orders / Commerce
- Automations
- Templates
- Knowledge
- AI Studio
- Analytics
- Integrations
- Settings

## 4. Core screen concepts

### 4.1 Inbox

Layout em 3 colunas:

- **coluna 1:** filtros, filas, views salvas, inboxes e teams
- **coluna 2:** lista de conversas com estados e indicadores
- **coluna 3:** thread da conversa + composer + painel lateral contextual

#### Painel lateral contextual
- dados do contato
- tags e atributos
- pedido mais recente
- eventos recentes
- notas internas
- sugestões da IA
- artigos/RAG relevantes
- fluxo/automação ativa

### 4.2 Contact 360
- identidade do cliente
- consentimentos e canais
- valor do cliente / segmentos
- histórico de conversas
- pedidos e devoluções
- tickets/issues recorrentes
- score de risco / urgência / propensão

### 4.3 Automation builder

Canvas visual com:
- trigger
- steps
- branches
- wait/delay
- conditions
- external actions
- AI steps
- logs/test mode

A UI deve priorizar:
- legibilidade
- validação antes de publicar
- preview do caminho provável
- debugging pós-execução

### 4.4 Template manager
- lista com filtros por canal, idioma, status, categoria
- preview realista
- variáveis com validação
- comparação entre versões
- métricas de uso e performance

### 4.5 Knowledge & RAG console
- fontes cadastradas
- status de ingestão
- cobertura por tema
- qualidade de retrieval
- testes de pergunta/resposta
- gerenciamento de chunks, versões e permissões

### 4.6 Analytics

Separar analytics em 4 domínios:
- Operação
- Comercial
- Automação
- IA

## 5. Key UX patterns

### 5.1 Conversation status grammar
- New
- Open
- Pending customer
- Pending internal
- In automation
- Escalated
- Resolved
- Snoozed

### 5.2 Internal vs external distinction
- mensagens externas claramente diferenciadas
- notas internas com visual próprio
- ações da IA com estado “suggested / approved / sent”

### 5.3 AI controls
- sugerir
- reescrever
- resumir
- buscar conhecimento
- pedir aprovação
- mostrar fonte

### 5.4 Commerce quick actions
- ver pedido
- reenviar link de pagamento
- consultar status
- criar exceção
- marcar fraude/risco
- acionar política de compensação

## 6. Essential user journeys

### Journey A — atendimento humano assistido
1. nova mensagem entra
2. regras roteiam
3. atendente abre thread
4. IA resume histórico
5. operador responde com snippet + sugestão
6. pedido é consultado no sidebar
7. conversa é resolvida com tag de motivo

### Journey B — automação de pós-venda
1. evento de pedido atrasado chega
2. fluxo identifica janela e segmento
3. template certo é disparado
4. cliente responde
5. conversa entra na inbox de exceções
6. IA classifica urgência

### Journey C — bot com RAG + handoff
1. cliente pergunta sobre troca
2. bot consulta política + pedido
3. responde com base citada
4. se cliente divergir, handoff para humano
5. humano recebe contexto resumido

## 7. Design system direction

### Visual language
- moderna e premium, sem parecer fria
- densidade média para operação intensa
- forte contraste informacional
- ênfase em estados, prioridades e confiança

### Tokens
- semantic colors por estado operacional
- spacing padronizado
- tipografia de alta legibilidade
- componentes orientados a produtividade

### Component families
- conversation cards
- activity timeline
- template preview blocks
- AI suggestion cards
- workflow nodes
- metric tiles
- drawers e command bars

## 8. Accessibility

- navegação por teclado nas áreas críticas
- contraste AA/AAA onde aplicável
- labels semânticos
- foco visível
- feedback claro em erro, loading e sync

## 9. Mobile and tablet stance

- operação primária desktop
- supervisão e resposta rápida em tablet
- mobile focado em leitura, triagem leve e aprovações

## 10. UX risk to avoid

- misturar CRM pesado com inbox de forma confusa
- canvas de automação excessivamente técnico
- IA com sugestões sem fonte ou contexto
- excesso de painéis simultâneos
- dashboards bonitos porém pouco acionáveis

## 11. Recommendation

A melhor direção é uma experiência **operator-first**, com visual premium e pragmático. O produto não deve parecer um “painel genérico de tickets”; ele precisa transmitir que entende **conversa, operação e receita** ao mesmo tempo.
