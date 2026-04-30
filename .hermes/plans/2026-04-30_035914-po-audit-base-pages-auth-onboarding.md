# Product Owner Audit — base atual, páginas, onboarding, landing e autenticação

> For Hermes: planning-only deliverable. Do not implement code from this document yet.

Goal:
Produzir um estudo da base atual do NexxaLife, com foco de Product Owner nas páginas públicas e de entrada (`/`, `/login`, `/signup`, `/onboarding`) e na lógica de autenticação, para orientar uma próxima fase de melhorias funcionais, UX e técnicas.

Architecture snapshot:
A base é um projeto Next.js App Router com shell autenticado em `app/(app)`, páginas públicas na raiz de `app/`, componentes UI próprios e backend parcial já iniciado para domínios como knowledge, integrations, campaigns e contacts. O produto visível foi retematizado para NexxaLife, mas a camada de autenticação ainda é majoritariamente visual/estática e vários domínios continuam misturando núcleo NexxaLife com superfícies herdadas de CRM/ops.

Tech stack:
- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind 4
- Radix UI
- Supabase JS
- Vitest
- Zod
- Backend próprio em `app/api/*`, `lib/server/*`, `modules/*`

---

## 1. Contexto atual da base

Workspace analisado:
- `/home/tylaig/repo/nexxalifenew`

Arquivos-base observados:
- `package.json`
- `app/layout.tsx`
- `app/(app)/layout.tsx`
- `components/app-shell/app-sidebar.tsx`
- `components/app-shell/meu-dia-navigation.ts`
- `app/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/onboarding/page.tsx`
- `components/auth/auth-shell.tsx`
- `lib/server/env.ts`
- `lib/server/supabase.ts`
- `app/api/health/route.ts`
- docs em `docs/implementation/*`

Resumo estrutural:
- 82 rotas `page.tsx` detectadas em `app/`
- 16 páginas são apenas aliases/redirects
- 66 páginas possuem conteúdo próprio
- Shell autenticado em `app/(app)` redireciona home autenticada para `/dashboard`
- Landing pública já existe em `/`
- Login, signup e onboarding existem como superfícies reais, mas sem fluxo funcional completo

Observação importante:
A base já contém integração server-side com Supabase para alguns domínios (`lib/server/supabase.ts`), porém não existe ainda implementação observável de autenticação do usuário final com sessão, guard de rotas, callback OAuth, recuperação de senha ou provisionamento de onboarding.

---

## 2. Leitura de produto da arquitetura atual

### 2.1 O que já está bom

1. Separação entre entrada pública e shell autenticado
   - `app/page.tsx` virou landing pública
   - `app/(app)/page.tsx` redireciona para `/dashboard`
   - isso evita colisão semântica entre marketing e operação

2. Navegação principal já comunica um core de produto
   - Dashboard
   - Diagnóstico
   - Checklist
   - Agenda
   - Metas
   - Reflexão
   - Ecossistema

3. Existe direção de marca relativamente clara
   - metadata global e UI visível já usam `NexxaLife`
   - docs internos já registram decisões de coexistência e aliases

4. Há infraestrutura backend reutilizável
   - env centralizado com Zod em `lib/server/env.ts`
   - client admin Supabase em `lib/server/supabase.ts`
   - rotas API já existentes para outros domínios

### 2.2 O que está frágil hoje

1. A promessa do produto está mais madura que a entrega da entrada
   - landing, login, signup e onboarding já falam como produto real
   - mas a lógica de autenticação ainda não acompanha essa promessa

2. Ausência de jornada conectada ponta a ponta
   - usuário pode clicar em `Continuar com Google`, mas não há fluxo funcional real detectado
   - signup não persiste conta
   - onboarding não depende do estado do usuário
   - dashboard não parece protegido por sessão autenticada

3. Mistura entre produto core e superfícies herdadas
   - há muitas rotas de CRM/ops coexistindo com o core NexxaLife
   - isso aumenta ambiguidade de posicionamento, esforço de navegação e custo de onboarding

4. Critérios de maturidade ainda estão misturados
   - várias páginas do core estão visualmente bem compostas, mas ainda trabalham com dados mock
   - isso pode criar percepção enganosa em demos se não houver staging narrativa adequada

---

## 3. Auditoria PO das páginas prioritárias

## 3.1 Landing pública `/`

Arquivo:
- `app/page.tsx`

Estado atual:
- hero institucional claro
- CTA para `/login`
- CTA secundário para `/diagnostic`
- blocos explicando proposta de valor e jornada
- comunicação coerente com NexxaLife

Pontos fortes:
- já existe posicionamento inicial do produto
- a landing não redireciona automaticamente para dashboard
- narrativa central está alinhada ao core: diagnóstico → execução → evolução

Gaps de Product Owner:
- falta prova social
- falta segmentação por perfil de usuário
- falta clareza de oferta/comercialização
- falta explicitar benefício tangível em prazo curto
- CTA secundário “Explorar o diagnóstico” pode confundir visitante não autenticado se o diagnóstico exigir contexto futuro
- falta seção de objeções/FAQ
- falta comparação “antes/depois” ou storytelling de transformação
- falta captura de lead/espera/demo

Riscos:
- a landing parece mais manifesto de produto do que máquina de conversão
- boa para reposicionamento, ainda fraca para aquisição

Melhorias sugeridas:
- incluir seção “para quem é / para quem não é”
- incluir prova social ou placeholders honestos para validação futura
- incluir narrativa de 3 passos: entrar → diagnosticar → sustentar rotina
- criar CTA primário orientado a experimento: “Começar diagnóstico guiado” ou “Criar conta grátis”
- criar CTA secundário orientado a confiança: “Ver como funciona”
- inserir FAQ curta
- inserir microcopy de segurança/privacidade se login social entrar

Prioridade:
- P1 de negócio

---

## 3.2 Login `/login`

Arquivo:
- `app/login/page.tsx`

Estado atual:
- tela visual consistente
- formulário com email e senha
- link “Recuperar acesso” aponta para `#`
- botão “Continuar com Google” sem lógica observável

Pontos fortes:
- visual coerente
- mensagem de valor alinhada ao core do produto
- componente compartilhado `AuthShell` dá consistência

Gaps de Product Owner:
- não há estados de erro, loading, sucesso ou bloqueio
- não há login real detectado
- não há recuperação de senha funcional
- não há login social funcional
- não há trust markers de segurança
- não há indicação do que acontece após login
- falta opção de “continuar de onde parei” baseada em onboarding ou último estado

Gaps técnicos observáveis:
- nenhum uso detectado de `signInWithPassword`
- nenhum uso detectado de `signInWithOAuth`
- nenhuma rota callback OAuth observada
- nenhum middleware de proteção de sessão detectado
- nenhum `onAuthStateChange` detectado

Riscos:
- principal risco de produto: promessa de acesso sem sistema real de acesso
- risco de frustração máxima na primeira sessão

Melhorias sugeridas:
- implementar login por email/senha real
- implementar Google OAuth real
- implementar recuperação de senha
- definir redirect pós-login por estado do usuário:
  - sem onboarding concluído → `/onboarding`
  - onboarding concluído → `/dashboard`
- adicionar estados de UI: loading, credenciais inválidas, conta não verificada, erro de provedor
- adicionar telemetria de abandono do login

Prioridade:
- P0 crítica

---

## 3.3 Signup `/signup`

Arquivo:
- `app/signup/page.tsx`

Estado atual:
- formulário com nome, apelido, email, senha, telefone e consentimento
- sem persistência observável
- sem validação estruturada detectada
- sem fluxo Google equivalente na tela

Pontos fortes:
- boa intenção de capturar dados úteis para personalização futura
- consentimento já foi considerado visualmente

Gaps de Product Owner:
- formulário mais longo que o necessário para primeira conversão
- não existe indicação de benefício imediato após cadastro
- não existe login com Google equivalente aqui, embora exista no login
- consentimento não parece auditável nem granular
- não há política de termos/privacidade ligada a rotas reais
- não há confirmação de email, nem explicação do próximo passo

Riscos:
- alta fricção inicial
- abandono elevado em mobile
- coleta prematura de telefone e apelido sem justificativa clara

Melhorias sugeridas:
- versão curta do cadastro:
  - nome
  - email
  - senha
  - consentimento mínimo
- mover telefone, apelido e preferências para onboarding progressivo
- oferecer “Criar conta com Google” também em signup
- exibir claramente o próximo passo pós-cadastro
- adicionar validação de senha, feedback inline e critérios mínimos
- registrar aceite com versão de termo/política

Prioridade:
- P0 crítica

---

## 3.4 Onboarding `/onboarding`

Arquivo:
- `app/onboarding/page.tsx`

Estado atual:
- página conceitual com etapas do ciclo
- CTAs para `/diagnostic` e `/dashboard`
- não há wizard real, persistência de progresso nem dependência do perfil

Pontos fortes:
- comunica bem a lógica macro do produto
- serve como mapa mental inicial

Gaps de Product Owner:
- onboarding ainda é uma página institucional, não um fluxo
- não identifica perfil, objetivo, maturidade ou momento do usuário
- não define “time to first value”
- não mede progresso de ativação
- permite ir ao dashboard sem evidência de setup mínimo

Melhorias sugeridas:
- transformar onboarding em fluxo progressivo real
- etapas recomendadas:
  1. objetivo principal do usuário
  2. momento atual / diagnóstico rápido
  3. áreas prioritárias
  4. configuração inicial de rotina
  5. primeiro plano semanal
- salvar progresso incremental
- permitir sair e retomar
- definir critério explícito de onboarding concluído
- ao finalizar, criar dados-base no dashboard/checklist/goals

Prioridade:
- P0 estratégica

---

## 4. Diagnóstico da autenticação e lógica associada

## 4.1 O que existe

Detectado:
- dependência `@supabase/supabase-js` em `package.json`
- client admin server-side em `lib/server/supabase.ts`
- configuração de ambiente em `lib/server/env.ts`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_SCHEMA`

## 4.2 O que não foi detectado

Não observado na base inspecionada:
- client Supabase browser para auth de usuário
- helper de sessão por request
- middleware de auth para rotas privadas
- callback OAuth Google
- troca de code/session
- rotas de reset de senha
- rotas de confirmação de email
- uso de `signInWithOAuth`
- uso de `signInWithPassword`
- logout
- guards por papel/estado
- tabela ou serviço explícito de perfil de onboarding

## 4.3 Conclusão PO/técnica

A base já tem Supabase como infraestrutura disponível, mas ainda não como sistema de autenticação de usuário final. Hoje a entrada pública e auth UX estão numa fase “interface pronta / lógica ausente”.

Decisão de produto recomendada:
Padronizar autenticação no Supabase Auth e usar Google OAuth como caminho de baixa fricção, mantendo email/senha como fallback.

---

## 5. Problemas transversais identificados

1. Maturidade desigual entre páginas
   - core visualmente consistente
   - auth funcionalmente incompleto
   - vários módulos ainda mockados

2. Navegação grande para estágio atual do produto
   - 82 pages é muito para um produto cujo core de valor ainda está sendo consolidado

3. Falta de proteção do shell autenticado
   - hoje `/(app)` parece mais shell técnico que área realmente autenticada

4. Possível dívida de posicionamento
   - coexistem core NexxaLife e áreas herdadas (`contacts`, `campaigns`, `orders`, `products`, etc.)
   - isso tende a confundir roadmap e demos

5. Testes insuficientes para auth
   - teste observado para auth valida apenas metadata e inventário de rotas
   - não há testes de fluxos reais

---

## 6. Estratégia recomendada de produto

## 6.1 Norte
Primeiro consolidar a “máquina de entrada e ativação” antes de expandir mais páginas.

Sequência recomendada:
1. autenticação real
2. onboarding progressivo real
3. dashboard inicial personalizado
4. métricas de ativação
5. refinamento de conversão da landing
6. só então expandir áreas laterais

## 6.2 MVP de entrada recomendado

Fluxo-alvo:
- visitante entra em `/`
- escolhe `Criar conta` ou `Continuar com Google`
- autentica via Supabase Auth
- se usuário novo:
  - cria perfil base
  - vai para onboarding
- se usuário existente sem onboarding finalizado:
  - retoma onboarding
- se onboarding concluído:
  - vai para `/dashboard`

## 6.3 Métricas de Product Owner

Instrumentar pelo menos:
- visita landing
- clique CTA primário
- início de signup
- sucesso signup
- início login Google
- sucesso login Google
- abandono por etapa do onboarding
- onboarding concluído
- tempo até primeiro valor
- primeira ação útil no produto (diagnóstico, meta ou checklist)

---

## 7. Roadmap completo recomendado

## Fase 1 — Fundamentos de autenticação real

Objetivo:
Transformar auth de UI em auth funcional.

Escopo:
- criar client Supabase browser para auth
- login email/senha
- signup email/senha
- login com Google OAuth
- callback OAuth
- logout
- recuperação de senha
- guards de rotas privadas
- redirect condicional pós-login

Arquivos prováveis:
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/auth/session.ts`
- Create: `app/auth/callback/route.ts`
- Create: `app/forgot-password/page.tsx`
- Create: `app/reset-password/page.tsx`
- Create: `middleware.ts`
- Modify: `app/login/page.tsx`
- Modify: `app/signup/page.tsx`
- Modify: `app/(app)/layout.tsx`
- Modify: `lib/server/env.ts`

Validação:
- login por email/senha funciona
- Google OAuth funciona
- usuário deslogado não entra em `/(app)`
- redirect correto após callback

Prioridade:
- P0

---

## Fase 2 — Modelo de perfil e estado de onboarding

Objetivo:
Dar inteligência de progressão para o usuário.

Escopo:
- criar tabela/perfil de usuário
- salvar `onboarding_status`
- salvar objetivos iniciais e preferências mínimas
- definir estado `not_started`, `in_progress`, `completed`
- redirect por estado

Arquivos prováveis:
- Create: `modules/users/contracts.ts`
- Create: `modules/users/repository.ts`
- Create: `app/api/v1/users/profile/route.ts`
- Create: `supabase/migrations/*_create_user_profiles.sql` ou equivalente local de migrations
- Modify: `app/auth/callback/route.ts`
- Modify: `app/onboarding/page.tsx`

Validação:
- usuário novo recebe perfil base
- progresso de onboarding é persistido
- retomada funciona

Prioridade:
- P0

---

## Fase 3 — Onboarding real orientado a ativação

Objetivo:
Reduzir tempo até primeiro valor.

Escopo:
- transformar `/onboarding` em wizard multi-etapas
- perguntas curtas e úteis
- persistência incremental
- conclusão cria contexto inicial em goals/checklist/dashboard

Estrutura sugerida:
1. Qual seu foco principal hoje?
2. Quais áreas precisam de mais atenção?
3. Qual horizonte de mudança você busca?
4. Qual rotina mínima você quer sustentar?
5. Gerar primeiro plano

Arquivos prováveis:
- Create: `components/onboarding/onboarding-wizard.tsx`
- Create: `components/onboarding/steps/*.tsx`
- Create: `app/api/v1/onboarding/route.ts`
- Modify: `app/onboarding/page.tsx`
- Modify: `app/(app)/dashboard/page.tsx`

Validação:
- wizard funciona em mobile
- progresso é salvo
- conclusão envia ao dashboard com estado inicial relevante

Prioridade:
- P0

---

## Fase 4 — Revisão da landing para conversão

Objetivo:
Converter melhor tráfego em cadastro/início de jornada.

Escopo:
- reorganizar hero com proposta mais objetiva
- incluir seções de prova, benefício e objeções
- revisar CTAs
- alinhar narrativa com onboarding real

Arquivos prováveis:
- Modify: `app/page.tsx`
- Create: `components/marketing/*`

Estrutura sugerida:
- Hero com proposta e CTA primário
- Como funciona em 3 passos
- Para quem é
- Benefícios concretos
- Prova/confiança
- FAQ
- CTA final

Validação:
- clareza em 5 segundos
- CTA primário destacado
- narrativa coerente com fluxo real

Prioridade:
- P1

---

## Fase 5 — Revisão UX de login/signup

Objetivo:
Reduzir fricção e abandono.

Escopo:
- simplificar cadastro
- criar equivalência Google em signup
- criar feedback inline
- mensagens de erro úteis
- acessibilidade e mobile

Arquivos prováveis:
- Modify: `app/login/page.tsx`
- Modify: `app/signup/page.tsx`
- Modify: `components/auth/auth-shell.tsx`
- Possibly create: `components/auth/*`

Validação:
- menos campos no signup
- loading e erro visíveis
- CTA de recuperação funcional

Prioridade:
- P1

---

## Fase 6 — Hardening de área autenticada

Objetivo:
Garantir coerência entre sessão, navegação e core do produto.

Escopo:
- proteger `/(app)` por auth
- revisar sidebar por estágio do usuário
- esconder/adiar módulos herdados que competem com o core
- destacar próxima melhor ação no dashboard

Arquivos prováveis:
- Modify: `app/(app)/layout.tsx`
- Modify: `components/app-shell/app-sidebar.tsx`
- Modify: `components/app-shell/meu-dia-navigation.ts`
- Modify: `app/(app)/dashboard/page.tsx`

Validação:
- usuário autenticado vê rota coerente
- usuário novo vê foco no core
- áreas herdadas não poluem primeira experiência

Prioridade:
- P1

---

## 8. Recomendações específicas por página/fluxo

### `/`
- trocar CTA secundário para demo/como funciona se diagnóstico público ainda não estiver preparado
- destacar promessa de transformação em linguagem menos abstrata
- incluir captura de intenção

### `/login`
- tornar Google o CTA principal ou co-primário
- adicionar “esqueci minha senha” real
- mostrar erro sem recarregar página

### `/signup`
- reduzir campos
- adicionar cadastro com Google
- mover dados secundários para onboarding

### `/onboarding`
- virar wizard real
- bloquear ida ao dashboard se setup mínimo não estiver concluído, ou permitir “pular por agora” explicitamente

### `/(app)` e `/dashboard`
- redirecionar por sessão e estado de onboarding
- mostrar empty state contextual para novos usuários

---

## 9. Riscos e trade-offs

Risco 1: implementar Google antes do modelo de perfil
- problema: usuário autentica mas não há estado para direcionar fluxo
- mitigação: implementar perfil mínimo na mesma macrofase

Risco 2: manter signup longo
- problema: queda de conversão
- mitigação: mover dados não essenciais para onboarding

Risco 3: continuar expandindo páginas antes de ativação
- problema: produto cresce lateralmente sem resolver entrada
- mitigação: congelar expansão periférica até auth/onboarding funcionarem

Risco 4: manter rotas herdadas muito visíveis
- problema: diluição do posicionamento NexxaLife
- mitigação: priorizar core na sidebar e no dashboard

---

## 10. Backlog priorizado do Product Owner

### P0
1. Implementar autenticação real com Supabase Auth
2. Implementar login com Google
3. Implementar signup real
4. Implementar callback OAuth
5. Implementar recuperação de senha
6. Proteger shell autenticado por sessão
7. Criar estado persistido de onboarding
8. Transformar onboarding em wizard funcional

### P1
9. Reduzir fricção do signup
10. Revisar landing para conversão
11. Instrumentar analytics de ativação
12. Personalizar dashboard para novos usuários
13. Reorganizar sidebar priorizando core

### P2
14. Revisar coexistência das áreas herdadas
15. Criar narrativa comercial mais robusta
16. Refinar provas sociais, FAQ e confiança
17. Criar testes E2E de auth e onboarding

---

## 11. Plano de execução recomendado

### Macro-rodada A — Discovery técnico guiado

Objetivo:
Confirmar arquitetura final de auth e modelo de perfil.

Passos:
1. mapear estratégia Supabase Auth escolhida
2. definir rotas públicas e privadas
3. definir modelo mínimo de perfil de usuário
4. definir estado de onboarding
5. escrever plano técnico de implementação

Saída esperada:
- spec de auth/onboarding
- matriz de redirects
- modelo de dados mínimo

### Macro-rodada B — Auth funcional

Objetivo:
Entregar login/signup/Google reais com proteção de rotas.

### Macro-rodada C — Onboarding real

Objetivo:
Entregar wizard, persistência e dashboard inicial coerente.

### Macro-rodada D — Conversão

Objetivo:
Revisar landing e UX de entrada com base no fluxo real.

---

## 12. Testes e validação recomendados

Testes unitários/integrados:
- metadata das rotas críticas
- helpers de auth
- redirect pós-login
- decisão de redirect por onboarding status
- callbacks de OAuth

Testes E2E recomendados:
- visitante → signup → onboarding → dashboard
- visitante → login Google → callback → onboarding/dashboard
- usuário existente → login → dashboard
- usuário esqueceu senha → fluxo de reset
- usuário deslogado acessando `/(app)` → redirecionado para `/login`

Comandos-alvo esperados quando houver implementação:
- `pnpm test`
- `pnpm build`

---

## 13. Decisão recomendada agora

Recomendação executiva:
Não começar pela estética das páginas secundárias. A prioridade correta é fechar a jornada crítica de entrada.

Ordem proposta:
1. autenticação real com Google + email/senha
2. perfil mínimo e estado de onboarding
3. onboarding wizard funcional
4. dashboard inicial por contexto
5. refino da landing para conversão

---

## 14. Resumo executivo

A base atual já transmite melhor o posicionamento do NexxaLife do que antes, especialmente em landing, login, signup, onboarding e navegação principal. Porém, do ponto de vista de Product Owner, a maior lacuna não está mais no visual — está na ausência da lógica de entrada e ativação real.

Hoje o produto aparenta estar pronto para receber usuários, mas a trilha crítica ainda não foi implementada de ponta a ponta. Isso torna autenticação, Google login, persistência de perfil e onboarding progressivo a prioridade máxima do roadmap.

Se quisermos evoluir com coerência, a próxima fase deve ser “máquina de entrada e ativação”, não “mais páginas”.
