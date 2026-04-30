# NexxaLife Technical Implementation Plan — Supabase Auth, Google Login, Onboarding and Route Protection

> For Hermes: planning only. Do not implement in this round.

Goal:
Implementar autenticação real com Supabase no App Router, adicionar Google OAuth, persistir perfil e estado de onboarding, proteger a área autenticada e alinhar landing/login/signup/onboarding ao fluxo funcional do produto.

Architecture:
O produto deve usar Supabase Auth como autoridade de identidade. O navegador usará apenas chaves públicas de client auth; o servidor usará service role somente em contextos server-only administrativos. A navegação será dirigida por sessão + perfil do app + status de onboarding, com callback OAuth explícito e redirects inteligentes.

Tech stack:
- Next.js 16 App Router
- React 19
- TypeScript
- Supabase Auth
- Supabase Postgres
- react-hook-form
- zod
- Vitest

Status observed in current codebase:
- `@supabase/supabase-js` já está instalado em `package.json`
- existe `lib/server/supabase.ts`, mas ele é focado em service role/admin, não em sessão do usuário
- não existe `middleware.ts`
- não existe `.env.example` no workspace atual, apesar do `README.md` referenciá-lo e do `.gitignore` permitir versioná-lo
- `README.md` referencia `supabase/schema.sql`, mas esse arquivo não existe
- `app/login/page.tsx`, `app/signup/page.tsx` e `app/onboarding/page.tsx` ainda são superfícies visuais estáticas
- `app/(app)/layout.tsx` não protege rotas
- `tests/meu-dia-auth-routing.test.ts` só valida metadata/contrato superficial
- não há sinal de `@supabase/ssr`, `createBrowserClient`, `createServerClient`, `cookies()` ou callback auth implementados

Important security note:
As credenciais reais do Supabase foram fornecidas pelo usuário na conversa. Elas não devem ser escritas em arquivos versionados, nem reproduzidas em documentação. Como a service role foi compartilhada em texto, a recomendação operacional é rotacioná-la antes de produção, ou no mínimo antes de expor o repositório/processo a terceiros.

---

## Target architecture

### Identity layer
- Supabase Auth como fonte de verdade para login/signup/session
- Google OAuth como caminho principal
- email/senha como fallback
- reset de senha suportado

### App domain layer
- tabela própria para perfil do usuário do produto
- estado de onboarding persistido fora de `auth.users`
- redirects guiados por sessão e onboarding

### Routing layer
- público: `/`, `/login`, `/signup`, `/auth/callback`, `/auth/reset-password`, `/auth/error`
- protegido: `/(app)/*`
- sem sessão: manda para `/login?next=...`
- com sessão e onboarding incompleto: manda para `/onboarding`
- com sessão e onboarding completo: manda para `/dashboard`

---

## Env and secret model

### Public browser envs
These are safe for browser usage and required for auth clients:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Server-only envs
Keep server-only:
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SCHEMA`
- `DATABASE_URL`

### Optional convenience envs
- `NEXT_PUBLIC_APP_URL`
- `SUPABASE_AUTH_REDIRECT_URL`

Recommendation:
Manter `SUPABASE_URL` compatível com a fase atual de RAG, mas padronizar a nova camada auth para `NEXT_PUBLIC_SUPABASE_URL`. Evitar uso do service role fora de server-only modules.

---

## Supabase dashboard configuration plan

### Authentication providers
Configurar Google provider no dashboard do Supabase:
- enable Google provider
- informar client ID/secret do Google Cloud OAuth
- cadastrar redirect URL do Supabase

### Redirect URLs
Cadastrar no Supabase Auth:
- `http://localhost:3000/auth/callback`
- URL de staging `/auth/callback`
- URL de produção `/auth/callback`

### Site URL
Definir base correta por ambiente para evitar callback inconsistente.

### Security actions
- rotacionar a service role exposta em conversa
- validar publishable key correta para browser auth
- nunca expor `SUPABASE_SERVICE_ROLE_KEY` ao client

---

## Recommended data model changes

### New migration
Create a new migration, for example:
- `db/migrations/004_auth_profiles_onboarding.sql`

### New tables

#### `app_user_profiles`
Suggested columns:
- `id text primary key`
- `tenant_id text not null references tenants(id) on delete cascade`
- `workspace_id text not null references workspaces(id) on delete cascade`
- `auth_user_id uuid not null unique`
- `email text not null`
- `full_name text`
- `display_name text`
- `avatar_url text`
- `provider text`
- `onboarding_status text not null default 'not_started'`
- `onboarding_step text`
- `onboarded_at timestamptz`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

#### `app_user_onboarding_answers`
Suggested columns:
- `id text primary key`
- `tenant_id text not null references tenants(id) on delete cascade`
- `workspace_id text not null references workspaces(id) on delete cascade`
- `profile_id text not null references app_user_profiles(id) on delete cascade`
- `step_key text not null`
- `payload jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- unique `(profile_id, step_key)`

### Why separate tables
- `auth.users` fica como identidade
- tabela própria guarda semântica do produto
- onboarding pode evoluir sem acoplamento ao provider auth

---

## File-by-file implementation plan

## 1. Environment and configuration

### Modify: `lib/server/env.ts`
Objective:
Expandir schema para suportar auth de browser e URLs de callback.

Additions:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- helper `hasSupabaseBrowserConfig()`
- helper `getAppBaseUrl()`

Important rule:
Não remover compatibilidade com `SUPABASE_URL` já usada pelo módulo de knowledge sem planejar migração. O ideal é suportar ambos e documentar precedência.

### Create: `.env.example`
Objective:
Versionar apenas o template, nunca segredos reais.

Suggested contents:
- `NEXT_PUBLIC_SUPABASE_URL=`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=`
- `SUPABASE_SERVICE_ROLE_KEY=`
- `SUPABASE_SCHEMA=public`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- existing database/RAG envs already used by project

Validation:
- arquivo existe
- `.gitignore` continua ignorando `.env.local` e `.env.*` com exceção de `.env.example`

### Modify: `README.md`
Objective:
Corrigir instruções para auth real.

Changes:
- adicionar seção “Supabase Auth setup”
- remover referência quebrada a `supabase/schema.sql` ou recriar esse arquivo se ele continuar estratégico
- documentar env público e server-only

---

## 2. Supabase client layering

### Add dependency: `@supabase/ssr`
Objective:
Suportar App Router com cookies/sessão corretamente.

Expected package update:
- `package.json`

### Create: `lib/supabase/browser.ts`
Objective:
Criar client browser seguro.

Responsibility:
- exportar função `createSupabaseBrowserClient()` usando `createBrowserClient`
- usar apenas `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Create: `lib/supabase/server.ts`
Objective:
Criar client server para leitura de sessão no App Router.

Responsibility:
- exportar função `createSupabaseServerClient()` usando `cookies()`
- usar `createServerClient`
- compatível com route handlers e server components

### Keep and refine: `lib/server/supabase.ts`
Objective:
Preservar admin/service-role para integrações e knowledge.

Changes:
- manter server-only explícito
- opcionalmente renomear a função para refletir uso admin
- documentar que este arquivo não serve para sessão do usuário

### Optional create: `lib/supabase/types.ts`
Objective:
Centralizar tipos de auth/profile/onboarding.

---

## 3. Domain model and repositories

### Create: `modules/auth/contracts.ts`
Objective:
Definir contratos do domínio auth/profile.

Suggested types:
- `AuthUserSummary`
- `AppUserProfile`
- `OnboardingStatus`
- `OnboardingStepKey`

### Create: `modules/auth/repository.ts`
Objective:
Persistir e ler perfil do usuário de domínio.

Functions to implement later:
- `getProfileByAuthUserId(authUserId)`
- `createProfileFromAuthUser(...)`
- `upsertProfileFromAuthUser(...)`
- `updateOnboardingStatus(...)`
- `saveOnboardingStepAnswer(...)`
- `getOnboardingSnapshot(...)`

### Create: `modules/auth/service.ts`
Objective:
Concentrar regras de negócio de redirect e inicialização do perfil.

Functions to implement later:
- `ensureAppUserProfileFromSessionUser(...)`
- `getPostLoginDestination(...)`
- `isOnboardingComplete(...)`
- `getProtectedAreaRedirect(...)`

---

## 4. Route protection and session orchestration

### Create: `middleware.ts`
Objective:
Bloquear acesso não autenticado à área `/(app)`.

Rules:
- se rota é protegida e não há sessão -> `/login?next=<current-path>`
- se sessão existe -> permitir passagem
- onboarding incompleto pode ser tratado no layout server-side para evitar middleware excessivamente acoplado ao banco

Matcher suggestion:
- proteger `/dashboard`
- proteger `/goals`
- proteger `/checklist`
- proteger `/agenda`
- proteger `/reports`
- proteger `/(app)` e aliases equivalentes que permanecerem relevantes

Important note:
Se houver aliases públicos que apenas redirecionam, decidir se eles continuam públicos ou passam a herdar proteção após a transição.

### Modify: `app/(app)/layout.tsx`
Objective:
Adicionar guard server-side e bootstrap do contexto do usuário.

Expected behavior:
- ler sessão via server client
- se não houver usuário -> redirect login
- carregar perfil do app
- se onboarding incompleto e rota não é onboarding -> redirect onboarding
- disponibilizar contexto futuro ao shell se necessário

### Modify: `app/(app)/page.tsx`
Objective:
Substituir redirect cego por redirect inteligente.

Expected behavior:
- onboarding incompleto -> `/onboarding`
- onboarding completo -> `/dashboard`

---

## 5. Auth pages and flows

### Create: `components/auth/login-form.tsx`
Objective:
Extrair formulário real de login.

Implementation expectations:
- `use client`
- `react-hook-form`
- `zod`
- submit com estado de loading
- erro com `toast`
- suporte a query param `next`

### Create: `components/auth/signup-form.tsx`
Objective:
Extrair formulário real de signup.

Recommendation:
Reduzir campos do cadastro inicial para:
- nome
- email
- senha

Move to onboarding later:
- nickname
- phone
- preferências adicionais

### Create: `components/auth/google-auth-button.tsx`
Objective:
Concentrar CTA OAuth.

Behavior:
- chamar `signInWithOAuth({ provider: 'google' })`
- redirect para `/auth/callback` com `next`
- estado de loading e tratamento de erro

### Modify: `app/login/page.tsx`
Objective:
Trocar markup estático por `LoginForm` + `GoogleAuthButton`.

### Modify: `app/signup/page.tsx`
Objective:
Trocar markup estático por `SignupForm` + opcionalmente `GoogleAuthButton`.

### Create: `app/auth/callback/route.ts`
Objective:
Fechar ciclo OAuth.

Expected responsibilities:
- trocar code por session quando aplicável
- garantir perfil do app
- resolver destino final
- redirect para onboarding ou dashboard
- tratar `next`

### Create: `app/auth/error/page.tsx`
Objective:
Superfície amigável para falhas de auth/OAuth.

### Create: `app/auth/reset-password/page.tsx`
Objective:
Superfície real para recuperação de senha.

### Optional create: `app/auth/update-password/page.tsx`
Objective:
Concluir fluxo pós-reset.

---

## 6. Onboarding workflow

### Create: `modules/onboarding/contracts.ts`
Objective:
Declarar etapas e payloads.

Suggested steps:
- `focus`
- `current_state`
- `priorities`
- `routine`
- `confirmation`

### Create: `components/onboarding/onboarding-wizard.tsx`
Objective:
Transformar a rota atual em wizard real.

Responsibilities:
- navegar entre etapas
- carregar snapshot salvo
- persistir por etapa
- mostrar progresso
- concluir onboarding

### Create: `components/onboarding/steps/*.tsx`
Suggested files:
- `components/onboarding/steps/focus-step.tsx`
- `components/onboarding/steps/current-state-step.tsx`
- `components/onboarding/steps/priorities-step.tsx`
- `components/onboarding/steps/routine-step.tsx`
- `components/onboarding/steps/confirmation-step.tsx`

### Modify: `app/onboarding/page.tsx`
Objective:
Substituir cards conceituais por fluxo funcional.

Expected behavior:
- se usuário não autenticado -> redirect login
- se onboarding já concluído -> redirect dashboard
- senão renderizar wizard

### Create: `app/api/v1/me/onboarding/route.ts`
Objective:
Ler snapshot do onboarding autenticado.

### Create: `app/api/v1/me/onboarding/step/route.ts`
Objective:
Salvar progresso de cada etapa.

### Create: `app/api/v1/me/profile/route.ts`
Objective:
Expor perfil atual autenticado.

Alternative:
Se preferirem server actions no lugar de API routes, padronizar a escolha antes. Hoje a base não mostra padrão forte de server actions, então route handlers parecem mais consistentes com o restante do projeto.

---

## 7. Dashboard first-value behavior

### Modify: `app/(app)/dashboard/page.tsx`
Objective:
Ajustar dashboard para primeira sessão real.

Potential changes:
- empty state contextual
- CTA “Continue seu onboarding” quando incompleto
- CTA “Abrir diagnóstico” ou “Definir primeira meta” quando onboarding recém-concluído

### Modify: `components/app-shell/app-sidebar.tsx`
Objective:
Ajustar navegação para reduzir ruído no first-run.

Potential changes:
- destacar módulos core
- esconder ou despriorizar itens secundários para usuário novo

### Optional create: `components/app-shell/user-session-chip.tsx`
Objective:
Exibir nome/avatar/status do usuário autenticado.

---

## 8. Landing and conversion alignment

### Modify: `app/page.tsx`
Objective:
Ajustar CTA ao fluxo real após implementação.

Recommended changes after auth is done:
- CTA principal para `/signup`
- CTA secundário para `/login`
- remover incentivo a abrir dashboard diretamente sem contexto
- adicionar prova/confiança/FAQ depois da fundação auth

### Modify: `components/auth/auth-shell.tsx`
Objective:
Refinar UX após login real.

Potential changes:
- bloco de benefícios mais curto
- espaço para mensagens de erro/status
- reforço do CTA Google como opção principal

---

## 9. Test plan

### Extend tests directory
Current auth tests are superficiais. Criar cobertura real.

### Create: `tests/auth-env.test.ts`
Validate:
- env parser aceita chaves esperadas
- helper público vs server-only funciona

### Create: `tests/auth-routing-guards.test.ts`
Validate:
- regras de redirect para usuário sem sessão
- regras de redirect para onboarding incompleto/completo

### Create: `tests/auth-profile-repository.test.ts`
Validate:
- create/upsert profile
- status onboarding
- leitura por `auth_user_id`

### Create: `tests/auth-callback-destination.test.ts`
Validate:
- usuário novo -> onboarding
- usuário completo -> dashboard
- `next` seguro é respeitado
- `next` externo/malicioso é descartado

### Create: `tests/onboarding-service.test.ts`
Validate:
- progress snapshot
- completion rules
- persistence por etapa

### Expand: `tests/meu-dia-auth-routing.test.ts`
Evolve from metadata checks to functional contracts.

### Optional E2E later
If Playwright is adopted in a future round:
- visitor -> signup -> onboarding -> dashboard
- visitor -> Google login -> callback -> onboarding/dashboard

---

## 10. Validation checklist for implementation round

After code exists, validate with commands like:
- `pnpm test`
- `pnpm build`
- `pnpm lint`
- `DATABASE_URL=... pnpm run db:migrate`

Manual validation:
1. abrir `/login`
2. logar com email/senha
3. confirmar redirect inteligente
4. testar Google OAuth
5. confirmar criação de perfil
6. testar onboarding em várias etapas
7. recarregar página e confirmar persistência
8. deslogar e garantir bloqueio do `/(app)`
9. testar reset de senha

---

## 11. Migration and rollout sequence

Recommended execution order:
1. criar `.env.example` e expandir env parser
2. adicionar `@supabase/ssr`
3. criar browser/server clients de sessão
4. criar migration de perfil/onboarding
5. implementar repository/service de auth/profile
6. implementar callback OAuth
7. implementar login/signup reais
8. implementar middleware + guards
9. implementar wizard onboarding
10. ajustar dashboard/landing
11. ampliar testes
12. validar local/staging

---

## 12. Concrete file list likely to change

Modify:
- `package.json`
- `README.md`
- `lib/server/env.ts`
- `lib/server/supabase.ts`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/onboarding/page.tsx`
- `app/(app)/layout.tsx`
- `app/(app)/page.tsx`
- `app/(app)/dashboard/page.tsx`
- `components/auth/auth-shell.tsx`
- `components/app-shell/app-sidebar.tsx`
- `tests/meu-dia-auth-routing.test.ts`

Create:
- `.env.example`
- `middleware.ts`
- `db/migrations/004_auth_profiles_onboarding.sql`
- `lib/supabase/browser.ts`
- `lib/supabase/server.ts`
- `lib/supabase/types.ts`
- `modules/auth/contracts.ts`
- `modules/auth/repository.ts`
- `modules/auth/service.ts`
- `modules/onboarding/contracts.ts`
- `components/auth/login-form.tsx`
- `components/auth/signup-form.tsx`
- `components/auth/google-auth-button.tsx`
- `components/onboarding/onboarding-wizard.tsx`
- `components/onboarding/steps/focus-step.tsx`
- `components/onboarding/steps/current-state-step.tsx`
- `components/onboarding/steps/priorities-step.tsx`
- `components/onboarding/steps/routine-step.tsx`
- `components/onboarding/steps/confirmation-step.tsx`
- `app/auth/callback/route.ts`
- `app/auth/error/page.tsx`
- `app/auth/reset-password/page.tsx`
- `app/auth/update-password/page.tsx`
- `app/api/v1/me/profile/route.ts`
- `app/api/v1/me/onboarding/route.ts`
- `app/api/v1/me/onboarding/step/route.ts`
- `tests/auth-env.test.ts`
- `tests/auth-routing-guards.test.ts`
- `tests/auth-profile-repository.test.ts`
- `tests/auth-callback-destination.test.ts`
- `tests/onboarding-service.test.ts`

Optional create if documentation consistency is desired:
- `supabase/schema.sql`

---

## 13. Key risks and decisions

### Risk: current multi-tenant schema may not match simple single-user auth assumptions
Decision:
Na primeira rodada, associar usuários autenticados ao tenant/workspace padrão já configurado (`APP_TENANT_ID`, `APP_WORKSPACE_ID`) para não bloquear o auth. Multi-workspace avançado fica para depois.

### Risk: service-role temptation in auth flow
Decision:
Toda leitura de sessão deve usar server/browser client auth; service role só para admin/repository quando estritamente necessário.

### Risk: signup form com campos demais reduz conversão
Decision:
Mover telefone/apelido e demais enriquecimentos para onboarding.

### Risk: aliases antigos confundem redirect lógico
Decision:
Após auth real, consolidar a jornada principal em `/signup`, `/login`, `/onboarding`, `/dashboard`.

### Risk: README/documentation drift
Decision:
Corrigir referências quebradas no mesmo ciclo de implementação.

---

## 14. Recommended first implementation slice

Best first slice for the next execution round:
- `.env.example`
- env parser expandido
- `@supabase/ssr`
- `lib/supabase/browser.ts`
- `lib/supabase/server.ts`
- `middleware.ts`
- `app/auth/callback/route.ts`
- login Google funcional
- login email/senha funcional

Why this slice first:
Porque fecha o gargalo principal de entrada antes de expandir perfil e onboarding persistido.

---

## 15. Final recommendation

Executar em duas macro-rodadas:

Macro-round A:
- auth base
- Google OAuth
- callback
- guards
- profile bootstrap mínimo

Macro-round B:
- onboarding persistido
- dashboard first-value
- landing conversion refinements
- testes ampliados

Saved planning intent:
Este documento é o plano técnico de implementação, arquivo por arquivo, para a rodada futura com Supabase real e login Google.