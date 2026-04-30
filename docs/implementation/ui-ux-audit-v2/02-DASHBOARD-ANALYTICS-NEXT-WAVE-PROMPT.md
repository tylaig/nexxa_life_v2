# Dashboard + Analytics — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução da página de **Dashboard**, com foco em transformar o dashboard na **superfície central de leitura analítica e operacional do produto**, absorvendo de forma real a atual página de Analytics.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota do dashboard: `/dashboard`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/dashboard/page.tsx`
- View principal do dashboard: `/home/tylaig/repo/chat.meusuper.app/components/home/home-overview-view.tsx`
- Rota atual de analytics: `/analytics`
- Arquivo da rota atual de analytics: `/home/tylaig/repo/chat.meusuper.app/app/(app)/analytics/page.tsx`
- View atual de analytics: `/home/tylaig/repo/chat.meusuper.app/components/analytics/analytics-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, design systems, analytics product design e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfícies alvo

### 1. Dashboard
- Rota: `/dashboard`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/dashboard/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/home/home-overview-view.tsx`

### 2. Analytics atual
- Rota atual: `/analytics`
- Arquivo principal da rota atual: `/home/tylaig/repo/chat.meusuper.app/app/(app)/analytics/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/analytics/analytics-view.tsx`

---

## Objetivo geral
Transformar o **Dashboard** na principal superfície analítica, executiva e operacional do produto, absorvendo de forma real e estruturada a experiência hoje existente em **Analytics**.

A missão não é apenas referenciar Analytics a partir do Dashboard. É **migrar de fato a inteligência analítica, os gráficos, a hierarquia visual e a navegação de leitura de dados para dentro do Dashboard**, tornando-o o centro de decisão do workspace.

O Dashboard deve suportar leituras por áreas analíticas específicas, com filtros próprios, organização mais clara e uma navegação mais moderna.

---

## Escopo das melhorias

### 1. Criar leituras analíticas completas para todos os tipos principais
O Dashboard deve passar a suportar áreas analíticas claras para os seguintes grupos:

- **Executivo**
- **Operação**
- **IA**
- **Vendas**
- **Produto**
- **Integrações**

Esses grupos não devem ser apenas botões decorativos. Eles devem estruturar de verdade a experiência do Dashboard.

Cada grupo deve abrir uma leitura analítica relevante, com:
- KPIs próprios
- gráficos próprios
- filtros compatíveis
- visão resumida e visão detalhada
- boa hierarquia de informação

---

### 2. Migrar de fato a página de Analytics para o Dashboard
A atual página de Analytics deve ser considerada fonte de conteúdo, estrutura e componentes analíticos que serão incorporados ao Dashboard.

A migração deve incluir:
- gráficos
- indicadores
- leitura por domínio
- visualizações por período
- componentes de comparação e tendência
- organização do conteúdo por área analítica

A ideia é que o Dashboard deixe de ser uma home parcialmente executiva e se torne uma **superfície analítica principal**, mais rica e mais útil.

### Diretriz importante
Não manter a lógica de “dashboard simples + analytics completo separado” como experiência principal.

A nova experiência deve caminhar para:
- **Dashboard como hub analítico central**
- **Analytics atual sendo absorvido, refatorado ou desmembrado**

Se ainda existir rota `/analytics` em uma fase intermediária, ela deve ser tratada apenas como transição técnica ou tela a ser esvaziada/aposentada depois.

---

### 3. Remover o bloco “Migrar bloco de analytics”
O CTA e o conceito de **"Migrar bloco de analytics"** devem ser removidos.

Isso existe hoje como uma solução intermediária, mas a nova fase pede a integração real do conteúdo analítico no Dashboard.

A UX não deve mais sugerir que analytics está “fora” da home e pode ser apenas trazido parcialmente. O conteúdo analítico deve já nascer dentro do Dashboard.

---

### 4. Remover “Personalizar dashboard” e substituir por navegação de áreas
O botão/fluxo de **"Personalizar dashboard"** deve ser removido nesta próxima etapa.

Em vez disso, o Dashboard deve ser reorganizado com foco em:
- navegação por áreas analíticas
- filtros específicos por contexto
- leitura segmentada por domínio
- experiência mais direta e menos dependente de toggle manual de blocos

Em vez de um modo de personalização genérico, a tela deve oferecer uma navegação mais estruturada por áreas como:
- Executivo
- Operação
- IA
- Vendas
- Produto
- Integrações

---

### 5. Transformar os tipos analíticos em um menu real com ícones
As categorias analíticas do Dashboard devem evoluir para um **menu real**, com melhor UX e identidade visual.

Esse menu deve:
- ser claramente navegável
- deixar evidente qual seção está ativa
- usar ícones
- ter aparência premium e consistente
- funcionar bem em desktop e telas menores

Pode assumir forma de:
- tabs refinadas
- segmented control expandido
- rail horizontal com ícones
- menu secundário dentro do dashboard

O importante é que isso deixe de parecer um conjunto simples de botões e passe a parecer uma navegação de produto real.

---

### 6. Adicionar filtros reais no Dashboard
O Dashboard deve permitir filtros reais e úteis, e não apenas leitura fixa.

Entre os filtros, considerar no mínimo:
- data
- período
- janelas pré-definidas
- filtros compatíveis com o estado atual do produto
- outros filtros já possíveis hoje no domínio analítico existente

Exemplos de filtros possíveis, dependendo do estado atual:
- últimos 7 dias
- últimos 14 dias
- últimos 30 dias
- últimos 90 dias
- período customizado
- canal
- inbox/marca/workspace
- time
- agente
- tipo de operação
- domínio analítico ativo

### Regras desses filtros
- devem ser claros visualmente
- devem se conectar ao conteúdo mostrado
- devem ter boa hierarquia
- devem suportar leitura analítica de verdade
- devem parecer parte natural do Dashboard

---

### 7. Migrar layout, gráficos e design de Analytics para dentro de Dashboard
A missão inclui aproveitar e realocar o que já existe de valor em `analytics-view.tsx`.

Isso inclui:
- gráficos
- KPIs de headline
- organização visual das leituras
- comparações
- componentes de chart
- tabs ou seções úteis
- narrativa analítica

Mas essa migração não deve ser uma simples cópia. Ela deve ser adaptada ao novo papel do Dashboard.

### O resultado esperado é:
- Dashboard mais robusto
- leitura por áreas mais clara
- melhor fluxo entre visão geral e visão detalhada
- eliminação de redundância entre Dashboard e Analytics

---

### 8. Reestruturar a narrativa do Dashboard
O Dashboard deve deixar de ser apenas uma superfície com blocos diversos e passar a ter uma narrativa mais intencional.

A estrutura pode seguir algo como:

#### camada 1 — visão geral
- KPIs principais
- resumo executivo
- alertas e desvios

#### camada 2 — navegação por domínio
- Executivo
- Operação
- IA
- Vendas
- Produto
- Integrações

#### camada 3 — leitura analítica detalhada
- gráficos
- tendências
- comparativos
- breakdowns
- health
- oportunidades

#### camada 4 — ações e interpretação
- alertas relevantes
- recomendações
- próximos passos

---

### 9. Melhorar leitura analítica por domínio
Cada uma das áreas do Dashboard deve ter foco próprio.

#### Executivo
- visão consolidada do negócio
- KPIs resumo
- tendências gerais
- visão comparativa de performance

#### Operação
- volume
- SLA
- tempo de resposta
- backlog
- produtividade
- qualidade operacional

#### IA
- uso
- aceitação
- deflection
- latência
- eficiência
- impacto da IA

#### Vendas
- receita
- conversão
- pedidos
- ticket médio
- receita assistida
- desempenho comercial

#### Produto
- categorias
- produtos digitais
- performance por produto
- sinais de catálogo
- consumo por oferta
- produtos com maior conversão
- produtos com maior receita
- produtos com maior churn/reembolso, se aplicável
- leitura orientada a ativos digitais, e não apenas e-commerce físico

#### Integrações
- saúde das conexões
- falhas
- degradações
- disponibilidade
- uso por integração

Essas áreas devem parecer painéis realmente úteis, e não apenas variações pequenas da mesma estrutura.

---

### 10. Adaptar o Dashboard para foco em produtos digitais
O Dashboard precisa refletir explicitamente o foco da plataforma em **produtos digitais**.

Isso significa que a leitura analítica deve deixar de parecer centrada apenas em operação genérica ou e-commerce físico e passar a contemplar métricas como:
- receita por produto digital
- conversão por oferta/produto
- volume de compras por produto
- eventos de onboarding, ativação ou acesso quando aplicável
- performance por coleção/categoria digital
- produtos com melhor desempenho
- produtos com pior retenção/engajamento, se esse dado existir
- correlação entre campanhas, automações e produtos digitais

A seção de Produto no Dashboard deve parecer um painel de negócio digital real.

---

### 11. Permitir contabilização via eventos personalizados / webhooks
Para suportar melhor métricas de produtos digitais, o Dashboard deve ficar preparado para receber e consolidar **eventos personalizados**, por exemplo via webhook.

Exemplos de eventos:
- compra realizada
- checkout concluído
- acesso liberado
- onboarding iniciado
- ativação concluída
- upsell aceito
- reembolso
- cancelamento
- outros eventos relevantes do ciclo de vida do produto digital

A proposta deve considerar que, quando necessário, o backend pode receber esses eventos por webhook e contabilizá-los para uso analítico.

### Requisitos dessa camada de eventos
- eventos precisam ser modelados de forma clara
- o Dashboard deve conseguir consumir esses dados de forma agregada
- a arquitetura deve permitir evolução futura sem hardcode excessivo
- eventos precisam poder alimentar métricas de vendas, produto e funis

A implementação não precisa necessariamente entregar o pipeline completo nesta fase, mas deve ao menos preparar o Dashboard e a arquitetura para esse modelo.

---

### 12. Unificar Dashboard com Insights de forma mais forte
Além da migração de Analytics, o Dashboard também precisa aproveitar melhor a camada de **insights**.

Os insights não devem ficar como um bloco isolado ou decorativo. Eles devem ser reaproveitados e integrados ao Dashboard como parte da leitura principal.

Isso significa:
- unir analytics e insights no mesmo fluxo de leitura
- usar insights como interpretação dos dados
- destacar anomalias, oportunidades e alertas automaticamente
- transformar parte dos gráficos em leitura acionável
- evitar que insights sejam apenas frases soltas sem contexto visual

O Dashboard deve parecer um hub onde:
- os números aparecem
- os gráficos contextualizam
- os insights interpretam
- as ações sugeridas orientam decisão

---

### 13. Reduzir redundância entre Dashboard e Analytics
A nova arquitetura deve evitar duplicação confusa.

Não deve haver:
- duas telas competindo pela função de análise principal
- dois lugares diferentes para a mesma leitura essencial
- blocos temporários que parecem workaround permanente

A solução deve apontar claramente para uma convergência onde o Dashboard se torne a principal tela analítica do produto.

---

## Diretrizes de UX
Priorizar:
- leitura clara por domínio
- navegação forte e elegante
- boa hierarquia entre resumo e detalhe
- filtros úteis e bem posicionados
- sensação de produto premium
- escaneabilidade alta
- contexto operacional e analítico juntos
- aproveitamento inteligente do material já existente em Analytics

Evitar:
- excesso de blocos soltos
- tabs decorativas sem mudança real de conteúdo
- duplicação de gráficos sem propósito
- dashboard com aparência de mosaico genérico
- filtros confusos ou espalhados
- coexistência mal resolvida entre Dashboard e Analytics

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- reaproveitar componentes analíticos existentes quando fizer sentido
- refatorar a tela de analytics em módulos reutilizáveis para consumo no dashboard
- evitar componente gigante e monolítico
- separar dados, filtros, navegação e visualização
- manter coerência com o design system atual
- preparar estrutura para crescimento dos domínios analíticos
- garantir responsividade real
- manter boa performance visual e estrutural

---

## Sugestões de estrutura de componentes
A implementação pode caminhar para estruturas como:

- `DashboardAnalyticsShell`
- `DashboardDomainMenu`
- `DashboardFiltersBar`
- `DashboardExecutiveOverview`
- `DashboardOperationsView`
- `DashboardAIView`
- `DashboardSalesView`
- `DashboardProductView`
- `DashboardIntegrationsView`
- `DashboardInsightPanel`
- `DashboardKpiHeader`

Também considerar extrações a partir de `analytics-view.tsx` para componentes menores e reaproveitáveis.

---

## O que entregar

### 1. Diagnóstico da situação atual
Analisar:
- limitações do dashboard atual
- o que hoje está preso em analytics
- pontos de redundância
- blocos temporários que devem desaparecer
- oportunidades de reorganização

### 2. Plano de migração funcional
Organizar a proposta por blocos:
- evolução do dashboard
- absorção de analytics
- navegação por domínios
- filtros
- menu com ícones
- remoção dos elementos intermediários antigos

### 3. Proposta de arquitetura visual e informacional
Definir:
- como o dashboard passa a ser organizado
- onde ficam KPIs globais
- onde ficam filtros
- como navegar por Executivo, Operação, IA, Vendas, Produto e Integrações
- como os gráficos entram nessa nova superfície

### 4. Refatoração/implementação frontend
Sugerir e/ou implementar mudanças reais em:
- dashboard page/view
- analytics view/componentes
- navegação interna do dashboard
- filtros analíticos
- composição dos gráficos e das leituras por área

### 5. Resumo final
Ao final, apresentar:
- o que foi migrado
- o que foi removido
- quais arquivos mudaram
- como a nova arquitetura do Dashboard ficou estruturada

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- o Dashboard suportar leituras analíticas para **Executivo, Operação, IA, Vendas, Produto e Integrações**
- esses tipos não forem apenas botões ilustrativos
- a experiência principal de Analytics tiver sido absorvida pelo Dashboard
- o botão **“Migrar bloco de analytics”** tiver sido removido
- o botão **“Personalizar dashboard”** tiver sido removido
- existir navegação real por áreas analíticas, de preferência com ícones
- o Dashboard suportar filtros reais por data, período e outros filtros compatíveis com o estado atual
- gráficos e layout relevantes de Analytics estiverem realmente migrados para o Dashboard
- a experiência final parecer um hub analítico central de produto, e não uma home genérica

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só melhorias cosméticas
- priorize clareza analítica e UX de decisão
- preserve coerência com o app existente
- trate o Dashboard como a futura superfície analítica principal
- implemente com visão de escalabilidade
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma categorias analíticas em domínios reais de leitura
- formaliza a migração verdadeira de Analytics para Dashboard
- elimina os elementos transitórios do dashboard atual
- organiza filtros, navegação e hierarquia
- conecta caminhos reais do código atual
- prepara a convergência da arquitetura analítica do produto

---

# Nome recomendado para uso interno

Sugestões:

- `Dashboard Analytics Convergence`
- `Dashboard Next Wave Analytics Migration`
- `Dashboard Central Analytics Refactor Prompt`
