# NexxaLife — Plano de Gamificação, Score Progressivo e Evolução por Área

## Objetivo

Transformar a NexxaLife em uma plataforma completa de produtividade gamificada, onde o usuário evolui progressivamente em cada área da vida através de:

- diagnóstico inicial;
- novas perguntas dinâmicas;
- avaliações recorrentes;
- métricas comportamentais;
- tarefas concluídas;
- metas alcançadas;
- consistência diária/semanal;
- níveis, XP, conquistas e streaks;
- score vivo por área;
- agente de IA acompanhando progresso e sugerindo próximos desafios.

A ideia central: o diagnóstico inicial não é o fim. Ele é o **nível 0 do personagem**.

---

## Visão de produto

A NexxaLife deve funcionar como um **RPG de evolução pessoal**.

Cada usuário tem áreas principais:

```text
Saúde
Mente
Produtividade
Finanças
Relações
Propósito
```

Cada área tem:

- score atual;
- nível;
- XP;
- histórico de evolução;
- perguntas pendentes;
- métricas ativas;
- hábitos vinculados;
- metas vinculadas;
- conquistas desbloqueadas;
- recomendações da IA.

Exemplo:

```text
Saúde
Score: 46%
Nível: 3
XP: 420 / 600
Status: Recuperação estratégica
Missão ativa: dormir antes de 23:30 por 4 dias
```

---

## Conceito principal: score vivo

Hoje o score vem do diagnóstico inicial.

No modelo gamificado, o score deve ser recalculado continuamente com base em quatro fontes:

```text
Score Vivo = Diagnóstico + Métricas + Execução + Revisões
```

### 1. Diagnóstico

Perguntas estruturadas respondidas pelo usuário.

### 2. Métricas

Dados objetivos ou semiobjetivos, como:

- tarefas concluídas;
- checklists completos;
- eventos cumpridos;
- diário preenchido;
- humor registrado;
- energia reportada;
- foco reportado;
- sono informado;
- dinheiro acompanhado;
- interações/relações registradas.

### 3. Execução

Ações concretas feitas no sistema:

- metas criadas;
- tarefas concluídas;
- streaks mantidos;
- blocos de agenda cumpridos;
- hábitos repetidos.

### 4. Revisões

Autoavaliações periódicas:

- check-in diário;
- revisão semanal;
- nova rodada de perguntas;
- revisão mensal.

---

## Fórmula inicial sugerida

Cada área pode ter um score de 0 a 100.

```text
area_score =
  diagnostic_weight * diagnostic_score +
  behavior_weight * behavior_score +
  consistency_weight * consistency_score +
  reflection_weight * reflection_score
```

Pesos iniciais:

```text
Diagnóstico: 35%
Comportamento/execução: 35%
Consistência: 20%
Reflexão/revisão: 10%
```

Exemplo:

```text
Saúde =
  0.35 * diagnóstico_saúde +
  0.35 * execução_saúde +
  0.20 * consistência_saúde +
  0.10 * reflexão_saúde
```

Com o tempo, o diagnóstico inicial deve perder peso.

```text
Primeira semana: diagnóstico pesa 35%
Após 30 dias: diagnóstico pesa 20%
Após 90 dias: diagnóstico pesa 10%
```

Motivo: a plataforma deve valorizar comportamento real, não apenas uma resposta inicial.

---

## Níveis por área

Cada área pode ter níveis de 1 a 20.

```text
Nível 1: 0–9%
Nível 2: 10–14%
Nível 3: 15–19%
...
Nível 20: 95–100%
```

Alternativa melhor: usar XP acumulado por área.

```text
Level 1: 0 XP
Level 2: 100 XP
Level 3: 250 XP
Level 4: 450 XP
Level 5: 700 XP
...
```

O score representa qualidade atual.
O nível representa jornada acumulada.

Isso evita o problema de o usuário perder “nível” quando tiver uma semana ruim.

---

## Diferença entre Score, XP e Level

### Score

Mede o estado atual.

```text
Como essa área está agora?
```

Pode subir ou descer.

### XP

Mede esforço acumulado.

```text
Quanto o usuário já trabalhou nessa área?
```

Só sobe.

### Level

Representa progresso desbloqueado.

```text
Qual patamar o usuário já alcançou?
```

Só sobe ou raramente sofre penalidade leve.

### Streak

Mede consistência.

```text
Quantos dias/semanas seguidas o usuário manteve o ciclo?
```

Pode quebrar.

---

## Áreas e métricas sugeridas

## 1. Saúde

### Métricas

- horas de sono;
- qualidade do sono;
- energia diária;
- atividade física;
- alimentação consciente;
- hidratação;
- check-ins de corpo;
- eventos de saúde na agenda.

### Perguntas recorrentes

- Como está sua energia hoje?
- Você dormiu bem?
- Seu corpo está pedindo descanso ou movimento?
- Qual hábito físico mais impactaria sua semana?

### XP

- +10 XP por check-in de energia;
- +15 XP por tarefa de saúde concluída;
- +25 XP por atividade física registrada;
- +30 XP por manter rotina por 3 dias;
- +50 XP por revisão semanal de saúde.

---

## 2. Mente

### Métricas

- humor;
- ansiedade/estresse;
- clareza mental;
- journaling;
- meditação/reflexão;
- qualidade emocional;
- carga mental percebida.

### Perguntas recorrentes

- Qual emoção dominou seu dia?
- O que está ocupando sua mente agora?
- Qual pensamento precisa ser organizado?
- Você está evitando alguma decisão?

### XP

- +10 XP por check-in emocional;
- +20 XP por entrada no diário;
- +25 XP por reflexão guiada;
- +40 XP por identificar padrão mental;
- +60 XP por concluir ciclo semanal de journaling.

---

## 3. Produtividade

### Métricas

- tarefas concluídas;
- foco profundo;
- blocos de agenda executados;
- taxa de conclusão do checklist;
- metas com progresso;
- interrupções percebidas;
- consistência de planejamento.

### Perguntas recorrentes

- Qual é a tarefa mais importante de hoje?
- O que está travando sua execução?
- O que precisa sair do seu checklist?
- Qual ação de 15 minutos moveria seu dia?

### XP

- +5 XP por tarefa simples concluída;
- +15 XP por tarefa importante concluída;
- +25 XP por bloco de foco realizado;
- +40 XP por concluir checklist diário;
- +70 XP por completar semana com 80%+ de execução.

---

## 4. Finanças

### Métricas

- clareza financeira;
- gastos registrados;
- revisão de orçamento;
- metas financeiras;
- reserva;
- receita;
- pendências financeiras;
- ansiedade financeira.

### Perguntas recorrentes

- Você sabe quanto pode gastar esta semana?
- Qual pendência financeira está drenando energia?
- Existe uma decisão financeira sendo adiada?
- Qual pequena ação aumentaria sua clareza financeira?

### XP

- +10 XP por check-in financeiro;
- +25 XP por registrar gastos;
- +40 XP por revisar orçamento;
- +50 XP por criar plano de reserva;
- +80 XP por fechar semana com clareza financeira.

---

## 5. Relações

### Métricas

- qualidade de conexão;
- conversas importantes;
- tempo com pessoas relevantes;
- conflitos pendentes;
- gratidão/apoio;
- isolamento percebido.

### Perguntas recorrentes

- Quem precisa da sua atenção esta semana?
- Qual conversa você está evitando?
- Você se sentiu conectado ou isolado hoje?
- Qual relação merece um gesto simples?

### XP

- +10 XP por check-in relacional;
- +20 XP por mensagem/conexão intencional;
- +30 XP por resolver pendência;
- +40 XP por conversa importante;
- +60 XP por revisão semanal de relações.

---

## 6. Propósito

### Métricas

- clareza de direção;
- alinhamento entre ações e valores;
- progresso em projetos significativos;
- sensação de sentido;
- decisões importantes;
- aprendizado.

### Perguntas recorrentes

- O que hoje se conectou com seu futuro?
- Qual ação teve mais sentido?
- Você está construindo algo ou só reagindo?
- Qual decisão aproxima você da vida que quer?

### XP

- +15 XP por check-in de propósito;
- +25 XP por ação alinhada a meta maior;
- +40 XP por decisão estratégica;
- +60 XP por avanço em projeto importante;
- +100 XP por revisão mensal de direção.

---

# Sistema de perguntas progressivas

## Tipos de perguntas

### 1. Perguntas de diagnóstico

Usadas no início para criar baseline.

### 2. Perguntas de check-in diário

Curtas, rápidas, contextuais.

Exemplo:

```text
De 0 a 10, como está sua energia hoje?
```

### 3. Perguntas de causa raiz

Usadas quando uma área está baixa ou caindo.

Exemplo:

```text
O que mais está drenando sua energia nesta semana?
```

### 4. Perguntas adaptativas

Escolhidas pela IA com base em comportamento.

Exemplo:

```text
Notei que você concluiu tarefas, mas não registrou descanso. Você está compensando produtividade com energia física?
```

### 5. Perguntas de revisão semanal

Usadas para recalibrar score.

Exemplo:

```text
Qual área mais melhorou esta semana?
```

---

## Motor de perguntas

Criar uma camada:

```text
question_engine
```

Ela decide:

- qual área perguntar;
- qual pergunta fazer;
- quando perguntar;
- se a pergunta deve impactar score;
- se a pergunta deve gerar missão;
- se a resposta deve ir para memória.

### Critérios para escolher perguntas

```text
1. Área com menor score
2. Área com maior queda recente
3. Área sem dados há muitos dias
4. Área relacionada à meta ativa
5. Área que a IA detectou como gargalo
```

---

# Sistema de missões

## Tipos de missão

### Missão diária

Pequena e executável.

```text
Beber água ao acordar
Fazer 15 minutos de foco
Registrar humor antes de dormir
```

### Missão semanal

Mais estratégica.

```text
Completar 4 treinos leves
Fazer revisão financeira
Concluir 3 blocos de foco profundo
```

### Missão de recuperação

Quando uma área está baixa.

```text
Sono abaixo de 40% → missão de recuperação de sono
Produtividade abaixo de 40% → missão de clareza diária
```

### Missão boss fight

Desafio maior.

```text
Resolver conversa difícil
Finalizar projeto importante
Organizar vida financeira do mês
```

### Missão de manutenção

Quando área está alta.

```text
Manter 80%+ por 7 dias
```

---

## Estrutura de missão

```ts
type Mission = {
  id: string
  userId: string
  area: LifeArea
  type: "daily" | "weekly" | "recovery" | "boss" | "maintenance"
  title: string
  description: string
  xpReward: number
  scoreImpact: number
  status: "active" | "completed" | "failed" | "skipped"
  startsAt: string
  dueAt: string
  completedAt?: string
}
```

---

# Sistema de conquistas

## Exemplos

### Geral

- Primeiro diagnóstico concluído.
- Primeira meta criada.
- Primeira semana completa.
- 7 dias de check-in.
- 30 dias de evolução.

### Saúde

- 3 dias registrando energia.
- 5 tarefas de saúde concluídas.
- Primeira semana com score de saúde subindo.

### Produtividade

- Primeiro bloco de foco.
- 10 tarefas concluídas.
- Checklist 100% completo por 3 dias.

### Mente

- 5 entradas no diário.
- Primeira causa raiz identificada.
- Semana emocional mapeada.

---

## Estrutura de conquista

```ts
type Achievement = {
  id: string
  key: string
  area?: LifeArea
  title: string
  description: string
  icon: string
  xpReward: number
  unlockedAt?: string
}
```

---

# Sistema de streaks

## Tipos

```text
Daily check-in streak
Checklist streak
Journal streak
Focus streak
Health streak
Weekly review streak
```

## Regra importante

Streak não pode punir demais.

Se o usuário falhar um dia, usar conceito de **proteção de streak**.

Exemplo:

```text
1 proteção por semana se o usuário justificar ou fizer recuperação no dia seguinte.
```

---

# Score por área: regras de aumento

## Saúde

Aumenta quando:

- check-in de energia melhora;
- sono melhora;
- tarefas de saúde são concluídas;
- usuário mantém rotina;
- diário indica menos exaustão.

Diminui quando:

- área fica sem dados;
- usuário relata queda de energia;
- tarefas críticas são ignoradas por vários dias;
- check-ins indicam piora.

## Produtividade

Aumenta quando:

- checklist é concluído;
- metas avançam;
- blocos de foco são cumpridos;
- usuário reduz tarefas pendentes;
- planejamento semanal é feito.

Diminui quando:

- muitas tarefas vencem;
- usuário não planeja;
- agenda/checklist ficam vazios;
- diário indica dispersão.

## Mente

Aumenta quando:

- usuário registra emoções;
- faz journaling;
- identifica padrões;
- reduz sobrecarga;
- conclui missões de clareza.

Diminui quando:

- humor cai;
- estresse sobe;
- usuário evita revisões;
- sinais de sobrecarga aparecem.

---

# Data model sugerido

## `life_area_scores`

```sql
create table life_area_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  area text not null,
  score numeric not null default 0,
  level int not null default 1,
  xp int not null default 0,
  streak int not null default 0,
  diagnostic_score numeric,
  behavior_score numeric,
  consistency_score numeric,
  reflection_score numeric,
  last_calculated_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, area)
);
```

## `score_events`

```sql
create table score_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  area text not null,
  event_type text not null,
  source_type text,
  source_id uuid,
  xp_delta int default 0,
  score_delta numeric default 0,
  reason text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

## `adaptive_questions`

```sql
create table adaptive_questions (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  question text not null,
  type text not null,
  weight numeric default 1,
  active boolean default true,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

## `user_question_answers`

```sql
create table user_question_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  question_id uuid references adaptive_questions(id),
  area text not null,
  answer_text text,
  answer_value numeric,
  impact_score numeric default 0,
  impact_xp int default 0,
  created_at timestamptz default now()
);
```

## `missions`

```sql
create table missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  area text not null,
  type text not null,
  title text not null,
  description text,
  xp_reward int default 0,
  score_impact numeric default 0,
  status text not null default 'active',
  starts_at timestamptz default now(),
  due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

## `achievements`

```sql
create table achievements (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  area text,
  title text not null,
  description text,
  icon text,
  xp_reward int default 0,
  condition jsonb default '{}'::jsonb,
  active boolean default true,
  created_at timestamptz default now()
);
```

## `user_achievements`

```sql
create table user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  achievement_id uuid references achievements(id),
  unlocked_at timestamptz default now(),
  metadata jsonb default '{}'::jsonb,
  unique(user_id, achievement_id)
);
```

---

# Interface sugerida

## Dashboard gamificado

```text
┌────────────────────────────────────┐
│ Evolução geral: 58%   Nível 7       │
│ Streak: 5 dias      XP: 3400        │
├────────────────────────────────────┤
│ Saúde          46%  Nível 3         │
│ Mente          62%  Nível 5         │
│ Produtividade  71%  Nível 6         │
│ Finanças       38%  Nível 2         │
│ Relações       54%  Nível 4         │
│ Propósito      67%  Nível 5         │
└────────────────────────────────────┘
```

## Página de área

Cada área deve ter uma página ou painel:

```text
Saúde
- Score atual
- XP/nível
- Missão ativa
- Perguntas pendentes
- Histórico de evolução
- Recomendações da IA
- Hábitos conectados
- Conquistas da área
```

## Chat com agente

O agente deve usar o score para falar:

```text
“Sua produtividade subiu 8 pontos esta semana, mas saúde caiu 4. Minha leitura: você está comprando execução com energia física. Sugiro uma missão de recuperação leve antes de adicionar mais metas.”
```

---

# Integração com agente OpenClaw-like

O agente deve ganhar novas tools:

```text
getLifeAreaScores
updateLifeAreaScore
createMission
completeMission
getActiveMissions
createAdaptiveQuestion
answerAdaptiveQuestion
unlockAchievement
getAchievements
recordScoreEvent
```

## Tools de leitura

Sem aprovação:

```text
getLifeAreaScores
getActiveMissions
getAchievements
getScoreHistory
```

## Tools de escrita

Com aprovação:

```text
createMission
updateLifeAreaScore
createAdaptiveQuestion
unlockAchievement
recordScoreEvent
```

A aprovação pode ser em pacote, igual às metas/checklist/agenda.

---

# Roadmap de implementação

## Fase 1 — Modelagem de score vivo

- [ ] Criar tipos `LifeArea`, `LifeAreaScore`, `ScoreEvent`.
- [ ] Criar helper de cálculo de score.
- [ ] Criar fórmula inicial com pesos.
- [ ] Criar função para converter diagnóstico em score inicial.
- [ ] Criar função para calcular level por XP.
- [ ] Criar função para aplicar XP.
- [ ] Criar função para aplicar score delta.
- [ ] Criar documentação da fórmula.
- [ ] Validar build.

## Fase 2 — Banco de dados

- [ ] Criar tabela `life_area_scores`.
- [ ] Criar tabela `score_events`.
- [ ] Criar tabela `adaptive_questions`.
- [ ] Criar tabela `user_question_answers`.
- [ ] Criar tabela `missions`.
- [ ] Criar tabela `achievements`.
- [ ] Criar tabela `user_achievements`.
- [ ] Criar seed inicial de perguntas.
- [ ] Criar seed inicial de conquistas.
- [ ] Validar RLS/Supabase.

## Fase 3 — Inicialização pós-diagnóstico

- [ ] Ao finalizar diagnóstico, criar scores iniciais por área.
- [ ] Criar primeiro evento de score por área.
- [ ] Criar nível inicial.
- [ ] Criar XP inicial simbólico.
- [ ] Desbloquear conquista “Primeiro Diagnóstico”.
- [ ] Criar missões iniciais baseadas nas 3 áreas mais fracas.
- [ ] Mostrar score gamificado no chat inicial.
- [ ] Validar build.

## Fase 4 — UI gamificada

- [ ] Criar componente `LifeAreaScoreCard`.
- [ ] Criar componente `XpProgressBar`.
- [ ] Criar componente `LevelBadge`.
- [ ] Criar componente `StreakBadge`.
- [ ] Criar componente `MissionCard`.
- [ ] Criar componente `AchievementToast`.
- [ ] Criar painel de evolução geral.
- [ ] Criar painel por área.
- [ ] Integrar no dashboard.
- [ ] Integrar no chat da Nexxa.
- [ ] Validar mobile.
- [ ] Validar dark mode.

## Fase 5 — Perguntas adaptativas

- [ ] Criar banco inicial de perguntas por área.
- [ ] Criar lógica para escolher próxima pergunta.
- [ ] Criar UI de pergunta rápida.
- [ ] Criar impacto de resposta no score.
- [ ] Criar XP por resposta.
- [ ] Criar pergunta de causa raiz quando score cair.
- [ ] Criar pergunta de manutenção quando score subir.
- [ ] Integrar perguntas no agente.
- [ ] Validar build.

## Fase 6 — Missões

- [ ] Criar missões diárias.
- [ ] Criar missões semanais.
- [ ] Criar missões de recuperação.
- [ ] Criar missões boss fight.
- [ ] Vincular missões ao checklist/agenda.
- [ ] Dar XP ao concluir missão.
- [ ] Aplicar score delta ao concluir missão.
- [ ] Mostrar missões no dashboard.
- [ ] Mostrar missões no chat.
- [ ] Validar build.

## Fase 7 — Conquistas

- [ ] Criar achievements iniciais.
- [ ] Criar verificador de conquistas.
- [ ] Criar toast/modal de conquista.
- [ ] Criar página/lista de conquistas.
- [ ] Criar conquistas por área.
- [ ] Criar conquistas por streak.
- [ ] Criar conquistas por milestones.
- [ ] Integrar XP reward.
- [ ] Validar build.

## Fase 8 — Streaks e consistência

- [ ] Criar streak diário.
- [ ] Criar streak por área.
- [ ] Criar streak de checklist.
- [ ] Criar streak de diário.
- [ ] Criar streak de foco.
- [ ] Criar proteção de streak.
- [ ] Criar missão de recuperação quando streak quebra.
- [ ] Validar build.

## Fase 9 — Agente gamificado

- [ ] Criar tools `getLifeAreaScores`.
- [ ] Criar tools `recordScoreEvent`.
- [ ] Criar tools `createMission`.
- [ ] Criar tools `completeMission`.
- [ ] Criar tools `answerAdaptiveQuestion`.
- [ ] Criar tools `unlockAchievement`.
- [ ] Adicionar ícones no tool registry.
- [ ] Adicionar aprovação em pacote para missões/score.
- [ ] Fazer agente explicar evolução em linguagem humana.
- [ ] Validar build.

## Fase 10 — Revisões periódicas

- [ ] Criar revisão diária.
- [ ] Criar revisão semanal.
- [ ] Criar revisão mensal.
- [ ] Recalcular score por período.
- [ ] Mostrar gráficos de evolução.
- [ ] Gerar relatório da semana.
- [ ] Gerar plano da próxima semana.
- [ ] Integrar com fase tracking do agente.
- [ ] Validar build.

---

# Critérios de sucesso

A gamificação estará funcionando quando:

- cada área tiver score, XP, level e streak;
- diagnóstico inicial gerar baseline;
- tarefas e missões aumentarem XP;
- perguntas adaptativas recalibrarem scores;
- usuário enxergar evolução progressiva;
- agente comentar subidas/quedas com contexto;
- conquistas forem desbloqueadas;
- missões forem criadas com base em áreas fracas;
- score não for apenas decorativo, mas orientar o agente;
- a plataforma parecer um RPG sério de evolução pessoal.

---

# Nota de produto

A promessa da NexxaLife pode ser:

```text
Transforme sua vida em um sistema evolutivo: cada ação melhora uma área, cada revisão revela um padrão, cada semana desbloqueia um novo nível.
```

A plataforma não deve gamificar de forma infantil. A estética deve ser premium, estratégica e adulta.

Mais parecida com:

```text
cockpit de evolução pessoal
```

Menos parecida com:

```text
joguinho de pontos aleatórios
```
