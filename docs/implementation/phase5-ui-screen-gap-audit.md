# Auditoria profunda de gaps de telas e superfícies UI

## Objetivo

Consolidar, após os últimos ciclos de refatoração estrutural e visual, o que ainda falta desenvolver em telas, blocos, modais, drawers, estados de vazio, feedbacks e superfícies operacionais do produto.

---

## 1. Visão geral do estado atual

A suíte já atingiu uma base bastante forte em:

- shell global
- sidebar com hierarquia mais coerente
- topbar consistente
- primitives transversais (`PageContainer`, `PageHeader`, `StatCard`)
- padrão `list/detail/new/edit` em módulos principais
- AI Studio mais forte visualmente
- Settings mais coerente como centro administrativo
- Knowledge já melhor separado entre catálogo, detalhe e retrieval
- Integrations com create/detail/edit reais

Ainda assim, existe uma diferença importante entre:

1. **estrutura e navegação** já amadurecidas
2. **profundidade funcional e de microinterações** ainda incompleta

---

## 2. Gaps transversais de UX/UI

### 2.1 Estados de interface ainda faltantes
Quase todos os módulos ainda precisam consolidar estados explícitos de:

- loading skeletons mais ricos
- empty state com CTA contextual
- erro com retry visível
- sucesso inline/toast após ações críticas
- estado desabilitado/readonly coerente
- estado de salvamento com feedback persistente

### 2.2 Modais, drawers e overlays ainda pouco explorados
Ainda faltam superfícies auxiliares para reduzir navegação desnecessária, como:

- modais de confirmação destrutiva
- modais de duplicação/renomeação
- drawers para inspeção rápida
- dialogs para health checks, testes e previews
- command palette / quick actions para operações frequentes
- modal de troca de contexto (workspace, time, canal)

### 2.3 Feedback de ações
Ainda faltam padrões consistentes para:

- toast global de sucesso/erro
- confirmação pós-save
- confirmação pós-delete
- aviso de alteração não salva
- validação inline de formulários
- confirmação antes de abandonar edição

### 2.4 Consistência de tabelas/listas
Boa parte dos módulos ainda usa listas em cards, mas pode evoluir para:

- tabelas operacionais responsivas
- sorting real
- filtros avançados persistentes
- bulk actions
- seleção múltipla
- paginação ou virtualização quando necessário

### 2.5 Navegação contextual
Ainda faltam padrões melhores para:

- breadcrumbs refinados em todos os módulos
- tabs secundárias dentro de detail pages complexas
- subtabs de observabilidade / histórico / logs
- atalhos contextuais de “próxima ação”

---

## 3. Auditoria por módulo

## 3.1 AI Studio

### Já resolvido
- hub mais coerente visualmente
- board de agentes mais forte
- detalhe e editor separados
- vínculos conceituais com integrações e knowledge

### Ainda falta
- evals dedicados
- guardrails como superfície própria
- histórico de versões do agente
- comparativo entre agentes
- visão de saúde por agente
- timeline de mudanças
- persistência real de edição/criação
- filtros mais ricos por time, função, modelo, status

### Blocos/modais desejáveis
- modal “executar avaliação”
- drawer “comparar agentes”
- dialog “ativar/desativar integração no agente”
- modal “duplicar agente”
- painel lateral de logs rápidos

---

## 3.2 Knowledge

### Já resolvido
- catálogo separado
- source detail
- document detail
- retrieval console dedicado

### Ainda falta
- `/knowledge/logs`
- observabilidade de retrieval persistente
- ingest history
- status de embeddings
- saúde do pipeline RAG
- filtros por source type/status
- visão por lote de ingestão

### Blocos/modais desejáveis
- modal “rodar ingest agora” com opções
- drawer “ver logs do retrieval”
- modal “reprocessar documento”
- preview rápido de documento sem sair da lista
- painel de health do pipeline

---

## 3.3 Integrations

### Já resolvido
- catálogo
- create
- detail
- edit com update real

### Ainda falta
- gerenciamento de secrets real
- observabilidade de chamadas
- histórico de validações
- logs por provider
- filtros por status/provider
- detalhe mais profundo de bindings dependentes

### Blocos/modais desejáveis
- modal “testar conexão” com resultado expandido
- drawer “payload público / payload protegido”
- modal “rotacionar credenciais”
- modal destrutivo “desconectar integração”

---

## 3.4 Campaigns

### Já resolvido
- list/detail/new/edit
- create/update real
- preview contextual e timeline inicial

### Ainda falta
- revisão pré-publicação mais robusta
- comparação entre versões
- filtros avançados e segmentação real
- métricas conectadas ao runtime
- runs/history por campanha

### Blocos/modais desejáveis
- modal “publicar campanha”
- modal “duplicar campanha” mais rico
- drawer “prévia por canal”
- modal “simular audiência”
- confirmação de saída com alterações não salvas

---

## 3.5 Templates

### Já resolvido
- list/detail/new/edit estrutural
- preview lateral

### Ainda falta
- persistência real
- versionamento
- aprovação/publicação real
- diff entre versões
- status workflow mais rico

### Blocos/modais desejáveis
- modal “submeter para aprovação”
- modal “rejeitar com motivo”
- drawer “histórico de revisões”
- preview multicanal expandido

---

## 3.6 Automations

### Já resolvido
- list/detail/new/edit estrutural
- canvas extraído

### Ainda falta
- persistência real
- editor de nós funcional
- logs e execuções
- runs por automação
- validação do fluxo antes de publicar

### Blocos/modais desejáveis
- modal “testar fluxo”
- drawer “run detail”
- modal “publicar fluxo”
- modal “adicionar nó”
- painel lateral de propriedades do nó

---

## 3.7 Settings

### Já resolvido
- overview administrativo
- perfil
- workspace
- integrações
- segurança
- usuários
n- canais
- billing

### Ainda falta
- persistência real em quase todas as subpáginas
- permissões detalhadas
- papéis e times
- billing real
- preferências mais profundas por usuário
- canais com configuração efetiva

### Blocos/modais desejáveis
- modal “convidar usuário”
- modal “editar papel”
- modal “trocar plano”
- modal “confirmar remoção de usuário”
- drawer “detalhes do canal”
- modal “configurar workspace” a partir do switcher

---

## 3.8 Sidebar / shell global

### Já resolvido
- arquitetura mais coerente
- bloco de conta melhorado
- engrenagem junto ao workspace

### Ainda falta
- quick switch real de workspace
- persistência do workspace selecionado
- search global / command center funcional
- atalhos por contexto
- favoritos / itens recentes

### Blocos/modais desejáveis
- command palette global
- modal de troca rápida de workspace
- painel de notificações
- centro de ajuda contextual

---

## 4. Gaps de microcomponentes

Ainda devem ser considerados componentes reutilizáveis adicionais:

- `ConfirmDialog` padrão
- `DeleteDialog` padrão
- `UnsavedChangesDialog`
- `EntityHealthBadge`
- `EmptyStateCard`
- `ErrorStateCard`
- `InlineActivityFeed`
- `PropertiesDrawer`
- `AuditTimeline`
- `ExecutionLogList`
- `StatusPillGroup`
- `QuickPreviewDialog`
- `WorkspaceSwitcherDialog`

---

## 5. Priorização recomendada

### Prioridade alta
1. Knowledge logs / observabilidade
2. Persistência real de AI Agents
3. Persistência real de Automations
4. Persistência real de Templates
5. Modais transversais de confirmação/salvamento

### Prioridade média
6. Usuários / papéis / governança detalhada
7. Canais configuráveis reais
8. Health/logs ricos de integrações
9. command palette global

### Prioridade futura
10. billing real
11. favoritos/recentes no shell
12. comparativos avançados entre entidades
13. scorecards e avaliações aprofundadas

---

## 6. Conclusão

O produto já saiu da fase de páginas genéricas e entrou numa fase de suíte operacional estruturada. O principal gap agora não é mais arquitetura de navegação, mas sim:

- profundidade funcional
- estados finos de UX
- overlays auxiliares
- observabilidade
- persistência real
- governança operacional

Ou seja: a base visual e estrutural está boa; o próximo salto de qualidade virá da camada de **interações, modais, logs, estados e workflows reais**.
