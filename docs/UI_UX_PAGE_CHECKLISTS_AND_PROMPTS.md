# UI/UX Checklists por Página + Prompts Operacionais

Este documento organiza uma auditoria e evolução de **UI, UX e refatoração frontend** por página do projeto.

Base do projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- App Router base: `app/(app)`
- Objetivo: melhorar clareza operacional, hierarquia visual, consistência, componentização e experiência premium de produto

---

# Regras globais para todas as páginas

Antes de trabalhar qualquer página, validar estes pontos:

## Checklist global
- [ ] Padronizar idioma da tela para PT-BR ou EN, evitando mistura inconsistente
- [ ] Garantir hierarquia visual clara entre título, contexto, métricas, ações e conteúdo principal
- [ ] Revisar loading, empty state, error state e degraded state
- [ ] Revisar responsividade para desktop, notebook e mobile largo
- [ ] Revisar acessibilidade básica: contraste, foco, labels, navegação por teclado, semântica
- [ ] Verificar se a ação primária da tela está óbvia
- [ ] Verificar se itens críticos ou que exigem atenção aparecem com destaque suficiente
- [ ] Remover aparência de mock estático quando possível
- [ ] Melhorar escaneabilidade de listas, tabelas e cards
- [ ] Reduzir ruído visual e repetição desnecessária de padrões
- [ ] Extrair componentes reutilizáveis quando houver duplicação
- [ ] Separar melhor dados, apresentação e comportamento

## Primitives recomendadas para o projeto
- [ ] `PageFiltersBar`
- [ ] `EntityTable`
- [ ] `EmptyState`
- [ ] `HealthBadge`
- [ ] `StatusPill`
- [ ] `KpiGrid`
- [ ] `StickyActionBar`
- [ ] `RightInspectorPanel`
- [ ] `SectionCard`
- [ ] `OperationalAlertBanner`

---

# 1. Dashboard

## Identificação da página
- Rota: `/dashboard`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/dashboard/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/home/home-overview-view.tsx`

## Checklist da página
- [ ] Revisar se o dashboard comunica prioridades reais e não apenas métricas decorativas
- [ ] Destacar claramente alertas, oportunidades e riscos
- [ ] Reduzir competição visual entre cards e blocos
- [ ] Validar se os filtros do topo alteram de fato o conteúdo ou parecem apenas ilustrativos
- [ ] Melhorar a distinção entre visão executiva e visão operacional
- [ ] Transformar insights em ações recomendadas mais concretas
- [ ] Revisar personalização do dashboard para não parecer apenas mock de toggle local
- [ ] Preparar persistência de configuração por workspace/usuário
- [ ] Melhorar o equilíbrio entre coluna principal e coluna lateral
- [ ] Revisar atalhos para que sejam mais úteis e menos genéricos

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/dashboard`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/dashboard/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/home/home-overview-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 2. Inbox

## Identificação da página
- Rota: `/inbox`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/inbox/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/inbox/inbox-app.tsx`

## Checklist da página
- [ ] Revisar densidade da estrutura 3 colunas + painel lateral
- [ ] Melhorar destaque visual de SLA, urgência, automação, escalonamento e ownership
- [ ] Diferenciar com mais força mensagem humana, bot, nota interna e evento de sistema
- [ ] Revisar lista de conversas para escaneabilidade superior
- [ ] Melhorar estados sem conversa selecionada e sem resultados
- [ ] Garantir que filtros e busca suportem operação intensa sem confusão
- [ ] Revisar ergonomia do command dialog e atalhos
- [ ] Melhorar painel de contexto como cockpit real do contato
- [ ] Revisar ações rápidas da thread
- [ ] Preparar indicadores mais claros de IA, sugestões, handoff e automações ativas

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/inbox`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/inbox/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/inbox/inbox-app.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 3. Contatos

## Identificação da página
- Rota: `/contacts`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/contacts/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/contacts/contacts-view.tsx`

## Checklist da página
- [ ] Revisar utilidade real dos segmentos laterais
- [ ] Melhorar percepção de CRM vivo e não apenas tabela de dados
- [ ] Adicionar ou planejar quick actions por linha
- [ ] Preparar drawer/inspector do contato sem sair da listagem
- [ ] Melhorar sinais de lifecycle, LTV, última interação e opt-in
- [ ] Revisar filtros avançados e combinação de segmentos
- [ ] Melhorar empty state para segmentos vazios
- [ ] Revisar paginação, ordenação e escaneabilidade
- [ ] Padronizar densidade da tabela com o resto do sistema
- [ ] Tornar a tela mais acionável para campanhas, automações e atendimento

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/contacts`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/contacts/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/contacts/contacts-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 4. Campaigns

## Identificação da página
- Rota: `/campaigns`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/campaigns/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/campaigns/campaigns-list-view.tsx`

## Checklist da página
- [ ] Revisar se a página parece catálogo administrativo ou superfície de growth operacional
- [ ] Melhorar leitura de performance por campanha
- [ ] Mostrar métricas de entrega, leitura, resposta e conversão quando possível
- [ ] Destacar campanhas com erro, pausa, template inválido ou agenda futura crítica
- [ ] Melhorar filtros por status, objetivo, canal e audiência
- [ ] Revisar clareza da CTA “Nova campaign”
- [ ] Melhorar densidade informacional de cada linha
- [ ] Revisar estados loading/empty/error
- [ ] Preparar página para detalhe mais profundo da campanha
- [ ] Padronizar idioma e nomenclatura da experiência

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/campaigns`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/campaigns/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/campaigns/campaigns-list-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 5. Automações

## Identificação da página
- Rota: `/automations`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/automations/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/automations/automations-list-view.tsx`

## Checklist da página
- [ ] Destacar claramente status ativo, pausado, draft e degradado
- [ ] Melhorar leitura de impacto do fluxo em negócio
- [ ] Exibir health, falhas recentes e última execução com mais ênfase
- [ ] Preparar caminho claro para builder/detalhe
- [ ] Melhorar busca e filtros por categoria, trigger, owner e status
- [ ] Revisar uso de métricas no topo para que gerem ação
- [ ] Diferenciar automações estratégicas das apenas utilitárias
- [ ] Melhorar empty state e estados com poucos resultados
- [ ] Revisar escalabilidade visual da listagem
- [ ] Extrair blocos reutilizáveis para catálogos operacionais

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/automations`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/automations/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/automations/automations-list-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 6. Templates HSM

## Identificação da página
- Rota: `/templates`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/templates/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/templates/templates-list-view.tsx`

## Checklist da página
- [ ] Melhorar preview real do template
- [ ] Revisar hierarquia entre nome técnico, categoria, idioma e performance
- [ ] Melhorar leitura de qualidade e status Meta
- [ ] Destacar templates com risco ou baixa qualidade
- [ ] Melhorar filtros por categoria, idioma, uso e status
- [ ] Preparar ações rápidas de duplicação, edição e uso em campanha
- [ ] Melhorar empty state do catálogo
- [ ] Revisar linguagem visual do bloco de métricas
- [ ] Aproximar a experiência do contexto real de disparo
- [ ] Padronizar nomenclatura e estados

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/templates`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/templates/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/templates/templates-list-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 7. Analytics

## Identificação da página
- Rota: `/analytics`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/analytics/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/analytics/analytics-view.tsx`

## Checklist da página
- [ ] Revisar narrativa da página para não virar BI genérico
- [ ] Garantir leitura clara por aba
- [ ] Melhorar relação entre KPI headline e gráficos detalhados
- [ ] Inserir insights acionáveis entre charts quando aplicável
- [ ] Revisar densidade visual e evitar sobrecarga cognitiva
- [ ] Melhorar consistência entre paleta, legenda e leitura de séries
- [ ] Revisar comportamento responsivo dos gráficos
- [ ] Preparar exportação e relatório com mais contexto
- [ ] Validar clareza do filtro de período
- [ ] Extrair subcomponentes por aba e por tipo de leitura

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/analytics`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/analytics/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/analytics/analytics-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 8. Integrações

## Identificação da página
- Rota: `/integrations`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

## Checklist da página
- [ ] Separar mentalmente e visualmente conexões reais vs catálogo/mocks
- [ ] Melhorar leitura de saúde, status e criticidade das integrações
- [ ] Revisar se a tela comunica bem o modelo de provider, conexão e capabilities
- [ ] Preparar tabs ou segmentação mais clara entre conexões, catálogo e providers
- [ ] Melhorar feedback de validação/health check
- [ ] Revisar exposição de baseUrl e informações técnicas para não poluir a interface
- [ ] Melhorar hierarquia entre listagem principal e painel lateral
- [ ] Revisar estados vazios, erro e sucesso
- [ ] Preparar detalhe forte para integração individual
- [ ] Reduzir aparência de mock quando a operação ainda for parcial

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/integrations`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 9. Knowledge

## Identificação da página
- Rota: `/knowledge`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/knowledge/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/knowledge/knowledge-overview-view.tsx`

## Checklist da página
- [ ] Padronizar idioma da tela
- [ ] Melhorar explicação visual do pipeline source > ingestão > indexação > retrieval
- [ ] Destacar status operacional das sources
- [ ] Melhorar relação entre fontes e documentos
- [ ] Inserir health/coverage/contexto de RAG de forma mais visível
- [ ] Melhorar ações de debug e retrieval
- [ ] Revisar empty state para zero sources ou zero docs
- [ ] Melhorar visual técnico sem perder clareza de produto
- [ ] Preparar inspeção melhor de documento e chunks
- [ ] Reduzir sensação de lista técnica seca

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/knowledge`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/knowledge/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/knowledge/knowledge-overview-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 10. Skills

## Identificação da página
- Rota: `/skills`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/skills/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/skills/skills-view.tsx`

## Checklist da página
- [ ] Tornar a criação de skill menos “formulário técnico” e mais “produto operacional”
- [ ] Separar melhor editor, preview e catálogo
- [ ] Destacar variáveis detectadas com mais valor visual
- [ ] Melhorar preview do prompt final
- [ ] Exibir melhor status, categoria, output mode e bindings
- [ ] Preparar evolução para editor full-screen
- [ ] Melhorar listagem de skills existentes
- [ ] Revisar feedback de criação, erro e loading
- [ ] Melhorar exemplos prontos/snippets iniciais
- [ ] Reforçar como a skill será usada no sistema

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/skills`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/skills/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/skills/skills-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 11. AI Studio

## Identificação da página
- Rota: `/ai-studio`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/ai-studio/page.tsx`
- View principal declarada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-hub-view.tsx`
- View efetiva reexportada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-shell-view.tsx`

## Checklist da página
- [ ] Melhorar concretude operacional do roster de agentes
- [ ] Destacar diferenças entre live, shadow e draft com mais impacto visual
- [ ] Melhorar leitura de métricas por agente
- [ ] Mostrar governança, tools, bindings e risco com mais clareza
- [ ] Evitar que a tela fique conceitual demais
- [ ] Revisar a arquitetura ativa para parecer mais acionável
- [ ] Melhorar priorização de ações no topo
- [ ] Revisar responsividade dos cards de agentes
- [ ] Melhorar empty state para listas filtradas
- [ ] Preparar base para detalhe forte de cada agente

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/ai-studio`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/ai-studio/page.tsx`
- View/componente principal declarada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-hub-view.tsx`
- View/componente efetiva reexportada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-shell-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 12. Pedidos

## Identificação da página
- Rota: `/orders`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/orders/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/orders/orders-view.tsx`

## Checklist da página
- [ ] Melhorar destaque de pedidos problemáticos e que exigem ação
- [ ] Revisar utilidade real das tabs de status
- [ ] Inserir quick actions ligadas a conversa, logística e pagamento
- [ ] Melhorar leitura combinada de pagamento + fulfillment + risco
- [ ] Revisar densidade e escaneabilidade da tabela
- [ ] Melhorar tratamento visual de ticket aberto
- [ ] Revisar filtros avançados para operação real
- [ ] Preparar drawer lateral de detalhe do pedido
- [ ] Melhorar estados vazios e buscas sem resultado
- [ ] Fortalecer conexão com atendimento e automações

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/orders`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/orders/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/orders/orders-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 13. Configurações

## Identificação da página
- Rota: `/settings`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`

## Checklist da página
- [ ] Transformar o hub de links em centro de configuração mais informativo
- [ ] Mostrar health e status de configuração por módulo
- [ ] Exibir próximos passos de setup e pendências
- [ ] Melhorar distinção entre workspace, conectividade e administração
- [ ] Revisar densidade informacional dos cards
- [ ] Melhorar legibilidade da infraestrutura de configuração
- [ ] Preparar guided setup / onboarding infra
- [ ] Revisar consistência das nomenclaturas
- [ ] Melhorar prioridade das CTAs
- [ ] Preparar resumo executivo do estado do workspace

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/settings`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 14. Logs

## Identificação da página
- Rota: `/logs`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/logs/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/logs/logs-overview-view.tsx`

## Checklist da página
- [ ] Melhorar clareza investigativa da tela
- [ ] Revisar diferenciação visual por severidade
- [ ] Permitir ou planejar expansão de eventos/log payload
- [ ] Melhorar filtros por source, severidade, período e módulo
- [ ] Destacar erros críticos e warnings mais importantes no topo
- [ ] Revisar feed para não ficar visualmente uniforme demais
- [ ] Melhorar empty state e buscas sem resultado
- [ ] Conectar melhor a tela com troubleshooting real
- [ ] Preparar navegação para detalhe de log ou evento correlato
- [ ] Extrair badges e itens de feed reutilizáveis

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/logs`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/logs/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/logs/logs-overview-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# 15. Storage

## Identificação da página
- Rota: `/storage`
- Page: `/home/tylaig/repo/chat.meusuper.app/app/(app)/storage/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/storage/storage-overview-view.tsx`

## Checklist da página
- [ ] Evoluir de inventário estático para storage explorer mais operacional
- [ ] Melhorar visualização de pastas, owners e permissões
- [ ] Destacar assets recentes, grandes, críticos ou órfãos
- [ ] Revisar CTA de upload e operação sobre assets
- [ ] Melhorar relação entre storage e knowledge/campaigns/agents
- [ ] Preparar navegação para detalhe de asset/pasta
- [ ] Revisar hierarquia entre lista de pastas e lista de assets
- [ ] Melhorar filtros e estados vazios
- [ ] Tornar a tela mais útil para operação e governança
- [ ] Preparar padrões reutilizáveis para superfícies de assets

## Prompt preenchido
```md
Você é um especialista sênior em UI/UX, product design, design systems e refatoração frontend em Next.js/React.

Quero que você analise e proponha melhorias para uma página específica do projeto localizado em:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/storage`
- Arquivo principal: `/home/tylaig/repo/chat.meusuper.app/app/(app)/storage/page.tsx`
- View/componente principal: `/home/tylaig/repo/chat.meusuper.app/components/storage/storage-overview-view.tsx`

## Objetivo da missão
Faça uma análise profunda desta página e entregue um plano prático de melhoria em UI, UX, arquitetura visual, hierarquia de informação, componentização e refatoração frontend.

A resposta deve ser focada somente nesta página, sem dispersar para outras.

## O que analisar

### 1. Leitura da interface atual
Analise:
- objetivo da página
- tipo de usuário
- fluxo principal
- qualidade da hierarquia visual
- clareza das ações primárias e secundárias
- densidade de informação
- estados vazios, loading, erro e sucesso
- consistência com o restante do produto
- aderência a um SaaS premium operacional

### 2. Diagnóstico UI/UX
Identifique:
- pontos fracos da interface atual
- ambiguidades
- excesso de ruído
- problemas de escaneabilidade
- problemas de navegação
- problemas de consistência
- partes com cara de mock ou placeholder
- oportunidades de elevar percepção de produto

### 3. Sugestões de melhoria
Proponha melhorias concretas para:
- layout
- grid
- espaçamento
- contraste
- tipografia
- cards
- tabelas
- filtros
- topbar local
- ações rápidas
- detalhes inline
- side panel / drawer / inspector
- estados operacionais
- feedback visual
- visualização mobile/responsiva
- acessibilidade

### 4. Refatoração técnica
Sugira:
- quais componentes extrair
- quais componentes dividir
- que partes da tela estão grandes demais
- como reduzir duplicação
- quais abstrações reutilizáveis criar
- como melhorar legibilidade do código
- como separar dados, apresentação e comportamento

### 5. Entrega esperada
A resposta deve conter:

#### a) Resumo executivo
Um resumo curto do estado atual da página.

#### b) Problemas encontrados
Lista objetiva dos problemas.

#### c) Melhorias recomendadas
Lista priorizada de melhorias visuais e funcionais.

#### d) Refatoração sugerida
Estrutura sugerida de componentes e organização de código.

#### e) Plano de implementação
Ordem de execução por etapas pequenas e seguras.

#### f) Critérios de aceite
Como validar que a página realmente melhorou.

## Regras
- pense como produto real em produção
- não faça sugestões genéricas
- não proponha só “deixar mais bonito”
- priorize clareza operacional e usabilidade
- preserve coerência com o restante do app
- considere que o projeto usa Next.js/React e um design system com componentes compartilhados
- responda em português
- organize em Markdown
```

---

# Ordem recomendada de execução

## Prioridade alta
1. Inbox
2. Dashboard
3. Campaigns
4. Integrações
5. Skills

## Prioridade média
6. Contatos
7. Pedidos
8. Knowledge
9. Analytics
10. AI Studio

## Prioridade menor
11. Templates
12. Configurações
13. Logs
14. Storage

---

# Observação final

Este documento foi montado para permitir:
- auditoria por página
- execução incremental
- delegação para outros agentes/modelos
- organização da refatoração por superfície
- padronização da qualidade de análise entre telas
