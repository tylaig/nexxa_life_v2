# Automations

## Arquivos analisados
- `app/(app)/automations/page.tsx`
- `components/automations/automations-list-view.tsx`

## Objetivo operacional
- Operar catálogo de automações e acompanhar impacto/saúde.
- Usuário: operações, CRM, growth e time técnico funcional.
- Ação primária: localizar automações, entender saúde e abrir builder/detalhe.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A tela comunica melhor catálogo operacional do que várias outras páginas, mas ainda subexplora health, falhas recentes, impacto no negócio e criticidade. A leitura atual funciona para navegação, porém não orienta priorização real.

## Problemas encontrados
- Status pouco expressivos além do ponto colorido.
- Falta health operacional visível.
- Ausência de falhas recentes e última execução destacadas.
- Busca/filtros ainda simples.
- Top KPIs pouco conectados à ação.
- Lista não separa fluxos estratégicos de utilitários.

## Melhorias recomendadas
### Quick wins
- Destacar ativo, pausado, draft e degradado com pills melhores.
- Mostrar última execução e falhas recentes.
- Sinalizar impacto/revenue/criticidade por fluxo.

### Estruturais
- Criar health badge padronizado.
- Filtros por trigger, owner, categoria e risco.
- Separar automações estratégicas das utilitárias.
- Criar inspector com histórico e próxima ação.

### Novas superfícies
- `/automations/health`
- `/automations/[id]/runs`
- `/automations/templates`

## Refatoração sugerida
- Extrair `AutomationHealthBadge`, `AutomationImpactCell`, `AutomationFiltersBar`.
- Separar regras de categorização/criticidade em helper.
- Aproximar da primitive `EntityTable`.

## Plano de implementação
1. Reforçar status e health.
2. Incluir sinais de impacto e falha.
3. Evoluir filtros e agrupamentos.
4. Criar inspector contextual.
5. Preparar conexão com builder/runs.

## Critérios de aceite
- É fácil identificar automações degradadas e estratégicas.
- A lista comunica impacto além do nome do fluxo.
- A página ajuda a decidir o que revisar primeiro.
