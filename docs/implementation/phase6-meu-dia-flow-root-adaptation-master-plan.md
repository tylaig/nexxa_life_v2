# Phase 6 — Meu Dia Flow -> Root App Adaptation Master Plan

> Objetivo: portar todas as páginas, capacidades e fluxos essenciais de `old/meu-dia-flow` para a aplicação raiz atual, preservando o design system, o app shell e os padrões de navegação já consolidados no app principal.

## 1. Contexto

O repositório atual em `/home/tylaig/repo/nexxalifenew` já não está estruturado como um produto NexxaLife isolado em `/nexxalife`.

Evidências observadas:
- `app/page.tsx` redireciona para `/dashboard`
- o shell oficial já está em `app/(app)/layout.tsx`
- a navegação atual está consolidada em `components/app-shell/app-sidebar.tsx`
- o design operacional ativo está distribuído em views como `components/home/home-overview-view.tsx`, `components/contacts/contacts-view.tsx`, `components/ai-studio/*`, `components/campaigns/*`, `components/automations/*`, `components/templates/*`
- a base legada desejada está em `old/meu-dia-flow`

Logo, a adaptação correta não é recriar um produto paralelo. A direção correta é:
1. usar a raiz atual como fundação visual e estrutural
2. absorver o domínio do Meu Dia Flow como um novo conjunto de superfícies e fluxos
3. reaproveitar o shell, topbar, sidebar, containers, cards, tabs e padrões de CTA já existentes
4. substituir mocks e lacunas por módulos reais do domínio Meu Dia

## 2. Problema a resolver

Hoje existe um desalinhamento entre:
- o produto legado `old/meu-dia-flow`, orientado a gestão pessoal sistêmica
- a aplicação raiz atual, orientada a operação omnichannel / CRM / AI commerce

O pedido do usuário redefine a prioridade: a raiz atual deve passar a comportar todas as funções e páginas do Meu Dia Flow, mas sem regredir para o design antigo. O legado deve ser portado para o design atual.

## 3. Inventário legado confirmado

Rotas e páginas encontradas em `old/meu-dia-flow/src/App.jsx`:
- `/` -> Landing
- `/login` -> Login
- `/cadastro` -> Cadastro
- `/onboarding` -> Onboarding
- `/Diagnostico` -> redirect para onboarding
- `/Checklist` -> Checklist
- `/Agenda` -> Agenda
- `/ObjetivosMetas` -> ObjetivosMetas
- `/Diario` -> Diario
- `/Relatorio` -> Relatorio
- `/Dashboard` -> Dashboard
- `/Academia` -> Academia
- `/Integracoes` -> Integracoes
- `/AdminDashboard` -> AdminDashboard
- `/News` -> News
- `/Marketplace` -> Marketplace
- `/Testes` -> Testes

Capacidades de produto confirmadas pela documentação legada:
- diagnóstico dinâmico e versionado
- cálculo de score geral, score de consciência e índices sistêmicos
- geração e gestão de objetivos, metas e tarefas
- checklist diário
- agenda
- diário
- relatórios periódicos
- recalibração
- chat/IA contextual
- admin estrutural / framework versionado
- notificações / suporte / news
- integrações
- marketplace

## 4. Princípios de adaptação

### 4.1 Não copiar a UI legada literalmente
Portar intenção, fluxos e domínio. Não portar CSS, layout ou componentes de forma cega.

### 4.2 A raiz atual é a fonte da linguagem visual
Devem ser reaproveitados sempre que possível:
- `AppTopbar`
- `AppSidebar`
- `PageContainer`
- `PageHeader`
- cards/tables/tabs do design atual
- organização list-first / detail / studio já usada em Campaigns, Automations, Templates, Apps e AI Studio

### 4.3 Preservar o domínio completo do Meu Dia
A adaptação não pode ser só cosmética. Precisamos portar:
- páginas
- entidades
- fluxos
- navegação
- estados empty/loading/error
- CTAs reais ou explicitamente bloqueados
- contratos de dados futuros

### 4.4 Evitar namespace transitório desnecessário
Como a raiz atual já é o produto oficial, o melhor caminho é criar uma suíte coesa de domínio Meu Dia sob rotas estáveis da raiz, não como miniapp paralelo escondido.

## 5. Mapa de adaptação legado -> alvo na raiz

### 5.1 Superfícies públicas / entrada
- `Landing` -> revisar `app/page.tsx` depois da migração; hoje redireciona para `/dashboard`
- `Login` -> manter em `/login`, mas adaptar o copy e fluxo ao produto Meu Dia
- `Cadastro` -> criar `/signup` ou manter `/cadastro` com alias; decidir depois da rodada de IA/naming
- `Onboarding` -> criar `/onboarding` no padrão atual de shell mínimo ou tela focada

### 5.2 Núcleo operacional Meu Dia
- `Dashboard` -> reaproveitar `/dashboard`, migrando de analytics/commerce para visão executiva de vida
- `Checklist` -> criar `/checklist`
- `Agenda` -> criar `/agenda`
- `ObjetivosMetas` -> criar `/goals` ou `/objetivos` com subfluxos de metas
- `Diario` -> criar `/journal` ou `/diario`
- `Relatorio` -> criar `/reports` ou `/relatorios`

### 5.3 Núcleo estratégico / motor
- `Diagnostico` -> criar `/diagnostic` ou `/diagnostico`
- `AdminDashboard` -> criar `/framework-admin` ou `/admin/framework`

### 5.4 Ecossistema e apoio
- `Academia` -> criar `/academy`
- `Integracoes` -> avaliar fusão com `/apps` ou `/integrations`
- `News` -> criar `/news` ou absorver em dashboard/feed contextual
- `Marketplace` -> criar `/marketplace`
- `Testes` -> não expor como superfície primária; manter como QA/dev surface protegida

## 6. Matriz de convergência com as rotas atuais

### 6.1 Rotas atuais que podem ser substituídas ou retematizadas
- `/dashboard` -> forte candidata a virar Dashboard Meu Dia
- `/apps` -> forte candidata a absorver Integrações do Meu Dia
- `/logs` -> pode sustentar `Testes`/observabilidade interna, mas não substitui páginas de usuário
- `/settings/*` -> pode absorver configurações pessoais, notificações, preferências, conta e privacidade

### 6.2 Rotas atuais que conflitam semanticamente com o novo foco
- `/inbox`
- `/orders`
- `/products`
- `/contacts`
- `/audience`
- `/campaigns`
- `/automations`
- `/templates`
- `/ai-studio`

Essas rotas não precisam ser apagadas imediatamente, mas perdem prioridade de produto se a raiz virar oficialmente Meu Dia. Devem ser reclassificadas em uma das opções:
1. remover
2. arquivar
3. esconder do menu principal
4. reaproveitar como capacidades internas do produto Meu Dia

### 6.3 Rotas atuais com maior potencial de reaproveitamento estrutural
- `/dashboard` como visão executiva
- `/ai-studio` como hub de IA contextual do Meu Dia
- `/apps` como integrações pessoais/ecossistema
- `/settings/*` como administração, conta e preferências
- `/storage` e `/logs` como superfícies técnicas internas

## 7. Novo agrupamento de informação recomendado no sidebar

### Principal
- Dashboard
- Diagnóstico
- Checklist
- Agenda

### Crescimento
- Objetivos & Metas
- Diário
- Relatórios

### Inteligência
- AI Studio
- News
- Academia

### Ecossistema
- Integrações
- Marketplace

### Administração
- Framework Admin
- Configurações
- Logs

## 8. Estratégia de implementação por ondas

## Onda 0 — Planejamento e mapeamento estrutural
Entregáveis:
- este master plan
- progresso vivo
- gap analysis
- matriz legado -> rota nova -> componente alvo
- decisão de taxonomia de rotas

## Onda 1 — Shell e IA de navegação
Objetivo:
- reconfigurar sidebar e títulos globais para suportar o domínio Meu Dia
- introduzir as novas rotas placeholder honestas no design atual

Entregáveis mínimos:
- novos entries `app/(app)/checklist/page.tsx`, `agenda`, `diagnostic`, `goals`, `journal`, `reports`, `academy`, `marketplace`
- novos links no `AppSidebar`
- CTA matrix inicial dessas páginas

## Onda 2 — Port do núcleo diário
Objetivo:
- migrar primeiro o ciclo mais frequente de uso

Ordem:
1. Dashboard
2. Checklist
3. Agenda
4. Goals/Metas
5. Journal

## Onda 3 — Port do núcleo estratégico
Objetivo:
- migrar a parte mais diferenciada do produto

Ordem:
1. Diagnostic
2. Framework Admin
3. Reports
4. Recalibração / snapshots / histórico

## Onda 4 — Port do ecossistema
Ordem:
1. Integrations
2. Academy
3. News
4. Marketplace

## Onda 5 — Realismo funcional
Objetivo:
- substituir dependências de storage local legado por contratos/server state modernos
- formalizar entidades, repository layer, fixtures controladas e persistência futura

## 9. Arquitetura de frontend recomendada para o port

Para cada novo domínio Meu Dia, seguir o padrão já forte do app atual:
- list/overview view
- detail/inspection view quando fizer sentido
- create/edit/studio view para fluxos densos

Aplicação ao domínio:
- Dashboard -> overview
- Checklist -> overview + task detail drawer opcional
- Agenda -> calendar workspace
- Goals -> list + goal detail + goal studio
- Journal -> list + entry detail + editor
- Reports -> catalog + report detail
- Diagnostic -> session entry + answering flow + result detail
- Framework Admin -> list + editor/version studio

## 10. Padrões técnicos obrigatórios

- não usar `old/meu-dia-flow/src/services/storage.js` como verdade de negócio
- tratar `old/` apenas como referência funcional e de conteúdo
- criar contratos/fixtures/types próprios em TypeScript
- explicitar estados `REAL`, `MOCK`, `BLOCKED`, `MISSING`
- manter consistência com App Router e design system da raiz
- preferir componentes reutilizáveis em `components/<domain>/`

## 11. Gaps críticos já identificados

1. O app atual não possui nenhuma rota principal do ciclo Meu Dia (`/diagnostic`, `/agenda`, `/checklist`, `/journal`, `/reports`, `/academy`, `/marketplace`)
2. O sidebar atual está totalmente alinhado ao produto omnichannel e não ao produto Meu Dia
3. O dashboard atual (`components/home/home-overview-view.tsx`) é semanticamente inadequado ao domínio de vida pessoal
4. Não existe ainda uma matriz oficial de mapeamento legado -> rota nova -> componente -> status
5. Não existe ainda um contrato moderno do domínio Meu Dia desacoplado do storage legado

## 12. Critérios de sucesso

A migração será considerada bem direcionada quando:
- todas as páginas principais do legado existirem na raiz em rotas reais
- o sidebar e a navegação refletirem o domínio Meu Dia
- o design antigo não for necessário para usar os fluxos
- o ciclo `diagnóstico -> objetivos/metas -> tarefas -> agenda -> acompanhamento -> relatórios` estiver navegável na raiz
- o legado `old/meu-dia-flow` puder deixar de ser referência operacional diária

## 13. Próxima macro-rodada recomendada

1. criar a matriz detalhada de mapeamento legado -> novo app
2. reescrever a taxonomia do sidebar para o domínio Meu Dia
3. criar as novas entrypoints placeholder honestas no shell atual
4. começar pelo port de `Checklist`, `Agenda` e `ObjetivosMetas`, pois são os fluxos mais compatíveis com a linguagem de workspace já existente
