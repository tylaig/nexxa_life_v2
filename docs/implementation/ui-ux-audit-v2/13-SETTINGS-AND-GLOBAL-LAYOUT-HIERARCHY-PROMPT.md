# Settings + Global Layout Hierarchy — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define duas frentes conectadas de melhoria:

1. evolução da página de **Settings / Configurações**
2. refatoração da **hierarquia global de layout das páginas** do produto

A necessidade principal é reduzir layouts fragmentados em dois blocos concorrentes lado a lado — um principal e outro complementar porém redundante — e migrar para páginas com leitura mais forte, mais preenchidas, mais claras e com melhor aproveitamento de espaço.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página de settings: `/settings`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`
- Layout principal do app: `/home/tylaig/repo/chat.meusuper.app/app/(app)/layout.tsx`
- Topbar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-topbar.tsx`
- Sidebar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-sidebar.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, information architecture, design systems e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfícies alvo

### 1. Página de Settings
- Rota: `/settings`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`

### 2. Hierarquia global de layout
- Layout principal do app: `/home/tylaig/repo/chat.meusuper.app/app/(app)/layout.tsx`
- Topbar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-topbar.tsx`
- Sidebar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-sidebar.tsx`

Além disso, considere que a nova hierarquia visual de layout deve orientar a evolução de **todas as páginas do sistema**.

---

## Objetivo geral
Refatorar a página de **Settings** e ao mesmo tempo definir/aplicar uma nova **hierarquia global de layout** para o produto.

A meta é fazer as páginas parecerem:

- mais sólidas
- mais preenchidas
- menos fragmentadas
- menos redundantes
- mais claras
- mais orientadas a um bloco principal forte
- menos dependentes de uma composição lateral de “conteúdo principal + bloco secundário redundante”

O produto hoje deve evoluir para páginas onde a leitura principal ocupe melhor a área útil, com hierarquia mais intencional e menos sensação de duas superfícies paralelas competindo entre si.

---

## Problema a resolver
Hoje várias páginas parecem estruturadas em dois blocos lado a lado:

- um bloco principal com o conteúdo real
- um bloco complementar com informação secundária, fraca ou redundante

Além disso, existe uma prática de incluir **resumos do trabalho da IA dentro do próprio design da página**, como se isso fosse um bloco estrutural da interface. Essa prática deve ser abolida.

Esse padrão, quando usado em excesso, pode causar:
- desperdício de espaço
- leitura quebrada
- hierarquia fraca
- sensação de layout “montado por cards” em vez de produto coeso
- informação complementar com pouco valor real
- desequilíbrio visual
- interfaces menos premium
- blocos de resumo de IA que poluem a leitura e desviam do objetivo principal da tela

A nova fase deve corrigir isso.

---

## Escopo das melhorias

### 1. Refatorar Settings com a mesma lógica de clareza e maturidade
A página de **Settings** deve evoluir para uma experiência mais forte, menos parecida com um hub simples de links.

Ela deve parecer um verdadeiro centro de administração do workspace, com:
- mais clareza de estado
- melhor hierarquia
- mais foco no conteúdo principal
- menos blocos redundantes
- mais leitura estrutural do ambiente

### O que Settings precisa comunicar melhor
- o que está configurado
- o que está pendente
- o que está incompleto
- o que exige atenção
- quais módulos estão saudáveis
- quais áreas administrativas são prioritárias

A tela não deve depender tanto de múltiplos cards equivalentes com pouco peso diferencial.

---

### 2. Reestruturar a hierarquia de layout da página de Settings
A página de Settings deve deixar de parecer uma superfície dividida em pedaços paralelos e passar a ter:

- uma área principal mais forte
- leitura mais sequencial
- agrupamentos com mais propósito
- menos redundância entre cards explicativos
- mais uso da largura disponível

A experiência deve migrar de algo como:
- bloco principal + bloco lateral informativo redundante

para algo mais próximo de:
- superfície central mais cheia
- seções bem agrupadas
- módulos administrativos com contexto real
- resumo + estado + acesso + próxima ação

---

### 3. Aplicar a nova hierarquia de layout em todas as páginas
Essa mudança não deve ficar só em Settings.

É preciso estabelecer uma regra de layout que possa orientar a evolução de todas as superfícies do sistema.

### Nova direção global
Priorizar páginas com:
- um bloco principal forte e dominante
- seções internas bem agrupadas
- menos colunas laterais fracas
- menos cards decorativos redundantes
- mais aproveitamento horizontal e vertical da área útil
- narrativa visual mais linear e mais clara

---

### 4. Reduzir o padrão “duas colunas concorrentes” quando a segunda não agrega valor real
O padrão de duas colunas lado a lado só deve continuar quando houver motivo operacional forte.

Exemplos válidos:
- inbox com thread + contexto
- comparação de dados realmente útil
- painel lateral com ação contextual forte

Exemplos que devem ser evitados:
- conteúdo principal de um lado e resumo fraco do outro
- cards secundários apenas preenchendo espaço
- duplicação de contexto em dois painéis
- coluna lateral com informação que poderia ser inline ou contextual
- blocos laterais de "resumo da IA" ou "insights da IA" usados como preenchimento estrutural da página

A implementação deve revisar esse padrão no sistema como um todo.

---

### 5. Criar uma hierarquia global de layout mais “bloco cheio”
Quando você disse que quer algo mais “um bloco cheio”, a interpretação correta aqui é:

- páginas mais contínuas
- conteúdo principal ocupando a largura útil
- seções mais robustas dentro do fluxo principal
- agrupamento mais forte em vez de colunas paralelas frágeis
- menos sensação de mosaico

Isso não significa deixar tudo igual ou monolítico.

Significa criar páginas em que:
- a área principal respira melhor
- o conteúdo se organiza em camadas dentro de um eixo principal
- o usuário sente que a página está completa e bem resolvida

---

### 6. Definir uma nova regra para conteúdos complementares
Conteúdo complementar ainda pode existir, mas precisa seguir critérios.

Informações secundárias devem:
- ser realmente úteis
- não competir com o conteúdo principal
- aparecer inline quando fizer mais sentido
- virar drawer/accordion/section quando melhor
- virar bloco contextual e não coluna obrigatória

O layout deve parar de assumir que toda página precisa de “uma segunda metade informativa”.

---

### 7. Reorganizar as páginas em seções internas mais fortes
Em vez de duas colunas com importância parecida, as páginas devem passar a ter seções como:

- resumo principal
- filtros / ações
- conteúdo central
- blocos auxiliares contextuais
- módulos complementares abaixo, não necessariamente ao lado

Essa lógica tende a funcionar melhor para:
- dashboard
- settings
- contacts
- campaigns
- integrations
- knowledge
- logs
- storage

---

### 8. Criar uma diretriz de layout reutilizável para o app
A refatoração deve propor uma diretriz reutilizável para o sistema, por exemplo:

- `PageContainer` com largura e respiro mais consistentes
- `PageSection` para agrupamentos verticais fortes
- `ContentStack` para fluxo principal
- `ContextPanel` apenas quando houver valor real
- `MetricsHeader` para KPIs/resumos sem espalhar cards arbitrariamente

O objetivo é criar um padrão que evite retrabalho página a página.

---

### 9. Tornar Settings um bom exemplo dessa nova hierarquia
Settings deve funcionar como uma das primeiras telas a refletir esse novo modelo.

A página precisa mostrar:
- administração do workspace
- conectividade
- segurança
- billing
- prioridades de configuração
- módulos com status

mas organizados de forma mais forte, mais preenchida e mais clara.

Ela deve parecer menos um “catálogo de atalhos” e mais uma superfície administrativa séria.

---

## Diretrizes de UX
Priorizar:
- conteúdo principal com mais protagonismo
- melhor uso da largura útil
- menos redundância visual
- mais linearidade na leitura
- seções fortes em vez de colunas fracas
- clareza administrativa em Settings
- consistência entre páginas
- aparência mais premium e resolvida
- layout mais próximo do estilo das referências enviadas a partir da segunda imagem, com mais foco, mais respiro e menos blocos competindo entre si

Evitar:
- dupla coluna por padrão sem necessidade
- painéis laterais redundantes
- cards que apenas ocupam espaço
- repetição de contexto em múltiplos blocos
- páginas que parecem montadas em pedaços soltos
- sensação de produto excessivamente compartimentado
- qualquer prática de colocar "resumo do trabalho da IA" como bloco de design padrão da página

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- preservar coerência com o design system atual
- refatorar com visão sistêmica, não apenas local
- criar abstrações reutilizáveis para o novo layout
- revisar componentes compartilhados como `PageContainer`, `PageHeader`, grids e cards
- evitar grandes quebras de comportamento entre páginas
- manter responsividade real
- preparar o sistema para migração progressiva da nova hierarquia

---

## O que entregar

### 1. Diagnóstico da situação atual
Analisar:
- como Settings está estruturado hoje
- onde há redundância
- onde há blocos fracos/complementares demais
- quais páginas do sistema seguem o mesmo anti-pattern
- como a shell e o conteúdo interagem nessa sensação de fragmentação

### 2. Proposta de nova hierarquia global
Definir:
- quando usar layout full-width ou bloco principal forte
- quando usar coluna lateral e quando não usar
- como organizar seções internas
- como tratar conteúdo complementar
- como isso escala para o restante das páginas

### 3. Refatoração/implementação em Settings
Sugerir e/ou implementar mudanças reais em:
- `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`

### 4. Preparação para expansão para todas as páginas
Sugerir e/ou implementar a base para que essa nova hierarquia possa ser reaplicada em:
- dashboard
- contacts
- campaigns
- integrations
- knowledge
- logs
- storage
- outras páginas relevantes

### 5. Resumo final
Ao final, apresentar:
- o que foi reorganizado
- qual regra de layout foi definida
- quais padrões antigos devem ser evitados
- quais arquivos foram alterados
- como essa diretriz deve ser levada para o restante do produto

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- Settings estiver mais forte, menos redundante e mais administrativo de verdade
- a página usar melhor a largura e a área útil
- a estrutura “dois blocos lado a lado sem necessidade” tiver sido reduzida
- existir uma regra clara para nova hierarquia de layout do produto
- essa regra puder ser replicada em todas as páginas
- a experiência final parecer mais coesa, mais preenchida e menos confusa

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só melhorias cosméticas
- não foque apenas em estética
- priorize hierarquia visual e arquitetura de layout
- preserve coerência com o restante do app
- implemente com visão sistêmica e escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- conecta Settings com a necessidade sistêmica de refatorar layouts
- transforma a noção de “bloco cheio” em diretriz de arquitetura visual
- cria critério para uso ou remoção de colunas laterais
- organiza a mudança como padrão aplicável em todas as páginas
- prepara o produto para uma evolução visual mais coesa

---

# Nome recomendado para uso interno

Sugestões:

- `Settings + Global Layout Hierarchy`
- `Full Content Layout Refactor`
- `Page Hierarchy Convergence Prompt`
