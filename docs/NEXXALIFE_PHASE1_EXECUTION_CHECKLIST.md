# NexxaLife — Phase 1 Execution Checklist

Data: 2026-04-29
Status: checklist canônico da primeira macro-rodada

---

## Objetivo da Fase 1

Preparar uma fundação limpa, rastreável e navegável para o novo NexxaLife sem importar a dívida estrutural do legado.

---

## Macro-entregáveis da fase

- documentação estratégica publicada
- scaffold inicial do módulo criado
- contratos iniciais rascunhados
- primeira onda de páginas priorizada
- boundary `old/new` explícito

---

## A. Descoberta

- [x] Ler a auditoria completa
- [x] Listar todas as telas do legado
- [x] Identificar stack e limites do legado
- [x] Identificar dependências de `storage.js`
- [x] Confirmar `chat.meusuper.app` como referência de fundação técnica

## B. Decisão arquitetural

- [x] Definir que NexxaLife nasce como vertical/módulo novo
- [x] Definir namespace recomendado `/nexxalife`
- [x] Definir separação entre `old` e `new`
- [x] Definir árvore-base de `app/components/features/lib`
- [x] Definir primeira onda de rotas prioritárias
- [x] Definir entrypoint principal na raiz do App Router direcionando para `/nexxalife`

## C. Documentação obrigatória

- [x] Criar `docs/NEXXALIFE_MIGRATION_MATRIX.md`
- [x] Criar `docs/NEXXALIFE_TARGET_ARCHITECTURE.md`
- [x] Criar `docs/NEXXALIFE_IMPLEMENTATION_BACKLOG.md`
- [x] Criar `docs/NEXXALIFE_OLD_NEW_BLOCKS_MAP.md`
- [x] Criar `docs/NEXXALIFE_PHASE1_EXECUTION_CHECKLIST.md`
- [x] Criar mapa documental explícito de entidades de domínio

## D. Scaffold técnico

- [x] Criar `app/(app)/nexxalife/`
- [x] Criar `components/nexxalife/old/`
- [x] Criar `components/nexxalife/new/`
- [x] Criar `features/nexxalife/`
- [x] Criar `lib/nexxalife/`
- [x] Criar rascunho de contratos em `lib/nexxalife/contracts/`
- [x] Criar mapa inicial de rotas em `lib/nexxalife/routes.ts`
- [x] Materializar host Next mínimo na raiz (`package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`)
- [x] Instalar dependências do host raiz e validar build/typecheck mínimos

## E. Primeira onda funcional planejada

- [x] Onboarding entra na onda 1
- [x] Dashboard entra na onda 1
- [x] Objetivos & Metas entram na onda 1
- [x] Checklist entra na onda 1
- [x] Shell visual do módulo especificado em detalhe suficiente para implementação
- [x] Fixtures controladas especificadas por domínio

## F. Guardrails obrigatórios

- [x] Não portar `storage.js` como solução final
- [x] Não copiar componentes do legado cegamente
- [x] Não misturar UI final com engine de domínio ainda indefinida
- [x] Não transformar `old/` em dependência de runtime
- [x] Não avançar para diagnóstico/admin sem documentação de domínio

## G. Critério de saída da Fase 1

A fase pode ser considerada concluída quando:
- [x] existir pacote de execução claro e acionável
- [x] existir scaffold técnico verificável
- [x] existir backlog priorizado por risco/impacto
- [x] existir definição suficiente do shell visual
- [x] existir definição suficiente dos mocks controlados da onda 1
- [x] existir mapa documental de entidades centrais

---

## Próxima macro-rodada sugerida

1. refinar consistência visual entre dashboard, onboarding, goals e checklist
2. endurecer shell base (tema/toasts reais, primitives compartilhadas e navegação)
3. decidir próximo recorte: aprofundar onda 1 ou abrir diagnóstico/admin documental
4. preparar camada inicial de persistência/contratos evolutivos sem tocar no legado
