# Matriz Global de Gaps

## P0 — Crítico antes da grande rodada visual

- CTAs principais sem consequência visível
- mistura de namespaces de AI Studio, Knowledge e Skills
- loading/empty/error inconsistentes entre páginas
- páginas com densidade alta sem hierarquia de prioridade suficiente
- comentários editoriais e resíduos de mock no código e em parte da UI
- ausência de padrão explícito para ações mock

## P1 — Estrutural de navegação e consistência

- tabs persistentes no AI Studio
- blocos horizontais ricos para agentes
- homogeneização do módulo Knowledge
- separação mais clara entre catálogo, detalhe e edição em integrações
- guided setup em Settings
- feedback uniforme para salvar, testar, instalar, conectar, convidar e publicar

## P2 — Profundidade operacional

- histórico de execuções, custos, triggers e incidentes por agente
- observabilidade de embeddings, retrieval e ingestão no Knowledge
- runtime e replay em integrações/webhooks
- filtros avançados reais em campaigns, automations e templates
- detalhe navegável para logs, storage, audience, products

## P3 — Polimento de plataforma

- revisão completa de idioma
- otimização de responsividade tablet/desktop narrow
- acessibilidade e keyboard support
- skeletons, paginação, empty states e drawers transversais

## Gaps específicos validados no browser

### AI Studio
- cards da overview parecem clicáveis, mas sem drilldown consistente
- rota e contexto de Skills fragmentados
- falta governança operacional por agente

### Knowledge
- hub ainda conceitual demais
- catálogo e retrieval existem, mas falta costura sistêmica com agentes
- bloqueios sem next step forte quando não há sources

### Integrations / Apps
- várias ações de instalar, ativar, ver provider e testar conexão sem feedback claro
- arquitetura mental mistura catálogo comercial, provider técnico e runtime operacional

### Settings
- múltiplos saves ambíguos
- convites e configurações com aparência de mock
- falta visão de completude do workspace

### Campaigns
- estado de carregamento inconsistente validado no browser

### Logs / Storage / Audience / Products
- boas bases visuais, pouca profundidade de drilldown e ação contextual
