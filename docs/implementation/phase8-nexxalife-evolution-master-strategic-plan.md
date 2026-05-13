# Phase 8 — NexxaLife Evolution Master Strategic Plan

Status: strategic plan registered, Slice 8A-04 completed
Date: 2026-05-12

## Goal

Transformar o NexxaLife em um sistema funcional de gestão de vida com IA, mantendo a raiz atual do app como base oficial, evoluindo o domínio Meu Dia AI/NexxaLife em ciclos verificáveis e sem voltar para o namespace transitório `/nexxalife`.

## Architecture stance

- A raiz atual do app continua sendo a fundação oficial.
- `AI Studio` deve evoluir para `Nexxa` como identidade principal da inteligência do produto.
- `Meu Ciclo` é o domínio operacional principal: diagnóstico, metas, checklist, agenda, diário e relatórios.
- A implementação deve seguir fatias pequenas com testes, validação de schema, auditoria UI e walkthrough fim-a-fim.
- Funcionalidades de IA devem ser honestas: sem simular persistência, ferramenta ou análise real quando ainda não existir contrato implementado.

## Verification loop obrigatório

Cada subfase precisa concluir com:

1. DB Schema Validation
   - conferir se migrations e repositories suportam a feature
   - adicionar migration antes de UI quando houver persistência nova
   - validar fallback/local store quando aplicável

2. UI Audit
   - checar estética premium
   - conferir sidebar, topbar, CTA, empty/loading/error states
   - classificar CTAs como REAL, MOCK explícito, BLOCKED ou NO-OP

3. AI Logic Test
   - validar prompts, tool calls, payloads e fallback behavior
   - garantir que sugestões de IA usem dados reais disponíveis
   - registrar limitações quando IA estiver em modo assistido ou determinístico

4. End-to-End Walkthrough
   - abrir a jornada real do usuário
   - executar fluxo principal sem depender apenas de teste unitário
   - registrar evidência no progress doc da fase

## Phase 8A — Core Identity & Nexxa Integration

### Objective

Renomear a camada de inteligência de `AI Studio` para `Nexxa` e preparar o fluxo de onboarding/diagnóstico para acionar preenchimento inicial assistido por IA.

### Scope

1. Branding and route taxonomy
   - substituir labels visíveis `AI Studio` por `Nexxa`
   - decidir se a rota canônica será `/nexxa` ou se `/studio` permanece como alias temporário
   - atualizar sidebar, topbar, landing, cards e docs
   - manter redirects/aliases para compatibilidade quando necessário

2. Onboarding pre-fill logic
   - detectar diagnóstico completo
   - criar estado explícito para sessão de `AI Pre-fill`
   - gerar rascunhos iniciais de metas e checklist com base nos scores
   - exigir confirmação do usuário antes de persistir sugestões automáticas

3. Messaging stability
   - verificar stream protocol do chat
   - verificar renderização de mídia, upload, drag-and-drop e voice recorder
   - confirmar que mensagens da Nexxa aparecem de forma estável no frontend

### Key files to inspect before coding

- `components/app-shell/nexxa-life-navigation.ts`
- `components/ai/ai-studio-view.tsx`
- `app/(app)/studio/page.tsx`
- `app/api/chat/route.ts`
- `app/api/chat/planning/route.ts`
- `components/auth/*`
- `components/onboarding/*`
- `components/nexxa-life/diagnostic-blocker.tsx`
- `lib/db/actions.ts`
- `db/migrations/*diagnostic*`

### Acceptance criteria

- Usuário vê `Nexxa`, não `AI Studio`, nas superfícies oficiais.
- Rota/alias de inteligência está documentada e testada.
- Usuário com diagnóstico completo recebe proposta clara de pre-fill.
- Sugestões de metas/checklist são persistidas apenas após confirmação.
- Chat/mídia continuam funcionando após rename.

## Phase 8B — Life-Cycle Engine: Meu Ciclo

### Objective

Tornar `Meu Ciclo` funcional, persistido e conectado à Nexxa.

### Scope

1. Meu Ciclo Dashboard
   - tornar a visão `Full`/expandida o padrão
   - exibir categorias imediatamente: Mind, Health, Wealth e demais áreas do framework
   - conectar cards a dados reais do usuário quando disponíveis

2. Metas
   - CRUD completo com persistência em DB
   - repository + tests + API/server actions conforme padrão do repo
   - AI Insights por meta: progresso preditivo, gargalos e estratégia sugerida

3. Checklist
   - gerenciamento diário real de tarefas
   - criação, conclusão, reagendamento e bloqueio
   - `AI Daily Plan` sugerindo tarefas a partir de metas e contexto do dia

4. Agenda
   - calendário funcional
   - eventos/blocos de foco persistidos
   - `AI Time Blocking` sugerindo horários de foco com base em metas, tarefas e energia

### Key files to inspect before coding

- `app/(app)/dashboard/page.tsx`
- `app/(app)/goals/page.tsx`
- `app/(app)/checklist/page.tsx`
- `app/(app)/agenda/page.tsx`
- `components/nexxa-life/nexxa-life-dashboard-view.tsx`
- `components/nexxa-life/nexxa-life-goals-view.tsx`
- `components/nexxa-life/nexxa-life-checklist-view.tsx`
- `components/nexxa-life/nexxa-life-agenda-view.tsx`
- `components/nexxa-life/goals-content.ts`
- `components/nexxa-life/checklist-content.ts`
- `components/nexxa-life/agenda-content.ts`
- `db/migrations/005_goals.sql`
- `db/migrations/006_checklist.sql`
- `db/migrations/007_agenda.sql`

### Acceptance criteria

- Metas, checklist e agenda funcionam com dados persistidos.
- O dashboard mostra o ciclo completo por padrão.
- Sugestões de IA são rastreáveis e revisáveis pelo usuário.
- Nenhum CTA central permanece silencioso ou falso.

## Phase 8C — Reflection & Analysis

### Objective

Transformar diário e relatórios em camada real de memória, reflexão e análise semanal.

### Scope

1. Diário
   - entradas diárias persistidas
   - `Memory Snapshots` com eventos importantes e insights do chat
   - análise de sentimento
   - sumários semanais

2. Relatórios
   - gráficos interativos funcionais
   - dados vindos de metas, checklist, agenda, diário e diagnóstico
   - `AI Auditor` com análise textual da semana

### Key files to inspect before coding

- `app/(app)/journal/page.tsx`
- `app/(app)/reports/page.tsx`
- `components/nexxa-life/nexxa-life-journal-view.tsx`
- `components/nexxa-life/nexxa-life-reports-view.tsx`
- `components/nexxa-life/reports-chart-panel.tsx`
- `components/nexxa-life/journal-content.ts`
- `components/nexxa-life/reports-content.ts`
- `db/migrations/008_journal.sql`
- `db/migrations/009_streaks.sql`
- `db/migrations/012_chat_sessions.sql`
- `db/migrations/013_agent_memory.sql`

### Acceptance criteria

- Diário salva e lista entradas reais.
- Snapshots têm origem rastreável.
- Relatórios refletem dados reais ou declaram claramente ausência de dados.
- AI Auditor não inventa performance quando faltarem sinais.

## Phase 8D — Ecosystem & Expansion

### Objective

Evoluir Academia, Marketplace e News sem poluir o núcleo do Meu Ciclo.

### Scope

1. Academia
   - biblioteca de conteúdo
   - recomendações de cursos baseadas em áreas fracas do diagnóstico

2. Marketplace
   - interface funcional de templates/coaching
   - catálogo, filtros e detalhe de item

3. News
   - feed personalizado
   - agregação por preferências e objetivos

### Key files to inspect before coding

- `app/(app)/academy/page.tsx`
- `app/(app)/marketplace/page.tsx`
- `app/(app)/news/page.tsx`
- `components/nexxa-life/nexxa-life-academy-view.tsx`
- `components/nexxa-life/nexxa-life-marketplace-view.tsx`
- `components/nexxa-life/nexxa-life-news-view.tsx`
- `components/nexxa-life/academy-content.ts`
- `components/nexxa-life/marketplace-content.ts`
- `components/nexxa-life/news-content.ts`

### Acceptance criteria

- Ecossistema fica separado do core, mas conectado por recomendação.
- Recomendações indicam claramente o motivo: score, meta ou interesse.
- Catálogos têm empty/error/loading states honestos.

## Phase 8E — Infrastructure & Admin

### Objective

Fechar sustentação operacional: integrações, perfil, admin e settings premium.

### Scope

1. Integrações
   - settings persistidas para ferramentas externas, começando por Google Calendar
   - seeds/default configs por scripts DB
   - estados de conexão claros: connected, disconnected, needs_action, error

2. User Profile
   - seleção dos 16 avatares customizados
   - edição de informações pessoais com persistência
   - integração do profile real no user menu

3. Admin Console
   - sidebar condicional para `role === 'admin'`
   - views de usuários e configurações da plataforma
   - auditoria e permissões mínimas

4. Settings
   - design unificado e premium
   - subpáginas coerentes com a arquitetura do app
   - CTAs reais ou explicitamente bloqueados

### Key files to inspect before coding

- `components/app-shell/app-sidebar.tsx`
- `components/app-shell/app-user-menu.tsx`
- `components/app-shell/nexxa-life-navigation.ts`
- `app/(app)/settings/page.tsx`
- `app/(app)/settings/profile/page.tsx`
- `app/(app)/settings/security/page.tsx`
- `app/(app)/settings/billing/page.tsx`
- `app/(app)/apps/page.tsx`
- `app/(app)/framework-admin/page.tsx`
- `modules/auth-profile/*`
- `modules/framework-admin/workspace.ts`
- `db/migrations/004_app_user_profiles.sql`
- `db/migrations/011_app_user_profiles_role.sql`

### Acceptance criteria

- Perfil do usuário deixa de ser mockado.
- Admin vê navegação condicional, usuário comum não.
- Integrações têm persistência e status verificável.
- Settings mantêm estética premium e honestidade funcional.

## Recommended implementation order

1. Phase 8A.1 — Rename visible `AI Studio` labels to `Nexxa` while preserving route compatibility.
2. Phase 8A.2 — Stabilize route taxonomy and aliases for `/studio` versus future `/nexxa`.
3. Phase 8A.3 — Add diagnostic-complete detection contract for AI pre-fill.
4. Phase 8A.4 — Generate reviewable pre-fill suggestions for goals/checklist.
5. Phase 8B.1 — Audit current DB schema and repositories for goals/checklist/agenda.
6. Phase 8B.2 — Make goals CRUD fully persistent and validated.
7. Phase 8B.3 — Make checklist daily management fully persistent and validated.
8. Phase 8B.4 — Make agenda blocks/events persistent and validated.
9. Phase 8B.5 — Wire dashboard Full view and cross-surface cycle summary.
10. Phase 8C — Add memory/reflection layer after core execution data exists.
11. Phase 8D — Expand ecosystem after core cycle is reliable.
12. Phase 8E — Harden profile/admin/settings/integrations throughout or in parallel where needed by core.

## Initial implementation slice proposal

### Slice 8A-01 — Nexxa rename and route contract

Goal: trocar identidade visível de `AI Studio` para `Nexxa` sem quebrar rotas existentes.

Suggested steps:
1. Write focused tests for navigation labels and studio page title.
2. Replace sidebar label `AI Studio` with `Nexxa`.
3. Replace topbar/title/copy in `app/(app)/studio/page.tsx` and `components/ai/ai-studio-view.tsx`.
4. Search the codebase for remaining visible `AI Studio` occurrences.
5. Decide and document whether `/studio` remains canonical temporarily or redirects to `/nexxa` later.
6. Run focused tests, then full `pnpm test` and `pnpm build`.
7. Update this progress doc with evidence.

## Open decisions

- Canonical route name: decided in Slice 8A-02. `/nexxa` is now the canonical Nexxa entrypoint in sidebar/command menu, while `/studio` remains a protected compatible legacy route rendering the same experience.
- AI pre-fill persistence model: save suggestions as draft rows, separate proposal table, or ephemeral review state until confirmed?
- Which diagnostic score taxonomy is canonical for categories like Mind, Health, Wealth?
- Which AI gateway/tool contract should power Nexxa suggestions in production versus deterministic fallback?
- Should Google Calendar integration be prioritized before or after internal Agenda persistence is fully stable?

## Current status checklist

- [x] Master Strategic Plan captured in repo documentation.
- [x] Phase 8A Slice 8A-01 completed: visible `AI Studio` labels renamed to `Nexxa`, `/studio` compatibility preserved, focused test GREEN, build GREEN.
- [x] Phase 8A Slice 8A-02 completed: `/nexxa` is canonical in navigation/command menu, `/studio` remains compatible/protected, focused test GREEN, build GREEN.
- [x] Phase 8A Slice 8A-03 completed: auth contract drift cleaned, focused auth/navigation tests GREEN, full suite GREEN, build GREEN.
- [x] Phase 8A Slice 8A-04 completed: onboarding diagnostic-to-Nexxa pre-fill design and first honest contract wired as review-only draft flow, focused test GREEN, full suite GREEN, build GREEN.
- [ ] Phase 8B implementation not started.
- [ ] Phase 8C implementation not started.
- [ ] Phase 8D implementation not started.
- [ ] Phase 8E implementation not started.
- [x] Verification loop evidence started in `phase8-nexxalife-evolution-progress.md`.
