# Master Prompt Consolidado v2 — Diretrizes Globais + Convergência de Produto

## Contexto
Este documento consolida as diretrizes globais da pasta `ui-ux-audit-v2` para orientar uma implementação unificada da próxima leva de evolução do produto.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Pasta de referência obrigatória: `/home/tylaig/repo/chat.meusuper.app/docs/implementation/ui-ux-audit-v2/`

---

# Regra crítica de uso deste documento

Este **master prompt consolidado v2 não substitui** a leitura dos arquivos específicos da pasta `ui-ux-audit-v2`.

Ele serve para:
- consolidar a visão global
- alinhar princípios comuns
- evitar contradições entre frentes
- orientar a ordem de execução
- dar contexto macro para a implementação

Mas a execução correta ainda exige analisar os arquivos específicos por domínio/página.

## Regra obrigatória
Antes de implementar qualquer frente, é obrigatório:

1. ler este arquivo consolidado
2. identificar quais arquivos específicos de `ui-ux-audit-v2` se aplicam à tarefa
3. analisar esses arquivos específicos antes de codar
4. usar este documento como camada de convergência, não como substituto do detalhamento

---

# Prompt mestre consolidado

```md
Você é um especialista sênior em **product design, UX systems, information architecture, frontend architecture, integration architecture e refatoração de produto em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Regra de leitura obrigatória
Antes de executar qualquer implementação, você deve:

1. ler este arquivo mestre consolidado
2. analisar os arquivos específicos relevantes da pasta:

`/home/tylaig/repo/chat.meusuper.app/docs/implementation/ui-ux-audit-v2/`

3. considerar que os arquivos específicos continuam sendo a fonte principal de detalhe por domínio/página
4. usar este documento apenas como convergência global de princípios, prioridades e arquitetura de experiência

Você **não pode** tratar este master prompt como substituto único da documentação detalhada.

---

## Objetivo geral
Conduzir uma evolução ampla do produto para um estado mais:

- premium
- coerente
- operacional
- escalável
- focado em produtos digitais
- orientado a apps, agentes, canais, audiência, analytics e automação real

A meta é sair de uma experiência ainda fragmentada, parcialmente mockada ou inconsistente e convergir para um sistema mais maduro, com melhor hierarquia visual, melhor UX e melhor arquitetura funcional.

---

## Princípios globais obrigatórios

### 1. Abolir blocos de “resumo do trabalho da IA” como estrutura de página
É obrigatório eliminar a prática de usar blocos de:
- resumo da IA
- resumo do trabalho da IA
- insights da IA usados apenas como preenchimento estrutural

Esses blocos não devem servir como padrão visual da página.

Se insights/IA existirem, devem aparecer:
- com propósito real
- integrados ao contexto
- sem poluir a hierarquia principal
- sem ocupar uma segunda coluna redundante por padrão

---

### 2. Reduzir o padrão de duas colunas lado a lado quando a segunda for redundante
A arquitetura visual do produto deve deixar de depender do padrão:
- conteúdo principal de um lado
- bloco complementar redundante do outro

Esse padrão só pode continuar quando houver valor operacional forte.

O novo padrão preferencial deve ser:
- bloco principal mais forte
- layout mais cheio
- seções verticais melhor organizadas
- maior protagonismo do conteúdo central
- menos fragmentação

A referência de direção é o espírito das imagens enviadas a partir da segunda imagem, e não o estado atual representado pela primeira.

---

### 3. Adotar uma clareza de shell/layout inspirada em produtos como OpenAI
A referência não é copiar visualmente a OpenAI, mas absorver princípios como:
- foco no conteúdo
- menos ruído
- mais respiro
- hierarquia mais clara
- menos competição entre elementos
- navegação mais previsível
- uso mais disciplinado do espaço

Esses princípios devem orientar:
- sidebar
- topbar
- layout global
- headers de página
- seções internas

---

### 4. Priorizar produto real em vez de UI conceitual
Toda implementação deve perguntar:
- isso parece um produto real em produção?
- isso ajuda operação de verdade?
- isso está funcionalmente claro?
- isso é mais do que uma vitrine bonita?

Evitar:
- blocos sem função real
- cartões decorativos demais
- excesso de labels sem consequência
- menus que parecem existir só porque “ficam bonitos”

---

### 5. Foco estrutural em produtos digitais
A plataforma precisa refletir foco em:
- produtos digitais
- catálogo de produtos
- entrega/acesso digital
- eventos digitais
- analytics de produtos digitais
- pedidos com lógica de acesso/fulfillment digital

Isso afeta especialmente:
- Dashboard
- Products
- Orders
- Shopify import
- Analytics/Insights

---

### 6. Tratar Apps como superfície principal e Providers como camada de conexão
A arquitetura do produto deve convergir para:

- **Apps** = superfície principal e visível
- **Providers** = camada de autenticação/configuração/conexão
- **Actions/Tools** = capacidades disponibilizadas pelos apps
- **Channels** = domínio operacional de comunicação

Essa distinção deve aparecer claramente na UX.

---

### 7. Agentes devem concentrar suas próprias configurações
No AI Studio:
- as configurações do agente devem ficar dentro do agente
- triggers, voz, tools/apps, debounce, split, timing, integrações e acesso à knowledge devem ser controlados no contexto do agente

Mas:
- a base de conhecimento continua sendo um domínio separado
- o agente consome a knowledge base, não administra toda a estrutura dela

---

### 8. Knowledge deve ser um domínio forte de ingestão e grounding
Knowledge precisa suportar:
- URL
- site
- scraping futuro
- scan/indexação futura
- upload de arquivos
- entrada manual
- Markdown moderno
- progresso de ingestão
- retrieval testing

---

### 9. Observabilidade, webhooks, canais e logs precisam sair da fase básica
Os domínios abaixo devem deixar de parecer rascunhos:
- Logs
- Webhooks
- Channels
- Providers
- Apps/Integrations

Eles precisam ganhar:
- filtros mais robustos
- debug
- teste
- estados claros
- ligação com ações/automações
- experiência operacional de verdade

---

### 10. Reuso sistêmico de modais, overlays e formulários async
O sistema deve consolidar padrões reutilizáveis para:
- modais
- drawers
- dialogs
- async selects
- preload em inputs
- validação de configuração
- flows de create/edit/test

Nada disso deve ficar reinventado por página.

---

## Frentes macro da atualização

### Shell + Layout global
- sidebar mais clara
- topbar menos confusa
- revisão da arquitetura de navegação
- auditoria de páginas ausentes ou mal representadas
- AI Studio e outras superfícies principais precisam estar corretamente refletidas

### Dashboard + Analytics + Insights
- Dashboard vira hub analítico principal
- Analytics atual é absorvido
- Insights são integrados à leitura principal
- foco em produtos digitais
- suporte a eventos customizados/webhooks para métricas quando necessário

### Inbox
- lateral reorganizada em Detalhes + Histórico
- IA + detalhes do contato unificados
- nova conversa premium
- modo foco/full screen
- responsividade e scroll corrigidos
- ações da conversa mais maduras

### Contacts + Audience
- módulo Audience próprio
- contatos com visualização lista + kanban
- etapas/pipeline configuráveis
- filtros avançados
- tags e contact fields como base estrutural
- funil e segmentação

### Apps / Integrations / Providers / Channels / Webhooks
- Apps como tela principal
- Providers como camada de conexão
- Channels com foco inicial em WhatsApp Cloud
- triggers + actions por canal
- Webhooks com editor, debug, teste e vínculo com ações/automações
- locked states elegantes

### Products + Orders
- Products como novo domínio de catálogo
- Shopify como fonte de importação
- Orders com foco em produtos digitais
- preview mais rica com detalhes sob demanda
- entrega/acesso digital

### AI Studio + Knowledge
- studio de agentes mais completo
- knowledge expandida com ingestão moderna
- scraping/site/url/manual markdown
- tools/apps/voz/triggers/timings por agente

### Storage + Logs + Settings
- Storage unificado como explorer de assets
- Logs mais diretos, com filtros, multiselect e busca clara
- Settings como centro administrativo real
- Contact Fields + Tags alinhados em Settings

---

## Diretrizes obrigatórias de UX

### Navegação
- clara
- previsível
- hierarquizada
- com itens principais visíveis de verdade

### Layout
- menos colunas redundantes
- mais bloco principal forte
- mais respiro
- menos mosaico de cards concorrentes

### Filtros
- mais diretos
- objetivos
- com busca real
- quando fizer sentido, com multiselect dropdown

### Estados
- loading, empty, error, degraded e locked precisam ser bem resolvidos

### Profundidade
- detalhes devem ir para popup, drawer, modal ou inspector quando isso preservar a limpeza da superfície principal

### Linguagem visual
- consistente
- menos ruído
- mais foco
- menos excesso de badges e micro-blocos decorativos

---

## O que evitar globalmente
- “resumo da IA” como card estrutural padrão
- layouts lado a lado sem valor real
- telas enroladas e pouco objetivas
- filtros espalhados ou fracos
- excesso de técnica crua na primeira camada da UI
- tabelas densas sem estratégia de detalhe sob demanda
- blocos redundantes ocupando espaço nobre

---

## Como usar este master prompt na prática
Para qualquer tarefa:

1. identifique o domínio/página
2. abra os arquivos específicos relevantes em `ui-ux-audit-v2`
3. aplique estas diretrizes globais como restrição superior
4. só então proponha ou implemente mudanças

Exemplos:
- Shell → ler `00-APP-SHELL...`
- Dashboard → ler `02-DASHBOARD...`
- Inbox → ler `01-INBOX...`
- Contacts/Audience → ler `03-CONTACTS-AUDIENCE...`
- Apps/Providers/Channels/Webhooks → ler os arquivos `08-*` e `13-CHANNELS...`
- AI Studio/Knowledge → ler `11-*`
- Products/Orders → ler `12-*`
- Settings/Layout → ler `13-SETTINGS...`
- Logs/Storage → ler `14-*` e `15-*`

---

## Entrega esperada ao usar este master prompt
Toda entrega deve:
- citar quais arquivos específicos de `ui-ux-audit-v2` foram analisados
- respeitar as diretrizes globais deste documento
- explicar como a solução evita os anti-patterns já identificados
- manter coerência com o foco em produtos digitais e arquitetura premium de produto

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- use este documento como convergência global
- mas sempre analise os arquivos específicos relevantes antes de implementar
```

---

# Observação final

Este arquivo consolida a visão macro, mas **não elimina a necessidade de leitura dos arquivos específicos da pasta `ui-ux-audit-v2`**.

Ele existe para evitar perda de alinhamento entre frentes, não para reduzir a análise necessária.
