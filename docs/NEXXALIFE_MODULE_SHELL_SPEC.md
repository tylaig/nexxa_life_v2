# NexxaLife — Module Shell Spec

Data: 2026-04-29
Status: especificação do shell visual/estrutural do módulo
Objetivo: definir um contrato homogêneo de navegação e composição para a primeira onda de páginas do NexxaLife.

---

## 1. Objetivo do shell

O shell do módulo deve:
- dar identidade própria ao NexxaLife dentro da fundação maior
- organizar as jornadas em sequência inteligível
- reduzir acoplamento entre páginas e componentes soltos
- permitir evolução de UI sem reescrever a arquitetura a cada tela

O shell não deve:
- conter regra de negócio complexa
- acoplar renderização à persistência final
- replicar literalmente a sidebar do legado

---

## 2. Referências de origem

### Do `old/meu-dia-flow`
Aproveitar:
- narrativa aspiracional e pessoal
- hierarquia onboarding -> dashboard -> metas -> checklist
- blocos de resumo e progresso

### Do `old/chat.meusuper.app`
Aproveitar:
- organização de app shell
- previsibilidade de headers e containers
- separação de navegação estrutural vs conteúdo operacional
- padrões de states e cards

---

## 3. Estrutura do shell

Estrutura de composição recomendada:

```text
App shell global
└── NexxaLife module shell
    ├── module context bar
    ├── page header
    ├── optional progress / phase strip
    ├── local navigation
    ├── content container
    └── feedback/state zone
```

---

## 4. Blocos obrigatórios do shell

## 4.1 Module Context Bar

Papel:
- situar o usuário dentro do módulo NexxaLife
- exibir nome do módulo, etapa atual e contexto resumido

Conteúdo sugerido:
- título `NexxaLife`
- subtitle curta de propósito
- badge de fase (`Phase 1`, `Visual Controlled`, etc.)
- ação contextual opcional

---

## 4.2 Page Header

Papel:
- contextualizar a rota atual
- mostrar objetivo da página
- concentrar CTA principal

Campos padrão:
- `eyebrow`
- `title`
- `description`
- `primaryAction`
- `secondaryActions[]`

Exemplo por rota:
- onboarding: `Começar sua base`
- dashboard: `Seu panorama atual`
- goals: `Objetivos e metas`
- checklist: `Execução do dia`

---

## 4.3 Local Navigation

Papel:
- permitir navegação clara entre as superfícies centrais do módulo

Rotas da onda 1:
- dashboard
- onboarding
- objetivos & metas
- checklist

Rotas seguintes já preparadas no shell:
- diagnóstico
- agenda
- diário
- relatórios
- admin

Forma recomendada:
- tabs horizontais persistentes em desktop
- pills/segmented nav em contextos menores

---

## 4.4 Content Container

Papel:
- padronizar largura, espaçamento e hierarquia visual

Regras:
- largura máxima consistente
- espaçamento vertical previsível
- grid adaptável para KPIs e blocos principais
- uma página nunca deve improvisar container fora do shell sem motivo forte

---

## 4.5 Feedback/State Zone

Papel:
- centralizar empty/loading/error/blocked/degraded states
- tornar mocks controlados explícitos

Estados mínimos suportados:
- `loading`
- `empty`
- `error`
- `blocked`
- `mock-controlled`

Regra:
- se a página estiver usando fixture controlada, isso pode aparecer como nota discreta de contexto, não como desculpa visual poluente

---

## 5. Contrato estrutural por página

Toda página principal do NexxaLife deve respeitar este contrato:

1. `ModuleContextBar`
2. `PageHeader`
3. `LocalNavigation`
4. `Summary/KPI strip` quando fizer sentido
5. `Primary operational block`
6. `Secondary insight block` opcional
7. `State/feedback zone`

---

## 6. Layout por superfície da onda 1

## 6.1 `/nexxalife/onboarding`

Objetivo:
- iniciar a coleta de contexto e ativação

Estrutura sugerida:
- header com propósito do onboarding
- progress strip por etapas
- formulário por etapas ou cards selecionáveis
- CTA principal de avançar
- resumo lateral opcional do perfil em construção

Blocos recomendados:
- `OnboardingStepCard`
- `OnboardingProgressStrip`
- `OnboardingSummaryPanel`

---

## 6.2 `/nexxalife`

Objetivo:
- mostrar síntese do estado atual do usuário

Estrutura sugerida:
- header com visão geral
- KPI strip com 3 a 5 cartões
- bloco principal de foco atual
- bloco de objetivos ativos
- bloco de execução do dia

Blocos recomendados:
- `NexxaLifeSummaryCard`
- `FocusAreaPanel`
- `ActiveGoalsPanel`
- `TodayExecutionPanel`

---

## 6.3 `/nexxalife/goals`

Objetivo:
- visualizar objetivos, progresso e recortes estratégicos

Estrutura sugerida:
- header da área
- filtros simples por status/pilar
- grid/lista de goals
- detalhe lateral opcional ou cards expansíveis
- bloco de milestones futuras

Blocos recomendados:
- `GoalStatusFilter`
- `GoalCard`
- `GoalProgressBar`
- `MilestoneList`

---

## 6.4 `/nexxalife/checklist`

Objetivo:
- orientar a execução operacional do dia

Estrutura sugerida:
- header do dia
- resumo de taxa de conclusão
- lista principal de tarefas
- bloco de tarefas bloqueadas/adiadas
- notas rápidas do dia

Blocos recomendados:
- `ChecklistSummaryCard`
- `ChecklistTaskList`
- `ChecklistTaskItem`
- `DailyContextNote`

---

## 7. Navegação local recomendada

Ordem padrão da navegação do módulo:
1. Dashboard
2. Onboarding
3. Objetivos & Metas
4. Checklist
5. Diagnóstico
6. Agenda
7. Diário
8. Relatórios
9. Admin

Racional:
- a primeira leitura do módulo começa pela síntese
- onboarding continua próximo porque pode ser retomado
- objetivos e checklist ficam no centro da execução recorrente
- diagnóstico e admin ficam mais profundos por complexidade

---

## 8. Blocos reutilizáveis prioritários

Criar primeiro em `components/nexxalife/new/`:
- `shell/module-context-bar.tsx`
- `shell/page-header.tsx`
- `shell/local-nav.tsx`
- `shell/content-container.tsx`
- `shell/mock-context-note.tsx`
- `dashboard/summary-card.tsx`
- `goals/goal-card.tsx`
- `goals/goal-progress.tsx`
- `checklist/task-list.tsx`
- `checklist/task-item.tsx`

---

## 9. Tokens de comportamento do shell

O shell deve suportar estes sinais sem depender da lógica final:
- `currentRoute`
- `wave`
- `isUsingMockData`
- `primaryAction`
- `secondaryActions`
- `emptyState`
- `errorState`

---

## 10. Regras de UX obrigatórias

1. CTA principal sempre explícito e singular por página.
2. Não esconder estado do dado: mock, vazio, erro e bloqueio devem ser distinguíveis.
3. KPIs não devem aparecer sem legenda contextual.
4. Navegação local deve ser estável entre páginas do módulo.
5. Componentes “old inspired” não devem vazar identidade visual inconsistente sem adaptação.

---

## 11. Critério de pronto para implementação

A especificação do shell é suficiente quando permite criar:
- casca do módulo
- navegação local
- header padrão
- containers e estados compartilhados
- composição coerente das quatro páginas da onda 1

---

## 12. Próximo passo técnico sugerido

Após este documento:
1. criar fixtures controladas da onda 1
2. materializar primitives do shell em `components/nexxalife/new/shell/*`
3. criar páginas stub reais em `app/(app)/nexxalife/*`
4. plugar contratos e fixtures nas views iniciais
