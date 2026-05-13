# Phase 8 — NexxaLife Evolution Progress

Status: Slice 8A-04 completed with focused GREEN, full suite GREEN and production build GREEN.
Date: 2026-05-12

## Current slice

### Slice 8A-04 — Onboarding diagnostic-to-Nexxa pre-fill design and first honest contract

Goal: expose a review-only diagnostic pre-fill path from onboarding to Nexxa without inventing persistence, deriving first goal/checklist/agenda drafts from the current deterministic priority flow and requiring user confirmation before any save.

## Evidence log

### 2026-05-12 — Slice 8A-01

#### 1. DB Schema Validation

- No schema change required.
- Slice is limited to visible identity/copy and navigation contracts.
- Route compatibility preserved through existing `/studio` href; no DB migrations or repository changes were needed.

#### 2. UI Audit

Audited code-visible `AI Studio` occurrences in active TypeScript/TSX surfaces:

- `components/app-shell/nexxa-life-navigation.ts`
- `components/app-shell/command-menu.tsx`
- `components/ai/ai-studio-view.tsx`
- `components/onboarding/unified-onboarding.tsx`
- `app/page.tsx`
- `app/api/chat/route.ts`
- `modules/framework-admin/workspace.ts`

Changed user-facing/copy occurrences from `AI Studio` to `Nexxa` or `Nexxa`-appropriate Portuguese phrasing.

Route decision for this slice:

- `/studio` remained the compatible canonical entrypoint during Slice 8A-01.
- `/nexxa` was intentionally deferred to Slice 8A-02.

#### 3. AI Logic Test

- Chat fallback copy changed from `Aqui no AI Studio...` to `Aqui na Nexxa...`.
- No prompt/tool-call behavior changed.
- No new AI persistence or generated suggestions introduced.

#### 4. End-to-End Walkthrough / Commands

RED:

- Command: `pnpm vitest run tests/nexxa-life-navigation.test.ts`
- Result: failed as expected after test update.
- Expected failures:
  - navigation primary labels still returned `AI Studio` instead of `Nexxa`.
  - `/studio` command/sidebar item still returned `AI Studio` instead of `Nexxa`.

GREEN focused:

- Command: `pnpm vitest run tests/nexxa-life-navigation.test.ts`
- Result: passed.
- Observed collection: `Test Files 1 passed (1)`, `Tests 6 passed (6)`.

Full test suite:

- Command: `pnpm test`
- Result: failed due to pre-existing auth contract drift unrelated to Slice 8A-01.
- Observed collection: `Test Files 3 failed | 9 passed (12)`, `Tests 5 failed | 39 passed (44)`.
- Failing areas:
  - login metadata expected `Login | NexxaLife`, actual `Entrar | NexxaLife`.
  - proxy matcher expectation includes older `/(app)/:path*` contract while current config enumerates concrete protected routes.
  - Google OAuth helper throws when client Supabase config is absent.

Build:

- Command: `pnpm build`
- Result: passed.
- Notes: build emitted non-fatal dynamic server usage logs for `/login` and `/signup` during static generation, then completed successfully and classified those routes as dynamic.

### 2026-05-12 — Slice 8A-02

#### 1. DB Schema Validation

- No schema change required.
- Slice is limited to route taxonomy, route compatibility, navigation hrefs and proxy/matcher protection.
- No migrations, tables, policies, seed data or persistence changes were introduced.

#### 2. UI Audit

Route decision for this slice:

- `/nexxa` is now the canonical Nexxa entrypoint in first-class UI navigation.
- `/studio` remains available as a compatible legacy route and renders the same Nexxa experience.
- Sidebar primary item now points to `/nexxa` with label `Nexxa`.
- Floating command menu now points to `/nexxa` with label `Nexxa`.
- Proxy matcher protects both `/nexxa/:path*` and `/studio/:path*`.

Changed route-contract surfaces:

- `app/(app)/nexxa/page.tsx`
  - New page module re-exporting the existing `/studio` page implementation.
- `components/app-shell/nexxa-life-navigation.ts`
  - Primary Nexxa href changed from `/studio` to `/nexxa`.
- `components/app-shell/command-menu.tsx`
  - Command menu Nexxa href changed from `/studio` to `/nexxa`.
- `proxy.ts`
  - Added `/studio` and `/nexxa` to protected route inventory.
  - Added `/studio/:path*` and `/nexxa/:path*` to Next proxy matcher config.
- `tests/nexxa-life-navigation.test.ts`
  - Added RED/GREEN contract for canonical `/nexxa`, compatible `/studio`, exported page modules and protected matchers.

#### 3. AI Logic Test

- No AI prompt, model, gateway, fallback response, streaming or persistence behavior changed.
- `/nexxa` and `/studio` reuse the same existing Nexxa/Studio page implementation, so AI behavior remains identical across both routes.

#### 4. End-to-End Walkthrough / Commands

RED:

- Command: `pnpm vitest run tests/nexxa-life-navigation.test.ts`
- Result: failed as expected before implementation.
- Expected failure:
  - `Cannot find package '@/app/(app)/nexxa/page'`.

GREEN focused:

- Command: `pnpm vitest run tests/nexxa-life-navigation.test.ts`
- Result: passed.
- Observed collection: `Test Files 1 passed (1)`, `Tests 6 passed (6)`.

Full test suite:

- Command: `pnpm test`
- Result: failed due to existing auth contract drift unrelated to Slice 8A-02.
- Observed collection: `Test Files 3 failed | 9 passed (12)`, `Tests 5 failed | 39 passed (44)`.
- Failing areas remained the same known auth issues:
  - login metadata expected `Login | NexxaLife`, actual `Entrar | NexxaLife`.
  - proxy matcher expectation includes older `/(app)/:path*` contract while current config enumerates concrete protected routes.
  - Google OAuth helper throws when client Supabase config is absent.

Build:

- Command: `pnpm build`
- Result: passed.
- Build route output includes both dynamic routes:
  - `/nexxa`
  - `/studio`
- Notes: build still emitted non-fatal dynamic server usage logs for `/login` and `/signup`, then completed successfully.

## Files changed by Slice 8A-01

- `tests/nexxa-life-navigation.test.ts`
  - Updated primary navigation expectation to `Nexxa`.
  - Added route-compatibility assertion that `/studio` remains the Nexxa entrypoint in sidebar and command menu.

- `components/app-shell/nexxa-life-navigation.ts`
  - Sidebar primary label changed from `AI Studio` to `Nexxa`.
  - Comment updated to document `/studio` compatibility.

- `components/app-shell/command-menu.tsx`
  - Command menu label changed from `AI Studio` to `Nexxa`.

- `components/ai/ai-studio-view.tsx`
  - Non-planning chat title changed from `AI Studio` to `Nexxa`.

- `components/onboarding/unified-onboarding.tsx`
  - Internal comment updated from AI Studio wording to Nexxa route wording.

- `app/page.tsx`
  - Landing step copy changed from `O AI Studio...` to `A Nexxa...`.

- `app/api/chat/route.ts`
  - Chat fallback copy changed from `Aqui no AI Studio...` to `Aqui na Nexxa...`.

- `modules/framework-admin/workspace.ts`
  - Admin workspace description changed from prompts do AI Studio to prompts da Nexxa.

## Files changed by Slice 8A-02

- `app/(app)/nexxa/page.tsx`
  - Added canonical `/nexxa` route by re-exporting the existing `/studio` page implementation.

- `components/app-shell/nexxa-life-navigation.ts`
  - Primary Nexxa navigation href changed from `/studio` to `/nexxa`.

- `components/app-shell/command-menu.tsx`
  - Floating command menu Nexxa href changed from `/studio` to `/nexxa`.

- `proxy.ts`
  - Protected route inventory and matcher now include both `/nexxa` and `/studio`.

- `tests/nexxa-life-navigation.test.ts`
  - Route contract now asserts `/nexxa` as canonical and `/studio` as compatible legacy route.

### 2026-05-12 — Slice 8A-03

#### 1. DB Schema Validation

- No schema change required.
- This slice only changed auth/navigation contract tests and documentation; no migration or persistence layer change was introduced.

#### 2. UI Audit

Canonical auth/public route wording verified from current page metadata:

- `/login`: `Entrar | NexxaLife`
- `/signup`: `Criar conta | NexxaLife`
- `/recover`: `Recuperar acesso | NexxaLife`
- `/onboarding`: `Onboarding | NexxaLife`

Protected route inventory verified in `proxy.ts`:

- Existing top-level protected routes remain explicitly listed.
- `/nexxa/:path*` and `/studio/:path*` remain protected.
- The old test expectation for `/(app)/:path*` was removed because the current proxy contract uses explicit route matchers instead of exposing the route-group name.

#### 3. AI Logic Test

- No AI runtime behavior changed.
- Google OAuth contract test was corrected to mock the client-side env module used by `lib/client/oauth.ts`.
- OAuth expectation now preserves the real current behavior:
  - provider: `google`
  - redirect path preserves `next`
  - Google query params include `access_type: offline` and `prompt: consent`

#### 4. End-to-End Walkthrough / Validation

Focused validation:

- Command: `pnpm vitest run tests/nexxa-life-auth-routing.test.ts tests/supabase-auth-slice-a.test.ts tests/supabase-auth-slice-b.test.ts tests/nexxa-life-navigation.test.ts --reporter=verbose`
- Result: passed.
- Observed collection: `Test Files 4 passed (4)`, `Tests 15 passed (15)`.

Full suite validation:

- Command: `pnpm test`
- Result: passed.
- Observed collection: `Test Files 12 passed (12)`, `Tests 44 passed (44)`.

Production build validation:

- Command: `pnpm build`
- Result: passed.
- Build confirmed dynamic routes include `/login`, `/signup`, `/nexxa`, `/studio` and the protected workspace routes.
- Notes: build still emits non-fatal dynamic server usage logs for `/login` and `/signup` during static generation, then completes successfully and classifies those routes as dynamic.

## Files changed by Slice 8A-03

- `tests/nexxa-life-auth-routing.test.ts`
  - Updated public auth metadata expectations to current canonical wording.

- `tests/supabase-auth-slice-a.test.ts`
  - Updated public auth metadata expectations.
  - Replaced stale `/(app)/:path*` matcher expectation with explicit `/studio/:path*` and `/nexxa/:path*` protected matchers.
  - Corrected Google OAuth test mock from server env to client env.
  - Updated OAuth assertion to include current Google consent/offline query params.

- `tests/supabase-auth-slice-b.test.ts`
  - Updated public auth metadata expectations.

### 2026-05-12 — Slice 8A-04

#### 1. DB Schema Validation

- No schema change introduced in this slice.
- Persistence model selected for the first contract: ephemeral review state / draft-only session.
- `components/nexxa-life/onboarding-prefill.ts` explicitly marks the session as `requires_user_confirmation` and `draft_only_until_confirmed`.
- Blocked actions are declared as `auto_persist_goals` and `auto_persist_checklist`, so the UI cannot truthfully claim automatic save.

#### 2. UI Audit

Audited and wired the minimal onboarding-to-Nexxa path:

- `app/onboarding/page.tsx` now imports `nexxaOnboardingPrefillEntry` and exposes a CTA labelled `Pré-preencher com meu diagnóstico`.
- The onboarding CTA routes to `/nexxa?prefill=diagnostic` and states that nothing is saved automatically.
- `app/(app)/studio/page.tsx` reads `searchParams.prefill` and passes the review session only when `prefill=diagnostic`. Because `/nexxa` re-exports this page, the canonical route receives the same contract.
- `components/ai/ai-studio-view.tsx` now renders a review card with suggested goal, checklist and agenda drafts, each labelled as not persisted.

CTA classification:

- `/onboarding` → `Pré-preencher com meu diagnóstico`: `REAL_DRAFT_REVIEW`.
- `/nexxa?prefill=diagnostic` review card: `REAL_DRAFT_REVIEW`, not persistence.
- Automatic goal/checklist persistence: intentionally `BLOCKED` until explicit confirmation flow/repository contract exists.

#### 3. AI Logic Test

- No model prompt, streaming protocol, tool-call executor or gateway behavior changed.
- The pre-fill contract is deterministic and derived from `meuDiaPriorityFlow`.
- Current derived drafts:
  - goal: `Estabilizar rotina de reflexão`
  - checklist: `Ajustar agenda do restante do dia`
  - agenda: derived from the same priority flow
- The disclosure says the Nexxa prepared drafts and that nothing was saved automatically.

#### 4. End-to-End Walkthrough / Validation

RED/GREEN contract validation recorded before UI wiring:

- RED command: `pnpm vitest run tests/nexxa-life-onboarding-prefill.test.ts --reporter=verbose`
- RED result: failed as expected before `components/nexxa-life/onboarding-prefill.ts` existed.
- GREEN focused command: `pnpm vitest run tests/nexxa-life-onboarding-prefill.test.ts --reporter=verbose`
- GREEN focused result before UI wiring: passed.
- Observed collection: `Test Files 1 passed (1)`, `Tests 3 passed (3)`.

Final validation for the wired UI completed:

- Focused command: `pnpm vitest run tests/nexxa-life-onboarding-prefill.test.ts --reporter=verbose`
- Focused result: passed.
- Observed collection: `Test Files 1 passed (1)`, `Tests 3 passed (3)`.

- Full suite command: `pnpm test`
- Full suite result: passed.
- Observed collection: `Test Files 13 passed (13)`, `Tests 47 passed (47)`.

- Production build command: `pnpm build`
- Production build result: passed.
- Build confirmed dynamic routes include `/nexxa`, `/studio` and `/onboarding`.
- Notes: build still emits the known non-fatal dynamic server usage logs for `/login` and `/signup`, then completes successfully.

## Files changed by Slice 8A-04

- `tests/nexxa-life-onboarding-prefill.test.ts`
  - Added contract tests for an honest diagnostic pre-fill session, non-persisted goal/checklist drafts and onboarding entry route/copy.

- `components/nexxa-life/onboarding-prefill.ts`
  - Added deterministic review-only pre-fill contract derived from `meuDiaPriorityFlow`.

- `app/onboarding/page.tsx`
  - Added onboarding CTA for `Pré-preencher com meu diagnóstico`, routing to `/nexxa?prefill=diagnostic` with explicit no-auto-save language.

- `app/(app)/studio/page.tsx`
  - Added `searchParams.prefill` handling and passes `nexxaOnboardingPrefillSession` into `AiStudioView` when requested.

- `components/ai/ai-studio-view.tsx`
  - Added review card for the pre-fill session, showing goal/checklist/agenda drafts as not persisted and requiring explicit confirmation before any creation.

## Current checklist

- [x] Slice 8A-01 audit completed.
- [x] Slice 8A-01 RED test observed.
- [x] Slice 8A-01 implementation completed.
- [x] Slice 8A-01 focused navigation test GREEN.
- [x] Slice 8A-01 production build GREEN.
- [x] Slice 8A-01 full suite attempted and failing areas documented.
- [x] Slice 8A-02 audit completed.
- [x] Slice 8A-02 RED test observed.
- [x] Slice 8A-02 implementation completed.
- [x] Slice 8A-02 focused navigation test GREEN.
- [x] Slice 8A-02 production build GREEN.
- [x] Slice 8A-02 full suite attempted and failing areas documented.
- [x] Slice 8A-03 auth drift audit completed.
- [x] Slice 8A-03 auth contract tests updated to current canonical wording and route matcher model.
- [x] Slice 8A-03 Google OAuth helper test made deterministic through client-env mocking.
- [x] Slice 8A-03 focused auth/navigation validation GREEN.
- [x] Slice 8A-03 full suite GREEN.
- [x] Slice 8A-03 production build GREEN.
- [x] Slice 8A-04 audit completed.
- [x] Slice 8A-04 RED contract test observed.
- [x] Slice 8A-04 deterministic pre-fill contract implemented.
- [x] Slice 8A-04 onboarding and Nexxa review UI wired without auto-persistence.
- [x] Slice 8A-04 final focused validation GREEN.
- [x] Slice 8A-04 full suite GREEN.
- [x] Slice 8A-04 production build GREEN.

## Next recommended slice

Slice 8A-05 — Confirm-before-save action contract for diagnostic pre-fill drafts.

Recommended scope:

1. Decide whether confirmed suggestions should use existing goals/checklist/agenda actions or a dedicated proposal/draft table.
2. Add tests for explicit user confirmation payloads and rejected/edited drafts.
3. Implement the smallest save path that persists only after approval.
4. Add UI affordances for approve/edit/reject, with blocked states when persistence prerequisites are absent.
5. Re-run focused tests, `pnpm test`, `pnpm build`, and update Phase 8 docs with the validation loop.
