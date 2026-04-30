# Products + Shopify Import + Digital Goods Delivery — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define uma mudança importante de direcionamento do produto: a plataforma deve passar a refletir com mais clareza um foco em **produtos digitais**, com capacidade de:

- importar produtos da Shopify
- organizar uma nova área de **Produtos**
- vincular produtos da loja à operação da plataforma
- preparar experiências de entrega/acesso semelhantes a uma loja virtual para bens digitais

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página atual de pedidos: `/orders`
- Página atual de integrações: `/integrations`
- Arquivo atual da rota de pedidos: `/home/tylaig/repo/chat.meusuper.app/app/(app)/orders/page.tsx`
- View atual de pedidos: `/home/tylaig/repo/chat.meusuper.app/components/orders/orders-view.tsx`
- Arquivo atual da rota de integrações: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View atual de integrações: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, e-commerce architecture, digital products operations, Shopify integrations e refatoração frontend/backend**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Objetivo geral
Reposicionar a plataforma para refletir melhor um foco em **produtos digitais**, adicionando uma nova área de **Produtos** e criando a capacidade de importar produtos da Shopify para dentro do sistema.

A solução deve permitir que a plataforma trate produtos não apenas como efeito indireto de pedidos, mas como um domínio próprio do produto.

Esse novo domínio deve suportar:
- catálogo de produtos
- produtos sincronizados/importados da Shopify
- vinculação entre integração Shopify e produtos
- preparação para entrega/acesso de produtos digitais
- leitura operacional do que está sendo vendido

---

## Mudança de foco do produto
A plataforma precisa comunicar melhor que seu foco atual inclui **produtos digitais**.

Isso significa que a arquitetura, a navegação e os módulos do produto devem passar a refletir com mais clareza:
- catálogo de produtos
- origem dos produtos
- integração com loja
- entrega ou disponibilização do produto digital
- operação comercial em torno desses ativos

A solução não deve depender apenas da página de pedidos para representar esse domínio.

---

## Escopo das melhorias

### 1. Criar uma nova aba/página chamada “Produtos”
É necessário criar uma nova superfície do produto chamada **Produtos**.

Essa página deve existir como um módulo próprio, dedicado a:
- listar produtos
- visualizar catálogo
- entender origem do produto
- ver status de sincronização
- preparar uso futuro em vendas, automações, acesso e entrega

### A nova área de Produtos deve contemplar
- listagem de produtos
- busca
- filtros
- origem/integração
- status de sincronização
- tipo do produto
- categoria ou agrupamento
- vínculo com Shopify quando existir
- preparação para leitura de produto digital

---

### 2. Permitir importar produtos da Shopify
A nova aba de Produtos deve permitir importar produtos da Shopify através da integração correspondente.

Esse fluxo deve contemplar:
- conexão/configuração da integração Shopify
- sincronização inicial de catálogo
- importação de produtos
- atualização/sync posterior
- visualização do status da importação
- identificação de produtos já importados
- tratamento de erros de sincronização

### A UX deve deixar claro
- se a Shopify já está conectada
- se ainda precisa autenticar/configurar
- quando foi a última sincronização
- quantos produtos foram importados
- se há falhas ou divergências

---

### 3. Tratar Shopify como fonte de catálogo
A Shopify deve funcionar como uma fonte oficial de catálogo dentro do sistema.

Isso significa que os produtos importados devem carregar contexto como:
- id externo da Shopify
- título
- descrição
- status
- tipo de produto
- variante(s)
- imagem(s)
- preço
- tags
- handle/slug
- disponibilidade
- metadados relevantes

A solução deve ser preparada para lidar com evolução futura do catálogo, sem acoplamento frágil.

---

### 4. Adaptar o domínio para produtos digitais
Como o foco da plataforma é produtos digitais, a nova área de Produtos precisa ir além de um catálogo simples de e-commerce físico.

É importante preparar o domínio para suportar atributos e operações como:
- produto digital
- tipo de entrega/acesso
- link de entrega
- área de membros / acesso futuro
- arquivo digital / recurso / licença / onboarding
- status de publicação
- regra de fulfillment digital

Mesmo que tudo isso não seja implementado de imediato, a arquitetura deve ficar pronta para isso.

---

### 5. Preparar experiência de “entrega do produto” semelhante a uma loja virtual
Você mencionou que a entrega do produto deve funcionar “como uma loja virtual”.

A interpretação correta aqui é que a plataforma deve ficar preparada para uma jornada onde:
- o produto existe como item de catálogo
- ele vem da Shopify ou de outra fonte conectada
- existe vínculo entre compra/pedido e produto
- o sistema entende como esse produto deve ser entregue ou disponibilizado

Para produtos digitais, essa entrega pode significar no futuro:
- liberar acesso
- enviar link
- disponibilizar recurso
- marcar fulfillment digital
- disparar automação de onboarding/entrega

A implementação atual deve ao menos organizar a base para esse comportamento.

---

### 6. Diferenciar produto, pedido e entrega
A arquitetura do produto deve separar claramente:

#### Produto
O item do catálogo

#### Pedido
A transação/compra

#### Entrega / Fulfillment / Acesso
A forma como o produto é disponibilizado ao cliente

Essa separação é muito importante para produtos digitais, porque a entrega não necessariamente é logística física.

---

### 7. Integrar o módulo Produtos com Integrações
A nova área de Produtos deve conversar diretamente com o domínio de Integrações, especialmente com Shopify.

Isso significa que a UX deve permitir entender:
- de qual integração aquele produto veio
- qual provider/fonte abastece o catálogo
- se a sincronização está saudável
- se o catálogo depende de provider configurado

A página de Produtos deve refletir essa relação sem obrigar o usuário a ficar pulando de contexto sem necessidade.

---

### 8. Preparar filtros e estrutura úteis para produtos digitais
A área de Produtos deve permitir filtros úteis para este novo foco.

Exemplos:
- origem (Shopify)
- tipo do produto
- status
- sincronizado / não sincronizado
- com imagem / sem imagem
- ativo / arquivado
- categoria / coleção / tag
- digital / físico / híbrido (se aplicável)

A solução deve ser preparada para crescer com o catálogo.

---

### 9. Tornar a navegação coerente com essa nova prioridade
Se a plataforma passa a ter foco mais claro em produtos digitais, a arquitetura de navegação deve refletir isso.

Isso significa revisar:
- presença da aba Produtos na sidebar
- posição do módulo na hierarquia do produto
- relação entre Produtos, Pedidos, Integrações e Analytics

Produtos não deve parecer um detalhe escondido. Deve parecer parte real do núcleo operacional/comercial.

---

### 10. Preparar base para futura visão de catálogo e analytics de produto
Mesmo que nesta fase o foco principal seja importar e listar produtos, a arquitetura deve ficar preparada para no futuro suportar:
- visão analítica por produto
- funil por produto
- performance comercial por produto
- vinculação com campanhas
- vinculação com automações
- insights por categoria ou coleção

---

## Sugestões de superfícies/rotas
A solução pode considerar rotas como:

- `/products`
- `/products/[id]`
- `/products/import`
- `/products/sync`

E relação com:
- `/integrations`
- `/orders`

A nomenclatura pode ser em inglês para manter coerência com parte da arquitetura atual, desde que isso seja padronizado com o restante do produto.

---

## Estrutura conceitual recomendada
A proposta deve trabalhar com conceitos como:

- **Product Catalog**
- **Product Source**
- **Shopify Product Sync**
- **Product Type**
- **Digital Fulfillment Context**
- **Product Sync Status**
- **External Product Mapping**

---

## Diretrizes de UX
Priorizar:
- clareza de que o produto agora possui um domínio de catálogo
- boa visualização dos produtos importados
- leitura simples do status de sincronização
- relação clara entre Shopify e catálogo interno
- preparação para produto digital
- navegação coerente com o restante do sistema

Evitar:
- tratar produto apenas como efeito colateral de pedido
- esconder Shopify import dentro de telas secundárias demais
- confundir produto com pedido ou entrega
- UX excessivamente técnica para algo que deve parecer parte natural da operação

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- criar um domínio próprio para produtos
- evitar hardcode do catálogo apenas na camada visual
- preparar modelagem para source mapping com Shopify
- tratar Shopify como integração/fonte do catálogo
- separar produto interno de id externo
- preparar o domínio para digital fulfillment futuro
- manter compatibilidade com multi-tenant/workspace

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- como o sistema representa produtos hoje
- o que está ausente
- como Shopify entra hoje (ou não entra)
- gaps entre pedidos e catálogo
- gaps para produtos digitais

### 2. Proposta funcional
Organizar a solução em blocos:
- nova aba Produtos
- importação Shopify
- sincronização
- estrutura de catálogo
- foco em produto digital
- relação entre produto, pedido e entrega

### 3. Proposta de arquitetura de informação
Definir:
- onde Produtos entra na navegação
- como o usuário acessa importação e sincronização
- como o catálogo é apresentado
- como Shopify aparece como fonte

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- navegação
- nova página de Produtos
- integração com Shopify
- modelagem do catálogo
- sync/import pipeline
- status e feedback de sincronização

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- quais entidades foram criadas ou ajustadas
- como o produto ficou mais preparado para bens digitais

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- existir uma nova aba/página de **Produtos**
- for possível planejar ou implementar a importação de produtos da Shopify
- a relação entre Shopify e catálogo interno estiver clara
- o sistema deixar de tratar produto apenas pelo prisma de pedidos
- a arquitetura ficar preparada para produtos digitais e sua entrega/acesso
- a navegação refletir essa nova prioridade do produto

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como evolução de domínio do produto
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma “criar uma aba produtos” em um domínio claro de catálogo
- conecta Shopify como fonte oficial de importação
- separa produto, pedido e entrega
- prepara a arquitetura para bens digitais
- posiciona Produtos como novo módulo real da plataforma

---

# Nome recomendado para uso interno

Sugestões:

- `Products + Shopify Import + Digital Goods`
- `Digital Products Catalog Expansion`
- `Products Domain Next Wave`
