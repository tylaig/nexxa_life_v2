# Phase 7 — NexxaLife Product Entry, Auth and Onboarding Audit + Planning

Status: planning complete, implementation pending
Date: 2026-04-30

## Objective

Executar um estudo product-owner da base atual para entender:
- como a landing page comunica o produto
- como login, signup, Google login e onboarding estão posicionados
- quais rotas são núcleo do produto versus legado/expansão
- quais gaps impedem uma jornada real de aquisição -> autenticação -> ativação -> uso protegido

E, a partir disso, definir um planejamento completo de melhorias.

## Escopo analisado

Arquivos e superfícies centrais auditados nesta rodada:
- `app/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/onboarding/page.tsx`
- `app/(app)/layout.tsx`
- `app/(app)/dashboard/page.tsx`
- `lib/server/env.ts`
- `lib/server/supabase.ts`
- inventário de `app/**/page.tsx`
- artefato prévio: `.hermes/plans/2026-04-30_041430-technical-plan-supabase-google-auth.md`

## Executive summary

A base atual já melhorou muito na camada semântica do produto: landing, login, signup e onboarding falam a linguagem correta do NexxaLife e reforçam o fluxo principal de diagnóstico -> metas -> checklist -> agenda -> diário -> relatórios.

Mas a camada operacional ainda não acompanha a promessa:
- login ainda é visual/estático
- signup ainda é visual/estático
- Google login ainda é CTA sem fluxo OAuth real
- recuperação de acesso ainda é placeholder
- onboarding ainda é explicativo, não transacional
- não há proteção real do grupo `/(app)`
- o shell permite acessar superfícies centrais sem sessão

Ou seja: hoje o produto parece mais pronto do que realmente está na jornada de entrada.

## Current strengths

### 1. Landing pública já comunica um posicionamento melhor
Pontos positivos:
- a raiz `/` deixou de ser apenas desvio para área interna
- proposta de valor está mais clara
- mensagem de transformação pessoal está coerente
- existe melhor continuidade entre landing -> login -> signup -> onboarding

### 2. Núcleo do produto já está semanticamente claro
Core identificado:
- `/dashboard`
- `/diagnostic`
- `/goals`
- `/checklist`
- `/agenda`
- `/journal`
- `/reports`

### 3. Há uma estrutura de shell consistente
- `app/(app)/layout.tsx` já centraliza sidebar + inset
- isso facilita aplicar auth gating depois

### 4. Há readiness parcial para Supabase
- `@supabase/supabase-js` já está instalado
- existe `lib/server/supabase.ts` para service-role/admin
- existe plano técnico prévio para auth + Google + onboarding

## Product gaps

### P0 — Jornada de entrada ainda não é real
- formulário de login não autentica
- formulário de signup não cria conta
- CTA Google não faz OAuth
- link de recuperação de acesso não funciona

### P0 — Área autenticada não está protegida
- não existe `middleware.ts`
- não existe checagem de sessão em `app/(app)/layout.tsx`
- o dashboard pode ser acessado sem enforcement real

### P0 — Onboarding não ativa o usuário
- página de onboarding apenas explica
- não salva status
- não mede progresso
- não decide o próximo passo
- não bloqueia ou redireciona conforme estado do usuário

### P1 — Arquitetura de informação ainda mistura core com legado/expansão
A aplicação contém muitas rotas além do core NexxaLife, incluindo superfícies operacionais herdadas ou paralelas.

Isso reduz clareza para um novo usuário porque o produto parece ao mesmo tempo:
- sistema pessoal de evolução
- suíte operacional ampla
- plataforma de IA/integrações/admin

### P1 — Honestidade de CTAs ainda precisa melhorar
Mensagens como:
- "Continuar com Google"
- "Recuperar acesso"
- "Entrada segura e progressiva"
- links diretos para dashboard

...ainda comunicam mais capacidade do que a base realmente entrega hoje.

## Route classification

### Camada 1 — Entrada pública
- `/`
- `/login`
- `/signup`
- `/onboarding`
- aliases em português: `/cadastro`, `/diagnostico`, `/diario`, `/relatorio`

### Camada 2 — Núcleo autenticado NexxaLife
- `/dashboard`
- `/diagnostic`
- `/goals`
- `/checklist`
- `/agenda`
- `/journal`
- `/reports`

### Camada 3 — Ecossistema/expansão
- `/academy`
- `/marketplace`
- `/news`
- `/apps` e subrotas

### Camada 4 — Operação avançada/admin/legado ampliado
- `/audience`
- `/contacts`
- `/inbox`
- `/orders`
- `/products`
- `/campaigns`
- `/automations`
- `/analytics`
- `/ai-studio`
- `/knowledge`
- `/settings/*`
- `/framework-admin`

## PO recommendations

### Macro-round 1 — Fechar o loop de entrada real
Objetivo: transformar promessa de acesso em capacidade funcional.

Entregas:
1. Supabase Auth real
2. login por email/senha
3. signup por email/senha
4. Google OAuth real
5. callback auth real
6. reset de senha real
7. logout real

### Macro-round 2 — Proteger o produto corretamente
Objetivo: garantir coerência entre narrativa e acesso.

Entregas:
1. `middleware.ts`
2. rotas públicas declaradas
3. proteção de `/(app)`
4. redirect para `/login?next=...`
5. redirect para `/onboarding` quando onboarding estiver incompleto
6. redirect para `/dashboard` quando onboarding estiver concluído

### Macro-round 3 — Fazer onboarding virar ativação
Objetivo: transformar onboarding em motor de valor, não apenas página explicativa.

Entregas:
1. tabela de perfil de app
2. tabela de estado do onboarding
3. captação de contexto inicial
4. trilha inicial guiada
5. persistência do progresso
6. desbloqueio inteligente do dashboard

### Macro-round 4 — Refinar landing/login/signup para conversão e confiança
Objetivo: alinhar UX com estágio real do produto.

Entregas:
1. revisar hero e CTA principal da landing
2. remover ou qualificar promessas ainda não reais
3. adicionar prova de fluxo e benefício imediato
4. alinhar copy entre login/signup/onboarding
5. reduzir acesso público direto ao dashboard antes do auth gating final

### Macro-round 5 — Repriorizar a IA do produto para novos usuários
Objetivo: deixar o core muito mais evidente no primeiro uso.

Entregas:
1. priorizar navegação do core NexxaLife
2. rebaixar módulos paralelos/avançados na jornada inicial
3. separar melhor núcleo pessoal vs operação avançada
4. preparar trilhas futuras por maturidade/permissão

## Recommended implementation order

### Slice A — base auth e contratos
- env público + server-only corretos
- `@supabase/ssr`
- clients browser/server
- callback route
- middleware base
- testes RED/GREEN para contratos e redirects

### Slice B — telas reais de login/signup
- formulários com `react-hook-form` + `zod`
- submit real para Supabase
- Google OAuth CTA real
- tratamento de erro e loading

### Slice C — domínio de perfil/onboarding
- migração SQL
- repositório de perfil
- estado do onboarding
- redirects por status

### Slice D — UX/conversão/honestidade
- landing page refinada
- CTA matrix revista
- textos ajustados ao estágio funcional

## Success criteria

### Produto
- usuário consegue criar conta
- usuário consegue entrar com Google
- usuário recebe retorno claro em falhas
- usuário não autenticado não entra no core
- usuário recém-criado cai em onboarding
- usuário onboarded cai em dashboard

### UX
- CTAs passam a refletir capacidades reais
- landing prepara o usuário para a primeira ação certa
- onboarding reduz ambiguidade e acelera ativação

### Técnica
- auth sem service-role no client
- service-role restrito a server-only
- callback funcional
- middleware cobrindo grupo autenticado
- testes e build verdes

## Risks and notes

- As credenciais reais do Supabase já foram compartilhadas na conversa; elas não devem ser registradas em arquivos versionados.
- Como a service-role foi exposta em texto, recomenda-se rotação antes de produção.
- O uso de MCP do Supabase pode ser útil nas próximas macro-rodadas para validar setup, auth provider e schema, se necessário.

## Immediate next step

Executar o Slice A:
- escrever testes RED para env/auth routing/callback contracts
- implementar a base real de auth com Supabase
- validar com testes/build
