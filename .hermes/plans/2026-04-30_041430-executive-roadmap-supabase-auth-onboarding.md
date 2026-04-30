# NexxaLife Executive Roadmap — Supabase Auth, Google Login, Onboarding and Conversion

Goal:
Definir um roadmap executivo por fases para transformar a base atual do NexxaLife em uma jornada real de aquisição, autenticação, ativação e retenção inicial, usando Supabase como infraestrutura principal.

Current context:
- A base já possui `@supabase/supabase-js` e client server-only em `lib/server/supabase.ts`
- Já existe fundação de Supabase/pgvector para Knowledge/RAG
- Landing, login, signup e onboarding existem visualmente
- Auth real, Google OAuth, callback, guards e onboarding persistido ainda não foram detectados
- O usuário forneceu credenciais reais de Supabase para o ambiente; elas devem entrar apenas em env local/seguro e nunca em arquivos versionados

Architecture direction:
- Supabase como backbone de auth e dados de perfil inicial
- Google OAuth como caminho preferencial de entrada
- Email/senha como fallback
- Onboarding progressivo persistido em perfil próprio
- Dashboard e shell autenticado protegidos por sessão e estado de onboarding

Tech stack involved:
- Next.js 16 App Router
- React 19
- TypeScript
- Supabase Auth
- Supabase Postgres
- Vitest
- Optional middleware + route handlers

---

## Executive summary

A próxima fase do produto não deve ser expansão lateral de páginas. Deve ser fechamento da máquina crítica de entrada:

1. converter auth visual em auth real
2. adicionar login com Google via Supabase Auth
3. persistir perfil e estado de onboarding
4. transformar onboarding em wizard funcional
5. redirecionar usuário para a próxima melhor ação
6. só depois otimizar landing e demais superfícies

Sem isso, o produto aparenta estar pronto, mas não entrega a trilha real de ativação.

---

## Business goals

### Goal 1 — reduzir fricção de entrada
Medida de sucesso:
- visitante consegue entrar com Google em poucos cliques
- signup por email/senha continua disponível como fallback

### Goal 2 — garantir ativação inicial
Medida de sucesso:
- usuário novo não cai num dashboard genérico vazio
- ele é conduzido por onboarding curto e orientado a valor

### Goal 3 — consolidar o core NexxaLife
Medida de sucesso:
- diagnóstico, metas, checklist e dashboard formam a primeira experiência
- rotas herdadas deixam de poluir a jornada inicial

### Goal 4 — preparar analytics de conversão
Medida de sucesso:
- funil landing -> signup/login -> onboarding -> first value fica mensurável

---

## Recommended phase roadmap

## Phase 0 — Segurança operacional e readiness de ambiente

Objective:
Preparar o ambiente Supabase de forma segura antes de qualquer implementação funcional.

Business value:
Evita vazamento de segredos, inconsistência entre local/prod e retrabalho técnico.

Scope:
- registrar envs necessários sem commitar segredos
- revisar `.env.example` para incluir browser envs de auth
- decidir domínios/redirect URLs local + produção
- habilitar Google provider no Supabase Dashboard
- validar uso de publishable/anon vs service role

Deliverables:
- checklist de configuração do Supabase Auth
- lista de envs obrigatórios
- matriz de redirect URLs

Dependencies:
- acesso ao dashboard Supabase
- confirmação dos domínios local/staging/prod

Effort:
- baixo

Impact:
- muito alto

Main risks:
- uso incorreto de service role no client
- redirect URLs erradas quebrando OAuth

Exit criteria:
- env matrix definida
- provider Google habilitado
- callback URLs aprovadas

---

## Phase 1 — Autenticação real com Supabase Auth

Objective:
Substituir formulários estáticos por login/signup funcionais.

Business value:
Resolve a principal quebra atual do produto: promessa de entrada sem entrada real.

Scope:
- login email/senha real
- signup email/senha real
- logout
- sessão autenticada no App Router
- guards de rotas privadas
- endpoint/helper para recuperar usuário atual

Deliverables:
- fluxo básico de sessão funcionando
- shell `/(app)` protegido
- rotas públicas e privadas claramente separadas

Dependencies:
- Phase 0

Effort:
- médio

Impact:
- muito alto

Main risks:
- acoplamento inadequado entre auth Supabase e domínio do app
- regressões em páginas privadas

Exit criteria:
- usuário não autenticado é redirecionado para `/login`
- usuário autenticado entra no shell
- login/signup por email funcionam

---

## Phase 2 — Google OAuth e callback inteligente

Objective:
Transformar Google em principal canal de entrada com baixa fricção.

Business value:
Aumenta conversão de entrada e reduz abandono de cadastro.

Scope:
- CTA Google em `/login`
- CTA Google em `/signup` ou onboarding de entrada
- rota de callback `/auth/callback`
- tratamento de erros de OAuth
- redirect por parâmetro `next`
- criação/sincronização do usuário de domínio na primeira autenticação

Deliverables:
- login com Google funcional
- callback estável
- retorno coerente para onboarding ou dashboard

Dependencies:
- Phase 1
- provider Google habilitado no Supabase

Effort:
- médio

Impact:
- muito alto

Main risks:
- callback sem Suspense/compatibilidade em Next 16
- URLs de redirect divergentes entre ambientes

Exit criteria:
- login Google funciona localmente e em ambiente publicado
- erros são mostrados com clareza
- usuário novo é reconhecido como novo

---

## Phase 3 — Perfil mínimo e estado de onboarding

Objective:
Criar inteligência de progressão do usuário.

Business value:
Permite ativação contextual em vez de queda direta em dashboard genérico.

Scope:
- tabela/perfil para usuário do app
- campos mínimos: id, auth_user_id, email, name, onboarding_status, onboarded_at
- estados: `not_started`, `in_progress`, `completed`
- API/helper para leitura e atualização do perfil
- sync na primeira autenticação

Deliverables:
- modelo de perfil persistido
- regra clara de redirect baseada em status

Dependencies:
- Phase 1 e 2

Effort:
- médio

Impact:
- muito alto

Main risks:
- duplicidade entre `auth.users` e tabela de domínio
- regras de update incompletas para usuários retornantes

Exit criteria:
- todo usuário autenticado possui perfil de domínio
- onboarding status persiste e dirige navegação

---

## Phase 4 — Onboarding funcional orientado a ativação

Objective:
Transformar `/onboarding` em wizard real com entrega de valor rápido.

Business value:
Reduz abandono pós-cadastro e aumenta chance de primeira ação útil.

Scope:
- wizard progressivo
- persistência por etapa
- perguntas curtas e úteis
- conclusão gera contexto inicial para dashboard/goals/checklist
- retomada de progresso

Recommended onboarding structure:
1. foco principal do usuário
2. momento atual / autoavaliação rápida
3. áreas prioritárias
4. rotina mínima desejada
5. geração do primeiro plano

Deliverables:
- onboarding em etapas
- progresso salvo
- conclusão real do onboarding

Dependencies:
- Phase 3

Effort:
- médio/alto

Impact:
- muito alto

Main risks:
- wizard longo demais
- excesso de perguntas antes do first value

Exit criteria:
- usuário novo consegue concluir onboarding em poucos minutos
- dashboard posterior reflete o contexto informado

---

## Phase 5 — Dashboard de primeiro valor e shell orientado ao core

Objective:
Garantir que o primeiro acesso autenticado mostre utilidade imediata.

Business value:
Transforma ativação em retenção inicial.

Scope:
- empty states úteis no dashboard
- próxima melhor ação destacada
- priorização visual de Diagnóstico, Metas, Checklist e Agenda
- redução de ruído de módulos periféricos na primeira experiência

Deliverables:
- dashboard contextual para usuários novos
- shell mais focado no core NexxaLife

Dependencies:
- Phase 4

Effort:
- médio

Impact:
- alto

Main risks:
- manter excesso de navegação herdada para usuário novo

Exit criteria:
- dashboard mostra próximos passos claros
- primeira sessão tem CTA útil, não só leitura institucional

---

## Phase 6 — Otimização de conversão da landing e auth UX

Objective:
Aprimorar taxa de conversão agora que o fluxo real existe.

Business value:
Melhora aquisição depois de a fundação já estar funcional.

Scope:
- revisar hero e narrativa da landing
- reforçar prova/confiança
- simplificar signup
- melhorar microcopy de login/signup/onboarding
- incluir FAQ e objeções
- instrumentar eventos principais do funil

Deliverables:
- landing mais orientada a conversão
- UX de auth mais clara
- métricas do funil

Dependencies:
- Phases 1 a 5

Effort:
- médio

Impact:
- alto

Main risks:
- tentar otimizar conversão antes de corrigir a jornada real

Exit criteria:
- funil de entrada rastreável
- CTAs alinhados ao fluxo real

---

## Phase 7 — Hardening, QA e rollout controlado

Objective:
Estabilizar a solução antes de expansão maior.

Business value:
Reduz bugs em autenticação, onboarding e sessão, que têm alto custo de confiança.

Scope:
- testes unitários/integrados de auth
- testes E2E críticos
- revisão de edge cases
- observabilidade de erros de login/callback
- validação de segurança básica

Critical scenarios to test:
- visitante -> signup -> onboarding -> dashboard
- visitante -> Google login -> callback -> onboarding/dashboard
- usuário deslogado tentando acessar `/(app)`
- usuário com onboarding incompleto retomando fluxo
- reset de senha

Dependencies:
- Phases 1 a 6

Effort:
- médio

Impact:
- alto

Exit criteria:
- fluxo crítico coberto por testes
- rollout com baixo risco operacional

---

## Priority matrix

### P0 — Fazer primeiro
- Phase 0
- Phase 1
- Phase 2
- Phase 3
- Phase 4

### P1 — Fazer na sequência
- Phase 5
- Phase 6

### P2 — Consolidar
- Phase 7

---

## Recommended KPIs

### Acquisition
- visitas na landing
- CTR do CTA primário
- início de signup/login

### Activation
- taxa de sucesso de login
- taxa de sucesso de Google OAuth
- onboarding started rate
- onboarding completion rate
- tempo até first value

### Early retention
- retorno no D1/D7
- criação da primeira meta
- conclusão da primeira tarefa
- primeira visita ao dashboard após onboarding

---

## Effort vs impact view

### Máximo impacto / esforço aceitável
- autenticação real
- Google login
- perfil + onboarding status
- onboarding funcional

### Bom impacto / esforço moderado
- dashboard de first value
- simplificação de signup
- revisão de navegação inicial

### Impacto posterior
- refinamento comercial da landing
- expansão de módulos secundários

---

## Rollout recommendation

Recommended order:
1. local dev com Supabase configurado
2. ambiente de staging com OAuth validado
3. smoke test interno
4. ativação controlada da jornada nova
5. revisão de métricas após primeiros usos

---

## Risk register

1. Segredos expostos
- Mitigação: usar apenas `.env.local`/secrets manager; nunca commitar valores reais

2. Service role usada indevidamente no client
- Mitigação: client browser usa apenas env público/publishable/anon

3. Callback OAuth inconsistente
- Mitigação: matriz clara de redirect URLs e testes em staging

4. Onboarding longo demais
- Mitigação: reduzir a 4-5 etapas curtas

5. Dashboard sem valor após onboarding
- Mitigação: gerar dados/estados iniciais e CTA de próxima ação

---

## Executive decision

A decisão mais correta agora é concentrar o próximo ciclo em:
- Supabase Auth real
- Google login
- perfil persistido
- onboarding funcional
- first-value dashboard

Só depois disso vale investir pesado em refinamento comercial da landing e expansão das páginas periféricas.

---

## Practical next step

Próxima macro-rodada recomendada:
"Implementar a fundação de auth com Supabase + Google OAuth + perfil mínimo + redirects inteligentes"
