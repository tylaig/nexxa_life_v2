# App Shell — Prompt Refinado para Sidebar, Topbar e Layout com Mais Clareza

## Contexto
Este documento define a próxima leva de melhorias para a **shell global da aplicação** — especialmente:

- barra lateral
- barra superior
- estrutura de layout
- distribuição espacial
- clareza de navegação
- redução de ruído visual

A intenção é aproximar a experiência de uma interface mais **limpa, clara, focada e menos confusa**, inspirada em produtos com alta legibilidade operacional, como a experiência de navegação da OpenAI, sem copiar visualmente de forma literal.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Layout principal do app: `/home/tylaig/repo/chat.meusuper.app/app/(app)/layout.tsx`
- Sidebar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-sidebar.tsx`
- Topbar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-topbar.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, information architecture, navigation systems e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfícies alvo
- Layout principal do app: `/home/tylaig/repo/chat.meusuper.app/app/(app)/layout.tsx`
- Sidebar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-sidebar.tsx`
- Topbar principal: `/home/tylaig/repo/chat.meusuper.app/components/app-shell/app-topbar.tsx`

## Objetivo geral
Refatorar a **shell global da aplicação** para que a experiência fique:

- mais limpa
- mais clara
- menos confusa
- mais focada
- mais fácil de escanear
- mais consistente
- mais próxima da sensação de simplicidade e clareza que produtos como a OpenAI costumam transmitir em sua navegação

A referência aqui não é copiar o visual da OpenAI literalmente. A meta é absorver os princípios de UX que fazem a navegação parecer mais elegante e menos carregada, seguindo especialmente o espírito das referências enviadas a partir da segunda imagem, como:

- foco no conteúdo principal
- menos ruído visual
- navegação mais previsível
- menos competição entre elementos
- mais clareza entre primário e secundário
- melhor uso de espaço
- layout que respira melhor
- superfícies mais limpas e menos dependentes de blocos lado a lado sem necessidade

---

## Problema atual a resolver
A sidebar, a topbar e o layout geral precisam parecer menos densos e menos confusos.

A shell atual deve ser revisada porque pode transmitir problemas como:
- excesso de seções competindo entre si
- mistura de navegação primária, secundária e administrativa
- barra superior com elementos demais ou pouco hierarquizados
- sensação de produto mais pesado do que precisa
- muitos elementos com o mesmo peso visual
- layout que não conduz bem o olhar do usuário

A missão é reorganizar a shell para deixar o produto com uma base mais forte antes das próximas levas de melhoria por página.

---

## Escopo das melhorias

### 1. Refatorar a barra lateral para ficar mais clara e menos confusa
A sidebar deve ser redesenhada/reorganizada para transmitir uma navegação mais limpa.

Objetivos:
- reduzir ruído visual
- simplificar agrupamentos
- melhorar escaneabilidade
- separar melhor navegação principal, operacional e administrativa
- reduzir a sensação de “muitos itens disputando atenção ao mesmo tempo”

### O que revisar na sidebar
- agrupamento das seções
- ordem dos itens
- excesso de labels e subdivisões
- repetição visual
- badges desnecessários ou permanentes
- peso dos ícones
- relação entre rotas principais e subrotas
- experiência no modo colapsado
- clareza do estado ativo
- consistência entre itens primários e secundários

### Direção esperada
A sidebar deve parecer:
- mais silenciosa
- mais objetiva
- mais previsível
- mais premium
- mais editorial e menos poluída

Ela precisa se aproximar de uma navegação onde o usuário bate o olho e entende rapidamente:
- onde está
- para onde pode ir
- o que é principal
- o que é configuração/administração

---

### 2. Refatorar a barra superior para reduzir confusão e excesso de elementos
A topbar atual deve ser revista com foco em:

- simplificação
- melhor hierarquia
- redução de ruído
- foco no contexto da página

### O que revisar na topbar
- relação entre título, subtítulo e ações
- excesso de elementos na barra superior
- centralidade e utilidade real do campo de busca
- coerência dos ícones de ajuda, notificações, tema e usuário
- competição visual entre ações globais e ações da página
- comportamento em telas menores

### Direção esperada
A topbar deve funcionar como uma barra de contexto e utilidade leve, e não como um painel congestionado.

Ela deve:
- contextualizar a página atual
- permitir acesso a poucos controles globais realmente úteis
- não brigar com o conteúdo principal
- respirar melhor
- ter ações mais intencionais

Se necessário, parte das ações hoje expostas pode ser simplificada, movida ou reorganizada.

---

### 3. Melhorar o layout global para priorizar conteúdo e foco
O layout geral deve ser ajustado para dar mais espaço ao conteúdo principal e tornar a navegação mais leve.

### O que revisar no layout
- distribuição entre sidebar e área principal
- largura útil do conteúdo
- respiro lateral
- sensação de densidade excessiva
- excesso de bordas, divisões ou recortes visuais
- sticky elements que criam peso desnecessário
- relação entre shell e páginas internas

### Objetivo
O app deve parecer menos compartimentado e menos carregado.

O layout precisa:
- valorizar a leitura da página
- deixar a navegação disponível sem dominar a tela
- criar uma base mais elegante para os módulos internos
- melhorar a sensação de continuidade entre shell e conteúdo

---

### 4. Separar com mais clareza navegação primária, secundária e administrativa
Hoje a shell deve ser revisada para deixar muito claro o que pertence a:

- navegação principal do produto
- superfícies operacionais
- inteligência/IA
- crescimento/comercial
- administração/configuração

A arquitetura de informação precisa ficar mais clara.

O usuário não deve sentir que tudo tem o mesmo peso ou que precisa interpretar demais para saber onde cada coisa se encaixa.

### Requisito adicional: revisar páginas ausentes ou mal representadas na barra lateral
Durante esta atualização, é obrigatório auditar a navegação lateral para verificar:

- quais páginas principais do produto existem hoje
- quais estão ausentes da sidebar
- quais estão escondidas em lugares pouco intuitivos
- quais estão em seções erradas
- quais deveriam aparecer como entrada principal
- quais deveriam aparecer como subitens

Exemplo importante já identificado:
- a página **AI Studio** existe no produto, mas hoje não está representada de forma clara na barra lateral principal

Essa auditoria deve cobrir especialmente a seção de **Inteligência**, validando a presença e a posição correta de páginas como:
- AI Studio
- Skills
- Knowledge
- Analytics
- Agentes, se houver entrada própria
- outras superfícies relacionadas a IA que já existam no app

A implementação deve garantir que essas melhorias de arquitetura de navegação fiquem contempladas nesta atualização, e não apenas documentadas como possibilidade futura.

---

### 5. Reduzir badges, indicadores e elementos visuais que criam ruído
Badges, bolinhas, contadores e indicadores visuais devem ser revistos com critério.

Só devem permanecer quando:
- forem realmente úteis
- comunicarem urgência ou status relevante
- ajudarem a priorização

Evitar elementos decorativos ou persistentes que tornam a navegação mais carregada.

---

### 6. Tornar o estado ativo e a navegação mais elegantes
A navegação ativa deve parecer mais refinada e menos barulhenta.

Revisar:
- cor de destaque
- fundo ativo
- peso visual do item ativo
- hover states
- contraste
- experiência com item expandido vs colapsado

O resultado deve parecer sofisticado, silencioso e fácil de entender.

---

### 7. Reorganizar a hierarquia da shell com foco em clareza operacional
A shell deve ser pensada como base de um produto com muitos módulos, mas isso não significa exibir tudo com a mesma intensidade.

A organização deve deixar clara uma lógica como:

- núcleo principal
- operações
- crescimento
- inteligência
- administração

Se necessário, reduzir agrupamentos excessivos e simplificar a árvore.

---

### 8. Aproximar a sensação da OpenAI em termos de clareza, não de cópia visual
A referência à OpenAI deve ser interpretada como princípios:

- menos barulho
- mais foco no conteúdo
- layout respirando melhor
- navegação intuitiva
- menos ornamentação desnecessária
- melhor equilíbrio entre estrutura e simplicidade

Não copiar literalmente:
- espaçamentos sem contexto
- ícones sem aderência ao produto
- visual minimalista vazio

A adaptação deve respeitar a identidade do projeto, mas ganhar maturidade de UX.

---

## Diretrizes de UX
Priorizar:
- clareza
- redução de ruído
- foco no conteúdo
- boa hierarquia de navegação
- leitura rápida
- elegância operacional
- consistência entre páginas
- sensação premium e mais madura

Evitar:
- sidebar excessivamente carregada
- topbar congestionada
- muitos blocos visuais competindo
- exagero de bordas, pills, badges e labels
- menus que exigem esforço para entender
- shell chamando mais atenção que o conteúdo
- uso de blocos de "resumo da IA" como parte estrutural padrão do layout
- padrão de duas colunas lado a lado quando a segunda só serve como resumo redundante

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- preservar a coerência com o design system atual
- melhorar a shell sem quebrar a integração com as páginas internas
- extrair componentes reutilizáveis quando necessário
- não concentrar lógica demais em um único arquivo
- revisar estados colapsado, expandido e responsivo da sidebar
- revisar comportamento sticky/fixed da topbar com critério
- preparar a shell para crescimento futuro do produto

---

## O que entregar

### 1. Diagnóstico da shell atual
Analisar:
- problemas de hierarquia
- ruídos visuais
- excesso de seções
- problemas de navegação
- problemas de clareza entre sidebar, topbar e conteúdo

### 2. Proposta de reorganização
Definir:
- como a sidebar deve ser reorganizada
- como a topbar deve ser simplificada
- como o layout deve respirar melhor
- como separar principal vs secundário vs admin

### 3. Refatoração/implementação frontend
Sugerir e/ou implementar mudanças reais em:
- `app/(app)/layout.tsx`
- `components/app-shell/app-sidebar.tsx`
- `components/app-shell/app-topbar.tsx`

### 4. Resumo final
Ao final, apresentar:
- o que foi simplificado
- o que foi removido ou reduzido
- o que foi reorganizado
- quais arquivos foram alterados

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- a sidebar estiver visualmente mais limpa e menos confusa
- a topbar estiver mais leve e hierarquizada
- o layout global der mais protagonismo ao conteúdo principal
- a separação entre navegação principal, operacional e administrativa estiver mais clara
- a shell como um todo parecer mais premium e madura
- a experiência lembrar os princípios de clareza da OpenAI sem parecer cópia superficial

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só sugestões vagas
- não foque apenas em estética
- priorize arquitetura de navegação e clareza operacional
- preserve a identidade do projeto
- implemente com visão de escalabilidade
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma a crítica genérica em objetivo claro de UX
- separa sidebar, topbar e layout em frentes concretas
- traduz a referência à OpenAI para princípios utilizáveis
- evita cópia visual rasa
- cria base para refatorar a shell inteira com mais maturidade

---

# Nome recomendado para uso interno

Sugestões:

- `App Shell Clarity Refactor`
- `OpenAI-like Clarity Shell Prompt`
- `Navigation Simplification Next Wave`
