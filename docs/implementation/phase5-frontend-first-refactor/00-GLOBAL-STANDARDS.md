# Padrões Globais da Refatoração

## 1. Contrato estrutural obrigatório para páginas principais

Toda página principal deve seguir, quando aplicável:
1. `AppTopbar` consistente
2. `AppBreadcrumbs`
3. tabs persistentes de suíte ou domínio
4. faixa de KPIs
5. barra de filtros, busca e ações
6. lista, grid ou tabela operacional
7. drilldown claro para detalhe/edição
8. estados de loading/empty/error/degraded
9. feedback pós-ação

## 2. AI Studio como shell persistente

### Regra
`AI Studio` deixa de ser apenas uma landing page e passa a ser uma shell de produto com tabs persistentes.

### Tabs mínimas
- Agentes
- Base de Conhecimento
- Skills
- Integrações
- Futuro: Avaliações, Guardrails, Custos, Logs

### Estratégia de rota
Preferência:
- `/ai-studio`
- `/ai-studio/agents`
- `/ai-studio/knowledge`
- `/ai-studio/skills`
- `/ai-studio/integrations`

Rotas legadas podem permanecer como redirect/alias temporário:
- `/knowledge` -> `/ai-studio/knowledge`
- `/skills` -> `/ai-studio/skills`

## 3. Contrato dos CTAs

Todo CTA deve estar em um de 3 estados:
- `real` — executa navegação, ação ou abertura de fluxo completo
- `mock` — executa ação visual explícita com feedback claro, sem fingir completude
- `disabled` — desabilitado com explicação de por que ainda não está disponível

Nunca deixar CTA sem consequência visível.

## 4. Idioma

Padronização principal em português.
Termos técnicos podem permanecer em inglês apenas se forem parte do domínio do produto, mas não pode haver mistura arbitrária entre:
- Billing / Cobrança
- System Logs / Logs do Sistema
- Agent detail / Detalhe do agente
- Knowledge Base / Base de conhecimento

## 5. Padrões de feedback

Obrigatório em fluxos críticos:
- loading explícito
- sucesso com toast ou confirmação inline
- erro com mensagem acionável
- dirty state em editores
- confirmação destrutiva
- empty state com próximo passo claro

## 6. Padrões de layout

### List-first
Para operação e catálogo:
- KPIs + filtros + tabela/grid + seleção + quick actions

### Detail/Inspect
Para inspeção:
- summary header + tabs de detalhe + timeline/logs + ações laterais

### Full-screen editor
Para create/edit complexos:
- layout focado
- seções estruturadas
- rail opcional
- footer sticky
- preview/contexto lateral quando necessário

## 7. Primitives transversais alvo

- `ModuleTabsBar`
- `PageFiltersBar`
- `KpiGrid`
- `EntityTable`
- `EntityRowCard`
- `RightInspectorPanel`
- `StickyActionBar`
- `ActivityTimeline`
- `HealthBadge`
- `StatusPill`
- `EmptyStateCard`
- `LoadingStateCard`
- `ErrorStateCard`
- `OperationalAlertBanner`
- `QuickActionMenu`

## 8. Regras de “cara de produto real”

Uma página só é considerada pronta quando:
- a ação primária é óbvia
- a navegação é previsível
- existe pelo menos um caminho completo de uso
- os CTAs não enganam o usuário
- os estados operacionais são legíveis
- a densidade é alta, mas controlada
- a página continua escalável para backend real
