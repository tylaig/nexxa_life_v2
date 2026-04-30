# NexxaLife — Implementation Backlog

Data: 2026-04-29
Status: backlog inicial priorizado e rastreável

---

## Regras deste backlog

- P0 = obrigatório antes de implementação relevante
- P1 = fundação navegável do módulo
- P2 = jornadas centrais com dados controlados
- P3 = reconstrução de domínio crítico
- P4 = endurecimento e complementares

Estados sugeridos para uso contínuo:
- `TODO`
- `IN_PROGRESS`
- `DONE`
- `BLOCKED`
- `DEFERRED`

---

## P0 — documentação estratégica e decisões de fundação

| ID | Item | Status | Saída esperada |
|---|---|---|---|
| P0-01 | Consolidar auditoria como base oficial | DONE | auditoria lida e sintetizada |
| P0-02 | Publicar matriz de migração tela por tela | DONE | `docs/NEXXALIFE_MIGRATION_MATRIX.md` |
| P0-03 | Publicar arquitetura alvo | DONE | `docs/NEXXALIFE_TARGET_ARCHITECTURE.md` |
| P0-04 | Publicar mapa old/new blocks | DONE | `docs/NEXXALIFE_OLD_NEW_BLOCKS_MAP.md` |
| P0-05 | Publicar checklist da fase 1 | DONE | `docs/NEXXALIFE_PHASE1_EXECUTION_CHECKLIST.md` |
| P0-06 | Publicar backlog canônico sem data no nome | DONE | este arquivo |
| P0-07 | Mapear entidades de domínio centrais | DONE | `docs/NEXXALIFE_DOMAIN_ENTITY_MAP.md` |
| P0-08 | Definir namespace oficial do módulo | DONE | `/nexxalife` como namespace sugerido |

---

## P1 — fundação do novo módulo/produto

| ID | Item | Status | Observações |
|---|---|---|---|
| P1-01 | Criar scaffold de diretórios `app/components/features/lib` | DONE | criado como estrutura inicial |
| P1-02 | Separar `components/nexxalife/old` e `components/nexxalife/new` | DONE | convenção explicitada |
| P1-03 | Criar cascas de domínio por feature | DONE | onboarding, dashboard, goals, checklist, diagnostic, framework, agenda, diary, reports |
| P1-04 | Rascunhar contratos iniciais de dados | DONE | `lib/nexxalife/contracts/*` |
| P1-05 | Definir mapa de rotas da onda 1 | DONE | onboarding, dashboard, goals, checklist |
| P1-06 | Definir shell visual do módulo | DONE | `docs/NEXXALIFE_MODULE_SHELL_SPEC.md` |
| P1-07 | Definir strategy de mock controlled fixtures | DONE | `docs/NEXXALIFE_PHASE1_CONTROLLED_FIXTURES.md` |
| P1-08 | Definir guidelines de nomenclatura e boundary | DONE | arquitetura + mapa old/new |
| P1-09 | Definir entrypoint principal inspirado no `chat.meusuper.app` | DONE | `app/page.tsx` redireciona para `/nexxalife` |
| P1-10 | Materializar host Next mínimo na raiz do repositório | DONE | `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css` |

---

## P2 — migração visual controlada

| ID | Item | Status | Dependências |
|---|---|---|---|
| P2-01 | Recriar onboarding com dados controlados | DONE | `app/(app)/nexxalife/onboarding/page.tsx` |
| P2-02 | Recriar dashboard com summary cards e blocos operacionais | DONE | `app/(app)/nexxalife/page.tsx` |
| P2-03 | Recriar objetivos/metas com contratos novos | DONE | `app/(app)/nexxalife/goals/page.tsx` |
| P2-04 | Recriar checklist com tarefas controladas | DONE | `app/(app)/nexxalife/checklist/page.tsx` |
| P2-05 | Validar consistência entre páginas da onda 1 | IN_PROGRESS | validação estrutural/documental concluída; falta validação de runtime/build |

---

## P3 — reconstrução de lógica crítica

| ID | Item | Status | Observações |
|---|---|---|---|
| P3-01 | Documentar domínio framework/admin | TODO | antes de UI final e engine |
| P3-02 | Modelar framework versionado | TODO | eixos, dimensões, perguntas, versões |
| P3-03 | Modelar sessão diagnóstica e respostas | TODO | sem acoplamento ao legado |
| P3-04 | Definir engine de metas e progresso | TODO | derivação e cálculo claros |
| P3-05 | Modelar agenda e regras operacionais | TODO | tarefas, eventos, reagendamento |
| P3-06 | Modelar diário e histórico | TODO | entradas, humor, observações |
| P3-07 | Modelar relatórios por snapshot | TODO | reprodução confiável |

---

## P4 — hardening, persistência e QA

| ID | Item | Status | Observações |
|---|---|---|---|
| P4-01 | Definir auth real | TODO | fora da primeira onda visual |
| P4-02 | Definir persistência real | TODO | preferência: Supabase/Postgres |
| P4-03 | Criar camada de repositório | TODO | desacoplada da UI |
| P4-04 | Cobrir contratos e fluxos com testes | TODO | unit + integração |
| P4-05 | Executar QA funcional por jornada | TODO | onboarding, dashboard, goals, checklist, diagnostic |
| P4-06 | Auditar governança e trilhas | TODO | snapshots, logs, histórico |

---

## P4+ — superfícies complementares

| ID | Item | Status | Observações |
|---|---|---|---|
| PX-01 | Reavaliar integrações | DEFERRED | não bloquear fundação |
| PX-02 | Reavaliar academia | DEFERRED | superfície complementar |
| PX-03 | Reavaliar marketplace | DEFERRED | superfície complementar |
| PX-04 | Reavaliar news | DEFERRED | superfície complementar |
| PX-05 | Reavaliar laboratório/testes | DEFERRED | somente se houver valor claro |

---

## Sequência operacional recomendada

1. Fechar P0 por completo
2. Consolidar P1 com shell e mocks controlados
3. Materializar primitives do shell e fixtures em código
4. Executar P2 como onda visual curta
5. Entrar em P3 por domínio, não por impulso visual
6. Só então conectar P4 e expansão

---

## Critério de aceite da Fase 1

A Fase 1 está pronta para avançar quando:
- a estrutura nova existir sem dependência de `storage.js`
- a primeira onda estiver priorizada e documentada
- o boundary `old/new` estiver explícito
- houver contratos suficientes para começar UI controlada
- o backlog restante estiver ordenado por risco e impacto
