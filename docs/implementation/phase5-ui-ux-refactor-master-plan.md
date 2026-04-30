# Fase 5 — Plano Mestre de Refatoração UI/UX

## Objetivo

Reposicionar o app para um modelo operacional consistente, onde os módulos de negócio seguem a mesma hierarquia de navegação e layout:

1. tela de listagem/visão operacional
2. tela de detalhe/inspeção
3. tela exclusiva de criação/edição em modo full screen

A meta desta fase não é apenas “deixar bonito”, mas corrigir a arquitetura de uso para que Campaigns, Automations, Templates, Knowledge, AI Studio e módulos adjacentes funcionem como produto real, com UX limpa, responsiva e previsível.

## Diagnóstico resumido do estado atual

### Padrão positivo já existente
- `Inbox` já opera como produto com layout dedicado, foco operacional e separação clara entre lista, thread e contexto.
- `Contacts` e `Orders` já se aproximam do padrão correto de listagem-first, com filtros, busca, tabela e priorização de operação antes da edição.
- `Analytics` já funciona como tela de leitura/insight, sem misturar criação com consulta.

### Problema estrutural predominante
Em vários módulos estratégicos, a listagem e a criação/edição ainda estão misturadas na mesma tela principal. Isso gera:
- excesso de densidade cognitiva
- pouco espaço para inspeção operacional
- dificuldade para escalar filtros, ações em massa, estados e métricas
- UX inconsistente entre módulos
- baixa previsibilidade para navegação mobile/tablet/desktop

## Princípio de arquitetura de interface a adotar

Cada domínio operacional deve seguir a mesma pilâmide:

### Nível 1 — Overview/List
Tela principal do módulo.
Deve conter:
- header do módulo
- KPIs resumidos
- busca
- filtros rápidos
- filtros avançados
- tabela/lista/cards
- ações em massa quando fizer sentido
- CTA primário para “criar novo”
- CTA secundário para exportar, duplicar, segmentar, testar, etc.

### Nível 2 — Detail/Inspect
Tela de detalhe ou painel dedicado para inspecionar um item existente.
Deve conter:
- resumo executivo do item
- status e metadados
- timeline/logs/execuções
- relacionamentos relevantes (template, canal, audiência, source, agente, workflow)
- ações laterais seguras (duplicar, pausar, arquivar, testar, publicar)

### Nível 3 — Create/Edit Full Screen
Tela exclusiva para criação/edição.
Deve ocupar a área útil principal do app, com foco em produtividade.
Deve conter:
- formulário estruturado por seções
- navegação por etapas ou rail lateral quando o domínio for complexo
- validação progressiva
- preview/contexto lateral quando necessário
- ações fixas de salvar/cancelar/testar/publicar

## Hierarquia de layout proposta para o produto

### Shell global
Manter a hierarquia atual do app shell, porém com maior padronização:
- sidebar à esquerda
- topbar sticky
- conteúdo principal responsivo
- largura fluida com limites por contexto

### Tipos de layout por página

#### 1. Layout de operação/listagem
Uso em:
- Campaigns
- Templates
- Knowledge
- Integrations
- Contacts
- Orders
- Agents dentro de AI Studio

Estrutura:
- header
- faixa de KPIs
- toolbar de busca/filtro/ações
- conteúdo listável
- paginação ou infinite list

#### 2. Layout de estúdio/editor
Uso em:
- criação/edição de Campaign
- criação/edição de Template
- builder de Automation
- edição de Skill/Prompt/Agent
- criação/edição de Source/Document na Knowledge

Estrutura:
- header com breadcrumbs e ações fixas
- rail lateral opcional com seções
- área central ampla
- preview lateral opcional
- footer sticky com ações

#### 3. Layout de inspeção/detalhe
Uso em:
- detalhe de campaign
- detalhe de template
- detalhe de source/documento da knowledge
- detalhe de agente
- detalhe de integração

Estrutura:
- summary header
- tabs de detalhe
- painel de metadados
- painéis de atividade/execuções/logs

## Auditoria por módulo

### 1. Campaigns
Estado atual:
- mistura criação e listagem na mesma tela
- formulário está compactado em card lateral
- listagem ainda rasa, sem filtros, sem tabela, sem status operacional real

Problemas:
- impossível operar bem campanhas em escala
- não há visão prévia suficiente antes de entrar em edição
- criação de campanha complexa não cabe bem no card atual

Arquitetura alvo:
- `/campaigns` = lista operacional
- `/campaigns/[campaignId]` = detalhe da campanha
- `/campaigns/new` = criação full screen
- `/campaigns/[campaignId]/edit` = edição full screen

Conteúdo obrigatório em listagem:
- nome
- status
- objetivo
- canal/canais
- template associado
- audiência/segmento
- agendamento
- owner
- created/updated at
- métricas resumidas: recipients, delivered, clicked, revenue

Seções do editor:
- dados básicos
- objetivo da campanha
- canais de envio
- sender por canal
- template escolhido
- audiência/segmento
- regras de agendamento/frequência
- parâmetros de compliance/aprovação
- preview
- revisão final

Prioridade: crítica

### 2. Automations
Estado atual:
- lista e canvas estão juntos na mesma tela
- a experiência é boa para exploração, mas não separa adequadamente operar fluxos de editar fluxos

Problemas:
- builder divide espaço com lista principal
- editar fluxo complexo dentro da mesma view principal atrapalha foco
- falta uma tela de overview operacional com filtros e saúde dos fluxos

Arquitetura alvo:
- `/automations` = catálogo/lista operacional
- `/automations/[automationId]` = detalhe com métricas, runs, logs e resumo visual
- `/automations/new` = builder exclusivo full screen
- `/automations/[automationId]/edit` = builder exclusivo full screen

Conteúdo obrigatório na listagem:
- nome
- trigger
- categoria
- status
- taxa de sucesso
- execuções 24h/30d
- receita influenciada
- última edição
- owner

Conteúdo do detalhe:
- mini mapa do fluxo
- histórico de runs
- falhas recentes
- nós críticos
- dependências (templates, skills, integrações, campanhas)

Prioridade: crítica

### 3. Templates
Estado atual:
- já existe separação entre lista e preview
- ainda não existe separação real entre catálogo e criação/edição

Problemas:
- “novo template” ainda é ação sem workspace dedicado
- preview é forte, mas falta governança operacional
- faltam filtros mais ricos e estados de lifecycle/versionamento

Arquitetura alvo:
- `/templates` = catálogo/lista
- `/templates/[templateId]` = detalhe/preview/metadados
- `/templates/new` = criação full screen
- `/templates/[templateId]/edit` = edição full screen

Conteúdo obrigatório na listagem:
- nome
- canal
- categoria
- status Meta
- qualidade
- idioma
- uso 30d
- CTR/read/delivery
- última atualização

Editor full screen:
- header/body/footer/buttons
- variáveis e exemplos
- preview por canal
- validação Meta/compliance
- versionamento e histórico

Prioridade: alta

### 4. Knowledge
Estado atual:
- tela mistura source creation, document creation, chunks e retrieval console
- o módulo está funcional tecnicamente, porém muito concentrado em uma única view

Problemas:
- mistura operação, ingestão, inspeção e debugging na mesma tela
- baixa escalabilidade para múltiplas fontes/documentos
- retrieval console concorre com a gestão da base

Arquitetura alvo:
- `/knowledge` = catálogo de sources e documentos
- `/knowledge/sources/[sourceId]` = detalhe da source
- `/knowledge/documents/[documentId]` = detalhe do documento
- `/knowledge/new` = nova source/document ingest
- `/knowledge/retrieval` = console de retrieval/observabilidade

Subáreas recomendadas:
- Sources
- Documents
- Retrieval Logs
- Embeddings Status
- Ingest Jobs

Detalhe de source deve mostrar:
- tipo
- status
- último ingest
- total de documentos
- total de chunks
- total de embeddings
- health/status do provider

Prioridade: crítica

### 5. Skills → incorporar em AI Studio
Estado atual:
- `AI Skills` está isolado como módulo separado
- `AI Studio` já mostra roster de agentes, mas sem área dedicada para gestão mais profunda de skills/prompts/agentes

Direção desejada:
- “AI Skills” deve ser absorvido conceitualmente por `AI Studio`
- `AI Studio` vira o hub de inteligência
- agentes devem ter uma tela exclusiva de visualização/listagem

Arquitetura alvo:
- `/ai-studio` = overview/hub de IA
- `/ai-studio/agents` = lista de agentes
- `/ai-studio/agents/[agentId]` = detalhe do agente
- `/ai-studio/agents/new` = criação de agente
- `/ai-studio/skills` = catálogo de skills/prompts
- `/ai-studio/skills/[skillId]` = detalhe da skill
- `/ai-studio/skills/new` = criação full screen
- `/ai-studio/evals` = avaliações/testes

Regras de UX:
- Agents e Skills não devem disputar a mesma área principal sem navegação explícita
- overview do AI Studio deve servir como hub, não como tela final de gestão detalhada
- listagem de agentes precisa de busca, filtros por status/model/tooling e quick actions

Prioridade: crítica

### 6. AI Studio
Estado atual:
- tela atual é híbrida entre roster e detalhe de um único agente
- já comunica bem a visão do produto

Problemas:
- falta separação entre hub, lista de agentes e edição do agente
- pouco espaço para escala quando houver muitos agentes
- faltam estados de testes, avaliações, conhecimento conectado e governança

Arquitetura alvo:
- hub resumido com KPIs e atalhos
- lista exclusiva de agentes
- detalhe exclusivo do agente
- editor exclusivo do agente
- acesso a skills, evals, guardrails e observabilidade

Prioridade: crítica

### 7. Integrations
Estado atual:
- ainda mistura criação e listagem na mesma tela
- health check existe, mas a operação continua rasa

Arquitetura alvo:
- `/integrations` = catálogo/lista
- `/integrations/[integrationId]` = detalhe
- `/integrations/new` = criação full screen
- `/integrations/[integrationId]/edit` = edição/secret rotation

Prioridade: média-alta

### 8. Settings
Estado atual:
- página geral simples, pouco alinhada ao nível dos demais módulos

Arquitetura alvo:
- settings deve virar área mais claramente categorizada:
  - Geral
  - Workspace
  - Usuários e permissões
  - Canais
  - Integrações
  - Segurança
  - Billing

Prioridade: média

### 9. Contacts e Orders
Estado atual:
- já estão relativamente alinhados ao padrão list-first

Melhorias sugeridas:
- adicionar detail pages
- adicionar drawer ou rota dedicada para inspeção
- harmonizar filtros avançados, bulk actions e estados vazios

Prioridade: média

### 10. Inbox e Analytics
Estado atual:
- são as referências mais fortes do produto em termos de clareza estrutural

Papel na fase:
- servir como baseline de linguagem visual, densidade e hierarquia
- não precisam de refatoração estrutural grande agora

Prioridade: baixa

## Modelo de responsividade

### Desktop
- explorar layout de 2 a 3 colunas quando houver ganho operacional
- forms complexos podem usar rail lateral + conteúdo principal + preview

### Tablet
- colunas devem colapsar para 1+1 progressivo
- filtros avançados e painéis contextuais podem virar drawer/sheet

### Mobile
- priorizar lista > detalhe > edição em telas independentes
- evitar formulário complexo inline com listagem
- CTAs fixos no rodapé quando necessário

## Regras visuais e de UX

### Linguagem visual
- clean
- alta legibilidade
- pouco ruído visual
- contraste funcional
- cards apenas quando ajudam agrupamento
- preferir superfícies contínuas em telas densas

### Padrões a preservar
- `PageContainer`
- `PageHeader`
- `StatCard`
- sidebar/topbar atuais
- tokens do design system atual

### Padrões a evoluir
- toolbar padrão de listagem
- padrão de filtros rápidos e avançados
- padrão de tabelas responsivas
- padrão de empty states
- padrão de detail header
- padrão de editor full screen
- padrão de sticky footer para ações

## Backlog incremental proposto

### Fase 5.1 — Information architecture e routing
- definir mapa final de rotas por módulo
- mover `Skills` para dentro de `AI Studio` no modelo de produto
- criar placeholders estruturais para list/detail/edit/new
- alinhar sidebar e breadcrumbs

### Fase 5.2 — Campaigns + Templates
- transformar Campaigns em list/detail/edit/new
- transformar Templates em list/detail/edit/new
- implementar editor full screen de campaign

### Fase 5.3 — Automations + AI Studio
- separar catálogo operacional do builder
- criar lista exclusiva de agentes
- criar hub de AI Studio com navegação interna clara

### Fase 5.4 — Knowledge + Integrations + Settings
- quebrar Knowledge em catálogo, detalhe, retrieval console e ingest
- separar criação/edição de integrações da listagem
- refatorar Settings em navegação por seções

### Fase 5.5 — Harmonização transversal
- detail pages para Contacts e Orders
- consistência de empty/loading/error states
- revisão responsiva geral
- QA visual, acessibilidade e refinamento final

## Critérios de aceitação

### Estruturais
- nenhum módulo prioritário deve misturar listagem principal com formulário complexo de criação/edição
- todos os módulos prioritários devem possuir rota de listagem
- módulos complexos devem possuir rota exclusiva de create/edit

### UX
- usuário consegue entender “onde está”, “o que está vendo” e “o que acontece ao clicar em criar/editar” sem ambiguidade
- navegação entre lista, detalhe e edição é previsível
- ações primárias ficam sempre evidentes

### Responsividade
- nenhum formulário crítico depende de duas colunas fixas em telas menores
- filtros e painéis laterais degradam para drawer/sheet sem perda funcional

### Visual
- linguagem atual é preservada
- ruído visual diminui
- leitura e escaneabilidade melhoram

## Ordem recomendada de execução

1. routing e IA de páginas
2. Campaigns
3. Templates
4. AI Studio + Skills
5. Automations
6. Knowledge
7. Integrations
8. Settings
9. harmonização de Contacts/Orders

## Resultado esperado

Ao final desta frente, o produto deixa de parecer um conjunto de demos operacionais independentes e passa a se comportar como uma suíte unificada, com padrões consistentes de descoberta, operação, inspeção e edição.