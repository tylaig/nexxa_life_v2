# Contacts + Audience — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para os módulos de **Contatos** e do novo módulo **Audiência**, transformando a base atual em uma superfície mais robusta de CRM, segmentação, operação comercial e preparação para campanhas.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página atual de contatos: `/contacts`
- Arquivo da rota atual: `/home/tylaig/repo/chat.meusuper.app/app/(app)/contacts/page.tsx`
- View atual de contatos: `/home/tylaig/repo/chat.meusuper.app/components/contacts/contacts-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, design systems, CRM operations, segmentação de audiência e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfícies alvo

### 1. Contatos
- Rota atual: `/contacts`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/contacts/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/contacts/contacts-view.tsx`

### 2. Novo módulo: Audiência
Este módulo ainda deve ser estruturado e especificado como uma superfície própria do produto.

Ele deve se tornar um módulo completo e estratégico para segmentação, públicos, filtros personalizados e uso em campanhas.

---

## Objetivo geral
Expandir a base de **Contatos** e criar um módulo completo chamado **Audiência**, onde o sistema passe a ter:

- base unificada de contatos
- segmentos reutilizáveis
- públicos dinâmicos
- filtros avançados
- visualizações alternativas da base
- configuração de etapas/fases dos contatos
- leitura visual em funil
- personalização por tags, campos, condições e filtros compostos

A implementação deve posicionar esse domínio como uma base real para:

- CRM
- campanhas
- automações
- operação comercial
- qualificação e acompanhamento de leads

---

## Escopo das melhorias

### 1. Criar um módulo completo chamado “Audiência”
O produto deve ganhar um módulo próprio chamado **Audiência**.

Esse módulo deve ser responsável por organizar e operar:

- públicos
- segmentos
- filtros salvos
- regras dinâmicas
- recortes operacionais da base de contatos

A ideia é que **Audiência** deixe de ser um conceito implícito dentro de Contatos e passe a ser uma superfície própria, forte e reutilizável.

### O módulo Audiência deve contemplar
- criação de segmentos de público
- edição de segmentos
- visualização de segmentos existentes
- filtros dinâmicos e compostos
- regras salvas
- destaque de segmentos estratégicos
- uso futuro em campanhas e automações
- ligação direta com a base de contatos

Esses segmentos podem ser os mesmos que também aparecem em destaque dentro de **Contatos**, mas o módulo **Audiência** deve ser o local principal de gestão estrutural.

---

### 2. Reestruturar a relação entre Contatos e Audiência
A base de contatos e o novo módulo Audiência devem funcionar juntos, mas com papéis claros.

### Papel de Contatos
Contatos deve ser a superfície principal de:
- navegação da base
- operação individual
- visão CRM
- leitura do perfil do contato
- ações sobre o contato
- visualizações operacionais

### Papel de Audiência
Audiência deve ser a superfície principal de:
- criação de segmentos
- modelagem de públicos
- filtros avançados
- recortes dinâmicos
- regras salvas
- preparação de listas para uso futuro em campanhas

A UX deve deixar claro que:
- **Contatos = operação sobre pessoas e pipeline**
- **Audiência = construção e gestão de públicos/segmentos**

---

### 3. Permitir múltiplas visualizações da base de contatos
A página de Contatos deve permitir alternar a visualização da base.

Além da visualização tabular/lista atual, deve existir ao menos a opção de:

- **Lista/Tabela**
- **Kanban**

A experiência precisa permitir alternância clara entre modos, sem parecer improvisada.

---

### 4. Adicionar visualização Kanban em Contatos
A visualização Kanban deve organizar os contatos em colunas configuráveis.

Essas colunas representam **etapas/fases do contato**, que precisam ser configuráveis.

Essas etapas podem ser tratadas como:
- estágios de relacionamento
- estágios comerciais
- etapas do pipeline
- fases operacionais do contato

O pedido atual sugere que essas etapas se conectem aos segmentos. Isso deve ser interpretado com cuidado.

### Diretriz importante
Não tratar “segmento” e “etapa” como exatamente a mesma coisa sem critério.

A implementação deve considerar dois modelos possíveis:

#### Modelo A — Segmento separado de etapa
- **Segmentos** = recortes por regras, condições e públicos
- **Etapas** = progressão operacional/comercial do contato

#### Modelo B — Segmento com papel de etapa quando configurado
Permitir que alguns segmentos especiais possam funcionar como colunas de kanban, desde que isso seja explícito e configurável.

A recomendação é priorizar uma arquitetura onde:
- etapas = pipeline
- segmentos = filtros/públicos

Mas a UX pode permitir integração entre os dois conceitos.

---

### 5. Permitir configurar etapas do contato
A solução deve permitir configurar etapas/fases da visualização Kanban.

Essas etapas precisam ser administráveis, com capacidade de:

- criar etapa
- editar etapa
- ordenar etapa
- definir cor/identidade visual
- definir critério opcional de entrada
- associar emoji/ícone quando desejado
- usar em funil e visualização de pipeline

Essas etapas devem ser pensadas para suportar fluxos como:
- lead novo
- qualificado
- em atendimento
- proposta enviada
- negociação
- ganho
- perdido

ou qualquer outro pipeline operacional definido pelo workspace.

---

### 6. Criar leitura visual em funil para contatos/audiência
A base de contatos e/ou o módulo Audiência devem permitir uma visualização em forma de **funil**, semelhante ao tipo de leitura já presente em Analytics.

O objetivo é poder analisar:
- distribuição dos contatos por etapa
- evolução do pipeline
- gargalos
- conversão entre etapas
- densidade por estágio

Essa visualização deve parecer uma ferramenta operacional de CRM/comercial, não apenas um gráfico decorativo.

Ela deve se conectar com:
- kanban
- etapas do contato
- segmentos/audiências
- filtros aplicados

---

### 7. Permitir escolher emojis/ícones para etapas, segmentos ou destaques
O sistema deve permitir escolher um entre vários emojis/ícones visuais para representar elementos como:

- etapas do pipeline
- segmentos em destaque
- públicos salvos
- classificações visuais do contato

A seleção deve ser rica o suficiente para não parecer restrita demais.

Objetivo:
- melhorar leitura visual
- criar reconhecimento rápido
- permitir personalização do workspace
- reforçar identidade dos grupos/etapas

A implementação pode usar:
- seletor de emoji
- ícones internos
- ou ambos

---

### 8. Criar filtros personalizados e avançados no módulo Audiência
O módulo Audiência deve permitir filtros compostos e personalizáveis.

Esses filtros precisam suportar condições baseadas em:

- tags
- condições do contato
- campos do contato
- campos customizados
- atributos operacionais
- combinações com operadores lógicos
- filtros salvos

Exemplos de bases de filtragem:
- tem determinada tag
- não tem determinada tag
- está em determinada etapa
- possui email
- possui opt-in
- possui pedido vinculado
- última interação em determinado período
- cidade/bairro/canal/origem
- campos customizados definidos pelo workspace

### Requisitos para filtros
- suportar operadores como AND / OR
- suportar grupos de condição
- suportar filtros reutilizáveis
- permitir salvar como audiência dinâmica
- permitir visualizar quantidade de contatos estimada
- deixar claro quando o segmento é dinâmico vs fixo

---

### 9. Permitir destaque dos mesmos segmentos também em Contatos
Os segmentos mais importantes criados em Audiência devem poder aparecer como atalhos ou destaques dentro de Contatos.

Mas isso deve ser tratado como:
- **espelho operacional** em Contatos
- **gestão estrutural** em Audiência

A tela de Contatos pode mostrar:
- segmentos favoritos
- segmentos estratégicos
- públicos mais usados
- recortes recentemente acessados

---

### 10. Melhorar a experiência premium de CRM operacional
A base de contatos precisa evoluir visualmente e funcionalmente para parecer um CRM real e premium.

Isso inclui:
- alternância clara entre visualizações
- filtros mais poderosos
- melhor escaneabilidade
- leitura por estágio
- mais contexto por contato
- mais capacidade de operar listas e públicos
- ligação futura com campanhas, automações e analytics

A solução não deve parecer só uma tabela com filtros extras. Ela precisa parecer um sistema robusto de gestão de relacionamento e públicos.

---

## Estrutura funcional esperada

### Contatos
A página/área de Contatos deve suportar:
- visualização em lista/tabela
- visualização em kanban
- filtros rápidos
- busca
- segmentos em destaque
- quick actions por contato
- leitura de etapa/pipeline
- leitura individual do contato

### Audiência
O novo módulo Audiência deve suportar:
- listagem de audiências/segmentos
- criação de nova audiência
- editor de regras e condições
- filtros salvos
- visualização de contatos resultantes
- visão por funil
- destaque de audiências estratégicas
- capacidade futura de uso em campanhas

---

## Diretrizes de UX
Priorizar:

- clareza entre “contato individual” e “público/segmento”
- ergonomia operacional
- experiência visual premium
- legibilidade de filtros complexos
- boa escaneabilidade da base
- leitura comercial/pipeline forte
- consistência com Analytics sem copiar visual de forma acrítica
- personalização sem bagunça

Evitar:

- misturar demais etapa com segmento sem definição clara
- filtros avançados visualmente confusos
- kanban que pareça improvisado
- funil puramente ilustrativo
- excesso de opções sem hierarquia
- navegação fragmentada entre Contatos e Audiência

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- manter coerência com o design system atual
- separar bem visualização, filtros, configuração e dados
- criar componentes reutilizáveis para listas, kanban, filtros e funil
- não acoplar excessivamente a lógica de Audiência à tela de Contatos
- preparar estruturas para integração futura com campanhas e automações
- pensar desde já em multi-tenant/workspace
- permitir evolução incremental sem retrabalho desnecessário

---

## Sugestões de superfícies/rotas
A proposta deve considerar a criação ou planejamento de superfícies como:

### Contatos
- `/contacts`
- visualização lista
- visualização kanban
- segmentos destacados

### Audiência
- `/audiences`
- `/audiences/new`
- `/audiences/[id]`
- editor de regras
- visualização dos contatos resultantes
- visão de funil da audiência

Se o projeto preferir começar pelo nome em português, também pode ser avaliado:
- `/audiencia`

Mas a definição deve ser consistente com o restante das rotas do produto.

---

## O que entregar

### 1. Diagnóstico objetivo da estrutura atual
Analisar a página de Contatos atual e identificar:
- limitações da tabela atual
- limitações dos segmentos atuais
- gaps de CRM
- gaps de segmentação
- oportunidades de evolução para Audiência

### 2. Plano funcional
Organizar a proposta em blocos:
- evolução de Contatos
- criação de Audiência
- visualização Kanban
- configuração de etapas
- visualização em funil
- filtros avançados
- segmentos em destaque
- emojis/ícones

### 3. Proposta de arquitetura de informação
Definir como o produto deve organizar:
- contatos
- audiências
- segmentos
- etapas
- filtros salvos
- visão kanban
- visão funil

### 4. Refatoração/implementação frontend
Sugerir e/ou implementar componentes como:
- contacts view switcher
- contacts kanban board
- audience builder
- audience rules editor
- segment cards
- pipeline stage config
- funnel summary view
- filter group builder

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto e/ou implementado
- quais arquivos foram alterados
- quais decisões estruturais foram tomadas
- quais partes ficam preparadas para próximas fases

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- existir uma proposta clara e forte para o módulo **Audiência**
- Contatos suportar ou ficar preparado para múltiplas visualizações
- a visualização **Kanban** estiver especificada ou implementada de forma consistente
- o conceito de **etapas** estiver claro e configurável
- a leitura em **funil** fizer sentido e se conectar ao pipeline
- filtros avançados suportarem tags, condições, campos e combinações
- houver suporte para personalização com emojis/ícones quando aplicável
- segmentos estratégicos puderem aparecer também em Contatos
- a experiência geral parecer um CRM/pipeline/audience builder real
- a solução fique preparada para uso futuro em campanhas e automações

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só ideias superficiais
- não foque apenas em estética
- preserve coerência com o app existente
- trate Contatos e Audiência como domínios complementares
- implemente ou especifique com visão de escalabilidade
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- separa claramente **Contatos** e **Audiência**
- organiza o conceito de **segmento vs etapa**
- transforma a ideia de kanban em estrutura executável
- conecta visualização em funil com pipeline real
- formaliza filtros avançados e públicos dinâmicos
- inclui caminhos reais da tela atual
- prepara o projeto para campanhas, automações e CRM mais sério

---

# Nome recomendado para uso interno

Sugestões:

- `Contacts + Audience Next Wave`
- `Audience Module Expansion Prompt`
- `CRM Contacts Pipeline Refactor Prompt`
