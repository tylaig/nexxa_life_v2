# Integrations

## Arquivos analisados
- `app/(app)/integrations/page.tsx`
- `components/integrations/integrations-list-view.tsx`

## Objetivo operacional
- Operar integrações do workspace e distinguir conexões, providers e catálogo.
- Usuário: operações técnicas, onboarding, admin e product ops.
- Ação primária: validar saúde, abrir detalhe e configurar conexões.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 3/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página já tem estrutura mais madura e profundidade real de navegação. O problema principal é a mistura entre conexões reais, providers e catálogo no mesmo espaço mental. Falta separar visualmente o que é operação ativa do que é biblioteca/configuração.

## Problemas encontrados
- Mistura mental entre ativações, catálogo e providers.
- Dados técnicos como `baseUrl` poluem a leitura principal.
- Falta health/criticidade mais explícitos.
- Hierarquia entre listagem principal e coluna lateral ainda pode melhorar.
- Ainda há percepção parcial de mock em algumas interações.

## Melhorias recomendadas
### Quick wins
- Reforçar status, saúde e criticidade nas conexões reais.
- Reduzir ruído técnico na primeira leitura.
- Separar melhor as seções “ativas”, “providers” e “catálogo”.

### Estruturais
- Criar tabs/segmentos para Conexões, Providers, Catálogo e Webhooks.
- Inserir feedback de validação/health check mais forte.
- Criar detalhe rico por integração com capabilities, logs e bindings.

### Novas superfícies
- `/integrations/connections`
- `/integrations/providers`
- `/integrations/catalog`
- `/integrations/webhooks`

## Refatoração sugerida
- Extrair `IntegrationHealthBadge`, `IntegrationCapabilitiesList`, `IntegrationSummaryCard`.
- Separar blocos atuais em subviews.
- Criar view-model para traduzir dado técnico em leitura operacional.

## Plano de implementação
1. Reforçar leitura das conexões reais.
2. Separar mentalmente catálogo/providers/webhooks.
3. Melhorar health check e estados.
4. Criar detalhe mais forte.
5. Revisar linguagem técnica exposta.

## Critérios de aceite
- Usuário entende rapidamente o que está conectado agora.
- A saúde das integrações críticas fica evidente.
- A superfície deixa de misturar catálogo com runtime operacional.
