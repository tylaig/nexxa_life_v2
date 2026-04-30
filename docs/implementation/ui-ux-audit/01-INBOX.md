# Inbox

## Arquivos analisados
- `app/(app)/inbox/page.tsx`
- `components/inbox/inbox-app.tsx`
- `components/inbox/filter-rail.tsx`
- `components/inbox/conversation-list.tsx`
- `components/inbox/conversation-thread.tsx`
- `components/inbox/context-panel.tsx`
- `components/inbox/inbox-list-toolbar.tsx`
- `components/inbox/inbox-thread-toolbar.tsx`

## Objetivo operacional
- Operar atendimento multicanal com contexto de cliente, pedido e IA.
- Usuário: atendimento, suporte, vendas e coordenação.
- Ação primária: priorizar conversas e responder com segurança.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 2/5
- Acessibilidade: 2/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A base estrutural da Inbox é boa e já parece um produto operacional. O principal gap é transformar a tela em cockpit real: priorização mais forte, menos sensação de mock, filtros reais, melhor leitura de urgência/SLA/ownership e contexto lateral mais decisivo.

## Problemas encontrados
- Prioridade operacional ainda fraca na lista.
- Muitos fluxos com cara de mock/toast.
- Toolbar e filtros avançados pouco confiáveis.
- Thread ainda pode diferenciar melhor mensagens, notas, eventos e automação.
- Context panel útil, porém ainda informativo demais e decisório de menos.
- Estados vazios e sem seleção genéricos.
- Layout apertado para notebook/mobile.

## Melhorias recomendadas
### Quick wins
- Reforçar badges de SLA, escalada, sem dono e automação.
- Mostrar filtros ativos e ordenação corrente.
- Melhorar empty state da lista e estado sem conversa selecionada.
- Reduzir ações puramente ilustrativas.

### Estruturais
- Evoluir lista para leitura de alta velocidade.
- Criar summary card no contexto com próxima ação, SLA, owner e risco.
- Transformar thread em timeline operacional com eventos de sistema.
- Tornar filtros e ordenação comportamentos reais.
- Responsividade por colapso/drawer.

### Novas superfícies
- `/inbox/queue`
- `/inbox/conversations/[id]`
- `/inbox/ai-review`
- `/inbox/views`

## Refatoração sugerida
- Extrair `use-inbox-state`.
- Criar `inbox-view-model.ts` para labels, contagens e prioridade.
- Dividir `context-panel.tsx` por tabs.
- Dividir `conversation-thread.tsx` em header/timeline/composer.
- Criar primitives: `ConversationPriorityBadge`, `ConversationSummaryCard`, `InboxEmptyState`.

## Plano de implementação
1. Ajustar prioridades visuais e estados básicos.
2. Tornar filtros/toolbar reais.
3. Reestruturar lista e thread.
4. Reorganizar context panel.
5. Fechar responsividade e acessibilidade.

## Critérios de aceite
- Conversas críticas e sem dono são identificáveis em segundos.
- Filtros e ordenação têm efeito visível e persistente.
- Tipos de eventos na thread ficam inequívocos.
- Context panel responde “o que fazer agora?”.
- Menor sensação de mock.
