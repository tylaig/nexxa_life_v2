# NexxaLife — Phase 1 Controlled Fixtures

Data: 2026-04-29
Status: especificação de fixtures controladas da onda 1
Objetivo: permitir reconstrução visual coerente sem depender do storage legado nem da persistência final.

---

## 1. Princípios das fixtures

1. Fixture controlada não é mock aleatório; é contrato de interface temporário.
2. A fixture deve parecer produto real o bastante para validar UX.
3. A fixture não deve simular engine complexa que ainda não foi definida.
4. Toda fixture deve ser pequena, legível, estável e rastreável.

---

## 2. Domínios cobertos na onda 1

- profile/contexto
- onboarding
- dashboard summary
- goals
- checklist

---

## 3. Estrutura de arquivos recomendada

```text
lib/nexxalife/mock/
├── profile.ts
├── onboarding.ts
├── dashboard.ts
├── goals.ts
├── checklist.ts
└── index.ts
```

---

## 4. Fixtures mínimas por domínio

## 4.1 Profile fixture

Objetivo:
- sustentar header, contexto inicial e mensagens de personalização

Campos mínimos:
- `id`
- `displayName`
- `lifeContext`
- `focusAreas[]`

Exemplo conceitual:
- usuário em reorganização de rotina, clareza e execução

---

## 4.2 Onboarding fixture

Objetivo:
- sustentar progressão em etapas sem backend

Campos mínimos:
- `id`
- `profileId`
- `currentStep`
- `completedSteps[]`
- `readinessLevel`

Etapas sugeridas:
1. contexto de vida
2. foco atual
3. desafios principais
4. disponibilidade/ritmo
5. revisão inicial

---

## 4.3 Dashboard summary fixture

Objetivo:
- sustentar cards, painéis e foco narrativo

Campos mínimos:
- `profileId`
- `scoreLabel`
- `focusMessage`
- `activeGoals`
- `completedTasksToday`
- `plannedTasksToday`

Observação:
- não calcular score real nesta fase
- usar rótulos honestos e descritivos, não pseudociência precoce

---

## 4.4 Goals fixture

Objetivo:
- sustentar listagem, progresso e priorização visual

Campos mínimos por item:
- `id`
- `title`
- `description`
- `status`
- `progressPercent`
- `pillar`
- `targetDate`

Quantidade inicial recomendada:
- 3 a 5 objetivos

Distribuição sugerida:
- 1 objetivo principal ativo
- 1 objetivo secundário ativo
- 1 objetivo pausado
- 1 objetivo quase concluído

---

## 4.5 Checklist fixture

Objetivo:
- sustentar execução do dia com variação visual realista

Campos mínimos por item:
- `id`
- `title`
- `status`
- `goalId?`
- `plannedFor`
- `notes?`

Quantidade inicial recomendada:
- 5 a 8 tarefas

Distribuição sugerida:
- 2 concluídas
- 2 pendentes
- 1 bloqueada
- 1 opcional/baixa prioridade

---

## 5. Cenário narrativo comum das fixtures

Para manter consistência entre páginas, todas as fixtures da onda 1 devem representar o mesmo momento do usuário.

Cenário sugerido:
- usuário iniciou reorganização pessoal/profissional
- quer recuperar clareza, consistência e execução
- já completou parte do onboarding
- possui poucos objetivos ativos, porém relevantes
- tem uma rotina diária parcialmente organizada

Isso evita que cada página conte uma história diferente.

---

## 6. View models derivados permitidos

São permitidos view models simples derivados das fixtures base, por exemplo:
- `todayCompletionRate`
- `activeGoalsCount`
- `topFocusArea`
- `checklistBlockedCount`

Não são permitidos ainda:
- motor de score real
- geração automática de metas por regra
- cálculo longitudinal complexo

---

## 7. Regras de honestidade da fixture

1. Não chamar de “IA” algo que é apenas fixture.
2. Não forjar histórico profundo inexistente.
3. Não mascarar ausência de persistência como se já estivesse pronta.
4. O objetivo é validar UX, não vender backend imaginário.

---

## 8. Dados iniciais sugeridos

## 8.1 Profile
- `displayName`: `Samuel` ou um alias neutro de demonstração, conforme a surface
- `lifeContext`: reorganização de foco, energia e consistência diária
- `focusAreas`: `Clareza`, `Execução`, `Rotina`

## 8.2 Onboarding
- `currentStep`: `disponibilidade`
- `completedSteps`: `contexto`, `foco`, `desafios`
- `readinessLevel`: `in_progress`

## 8.3 Dashboard
- `scoreLabel`: `Base inicial em construção`
- `focusMessage`: `Seu maior ganho agora vem de consistência diária e redução de dispersão.`
- `activeGoals`: `3`
- `completedTasksToday`: `2`
- `plannedTasksToday`: `5`

## 8.4 Goals
- objetivo 1: reorganizar rotina-base
- objetivo 2: retomar meta estratégica principal
- objetivo 3: consolidar revisão semanal

## 8.5 Checklist
- tarefa de foco profundo
- tarefa de revisão de prioridades
- tarefa de organização da agenda
- tarefa de fechamento do dia

---

## 9. Próximos arquivos esperados

Quando a implementação começar, materializar:
- `lib/nexxalife/mock/profile.ts`
- `lib/nexxalife/mock/onboarding.ts`
- `lib/nexxalife/mock/dashboard.ts`
- `lib/nexxalife/mock/goals.ts`
- `lib/nexxalife/mock/checklist.ts`
- `lib/nexxalife/mock/index.ts`

---

## 10. Critério de pronto

A especificação de fixtures está pronta quando:
- cobre as quatro superfícies da onda 1
- mantém uma narrativa consistente entre páginas
- não depende do storage legado
- permite iniciar implementação visual sem inventar domínio complexo
