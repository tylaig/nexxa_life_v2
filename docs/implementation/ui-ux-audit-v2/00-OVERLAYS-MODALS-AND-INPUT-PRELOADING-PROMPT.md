# Overlays, Modais e Input Preloading — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define uma frente transversal de melhoria para o produto, cobrindo:

- modais
- popups
- dialogs
- drawers
- overlays
- experiência de formulários
- carregamento prévio de dados em inputs
- loading states e preloading em campos interativos

A necessidade principal é deixar essas superfícies:

- mais modernas
- mais centradas
- mais premium
- mais consistentes
- menos improvisadas
- melhores para fluxos reais de criação, edição, seleção e confirmação

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Design system / app shell e páginas diversas do app usam dialogs, forms e componentes compartilhados

---

# Prompt final

```md
Você é um especialista sênior em **UI/UX, product design, design systems, interaction design e refatoração frontend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Objetivo geral
Refatorar o padrão global de **modais, popups, dialogs, overlays e inputs com carregamento de dados**, para deixar o produto com uma experiência:

- mais moderna
- mais centrada
- mais clara
- mais elegante
- mais consistente
- mais confortável para uso real em produção

A ideia é criar um padrão mais forte para interações temporárias e formulários carregados dinamicamente, reduzindo a sensação de UI improvisada ou utilitária demais.

---

## Escopo das melhorias

### 1. Tornar modais e popups mais modernos e mais centrados
Os modais/popups/dialogs precisam ter uma presença visual melhor resolvida.

A direção esperada é:
- modais mais centrados
- melhor uso de espaço
- hierarquia visual mais forte
- melhor relação entre título, corpo e ações
- visual mais premium
- menos sensação de “caixa genérica flutuando”

### O que revisar nos modais
- posicionamento central
- largura ideal por tipo de uso
- altura e comportamento quando o conteúdo cresce
- backdrop/overlay
- espaçamento interno
- header do modal
- footer com ações
- alinhamento das CTAs
- responsividade
- scroll interno
- clareza entre modal pequeno, modal médio e modal expandido

### Direção esperada
Os modais devem parecer componentes deliberados de produto, não apenas containers neutros.

Eles precisam funcionar bem para:
- criar registro
- editar registro
- selecionar item
- confirmar ação
- configurar opções
- revisar preview
- iniciar fluxos

---

### 2. Melhorar a sensação visual e espacial dos overlays
Além do modal em si, a camada de overlay deve ser revista.

Isso inclui:
- backdrop mais refinado
- melhor foco visual no conteúdo central
- menos ruído de fundo
- sensação mais premium ao abrir um diálogo
- transições mais suaves e controladas

A intenção é que abrir um modal transmita foco e contexto, não só interrupção.

---

### 3. Padronizar tipos de modal por intenção
O sistema deve caminhar para uma taxonomia mais clara de overlays, por exemplo:

- **confirm modal**
- **form modal**
- **selection modal**
- **preview modal**
- **full-screen modal / expanded modal**
- **side drawer** quando o caso pedir inspeção lateral

Nem tudo deve ser resolvido com o mesmo tipo de popup.

A implementação deve definir quando usar:
- modal central
- drawer lateral
- popup pequeno
- full screen dialog

---

### 4. Melhorar formulários dentro de modais
Muitos modais devem conter formulários, então a experiência precisa ser robusta.

Melhorias esperadas:
- melhor hierarquia dos campos
- labels mais claros
- agrupamento por seção
- descrições curtas úteis
- validação mais elegante
- ações principais bem posicionadas
- melhor uso do espaço para selects, buscas e inputs longos

O modal não deve parecer só um formulário empilhado sem ritmo visual.

---

### 5. Implementar preloading nos inputs
É necessário melhorar a experiência de inputs que dependem de dados carregados.

Aqui, “preloading nos inputs” deve ser tratado como uma UX robusta para campos que:
- carregam opções remotamente
- dependem de dados prévios
- fazem autocomplete
- fazem busca dinâmica
- carregam valores iniciais assíncronos
- dependem de contexto antes de liberar interação

### O que isso deve incluir
- loading state claro dentro do input/componente
- skeleton ou placeholder adequado quando necessário
- estado de “carregando opções”
- pré-preenchimento quando houver valores iniciais
- feedback visual enquanto dados estão sendo buscados
- desabilitar corretamente quando ainda não for possível interagir
- evitar sensação de campo vazio sem contexto

---

### 6. Melhorar selects, comboboxes e campos de busca assíncronos
Em muitos casos, o problema de preloading aparece em:
- selects
- comboboxes
- campos de busca de contato
- seleção de template
- seleção de audiência
- seleção de integração
- filtros avançados

Esses componentes precisam suportar:
- estado de loading
- estado vazio
- estado sem resultado
- estado pré-carregado
- busca incremental
- valor já selecionado com contexto visual suficiente

---

### 7. Melhorar experiência de abertura de modal com dados já sendo carregados
Quando um modal abre e depende de dados externos, a UX não pode parecer quebrada.

É preciso projetar estados como:
- modal abre com skeleton estruturado
- seções já aparecem com placeholders corretos
- CTA fica desabilitada até o mínimo necessário carregar
- mensagem de loading contextual aparece quando necessário
- o usuário entende que o sistema está preparando a interface

A experiência deve parecer intencional e estável.

---

### 8. Melhorar confirmação e fechamento
Os modais também devem ter UX melhor para:
- cancelar
- confirmar
- fechar
- voltar
- evitar perda acidental de dados
- comunicar sucesso/erro após submissão

O footer de ações deve ser consistente, legível e previsível.

---

### 9. Criar padrão reutilizável para o sistema inteiro
Essa melhoria não deve ser local. Ela precisa virar base para o sistema todo.

A implementação deve preparar padrões reutilizáveis para:
- dialogs centrais
- drawers
- modal forms
- async selects
- autocomplete com loading
- fields com preload
- confirmação de ação

A meta é evitar que cada página implemente popup/input loading de um jeito diferente.

---

## Diretrizes de UX
Priorizar:
- foco visual no conteúdo do modal
- melhor centralização
- ritmo visual interno
- campos mais claros
- loading states explícitos e elegantes
- interação confiável
- consistência entre overlays do sistema
- aparência premium e moderna

Evitar:
- modais pequenos demais ou apertados
- campos vazios enquanto dados ainda carregam sem indicação
- popups desalinhados ou com peso visual fraco
- múltiplos padrões diferentes para o mesmo tipo de interação
- footers confusos com ações mal hierarquizadas
- sensação de “form jogado dentro de uma caixa”

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- preservar coerência com o design system atual
- criar abstrações reutilizáveis para modal/dialog/form overlay
- revisar componentes de input assíncrono e select quando necessário
- tratar loading state como parte do componente, não como remendo externo
- manter responsividade real
- manter acessibilidade: foco, teclado, aria, fechamento, ordem tab
- preparar esses padrões para uso em várias páginas do sistema

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- como os modais/popups estão aparecendo hoje
- quais parecem menos modernos ou menos centrados
- onde os formulários ficam fracos dentro de dialogs
- onde faltam loading states nos inputs
- onde campos assíncronos parecem vazios ou quebrados

### 2. Proposta de padrão global
Definir:
- tipos de modal
- largura e comportamento por contexto
- padrões de header/body/footer
- padrões de overlay
- padrões para inputs assíncronos e preload

### 3. Refatoração/implementação frontend
Sugerir e/ou implementar mudanças reais em:
- dialogs compartilhados
- overlays
- modais de criação/edição
- selects/autocomplete com loading
- campos que precisam de preload de dados

### 4. Resumo final
Ao final, apresentar:
- o que foi modernizado
- o que foi centralizado
- como ficou o padrão de preload nos inputs
- quais arquivos foram alterados
- como o padrão deve ser reutilizado no restante do app

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- os modais parecerem mais modernos e mais centrados
- o sistema tiver uma lógica mais consistente para overlays
- formulários em modais estiverem mais claros e melhor estruturados
- inputs assíncronos tiverem loading/preloading bem resolvidos
- selects/comboboxes dinâmicos comunicarem carregamento corretamente
- a experiência geral de popups e formulários parecer mais premium e estável

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- priorize UX real de interação
- preserve coerência com o app existente
- implemente com visão sistêmica e reutilizável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma “modais mais modernos” em critérios concretos de design e interação
- interpreta “preloading nos inputs” como padrão robusto para campos assíncronos
- organiza isso como sistema reutilizável, não como ajuste isolado
- prepara overlays, dialogs e formulários para um nível mais premium

---

# Nome recomendado para uso interno

Sugestões:

- `Overlays + Input Preloading`
- `Modal System Upgrade`
- `Dialogs and Async Fields UX Refactor`
