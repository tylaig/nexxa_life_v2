# Nexxa Agent — Plano de Implementação OpenClaw-like

## Objetivo

Transformar o chat atual da Nexxa em um **agente de IA human-in-the-loop**, com estrutura inspirada no OpenClaw:

- respostas formatadas e consistentes;
- execução de múltiplas tools por ciclo;
- timeline visual de ações;
- ícone, status e resultado para cada tool executada;
- aprovação humana antes de qualquer ação que altere dados;
- fase inicial de **planejamento** baseada no diagnóstico;
- segunda fase de **acompanhamento contínuo** baseada em metas, checklist, agenda, diário e memória.

A meta não é apenas “ter um chat”. A meta é criar um **sistema operacional pessoal agentic**, onde o usuário vê o raciocínio operacional da IA, aprova ações importantes e acompanha evolução ao longo do tempo.

---

## Visão do produto

### Fase 1 — Planejamento

A fase de planejamento começa logo após o diagnóstico inicial.

A IA deve:

1. Ler o diagnóstico preenchido.
2. Calcular score geral e scores por área.
3. Identificar áreas críticas.
4. Identificar alavancas/forças.
5. Gerar uma leitura estratégica inicial.
6. Propor plano inicial.
7. Sugerir metas, tarefas e blocos de agenda.
8. Pedir aprovação humana antes de salvar qualquer coisa.
9. Após aprovação, migrar para acompanhamento.

### Fase 2 — Acompanhamento

A fase de acompanhamento começa depois que o plano base foi aprovado.

A IA deve:

1. Ler metas ativas.
2. Ler checklist do dia.
3. Ler agenda.
4. Ler diário/memória.
5. Detectar progresso, atraso, risco e prioridade atual.
6. Sugerir próximas ações.
7. Registrar aprendizados/memória com aprovação.
8. Manter o usuário em movimento sem sobrecarregar.

---

## Princípios de design do agente

### 1. Agent first, chat second

A conversa é apenas a interface textual. O produto real é o agente executando ciclos de:

```text
contexto → análise → proposta → aprovação → execução → registro → acompanhamento
```

### 2. Human-in-the-loop obrigatório

Toda ação que altera dados precisa de aprovação humana.

Leitura pode ser automática.
Escrita precisa de confirmação.

### 3. Transparência operacional

O usuário deve ver:

- quais tools foram usadas;
- por que foram usadas;
- o que foi retornado;
- o que está aguardando aprovação;
- o que foi executado;
- o que falhou.

### 4. Respostas formatadas

A IA não deve responder como texto livre aleatório. Cada fase deve ter um contrato de formatação.

### 5. Estado persistente

O agente precisa lembrar:

- fase atual;
- plano aprovado;
- decisões anteriores;
- histórico de tools;
- progresso do usuário;
- mudanças de prioridade.

---

## Arquitetura proposta

```text
Nexxa Agent
├── Agent UI Shell
│   ├── Chat principal
│   ├── Painel de diagnóstico/plano
│   ├── Timeline de tools
│   ├── Cards de aprovação
│   └── Painel de memória/contexto
│
├── Agent Runtime
│   ├── Phase controller
│   ├── Tool registry
│   ├── Approval policy
│   ├── Response formatter
│   └── Event recorder
│
├── Agent Tools
│   ├── readMemory
│   ├── searchMemory
│   ├── appendMemory
│   ├── getGoals
│   ├── addGoal
│   ├── getChecklist
│   ├── addChecklistItem
│   ├── getAgenda
│   ├── addAgendaEvent
│   ├── getJournalEntries
│   └── addJournalEntry
│
└── Persistence
    ├── agent_sessions
    ├── agent_events
    ├── agent_approvals
    └── agent_phase_state
```

---

## Estrutura de arquivos sugerida

```text
lib/agent/
  phases.ts
  tool-registry.ts
  approval-policy.ts
  response-contracts.ts
  event-types.ts
  agent-state.ts
  prompt-builders.ts

components/agent/
  agent-shell.tsx
  agent-phase-header.tsx
  agent-message.tsx
  agent-response-block.tsx
  agent-tool-card.tsx
  agent-approval-card.tsx
  agent-timeline.tsx
  agent-context-panel.tsx
  agent-plan-panel.tsx
  agent-diagnostic-brief.tsx

app/api/agent/
  session/route.ts
  events/route.ts
  approval/route.ts
  phase/route.ts

supabase/migrations/
  YYYYMMDD_create_agent_sessions.sql
  YYYYMMDD_create_agent_events.sql
  YYYYMMDD_create_agent_approvals.sql
```

---

## Modelo de fases

```ts
export type AgentPhase =
  | "planning"
  | "plan_review"
  | "tracking"
  | "weekly_review"
  | "paused"
```

### `planning`

A IA analisa o diagnóstico e cria a primeira leitura.

### `plan_review`

A IA apresenta metas/tarefas/agenda sugeridas, mas ainda não salva tudo automaticamente.

### `tracking`

O plano foi aprovado. A IA acompanha execução diária.

### `weekly_review`

Revisão semanal: progresso, ajustes e nova estratégia.

### `paused`

Usuário pausou o acompanhamento.

---

## Tool Registry

Criar um registro central de tools.

Exemplo:

```ts
export const NEXXA_TOOL_REGISTRY = {
  readMemory: {
    label: "Memória lida",
    description: "Consulta contexto persistente do usuário.",
    icon: Brain,
    category: "context",
    risk: "low",
    approval: "none",
  },
  getGoals: {
    label: "Metas consultadas",
    description: "Lê metas ativas e histórico de objetivos.",
    icon: Target,
    category: "read",
    risk: "low",
    approval: "none",
  },
  addGoal: {
    label: "Meta sugerida",
    description: "Cria uma nova meta estratégica.",
    icon: Target,
    category: "write",
    risk: "medium",
    approval: "required",
  },
  addChecklistItem: {
    label: "Tarefa sugerida",
    description: "Adiciona ação concreta ao checklist.",
    icon: CheckCircle2,
    category: "write",
    risk: "medium",
    approval: "required",
  },
  addAgendaEvent: {
    label: "Agenda sugerida",
    description: "Bloqueia tempo na agenda.",
    icon: Calendar,
    category: "write",
    risk: "medium",
    approval: "required",
  },
}
```

---

## Política human-in-the-loop

### Tools sem aprovação

```text
readMemory
searchMemory
getAllMemory
getGoals
getChecklist
getAgenda
getJournalEntries
```

Essas tools apenas leem dados.

### Tools com aprovação obrigatória

```text
appendMemory
addGoal
addChecklistItem
addAgendaEvent
addJournalEntry
updateGoal
deleteGoal
updateChecklistItem
deleteChecklistItem
```

Essas tools alteram estado do usuário.

### Estados de aprovação

```ts
type ApprovalStatus =
  | "not_required"
  | "pending"
  | "approved"
  | "rejected"
  | "removed_from_batch"
  | "edited_by_user"
  | "approved_with_note"
  | "expired"
  | "failed"
```

### Aprovação em pacote

O agente pode propor múltiplas ações ao mesmo tempo. Em vez de obrigar o usuário a aprovar item por item, a UI deve permitir um **pacote de aprovação**.

O usuário pode:

- aprovar todas as ações selecionadas;
- remover ações específicas do pacote;
- editar campos antes de aprovar;
- adicionar observação em cada item;
- confirmar remoções para que a IA saiba que aquele item foi descartado;
- aprovar parcialmente: algumas ações executam, outras são rejeitadas.

Exemplo:

```text
Pacote sugerido pela IA:
- Criar meta: Recuperar energia diária
- Criar tarefa: Caminhar 15 minutos
- Criar tarefa: Revisar finanças às sextas
- Criar agenda: Bloco de foco 08:30

Usuário:
- aprova meta;
- remove tarefa de finanças;
- edita caminhada para 10 minutos;
- adiciona observação: “começar só 3x por semana”.
```

Estrutura sugerida:

```ts
type ApprovalBatchItem = {
  toolCallId: string
  toolName: string
  originalInput: unknown
  reviewedInput: unknown
  selected: boolean
  note?: string
  status: "pending" | "approved" | "removed" | "executed" | "failed"
}
```

---

## Timeline de eventos

Cada ação do agente deve virar um evento renderizável.

```ts
type AgentEvent = {
  id: string
  sessionId: string
  type:
    | "message"
    | "tool_call"
    | "tool_result"
    | "approval_requested"
    | "approval_approved"
    | "approval_rejected"
    | "phase_changed"
    | "memory_updated"
    | "plan_created"
    | "plan_approved"
  toolName?: string
  title: string
  description?: string
  payload: unknown
  status: "pending" | "running" | "success" | "error" | "cancelled"
  createdAt: string
}
```

### Exemplo visual

```text
🧠 Memória lida
🎯 Meta sugerida: Recuperar energia diária
✅ Aguardando aprovação
📅 Evento sugerido: Bloco de revisão às 08:30
🟢 Plano aprovado
```

---

## Contratos de resposta

### Contrato da fase de planejamento

A primeira resposta da IA deve seguir este formato:

```md
**Leitura estratégica**
[Resumo curto baseado no diagnóstico]

**Score geral**
[porcentagem + interpretação]

**Prioridades agora**
1. [área crítica + motivo]
2. [área crítica + motivo]
3. [área crítica + motivo]

**Alavancas do seu perfil**
- [força 1]
- [força 2]

**Plano inicial recomendado**
- [ação mínima 1]
- [ação mínima 2]
- [ação mínima 3]

**Pergunta de causa raiz**
[uma única pergunta profunda]
```

### Contrato da fase de revisão do plano

```md
**Plano sugerido**
[Resumo do plano]

**Metas propostas**
- [meta 1]
- [meta 2]

**Rotina proposta**
- [checklist]
- [agenda]

**O que precisa da sua aprovação**
[lista curta de cards/tool calls]
```

### Contrato da fase de acompanhamento

```md
**Check-in de hoje**
[estado atual]

**O que eu verifiquei**
- metas
- checklist
- agenda
- memória

**Risco atual**
[baixo/médio/alto + motivo]

**Próxima ação mínima**
[ação clara]

**Pergunta rápida**
[uma pergunta no máximo]
```

---

## Banco de dados sugerido

### `agent_sessions`

```sql
create table agent_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  phase text not null default 'planning',
  status text not null default 'active',
  diagnostic_snapshot jsonb,
  approved_plan jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### `agent_events`

```sql
create table agent_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references agent_sessions(id) on delete cascade,
  user_id uuid not null,
  type text not null,
  tool_name text,
  title text not null,
  description text,
  payload jsonb default '{}'::jsonb,
  status text not null default 'success',
  created_at timestamptz default now()
);
```

### `agent_approvals`

```sql
create table agent_approvals (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references agent_sessions(id) on delete cascade,
  user_id uuid not null,
  tool_call_id text not null,
  tool_name text not null,
  input jsonb not null,
  status text not null default 'pending',
  result jsonb,
  created_at timestamptz default now(),
  resolved_at timestamptz
);
```

---

# Roadmap por fases

## Fase 0 — Estabilização do chat atual

Objetivo: garantir que a base atual funcione antes da refatoração maior.

### Checklist

- [x] Corrigir erro `append is not a function`.
- [x] Migrar `useChat` para `sendMessage`.
- [x] Migrar retorno da API para `toUIMessageStreamResponse()`.
- [x] Garantir build funcionando.
- [x] Criar abertura visual pós-diagnóstico com scores e prioridades.
- [ ] Resolver warnings de `metadataBase`.
- [ ] Resolver ruído de `cookies` em `/login` e `/signup` durante prerender.
- [ ] Testar manualmente envio de mensagem em `/nexxa`.
- [ ] Testar manualmente envio de mensagem em `/planning`.

---

## Fase 1 — Tool Registry central

Objetivo: parar de espalhar metadados de tools dentro do componente do chat.

### Entregáveis

```text
lib/agent/tool-registry.ts
lib/agent/approval-policy.ts
lib/agent/event-types.ts
```

### Checklist

- [ ] Criar `NEXXA_TOOL_REGISTRY`.
- [ ] Definir ícone por tool.
- [ ] Definir categoria por tool: `read`, `write`, `memory`, `planning`, `tracking`.
- [ ] Definir risco por tool: `low`, `medium`, `high`.
- [ ] Definir aprovação: `none`, `required`, `danger`.
- [ ] Criar helper `getToolMeta(toolName)`.
- [ ] Criar helper `requiresApproval(toolName)`.
- [ ] Migrar `TOOL_META` de `AiStudioView` para o registry.
- [ ] Validar que timeline continua renderizando tools antigas.
- [ ] Validar build.

---

## Fase 2 — Timeline OpenClaw-like

Objetivo: transformar o painel de insights em um histórico claro de execução do agente.

### Entregáveis

```text
components/agent/agent-timeline.tsx
components/agent/agent-tool-card.tsx
components/agent/agent-event-card.tsx
```

### Checklist

- [ ] Criar `AgentTimeline`.
- [ ] Criar `AgentToolCard`.
- [ ] Criar estados visuais: `pending`, `running`, `success`, `error`, `rejected`.
- [ ] Mostrar ícone da tool.
- [ ] Mostrar nome amigável da tool.
- [ ] Mostrar input resumido.
- [ ] Mostrar output/result quando expandido.
- [ ] Mostrar erro quando tool falhar.
- [ ] Agrupar eventos por ciclo de execução.
- [ ] Diferenciar leitura, escrita e memória por cor.
- [ ] Substituir `InsightCard` antigo gradualmente.
- [ ] Validar build.

---

## Fase 3 — Human-in-the-loop real

Objetivo: nenhuma escrita acontece sem aprovação explícita.

### Entregáveis

```text
components/agent/agent-approval-card.tsx
lib/agent/approval-policy.ts
app/api/agent/approval/route.ts
```

### Checklist

- [x] Criar primeira versão de `ToolApprovalBatch` para múltiplas aprovações.
- [x] Permitir selecionar/remover itens do pacote.
- [x] Permitir editar campos antes de aprovar.
- [x] Permitir observações por item.
- [x] Executar múltiplas ações aprovadas em sequência.
- [x] Rejeitar/remover múltiplas ações em sequência.
- [ ] Criar `AgentApprovalCard` definitivo em `components/agent/`.
- [ ] Renderizar botão `Aprovar tudo`.
- [ ] Renderizar botão `Rejeitar tudo`.
- [ ] Mostrar diff entre input original e input editado.
- [ ] Bloquear execução automática de tools mutantes.
- [ ] Executar tool apenas depois de aprovação.
- [ ] Registrar aprovação em evento local ou banco.
- [ ] Mostrar resultado depois da execução.
- [ ] Mostrar falha caso executor retorne erro.
- [ ] Adicionar confirmação especial para ações perigosas futuras.
- [ ] Validar fluxo com `addGoal`.
- [ ] Validar fluxo com `addChecklistItem`.
- [ ] Validar fluxo com `addAgendaEvent`.
- [ ] Validar build.

---

## Fase 4 — Separação formal de fases

Objetivo: o agente deve saber se está planejando ou acompanhando.

### Entregáveis

```text
lib/agent/phases.ts
lib/agent/agent-state.ts
components/agent/agent-phase-header.tsx
```

### Checklist

- [ ] Criar tipo `AgentPhase`.
- [ ] Criar estado local inicial: `planning`.
- [ ] Criar header visual da fase atual.
- [ ] Criar botão `Aprovar plano e iniciar acompanhamento`.
- [ ] Criar transição `planning → plan_review`.
- [ ] Criar transição `plan_review → tracking`.
- [ ] Ajustar prompt da IA conforme fase.
- [ ] Na fase planning, focar diagnóstico e plano.
- [ ] Na fase tracking, focar execução diária.
- [ ] Persistir fase em localStorage inicialmente.
- [ ] Validar build.

---

## Fase 5 — Persistência de sessões e eventos

Objetivo: histórico agentic sobreviver entre sessões e permitir auditoria.

### Entregáveis

```text
agent_sessions
agent_events
agent_approvals
```

### Checklist

- [ ] Criar migration `agent_sessions`.
- [ ] Criar migration `agent_events`.
- [ ] Criar migration `agent_approvals`.
- [ ] Criar server actions para sessão atual.
- [ ] Criar server actions para registrar evento.
- [ ] Criar server actions para registrar aprovação.
- [ ] Salvar snapshot do diagnóstico na sessão.
- [ ] Salvar plano aprovado.
- [ ] Restaurar fase ao abrir `/nexxa`.
- [ ] Restaurar timeline ao abrir `/nexxa`.
- [ ] Validar RLS/Supabase se aplicável.
- [ ] Validar build.

---

## Fase 6 — Response formatter

Objetivo: respostas deixarem de ser blocos livres de texto e ganharem estrutura consistente.

### Entregáveis

```text
lib/agent/response-contracts.ts
components/agent/agent-response-block.tsx
components/agent/agent-message.tsx
```

### Checklist

- [ ] Definir contrato de resposta de planejamento.
- [ ] Definir contrato de resposta de acompanhamento.
- [ ] Definir contrato de revisão semanal.
- [ ] Criar renderização de blocos especiais: insight, prioridade, ação, pergunta.
- [ ] Suportar Markdown básico.
- [ ] Suportar fallback para texto comum.
- [ ] Ajustar prompt para sempre usar seções claras.
- [ ] Opcional: pedir JSON estruturado para blocos ricos.
- [ ] Validar respostas longas.
- [ ] Validar respostas curtas.
- [ ] Validar build.

---

## Fase 7 — Planejamento completo pós-diagnóstico

Objetivo: o primeiro fluxo pós-diagnóstico precisa parecer uma consultoria inicial.

### Checklist

- [x] Mostrar score geral em porcentagem.
- [x] Mostrar áreas com barras de progresso.
- [x] Mostrar prioridades imediatas.
- [x] Mostrar alavancas do perfil.
- [ ] Adicionar gráfico radar diretamente no card inicial.
- [ ] Adicionar seção “hipótese da IA”.
- [ ] Adicionar seção “plano de 7 dias”.
- [ ] Criar cards de metas sugeridas.
- [ ] Criar cards de tarefas sugeridas.
- [ ] Criar cards de agenda sugerida.
- [ ] Exigir aprovação para salvar plano.
- [ ] Após aprovação, salvar plano no banco.
- [ ] Migrar fase para `tracking`.
- [ ] Validar build.

---

## Fase 8 — Acompanhamento diário

Objetivo: transformar Nexxa em companheiro operacional diário.

### Checklist

- [ ] Criar abertura diária automática baseada em metas/checklist/agenda.
- [ ] Tool loop obrigatório antes de responder: `getGoals`, `getChecklist`, `getAgenda`, `readMemory`.
- [ ] Mostrar resumo do dia.
- [ ] Mostrar risco atual: baixo/médio/alto.
- [ ] Mostrar próxima ação mínima.
- [ ] Permitir gerar novas tarefas com aprovação.
- [ ] Permitir reagendar ação com aprovação.
- [ ] Registrar aprendizados em memória com aprovação.
- [ ] Criar card “progresso de hoje”.
- [ ] Criar card “pendências críticas”.
- [ ] Validar build.

---

## Fase 9 — Revisão semanal

Objetivo: criar ciclo de melhoria contínua.

### Checklist

- [ ] Detectar fim/início de semana.
- [ ] Ler dados da semana.
- [ ] Calcular progresso por área.
- [ ] Identificar gargalos.
- [ ] Identificar vitórias.
- [ ] Sugerir ajustes no plano.
- [ ] Pedir aprovação para alterar metas/checklist/agenda.
- [ ] Criar relatório semanal visual.
- [ ] Salvar resumo em memória.
- [ ] Validar build.

---

## Fase 10 — Polimento de UX

Objetivo: deixar a experiência premium, clara e confiável.

### Checklist

- [ ] Melhorar animações da timeline.
- [ ] Adicionar microcopy para estados vazios.
- [ ] Criar skeletons durante tool execution.
- [ ] Adicionar indicação “IA verificando contexto”.
- [ ] Adicionar indicação “aguardando aprovação”.
- [ ] Melhorar cards no mobile.
- [ ] Melhorar contraste dark mode.
- [ ] Criar histórico filtrável por tool.
- [ ] Criar filtros: leitura, escrita, memória, aprovação, erro.
- [ ] Validar responsividade.
- [ ] Validar build.

---

# Checklist mestre

## Fundação

- [ ] Centralizar registry de tools.
- [ ] Centralizar política de aprovação.
- [ ] Centralizar tipos de eventos.
- [ ] Centralizar fases do agente.
- [ ] Centralizar contratos de resposta.

## UI

- [ ] Criar Agent Shell.
- [ ] Criar Timeline OpenClaw-like.
- [ ] Criar cards de tool.
- [ ] Criar cards de aprovação.
- [ ] Criar cards de resposta estruturada.
- [ ] Criar header de fase.
- [ ] Criar painel de plano.
- [ ] Criar painel de contexto/memória.

## Agente

- [ ] Implementar fase planning.
- [ ] Implementar fase plan_review.
- [ ] Implementar fase tracking.
- [ ] Implementar revisão semanal.
- [ ] Implementar loop de leitura antes de resposta.
- [ ] Implementar aprovação antes de escrita.
- [ ] Implementar persistência de eventos.

## Dados

- [ ] Criar `agent_sessions`.
- [ ] Criar `agent_events`.
- [ ] Criar `agent_approvals`.
- [ ] Salvar diagnóstico snapshot.
- [ ] Salvar plano aprovado.
- [ ] Restaurar sessão ativa.
- [ ] Restaurar timeline.

## Qualidade

- [ ] Build passa.
- [ ] Chat envia mensagens.
- [ ] Tools de leitura funcionam.
- [ ] Tools de escrita aguardam aprovação.
- [ ] Aprovar executa corretamente.
- [ ] Rejeitar não executa.
- [ ] Timeline registra tudo.
- [ ] Fase muda corretamente.
- [ ] Mobile funciona.
- [ ] Dark mode funciona.

---

# Ordem recomendada de implementação

## Sprint 1 — Base agentic visual

1. Criar `lib/agent/tool-registry.ts`.
2. Criar `components/agent/agent-tool-card.tsx`.
3. Criar `components/agent/agent-timeline.tsx`.
4. Migrar timeline atual para usar registry.
5. Validar build.

## Sprint 2 — Human-in-the-loop

1. Criar approval policy.
2. Criar approval card.
3. Migrar `addGoal`, `addChecklistItem`, `addAgendaEvent` para aprovação real.
4. Registrar status visual na timeline.
5. Validar fluxo completo.

## Sprint 3 — Fases do agente

1. Criar phase controller.
2. Separar prompt planning/tracking.
3. Criar botão de aprovação do plano.
4. Migrar para acompanhamento.
5. Validar persistência inicial via localStorage.

## Sprint 4 — Persistência real

1. Criar tabelas.
2. Criar server actions/API.
3. Persistir sessão, eventos e aprovações.
4. Restaurar timeline.
5. Validar com usuário real.

## Sprint 5 — Acompanhamento premium

1. Criar check-in diário.
2. Criar revisão semanal.
3. Criar relatório visual.
4. Criar ajustes automáticos com aprovação.
5. Polir UX final.

---

# Critérios de sucesso

O projeto estará no ponto certo quando:

- o usuário terminar o diagnóstico e ver imediatamente um plano visual;
- a IA iniciar com leitura estratégica, não saudação genérica;
- toda tool executada aparecer na timeline com ícone;
- toda ação de escrita pedir aprovação;
- o usuário conseguir aprovar/rejeitar pelo card;
- o agente mudar de planejamento para acompanhamento;
- o acompanhamento diário ler contexto antes de responder;
- histórico, plano e eventos persistirem entre sessões;
- a experiência parecer um copiloto real, não um chatbot comum.

---

# Nota de produto

A Nexxa deve parecer menos como:

```text
“Como posso ajudar?”
```

E mais como:

```text
“Eu li seu diagnóstico, identifiquei o gargalo principal, montei uma hipótese, preparei ações e estou aguardando sua aprovação para executar.”
```

Essa é a diferença entre chat e agente.
