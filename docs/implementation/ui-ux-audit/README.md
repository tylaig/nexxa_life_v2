# UI/UX Audit + Refactor Plan

Este diretório consolida o planejamento da auditoria e evolução de UI/UX por página do produto.

## Objetivo

Criar uma rotina replicável para:

- auditar páginas existentes
- priorizar melhorias de UI/UX
- orientar refatoração frontend
- identificar novas superfícies necessárias
- executar a evolução de forma incremental e segura

## Arquivos

- `00-RUNBOOK.md` → rotina padrão replicável para qualquer página
- `01-INBOX.md`
- `02-DASHBOARD.md`
- `03-CONTACTS.md`
- `04-CAMPAIGNS.md`
- `05-AUTOMATIONS.md`
- `06-TEMPLATES.md`
- `07-ANALYTICS.md`
- `08-INTEGRATIONS.md`
- `09-KNOWLEDGE.md`
- `10-SKILLS.md`
- `11-AI-STUDIO.md`
- `12-ORDERS.md`
- `13-SETTINGS.md`
- `14-LOGS.md`
- `15-STORAGE.md`
- `99-EXECUTION.md` → ordem de execução página por página, com gates de aprovação

## Regras de execução

1. Trabalhar uma página por vez.
2. Ler o plano da página.
3. Validar escopo com `OK`.
4. Executar quick wins.
5. Executar melhorias estruturais.
6. Validar critérios de aceite.
7. Só então seguir para a próxima página.

## Status atual

Rodada 1 concluída nas páginas planejadas:

- Inbox
- Dashboard
- Campaigns
- Integrations
- Skills
- Contacts
- Orders
- Knowledge
- Analytics
- AI Studio
- Templates
- Settings
- Logs
- Storage
- Automations

Próxima etapa recomendada:
- consolidar primitives transversais reais
- padronizar banners, inspectors, métricas e filtros
- reduzir duplicação entre páginas

## Primitives alvo do sistema

- `PageFiltersBar`
- `EntityTable`
- `EmptyState`
- `HealthBadge`
- `StatusPill`
- `KpiGrid`
- `StickyActionBar`
- `RightInspectorPanel`
- `SectionCard`
- `OperationalAlertBanner`

## Escopo inicial de prioridade

1. Inbox
2. Dashboard
3. Campaigns
4. Integrations
5. Skills
6. Contacts
7. Orders
8. Knowledge
9. Analytics
10. AI Studio
11. Templates
12. Settings
13. Logs
14. Storage
