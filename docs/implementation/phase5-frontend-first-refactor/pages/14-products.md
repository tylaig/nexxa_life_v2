# Products

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Products`.

## Rotas atuais
- /products

## Rotas alvo
- /products
- /products/[productId]

## O que já está forte
- Tema estratégico forte para omnichannel commerce.
- Tem lugar claro na IA do produto.

## Gaps validados nesta rodada
- Superfície ainda superficial frente ao potencial operacional.
- Tabela e detalhe de produto não estão fortes.
- Sincronização com Shopify precisa feedback explícito.

## Blocos e superfícies que faltam
- Tabela operacional.
- Detalhe lateral ou página.
- Sync status, estoque, preço, origem e governança.

## Estrutura de refatoração sugerida
- Criar `ProductCatalogTable`, `ProductSyncHealthBadge`, `ProductDetailInspector`.
- Conectar a campaigns, automations e knowledge quando fizer sentido.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
