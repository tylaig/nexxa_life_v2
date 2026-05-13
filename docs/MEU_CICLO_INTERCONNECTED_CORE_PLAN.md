# NexxaLife — Reconstrução do Core Interconectado do Meu Ciclo

## Objetivo

Refatorar o Meu Ciclo para deixar de ser um conjunto de páginas isoladas e virar um sistema interconectado:

```text
Diagnóstico → Áreas → Metas → Marcos → Checklist → Agenda → Diário → Score → Revisão → Novas metas
```

A regra principal:

> Toda tarefa do checklist deve ter contexto. Preferencialmente deve nascer de uma meta, missão, área da vida ou revisão.

---

## Problema atual

Hoje existem páginas funcionais, mas ainda separadas:

- metas existem em `/goals`;
- checklist existe em `/checklist`;
- agenda existe em `/agenda`;
- diário existe em `/journal`;
- diagnóstico existe em `/diagnostic`;
- score gamificado foi criado como nova camada.

Mas o usuário precisa sentir um sistema único:

```text
Por que esta tarefa existe?
Qual meta ela move?
Qual área ela melhora?
Qual missão ela cumpre?
Qual score ela impacta?
O que a IA aprendeu depois?
```

---

## Novo modelo mental

### 1. Meta

A meta é o norte.

Exemplo:

```text
Recuperar energia física nas próximas 4 semanas
```

### 2. Marco

O marco quebra a meta em progresso observável.

```text
Dormir antes de 23:30 por 5 dias
```

### 3. Checklist

O checklist vira execução diária conectada.

```text
Hoje: preparar sono às 22:45
```

### 4. Agenda

A agenda bloqueia tempo real.

```text
22:45–23:15 rotina de desligamento
```

### 5. Diário

O diário fecha o loop com reflexão.

```text
Como foi minha energia ao acordar?
```

### 6. Score

O score sobe/desce com base em execução, consistência e avaliação.

---

## Fluxo core

```text
Usuário/IA cria meta
  ↓
IA propõe marcos
  ↓
IA gera checklist conectado
  ↓
IA agenda blocos de execução
  ↓
Usuário executa
  ↓
Sistema registra score event
  ↓
Diário pergunta reflexão contextual
  ↓
IA revisa e propõe próxima ação
```

---

## Nova camada de dados

Criar vínculos diretos nos registros existentes:

### `checklist_items`

Adicionar:

- `goal_id`
- `mission_id`
- `life_area`
- `source_type`
- `source_id`
- `impact_score`
- `xp_reward`

### `agenda_events`

Adicionar:

- `goal_id`
- `mission_id`
- `life_area`
- `source_type`
- `source_id`

### `journal_entries`

Adicionar:

- `goal_id`
- `mission_id`
- `life_area`
- `source_type`
- `source_id`

### `goal_milestones`

Adicionar:

- `life_area`
- `xp_reward`
- `impact_score`

---

## UI desejada

### Checklist

Cada tarefa deve mostrar, quando disponível:

```text
Tarefa
↳ Meta: Recuperar energia física
↳ Área: Saúde
↳ +15 XP
```

Também deve ter agrupamentos por:

- prioridade;
- meta;
- área;
- missão.

### Metas

Cada meta deve mostrar:

- tarefas vinculadas;
- tarefas concluídas;
- eventos/blocos de agenda vinculados;
- recorrências da meta;
- status de preparação para Google Calendar;
- score impactado;
- próxima ação recomendada.

### Agenda

Cada evento deve indicar:

```text
Bloco de foco ligado à meta X
```

Também deve manter metadados para integração futura com calendários externos:

- provedor (`google`, `outlook`, etc.);
- id do calendário externo;
- id do evento externo;
- status de sincronização;
- regra de recorrência;
- timezone.

### Diário

O diário deve puxar perguntas contextuais:

```text
Você concluiu 2 ações da meta X. O que facilitou ou travou?
```

### Dashboard

O dashboard deve virar o cockpit:

```text
Meta principal → ações de hoje → agenda → reflexão → score
```

---

## Roadmap de refatoração

### Fase 1 — Core de dados

- [x] Criar plano de reconstrução interconectada.
- [ ] Criar migration de vínculos entre metas, checklist, agenda, diário e missões.
- [ ] Criar views SQL para ciclo conectado.
- [ ] Criar actions de leitura conectada.
- [ ] Criar action para adicionar checklist ligado à meta.
- [ ] Criar action para gerar tarefas de uma meta.
- [ ] Validar build.

### Fase 2 — Checklist conectado

- [ ] Atualizar `/checklist` para exibir meta/área/XP.
- [ ] Permitir criar tarefa vinculada a uma meta.
- [ ] Agrupar tarefas por meta.
- [ ] Ao concluir tarefa vinculada, registrar XP/score event.
- [ ] Validar build.

### Fase 3 — Metas com execução

- [x] Atualizar `/goals` para mostrar tarefas vinculadas.
- [x] Mostrar progresso real baseado em checklist/marcos.
- [x] Mostrar eventos/blocos de agenda vinculados à meta.
- [x] Mostrar recorrências da meta.
- [x] Adicionar metadados de preparação para Google Calendar.
- [ ] Adicionar botão “Gerar ações da meta”.
- [ ] Adicionar criação visual de tarefa/evento dentro da meta.
- [ ] Mostrar próxima ação recomendada.
- [x] Validar build.

### Fase 4 — Agenda conectada

- [ ] Atualizar `/agenda` para mostrar vínculos com meta/missão.
- [ ] Criar blocos de tempo a partir de tarefas.
- [ ] Validar build.

### Fase 5 — Diário contextual

- [ ] Atualizar `/journal` para sugerir reflexão baseada nas ações concluídas.
- [ ] Vincular entrada a área/meta/missão.
- [ ] Validar build.

### Fase 6 — Dashboard como ciclo

- [ ] Dashboard mostrar “ciclo de hoje”: meta → tarefas → agenda → reflexão → score.
- [ ] Remover aparência de módulos soltos.
- [ ] Validar build.

### Fase 7 — Agente operando o ciclo

- [ ] Tools de leitura do ciclo conectado.
- [ ] Tools para gerar ações conectadas à meta.
- [ ] Aprovação em pacote para ciclo completo.
- [ ] Agente explicar por que cada tarefa existe.
- [ ] Validar build.

---

## Critério de sucesso

O core estará reconstruído quando o usuário abrir qualquer página e perceber que tudo está conectado.

A pergunta-chave da plataforma deixa de ser:

```text
O que você quer fazer hoje?
```

E vira:

```text
Qual parte da sua evolução essa ação move?
```
