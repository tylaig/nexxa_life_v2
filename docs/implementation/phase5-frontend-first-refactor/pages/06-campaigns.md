# Campaigns

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Campaigns`.

## Rotas atuais
- /campaigns
- /campaigns/new
- /campaigns/[campaignId]
- /campaigns/[campaignId]/edit

## Rotas alvo
- /campaigns
- /campaigns/new
- /campaigns/[campaignId]
- /campaigns/[campaignId]/edit

## O que já está forte
- Arquitetura list/detail/new/edit já existe.
- Studio full-screen já dá uma boa base.

## Gaps validados nesta rodada
- Estado inconsistente validado no browser: loading prolongado com KPIs zerados.
- Faltam filtros avançados reais e métricas conectadas.
- Preview e publicação ainda têm cara parcial.

## Blocos e superfícies que faltam
- Review pré-publicação.
- Simulação de audiência.
- Runs/history por campanha e diff de versões.

## Estrutura de refatoração sugerida
- Corrigir primeiro o estado de carregamento.
- Extrair `CampaignLifecyclePanel`, `CampaignMetricsStrip`, `CampaignReviewDrawer`.
- Padronizar tabela/lista operacional com filtros persistentes.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
