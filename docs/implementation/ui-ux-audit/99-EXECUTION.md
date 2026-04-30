# Plano de execução UI/UX por página

## Objetivo

Executar a evolução das páginas uma por uma, com checkpoints explícitos e confirmação simples via `OK`.

---

## Regra principal

Trabalhar **uma página por vez**.

Para cada página:

1. Ler o arquivo de planejamento correspondente.
2. Confirmar início com `OK`.
3. Executar quick wins.
4. Validar resultado.
5. Confirmar continuação com `OK`.
6. Executar melhorias estruturais.
7. Validar critérios de aceite.
8. Confirmar continuação com `OK`.
9. Seguir para a próxima página.

---

## Ordem de execução

### Bloco 1 — Prioridade alta
1. `01-INBOX.md`
2. `02-DASHBOARD.md`
3. `04-CAMPAIGNS.md`
4. `08-INTEGRATIONS.md`
5. `10-SKILLS.md`

### Bloco 2 — Prioridade média
6. `03-CONTACTS.md`
7. `12-ORDERS.md`
8. `09-KNOWLEDGE.md`
9. `07-ANALYTICS.md`
10. `11-AI-STUDIO.md`

### Bloco 3 — Prioridade menor
11. `06-TEMPLATES.md`
12. `13-SETTINGS.md`
13. `14-LOGS.md`
14. `15-STORAGE.md`
15. `05-AUTOMATIONS.md`

---

## Script operacional humano

### Etapa 1 — Abrir planejamento
- Ler o arquivo da página.
- Revisar problemas, melhorias e plano.

### Etapa 2 — Quick wins
Implementar apenas:
- idioma e nomenclatura
- hierarquia e contraste
- ajustes de escaneabilidade
- estados vazios/loading/error simples
- pequenos reforços de CTA e status

### Etapa 3 — Gate
Pergunta padrão:

`Quick wins concluídos. OK para seguir para melhorias estruturais?`

### Etapa 4 — Melhorias estruturais
Implementar:
- novos componentes
- novos painéis/drawers
- novas abstrações
- reorganização de layout
- refinamento de fluxos
- criação de novas páginas complementares, se aprovadas

### Etapa 5 — Gate
Pergunta padrão:

`Melhorias estruturais concluídas. OK para validar critérios de aceite e seguir para a próxima página?`

---

## Checkpoints transversais por página

Cada execução deve verificar:

- [ ] idioma consistente
- [ ] ação primária óbvia
- [ ] itens críticos destacados
- [ ] loading/empty/error/degraded revisados
- [ ] responsividade básica revisada
- [ ] acessibilidade básica revisada
- [ ] duplicações reduzidas
- [ ] componentes extraídos quando necessário
- [ ] comportamento menos mockado

---

## Primitives a consolidar ao longo da execução

À medida que as páginas forem sendo trabalhadas, consolidar:

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

---

## Regra para novas páginas

Criar novas páginas apenas quando uma superfície complementar resolver uma necessidade real de operação, como:

- detalhe aprofundado
- fila dedicada
- revisão/inspeção avançada
- setup guiado
- explorer operacional

Toda nova página deve ser registrada no plano da página original.

---

## Status consolidado da rodada 1

### Páginas concluídas
- [x] Inbox
- [x] Dashboard
- [x] Campaigns
- [x] Integrations
- [x] Skills
- [x] Contacts
- [x] Orders
- [x] Knowledge
- [x] Analytics
- [x] AI Studio
- [x] Templates
- [x] Settings
- [x] Logs
- [x] Storage
- [x] Automations

### Resultado da rodada
- [x] Quick wins executados em todas as páginas do plano
- [x] Melhorias estruturais executadas em todas as páginas do plano
- [x] `next build` validado ao longo da execução e no fechamento das etapas
- [x] Navegação, inspeção lateral e leitura operacional elevadas nas superfícies prioritárias

### Padrões recorrentes aplicados
- banners operacionais acima da dobra
- seleção de entidade com resumo lateral
- filtros/busca com ação de limpar contexto
- métricas resumidas com próxima ação sugerida
- melhor distinção entre catálogo, operação e governança

### Pendências transversais para rodada 2
- consolidar primitives compartilhadas reais:
  - `OperationalAlertBanner`
  - `RightInspectorPanel`
  - `EntitySummaryMetric`
  - `PageFiltersBar`
  - `EntityTable`
- reduzir duplicação visual entre banners, cards de resumo e ações sugeridas
- padronizar estados de empty/error/degraded com componentes reutilizáveis
- revisar acessibilidade e keyboard flow das superfícies interativas novas
- avaliar extração de view-models/helpers nas páginas ainda com regras inline

### Próxima fase recomendada
1. consolidar os padrões transversais em componentes reutilizáveis
2. revisar consistência fina entre páginas já evoluídas
3. atacar pendências técnicas legadas fora do escopo visual quando fizer sentido
4. iniciar uma rodada 2 de refinamento e design system operacional
