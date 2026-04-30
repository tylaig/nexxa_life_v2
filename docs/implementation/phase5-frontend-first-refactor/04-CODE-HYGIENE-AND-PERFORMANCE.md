# Code Hygiene, Performance e Normalização Profissional

## 1. Objetivo

Remover resíduos de construção por IA, excesso de comentários editoriais, ruído semântico e estruturas de mock espalhadas, ao mesmo tempo em que preparamos o frontend para uma evolução sólida e backend-ready.

## 2. Problemas encontrados no código

### Comentários editoriais e resíduos visíveis
Arquivos com comentários desnecessários ou com cara de prototipagem:
- `components/app-shell/app-sidebar.tsx`
- `components/settings/settings-overview-view.tsx`
- `components/campaigns/campaigns-view.tsx`
- `components/knowledge/knowledge-ingest-crawler-view.tsx`
- `components/knowledge/knowledge-manual-editor-view.tsx`
- `components/skills/skills-view.tsx`
- `components/contacts/contacts-view.tsx`
- `components/analytics/analytics-view.tsx`
- `components/inbox/context-panel.tsx`
- `components/inbox/conversation-thread.tsx`
- `components/storage/storage-overview-view.tsx`

### Banners/editoriais com tom de explicação de construção
Casos a revisar:
- `components/knowledge/knowledge-overview-view.tsx`
- `components/ai-studio/ai-studio-shell-view.tsx`
- `components/apps/integrations-list-view.tsx`

### Uso excessivo de mocks inline ou toasts como fim de fluxo
Casos relevantes:
- `components/inbox/context-panel.tsx`
- `components/inbox/inbox-action-dialogs.tsx`
- `components/inbox/inbox-thread-toolbar.tsx`
- `components/apps/integrations-webhooks-view.tsx`
- `components/apps/integration-detail-view.tsx`

## 3. Regras de higiene

1. Remover comentários que apenas descrevem JSX óbvio.
2. Manter comentários apenas quando explicarem decisão arquitetural não trivial.
3. Mover datasets mock para arquivos `data.ts` ou adaptadores de mock.
4. Evitar textos de roadmap embutidos onde o usuário espera operação real.
5. Substituir toasts de mock por:
   - ação real
   - disabled com motivo
   - modal/sheet de “não disponível nesta fase” quando necessário

## 4. Estrutura recomendada por módulo

Para cada domínio complexo:
- `view.tsx` ou `*-view.tsx` apenas compõe
- `data.ts` ou `mock-data.ts` concentra fixtures temporárias
- `view-model.ts` concentra transformação de dados
- `actions.ts` concentra side effects/mock adapters
- `types.ts` ou `contracts.ts` normaliza shape

## 5. Melhorias de performance

### Shell e listas
- lazy load de painéis secundários e drawers pesados
- memoização de listas densas
- virtualização em tabelas maiores
- evitar arrays inline reprocessados a cada render

### Forms e studios
- dividir editores grandes em sub-seções menores
- usar loaders locais em vez de rerender global
- unificar dirty state e validação

### Dados mock/backbone futuro
- introduzir adapters `useXRepository()` ou `useXDataSource()`
- separar claramente `mock mode` de `connected mode`

## 6. Critérios de aceite

- sem comentários editoriais redundantes nas áreas tocadas
- sem CTA que exista só para disparar toast genérico sem contexto
- menos lógica inline nos arquivos de view
- dados mock centralizados e identificáveis
- componentes menores e mais previsíveis
