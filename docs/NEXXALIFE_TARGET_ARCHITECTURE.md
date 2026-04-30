# NexxaLife — Target Architecture

Data: 2026-04-29
Status: arquitetura alvo inicial para Fase A/B

---

## 1. Decisão estrutural

O NexxaLife deve nascer como:

> um módulo/vertical própria dentro de uma fundação inspirada no `chat.meusuper.app`, com namespace explícito, contratos isolados e separação rigorosa entre referência legada e implementação final.

Decisão recomendada:
- `NexxaLife` não deve ser apenas uma coleção de páginas soltas
- `NexxaLife` não deve depender de `old/meu-dia-flow` em runtime
- `NexxaLife` deve ser tratado como produto novo com fronteiras internas claras

---

## 2. Princípios de arquitetura

1. `old` é referência; `new` é produto.
2. UI, contrato e engine não avançam misturados.
3. `localStorage` não é fonte canônica do negócio.
4. Todo domínio crítico precisa de contrato explícito antes de engine final.
5. A primeira entrega deve privilegiar navegação, clareza de informação e rastreabilidade.

---

## 3. Estrutura-alvo recomendada

```text
nexxalifenew/
├── docs/
├── app/
│   └── (app)/
│       └── nexxalife/
│           ├── page.tsx                  # overview / dashboard
│           ├── onboarding/
│           ├── goals/
│           ├── checklist/
│           ├── diagnostic/
│           ├── agenda/
│           ├── diary/
│           ├── reports/
│           └── admin/
├── components/
│   └── nexxalife/
│       ├── old/                         # wrappers, snapshots, referências, blocos espelhados
│       ├── new/                         # primitives e blocos finais
│       ├── shell/
│       ├── dashboard/
│       ├── goals/
│       ├── checklist/
│       ├── diagnostic/
│       └── admin/
├── features/
│   └── nexxalife/
│       ├── onboarding/
│       ├── dashboard/
│       ├── goals/
│       ├── checklist/
│       ├── diagnostic/
│       ├── framework/
│       ├── agenda/
│       ├── diary/
│       └── reports/
├── lib/
│   └── nexxalife/
│       ├── contracts/
│       ├── mappers/
│       ├── mock/
│       ├── services/
│       ├── repositories/
│       └── routes.ts
└── packages/
    └── (opcional em fase posterior)
```

Se o repositório continuar como workspace documental temporário, esta árvore funciona como scaffold de destino.

---

## 3.1 Estratégia de entrypoint principal

A base lógica inspirada no `chat.meusuper.app` deve entrar pelo `app/page.tsx` da raiz, e não apenas pelo namespace interno do módulo.

Decisão prática:
- `app/page.tsx` deve funcionar como entrypoint canônico do produto
- esse entrypoint deve redirecionar imediatamente para `/nexxalife`
- a página principal passa a reproduzir o padrão observado no `chat.meusuper.app`, onde a raiz decide a entrada operacional do produto
- a lógica de shell, rotas e composição permanece encapsulada no namespace `/nexxalife`

Consequência arquitetural:
- a fundação do produto nasce na raiz do App Router
- o módulo NexxaLife continua isolado como vertical interna
- a adoção da base lógica do `chat.meusuper.app` ocorre via fluxo de entrada e organização do app, não via cópia literal do runtime legado
- a raiz precisa manter um host Next mínimo próprio para que o módulo seja executável sem depender estruturalmente de `old/chat.meusuper.app`

---

## 4. Organização por camadas

### 4.1 Camada de rotas
Responsabilidade:
- declarar entrypoints do produto
- compor shell, loading, empty/error states e módulos
- não conter regra de negócio complexa

Exemplos de rotas-alvo:
- `/nexxalife`
- `/nexxalife/onboarding`
- `/nexxalife/goals`
- `/nexxalife/checklist`
- `/nexxalife/diagnostic`
- `/nexxalife/agenda`
- `/nexxalife/diary`
- `/nexxalife/reports`
- `/nexxalife/admin`

### 4.2 Camada de componentes
Separação obrigatória:
- `components/nexxalife/old/*` = referência, espelhamento, wrappers de comparação, documentação visual
- `components/nexxalife/new/*` = blocos novos prontos para produção

Subcamadas úteis:
- `shell/` = navegação, tabs, breadcrumbs, page-header
- `dashboard/` = KPI cards, summaries, insight panels
- `goals/` = cards, lists, progress bars, breakdowns
- `checklist/` = list item, day summary, completion widgets

### 4.3 Camada de features
Responsabilidade:
- orquestrar UI + view state + casos de uso por domínio
- manter estado local/controlado do módulo
- servir como ponte entre rotas e contratos

### 4.4 Camada lib
Responsabilidade:
- contratos de domínio
- mapeadores legado → novo quando necessário para estudo
- mock controlled fixtures
- interfaces de persistência futuras
- namespaces e helpers compartilhados

---

## 5. Entidades de domínio iniciais

### 5.1 Core de identidade/contexto
- `Profile`
- `OnboardingSnapshot`
- `UserPreferences`

### 5.2 Núcleo analítico
- `FrameworkDefinition`
- `FrameworkVersion`
- `Axis`
- `Dimension`
- `Question`
- `DiagnosticSession`
- `DiagnosticAnswer`
- `DiagnosticResultSnapshot`

### 5.3 Planejamento e execução
- `Goal`
- `GoalMilestone`
- `ChecklistTask`
- `DailyChecklist`
- `AgendaEvent`
- `DiaryEntry`

### 5.4 Fechamento e governança
- `ReportSnapshot`
- `AdminChangeLog`
- `AuditEvent`

---

## 6. Contratos mínimos da Fase 1

Os contratos iniciais devem cobrir somente o necessário para a onda visual controlada:

1. `Profile`
2. `OnboardingSnapshot`
3. `DashboardSummary`
4. `Goal`
5. `ChecklistTask`

Tudo além disso deve permanecer documentado como extensão futura, não como implementação prematura.

---

## 7. Estratégia de dados

### Verdade atual
O legado persiste via `src/services/storage.js` com CRUD local sobre `localStorage`.

### Verdade alvo
A nova arquitetura deve ser preparada para:
- persistência real (ex.: Supabase/Postgres)
- camada de repositório
- mocks controlados na fase visual
- separação entre:
  - entidade de domínio
  - view model
  - cache transitório

### Regra
Durante Fase 1 e parte da Fase 2:
- mock controlado é aceito
- pseudo-banco local legado não é aceito como verdade do negócio

---

## 8. Modo de migração visual

A UI deve seguir três fontes, nesta ordem:
1. narrativa/fluxo do `old/meu-dia-flow`
2. shell/componentização do `old/chat.meusuper.app`
3. novos contratos e estados do `nexxalifenew`

Padrão de página recomendado:
- page header claro
- breadcrumbs ou contexto de etapa
- KPIs/resumo quando fizer sentido
- bloco operacional principal
- empty/loading/error states explícitos
- feedback de ação explícito

---

## 9. Fronteira old/new

### `old`
Pode conter:
- screenshots mentais/documentais
- nomes de telas e blocos
- copy reaproveitável
- componentes analisados e etiquetados como referência

### `new`
Deve conter:
- componentes finais
- contratos finais
- mocks controlados
- navegação oficial
- repositórios e serviços futuros

### Proibição
Nenhum domínio crítico do runtime deve importar `storage.js` nem depender de rotas/componentes do legado como base estrutural.

---

## 10. Primeira onda recomendada

### Rotas prioritárias
- `/nexxalife/onboarding`
- `/nexxalife`
- `/nexxalife/goals`
- `/nexxalife/checklist`

### Componentes prioritários
- shell do módulo
- header + summary cards
- cards/listas de objetivo
- lista diária de checklist

### Contratos prioritários
- `Profile`
- `OnboardingSnapshot`
- `DashboardSummary`
- `Goal`
- `ChecklistTask`

---

## 11. Critérios para avançar da Fase B para C

Só iniciar migração visual quando existirem:
- arquitetura documentada
- matriz de migração fechada
- backlog priorizado
- mapa old/new publicado
- scaffold de diretórios criado
- contratos iniciais rascunhados

---

## 12. Decisões abertas para fases futuras

1. monólito simples vs workspace modular
2. auth embutida vs serviço externo
3. persistência SQL direta vs camada BFF/API
4. agenda com calendário simples vs sincronização externa
5. relatórios estáticos vs gerados dinamicamente por snapshots

Enquanto essas decisões não travarem a Fase 1, a execução pode prosseguir.
