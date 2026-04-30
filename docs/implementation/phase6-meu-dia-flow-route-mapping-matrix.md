# Phase 6 — Meu Dia Flow Route Mapping Matrix

## Convenção provisória
Até a decisão final de naming, esta matriz usa rotas curtas em inglês para a implementação principal, com possibilidade de aliases em PT-BR depois.

## Matriz operacional

| Legado | Página/Função | Papel no domínio | Rota-alvo provisória | Padrão visual alvo | Componente alvo sugerido | Prioridade | Status atual |
|---|---|---|---|---|---|---|---|
| `/` | Landing | Entrada pública / proposta de valor | `/` | marketing / focused public page | `components/marketing/meu-dia-landing-view.tsx` | P1 | MISSING |
| `/login` | Login | autenticação | `/login` | auth minimal | adaptar entrypoint atual | P0 | EXISTS_NEEDS_RETHEME |
| `/cadastro` | Cadastro | criação de conta | `/signup` (+ alias `/cadastro`) | auth minimal | `components/auth/signup-view.tsx` | P0 | MISSING |
| `/onboarding` | Onboarding | coleta inicial guiada | `/onboarding` | wizard / focused flow | `components/onboarding/onboarding-wizard-view.tsx` | P0 | MISSING |
| `/Diagnostico` | Diagnóstico | entrada do ciclo de avaliação | `/diagnostic` | wizard + results workspace | `components/meu-dia/meu-dia-diagnostic-view.tsx` | P0 | REAL_SHELL_PORT |
| `/Dashboard` | Dashboard | visão executiva do usuário | `/dashboard` | overview workspace | `components/meu-dia/meu-dia-dashboard-view.tsx` | P0 | REAL_SHELL_PORT |
| `/Checklist` | Checklist Diário | execução diária | `/checklist` | operational workspace | `components/meu-dia/meu-dia-checklist-view.tsx` | P0 | REAL_SHELL_PORT |
| `/Agenda` | Agenda | planejamento temporal | `/agenda` | calendar workspace | `components/meu-dia/meu-dia-agenda-view.tsx` | P0 | REAL_SHELL_PORT |
| `/ObjetivosMetas` | Objetivos e Metas | planejamento estratégico | `/goals` | list + detail + studio | `components/meu-dia/meu-dia-goals-view.tsx` | P0 | REAL_SHELL_PORT |
| `/Diario` | Diário | reflexão / registros | `/journal` | list + editor | `components/meu-dia/meu-dia-journal-view.tsx` | P1 | REAL_SHELL_PORT |
| `/Relatorio` | Relatórios | leitura histórica / síntese | `/reports` | catalog + detail | `components/meu-dia/meu-dia-reports-view.tsx` | P1 | REAL_SHELL_PORT |
| `/AdminDashboard` | Framework Admin | governança estrutural | `/framework-admin` | admin studio | `components/meu-dia/meu-dia-framework-admin-view.tsx` | P1 | REAL_SHELL_PORT |
| `/Academia` | Academia | educação / trilhas | `/academy` | library / learning workspace | `components/meu-dia/meu-dia-academy-view.tsx` | P2 | REAL_SHELL_PORT |
| `/Integracoes` | Integrações | ecossistema / conexões | `/integrations` ou fusão em `/apps` | catalog + detail + config | adaptar `components/apps/*` | P1 | PARTIAL_REUSE |
| `/News` | News | feed contextual | `/news` | feed / insights workspace | `components/meu-dia/meu-dia-news-view.tsx` | P1 | REAL_SHELL_PORT |
| `/Marketplace` | Marketplace | ofertas / addons | `/marketplace` | catalog workspace | `components/meu-dia/meu-dia-marketplace-view.tsx` | P2 | REAL_SHELL_PORT |
| `/Testes` | Comportamentais | QA/dev/internal | `/labs/behavioral-tests` | internal tool surface | `components/labs/behavioral-tests-view.tsx` | P3 | MISSING |

## Reaproveitamento direto do app atual

### Shell global
- `app/(app)/layout.tsx`
- `components/app-shell/app-sidebar.tsx`
- `components/app-shell/app-topbar.tsx`
- `components/app-shell/page-container.tsx`

### Padrões de telas que servem de referência
- Dashboard workspace: `components/home/home-overview-view.tsx` -> reaproveitar estrutura, não semântica
- Páginas operacionais list-first: `components/contacts/contacts-view.tsx`, `components/orders/orders-view.tsx`
- Studios/detail: `components/campaigns/*`, `components/automations/*`, `components/templates/*`
- Hub de inteligência: `components/ai-studio/*`

## Regras de decisão por superfície

### Substituir totalmente
- `/dashboard`

### Criar nova rota e novo domínio
- `/diagnostic`
- `/checklist`
- `/agenda`
- `/goals`
- `/journal`
- `/reports`
- `/framework-admin`
- `/academy`
- `/news`
- `/marketplace`

### Reaproveitar e rethematizar
- `/login`
- `/apps` -> provável base estrutural para integrações pessoais
- `/ai-studio` -> provável base para IA contextual do Meu Dia
- `/settings/*` -> configurações pessoais, privacidade e preferências

## Primeira sequência de implementação recomendada

1. Sidebar taxonomy rewrite
2. Entry points vazios honestos para `/diagnostic`, `/checklist`, `/agenda`, `/goals`, `/journal`, `/reports`
3. Substituição semântica do `/dashboard`
4. Port de `Checklist`
5. Port de `Agenda`
6. Port de `ObjetivosMetas`
7. Port de `Diagnostico`

## Observação
Esta matriz deve ser mantida sincronizada com o progresso da Fase 6 sempre que uma rota mudar de `MISSING` para `MOCK`, `BLOCKED` ou `REAL`.