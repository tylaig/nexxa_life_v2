# Channels + WhatsApp Cloud Connection — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para o domínio de **Canais**, com foco inicial em estruturar uma área específica para conexão e gestão de canais, começando por **WhatsApp Cloud API**.

A ideia é criar uma superfície clara para:

- conectar canais
- configurar credenciais
- configurar webhook
- validar/testar conexão
- liberar triggers baseados em webhooks
- expor ações utilizáveis do canal
- preparar expansão futura para outros canais, como Instagram

Também faz parte do objetivo adaptar o restante do produto à nova hierarquia, onde **Canais** pode ficar dentro de **Configurações**, sem problema, desde que essa organização fique clara e forte.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Página atual de settings: `/home/tylaig/repo/chat.meusuper.app/app/(app)/settings/page.tsx`
- View atual de settings: `/home/tylaig/repo/chat.meusuper.app/components/settings/settings-overview-view.tsx`
- Página atual de integrações: `/home/tylaig/repo/chat.meusuper.app/app/(app)/integrations/page.tsx`
- View atual de integrações: `/home/tylaig/repo/chat.meusuper.app/components/integrations/integrations-list-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, messaging infrastructure, channel integrations, webhook architecture e refatoração frontend/backend**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Objetivo geral
Criar uma área específica para **conectar canais**, com foco inicial em **WhatsApp Cloud API**, estruturando uma experiência clara de configuração, autenticação, teste, webhooks, triggers e ações.

A solução deve permitir que o sistema trate canais como um domínio operacional próprio, com configuração guiada e capacidade de crescimento futuro para outros canais.

O canal inicial obrigatório desta fase é:
- **WhatsApp Cloud API**

Canal futuro próximo a considerar:
- **Instagram**

---

## Visão de produto desejada
O sistema precisa ter uma parte específica para **Canais**, onde o usuário consiga:
- ver quais canais existem
- conectar um canal
- configurar credenciais
- configurar webhooks
- validar a conexão
- fazer testes
- entender triggers liberados
- entender ações disponíveis

Essa área pode ficar dentro de **Configurações**, desde que a navegação e a hierarquia fiquem claras.

O importante é que o produto deixe de tratar canal apenas como detalhe técnico espalhado entre integrações, inbox e settings.

---

## Escopo das melhorias

### 1. Criar uma área específica para conectar canais
É necessário criar uma superfície clara para **Canais**.

Essa área deve ser responsável por:
- catálogo/lista de canais disponíveis
- estado de conexão de cada canal
- fluxo de configuração
- testes de conexão
- configuração de webhook
- leitura de triggers liberados
- leitura de ações disponíveis

A organização pode ficar em:
- `Settings > Canais`

Isso é aceitável, desde que a UX deixe claro que se trata de uma área operacional importante.

---

### 2. Implementar inicialmente apenas WhatsApp Cloud API
Nesta fase, o foco inicial deve ser apenas **WhatsApp Cloud API**.

Ou seja, a tela e a arquitetura precisam já nascer preparadas para múltiplos canais, mas a implementação concreta prioritária pode cobrir apenas:
- configuração do WhatsApp Cloud
- validação do WhatsApp Cloud
- teste do WhatsApp Cloud
- webhooks do WhatsApp Cloud
- triggers do WhatsApp Cloud
- ações do WhatsApp Cloud

---

### 3. Configurar credenciais do WhatsApp Cloud
A experiência precisa permitir configurar os dados essenciais de conexão do WhatsApp Cloud, como por exemplo:
- access token
- phone number id
- business account id, quando relevante
- app secret / verification setup, quando necessário
- metadados operacionais da conexão

A UX deve deixar claro:
- quais campos são obrigatórios
- o que está faltando
- o que já foi validado
- o que pode ser testado

---

### 4. Configurar webhook do canal
A experiência precisa contemplar configuração de webhook do WhatsApp Cloud.

Isso deve incluir:
- URL de webhook
- token de verificação, se aplicável
- instruções de configuração
- status atual do webhook
- feedback de validação

O fluxo deve ajudar o usuário a entender se o canal está realmente pronto para operar.

---

### 5. Enviar teste para validar configuração
A conexão do canal precisa poder ser testada de forma clara.

A experiência deve permitir um fluxo de teste para confirmar:
- credenciais válidas
- canal conectado
- envio funcionando
- webhook configurado corretamente, quando aplicável

Esse teste precisa ser tratado como parte do onboarding/configuração do canal.

A interface deve informar claramente:
- sucesso
- falha
- erro de credencial
- erro de webhook
- erro de permissão
- erro de payload ou configuração

---

### 6. Liberar triggers baseados em webhook
Depois de configurado corretamente, o canal precisa liberar **triggers** que poderão ser usados pelo sistema.

No caso inicial do WhatsApp Cloud, isso deve contemplar pelo menos o conceito de triggers via webhook, como por exemplo:
- mensagem recebida
- status de envio
- status de entrega
- status de leitura
- resposta do usuário
- outros eventos compatíveis com o canal

A UX deve deixar claro:
- quais triggers ficam disponíveis após a configuração
- quais dependem de webhook ativo
- quais ainda não estão habilitados

---

### 7. Expor ações do canal
Além dos triggers, o canal também precisa expor suas **ações utilizáveis**.

No caso do WhatsApp Cloud, exemplos de ações incluem:
- envio de mensagem
- envio de template
- envio de mídia
- envio de resposta
- outras ações futuras compatíveis com o canal

A interface deve comunicar que essas ações podem ser utilizadas por:
- automações
- agentes
- fluxos
- outras partes da plataforma

---

### 8. Tratar triggers e ações como capacidades do canal
A arquitetura deve tratar claramente que um canal possui:

- **configuração/conexão**
- **triggers**
- **ações**

Ou seja, conectar um canal não serve apenas para habilitar uma inbox. Serve também para liberar capacidades operacionais para o restante da plataforma.

Isso aproxima o domínio de Canais do restante da arquitetura de apps/providers/actions.

---

### 9. Preparar expansão futura para Instagram
Mesmo que o foco atual seja WhatsApp Cloud, a arquitetura e a experiência devem ser preparadas para receber outros canais futuramente, especialmente:
- Instagram

A UI deve nascer preparada para múltiplos canais, mesmo que a primeira entrega concreta implemente apenas um.

Isso significa:
- catálogo de canais
- cards/entries por canal
- configuração por canal
- triggers por canal
- ações por canal

---

### 10. Adaptar as outras páginas para essa nova hierarquia
Você indicou que precisamos adaptar outras páginas para essa hierarquia, e isso é importante.

A solução deve contemplar como a nova área de Canais impacta ou se conecta a:
- Inbox
- Settings
- Integrations
- AI Studio
- Automations
- Campaigns
- outras superfícies relevantes

O objetivo é evitar que a configuração de canal fique solta e desconectada do resto do sistema.

---

## Estrutura conceitual recomendada
A proposta deve considerar claramente conceitos como:

- **Channel Catalog**
- **Channel Connection**
- **Channel Credentials**
- **Channel Webhook Setup**
- **Channel Validation/Test**
- **Channel Triggers**
- **Channel Actions**
- **Channel Capability State**

---

## Sugestões de superfícies/rotas
A solução pode considerar algo como:

### Em Settings
- `/settings/channels`
- `/settings/channels/whatsapp-cloud`
- `/settings/channels/[id]`

Ou uma organização semelhante, desde que fique claro que:
- canais têm sua própria área
- o usuário consegue configurar e testar ali
- a relação com o restante do sistema seja compreensível

---

## Diretrizes de UX
Priorizar:
- onboarding claro do canal
- configuração guiada
- feedback forte de validação
- clareza sobre webhook
- clareza sobre triggers e ações liberadas
- preparação visual para múltiplos canais
- conexão coerente com o restante do produto

Evitar:
- espalhar configuração de canal em telas demais
- esconder webhook e teste como detalhe técnico obscuro
- misturar canal e app/provider sem clareza
- deixar triggers e ações implícitos demais
- UX excessivamente técnica sem organização

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- tratar canais como domínio próprio
- separar configuração do canal de seu uso posterior
- tratar webhook como parte central da configuração
- permitir teste/validação real da conexão
- modelar triggers e ações por canal
- preparar a arquitetura para múltiplos canais
- manter coerência com apps/providers/actions quando fizer sentido
- preparar multi-tenant/workspace

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- onde a configuração de canais está espalhada hoje
- o que falta para tornar canais uma área própria
- gaps para WhatsApp Cloud
- gaps para webhook, teste, triggers e ações

### 2. Proposta funcional
Organizar a solução em blocos:
- área de canais
- conexão WhatsApp Cloud
- credenciais
- webhook
- teste
- triggers
- ações
- expansão futura para Instagram

### 3. Proposta de arquitetura de informação
Definir:
- onde Canais entra em Settings
- como o usuário navega até a configuração
- como distinguir conexão, triggers e ações
- como isso se conecta com Inbox, Automations e AI Studio

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- navegação
- settings/channels
- fluxo de configuração do WhatsApp Cloud
- validação/teste
- modelagem de triggers e ações
- estados visuais do canal

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como o domínio de Canais ficou estruturado
- como ele se conecta com o restante do produto

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- existir uma área específica de **Canais**
- o WhatsApp Cloud puder ser configurado nela
- a configuração contemplar credenciais e webhook
- existir fluxo de teste/validação da conexão
- o canal liberar triggers via webhook quando configurado
- o canal expuser ações utilizáveis
- a arquitetura ficar pronta para expansão futura, como Instagram
- a nova hierarquia estiver coerente com o restante do produto

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só mudanças cosméticas
- trate isso como domínio funcional da plataforma
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- formaliza Canais como área própria
- define WhatsApp Cloud como foco inicial realista
- inclui credenciais, webhook, teste, triggers e ações
- prepara expansão futura para Instagram
- conecta o domínio de canais com o restante da plataforma

---

# Nome recomendado para uso interno

Sugestões:

- `Channels + WhatsApp Cloud Connection`
- `Messaging Channels Setup Next Wave`
- `Channels Domain Refactor Prompt`
