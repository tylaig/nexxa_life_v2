# Prompt Geral de Continuidade — Estado Atual + Histórico + Próximos Desenvolvimentos

Use este prompt como contexto-base para qualquer próxima sessão de implementação no repositório `chat.meusuper.app`.

---

## Contexto do projeto

Estamos evoluindo o produto `chat.meusuper.app` como uma plataforma omnichannel de atendimento, automação, campanhas, IA e conhecimento para e-commerce, mantendo a hierarquia visual e estrutural já existente no app.

O objetivo não é apenas adicionar features isoladas, mas transformar o sistema em uma suíte operacional coesa, com:
- Inbox omnichannel
- CRM/Contacts
- Orders
- Campaigns outbound
- Automations
- Templates HSM
- Knowledge/RAG
- AI Studio (agentes, skills, evals, guardrails)
- Integrations
- Analytics
- Settings

Toda evolução deve preservar:
- layout shell atual com sidebar + topbar + conteúdo principal
- UI/UX limpa, responsiva e consistente
- separação clara entre operação, inspeção e edição
- documentação incremental em `docs/implementation`

---

## Instruções operacionais importantes

1. Trabalhe incrementalmente.
2. Atualize documentação de plano/progresso/gap analysis a cada marco importante.
3. Sempre que concluir uma etapa, reflita isso imediatamente na documentação viva da fase correspondente.
4. Preserve fallbacks quando houver integrações opcionais.
5. Priorize arquitetura reutilizável e separação de responsabilidades.
6. Não misture telas de listagem principal com formulários complexos de criação/edição quando o domínio já exigir escala operacional.
7. Seguir sempre o padrão do produto já validado nas melhores telas atuais: `Inbox`, `Analytics`, `Contacts` e `Orders`.

---

## Resumo histórico do que já foi implementado

### Foundation backend / dados / persistência
Já foi implementado nas fases anteriores:

#### Supabase + vector store
Arquivos já criados/alterados:
- `lib/server/env.ts`
- `lib/server/supabase.ts`
- `docker-compose.yml`
- `.env.example`
- `.gitignore`
- `db/migrations/003_supabase_vector_store.sql`
- `supabase/schema.sql`
- `modules/knowledge/repository.ts`
- `lib/server/embeddings.ts`
- `modules/knowledge/store.ts`
- `README.md`

Capacidades já operacionais:
- configuração server-only de Supabase
- suporte a `SUPABASE_URL`
- suporte a `SUPABASE_SERVICE_ROLE_KEY`
- suporte a `SUPABASE_SCHEMA`
- suporte a `RAG_USE_PGVECTOR`
- suporte a `RAG_MATCH_THRESHOLD`
- suporte a embeddings via gateway com:
  - `AI_GATEWAY_BASE_URL`
  - `AI_GATEWAY_API_KEY`
  - `AI_GATEWAY_EMBEDDING_MODEL`
- fallback determinístico quando embeddings reais não estiverem configurados
- pgvector local via Docker
- migration com extensão `vector`
- tabela `knowledge_chunk_embeddings`
- índice HNSW
- RPC `match_knowledge_chunks(...)`
- retrieval opcional via Supabase/vector com fallback local
- persistência de retrieval logs
- ranking por chunk com remontagem por documento

#### Knowledge/RAG
Já operacional:
- sources
- documents
- chunks
- embeddings
- retrieval logs
- retrieval vetorial com fallback
- agrupamento por documento no retorno

#### Validações já executadas anteriormente
- `npm test` passando
- `npm run build` OK
- migrations aplicadas localmente
- pgvector validado localmente

---

## Estado atual da interface e experiência do produto

### Módulos que hoje servem como melhor referência estrutural

#### Inbox
Ponto forte atual:
- experiência operacional dedicada
- separação clara entre filtros, lista de conversas, thread e contexto
- bom uso do espaço em tela
- comportamento de produto real

#### Analytics
Ponto forte atual:
- tela de leitura e decisão bem separada de fluxos de criação
- boa hierarquia visual
- uso consistente de tabs, KPIs e painéis analíticos

#### Contacts
Ponto forte atual:
- modelo list-first
- busca
- filtros por segmento
- tabela clara
- boa base para evolução futura em detail pages

#### Orders
Ponto forte atual:
- modelo list-first
- filtros por status
- tabela operacional
- boa clareza visual para operação

Essas telas devem servir como baseline para o restante do produto.

---

## Diagnóstico atual dos módulos que ainda precisam de refatoração e expansão

### 1. Campaigns
Estado atual:
- a tela ainda mistura criação e listagem na mesma página
- o formulário está reduzido a um card lateral/compacto
- ainda não existe uma operação de catálogo madura
- ainda faltam filtros, tabela mais robusta, detalhe e editor dedicado

O que ainda precisa ser desenvolvido:
- tela `/campaigns` como listagem operacional real
- tela `/campaigns/[campaignId]` para detalhe/inspeção
- tela `/campaigns/new` para criação full screen
- tela `/campaigns/[campaignId]/edit` para edição full screen
- filtros por status, objetivo, canal, audiência, owner, agendamento
- tabela/listagem rica com métricas resumidas
- ligação clara com templates, canais e segmentos
- preview e revisão antes de publicar
- melhor responsividade

### 2. Automations
Estado atual:
- a tela atual mistura catálogo com builder/canvas
- há valor visual, mas falta separar operar fluxos de editar fluxos
- ainda não há uma tela de catálogo com visão operacional forte

O que ainda precisa ser desenvolvido:
- `/automations` como catálogo/listagem operacional
- `/automations/[automationId]` como detalhe do fluxo
- `/automations/new` como builder full screen
- `/automations/[automationId]/edit` como builder full screen
- painel de logs/runs/falhas
- health operacional dos fluxos
- visão de dependências com templates, skills, campanhas e integrações
- melhoria de navegação entre operar e editar

### 3. Templates
Estado atual:
- já existe uma boa separação entre lista e preview
- mas ainda falta separação real entre catálogo e criação/edição
- ainda faltam governança e lifecycle mais completos

O que ainda precisa ser desenvolvido:
- `/templates` como catálogo
- `/templates/[templateId]` como detalhe/preview/metadados
- `/templates/new` como editor full screen
- `/templates/[templateId]/edit` como edição full screen
- versionamento e histórico
- governança de publicação/revisão
- filtros mais avançados
- mais metadados por canal/status/idioma/qualidade

### 4. Knowledge
Estado atual:
- a implementação técnica avançou bastante
- porém a tela ainda mistura source creation, document creation, chunks e retrieval console em uma única view
- a UX está funcional, mas concentrada demais para um domínio que já ficou mais robusto

O que ainda precisa ser desenvolvido:
- `/knowledge` como catálogo principal
- detalhe de source
- detalhe de documento
- retrieval console separado
- tela/listagem de retrieval logs
- observabilidade de embeddings e ingest
- pipeline de ingest automático por URL/PDF
- health/status operacional dos embeddings
- fila assíncrona para documentos grandes (considerar)

### 5. AI Skills / AI Studio
Estado atual:
- existe uma tela de Skills separada
- existe uma tela de AI Studio com roster/detalhe híbrido de agentes
- conceitualmente, Skills e Agents ainda estão fragmentados

Direção desejada:
- `AI Skills` deve ser absorvido por `AI Studio`
- `AI Studio` deve virar o hub completo de inteligência

O que ainda precisa ser desenvolvido:
- `/ai-studio` como hub
- `/ai-studio/agents` como lista exclusiva de agentes
- `/ai-studio/agents/[agentId]` como detalhe do agente
- `/ai-studio/agents/new` como criação full screen
- `/ai-studio/skills` como catálogo de skills/prompts
- `/ai-studio/skills/[skillId]` como detalhe
- `/ai-studio/skills/new` como criação full screen
- `/ai-studio/evals` como área de testes/avaliações
- melhor navegação interna entre agentes, skills, guardrails, conhecimento e evals
- governança para edição e lifecycle de agentes e skills

### 6. Integrations
Estado atual:
- ainda mistura criação e listagem na mesma tela
- já possui health bootstrap, mas UX ainda é inicial

O que ainda precisa ser desenvolvido:
- `/integrations` como catálogo/lista
- `/integrations/[integrationId]` como detalhe
- `/integrations/new` como criação full screen
- `/integrations/[integrationId]/edit` como edição/rotação de credenciais
- observabilidade por integração
- logs/histórico operacional
- health e status mais ricos
- melhor separação entre operação e configuração

### 7. Settings
Estado atual:
- ainda está simples demais em relação ao restante do produto
- não acompanha o mesmo nível estrutural dos principais módulos

O que ainda precisa ser desenvolvido:
- reorganização por categorias
- seções claras para:
  - Geral
  - Workspace
  - Usuários e permissões
  - Canais
  - Integrações
  - Segurança
  - Billing
- melhor consistência visual com o restante do sistema

### 8. Contacts
Estado atual:
- já está relativamente bom como list-first

O que ainda precisa ser desenvolvido:
- detail page ou drawer de inspeção
- ações rápidas e bulk actions mais claras
- filtros avançados
- harmonização com o padrão final transversal

### 9. Orders
Estado atual:
- já está relativamente bom como list-first

O que ainda precisa ser desenvolvido:
- detail page ou drawer de inspeção
- timeline do pedido
- relação melhor com tickets, risco, fulfillment e automações
- harmonização com o padrão final transversal

### 10. Inbox
Estado atual:
- é uma das referências mais fortes do produto

O que ainda precisa ser desenvolvido:
- apenas refinamentos incrementais e harmonização fina, não refatoração estrutural prioritária

### 11. Analytics
Estado atual:
- também é uma das melhores referências do produto

O que ainda precisa ser desenvolvido:
- refinamentos incrementais, consistência transversal e possíveis melhorias de drill-down

---

## Problema estrutural central identificado

Os módulos mais importantes ainda sofrem com mistura indevida entre:
- visão operacional/listagem
- inspeção/detalhe
- criação/edição

Essa mistura gera:
- carga cognitiva alta
- pouco espaço para escalabilidade funcional
- navegação inconsistente
- forms complexos comprimidos em áreas pequenas
- baixa previsibilidade em telas menores

---

## Arquitetura de UX desejada para todos os módulos complexos

Cada módulo deve convergir para 3 níveis:

### 1. Overview/List
Deve conter:
- header do módulo
- KPIs
- busca
- filtros rápidos
- filtros avançados
- tabela/lista/cards
- ações em massa quando necessário
- CTA primário de criação

### 2. Detail/Inspect
Deve conter:
- resumo executivo
- status e metadados
- timeline/logs/execuções
- relacionamentos relevantes
- ações seguras como pausar, duplicar, arquivar, testar

### 3. Create/Edit Full Screen
Deve conter:
- formulário completo por seções
- rail lateral ou steps quando necessário
- preview/contexto lateral quando fizer sentido
- validação progressiva
- footer sticky com ações principais

---

## Estado atual da documentação de planejamento

Já existem documentos de continuidade e planejamento em:
- `docs/implementation/phase43-embeddings-retrieval-plan.md`
- `docs/implementation/phase43-progress.md`
- `docs/implementation/phase43-gap-analysis.md`
- `docs/implementation/phase5-ui-ux-refactor-master-plan.md`
- `docs/implementation/phase5-ui-ux-refactor-progress.md`
- `docs/implementation/phase5-ui-ux-refactor-gap-analysis.md`

Esses documentos devem ser usados como referência viva antes de iniciar novas alterações.

---

## Ordem recomendada de desenvolvimento daqui para frente

### Etapa 1 — Foundation de information architecture / rotas
Desenvolver primeiro a base estrutural:
- mapa final de rotas por módulo
- convenções de nomenclatura
- list/detail/new/edit para módulos prioritários
- alinhamento da sidebar e breadcrumbs
- incorporação conceitual de Skills dentro de AI Studio

### Etapa 2 — Campaigns
Motivo:
- é o caso mais explícito da dor descrita
- precisa urgentemente de catálogo, filtros, clique para detalhe e editor full screen

### Etapa 3 — Templates
Motivo:
- tem boa base visual, mas precisa profissionalizar o ciclo de catálogo → detalhe → edição

### Etapa 4 — AI Studio + Skills
Motivo:
- precisa consolidar a visão de inteligência do produto
- evitar fragmentação entre módulos próximos

### Etapa 5 — Automations
Motivo:
- builder deve ser separado da operação diária
- precisa catálogo, detalhe e editor dedicados

### Etapa 6 — Knowledge
Motivo:
- backend já amadureceu e a UX precisa acompanhar
- é estratégico para AI Studio, Skills e automações inteligentes

### Etapa 7 — Integrations
Motivo:
- precisa separar operar conexões de configurá-las

### Etapa 8 — Settings
Motivo:
- precisa se alinhar estruturalmente ao restante do produto

### Etapa 9 — Harmonização transversal
- Contacts
- Orders
- estados vazios
- loading
- erro
- responsividade
- acessibilidade
- consistência visual global

---

## Requisitos de layout e responsividade

### Desktop
- explorar 2 ou 3 colunas apenas quando isso melhorar operação
- forms complexos podem usar layout de estúdio com conteúdo + rail + preview

### Tablet
- reduzir colunas com elegância
- painéis laterais podem virar drawers/sheets

### Mobile
- priorizar fluxo em telas separadas
- evitar listagem + form complexo na mesma viewport
- manter CTAs principais acessíveis

---

## Requisitos visuais e de consistência

Preservar:
- `PageContainer`
- `PageHeader`
- `StatCard`
- shell geral atual
- sistema de cores/tokens atual

Evoluir:
- toolbar padrão de listagem
- padrão de filtros rápidos/avançados
- detail header consistente
- editor full screen consistente
- sticky footer de ações
- empty/loading/error states padronizados

---

## O que ainda falta no backend/funcionalidade, além da refatoração de UI

### Knowledge / RAG
Ainda considerar:
- ingest automático por URL/PDF
- listagem de retrieval logs na UI
- status/health operacional de embeddings
- fila assíncrona para embeddings pesados
- validação fim a fim com gateway real + Supabase real

### Skills / AI Studio
Ainda considerar:
- edição de skill existente
- publicação de nova versão
- histórico/versionamento
- bindings por tenant/workspace/canal
- testes estruturados com schemas preenchíveis
- observabilidade de performance por agente/skill

### Campaigns
Ainda considerar:
- edição completa
- lifecycle rico
- scheduling
- audience binding real
- execução/manual trigger
- métricas por campanha/run/recipient

### Integrations
Ainda considerar:
- secret handling por provider
- validação real por provider
- rotação/update de credenciais
- sync logs e histórico operacional

---

## Critérios de sucesso para a próxima grande fase

A próxima fase será bem sucedida se:
- os módulos prioritários deixarem de misturar catálogo com forms complexos
- houver rotas claras para list/detail/new/edit
- a navegação ficar previsível e consistente
- a UI continuar clean, responsiva e alinhada ao shell atual
- AI Studio passar a concentrar corretamente agentes e skills
- Knowledge avançar para uma UX compatível com o backend já implementado

---

## Prompt de execução recomendado para a próxima sessão

"Continue a evolução do projeto `chat.meusuper.app` a partir do estado atual já implementado. Antes de codar, leia os documentos de `docs/implementation`, especialmente os de Fase 4.3 e Fase 5. Preserve o shell atual do app, a responsividade e a linguagem visual limpa. Priorize a separação entre listagem operacional, detalhe/inspeção e criação/edição full screen. Comece pela camada estrutural de information architecture e rotas, depois implemente incrementalmente os módulos prioritários, começando por Campaigns. Atualize a documentação viva de plano, progresso e gap analysis a cada marco importante, e mantenha compatibilidade com o backend já existente, principalmente em Knowledge/RAG, embeddings, retrieval logs e integrações server-only."