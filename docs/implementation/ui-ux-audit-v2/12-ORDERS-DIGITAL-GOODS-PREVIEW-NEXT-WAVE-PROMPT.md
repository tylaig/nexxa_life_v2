# Orders + Digital Goods Preview — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para a página de **Pedidos**, com foco em reposicionar essa área para um contexto mais forte de **produtos digitais**, melhorando também a experiência de preview/detalhe do pedido.

A meta é fazer a tela de Pedidos parecer menos voltada apenas para fulfillment físico tradicional e mais preparada para:

- produtos digitais
- acesso/entrega digital
- contexto de compra de ativos digitais
- leitura mais rica do pedido
- detalhes melhor organizados
- uso de ícones informativos e superfícies de apoio mais elegantes

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota Pedidos: `/orders`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/orders/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/orders/orders-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, digital commerce UX, order management, preview systems e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfície alvo
- Rota: `/orders`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/orders/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/orders/orders-view.tsx`

## Objetivo geral
Melhorar a área de **Pedidos** com foco maior em **produtos digitais**, reorganizando a leitura da tela para refletir melhor:

- o contexto de compra de bens digitais
- a separação entre pedido, produto e entrega/acesso
- a preview do pedido com mais detalhes úteis
- o uso de ícones informativos e detalhes contextuais em superfícies apropriadas

A página precisa parecer mais moderna, mais operacional e mais aderente a uma plataforma que trabalha com produtos digitais.

---

## Escopo das melhorias

### 1. Melhorar Pedidos com foco em produtos digitais
A tela de Pedidos deve evoluir para não parecer centrada apenas em logística física ou pedidos tradicionais.

Ela precisa contemplar melhor o contexto de:
- produtos digitais
- entregas digitais
- acessos/liberações
- onboarding pós-compra
- fulfillment digital
- status relevantes para bens digitais

A experiência deve refletir que, em muitos casos, o pedido não leva a envio físico, mas sim a acesso, ativação ou disponibilização digital.

---

### 2. Separar melhor pedido, produto e entrega/acesso
A UX deve deixar mais claro que existem camadas diferentes:

#### Pedido
- transação
- compra
- status financeiro
- cliente

#### Produto
- o item comprado
- tipo do produto
- produto digital vinculado

#### Entrega / Fulfillment / Acesso
- como o produto é entregue
- acesso liberado ou pendente
- onboarding
- consumo ou ativação

Essa separação é importante para um produto com foco digital.

---

### 3. Melhorar a preview / visualização do pedido
A tela de Pedidos precisa oferecer uma experiência melhor de preview/detalhe rápido do pedido.

Essa preview deve incluir mais informações úteis, como por exemplo:
- itens do pedido
- tipo do produto
- status de acesso/entrega digital, quando aplicável
- origem do pedido
- dados importantes do cliente
- contexto financeiro resumido
- sinais de risco/reembolso/suporte
- automações ou eventos relevantes relacionados

A preview não deve depender apenas da linha da tabela nem despejar informação demais no meio do layout.

---

### 4. Adicionar mais ícones de informação e affordances visuais
A experiência pode e deve usar mais ícones de informação, contexto e affordance para ajudar leitura rápida.

Exemplos:
- ícones para status
- ícones para risco
- ícones para acesso liberado
- ícones para suporte/ticket
- ícones para produto digital
- ícones para integrações/origem

Mas esses ícones não devem apenas decorar. Eles devem ajudar a revelar ou contextualizar informação útil.

---

### 5. Evitar poluir o meio da tela com detalhes excessivos
Informações complementares não devem aparecer jogadas no meio da tabela ou quebrando a leitura principal.

A diretriz é:
- detalhes contextuais não devem poluir a linha principal
- detalhes adicionais devem aparecer em superfícies mais apropriadas
- o conteúdo principal deve continuar escaneável

A tabela/lista de pedidos precisa continuar limpa, objetiva e operável.

---

### 6. Mostrar informações adicionais em popup, drawer ou superfície de apoio apropriada
As informações adicionais devem aparecer em lugares mais fáceis de visualizar e mais elegantes, como por exemplo:
- popup contextual
- modal leve
- side drawer
- inspector panel
- hover/tooltip rico, quando o conteúdo for pequeno

A escolha deve depender do tipo e profundidade da informação.

### Regra sugerida
- informação curta: tooltip ou hover card
- informação média: popup leve ou panel contextual
- informação detalhada: drawer ou detail preview

O importante é não entupir a listagem principal.

---

### 7. Criar uma experiência de detalhe rápido mais premium
A solução deve prever uma experiência de “quick preview” ou “detail preview” do pedido mais premium.

Ao interagir com um pedido, o usuário deve conseguir ver rapidamente:
- resumo do pedido
- itens comprados
- status relevantes
- informações contextuais
- sinais de operação digital

Sem precisar necessariamente sair da tela principal.

Isso pode funcionar via:
- drawer lateral
- panel contextual
- modal de preview

---

### 8. Adaptar métricas e linguagem visual para produtos digitais
Os elementos da tela devem refletir mais o foco em bens digitais.

Isso significa rever:
- KPIs do topo
- labels
- status
- indicadores de fulfillment
- linguagem de risco/entrega
- contexto de acesso digital

Exemplos de leituras relevantes:
- pedidos com acesso liberado
- pedidos aguardando ativação
- onboarding pendente
- reembolso em produtos digitais
- problemas de entrega digital

---

### 9. Melhorar escaneabilidade da tabela/lista sem perder densidade útil
A tabela atual deve evoluir para equilibrar:
- densidade de informação
- clareza visual
- leitura rápida
- detalhes sob demanda

A meta é deixar a listagem mais forte sem transformá-la em uma massa visual poluída.

---

### 10. Preparar a tela para integração futura com catálogo de produtos digitais
Como o domínio de Produtos está sendo expandido, a página de Pedidos deve ficar preparada para se conectar melhor com:
- catálogo de produtos
- produtos importados da Shopify
- tipo do produto
- regras de acesso/entrega digital

A experiência não precisa implementar tudo nesta fase, mas deve ficar preparada para isso.

---

## Estrutura conceitual recomendada
A solução deve considerar conceitos como:

- **Order Summary**
- **Order Preview**
- **Digital Fulfillment Context**
- **Product Type**
- **Access / Delivery Status**
- **Order Support Signals**
- **Quick Info Surface**
- **Order Detail Drawer**

---

## Sugestões de superfícies/rotas
A solução pode continuar concentrada em:
- `/orders`

E considerar experiências como:
- preview inline controlado
- drawer de detalhe
- modal de informação
- futuras rotas de detalhe como `/orders/[id]`, se fizer sentido depois

---

## Diretrizes de UX
Priorizar:
- foco em produtos digitais
- melhor preview do pedido
- ícones com função real
- detalhes sob demanda
- superfície principal mais limpa
- informação complementar bem organizada
- experiência moderna e mais premium

Evitar:
- jogar informação extra no meio da tabela
- excesso de ruído visual
- labels demais na linha principal
- misturar contexto físico e digital sem critério
- popups pobres ou confusos

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- preservar coerência com o design system atual
- melhorar a estrutura da listagem sem torná-la frágil
- criar superfícies reutilizáveis para preview contextual
- tratar informações adicionais como camadas sob demanda
- preparar a tela para produtos digitais e catálogo futuro
- manter responsividade real

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- limitações da tela atual de Pedidos
- o quanto ela ainda está presa a um modelo físico/tradicional
- gaps de preview
- problemas de informação excessiva na linha principal
- oportunidades para produtos digitais

### 2. Proposta funcional
Organizar a solução em blocos:
- foco em produtos digitais
- melhoria de preview
- uso de ícones
- superfícies de apoio para detalhes
- nova leitura de status
- conexão futura com catálogo de produtos

### 3. Proposta de arquitetura de informação
Definir:
- o que fica na listagem principal
- o que vira detalhe sob demanda
- quando usar tooltip, popup, drawer ou modal
- como reforçar a leitura digital do pedido

### 4. Refatoração/implementação frontend
Sugerir e/ou implementar mudanças reais em:
- tela de pedidos
- preview do pedido
- ícones/contextual info
- drawers/popups/tooltips apropriados
- estrutura da tabela/lista

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como Pedidos ficou mais aderente a produtos digitais
- como a preview ficou mais útil e mais limpa

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- a tela de Pedidos refletir melhor o foco em produtos digitais
- a preview do pedido estiver mais rica e útil
- existirem mais ícones/contextos informativos com propósito real
- informações adicionais deixarem de poluir a listagem principal
- detalhes relevantes puderem ser vistos em popup, drawer ou outra superfície apropriada
- a experiência geral parecer mais moderna, clara e operacional

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como evolução funcional da área de pedidos
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- reposiciona Pedidos para contexto de produtos digitais
- melhora a lógica de preview e detalhe rápido
- usa ícones como apoio funcional, não decoração
- move informações extras para superfícies mais adequadas
- prepara a tela para integração futura com o domínio de Produtos

---

# Nome recomendado para uso interno

Sugestões:

- `Orders + Digital Goods Preview`
- `Orders Digital UX Next Wave`
- `Orders Preview and Context Refactor Prompt`
