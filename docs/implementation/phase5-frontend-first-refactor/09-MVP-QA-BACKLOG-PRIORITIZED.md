# Backlog Final Priorizado — MVP QA 100%

## Objetivo
Consolidar os gaps observados no browser em backlog executável, priorizado por impacto direto no MVP e na credibilidade operacional da plataforma.

## Critérios de prioridade
- P0 — quebra operacional, fake affordance grave, rota degradada/broken ou inconsistência que compromete QA/MVP imediatamente
- P1 — fluxo principal incompleto, mock excessivo ou arquitetura de navegação que impede operação clara
- P2 — profundidade operacional, observabilidade e refinamentos necessários para robustez pós-MVP imediato
- P3 — polimento, linguagem, acessibilidade e acabamento transversal

## P0 — corrigir antes de declarar MVP funcional

### 1. Eliminar CTAs NO-OP em áreas críticas
Status atual: avançado na rodada P1 com redução dos NO-OPs silenciosos mais visíveis; ainda não totalmente fechado.

Impacto:
- reduz sensação de protótipo quebrado
- remove affordances falsas em superfícies centrais

Itens confirmados:
- Dashboard: `Exportar` corrigido com feedback explícito; `Abrir campaigns` validado com navegação real para `/campaigns`; `Abrir orders` e `Abrir automations` já estão ligados a `href` reais no componente e saem da classe de NO-OP silencioso
- Inbox: `Nova view` corrigido com feedback explícito; `Visualizações salvas` segue como mock explícito com toast; `W Game Box` e `Vendas` foram revalidados como filtros funcionais; `Abrir painel` agora foi reclassificado como funcional; `Histórico` segue pendente de correção específica
- Contacts: `Abrir conversa` corrigido com navegação para `/inbox`; `Filtros` corrigido com feedback explícito
- Knowledge: `Atualizar Hub` corrigido com feedback explícito; `Atualizar` em retrieval e `Atualizar`/`Aplicar filtro` em logs também convertidos em bloqueio explícito por ausência de source
- Automations detail: `Logs` corrigido com feedback explícito
- Templates edit: `Sugerir variante` e `Salvar alterações` agora respondem com feedback explícito de frontend-first; `Editar` segue funcional
- Settings: saves principais de workspace, convite, acesso, campos, tags, segurança e billing já respondem com feedback explícito; superfícies secundárias de `profile`, `users`, `channels`, `billing`, `security` e `contact-fields` também foram convertidas nesta rodada

Ação esperada:
- cada CTA deve virar `REAL`, `MOCK` explícito com feedback ou `BLOCKED` com pré-condição clara

### 2. Corrigir Campaign edit quebrado
Status atual: corrigido na rodada P0.1 de execução.

Impacto:
- rota de edição hoje passa sensação de bug real, não apenas mock

Achado original:
- `/campaigns/[campaignId]/edit` abre com fallback/defaults indevidos
- banner `Failed to load campaign`
- preview `Sem nome`
- ações desabilitadas sem recuperação

Resultado desta rodada:
- editor voltou a carregar o item auditado `camp_cart_recovery`
- fallback da listagem cobre falha transitória do lookup direto

Ação remanescente:
- revalidar novos IDs/datasets quando houver mais campanhas reais

### 3. Corrigir hidratação/validação das rotas dinâmicas de Apps
Status atual: corrigido na rodada P0.1 de execução.

Impacto:
- profundidade de integrações fica não confiável
- slugs inválidos aceitam a mesma tela, reduzindo confiança do módulo

Achados originais:
- `/apps/[integrationId]` permanece com status `unknown` e observabilidade vazia
- `/apps/[integrationId]/edit` carrega mesma tela até com slug inválido
- `/apps/[integrationId]/mapping` trava em `Carregando`

Resultado desta rodada:
- `/apps` passou a expor itens instalados reais de fixture operacional
- detalhe, edit e mapping foram revalidados via browser em `/apps/int_openai_assistants`
- navegação interna e breadcrumbs foram normalizados para `/apps/*`

Ação remanescente:
- endurecer ainda mais a resposta para slugs inválidos em novos datasets/rotas derivadas

### 4. Normalizar Analytics
Status atual: corrigido na rodada P0.1 de execução.

Impacto:
- rota dedicada hoje não representa módulo próprio

Achado original:
- `/analytics` redireciona para `/dashboard`

Resultado desta rodada:
- a rota agora renderiza uma superfície própria de analytics com topbar, KPIs e tabs dedicadas
- validação real no browser confirmou heading `Analytics` e conteúdo próprio

Ação remanescente:
- alinhar título da aba/document title com o módulo quando a fase de polish transversal começar

### 5. Padrão obrigatório de estados transversais
Status atual: iniciado e parcialmente corrigido na rodada P5 com novas primitives e aplicação em Knowledge retrieval/logs; expansão transversal e revalidação browser ainda pendentes.

Impacto:
- hoje páginas variam demais em empty/error/degraded e feedback de bloqueio

Resultado desta rodada:
- criado `BlockedStateCard`
- `LoadingStateCard`, `EmptyStateCard` e `ErrorStateCard` evoluídos para contrato mais explícito
- `/knowledge/retrieval` e `/knowledge/logs` migrados para estados mais honestos de loading/empty/blocked/error

Ação remanescente:
- expandir o padrão para outras superfícies principais
- revalidar no browser para atualizar a classificação oficial da auditoria

## P1 — estrutural para operação consistente

### 6. Unificar AI Studio, Knowledge e Skills
Achados:
- AI Studio overview inconsistente
- Skills fragmentado de contexto
- Knowledge ainda parece hub conceitual à parte

Ação esperada:
- AI Studio como shell persistente
- tabs permanentes para agentes, knowledge, skills e futuras áreas
- aliases legados apenas como compatibilidade temporária

### 7. Homogeneizar Knowledge com foco operacional
Achados:
- retrieval/logs/sources existem, mas ainda sem costura operacional forte
- bloqueios por ausência de sources não explicam próximo passo com força suficiente
- detail routes dependem de dados inexistentes/ocultos

Ação esperada:
- reforçar next steps em empty states
- ligar sources -> documents -> retrieval -> logs de forma evidente
- criar inspector de source/document/chunks quando houver dados

### 8. Separar claramente catálogo, provider e runtime em Apps
Achados:
- `/apps/catalog`, `/apps/providers`, `/settings/providers` e `/settings/integrations` colapsam para destinos genéricos
- mental model mistura descoberta comercial, configuração técnica e runtime operacional

Ação esperada:
- separar IA/navegação por camadas:
  - catálogo/marketplace
  - provider specs/config
  - integrações instaladas/runtime
  - webhooks/ativação/observabilidade

### 9. Melhorar growth modules além do mock visual
Achados:
- automations edit é rico, mas claramente mock
- templates edit é rico, mas salvar/sugerir variante seguem desabilitados
- campaigns está mais frágil que os demais

Ação esperada:
- reduzir desabilitações silenciosas
- explicar limites do frontend-first
- criar fluxos mock explícitos de teste/salvamento/publicação quando backend real ainda não existir

### 10. Guided setup real em Settings
Achados:
- várias telas parecem hubs rasos ou formulários de mock
- falta visão clara de completude do workspace

Ação esperada:
- criar checklist/configuração do workspace
- tornar explícitos os próximos passos de setup
- remover CTAs ambíguos ou sem consequência visível

## P2 — robustez operacional

### 11. Observabilidade real de Knowledge
- ingest history
- retrieval history
- pipeline health
- chunk inspector
- vínculo claro entre sources e resultados

### 12. Drilldown real em módulos de suporte
- Logs com detalhe navegável
- Storage com detalhe/ações observáveis
- Products/Audience com aprofundamento operacional consistente

### 13. Automations e agentes com histórico/custo/triggers/runs
- necessário para produto parecer suíte operacional real e não apenas catálogo visual

## P3 — polimento obrigatório antes de encerrar a fase

### 14. Normalização de idioma PT-BR/EN
### 15. Acessibilidade e keyboard support
### 16. Responsividade tablet/desktop narrow
### 17. Limpeza de comentários, banners editoriais e resíduos de mock no código/UI

## Sequência recomendada de execução
1. P0.1 eliminar NO-OPs centrais
2. P0.2 corrigir Campaign edit broken
3. P0.3 corrigir rotas dinâmicas/hidratação de Apps
4. P0.4 normalizar Analytics
5. P0.5 padronizar estados transversais
6. P1.6 unificar AI Studio / Knowledge / Skills
7. P1.7 refatorar Knowledge para operação homogênea
8. P1.8 separar camadas de Apps/Providers/Runtime
9. P1.9 estabilizar Campaigns/Automations/Templates
10. P1.10 guided setup em Settings
11. P2/P3 em seguida com ciclo completo de QA

## Critério de saída desta auditoria
Só considerar QA MVP 100% pronto quando:
- nenhum CTA principal permanecer NO-OP sem intenção explícita
- rotas BROKEN forem eliminadas ou substituídas por estados formais
- rotas dinâmicas tiverem validação/hidratação confiável
- estados loading/empty/error/degraded/dirty estiverem padronizados nas superfícies principais
- backlog P0 estiver totalmente fechado
