# Integrations → Apps — Prompt Refinado para Refatoração da Página com Hierarquia Premium

## Contexto
Este documento define a próxima leva de evolução da página de **Integrações**, alinhando-a ao planejamento mais atual do produto.

A direção desejada é que a experiência deixe de parecer uma página genérica de integrações com muitas informações soltas ou pouco úteis e passe a refletir melhor a nova arquitetura de:

- **Apps** como superfície principal
- providers como camada de conexão
- actions/tools como capacidades disponibilizadas pelos apps
- estado de instalação/configuração/erro
- hierarquia premium e mais clara

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota atual: `/integrations`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, integration architecture, app marketplace UX, information architecture e refatoração frontend/backend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfície alvo
- Rota atual: `/integrations`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

## Objetivo geral
Refatorar a página de **Integrações** para que ela fique mais alinhada com o planejamento atual do produto, migrando sua lógica e sua narrativa para uma superfície mais forte de **Apps**.

A página precisa deixar de parecer uma mistura de conexões, mocks, catálogo e dados pouco priorizados, e passar a refletir uma arquitetura premium onde:

- **Apps** são o foco principal
- cada app pode ser integrado/configurado
- apps disponibilizam **tools/actions**
- providers/auth são camadas de suporte
- erros, saúde e disponibilidade ficam claros
- certas capacidades podem estar visíveis mas travadas, quando ainda não estiverem liberadas

---

## Visão de produto desejada
A página atual de Integrações deve evoluir para algo mais próximo de um **hub de Apps**.

O usuário deve sentir que está operando:
- apps disponíveis
- apps instalados
- apps configurados
- apps com erro
- apps parcialmente bloqueados
- tools/actions disponibilizadas por esses apps

A experiência deve comunicar muito melhor:
- o que é principal
- o que é secundário
- o que está pronto
- o que precisa configurar
- o que está indisponível
- o que está travado por fase, autenticação ou plano

---

## Escopo das melhorias

### 1. Melhorar a página de Integrações e alinhá-la ao planejamento atual
A página precisa ser revisada porque hoje contém muitas informações que podem até ser úteis, mas estão organizadas de forma pouco prioritária ou pouco coerente com a visão nova do produto.

A meta é reorganizar a superfície para refletir melhor:
- apps
- providers
- actions/tools
- estados de conexão
- health
- bloqueios/limitações

A experiência deve ser menos difusa e mais intencional.

---

### 2. Refatorar a página para o conceito de “Apps”
O “catálogo” atual deve ser reinterpretado como **Apps**.

Ou seja, em vez de manter a narrativa principal como “Integrações” genéricas, a experiência deve caminhar para:
- **Apps** como nome principal da superfície
- catálogo de apps
- apps conectáveis
- apps que entregam capabilities ao sistema

A página pode até nascer em transição a partir de `/integrations`, mas a experiência precisa apontar claramente para essa nova lógica.

---

### 3. Mover Apps para uma tela principal com hierarquia premium
Você indicou que Apps deve ir para a tela principal, e isso é importante.

A experiência deve parecer uma superfície de alto valor, não um detalhe técnico escondido.

Essa tela deve ter hierarquia premium, contemplando:
- header forte
- blocos principais mais claros
- separação entre catálogo, estado e uso
- foco nos apps realmente relevantes
- organização que ajude a descobrir, configurar e usar

---

### 4. Usar o conceito de app como distribuidor de tools/actions
A arquitetura de UX precisa comunicar que os apps não existem só para “conectar”.

Eles também **disponibilizam tools/actions** que poderão ser usadas por:
- automações
- agentes
- canais
- webhooks
- workflows futuros

Cada app deve poder exibir:
- tools disponíveis
- ações disponíveis
- capabilities
- requisitos de autenticação
- status de prontidão

---

### 5. Melhorar a hierarquia das informações úteis vs inúteis
Você comentou que existem muitas informações inúteis, mas algumas poderiam ser úteis se estivessem no lugar certo. Isso é importante.

A refatoração deve:
- remover ou reduzir ruído visual
- promover o que é útil
- rebaixar o que é secundário
- esconder em detalhe o que é técnico demais
- transformar certos dados em contexto sob demanda

Nem tudo precisa sumir. Parte pode continuar, mas em uma hierarquia melhor.

---

### 6. Destacar integrações/apps com erro
A nova experiência deve deixar mais claros os estados dos apps/integrações, especialmente:
- com erro
- incompleto
- aguardando autenticação
- configurado
- validado
- indisponível
- travado

Apps com problema precisam ser facilmente identificáveis.

O usuário precisa bater o olho e entender o que exige ação.

---

### 7. Permitir continuar com algumas coisas, mas travar outras
Você comentou que podemos continuar com algumas coisas, mas travar outras. Isso precisa virar parte formal da experiência.

A UI deve permitir:
- mostrar apps disponíveis mas ainda não liberados
- mostrar actions/tools ainda travadas
- mostrar recursos dependentes de autenticação
- mostrar recursos dependentes de configuração
- mostrar recursos futuros como disabled/coming soon/locked

Mas isso precisa ser feito com elegância.

### O travamento pode representar
- recurso futuro
- falta de provider configurado
- canal não conectado
- plano/capability não liberado
- action ainda não habilitada nesta fase

A UX deve comunicar o motivo do bloqueio.

---

### 8. Separar melhor Apps, Providers e configuração técnica
A superfície principal de Apps não deve ficar excessivamente técnica.

É importante deixar claro:
- **Apps** = superfície principal do usuário
- **Providers** = camada de conexão/autenticação
- **Config técnica** = nível mais profundo

A tela principal não deve parecer apenas uma lista de endpoints/baseUrl/auth modes.

Esses dados podem continuar existindo, mas em detalhe apropriado.

---

### 9. Melhorar a arquitetura de informação da página
A nova página deve deixar claro algo como:

- apps em destaque
- apps instalados/configurados
- apps com erro
- catálogo de apps
- apps travados ou futuros
- tools/actions do app
- entrada para providers quando necessário

O usuário não deve precisar montar mentalmente a arquitetura sozinho.

---

### 10. Criar uma hierarquia premium para a superfície
A página precisa parecer uma tela de produto séria e premium.

Isso inclui:
- melhor uso do espaço
- menos ruído técnico na primeira camada
- cards ou listas com mais intenção
- indicadores de saúde mais elegantes
- CTAs mais claros
- melhor separação entre descoberta, configuração e uso

A experiência deve parecer mais madura e mais vendável.

---

## Estrutura conceitual recomendada
A proposta deve considerar conceitos como:

- **Apps Catalog**
- **Installed Apps**
- **Configured Apps**
- **App Health State**
- **Locked App Capabilities**
- **App Tools / Actions**
- **Provider Dependency**
- **Premium Apps Hierarchy**

---

## Sugestões de superfícies/rotas
A solução pode considerar uma transição para algo como:

- `/apps`
- `/apps/[id]`
- `/apps/[id]/configure`
- `/apps/[id]/actions`

Mantendo `/integrations` apenas como transição, alias ou camada intermediária, se necessário.

---

## Diretrizes de UX
Priorizar:
- Apps como foco principal
- menos ruído técnico na camada inicial
- clareza de estado
- leitura rápida de erro/bloqueio/prontidão
- tools/actions visíveis de forma organizada
- hierarquia premium
- experiência mais vendável e mais clara

Evitar:
- excesso de informação técnica crua na listagem principal
- mistura confusa entre catálogo, conexões e mocks
- não deixar claro o que está pronto ou travado
- UI de integrações genérica e sem narrativa

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- permitir transição de “integrations” para “apps” sem quebrar arquitetura
- reaproveitar o que fizer sentido do domínio atual
- separar app, provider e actions de forma clara
- suportar estados locked/disabled/coming soon
- tratar health como first-class state
- manter coerência com a futura app store/providers/actions
- preparar multi-tenant/workspace

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- problemas da página atual de integrações
- informações pouco úteis ou mal priorizadas
- mistura entre catálogo, mocks, providers e conexões
- gaps de hierarquia

### 2. Proposta funcional
Organizar a solução em blocos:
- apps como tela principal
- estado dos apps
- tools/actions
- integração com providers
- locked states
- melhoria da hierarquia premium

### 3. Proposta de arquitetura de informação
Definir:
- como o usuário navega entre apps
- como enxerga estado/erro/trava
- como entende tools/actions
- como acessa configuração técnica sem poluir a superfície principal

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- página principal atual
- possível transição para Apps
- cards/listas/estados
- vínculo com providers
- exposição de actions/tools
- locked states

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como a experiência ficou mais alinhada ao planejamento atual
- como a hierarquia premium foi aplicada

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- a página estiver mais alinhada com a arquitetura atual do produto
- Apps passarem a ser o foco principal da superfície
- o catálogo atual puder ser reinterpretado como Apps
- apps puderem disponibilizar tools/actions de forma clara
- a experiência destacar erro, configuração, bloqueio e prontidão
- o layout e a hierarquia parecerem mais premium e intencionais
- certas capacidades puderem continuar visíveis, mas travadas com clareza

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só melhorias cosméticas
- trate isso como refatoração séria de arquitetura de produto
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma Integrações em uma superfície mais clara de Apps
- reorganiza informações úteis vs técnicas
- traz tools/actions para o centro da narrativa
- introduz estados travados/indisponíveis de forma elegante
- alinha a página ao planejamento mais recente do produto

---

# Nome recomendado para uso interno

Sugestões:

- `Integrations to Apps Premium Hierarchy`
- `Apps Surface Refactor`
- `Apps Main Screen Next Wave`
