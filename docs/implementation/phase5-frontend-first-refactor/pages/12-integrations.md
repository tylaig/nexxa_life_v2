# Integrations / Apps

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Integrations / Apps`.

## Rotas atuais
- /apps
- /apps/catalog
- /apps/providers
- /apps/new
- /apps/[integrationId]
- /apps/[integrationId]/edit
- /apps/[integrationId]/mapping

## Rotas alvo
- /integrations
- /integrations/catalog
- /integrations/providers
- /integrations/webhooks
- /integrations/new
- /integrations/[integrationId]
- /integrations/[integrationId]/edit
- /integrations/[integrationId]/mapping

## O que já está forte
- Arquitetura rica e bem conectada com o tema do produto.
- Já há superfícies de provider, catálogo e mapping.

## Gaps validados nesta rodada
- Muitos CTAs sem efeito perceptível.
- Mistura catálogo comercial, provider técnico e runtime operacional.
- Health e test result são fracos.

## Blocos e superfícies que faltam
- Webhooks como superfície de primeira classe.
- Test result modal.
- Replay/history.
- Rotação de segredos.

## Estrutura de refatoração sugerida
- Separar de vez Connections, Providers, Catalog e Webhooks.
- Criar `ConnectionHealthPanel`, `ProviderCapabilitiesDrawer`, `WebhookReplayTimeline`.
- Normalizar nomenclatura de rotas e menu.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
