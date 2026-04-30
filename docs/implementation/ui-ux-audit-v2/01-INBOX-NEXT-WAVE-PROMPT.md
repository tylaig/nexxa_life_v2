# Inbox — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este prompt define a próxima leva de melhorias da página de **Inbox** do projeto `chat.meusuper.app`, com foco em:

- experiência premium e moderna
- ergonomia operacional real
- responsividade correta
- melhor uso do espaço
- consolidação de contexto do contato
- melhoria do fluxo de nova conversa
- modo foco / full screen para atendimento
- refinamento funcional das ações da conversa

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota alvo: `/inbox`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/inbox/page.tsx`
- View principal: `/home/tylaig/repo/chat.meusuper.app/components/inbox/inbox-app.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, design systems, arquitetura frontend e refatoração React/Next.js**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Página alvo
- Rota: `/inbox`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/inbox/page.tsx`
- View principal da inbox: `/home/tylaig/repo/chat.meusuper.app/components/inbox/inbox-app.tsx`

## Objetivo geral
Implementar a próxima leva de melhorias da **Inbox**, elevando a experiência para um padrão mais **moderno, premium, funcional e operacional**, com foco em produtividade, contexto do contato e ergonomia de uso contínuo.

A implementação não deve ser apenas cosmética. Ela precisa melhorar a arquitetura de navegação interna da inbox, o aproveitamento de espaço, a clareza do contexto do contato e a usabilidade de fluxos importantes como nova conversa, ações da conversa e modo foco.

---

## Escopo das melhorias

### 1. Unificar IA + detalhes do contato no painel lateral da conversa
Hoje existe separação entre contexto de IA e detalhes do contato. Isso deve ser reorganizado para formar uma experiência mais coerente.

Implementar no painel lateral da conversa uma navegação com **2 abas principais**:

- **Detalhes**
- **Histórico**

### Aba: Detalhes
A aba **Detalhes** deve consolidar em uma única superfície:

- dados do contato
- informações operacionais do perfil
- contexto de IA
- sinais de RAG quando aplicável
- insights relevantes para o atendimento
- informações resumidas que ajudem a responder melhor o contato

Essa aba deve parecer um **cockpit unificado do contato**, e não vários blocos desconectados.

O objetivo é reduzir fragmentação entre:
- dados do contato
- inteligência contextual
- recomendações de IA
- contexto de negócio

### Aba: Histórico
A aba **Histórico** deve centralizar a linha do tempo e relacionamentos do contato.

Ela deve permitir visualizar, de forma mais refinada e organizada:

- atividades do contato
- interações relevantes
- automações vinculadas
- pedidos vinculados
- eventos importantes relacionados ao contato

Se parte disso já existe, a missão é **melhorar a organização, hierarquia visual e legibilidade**, e não apenas duplicar o conteúdo atual.

A aba Histórico deve transmitir sensação de **timeline operacional real**, com boa escaneabilidade e agrupamento por tipo de evento.

---

### 2. Ajustar responsividade, altura útil e comportamento de scroll
A Inbox precisa ser corrigida para funcionar melhor em diferentes tamanhos de tela e usar corretamente a altura disponível.

Melhorias obrigatórias:

- revisar proporção full-height da tela
- corrigir distribuição vertical entre header, lista, thread e painel lateral
- eliminar áreas que “quebram” o fluxo visual ou desperdiçam espaço
- garantir que os painéis rolem corretamente sem afetar a estrutura geral
- revisar comportamento de scroll independente por coluna/painel quando necessário
- evitar múltiplos scrolls confusos na mesma área

Também revisar a **aba de visualizações/filtros/visões** da inbox para garantir que:

- tenha scroll quando necessário
- não corte opções
- se comporte bem em resoluções menores
- permaneça utilizável com listas extensas

O objetivo é a Inbox parecer realmente **full, estável, densa na medida certa e proporcional**.

---

### 3. Melhorar a área de caixas / números / canais de entrada
A área hoje relacionada a “caixas” e “números” deve ser refinada para refletir melhor a estrutura real dos canais.

Essa área deve representar de forma mais clara as **caixas de entrada e canais nativos**, incluindo exemplos como:

- WhatsApp
- Instagram
- Facebook
- Webchat
- Email
- demais canais nativos já suportados ou compatíveis com o conceito atual

A melhoria deve:

- tornar a nomenclatura mais clara
- deixar visualmente mais compreensível a ideia de inbox por canal/caixa
- preparar a interface para múltiplos tipos de entrada
- melhorar a navegação/filtro por canal

A ideia é que o usuário entenda com facilidade que está filtrando ou navegando por **caixas operacionais de entrada**, não apenas por números.

---

### 4. Criar uma experiência moderna e premium para “Nova conversa”
A criação de nova conversa precisa evoluir para uma experiência mais forte e mais funcional.

Implementar uma visualização nova, moderna e premium para iniciar conversa, permitindo:

- selecionar o contato
- buscar ou escolher o contato de forma clara
- selecionar template quando necessário
- iniciar a mensagem a partir do template escolhido
- deixar claro o canal/caixa/remetente usado no início da conversa

Essa experiência deve parecer um **composer de abertura de conversa**, e não um modal simples ou formulário cru.

Objetivos da melhoria:

- reduzir atrito para iniciar atendimento outbound
- melhorar clareza do fluxo
- reforçar contexto do canal/template
- aumentar a percepção de produto premium

Também considerar:

- preview do template
- estado vazio quando não houver template
- estados de loading e busca do contato
- validações antes de iniciar a conversa

---

### 5. Melhorar e deixar funcionais todas as opções da conversa
Revisar e melhorar a experiência funcional da conversa, incluindo ações e menus contextuais.

Isso inclui:

- revisar todas as ações visíveis na conversa
- melhorar clareza e agrupamento dos botões
- revisar e tornar útil a experiência dos **3 pontinhos / menu de ações**
- organizar melhor ações primárias vs secundárias
- remover sensação de ação placeholder ou incompleta

As ações devem transmitir controle operacional real, como por exemplo:

- resolver
- pausar / snooze
- assumir / reatribuir
- adicionar nota
- iniciar automação
- usar IA
- abrir contexto relacionado
- alternar modos da interface

Se alguma dessas ações ainda for parcial, a interface deve pelo menos parecer coerente, consistente e preparada para expansão.

---

### 6. Criar um modo foco / full screen da conversa
Implementar uma visualização **full screen / modo foco** para a conversa.

Nesse modo, o objetivo é exibir **principalmente o chat**, reduzindo distrações e favorecendo atendimento intenso.

Características esperadas:

- esconder ou reduzir navegação lateral quando necessário
- destacar a thread como área principal
- permitir expandir a conversa para foco total
- preservar acesso aos principais controles do atendimento
- manter experiência fluida para leitura e resposta

Esse modo deve ser otimizado para operação contínua e pode incluir:

- indicador de online/offline
- controles de notificações
- estado do agente
- status da conversa
- pequenas preferências operacionais visíveis no modo foco

A implementação deve ser pensada como recurso real de produtividade, e não apenas como “expandir visualmente”.

---

## Diretrizes de UX
A Inbox deve evoluir para parecer:

- mais premium
- mais densa de forma organizada
- mais funcional para operação diária
- menos fragmentada
- mais orientada a contexto e produtividade

Priorizar:

- escaneabilidade
- hierarquia visual forte
- clareza do que é principal e secundário
- contexto útil sem poluição
- ergonomia de uso prolongado
- consistência entre listas, painel lateral, thread e ações

Evitar:

- excesso de blocos com peso igual
- múltiplos painéis sem narrativa clara
- scroll quebrado ou redundante
- menus com ações pouco claras
- telas que parecem mock conceitual em vez de produto real

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- preservar coerência com o design system atual do projeto
- melhorar componentização quando fizer sentido
- evitar lógica excessiva em um único componente gigante
- extrair componentes reutilizáveis quando necessário
- manter responsividade real
- revisar comportamento de altura, overflow e scroll com cuidado
- preservar compatibilidade com o restante da shell da aplicação
- preparar a Inbox para futuras extensões sem acoplamento desnecessário

---

## O que entregar
A entrega deve incluir:

### 1. Diagnóstico objetivo da tela atual
Antes de alterar, identificar:
- limitações da estrutura atual
- problemas de UX
- pontos fracos de layout
- problemas de scroll/responsividade
- partes que parecem incompletas ou pouco premium

### 2. Plano de melhoria
Organizar as melhorias por blocos:
- painel lateral
- histórico
- nova conversa
- ações da conversa
- modo foco
- responsividade e scroll
- canais/caixas

### 3. Refatoração de componentes
Sugerir e/ou implementar extrações como:
- painel lateral com tabs
- detalhes do contato + IA
- timeline de histórico
- composer de nova conversa
- action menu da conversa
- layout mode/focus mode controller

### 4. Implementação real no código
Fazer mudanças concretas no código, não apenas sugestões.

### 5. Resumo final
Ao final, apresentar:
- o que foi melhorado
- quais arquivos foram alterados
- quais partes ficaram preparadas para próximas iterações

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- a lateral da conversa estiver reorganizada em **Detalhes** e **Histórico**
- a aba Detalhes consolidar contexto do contato + IA/RAG de forma mais coerente
- a aba Histórico estiver melhor estruturada para atividades, automações e pedidos
- a Inbox estiver com altura e scroll corrigidos de forma consistente
- a área de visualizações/filtros suportar scroll corretamente
- a parte de caixas/canais estiver mais clara e preparada para múltiplos canais nativos
- a experiência de **Nova conversa** estiver mais premium e funcional
- o menu de ações da conversa estiver mais claro e melhor resolvido
- existir um **modo foco/full screen** realmente útil
- a experiência geral da Inbox parecer mais madura, premium e operacional

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só ideias superficiais
- não foque apenas em estética
- priorize UX operacional real
- preserve consistência com a arquitetura do app
- implemente com visão de escalabilidade
```

---

# Resumo da evolução deste prompt

Esta versão melhora o prompt original porque:

- organiza o escopo por temas claros
- remove ambiguidades e frases soltas
- transforma intenção em objetivos implementáveis
- explicita critérios de aceite
- inclui caminhos reais da página
- orienta tanto UX quanto refatoração técnica
- prepara a execução para uma próxima leva de melhorias realista

---

# Nome recomendado para uso interno

Sugestão de referência desta versão:

- `Inbox Next Wave`
- `Inbox v2 UX Refactor Prompt`
- `Inbox Premium Operations Upgrade`
