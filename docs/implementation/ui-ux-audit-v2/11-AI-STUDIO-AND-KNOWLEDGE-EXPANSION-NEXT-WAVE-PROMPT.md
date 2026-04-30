# AI Studio + Knowledge Expansion — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para **AI Studio** e **Base de Conhecimento**, transformando essas áreas em um hub mais completo de IA operacional, agentes, RAG, ingestão de conteúdo e configuração de capacidades.

A meta é fazer o produto se aproximar de um verdadeiro **studio de IA**, onde seja possível:

- gerenciar agentes de forma mais profunda
- configurar capacidades do agente em um só lugar
- expandir a base de conhecimento
- importar conteúdo de múltiplas fontes
- preparar scraping/indexação de sites inteiros
- acompanhar ingestão com UX moderna
- organizar voz, tools, integrações e comportamento do agente

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota AI Studio: `/ai-studio`
- Arquivo da rota AI Studio: `/home/tylaig/repo/chat.meusuper.app/app/(app)/ai-studio/page.tsx`
- View AI Studio declarada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-hub-view.tsx`
- View AI Studio efetiva: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-shell-view.tsx`
- Rota Knowledge: `/knowledge`
- Arquivo da rota Knowledge: `/home/tylaig/repo/chat.meusuper.app/app/(app)/knowledge/page.tsx`
- View Knowledge: `/home/tylaig/repo/chat.meusuper.app/components/knowledge/knowledge-overview-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **AI product design, RAG systems, knowledge ingestion, agent configuration UX, voice integrations e refatoração frontend/backend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfícies alvo

### 1. AI Studio
- Rota: `/ai-studio`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/ai-studio/page.tsx`
- View declarada: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-hub-view.tsx`
- View efetiva: `/home/tylaig/repo/chat.meusuper.app/components/ai-studio/ai-studio-shell-view.tsx`

### 2. Knowledge
- Rota: `/knowledge`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/knowledge/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/knowledge/knowledge-overview-view.tsx`

## Objetivo geral
Expandir AI Studio e Base de Conhecimento para que o produto passe a oferecer uma experiência mais completa de **studio de IA**, com:

- configuração avançada dos agentes
- gestão consolidada das capacidades do agente
- expansão das fontes de conhecimento
- ingestão moderna de conteúdo
- preparação para scraping/indexação de sites inteiros
- melhor editor/manual input para conhecimento em Markdown
- integração com voz
- controle das ferramentas/apps acessíveis ao agente

A diretriz principal é:

- **configurações do agente ficam dentro do agente**
- **base de conhecimento continua sendo um domínio separado**, porém profundamente integrável

---

## Visão de produto desejada
O AI Studio deve evoluir para parecer uma superfície real de orquestração de agentes, não apenas um catálogo/roster.

O usuário deve conseguir entender e operar:
- quem são os agentes
- como eles se comportam
- quais integrações usam
- quais tools/apps podem acessar
- quais triggers têm
- quais bases de conhecimento usam
- como voz e mensagens funcionam
- quais parâmetros operacionais controlam entrega e ritmo

Ao mesmo tempo, Knowledge deve evoluir para parecer uma base moderna de ingestão e grounding, com experiência rica de importação, escrita manual, scraping e acompanhamento de indexação.

---

## Escopo das melhorias

### 1. Tornar AI Studio um studio mais completo de IA
AI Studio precisa evoluir para conter mais capacidades típicas de um verdadeiro studio de agentes.

Além do roster e da visão executiva, deve contemplar experiências como:
- detalhe do agente
- configuração do agente
- integrações do agente
- tools do agente
- acesso a bases de conhecimento
- triggers
- voz
- ritmo e estratégia de envio de mensagens
- parâmetros comportamentais relevantes

O objetivo é o usuário conseguir operar o agente de forma profunda sem depender de telas excessivamente separadas.

---

### 2. Manter Base de Conhecimento separada, mas expandi-la fortemente
A base de conhecimento continua sendo um módulo separado do agente.

Porém ela deve ser muito mais poderosa e moderna, permitindo:
- buscar em site
- buscar em URL específica
- baixar conteúdo de URL
- scraper/scraping de páginas
- importação de arquivos
- importação de documentos de texto
- criação manual de conteúdo
- edição moderna em Markdown
- pipeline futuro de scan/indexação de site completo no RAG

Knowledge deve ser a infraestrutura de grounding, enquanto o agente apenas escolhe a quais bases tem acesso.

---

### 3. Expandir as formas de ingestão da Base de Conhecimento
A base de conhecimento precisa suportar diferentes modos de entrada.

### Modos desejados
- **site / domínio**
- **URL única**
- **lista de URLs**
- **upload de arquivos**
- **documentos de texto**
- **entrada manual**
- **Markdown manual**

A UX deve permitir entender claramente a diferença entre cada modo de ingestão.

---

### 4. Adicionar ingestão por site e URL com visão moderna
É necessário suportar experiências como:
- informar uma URL
- buscar e capturar conteúdo da URL
- baixar/converter o conteúdo
- preparar ingestão
- mostrar progresso
- simular/preview da ingestão mesmo antes do backend final existir por completo

Também deve existir caminho para ingestão por site inteiro, com conceito de:
- crawl/scan de páginas
- descoberta de URLs internas
- indexação das páginas encontradas
- transformação do HTML em conteúdo aproveitável pelo RAG

---

### 5. Criar mock/simulação moderna para o processo de scraping/indexação
Mesmo que o backend completo ainda não esteja finalizado, a interface deve oferecer uma experiência moderna e crível para o fluxo de scan.

Essa experiência deve incluir:
- barra de progresso
- etapas visuais do processo
- estado de scanning/crawling/indexing
- contagem de páginas encontradas
- contagem de páginas processadas
- status de sucesso/falha parcial
- sensação de pipeline real

Ou seja, a UI precisa ser preparada para o processo futuro, e já pode usar mock/simulação consistente nesta fase.

---

### 6. Preparar backend futuro para scan e indexação de páginas no RAG
A proposta deve deixar claro que, futuramente, o backend deve ser capaz de:
- fazer scan de páginas
- baixar HTML
- extrair conteúdo
- processar e limpar texto
- gerar chunks
- indexar no RAG
- tornar essas páginas acessíveis às consultas

A UI deve estar pronta para esse fluxo e para seus estados.

---

### 7. Melhorar entrada manual e edição em Markdown
A base de conhecimento também precisa suportar criação manual de conteúdo com experiência melhor.

Essa edição manual deve ser:
- moderna
- agradável
- visualmente rica
- orientada a Markdown
- melhor do que um textarea simples

Se possível, a experiência deve contemplar:
- edição em modo Markdown
- preview
- sensação mais editorial
- melhor espaçamento/tipografia
- estados de salvamento
- estrutura de títulos, listas, blocos e seções

A meta é permitir criar conhecimento manual de forma mais premium.

---

### 8. Consolidar as opções do agente dentro da tela do agente
Dentro do agente, precisamos ter as próprias opções do agente, tudo no mesmo contexto.

Isso inclui, idealmente, dentro da experiência do agente:
- configurações do agente
- triggers do agente
- integrações do agente
- quais bases de conhecimento ele acessa
- ferramentas/apps a que tem acesso
- voz do agente
- ritmo/envio de mensagens
- parâmetros de split/debounce/delay

A diretriz é clara:
- **não espalhar essas capacidades em telas demais**
- **o agente deve ser o centro da sua própria configuração**

---

### 9. Incluir triggers do agente
Cada agente deve poder ter triggers/configurações de ativação.

A proposta deve prever uma experiência para:
- visualizar triggers ativos
- configurar triggers
- entender quando o agente é acionado
- distinguir automação, assistência, fallback, handoff ou outros modos

Mesmo que o modelo completo de triggers ainda evolua depois, a UX precisa ser preparada para isso.

---

### 10. Incluir integrações do agente
O agente precisa mostrar e controlar suas integrações próprias.

Isso significa que no detalhe/configuração do agente deve ser possível entender:
- a quais integrações ele está vinculado
- quais apps/providers ele pode usar
- o que está ativo
- o que está indisponível por autenticação/configuração

Isso deve se conectar com a futura arquitetura de App Store / Apps / Providers / Actions.

---

### 11. Incluir bases de conhecimento acessíveis pelo agente
O agente deve permitir definir a quais bases/fontes de conhecimento ele tem acesso.

Isso deve incluir:
- seleção de bases
- visualização das bases vinculadas
- talvez prioridade/escopo/contexto de uso
- noção de grounding disponível ao agente

Mas sem mover a gestão estrutural da base para dentro do agente.

O agente consome a base; a base continua sendo administrada no domínio Knowledge.

---

### 12. Incluir integração de voz (ex.: ElevenLabs)
O agente deve estar preparado para ter opções de voz, incluindo cenários com integração como ElevenLabs.

Isso pode incluir:
- ativação/desativação de voz
- provider de voz
- seleção de voz
- parâmetros básicos de entrega
- opções futuras de TTS / experiência vocal

Mesmo que a implementação completa venha depois, a arquitetura e a UX devem estar preparadas.

---

### 13. Incluir configurações de split, debounce, timing e delay de mensagens
Dentro da configuração do agente, precisamos suportar parâmetros operacionais como:
- split de mensagens
- debounce time
- tempo de espera
- delay entre mensagens
- estratégia de envio

Esses controles são importantes para agentes que interagem em canais conversacionais reais.

A UX precisa tratar isso como configuração operacional do agente, não como detalhe escondido ou técnico demais.

---

### 14. Incluir ferramentas/apps a que o agente terá acesso
Dentro do agente, deve ser possível definir as ferramentas ou apps a que ele terá acesso.

Na arquitetura atual/futura, isso deve se conectar ao domínio de apps/providers/actions.

Ou seja, o agente deve poder ter acesso controlado a:
- apps
- ferramentas
- ações
- integrações

Isso deve aparecer dentro do agente como parte da sua capacidade operacional.

---

### 15. Expandir AI Studio com outras superfícies pertinentes
Além do detalhe do agente, o AI Studio pode suportar outras superfícies coerentes com essa evolução, como:
- visão geral dos agentes
- health/status dos agentes
- catálogo de capacidades
- configuração de voz
- bindings de integrações
- visão das knowledge bases conectadas
- presets ou perfis de agente

A proposta deve considerar essas possibilidades sem perder foco.

---

## Estrutura recomendada de experiência

### AI Studio
O AI Studio deve evoluir para algo como:
- hub / overview
- lista de agentes
- detalhe do agente
- configuração do agente
- capacidades do agente
- tools/apps do agente
- integrações do agente
- triggers do agente
- voz do agente
- message behavior do agente

### Knowledge
Knowledge deve evoluir para algo como:
- overview
- sources
- ingestão por URL
- ingestão por site
- upload de arquivos
- editor manual Markdown
- retrieval testing
- logs / ingest pipeline
- progresso de indexação

---

## Sugestões de superfícies/rotas
A solução pode considerar superfícies como:

### AI Studio
- `/ai-studio`
- `/ai-studio/agents`
- `/ai-studio/agents/[id]`
- `/ai-studio/agents/[id]/settings`
- `/ai-studio/agents/[id]/tools`
- `/ai-studio/agents/[id]/voice`
- `/ai-studio/agents/[id]/knowledge`

### Knowledge
- `/knowledge`
- `/knowledge/sources`
- `/knowledge/new`
- `/knowledge/import/url`
- `/knowledge/import/site`
- `/knowledge/import/files`
- `/knowledge/manual`
- `/knowledge/retrieval`
- `/knowledge/logs`

Ou outra estrutura coerente, desde que a responsabilidade entre agente e knowledge permaneça clara.

---

## Diretrizes de UX
Priorizar:
- AI Studio com sensação real de studio
- agente como centro de sua própria configuração
- knowledge como infraestrutura moderna de grounding
- ingestão visualmente rica e clara
- progresso/scan com UX convincente
- editor manual melhorado para Markdown
- separação clara entre o que é do agente e o que é da base
- consistência com o restante do produto

Evitar:
- espalhar configurações do agente em telas demais
- tratar knowledge como lista técnica seca
- usar textarea simples para conteúdo manual importante
- processos de scrape/index sem feedback visual
- UI excessivamente técnica sem narrativa de produto

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- manter a separação entre domínio do agente e domínio da base de conhecimento
- permitir vinculação forte entre ambos
- criar estrutura preparada para scraping e indexação futura
- criar componentes reutilizáveis para ingestão, progresso e edição manual
- integrar com arquitetura futura de apps/providers/actions
- preparar multi-tenant/workspace
- manter coerência com o design system atual

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- limitações atuais do AI Studio
- limitações atuais do Knowledge
- ausência de configurações profundas do agente
- gaps de ingestão de conteúdo
- gaps de UX para scan/import/manual content

### 2. Proposta funcional
Organizar a solução em blocos:
- expansão de AI Studio
- expansão de Knowledge
- ingestão por URL/site
- upload/manual markdown
- scan/index progress UI
- configurações do agente
- tools/apps/integrações/voz/triggers

### 3. Proposta de arquitetura de informação
Definir:
- o que pertence ao agente
- o que pertence à base de conhecimento
- como os dois se conectam
- como o usuário navega entre essas superfícies

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- AI Studio
- Knowledge
- flows de importação
- editor/manual content
- scan progress/mock pipeline
- detalhe/configuração do agente

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- quais conceitos foram reorganizados
- como a arquitetura ficou preparada para evolução futura

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- AI Studio parecer um studio mais completo de IA
- o agente concentrar suas principais configurações dentro dele
- Knowledge suportar expansão por URL, site, arquivos e entrada manual
- existir uma UX moderna para scan/indexação com progresso
- a base ficar preparada para scraping/indexação futura no RAG
- o editor/manual content estiver melhor resolvido para Markdown
- o agente puder controlar integrações, tools/apps, triggers, voz e timing de mensagens
- a separação entre agente e base de conhecimento continuar clara e saudável

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como expansão séria de IA + RAG + agentes
- preserve coerência com o app existente
- implemente com visão escalável e reutilizável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma AI Studio em hub real de configuração de agentes
- mantém Knowledge separado, mas muito mais poderoso
- formaliza ingestão por URL, site, arquivo e manual
- prepara UX de scraping/indexação com barra de progresso e pipeline moderno
- centraliza as opções do agente dentro do próprio agente
- integra tools/apps, voz, triggers e timings operacionais

---

# Nome recomendado para uso interno

Sugestões:

- `AI Studio + Knowledge Expansion`
- `Agent Studio and RAG Knowledge Next Wave`
- `AI Studio Full Capabilities Prompt`
