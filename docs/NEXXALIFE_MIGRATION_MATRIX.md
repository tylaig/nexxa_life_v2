# NexxaLife — Migration Matrix

Data: 2026-04-29
Base de leitura:
- `docs/NEXXALIFE_FRONTEND_MIGRATION_AUDIT_2026-04-29.md`
- `old/meu-dia-flow/src/pages/*`
- `old/meu-dia-flow/src/components/*`
- `old/chat.meusuper.app` como fundação técnica de referência

---

## Objetivo

Transformar a auditoria em uma matriz objetiva de decisão por tela, evitando migração cega do legado.

Classificações usadas:
- `INSPIRAR` = manter como referência forte de UX/narrativa
- `ADAPTAR` = reaproveitar intenção visual/estrutura, mas com shell novo
- `RECRIAR` = reconstruir com contratos e domínio novos
- `ADIAR` = não entra na primeira onda
- `DESCARTAR` = não deve virar compromisso de produto agora

---

## Decisão macro

Estratégia aprovada para todo o produto:
- portar intenção, hierarquia e narrativa
- não portar `storage.js` nem a lógica local como verdade de negócio
- separar explicitamente `old` e `new`
- usar `chat.meusuper.app` como inspiração estrutural para shell, navegação, componentes e organização

---

## Matriz tela por tela

| Tela legado | Papel no produto | Valor de UX | Complexidade de domínio | Decisão | Prioridade | Observações de migração |
|---|---|---:|---:|---|---|---|
| `Landing.jsx` | entrada/posicionamento | Alta | Baixa | ADAPTAR | P2 | Recriar narrativa e hero em shell novo; sem acoplamento ao roteamento legado |
| `Login.jsx` | autenticação | Média | Alta | RECRIAR | P4 | A UI pode inspirar; a lógica depende de auth real |
| `Cadastro.jsx` | aquisição/conta | Média | Alta | RECRIAR | P4 | Igual ao login: manter copy útil, reescrever fluxo |
| `Onboarding.jsx` | coleta inicial e ativação | Alta | Média | RECRIAR | P1 | Primeira onda; usar contratos novos e estado controlado |
| `Dashboard.jsx` | síntese da jornada | Muito alta | Média | RECRIAR | P1 | Primeira onda visual com dados mockados controlados |
| `Diagnostico.jsx` | núcleo de avaliação | Muito alta | Muito alta | RECRIAR | P3 | Só após documentação do domínio framework/diagnóstico |
| `ObjetivosMetas.jsx` | plano de evolução | Muito alta | Alta | RECRIAR | P1 | Primeira onda visual; engine entra depois |
| `Checklist.jsx` | execução diária | Muito alta | Alta | RECRIAR | P1 | Primeira onda visual + contrato de tarefa/rotina novo |
| `Agenda.jsx` | operação tática | Alta | Alta | RECRIAR | P3 | Depende de modelagem de tarefas, eventos e agenda |
| `Diario.jsx` | reflexão e histórico | Alta | Média | RECRIAR | P3 | Pode entrar cedo visualmente, mas domínio vem depois |
| `Relatorio.jsx` | fechamento de ciclo | Alta | Muito alta | RECRIAR | P3 | Depende de diagnóstico + metas + rotina consistentes |
| `Integracoes.jsx` | extensibilidade | Média | Média | ADIAR | P4 | Não entra na fase 1; revisar depois como vertical separada |
| `AdminDashboard.jsx` | governança/framework | Muito alta | Muito alta | RECRIAR | P2/P3 | Núcleo estratégico; precisa documentação antes de UI final |
| `Academia.jsx` | conteúdo/comunidade | Média | Baixa/Média | ADIAR | P4 | Tratar como superfície complementar |
| `Marketplace.jsx` | ecossistema/ofertas | Média | Média | ADIAR | P4 | Não deve bloquear fundação do produto |
| `News.jsx` | conteúdo/novidades | Baixa/Média | Baixa | ADIAR | P4 | Pode virar feed futuro ou sair do escopo MVP |
| `Testes.jsx` | laboratório/diagnóstico interno | Baixa | Baixa | DESCARTAR | Backlog experimental | Não deve orientar a estrutura final do produto |

---

## Agrupamento por ondas de execução

### Onda 0 — documentação e fundação
- arquitetura alvo
- entidades de domínio
- mapa old/new
- backlog priorizado
- checklist vivo da fase 1

### Onda 1 — migração visual controlada
- `Onboarding.jsx`
- `Dashboard.jsx`
- `ObjetivosMetas.jsx`
- `Checklist.jsx`

### Onda 2 — governança e domínio estrutural
- `AdminDashboard.jsx`
- `Diagnostico.jsx`

### Onda 3 — operação recorrente
- `Agenda.jsx`
- `Diario.jsx`
- `Relatorio.jsx`

### Onda 4 — complementares e expansão
- `Integracoes.jsx`
- `Academia.jsx`
- `Marketplace.jsx`
- `News.jsx`

---

## Dependências críticas por tela

| Tela | Depende de | Pode nascer com mock controlado? |
|---|---|---|
| Onboarding | perfil inicial, avaliação de contexto | Sim |
| Dashboard | KPIs agregados, resumo de metas, rotina, diagnóstico | Sim |
| Objetivos & Metas | domínio de objetivos, metas, progresso | Sim |
| Checklist | tarefas, status diário, rotina | Sim |
| Admin / Framework | entidades canônicas e versionamento | Parcialmente |
| Diagnóstico | framework publicado, sessão diagnóstica, engine | Parcialmente |
| Agenda | tarefas, eventos, regras de calendário | Parcialmente |
| Diário | registro diário, contexto emocional/execução | Sim |
| Relatórios | snapshots consistentes do domínio | Não ideal |

---

## Regras operacionais desta matriz

1. Nenhuma tela sai do legado para produção sem passar por esta decisão.
2. `RECRIAR` não significa jogar fora a UX; significa reescrever a base técnica.
3. Tudo que tocar negócio crítico deve apontar para contratos novos em `lib/nexxalife/contracts/*`.
4. Tudo que vier de inspiração do legado deve ficar rastreável em `components/nexxalife/old/*` ou na documentação de mapeamento.
5. O backlog deve ser queimado na ordem P0 → P1 → P2 → P3 → P4.
