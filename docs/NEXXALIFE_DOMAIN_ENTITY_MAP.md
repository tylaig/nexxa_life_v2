# NexxaLife — Domain Entity Map

Data: 2026-04-29
Status: mapa documental inicial das entidades centrais
Objetivo: definir o vocabulário canônico do novo NexxaLife antes da implementação pesada de lógica.

---

## 1. Princípios deste mapa

1. Este documento canoniza intenção de domínio, não schema final de banco.
2. O legado serve para descoberta, mas não dita o modelo final.
3. As entidades abaixo devem orientar contratos, páginas, features e persistência futura.
4. Sempre que houver conflito entre naming legado e clareza canônica, vence a clareza canônica.

---

## 2. Camadas conceituais do domínio

### 2.1 Identidade e contexto
Entidades que explicam quem é a pessoa, em que estágio está e com qual contexto o produto opera.

### 2.2 Framework e diagnóstico
Entidades que definem a estrutura avaliativa do produto, suas versões e o ciclo diagnóstico.

### 2.3 Planejamento e execução
Entidades que transformam diagnóstico em objetivos, metas, tarefas e rotina.

### 2.4 Reflexão e fechamento
Entidades que consolidam diário, snapshots, relatórios e auditoria.

---

## 3. Entidades centrais

## 3.1 Profile

Representa a identidade principal do usuário dentro do NexxaLife.

Campos conceituais mínimos:
- `id`
- `displayName`
- `email` (futuro, quando houver auth real)
- `lifeContext`
- `focusAreas[]`
- `timezone`
- `createdAt`
- `updatedAt`

Responsabilidades:
- servir de âncora para onboarding, dashboard e preferências
- contextualizar foco e linguagem do produto

Não deve conter:
- resultado diagnóstico completo
- progresso operacional detalhado
- cálculos agregados transitórios

---

## 3.2 UserPreferences

Preferências operacionais/pessoais que afetam apresentação e rotina.

Campos sugeridos:
- `profileId`
- `preferredTone`
- `workWindows[]`
- `energyPattern`
- `notificationPreferences`
- `privacyFlags`

Responsabilidades:
- influenciar agenda, lembranças, UI e ritmo sugerido

---

## 3.3 OnboardingSnapshot

Fotografa o estado do onboarding em um momento do tempo.

Campos conceituais:
- `id`
- `profileId`
- `currentStep`
- `completedSteps[]`
- `answers`
- `readinessLevel`
- `createdAt`
- `updatedAt`

Responsabilidades:
- permitir retomada do onboarding
- armazenar inputs iniciais que alimentam o primeiro dashboard

Observação:
- onboarding não substitui diagnóstico
- onboarding prepara o terreno para diagnóstico e planejamento

---

## 3.4 FrameworkDefinition

Objeto raiz do framework avaliativo do produto.

Campos conceituais:
- `id`
- `slug`
- `name`
- `description`
- `status`
- `activeVersionId`

Responsabilidades:
- representar a existência do framework como produto administrável
- apontar para a versão ativa publicada

---

## 3.5 FrameworkVersion

Versão publicada ou rascunho do framework usado em diagnósticos.

Campos conceituais:
- `id`
- `frameworkId`
- `versionLabel`
- `status` (`draft`, `published`, `archived`)
- `publishedAt`
- `createdBy`
- `changeSummary`

Responsabilidades:
- congelar a estrutura usada por um diagnóstico histórico
- permitir evolução do framework sem quebrar comparabilidade

Regra importante:
- um diagnóstico concluído deve apontar para uma `FrameworkVersion`, não para a estrutura “atual” flutuante

---

## 3.6 Axis

Grande pilar do framework.

Campos conceituais:
- `id`
- `frameworkVersionId`
- `name`
- `description`
- `weight`
- `order`

Responsabilidades:
- organizar o framework em macrodimensões
- permitir agregação de score por eixo

---

## 3.7 Dimension

Subestrutura dentro de um eixo.

Campos conceituais:
- `id`
- `axisId`
- `name`
- `description`
- `weight`
- `order`

Responsabilidades:
- detalhar o eixo em categorias menores e mais acionáveis

---

## 3.8 Question

Pergunta operacional do diagnóstico.

Campos conceituais:
- `id`
- `dimensionId`
- `prompt`
- `helpText`
- `questionType`
- `scaleDefinition`
- `weight`
- `required`
- `order`
- `mappingRules`

Responsabilidades:
- coletar resposta estruturada
- conectar resposta à lógica de cálculo

---

## 3.9 DiagnosticSession

Representa a sessão diagnóstica de um usuário.

Campos conceituais:
- `id`
- `profileId`
- `frameworkVersionId`
- `status` (`draft`, `in_progress`, `completed`, `abandoned`)
- `startedAt`
- `completedAt`
- `contextSnapshot`

Responsabilidades:
- servir como contêiner da tomada diagnóstica
- preservar o contexto em que o diagnóstico foi feito

---

## 3.10 DiagnosticAnswer

Resposta individual de uma pergunta dentro de uma sessão.

Campos conceituais:
- `id`
- `sessionId`
- `questionId`
- `rawValue`
- `normalizedValue`
- `notes`
- `answeredAt`

Responsabilidades:
- registrar input bruto e normalizado
- alimentar rastreabilidade do cálculo

---

## 3.11 DiagnosticResultSnapshot

Snapshot consolidado do resultado de uma sessão diagnóstica.

Campos conceituais:
- `id`
- `sessionId`
- `frameworkVersionId`
- `overallScore`
- `axisScores[]`
- `dimensionScores[]`
- `riskSignals[]`
- `strengthSignals[]`
- `calculationVersion`
- `generatedAt`

Responsabilidades:
- servir de base para dashboard, metas e relatórios
- garantir reprodução histórica

Decisão de naming:
- usar `overallScore` como nome canônico novo
- conflitos legados como `generalScore` devem ser tratados apenas em mapeadores, não no modelo canônico

---

## 3.12 Goal

Objetivo principal derivado do diagnóstico ou criado manualmente.

Campos conceituais:
- `id`
- `profileId`
- `origin` (`diagnostic`, `manual`, `admin-suggested`)
- `title`
- `description`
- `status`
- `priority`
- `pillar`
- `targetDate`
- `progressPercent`

Responsabilidades:
- representar a intenção estratégica do usuário
- conectar diagnóstico com execução prática

---

## 3.13 GoalMilestone

Marco intermediário de uma meta/objetivo.

Campos conceituais:
- `id`
- `goalId`
- `title`
- `status`
- `targetDate`
- `completionCriteria`
- `progressPercent`

Responsabilidades:
- quebrar objetivos em etapas mensuráveis

---

## 3.14 ChecklistTask

Unidade diária/semanal de execução.

Campos conceituais:
- `id`
- `profileId`
- `goalId?`
- `milestoneId?`
- `title`
- `status` (`pending`, `done`, `blocked`, `skipped`)
- `priority`
- `plannedFor`
- `completedAt`
- `notes`

Responsabilidades:
- materializar o plano em ação observável
- alimentar métricas operacionais de rotina

---

## 3.15 DailyChecklist

Agregado diário de tarefas e contexto operacional.

Campos conceituais:
- `id`
- `profileId`
- `date`
- `taskIds[]`
- `completionRate`
- `mood`
- `energy`
- `notes`

Responsabilidades:
- consolidar execução de um dia
- permitir leitura de consistência operacional

---

## 3.16 AgendaEvent

Compromisso, bloco de foco ou evento operacional do usuário.

Campos conceituais:
- `id`
- `profileId`
- `relatedTaskId?`
- `title`
- `kind`
- `startAt`
- `endAt`
- `status`
- `locationOrMode`
- `notes`

Responsabilidades:
- estruturar o calendário operacional
- integrar planejamento com tempo real disponível

---

## 3.17 DiaryEntry

Registro reflexivo/manual do usuário.

Campos conceituais:
- `id`
- `profileId`
- `date`
- `title?`
- `body`
- `mood`
- `energy`
- `tags[]`
- `linkedGoalIds[]`

Responsabilidades:
- capturar reflexão qualitativa
- enriquecer contexto para leitura longitudinal futura

---

## 3.18 ReportSnapshot

Saída consolidada de leitura e comunicação do ciclo.

Campos conceituais:
- `id`
- `profileId`
- `sourceDiagnosticResultId`
- `period`
- `headline`
- `summary`
- `insights[]`
- `recommendations[]`
- `generatedAt`

Responsabilidades:
- fechar ciclos de percepção de valor
- transformar dados e execução em narrativa acionável

---

## 3.19 AdminChangeLog

Registro administrativo de alteração do framework/governança.

Campos conceituais:
- `id`
- `actorId`
- `entityType`
- `entityId`
- `changeType`
- `beforeSnapshot`
- `afterSnapshot`
- `createdAt`

Responsabilidades:
- permitir auditoria e governança do framework

---

## 3.20 AuditEvent

Evento transversal de auditoria do sistema.

Campos conceituais:
- `id`
- `actorType`
- `actorId`
- `domain`
- `action`
- `targetType`
- `targetId`
- `metadata`
- `createdAt`

Responsabilidades:
- registrar trilhas críticas do produto
- permitir observabilidade funcional e histórica

---

## 4. Relações principais

```text
Profile
├── UserPreferences
├── OnboardingSnapshot[*]
├── DiagnosticSession[*]
├── Goal[*]
├── ChecklistTask[*]
├── DailyChecklist[*]
├── AgendaEvent[*]
├── DiaryEntry[*]
└── ReportSnapshot[*]

FrameworkDefinition
└── FrameworkVersion[*]
    └── Axis[*]
        └── Dimension[*]
            └── Question[*]

DiagnosticSession
├── DiagnosticAnswer[*]
└── DiagnosticResultSnapshot[1]

Goal
└── GoalMilestone[*]
    └── ChecklistTask[*]
```

---

## 5. Entidades mínimas por onda

### Onda 1 — UI controlada
- `Profile`
- `OnboardingSnapshot`
- `DashboardSummary` (view model)
- `Goal`
- `ChecklistTask`

### Onda 2 — governança e diagnóstico
- `FrameworkDefinition`
- `FrameworkVersion`
- `Axis`
- `Dimension`
- `Question`
- `DiagnosticSession`
- `DiagnosticAnswer`
- `DiagnosticResultSnapshot`

### Onda 3 — rotina e fechamento
- `GoalMilestone`
- `DailyChecklist`
- `AgendaEvent`
- `DiaryEntry`
- `ReportSnapshot`

---

## 6. View models recomendados

Nem tudo precisa ser entidade de domínio pura na UI. Alguns modelos podem nascer como view model:
- `DashboardSummary`
- `ChecklistDaySummary`
- `GoalProgressCard`
- `ReportOverviewCard`
- `DiagnosticOverviewPanel`

Regra:
- view model serve a tela
- entidade de domínio serve a verdade do produto

---

## 7. Dívidas legadas que este mapa corrige

1. conflito entre `generalScore` e `overallScore`
2. mistura entre estrutura admin e consumo do diagnóstico
3. dependência de coleções locais sem tipagem clara
4. acoplamento de jornada com pseudo-CRUD do navegador

---

## 8. Próximo uso esperado

Este documento deve alimentar:
- contratos TypeScript em `lib/nexxalife/contracts/*`
- mocks controlados da primeira onda
- especificação do shell e dos blocos operacionais
- backlog de modelagem das fases seguintes
