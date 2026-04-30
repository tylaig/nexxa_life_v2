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
- Landing pública legada -> hoje `/` apenas redireciona para `/dashboard`
  - status: `MISSING` como landing pública real
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

### Precisam de revisão semântica forte
- `/analytics`
- `/contacts`
- `/inbox`
- `/campaigns/*`
- `/automations/*`
- `/orders`
- `/products`
- `/audience`
- `/(app)` home herdada

### MISSING a partir do legado
- landing pública NexxaLife real em `/`
- superfície `/labs/behavioral-tests` ou equivalente para `Testes`

## Próximas análises sugeridas no loop
1. `/checklist`
2. inventário de páginas MISSING reais
3. decisão sobre landing pública de `/`
4. decisão sobre `Testes` / `labs`
5. revisão semântica das rotas herdadas de CRM/commerce
