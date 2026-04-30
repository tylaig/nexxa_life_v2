# Orders

## Arquivos analisados
- `app/(app)/orders/page.tsx`
- `components/orders/orders-view.tsx`

## Objetivo operacional
- Operar pedidos com leitura de pagamento, fulfillment, risco e atendimento.
- Usuário: operação e-commerce, suporte, logística e antifraude.
- Ação primária: identificar pedidos que exigem ação e abrir próximos passos.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página de pedidos está razoavelmente sólida e escaneável, mas ainda orientada a tabela. Ela já comunica pagamento, fulfillment e risco, porém ainda não oferece quick actions suficientes, nem destaque forte para casos problemáticos, tickets e conexão com atendimento.

## Problemas encontrados
- Tabs de status ainda simples demais.
- Poucas ações rápidas por pedido.
- Ticket aberto tem tratamento visual fraco.
- Falta detalhe lateral do pedido.
- Filtros avançados superficiais.
- Tabela ainda pode ficar mais operacional.

## Melhorias recomendadas
### Quick wins
- Destacar pedidos com risco, recusa, atraso e ticket aberto.
- Inserir quick actions por linha.
- Melhorar leitura combinada de pagamento + fulfillment + risco.

### Estruturais
- Criar drawer lateral do pedido.
- Evoluir filtros por logística, pagamento, risco e atendimento.
- Integrar melhor com conversa e automações.
- Melhorar tabs para refletir operação real.

### Novas superfícies
- `/orders/[id]`
- `/orders/issues`
- `/orders/fulfillment`

## Refatoração sugerida
- Extrair `OrderRiskBadge`, `OrderQuickActions`, `OrderInspectorPanel`, `OrdersFiltersBar`.
- Criar helpers para agregação de status operacional.
- Aproximar padrão de tabela com inbox/contacts.

## Plano de implementação
1. Reforçar problemáticos e tickets.
2. Incluir quick actions.
3. Criar detalhe lateral.
4. Evoluir filtros/tabs.
5. Conectar com atendimento.

## Critérios de aceite
- Pedidos problemáticos ficam óbvios.
- Próximas ações são acessíveis sem sair da lista.
- A tela opera melhor casos reais de logística, pagamento e risco.
