# Phase 6 — Loop de execução contínua do nexxa_life (modo `ok`)

> Complementar a `docs/implementation/nexxa_life-layout-improvements-and-page-loop.md`, que passa a ser o documento mestre de melhoria de layout e continuidade por página.

## Objetivo
Criar um loop operacional simples no qual a próxima macro-rodada pode continuar apenas com uma resposta do usuário: `ok`.

Este documento combina:
- o blueprint legado do `old/meu-dia-flow`
- o loop de QA/validação do app raiz
- o plano de adaptação da Fase 6

## Regra de operação
Depois deste ponto, a confirmação mínima para continuar é apenas:

`ok`

Ao receber `ok`, a próxima rodada deve seguir automaticamente esta sequência.

---

## Sequência automática por rodada

### 1. Estudo
Ler e cruzar:
- docs legados relevantes da superfície alvo
- progresso da Fase 6
- matriz de rotas da Fase 6
- loop de QA da Fase 6
- código atual da superfície alvo

### 2. Auditoria rápida
Classificar a superfície e seus blocos como:
- `REAL`
- `MOCK`
- `BLOCKED`
- `MISSING`

Mapear obrigatoriamente:
- CTAs
- tabs
- gráficos
- estados
- dependências
- testes existentes

### 3. Execução incremental
Implementar o próximo bloco fechado com prioridade em:
1. funcionalidade real antes de polimento
2. clareza do shell atual
3. aderência aos docs do legado
4. redução de no-op silencioso

### 4. QA técnico
Rodar no mínimo:
- `pnpm test`
- `pnpm build`

Se existir suite específica do slice, rodar antes da suíte completa.

### 5. QA browser-first
Validar visualmente a rota alterada.
Se houver ferramenta E2E instalada, executar smoke da rota.
Se não houver, registrar explicitamente que a validação browser ficou manual.

### 6. Registro da rodada
Atualizar:
- `docs/implementation/phase6-meu-dia-flow-root-adaptation-progress.md`
- `docs/implementation/phase6-meu-dia-execution-qa-loop.md`
- este arquivo, se o fluxo mudar

### 7. Saída padrão
Ao concluir uma rodada, responder sempre com:
- o que foi implementado
- quais arquivos mudaram
- status do QA
- próximo passo automático
- instrução mínima: `Diga ok para eu seguir`

---

## Ordem automática de prioridade atual

### P0
- dashboard analítico com tabs/gráficos
- fechamento de gaps do ciclo principal
- smoke funcional das rotas core

### P1
- aliases/redirects finais
- onboarding retematizado
- signup/cadastro
- login retematizado

### P2
- integrações pessoais/ecossistema
- redução de fallbacks remanescentes
- evolução de dados mock para adapters

### P3
- E2E browser real com Playwright
- estados loading/empty/error/degraded por superfície
- polimento transversal

---

## Regras de interrupção
O loop não deve parar para microaprovações.
Só deve parar se houver:
- erro bloqueante de build/test
- conflito estrutural importante
- necessidade real de decisão de produto

Fora isso, basta `ok`.

---

## Próxima rodada padrão atual
1. validar e consolidar o painel analítico do `/dashboard`
2. atualizar progresso da Fase 6
3. preparar a introdução de smoke browser real
4. avançar para aliases/onboarding/auth retematizado
