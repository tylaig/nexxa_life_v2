# Fase 1 — Foundations Execution Plan

Goal: implementar a fundação estrutural para Campaigns, Integrations/n8n, Knowledge/RAG e AI Skills no projeto `chat.meusuper.app`, preservando a arquitetura modular e registrando progresso continuamente.

## Escopo desta fase
- ampliar modelagem de dados com tabelas-base dos novos domínios
- criar contratos e tipos base dos novos módulos
- criar parser de placeholders `{{$var}}`
- criar APIs mínimas de health/configuração para os novos domínios
- ajustar navegação principal e criar páginas iniciais/placeholder navegáveis
- registrar o progresso em documentação de implementação

## Ordem de execução
1. adicionar testes para parser de placeholders e contratos base
2. criar migration SQL das tabelas foundation
3. implementar módulos base `campaigns`, `integrations`, `knowledge`, `skills`
4. expor APIs mínimas para listagem/status/bootstrap
5. ajustar sidebar e rotas/páginas iniciais
6. validar com `npm test`
7. atualizar documentação/status

## Arquivos-alvo prováveis
- `db/migrations/002_foundations_modules.sql`
- `modules/campaigns/contracts.ts`
- `modules/integrations/contracts.ts`
- `modules/knowledge/contracts.ts`
- `modules/skills/contracts.ts`
- `modules/skills/parser.ts`
- `app/api/v1/campaigns/route.ts`
- `app/api/v1/integrations/route.ts`
- `app/api/v1/knowledge/route.ts`
- `app/api/v1/skills/route.ts`
- `app/(app)/campaigns/page.tsx`
- `app/(app)/integrations/page.tsx`
- `app/(app)/integrations/n8n/page.tsx`
- `app/(app)/integrations/openai/page.tsx`
- `app/(app)/integrations/supabase/page.tsx`
- `app/(app)/ai/skills/page.tsx`
- `components/app-shell/app-sidebar.tsx`
- `docs/implementation/phase1-progress.md`

## Validação
- `npm test`
- validação de parse de placeholders
- validação de rotas mínimas com testes de API
- revisão manual da navegação criada

## Registro de progresso
Toda entrega desta fase deve refletir imediatamente em:
- checklist da sessão
- `docs/implementation/phase1-progress.md`
