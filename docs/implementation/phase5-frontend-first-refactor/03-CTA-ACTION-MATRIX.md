# Matriz de CTAs e Ações Auditadas

## Legenda
- `REAL` — navegação/ação observável
- `MOCK` — resposta parcial/visual sem fluxo completo
- `NO-OP` — clique sem efeito perceptível
- `BLOCKED` — desabilitado sem cumprir pré-condição
- `BROKEN` — rota/fluxo abre, mas degrada ou falha de forma operacional
- `FALTANTE` — rota/ação não fica acessível a partir da UI auditada

## Dashboard
- `Revisar integrações` — REAL
- `Ajustar campanhas` — REAL
- `Abrir campaigns` — NO-OP
- `Abrir orders` — NO-OP
- `Abrir automations` — NO-OP
- `Exportar` — NO-OP

## Inbox
- `Ordenar` — REAL
- `Filtros avançados` — REAL
- `Busca operacional avançada` — REAL
- `Nova view` — NO-OP
- várias quick actions de contexto — MOCK via toast
- seleção de conversa — REAL
- view `Minhas` — REAL
- view `Menções` — REAL com estado vazio válido
- status `Resolvidas` — REAL
- `Limpar filtros` — REAL
- `Visualizações salvas` — NO-OP
- filtro `W Game Box` — NO-OP
- filtro `Vendas` — NO-OP
- aba contextual `Histórico` — NO-OP
- `Fechar painel` — REAL
- `Abrir painel` — NO-OP
- digitação no composer sem envio — REAL e confirma `dirty state`

## Contacts
- clique na linha da tabela — REAL
- `Abrir conversa` no detalhe — NO-OP
- `Nova campanha` no detalhe — não validado, tratar como pendente
- `Filtros` — NO-OP

## AI Studio
- cards da overview — NO-OP
- cards em `/ai-studio/agents` — REAL
- `Novo agente` — REAL
- `Logs` no detalhe de agente — NO-OP aparente
- `Criar agente` — BLOCKED até dados mínimos
- `Executar avaliação` — BLOCKED até dados mínimos

## Skills
- `Nova Skill` — REAL para modal/sheet
- `Criar skill` — BLOCKED até dados mínimos
- contexto de rota dentro de AI Studio — INCONSISTENTE

## Knowledge
- `Expandir Conhecimento` — REAL
- `Nova Ingestão` — REAL
- `Abrir Catálogo` — REAL por rota existente, mas clique com feedback inconsistente
- `Simular Busca RAG` — REAL
- `Site Crawler` — REAL
- `Editor Manual` — REAL
- `Upload de Arquivos` — DISABLED/roadmap implícito
- `Integrações Nativas` — DISABLED/roadmap implícito
- `Iniciar` crawl — BLOCKED sem URL
- `Salvar e Indexar` — BLOCKED sem conteúdo mínimo
- `Executar retrieval` — BLOCKED sem source
- `Logs` em retrieval — REAL para `/knowledge/logs`
- `Console de retrieval` / `Executar retrieval` em logs — REAL para `/knowledge/retrieval`
- `Atualizar` em `/knowledge/retrieval` — NO-OP no estado vazio
- `Atualizar` e `Aplicar filtro` em `/knowledge/logs` — NO-OP no estado vazio
- tabs de `/knowledge/sources` — REAL
- busca em `/knowledge/sources` — REAL
- detalhe `/knowledge/documents/[documentId]` — FALTANTE por ausência total de documentos clicáveis
- detalhe `/knowledge/sources/[sourceId]` — FALTANTE por ausência total de sources clicáveis

## Campaigns / Automations / Templates
- detalhe `/campaigns/[campaignId]` — BLOCKED; lista vazia e rota direta cai em not found
- editar `/campaigns/[campaignId]/edit` — BROKEN; editor abre com fallback/defaults e banner `Failed to load campaign`
- detalhe de automação via modal — REAL
- `Editar fluxo` em automação — REAL
- `Logs` em detalhe de automação — NO-OP
- editar `/automations/[automationId]/edit` — MOCK com builder rico, porém persistência e ações principais desabilitadas
- modal de template — REAL
- `Editar` em modal de template — NO-OP apesar de href válido no DOM
- editar `/templates/[templateId]/edit` — MOCK com formulário populado, mas salvar e geração desabilitados

## Apps / Integrations
- `Adicionar App` / `Nova integração` / `Ativar` — REAL para `/apps/new`, porém ainda como alias genérico
- `Ver provider` / `Detalhe técnico` — REAL para `/apps/providers`, porém repetindo destino genérico
- `Configurar` provider — REAL parcial (inline)
- `Testar conexão` — BLOCKED ou sem evidência de execução real
- detalhe `/apps/[integrationId]` — MOCK/DEGRADED; status unknown, observabilidade vazia e sem hidratação confiável
- editar `/apps/[integrationId]/edit` — BROKEN; slug inválido também carrega a mesma tela mock de Shopify
- mapping `/apps/[integrationId]/mapping` — MOCK/DEGRADED; entidade permanece `Carregando`
- `Abrir console mock` no mapping — REAL

## Settings
- `Salvar configurações do workspace` — NO-OP aparente
- `Convidar usuário` — NO-OP aparente
- `Conectar` canal — NO-OP aparente
- `Salvar política atual` — pendente, tratar como mock até validar
- `/settings/integrations` — hub raso que redireciona para superfícies genéricas de `/apps`
- `/settings/providers` — catálogo administrativo funcional, mas CTAs colapsam para destinos genéricos (`/apps/providers`, `/apps/webhooks`, `/apps/new`)

## Regras de correção

1. Todo `NO-OP` precisa virar `REAL`, `MOCK` explícito ou `BLOCKED` com motivo.
2. Todo `MOCK` precisa ter texto claro de limitação, impacto e próximo passo.
3. `BLOCKED` precisa explicar a pré-condição para habilitar a ação.
