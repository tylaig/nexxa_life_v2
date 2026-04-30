# App Store + Providers + Actions — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para o domínio de **Integrações**, transformando a experiência atual em algo mais próximo de uma **loja de apps / app marketplace interno**, com:

- catálogo de apps
- providers configuráveis
- autenticação por provider
- ações com inputs e outputs
- apps nativos tratados como seeds do banco
- configuração e teste obrigatório de qualquer provider
- backend responsável por montar e executar as solicitações

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página atual de integrações: `/integrations`
- Arquivo da rota atual: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, integration architecture, app marketplace systems, provider abstraction, tools/actions architecture e refatoração frontend/backend**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfície alvo principal
- Rota atual: `/integrations`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

## Objetivo geral
Modernizar o domínio de integrações para que o produto passe a ter uma experiência de **Loja de Apps**, onde:

- o usuário consegue visualizar apps/integradores disponíveis
- cada app é conectado via provider configurável
- mesmo providers nativos precisam ser configurados pelo usuário
- providers nativos existem inicialmente como **seeds no banco**, marcados como nativos
- cada app possui ações utilizáveis
- cada ação tem schema de input e output
- autenticação é tratada via providers
- o backend monta e executa a solicitação com base na configuração do provider e da ação

A solução deve parecer um sistema real e escalável de integrações, não apenas uma lista de conexões.

---

## Visão de produto desejada
A nova experiência deve se aproximar de uma plataforma onde:

- existe um **catálogo de apps**
- cada app expõe **ações utilizáveis**
- as ações dependem de um **provider/autenticação**
- o usuário instala/configura/conecta o app
- o usuário testa a conexão
- o sistema entende inputs e outputs das ações
- o backend executa chamadas usando a autenticação/configuração correta

Essa arquitetura precisa suportar tanto:
- integrações nativas do sistema
- integrações customizadas
- provedores internos
- apps externos
- crescimento futuro do catálogo

---

## Escopo das melhorias

### 1. Criar conceito de “Loja de Apps”
A experiência atual de integrações deve evoluir para um modelo de **App Store / Loja de Apps**.

Essa loja deve ser a superfície onde o usuário:
- descobre apps disponíveis
- entende o que cada app faz
- conecta/configura o app
- testa o provider
- visualiza ações disponíveis
- utiliza essas ações em automações, agentes ou outros fluxos futuros

A UX deve deixar claro que não estamos lidando apenas com “credenciais soltas”, mas com um ecossistema de apps conectáveis.

---

### 2. Todo provider, inclusive nativo, deve ser configurável
Mesmo integrações ou providers considerados “nativos” do sistema não devem vir como já prontos para uso sem configuração.

Eles devem existir como **seeds iniciais no banco**, com uma marcação/tag clara de que são:
- nativos
- first-party
- seed do sistema

Mas ainda assim devem exigir:
- configuração
- autenticação
- validação
- teste de conexão

### Diretriz importante
“Nativo” não significa “já conectado”.

Significa apenas:
- o sistema já conhece esse provider/app
- ele já vem pré-cadastrado como opção oficial
- o usuário ainda precisa ativar/configurar/testar

---

### 3. Separar corretamente App, Provider, Ação e Autenticação
A nova arquitetura precisa distinguir claramente estes conceitos:

#### App
Representa o produto/integrador visível ao usuário.
Exemplos:
- Shopify
- Meta Ads
- WhatsApp Cloud
- N8N
- Supabase
- HubSpot
- Stripe
- ERP custom

#### Provider
Representa a camada de autenticação/configuração/conectividade usada para conversar com aquele app.

Pode incluir:
- base URL
- auth mode
- API key
- OAuth
- headers
- secrets
- account context
- tenant binding

#### Ação
Representa uma operação utilizável daquele app/provider.
Exemplos:
- criar pedido
- buscar contato
- listar campanhas
- enviar template
- criar lead
- sincronizar estoque

#### Input / Output schema
Cada ação deve declarar:
- quais inputs espera
- quais campos são obrigatórios
- qual payload monta
- quais outputs retorna
- qual formato de resposta o sistema entende

#### Auth / Credentials
Devem ser tratados como parte da configuração do provider, não espalhados de forma solta pela UI.

---

### 4. Nativos devem ser seeds no banco com tag apropriada
A implementação deve tratar apps/providers nativos como registros seedados no banco.

Eles precisam ter atributos como:
- `is_native`
- `is_seeded`
- categoria
- status de disponibilidade
- tipo de autenticação
- capabilities

O seed deve servir para:
- popular o catálogo inicial
- permitir governança sobre os conectores oficiais
- evitar hardcode excessivo no frontend
- facilitar expansão futura

---

### 5. Criar fluxo de configuração e teste de provider
Todo provider precisa passar por um fluxo claro de:

1. selecionar app/provider
2. configurar autenticação
3. preencher campos necessários
4. validar estrutura mínima
5. testar conexão
6. salvar provider configurado
7. exibir estado de saúde / conexão

Esse fluxo deve existir tanto para nativos quanto para custom.

A experiência precisa deixar claro:
- o que falta configurar
- o que está válido
- o que falhou
- o que ainda não foi testado

---

### 6. Cada app deve expor ações utilizáveis
A loja de apps não deve parar na configuração do provider.

Cada app precisa exibir as **ações disponíveis** que o sistema pode usar.

Essas ações devem ser tratadas como blocos utilizáveis em:
- automações
- agentes
- execuções futuras
- fluxos de integração
- ferramentas reutilizáveis

### Cada ação deve ter
- nome
- descrição
- categoria
- input schema
- output schema
- requisitos de autenticação
- método de execução
- status/disponibilidade

---

### 7. Inputs e outputs precisam ser modelados claramente
Cada ação precisa expor de forma clara seus contratos.

#### Inputs
- campos obrigatórios
- campos opcionais
- tipos
- descrição
- placeholders
- defaults quando aplicável

#### Outputs
- estrutura esperada
- campos principais
- formato final retornado
- uso posterior por outras partes do sistema

A UI deve conseguir mostrar isso sem parecer documentação crua demais.

---

### 8. O backend monta e executa a solicitação
A arquitetura deve deixar claro que o backend é responsável por montar e executar a solicitação final.

Ou seja:
- o frontend não deve montar manualmente chamadas complexas direto para cada provider
- o backend deve conhecer o provider configurado
- o backend deve conhecer a ação
- o backend deve aplicar a autenticação correta
- o backend deve montar o payload final
- o backend deve normalizar o output quando necessário

Essa camada é importante para:
- segurança
- consistência
- governança
- logs
- testabilidade
- futura reutilização por agentes/automações

---

### 9. Criar UX que comunique app instalado, provider configurado e ações disponíveis
A interface deve deixar claro estados como:

- app disponível no catálogo
- app nativo
- app custom
- provider não configurado
- provider configurado
- provider validado
- provider com erro
- ações disponíveis
- ações indisponíveis até autenticação

O usuário precisa entender rapidamente:
- o que já está instalado
- o que precisa configurar
- o que já está pronto para uso
- o que pode ser executado

---

### 10. Preparar base para uso futuro em automações, agentes e ferramentas
Essa arquitetura precisa ser pensada desde já para que as ações possam virar:
- tools para agentes
- steps de automação
- ações de workflow
- blocos reutilizáveis em builders futuros

Ou seja, este módulo não deve ser uma tela isolada de integrações, mas uma base de capabilities acionáveis.

---

## Estrutura conceitual recomendada
A proposta deve trabalhar claramente com algo próximo de:

- **App Catalog**
- **Provider Definitions**
- **Provider Instances**
- **Auth Configurations**
- **Action Definitions**
- **Action Schemas**
- **Action Execution Layer**
- **Execution Logs / Validation Results**

---

## Sugestões de superfícies/rotas
A solução pode considerar superfícies como:

- `/apps`
- `/apps/[id]`
- `/apps/[id]/configure`
- `/apps/[id]/actions`
- `/integrations`
- `/providers`
- `/providers/[id]`
- `/providers/[id]/test`

Ou outra organização coerente, desde que fique clara a separação entre:
- catálogo de apps
- configuração de provider
- ações disponíveis
- execução/teste

---

## Diretrizes de UX
Priorizar:
- clareza entre app, provider e ação
- sensação de marketplace interno sério
- fluxo de configuração guiado
- contratos de input/output compreensíveis
- estados visuais fortes de conexão/saúde
- menos ruído técnico cru
- equilíbrio entre linguagem de produto e poder técnico

Evitar:
- misturar app e provider como se fossem a mesma coisa
- deixar ações escondidas demais
- tratar nativo como automaticamente pronto
- expor secrets/credenciais de forma confusa
- UX excessivamente técnica sem organização
- frontend tentando resolver execução diretamente

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- evitar hardcode excessivo de apps nativos no frontend
- modelar apps/providers nativos como seeds no banco
- separar definição de provider de instância configurada
- separar definição de ação de execução de ação
- tratar autenticação como parte da camada de provider
- deixar o backend responsável pela execução final
- preparar logs, health checks e validações
- preparar a arquitetura para multi-tenant/workspace

---

## O que entregar

### 1. Diagnóstico da estrutura atual
Analisar:
- limitações da tela atual de integrações
- mistura atual entre integração, provider, mock e catálogo
- gaps de arquitetura
- limitações de UX para configuração e uso

### 2. Proposta funcional
Organizar a solução em blocos:
- app store
- providers
- autenticação
- ações
- inputs/outputs
- fluxo de teste
- execução backend
- estados nativos seedados

### 3. Proposta de arquitetura de informação
Definir:
- como o usuário navega entre catálogo, configuração e uso
- como diferenciar app x provider x ação
- onde ficam testes, logs e status

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- superfícies de integrações/apps/providers
- modelagem de dados
- seeds de nativos
- fluxos de autenticação e teste
- renderização das ações e schemas
- camada backend de execução

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- quais entidades foram criadas ou ajustadas
- como a arquitetura ficou preparada para evolução futura

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- existir um conceito claro de **Loja de Apps**
- apps nativos forem tratados como **seeds do banco com tag nativa**
- mesmo os nativos exigirem configuração e teste
- houver separação clara entre **app, provider, autenticação e ação**
- ações tiverem inputs e outputs modelados
- o backend for responsável por montar/executar a solicitação
- a UX deixar claro o estado de configuração, validação e uso de cada app/provider
- a arquitetura ficar preparada para uso posterior em automações e agentes

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como arquitetura de produto + integração
- preserve coerência com o app existente
- implemente com visão escalável e reutilizável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- formaliza a transição de integrações para **Loja de Apps**
- separa corretamente app, provider, autenticação e ação
- define nativos como seeds de banco, não hardcodes mágicos
- incorpora schemas de input/output por ação
- joga a montagem e execução final para o backend
- prepara a base para automações, agentes e tools no futuro

---

# Nome recomendado para uso interno

Sugestões:

- `App Store + Providers + Actions`
- `Integrations Marketplace Refactor`
- `Apps Providers Tools Architecture Prompt`
