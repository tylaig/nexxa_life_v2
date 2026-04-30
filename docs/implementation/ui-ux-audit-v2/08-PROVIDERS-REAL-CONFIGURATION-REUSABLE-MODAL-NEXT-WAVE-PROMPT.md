# Providers — Prompt Refinado para Cadastro Real, Auth Variável e Modal Reutilizável

## Contexto
Este documento define a próxima leva de evolução para o domínio de **Providers**, com foco em transformar a experiência atual em uma superfície mais próxima de um sistema real de conexão/configuração de providers.

A meta é permitir:

- cadastro realista de providers
- simulação/representação de vários providers principais
- autenticação variável dependendo do provider
- vínculo entre provider e canal quando necessário
- criação de um modal reutilizável para configuração, capaz de ser usado em outras páginas

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Domínio relacionado a Integrações / Apps / Canais / Settings
- A nova experiência deve se conectar especialmente a:
  - providers
  - channels
  - app store / apps
  - whatsapp provider binding

---

# Prompt final

```md
Você é um especialista sênior em **integration architecture, provider systems, authentication UX, reusable modal systems e refatoração frontend/backend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Objetivo geral
Melhorar o domínio de **Providers** para que o cadastro/configuração de providers pareça mais real, mais flexível e mais próximo de um sistema de integração de produção.

A solução deve permitir:
- cadastrar/configurar providers de forma realista
- suportar diferentes tipos de autenticação por provider
- representar vários providers principais que o produto pode conectar
- vincular provider a canais quando fizer sentido
- reutilizar a experiência de configuração em outras áreas do sistema via modal reutilizável

A experiência não deve parecer uma tela genérica de credenciais. Ela deve parecer um sistema real de conexão, autenticação, teste e vínculo operacional.

---

## Visão de produto desejada
O produto deve tratar **Providers** como a camada de autenticação/configuração de conectividade.

Isso significa que o usuário deve conseguir entender:
- quais providers existem
- quais já estão configurados
- quais são nativos/principais
- que tipo de autenticação cada um exige
- quais entidades dependem deles
- quais canais/apps/integrações estão vinculados

A UX precisa refletir que cada provider pode ter um comportamento diferente.

---

## Escopo das melhorias

### 1. Melhorar Providers para cadastro em estilo real
A experiência de cadastro/configuração de providers precisa ser muito mais realista.

Ela deve suportar cenários em que cada provider possui:
- campos diferentes
- exigências diferentes
- auth diferente
- validações diferentes
- testes diferentes

O usuário não deve sentir que todos os providers são a mesma ficha genérica.

---

### 2. Simular/representar vários providers principais conectáveis
A solução deve apresentar uma base mais realista de providers principais que o sistema pode conectar.

Exemplos de tipos de providers que podem ser representados como principais, dependendo do escopo do produto:
- WhatsApp / Meta / WhatsApp Cloud
- Shopify
- Supabase
- N8N
- OpenAI / LLM providers
- ElevenLabs
- Webhook endpoints / custom providers
- outros principais relevantes ao ecossistema

Mesmo que nem todos sejam implementados por completo agora, a UX deve parecer preparada para múltiplos tipos de provider.

---

### 3. Suportar autenticação variável por provider
Um requisito central é que a autenticação mude dependendo do provider.

A solução deve suportar modelos como:
- API key
- token
- bearer token
- OAuth
- base URL + key
- webhook secret
- combinações customizadas
- credenciais compostas

A experiência precisa adaptar dinamicamente:
- campos exibidos
- instruções
- validações
- teste
- mensagens de erro

Isso é essencial para a experiência parecer real.

---

### 4. Tratar provider do WhatsApp como provider real e vinculável ao canal
É importante considerar explicitamente o caso do **provider do WhatsApp**.

A solução deve permitir:
- cadastrar/configurar provider do WhatsApp
- tratar o provider como camada de conexão/autenticação
- vincular o canal WhatsApp a esse provider

Ou seja, a configuração do canal pode depender do provider.

Essa separação é importante porque ajuda a estruturar corretamente:
- provider = autenticação/configuração/conexão
- channel = uso operacional do canal

---

### 5. Permitir vínculo entre provider e canal
A arquitetura precisa suportar explicitamente o relacionamento entre **provider** e **channel** quando aplicável.

Exemplo:
- provider do WhatsApp Cloud
- canal WhatsApp operacional que usa esse provider

Isso deve ser compreensível na UX:
- qual provider alimenta qual canal
- se o canal depende do provider estar configurado
- se o provider está pronto para uso
- se o canal ainda está pendente por falta de configuração

---

### 6. Criar um modal reutilizável de cadastro/configuração de provider
Se possível, a experiência principal de cadastro/configuração deve nascer como um **modal reutilizável**.

Esse modal deve poder ser usado em outras partes do sistema, por exemplo:
- Settings / Providers
- Settings / Channels
- Apps / Integrations
- fluxos dentro do AI Studio, quando fizer sentido
- onboarding contextual de conexão

A meta é criar uma superfície consistente e reaproveitável.

---

### 7. O modal precisa suportar variação real por provider
Esse modal não pode ser apenas um pop-up genérico com dois inputs fixos.

Ele precisa suportar:
- título e descrição por provider
- campos dinâmicos
- seções de autenticação
- instruções contextuais
- teste de conexão
- estados de loading
- erros de validação
- vínculo contextual com canal/app

A experiência precisa parecer forte e extensível.

---

### 8. Permitir fluxo de teste/validação do provider
A configuração do provider precisa contemplar um teste real ou simulado de conexão.

Esse fluxo deve permitir:
- preencher credenciais
- testar conexão
- ver sucesso/erro
- entender o motivo da falha
- salvar provider validado

A UX deve mostrar com clareza:
- não testado
- testando
- validado
- erro de autenticação
- erro de conectividade
- configuração incompleta

---

### 9. Melhorar estados e visualização dos providers
A listagem/overview de providers deve mostrar estados claros como:
- nativo
- custom
- configurado
- incompleto
- validado
- com erro
- vinculado a canal
- vinculado a app

Isso ajuda a transformar Providers em uma superfície operacional, não apenas administrativa.

---

### 10. Preparar a arquitetura para reuso em outras páginas
Você pediu que, se possível, isso seja um modal reutilizável para outras páginas. Isso é importante e deve virar diretriz de implementação.

A solução deve ser desenhada para reuso em contextos como:
- criar provider standalone
- criar provider durante configuração do canal
- criar provider durante configuração de app
- criar provider durante onboarding de integração

O reuso precisa preservar contexto sem duplicar lógica desnecessariamente.

---

## Estrutura conceitual recomendada
A proposta deve considerar conceitos como:

- **Provider Definition**
- **Provider Type**
- **Provider Auth Mode**
- **Provider Instance**
- **Provider Validation State**
- **Provider Channel Binding**
- **Provider App Binding**
- **Reusable Provider Config Modal**

---

## Sugestões de superfícies/rotas
A solução pode considerar:

- `/settings/providers`
- `/settings/providers/[id]`
- criação/edição via modal reutilizável

E reuso do modal em superfícies como:
- `/settings/channels`
- `/apps`
- `/integrations`

---

## Diretrizes de UX
Priorizar:
- sensação de provider real
- campos dinâmicos por tipo
- autenticação adaptável
- teste/validação claros
- vínculo explícito com canal/app quando aplicável
- modal reutilizável bem resolvido
- UX moderna e consistente

Evitar:
- tratar todos os providers como se fossem iguais
- modal genérico sem contexto
- esconder estados de validação
- misturar provider e canal como se fossem a mesma coisa
- excesso de complexidade visual sem organização

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- separar definição do provider de sua instância configurada
- suportar auth mode variável
- permitir schema/fields por tipo de provider
- criar modal reutilizável com configuração baseada em metadata/schema
- permitir teste/validação da conexão
- permitir vínculo com canais e apps
- manter coerência com a futura arquitetura de apps/providers/actions/channels
- preparar multi-tenant/workspace

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- limitações atuais do domínio de providers
- gaps de UX
- gaps de autenticação variável
- falta de vínculo claro com canais
- oportunidades de reuso por modal

### 2. Proposta funcional
Organizar a solução em blocos:
- catálogo/listagem de providers
- cadastro/configuração realista
- auth dinâmica
- teste
- vínculo com canais/apps
- modal reutilizável

### 3. Proposta de arquitetura de informação
Definir:
- como o usuário vê providers
- como cria/configura provider
- como testa
- como entende vínculo com canal/app
- como o modal é reutilizado em outros contextos

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- superfícies de providers
- modelagem de auth por provider
- modal reutilizável
- teste/validação
- vínculo com canais e apps

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como o domínio de providers ficou mais realista
- como o modal ficou preparado para reuso

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- Providers parecer um domínio real de configuração e autenticação
- a UI suportar múltiplos providers principais
- a autenticação puder variar por provider
- o provider do WhatsApp puder existir e se vincular ao canal
- existir fluxo de teste/validação
- existir modal reutilizável utilizável em outras páginas
- a experiência final parecer consistente, moderna e escalável

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate Providers como camada séria de conectividade
- preserve coerência com o app existente
- implemente com visão escalável e reutilizável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- formaliza Providers como domínio real de configuração
- trata autenticação como variável por provider
- liga provider do WhatsApp ao canal de forma correta
- transforma a UX em algo mais reutilizável com modal configurável
- prepara a arquitetura para outros pontos do sistema

---

# Nome recomendado para uso interno

Sugestões:

- `Providers Real Configuration + Reusable Modal`
- `Providers Auth UX Next Wave`
- `Reusable Provider Modal Prompt`
