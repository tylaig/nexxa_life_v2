# Phase 7 — NexxaLife Product Entry, Auth and Onboarding Progress

Status atual: macro-round 3 em execução, Slice B funcional bootstrapado e validado
Data: 2026-04-30

## Objetivo desta rodada

Transformar as telas públicas de entrada em fluxos funcionais mínimos para:
- login real com e-mail/senha
- signup real com e-mail/senha
- recuperação de acesso por e-mail
- estados explícitos de loading/erro/sucesso
- manutenção do atalho por Google OAuth como caminho rápido

## O que foi executado nesta rodada

- auditoria das telas públicas existentes (`/login`, `/signup`, `/onboarding`)
- testes RED/GREEN para contratos do Slice B
- criação do helper client `lib/client/auth.ts`
- criação dos formulários client-side:
  - `components/auth/login-form.tsx`
  - `components/auth/signup-form.tsx`
  - `components/auth/recovery-form.tsx`
- criação da rota pública `app/recover/page.tsx`
- refactor das páginas `app/login/page.tsx` e `app/signup/page.tsx` para usar formulários reais
- ajuste de build para `useSearchParams()` com `Suspense` em `/login`
- validação com Vitest e `pnpm build`

## Estado atual confirmado

### Já implementado
- login por e-mail/senha já chama `supabase.auth.signInWithPassword`
- signup por e-mail/senha já chama `supabase.auth.signUp`
- recuperação já chama `supabase.auth.resetPasswordForEmail`
- a rota pública `/recover` existe com metadata própria
- `/login` agora usa `next` sanitizado e preserva redirect pós-login
- `/login`, `/signup` e `/recover` já exibem estados de loading e erro
- o Slice A continua íntegro:
  - callback real
  - Google OAuth inicial
  - proxy de proteção base
  - helpers de env/browser/server
- testes estão verdes
- build está verde

### Ainda em aberto
- onboarding continua explicativo, sem persistência nem redirects por estado
- o gating atual ainda depende de cookie simples (`sb-access-token`) e precisa evoluir para sessão/onboarding mais robustos
- falta decidir o comportamento final para confirmação de e-mail e usuários recém-criados com onboarding incompleto

## Decisão de priorização

A prioridade continua sendo fechar o loop:

`aquisição -> autenticação -> onboarding -> ativação -> uso protegido`

Com o Slice B funcional mínimo entregue, o próximo passo coerente é evoluir os redirects por sessão e estado de onboarding.

## Artefatos gerados/atualizados

- `docs/implementation/phase7-nexxalife-product-entry-auth-audit-plan.md`
- `docs/implementation/phase7-nexxalife-product-entry-auth-progress.md`
- `app/auth/callback/route.ts`
- `app/recover/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `components/auth/google-auth-button.tsx`
- `components/auth/login-form.tsx`
- `components/auth/recovery-form.tsx`
- `components/auth/signup-form.tsx`
- `lib/client/auth.ts`
- `lib/client/oauth.ts`
- `lib/client/supabase.ts`
- `proxy.ts`
- `tests/supabase-auth-slice-a.test.ts`
- `tests/supabase-auth-slice-b.test.ts`

## Próxima macro-round planejada

### Macro-round 4
Evoluir auth + onboarding state:
1. redirect por sessão autenticada versus rota pública
2. redirect para onboarding quando necessário
3. redirect para dashboard quando onboarding estiver concluído
4. persistir estado mínimo de onboarding/perfil
5. revisar coerência de `/onboarding` com o novo fluxo real

## Status do checklist desta sessão

- [x] Auditar as telas públicas atuais de login/signup/recovery para definir o contrato funcional mínimo do Slice B
- [x] Escrever testes RED para login/signup/recovery reais no Slice B
- [x] Implementar login/signup/recovery reais com Supabase e estados de loading/erro
- [x] Validar Slice B com testes/build e sincronizar docs/checklist
- [ ] Evoluir redirects por sessão + estado de onboarding
- [ ] Persistir onboarding/perfil mínimo do usuário

## Evidências de validação

- `pnpm test -- --run tests/supabase-auth-slice-b.test.ts` → 13 arquivos / 38 testes passando
- `pnpm build` → build verde com `/recover`, `/auth/callback` e Proxy presentes

## Observações

- A entrada pública deixou de ser apenas semântica: agora há fluxo funcional mínimo para login, cadastro e recuperação.
- O principal gargalo remanescente migrou de “auth inexistente nas telas” para “orquestração de sessão + onboarding”.
- A exigência de `Suspense` em `/login` confirmou a observação da skill para App Router/Next 16 sobre `useSearchParams()` em produção.
- O uso de Supabase MCP pode entrar na próxima rodada se precisarmos validar provider, redirects ou schema pelo painel/infra.
