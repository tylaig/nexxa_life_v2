# Roadmap NexxaLife — Produto Pessoal de Ciclo de Evolução

> Última atualização: Maio 2026
> Produto: NexxaLife — Sistema Operacional de Evolução Pessoal (single-user, não multi-tenant)

---

## Status Atual

### ✅ Concluído

#### Auth & Onboarding
- [x] Login com e-mail/senha
- [x] Login com Google OAuth (PKCE flow via @supabase/ssr)
- [x] Cadastro de novo usuário
- [x] Onboarding multi-etapa (welcome → perfil → diagnóstico → metas → completo)
- [x] Middleware de proteção de rotas (`/dashboard`, etc.)
- [x] Callback OAuth robusto (sem loop de redirect)

#### UI/UX — Páginas do Ciclo
- [x] Landing page redesenhada
- [x] Login e signup redesenhados
- [x] Onboarding redesenhado
- [x] Dashboard — saudação dinâmica, KPIs, checklist, metas, agenda, diário
- [x] Checklist — grupos por prioridade, toggle, streak, add inline
- [x] Metas — cards com progresso, marcos expansíveis, filtros
- [x] Agenda — mini-calendário semanal, timeline de eventos por tipo
- [x] Diário — lista de entradas, editor, mood picker, busca
- [x] Relatórios — período 7/30/90d, heatmap, KPIs, insights
- [x] Academia — trilhas com progresso, filtros, conteúdos recomendados
- [x] News — busca, filtros por categoria, artigos com save
- [x] Marketplace — busca, grid gratuitos/premium, badge Pro

#### Design System
- [x] Primitivos: `PageHeader`, `SectionCard`, `EmptyState`, `KpiTile`
- [x] Sidebar simplificada (sem WorkspaceSwitcher / multi-tenant)
- [x] Navegação: "Meu Ciclo" (Metas, Checklist, Agenda, Diário, Relatórios)
- [x] `/diagnostic` removido do sidebar (apenas no onboarding)

#### Database — Migrations
- [x] 001 — bootstrap (extensões + funções utilitárias)
- [x] 002 — auth support (onboarding_state, user_settings)
- [x] 003 — diagnostic_results
- [x] 004 — app_user_profiles (sem tenant/workspace + trigger automático no signup)
- [x] 005 — goals + goal_milestones
- [x] 006 — checklist_items
- [x] 007 — agenda_events
- [x] 008 — journal_entries (com full-text search em português)
- [x] 009 — user_streaks + daily_activity_log + função de streak automática

---

### 🔄 Em Andamento

- [ ] Aplicar migrations 001-009 no Supabase Dashboard (SQL Editor)
- [x] Remover referências a `tenant_id` / `workspace_id` do `auth-profile/repository.ts` e remover páginas B2B legadas
- [x] API Routes: `/api/v1/goals`, `/api/v1/checklist`, `/api/v1/agenda`, `/api/v1/journal` (Feito via Server Actions / AI Route)
- [x] Conectar views às API routes (substituir mocks por dados reais)
- [ ] Apps/Integrações — página de conexões do ciclo (Google Calendar, Notion etc.)

---

### ⏳ Próximos — Fase 2

#### Backend & Dados Reais
- [ ] Server Actions ou API Routes para CRUD de cada módulo do ciclo
- [ ] Hook `useGoals()`, `useChecklist()`, `useAgenda()`, `useJournal()` consumindo Supabase
- [ ] Streak calculado automaticamente via `upsert_user_streak()` ao salvar atividade
- [ ] Persistência do Diagnóstico no banco (hoje só salva no onboarding_state)

#### Funcionalidades do Ciclo
- [ ] Recorrência de itens do Checklist (itens recorrentes por dia/semana)
- [ ] Notificações / lembretes de checklist (via email ou browser push)
- [ ] Compartilhamento de metas (link público opcional)
- [ ] Export de relatório em PDF

#### Apps / Integrações
- [ ] Google Calendar — sync bidirecional com Agenda
- [ ] Notion — export de metas e diário
- [ ] Integração com apps de saúde (Apple Health, Google Fit via API)

#### Produto
- [ ] PWA (Progressive Web App) — instalável no celular
- [ ] Modo offline para checklist e diário
- [ ] Notificações push via Web Push API

#### Monetização
- [ ] Plano Free (ciclo básico)
- [ ] Plano Pro (Academy completo, Marketplace premium, integrações avançadas)
- [ ] Stripe Checkout + webhook de ativação do plano
- [ ] Billing portal para gerenciar assinatura

---

### ❌ Fora do Escopo (por ora)

- Multi-tenant / workspaces (removido — produto é pessoal)
- WhatsApp Business Platform
- Inbox colaborativa / atendimento ao cliente
- Plataforma omnichannel (era o ROADMAP_AND_GTM.md antigo — não se aplica ao NexxaLife pessoal)

---

## Stack Atual

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15 App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Supabase Auth (PKCE + @supabase/ssr) |
| Database | Supabase (PostgreSQL) |
| ORM | Queries diretas via Supabase client |
| Deploy | Vercel (planejado) |

---

## Convenções do Banco

- Todas as tabelas têm `user_id uuid references auth.users(id)` — single-user
- RLS ativo em todas as tabelas: `auth.uid() = user_id`
- `update_updated_at()` trigger em todas as tabelas com `updated_at`
- Migrations sequenciais: 001–NNN em `/db/migrations/`
- Sem `tenant_id` ou `workspace_id` (produto pessoal)
