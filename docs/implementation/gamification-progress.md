# NexxaLife — Progresso da Implementação Gamificada e Meu Ciclo Interconectado

## Status geral

Implementação incremental do sistema de produtividade gamificada:

```text
diagnóstico → scores vivos → perguntas → missões → aprovação humana → execução → registro → acompanhamento
```

---

## Checklist vivo

### Fase 1 — Fundação de banco e engine

- [x] Criar plano completo de gamificação em `docs/NEXXALIFE_GAMIFICATION_SCORE_SYSTEM_PLAN.md`.
- [x] Criar migration `db/migrations/014_gamification.sql`.
- [x] Criar tabelas `life_area_scores`, `score_events`, `adaptive_questions`, `user_question_answers`, `missions`, `achievements`, `user_achievements`.
- [x] Criar seeds iniciais de perguntas adaptativas.
- [x] Criar seeds iniciais de conquistas.
- [x] Criar helpers SQL de level/score.
- [x] Criar types TS em `lib/gamification/types.ts`.
- [x] Criar engine TS em `lib/gamification/scoring.ts`.
- [x] Criar server actions de gamificação em `lib/db/actions.ts`.
- [ ] Validar migration com `npm run db:migrate` quando houver `DATABASE_URL` disponível. Tentativa local: `DATABASE_URL not set; migration not executed`.
- [x] Validar build.

### Fase 2 — Human-in-the-loop gamificado

- [x] Adicionar tools gamificadas no agente de planejamento.
- [x] Marcar tools mutáveis gamificadas como dependentes de aprovação.
- [x] Adicionar botão/tecla visual `OK, prosseguir` no pacote de aprovação.
- [x] Impedir execução acidental sem confirmação explícita.
- [ ] Mostrar status de execução por item.
- [ ] Testar aprovação de missão.
- [ ] Testar aprovação de evento de score.

### Fase 3 — UI inicial

- [x] Criar cards de score por área.
- [x] Criar barra XP/level.
- [x] Criar painel de missões ativas.
- [x] Integrar no dashboard.
- [ ] Integrar no studio.
- [ ] Mostrar perguntas adaptativas no fluxo.

### Fase 4 — Agente de acompanhamento

- [ ] Agente consultar scores antes de sugerir plano.
- [ ] Agente sugerir missões baseadas nas áreas fracas.
- [ ] Agente registrar score events após execução aprovada.
- [ ] Agente explicar evolução em linguagem humana.

---

## Evidências

### 2026-05-12

- Criada migration `014_gamification.sql`.
- Criada engine TS de score progressivo.
- Criadas server actions para scores, missões, perguntas e conquistas.
- `saveDiagnosticResult` agora tenta inicializar a gamificação após salvar diagnóstico.
- `ToolApprovalBatch` agora exige digitar `OK` antes de executar/remover ações.
- Agente de planejamento recebeu tools de leitura gamificada: `getLifeAreaScores`, `getActiveMissions`, `getAdaptiveQuestions`.
- Agente de planejamento recebeu tools mutáveis human-in-the-loop: `createMission`, `recordScoreEvent`, `answerAdaptiveQuestion`.
- `npm run build` passou com sucesso. Warnings antigos de `/login`, `/signup` e metadata continuam não bloqueantes.
- `npm run db:migrate` não foi executado porque `DATABASE_URL` não está definido no ambiente atual.
- Correção pós-teste do usuário: removida exigência de digitar `OK`; `ToolApprovalBatch` agora trava após o primeiro clique, mostra `Executando...` e impede múltiplos cliques/duplicação de `addAgendaEvent` ou outras ações.
- Criado componente `components/gamification/life-area-cockpit.tsx` com cards de score por área, XP/nível, missões ativas, leitura rápida e CTA para novas missões.
- Integrado `LifeAreaCockpit` ao dashboard em `components/nexxa-life/nexxa-life-dashboard-view.tsx`.
- Novo `npm run build` passou com sucesso; warnings antigos permanecem não bloqueantes.

---

### Fase 5 — Core interconectado do Meu Ciclo

- [x] Criar plano `docs/MEU_CICLO_INTERCONNECTED_CORE_PLAN.md`.
- [x] Criar migration `db/migrations/015_interconnected_cycle.sql` para conectar metas, checklist, agenda, diário, missões e áreas.
- [x] Criar views `v_connected_checklist`, `v_goal_execution_summary` e `v_today_cycle`.
- [x] Atualizar `getChecklist` para usar checklist conectado.
- [x] Atualizar `addChecklistItem` para aceitar `goalId`, `missionId`, `lifeArea`, `xpReward` e `impactScore`.
- [x] Atualizar `toggleChecklistItem` para registrar score/XP ao concluir tarefa conectada.
- [x] Criar `addConnectedChecklistItem` e `getConnectedCycle`.
- [x] Atualizar UI do checklist para mostrar meta, área e XP por tarefa.
- [x] Validar build.
- [ ] Aplicar migration em banco com `DATABASE_URL`.
- [x] Refatorar `/goals` para mostrar execução conectada.
- [x] Expandir eventos de metas com recorrência e campos de preparação para Google Calendar.
- [ ] Refatorar `/agenda` para mostrar vínculos com metas/missões.
- [x] Refatorar `/settings/profile` como identidade gamificada com 16 avatares/arquetipos de tarot.
- [x] Corrigir fallback de `getProfileIdentity` quando migration/view de perfil gamificado ainda não foi aplicada.
- [x] Limpar a aba de perfil em painéis: Identidade, Avatar e Missão.
- [x] Transformar Configurações em full page sem limite estreito.
- [x] Transformar Perfil em full page sem limite estreito.
- [x] Transformar Segurança em full page com painel dedicado.
- [x] Adicionar opção de reset de progresso em Configurações → Segurança com confirmação textual.
- [x] Criar pesquisa e banco inicial de perguntas para diagnóstico de arquétipo tarot.
- [x] Criar migration `019_archetype_diagnostic.sql` para armazenar arquétipo no diagnóstico.
- [ ] Refatorar `/journal` para reflexão contextual.
- [ ] Refatorar dashboard para mostrar ciclo do dia completo.

## Próximo checkpoint

1. Aplicar migrations `014_gamification.sql` e `015_interconnected_cycle.sql` em ambiente com `DATABASE_URL`.
2. Criar UI de adicionar tarefa/evento diretamente dentro de cada meta.
3. Conectar avatar/arquetipo escolhido em dashboard, sidebar e respostas da IA.
4. Atualizar tools do agente para criar checklist e eventos já conectados a `goalId`/`lifeArea`.
4. Integrar painel gamificado no Studio lateral.
5. Testar fluxo real no navegador: meta → tarefa conectada → conclusão → score/XP atualiza.
