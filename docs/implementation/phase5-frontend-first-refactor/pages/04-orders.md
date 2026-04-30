# Orders

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Orders`.

## Rotas atuais
- /orders

## Rotas alvo
- /orders
- /orders/[orderId]

## O que já está forte
- Referência positiva de list-first e leitura operacional.
- Bom potencial para uso de banners e métricas por risco.

## Gaps validados nesta rodada
- Drilldown não foi aprofundado na rodada atual.
- Falta costura clara com Inbox, Contacts e Commerce quick actions.

## Blocos e superfícies que faltam
- Drawer/detalhe com timeline e ações rápidas.
- Relações com fraude, logística e pagamentos.
- Filtros avançados por risco/status.

## Estrutura de refatoração sugerida
- Extrair `OrderRiskBadge`, `OrderCommerceActions`, `OrderDetailInspector`.
- Conectar mais explicitamente com Inbox e Contacts.
- Preparar contrato para paginação e detalhamento.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página
