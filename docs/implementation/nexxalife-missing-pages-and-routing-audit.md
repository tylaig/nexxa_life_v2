# NexxaLife — auditoria de páginas ausentes e rotas de integrações

## Decisões desta rodada

### Branding oficial visível
Para títulos e nomes exibidos na plataforma, o padrão oficial passa a ser:
- `NexxaLife`

Regra prática:
- UI visível, metadata, headings, sidebars e topbars: `NexxaLife`
- identificadores técnicos e nomes de arquivos podem continuar provisoriamente com `meu-dia` ou `nexxa_life` para evitar churn estrutural desnecessário nesta fase

### Integrações
A superfície funcional existente hoje não é `/integrations` como rota primária de implementação.
A base real publicada está em:
- `/apps`
- `/apps/catalog`
- `/apps/providers`
- `/apps/new`
- `/apps/[integrationId]`
- `/apps/[integrationId]/edit`
- `/apps/[integrationId]/mapping`
- `/settings/webhooks`
- `/settings/integrations`

Por compatibilidade com docs legados e links antigos, foram criados aliases:
- `/integrations` -> `/apps`
- `/integrations/catalog` -> `/apps/catalog`
- `/integrations/providers` -> `/apps/providers`
- `/integrations/new` -> `/apps/new`
- `/integrations/[integrationId]` -> `/apps/[integrationId]`
- `/integrations/[integrationId]/edit` -> `/apps/[integrationId]/edit`
- `/integrations/[integrationId]/mapping` -> `/apps/[integrationId]/mapping`
- `/integrations/webhooks` -> `/settings/webhooks`

## Páginas legadas analisadas vs status atual

### Existem no legado e já possuem rota atual
- Login -> `/login`
- Cadastro -> `/signup` (+ `/cadastro`)
- Onboarding -> `/onboarding`
- Diagnóstico -> `/diagnostic` (+ `/diagnostico`)
- Checklist -> `/checklist`
- Agenda -> `/agenda`
- Objetivos e Metas -> `/goals`
- Diário -> `/journal` (+ `/diario`)
- Relatórios -> `/reports` (+ `/relatorio`)
- Dashboard -> `/dashboard`
- Academia -> `/academy`
- Integrações -> base atual em `/apps` + aliases `/integrations/*`
- Framework Admin -> `/framework-admin`
- News -> `/news`
- Marketplace -> `/marketplace`

### Existem no legado e ainda não possuem port dedicado equivalente
- Landing pública legada -> `/` agora possui uma landing pública inicial própria
  - status: `REAL` em versão inicial
  - observação: ainda precisa aprofundar prova social, narrativa comercial e eventual CTA institucional mais completo
- Testes (`/Testes`) -> não existe port dedicado
  - status: `MISSING`
  - alvo sugerido: `/labs/behavioral-tests`

## Páginas/áreas atuais fora do legado NexxaLife que exigem análise de coexistência
Estas rotas existem na base atual mas não pertencem diretamente ao núcleo legado NexxaLife:
- `/analytics`
- `/ai-studio/*`
- `/knowledge/*`
- `/settings/*`
- `/contacts`
- `/inbox`
- `/campaigns/*`
- `/automations/*`
- `/templates/*`
- `/orders`
- `/products`
- `/storage`
- `/logs`
- `/audience`
- `/skills`

## Classificação inicial dessas áreas

### Coexistência provável
- `/apps*`
- `/settings/integrations`
- `/settings/webhooks`
- `/ai-studio/*`
- `/knowledge/*`
- `/logs`
- `/storage`
- `/skills`

### Decisões aplicadas nas rodadas recentes
- `/apps` confirmado como base oficial publicada para Integrações
- status: `REAL`
- decisão: manter `/integrations/*` apenas como aliases compatíveis, sem competir com a taxonomia principal de `/apps`
- observação: a UI principal foi alinhada para comunicar Integrações como infraestrutura operacional do NexxaLife, não como App Store genérica
- `/ai-studio` confirmado como hub complementar de governança da camada de IA
- status: `REAL`
- decisão: manter coexistência com o núcleo NexxaLife sem competir com `/dashboard`; a superfície foi alinhada para comunicar papel complementar de agentes, bindings e knowledge
- `/knowledge` confirmado como infraestrutura complementar de grounding e retrieval
- status: `REAL`
- decisão: manter coexistência com `/ai-studio` como camada estrutural de memória e observabilidade, sem absorção total no hub de agentes neste momento
- `/settings/*` confirmado como centro administrativo complementar do workspace
- status: `REAL`
- decisão: manter como camada administrativa do NexxaLife, sem competir com dashboard, agenda, checklist ou relatórios

### Precisam de revisão semântica forte
- `/contacts`
- `/inbox`
- `/campaigns/*`
- `/automations/*`
- `/orders`
- `/products`
- `/audience`

### Decisões aplicadas nas rodadas recentes
- `/(app)` home herdada deixou de competir semanticamente com `/dashboard`
- status: `REAL` como rota técnica de entrada autenticada, com redirecionamento para `/dashboard`
- decisão: manter sem conteúdo próprio por agora para evitar duplicação conceitual com a home autenticada principal
- `/analytics` deixou de competir semanticamente com `/dashboard` e `/reports`
- status: `REAL` como rota técnica herdada com redirecionamento para `/dashboard`
- decisão: manter sem experiência própria enquanto o núcleo NexxaLife concentra leitura executiva no dashboard e leitura histórica em relatórios

### MISSING a partir do legado
- landing pública NexxaLife real em `/`
- superfície `/labs/behavioral-tests` ou equivalente para `Testes`

## Próximas análises sugeridas no loop
1. `/`
2. inventário de páginas MISSING reais
3. decisão sobre landing pública de `/`
4. decisão sobre `Testes` / `labs`
5. revisão semântica das rotas herdadas de CRM/commerce
