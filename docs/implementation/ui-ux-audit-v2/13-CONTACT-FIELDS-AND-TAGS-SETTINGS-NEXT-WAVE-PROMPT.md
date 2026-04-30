# Contact Fields + Tags em Settings — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para o domínio de **Contact Fields** e **Tags**, com foco em preparar essas áreas para uma implementação futura real e mais robusta.

A necessidade principal é alinhar esses dois domínios dentro de **Configurações**, para que a plataforma tenha uma base mais séria de:

- campos de contato
- campos customizados
- taxonomia de tags
- governança de metadados do contato
- uso futuro em contatos, audiência, automações, campanhas, agentes e integrações

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página atual de settings: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View atual de settings: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **CRM architecture, metadata systems, product design, settings/admin UX e refatoração frontend/backend**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Objetivo geral
Ajustar o domínio de **Contact Fields** para uma implementação futura real e robusta, e adicionar de forma coerente o domínio de **Tags**, deixando ambos alinhados dentro de **Configurações**.

A solução deve preparar a plataforma para trabalhar melhor com:
- estrutura de dados do contato
- campos nativos e customizados
- tags reutilizáveis
- taxonomia operacional
- filtros e segmentações futuras
- integração com Audiência, Contatos, Campanhas, Automações, AI Studio e Integrações

---

## Visão de produto desejada
A plataforma precisa tratar **Contact Fields** e **Tags** como partes estruturais da modelagem do contato.

Esses domínios não devem parecer apenas detalhes de formulário. Eles precisam funcionar como base para:
- CRM
- filtros
- segmentação
- audiência
- campanhas
- triggers
- automações
- leitura contextual por agentes

A área de **Configurações** deve ser o lugar onde essa governança é feita.

---

## Escopo das melhorias

### 1. Ajustar Contact Fields para implementação futura real
A estrutura de Contact Fields precisa ser revista para deixar de parecer provisória ou superficial.

Ela deve ficar preparada para uma implementação futura real, com:
- campos nativos
- campos customizados
- tipos de campo
- validações
- visibilidade/uso
- mapeamento futuro com integrações
- uso em filtros e segmentações

A UX precisa comunicar que Contact Fields é uma parte séria da configuração do CRM.

---

### 2. Adicionar Tags como domínio configurável
Além dos campos, precisamos incorporar **Tags** dentro dessa mesma visão administrativa.

Tags devem ser tratadas como um domínio próprio e útil, com capacidade de:
- cadastro
- edição
- organização
- descrição/propósito
- uso futuro em filtros
- uso em automações
- uso em campanhas
- uso em audiência
- uso em leitura operacional do contato

Tags não devem ficar apenas implícitas ou espalhadas sem governança.

---

### 3. Alinhar Contact Fields e Tags dentro de Settings
Tudo isso precisa estar alinhado dentro de **Configurações**.

A experiência deve permitir entender claramente:
- onde gerenciar campos do contato
- onde gerenciar tags
- como esses domínios se relacionam
- como eles serão usados no restante do sistema

A área de Settings deve parecer o centro administrativo dessa modelagem.

---

### 4. Preparar Contact Fields para tipos e regras reais
A modelagem de Contact Fields precisa suportar uma visão mais realista.

Exemplos de capacidades que devem ser consideradas:
- nome interno do campo
- label
- tipo de campo
- obrigatoriedade
- valor default
- descrição
- uso em filtros
- uso em formulários
- uso em integrações
- status ativo/inativo

A solução deve ser preparada para tipos como:
- texto
- número
- booleano
- data
- select
- multiselect
- telefone
- email
- URL
- campo enriquecido/customizado

---

### 5. Preparar Tags para taxonomia operacional
Tags precisam ser tratadas como elementos reutilizáveis da taxonomia do sistema.

A solução deve considerar capacidades como:
- nome da tag
- slug/identificador
- cor/identidade visual
- descrição
- categoria ou agrupamento, se fizer sentido
- status ativo/inativo
- contagem de uso, futuramente

Isso deve permitir que Tags sejam mais do que marcadores soltos.

---

### 6. Pensar em uso futuro em filtros e Audiência
Tanto Contact Fields quanto Tags precisam ser desenhados já pensando no uso futuro em:
- filtros avançados
- segmentação
- audiência
- kanban/pipeline de contatos
- campanhas
- automações

A implementação atual não precisa resolver tudo, mas a arquitetura precisa apontar nessa direção.

---

### 7. Melhorar a UX administrativa de Settings para esses domínios
A experiência dentro de Settings deve ser mais madura e mais útil.

A solução pode contemplar:
- área de Contact Fields
- área de Tags
- visões separadas ou tabs
- estados claros
- CTAs fortes
- organização que não pareça apenas uma lista crua de atributos

O objetivo é que o usuário sinta que está configurando a base estrutural do CRM.

---

### 8. Preparar vínculo futuro com integrações e mapeamentos
Contact Fields devem ficar preparados para futuros cenários de:
- mapeamento com integrações
- importação/exportação
- sync com plataformas externas
- payload mapping
- vinculação com apps/providers

Tags também podem participar indiretamente da lógica de mapeamento e segmentação.

A arquitetura precisa considerar isso desde já.

---

### 9. Melhorar a consistência com Contatos, Audiência e Campanhas
Como você já está definindo uma expansão forte de:
- Contatos
- Audiência
- Campanhas

Contact Fields e Tags precisam ficar coerentes com essas frentes.

Ou seja:
- Contact Fields ajudam a definir a estrutura do contato
- Tags ajudam a classificar e segmentar
- Audiência usa isso para construir públicos
- Campanhas usam isso para segmentar e operar

Essa coerência precisa aparecer na proposta.

---

## Estrutura conceitual recomendada
A solução deve considerar conceitos como:

- **Contact Field Definitions**
- **Contact Native Fields**
- **Contact Custom Fields**
- **Field Types**
- **Field Visibility / Usage Rules**
- **Tag Definitions**
- **Tag Taxonomy**
- **Tag Status / Governance**
- **Settings Metadata Management**

---

## Sugestões de superfícies/rotas
A solução pode considerar algo como:

- `/settings/contact-fields`
- `/settings/tags`

Ou uma visão unificada com seções/tabs, desde que a responsabilidade fique clara.

---

## Diretrizes de UX
Priorizar:
- clareza administrativa
- organização forte em Settings
- sensação de governança real
- preparação para uso futuro
- consistência com CRM/Audiência/Campanhas
- labels e tipos claros
- tags com identidade visual útil

Evitar:
- telas excessivamente técnicas sem hierarquia
- mistura confusa entre campos e tags
- campos customizados tratados como detalhe secundário
- tags sem estrutura mínima de governança

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- separar definição de campo do valor do campo
- separar definição de tag da aplicação da tag
- tratar Contact Fields e Tags como domínios administrativos do workspace
- preparar modelagem para filtros e segmentações futuras
- manter coerência com multi-tenant/workspace
- evitar hardcodes frágeis no frontend

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- limitações do estado atual de Contact Fields
- ausência ou fragilidade do domínio de Tags
- gaps administrativos em Settings
- impactos futuros em CRM, Audiência e Campanhas

### 2. Proposta funcional
Organizar a solução em blocos:
- contact fields
- custom fields
- tags
- governança
- settings alignment
- uso futuro em filtros e segmentação

### 3. Proposta de arquitetura de informação
Definir:
- como Contact Fields e Tags entram em Settings
- como ficam separados ou unidos
- como o usuário navega entre essas configurações
- como isso conversa com o resto do produto

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- settings
- contact fields
- tags
- modelagem base
- preparação para uso futuro

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como Contact Fields e Tags ficaram mais preparados para uma implementação real
- como isso ficou alinhado dentro de Settings

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- Contact Fields ficar preparado para uma implementação futura real
- Tags existir como domínio administrável
- ambos estiverem alinhados em Settings
- a proposta ficar coerente com Contatos, Audiência e Campanhas
- a experiência parecer mais madura, estrutural e administrativa

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como base estrutural do CRM
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- trata Contact Fields como domínio estrutural real
- adiciona Tags com governança mínima
- alinha ambos dentro de Settings
- conecta isso com CRM, Audiência, Campanhas e automações futuras
- prepara o sistema para modelagem mais séria de contato

---

# Nome recomendado para uso interno

Sugestões:

- `Contact Fields + Tags Settings Alignment`
- `CRM Metadata Settings Next Wave`
- `Contact Fields and Tags Governance Prompt`
