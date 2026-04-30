# Backlog priorizado de UI/UX e superfícies operacionais

## Objetivo

Transformar a análise geral de gaps em um backlog acionável, organizado por módulo e por componentes transversais, com prioridade, impacto, esforço estimado e dependências.

---

## Escala usada

### Prioridade
- **P0**: crítico / próximo passo ideal
- **P1**: muito importante
- **P2**: importante, mas pode entrar depois
- **P3**: refinamento futuro

### Esforço estimado
- **S**: pequeno
- **M**: médio
- **L**: grande
- **XL**: muito grande

---

# 1. Backlog transversal

## 1.1 Feedbacks, estados e segurança de ação

### 1. Toasts globais de sucesso/erro
- **Tipo**: transversal
- **Prioridade**: P0
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: nenhuma
- **Entregas**:
  - toast de sucesso
  - toast de erro
  - toast informativo
  - padrão para create/update/delete/test/publish

### 2. Confirm dialog padrão
- **Tipo**: transversal
- **Prioridade**: P0
- **Impacto**: alto
- **Esforço**: S
- **Status**: iniciado
- **Dependências**: nenhuma
- **Entregas**:
  - confirmação destrutiva
  - confirmação de publish
  - confirmação de desconectar/remover

### 3. Unsaved changes dialog
- **Tipo**: transversal
- **Prioridade**: P0
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: confirm dialog
- **Entregas**:
  - bloqueio ao sair de telas editáveis
  - opção continuar / descartar / voltar

### 4. Empty / Error / Loading states reutilizáveis
- **Tipo**: transversal
- **Prioridade**: P0
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: nenhuma
- **Entregas**:
  - `EmptyStateCard`
  - `ErrorStateCard`
  - `LoadingSkeleton`
  - retry action padronizada

---

## 1.2 Overlays e produtividade

### 5. Quick preview dialog / inspector drawer
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Dependências**: dialog/drawer base
- **Entregas**:
  - preview rápido de entidades
  - inspeção sem sair da listagem

### 6. Properties drawer reutilizável
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: médio-alto
- **Esforço**: M
- **Dependências**: drawer base
- **Entregas**:
  - painel lateral para propriedades, logs ou execuções

### 7. Command palette / quick actions
- **Tipo**: transversal
- **Prioridade**: P2
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: busca global, atalhos, overlays
- **Entregas**:
  - ir para entidade
  - executar ações rápidas
  - trocar contexto

### 8. Workspace switcher dialog real
- **Tipo**: transversal
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: persistência de contexto
- **Entregas**:
  - switch real de workspace
  - recentes/favoritos
  - configuração contextual

### 8.1 Home executiva por workspace
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Status**: iniciado
- **Dependências**: analytics, integrações, logs e storage
- **Entregas**:
  - página home com visão geral da plataforma
  - updates
  - ações recomendadas
  - integrações em destaque
  - análises filtráveis e personalizáveis para a home

### 8.2 User menu flutuante no topo
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: médio-alto
- **Esforço**: S
- **Status**: iniciado
- **Dependências**: avatar/perfil
- **Entregas**:
  - avatar com foto ou inicial
  - menu flutuante superior direito
  - atalhos de perfil, segurança, faturamento e preferências

### 8.3 Logs operacionais por workspace
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: fontes de eventos/logs
- **Entregas**:
  - página `/logs`
  - filtros por origem/nível
  - feed operacional por workspace

### 8.4 Storage por workspace
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: modelagem de assets e permissões por workspace/agente
- **Entregas**:
  - página `/storage`
  - visão de pastas e assets
  - contexto de acesso por workspace/agente

### 8.5 Layout shell inspirado na referência visual
- **Tipo**: transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: sidebar, topbar, menus flutuantes
- **Entregas**:
  - menu do usuário flutuante superior direito
  - workspace switcher com presença visual forte no lado esquerdo
  - home executiva como primeiro destino do app
  - reorganização da barra lateral esquerda
  - header responsivo

---

# 2. Knowledge

## 1.3 Integrations platform requirements registrados

### 8.6 Limites por integração nativa no workspace
- **Tipo**: módulo/transversal
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Status**: planejado
- **Dependências**: modelagem de integrations/providers
- **Entregas**:
  - limite de quantidade por integração nativa
  - contador acumulado por integração
  - sem rate limit por hora nesta fase
  - preparação para limites futuros

### 8.7 Tools/ações de integração para automações
- **Tipo**: módulo/transversal
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: XL
- **Status**: planejado
- **Dependências**: refactor de integrations + automations
- **Entregas**:
  - ações por integração
  - input/output por tool
  - uso em fluxos de automação
  - persistência de payload JSON
  - parser JSON por tool

### 8.8 Credenciais seguras por provider
- **Tipo**: módulo/transversal
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: L
- **Status**: iniciado
- **Dependências**: providers + secret management
- **Entregas**:
  - seleção de credenciais por provider
  - tratamento criptografado/server-only
  - metadata pública na UI
  - base para rotação e escopo
  - painel visual de credenciais e segredos por integração

### 8.8.1 Console de execução mock para tools/actions
- **Tipo**: módulo/transversal
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: M
- **Status**: iniciado
- **Dependências**: catálogo de tools + mapping
- **Entregas**:
  - execução mock de tool
  - preview de input/output
  - payload persistível visualmente
  - base para replay/debug

### 8.9 Pedidos: detail/chat/filtros
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Status**: planejado
- **Dependências**: order detail surface + vínculo com conversas
- **Entregas**:
  - página ou modal de visualização de pedido
  - ação de chat com detecção de conversa ativa
  - link profundo por conversa
  - remoção de `Novo pedido`
  - modal de filtros em pedidos

### 8.10 Webhooks inbound com mapeamento
- **Tipo**: módulo/transversal
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: XL
- **Status**: planejado
- **Dependências**: parser JSON, automations, actions runtime
- **Entregas**:
  - página de webhook
  - URL de ingestão
  - mapeamento JSON
  - teste/debug/ativação
  - vínculo com automações e ações específicas

# 2. Knowledge

## 2.1 Observabilidade

### 9. `/knowledge/logs`
- **Tipo**: módulo
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: L
- **Status**: iniciado
- **Dependências**: leitura dos logs backend existentes / API de retrieval logs
- **Entregas**:
  - listagem de retrieval logs
  - filtros por source, período, resultado
  - acesso a query, matches e contexto

### 10. Ingest history / reprocessamento
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: endpoints/processamento disponíveis
- **Entregas**:
  - histórico de ingest
  - status por execução
  - reprocessar source/document

### 11. Health operacional de embeddings / pipeline
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: backend de observabilidade
- **Entregas**:
  - health do pipeline
  - chunks/embeddings por documento
  - indicadores de falha

### 12. Preview/inspeção rápida de documento
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: quick preview dialog
- **Entregas**:
  - abrir documento sem sair da listagem

---

# 3. AI Studio

## 3.1 Persistência e governança

### 13. Persistência real de agents
- **Tipo**: módulo
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: XL
- **Dependências**: contratos/API/backend de agents
- **Entregas**:
  - create real
  - detail real
  - update real
  - fallback coerente

### 14. Evals e scorecards
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: persistência real de agents ou contrato de avaliação
- **Entregas**:
  - superfície de execuções de avaliação
  - score por agente
  - histórico de avaliação

### 15. Guardrails como superfície própria
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Dependências**: modelagem do domínio
- **Entregas**:
  - regras editáveis
  - categorias
  - criticidade

### 16. Logs e saúde por agente
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: backend/logs
- **Entregas**:
  - latência
  - falhas
  - escalations
  - integrações acionadas

### 17. Comparação entre agentes
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: scorecards/logs
- **Entregas**:
  - compare drawer/modal
  - métricas lado a lado

---

# 4. Automations

## 4.1 Builder real

### 18. Persistência real de automations
- **Tipo**: módulo
- **Prioridade**: P0
- **Impacto**: muito alto
- **Esforço**: XL
- **Dependências**: backend/contratos
- **Entregas**:
  - create/update real
  - detail conectado
  - fallback coerente

### 19. Editor funcional de nós
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: muito alto
- **Esforço**: XL
- **Dependências**: persistência real de automations
- **Entregas**:
  - adicionar nó
  - editar propriedades
  - validar conexões

### 20. Runs / execution logs
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: runtime / backend
- **Entregas**:
  - histórico de execuções
  - erro por run
  - detalhe de execução

### 21. Test flow / publish flow
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Dependências**: confirm dialog + runtime básico
- **Entregas**:
  - testar fluxo
  - publicar/pausar
  - revisão pré-publicação

---

# 5. Templates

## 5.1 Governança editorial

### 22. Persistência real de templates
- **Tipo**: módulo
- **Prioridade**: P0
- **Impacto**: alto
- **Esforço**: XL
- **Dependências**: backend/contratos
- **Entregas**:
  - create/update real
  - detail conectado
  - fallback coerente

### 23. Versionamento e histórico
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: persistência real
- **Entregas**:
  - revisões
  - histórico
  - autor/data

### 24. Workflow de aprovação/publicação
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: versionamento
- **Entregas**:
  - submeter
  - aprovar/rejeitar
  - motivo de revisão

### 25. Preview mais rico / diff
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: histórico/versionamento
- **Entregas**:
  - diff entre versões
  - preview por canal/estado

---

# 6. Campaigns

## 6.1 Runtime e operação

### 26. Filtros avançados e segmentação operacional
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Dependências**: dados/queries disponíveis
- **Entregas**:
  - filtros por status, objetivo, owner, período
  - sorting

### 27. Publicação / revisão final
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: M
- **Dependências**: confirm dialog / runtime
- **Entregas**:
  - review final
  - publicar
  - pausa/retomada

### 28. Histórico de runs e impacto
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: métricas/runtime
- **Entregas**:
  - timeline operacional real
  - entregas/clicks/resultados

### 29. Simulação / preview de audiência
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: dados de audiência
- **Entregas**:
  - preview antes do envio

---

# 7. Integrations

## 7.1 Profundidade operacional

### 30. Secrets reais / credenciais protegidas
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: muito alto
- **Esforço**: XL
- **Dependências**: backend seguro
- **Entregas**:
  - secret management
  - rotação
  - masking

### 31. Health logs / histórico de validação
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: storage/logging
- **Entregas**:
  - histórico de health checks
  - motivo de falha
  - timestamps

### 32. Dependências e bindings
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: mapeamento com AI Studio/Automations
- **Entregas**:
  - onde a integração é usada
  - impacto de desconectar

---

# 8. Settings

## 8.1 Administração real

### 33. Persistência real de profile/workspace/security
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: backend/settings
- **Entregas**:
  - salvar preferências
  - salvar config de workspace
  - salvar política básica

### 34. Usuários / convites / papéis reais
- **Tipo**: módulo
- **Prioridade**: P1
- **Impacto**: alto
- **Esforço**: XL
- **Dependências**: auth/RBAC
- **Entregas**:
  - convite
  - editar acesso
  - remover usuário

### 35. Canais configuráveis reais
- **Tipo**: módulo
- **Prioridade**: P2
- **Impacto**: médio-alto
- **Esforço**: L
- **Dependências**: integrações/canais reais
- **Entregas**:
  - config por canal
  - owner
  - status
  - fallback

### 36. Billing real
- **Tipo**: módulo
- **Prioridade**: P3
- **Impacto**: médio
- **Esforço**: XL
- **Dependências**: sistema de cobrança
- **Entregas**:
  - plano
  - método de pagamento
  - faturas
  - consumo

---

# 9. Shell / Navegação global

### 37. Busca global real
- **Tipo**: transversal
- **Prioridade**: P2
- **Impacto**: alto
- **Esforço**: L
- **Dependências**: command palette / index de busca
- **Entregas**:
  - busca por entidades
  - atalhos rápidos

### 38. Recentes / favoritos
- **Tipo**: transversal
- **Prioridade**: P3
- **Impacto**: médio
- **Esforço**: M
- **Dependências**: persistência de contexto
- **Entregas**:
  - itens recentes
  - favoritos por usuário

### 39. Notificações / centro de atividade
- **Tipo**: transversal
- **Prioridade**: P3
- **Impacto**: médio
- **Esforço**: L
- **Dependências**: eventos/toasts/backend
- **Entregas**:
  - activity center
  - notificações agrupadas

---

# 10. Sequência sugerida de execução

## Fase A — base transversal crítica
1. Toasts globais
2. Confirm dialog
3. Unsaved changes dialog
4. Empty/Error/Loading states

## Fase B — observabilidade crítica
5. Knowledge logs
6. Ingest history
7. Health de pipeline

## Fase C — persistência dos módulos mais sensíveis
8. AI Agents real
9. Automations real
10. Templates real

## Fase D — profundidade operacional
11. Evals e guardrails
12. Runs de automations
13. Workflow de aprovação em templates
14. Health logs de integrations

## Fase E — administração e produtividade
15. Settings real
16. Busca global
17. Workspace switcher real
18. Quick previews / drawers

---

# 11. Observação final

A prioridade mais eficiente neste momento é atacar primeiro o que aumenta qualidade em toda a suíte ao mesmo tempo:

- componentes transversais de feedback e segurança
- observabilidade de Knowledge
- persistência real dos módulos ainda mockados

Essa combinação gera o maior salto percebido de maturidade do produto.
