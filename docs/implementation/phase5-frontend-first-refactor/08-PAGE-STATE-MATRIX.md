# Matriz de Estados por Página Auditada

## Legenda
- `VALIDADO` — estado observado diretamente no browser
- `NÃO OBSERVADO` — não apareceu na navegação real desta rodada
- `BLOQUEADO POR DADO` — o estado não pôde ser exercitado por ausência de registros/fontes
- `DEGRADADO` — a tela abriu, mas com hidratação incompleta, fallback inadequado ou comportamento operacional fraco

## Dashboard
- loading: NÃO OBSERVADO
- empty: VALIDADO parcialmente na aba Produto
- error: NÃO OBSERVADO
- degraded: VALIDADO parcialmente por links internos NO-OP e título inconsistente
- success: VALIDADO
- dirty state: N/A

## Inbox
- loading: NÃO OBSERVADO
- empty: VALIDADO (`Menções`, busca com filtro ativo)
- error: NÃO OBSERVADO
- degraded: VALIDADO por múltiplos CTAs NO-OP (`Nova view`, `Visualizações salvas`, `Histórico`, `Abrir painel`, `W Game Box`, `Vendas`)
- success: VALIDADO
- dirty state: VALIDADO (composer habilita envio após digitação sem enviar)

## Contacts
- loading: NÃO OBSERVADO
- empty: NÃO OBSERVADO
- error: NÃO OBSERVADO
- degraded: VALIDADO parcialmente (`Abrir conversa` NO-OP, `Filtros` NO-OP)
- success: VALIDADO
- dirty state: N/A

## Analytics
- loading: NÃO OBSERVADO
- empty: N/A
- error: NÃO OBSERVADO
- degraded: VALIDADO porque `/analytics` redireciona para `/dashboard`
- success: NÃO OBSERVADO como módulo dedicado
- dirty state: N/A

## AI Studio
- loading: NÃO OBSERVADO
- empty: VALIDADO em partes do overview/skills
- error: NÃO OBSERVADO
- degraded: VALIDADO por overview com cards inconsistentes e fragmentação com Skills/Knowledge
- success: VALIDADO parcialmente em agentes/new/detail
- dirty state: VALIDADO parcialmente em formulários bloqueados por campos mínimos

## Skills
- loading: NÃO OBSERVADO
- empty: VALIDADO parcialmente
- error: NÃO OBSERVADO
- degraded: VALIDADO por contexto inconsistente dentro de AI Studio
- success: VALIDADO parcialmente para abertura de modal/sheet
- dirty state: VALIDADO parcialmente em fluxo de criação bloqueado

## Knowledge overview/new/manual/import
- loading: NÃO OBSERVADO
- empty: VALIDADO
- error: NÃO OBSERVADO
- degraded: VALIDADO por bloqueios sem next step forte e feedback inconsistente
- success: VALIDADO para navegação entre superfícies
- dirty state: VALIDADO parcialmente em fluxos de entrada que exigem conteúdo mínimo/URL

## Knowledge retrieval
- loading: NÃO OBSERVADO
- empty: VALIDADO
- error: NÃO OBSERVADO
- degraded: VALIDADO (`Atualizar` NO-OP, console útil mas sem dados)
- success: VALIDADO apenas para abertura da superfície
- dirty state: N/A

## Knowledge logs
- loading: NÃO OBSERVADO
- empty: VALIDADO
- error: NÃO OBSERVADO
- degraded: VALIDADO (`Atualizar` e `Aplicar filtro` NO-OP em estado vazio)
- success: VALIDADO apenas para navegação entre logs/retrieval
- dirty state: N/A

## Knowledge sources
- loading: NÃO OBSERVADO
- empty: VALIDADO
- error: NÃO OBSERVADO
- degraded: VALIDADO por ausência completa de sources/documents clicáveis
- success: VALIDADO para tabs, busca e navegação para `Nova source`
- dirty state: N/A

## Knowledge dynamic detail routes
- `/knowledge/documents/[documentId]`: BLOQUEADO POR DADO
- `/knowledge/sources/[sourceId]`: BLOQUEADO POR DADO

## Campaigns
- loading: VALIDADO como inconsistente em rodadas anteriores
- empty: VALIDADO
- error: NÃO OBSERVADO como banner técnico
- degraded: VALIDADO por ausência de dados reais e navegação profunda bloqueada
- success: VALIDADO parcialmente para list/new
- dirty state: VALIDADO parcialmente no editor quebrado com campos/defaults

## Campaign detail/edit
- `/campaigns/[campaignId]`: empty/not-found VALIDADO; success BLOQUEADO POR DADO
- `/campaigns/[campaignId]/edit`: DEGRADADO/BROKEN VALIDADO (`Failed to load campaign`, defaults indevidos, ações desabilitadas)

## Automations
- loading: NÃO OBSERVADO
- empty: NÃO OBSERVADO
- error: NÃO OBSERVADO
- degraded: VALIDADO parcialmente por `Logs` NO-OP
- success: VALIDADO
- dirty state: VALIDADO parcialmente no editor mock

## Automations edit
- `/automations/[automationId]/edit`: success visual VALIDADO; degraded/mock VALIDADO; persistência real NÃO OBSERVADA

## Templates
- loading: NÃO OBSERVADO
- empty: NÃO OBSERVADO
- error: NÃO OBSERVADO
- degraded: VALIDADO por CTA `Editar` NO-OP no modal
- success: VALIDADO para listagem e modal
- dirty state: VALIDADO parcialmente no editor mock

## Templates edit
- `/templates/[templateId]/edit`: success visual VALIDADO; degraded/mock VALIDADO; salvar e sugerir variante permanecem desabilitados

## Apps
- loading: NÃO OBSERVADO
- empty: VALIDADO (`/apps` sem apps instalados)
- error: NÃO OBSERVADO
- degraded: VALIDADO por aliases genéricos e profundidade operacional incompleta
- success: VALIDADO para navegação entre catálogo/providers/new
- dirty state: VALIDADO parcialmente em `new/edit`

## Apps new
- `/apps/new`: success visual VALIDADO; mock/persistência futura VALIDADO

## Apps detail/edit/mapping
- `/apps/[integrationId]`: DEGRADADO VALIDADO (status unknown, observabilidade vazia)
- `/apps/[integrationId]/edit`: DEGRADADO/BROKEN VALIDADO (slug inválido resolve mesma tela)
- `/apps/[integrationId]/mapping`: DEGRADADO VALIDADO (`Carregando` persistente)

## Settings
- loading: NÃO OBSERVADO
- empty: NÃO OBSERVADO
- error: NÃO OBSERVADO
- degraded: VALIDADO por saves/CTAs ambíguos e hubs rasos
- success: VALIDADO parcialmente para navegação geral
- dirty state: NÃO OBSERVADO com confirmação suficiente

## Settings integrations/providers
- `/settings/integrations`: success de navegação VALIDADO; profundidade funcional DEGRADADA por colapso para `/apps`
- `/settings/providers`: success de navegação VALIDADO; drilldown específico NÃO OBSERVADO

## Orders / Audience / Products / Storage / Logs
- success: VALIDADO em auditoria ampla anterior
- profundidade de detalhe: ainda parcial
- estado loading/error/dirtiness: NÃO OBSERVADO com evidência suficiente nesta rodada
