# nexxa_life — progresso da limpeza de marca e loop de layouts

## Objetivo da rodada
1. limpar referências de marca antigas nas superfícies ativas da raiz
2. consolidar `nexxa_life` como naming oficial
3. registrar um documento mestre de melhoria de layout e continuidade por página

## Concluído nesta rodada
- marca global de `app/layout.tsx` retematizada para `nexxa_life`
- `/login`, `/signup` e `/onboarding` retematizados para `nexxa_life`
- múltiplas referências ativas em `app/`, `components/`, `tests/` e `docs/` substituídas
- documento mestre criado: `docs/implementation/nexxa_life-layout-improvements-and-page-loop.md`
- loop contínuo por página consolidado com confirmação mínima `ok`

## Pendências remanescentes
- renomear estruturalmente o namespace `components/meu-dia/*` e docs `phase6-meu-dia-*` apenas quando isso não gerar churn desnecessário
- revisar o conflito semântico entre `app/page.tsx` e `app/(app)/page.tsx`
- seguir a auditoria/layout loop nas superfícies P0 restantes

## Rodadas recentes concluídas
- branding visível da plataforma começou a migrar de `nexxa_life` para `NexxaLife` em metadata, topbars, sidebar e superfícies de auth
- navegação de `Integrações` foi alinhada para a rota real publicada `/apps`
- aliases compatíveis de `/integrations/*` foram criados para apontar para a base real atual
- auditoria de páginas ausentes e coexistência publicada em `docs/implementation/nexxalife-missing-pages-and-routing-audit.md`
- identificadas como ausentes do legado portado: landing pública real em `/` e superfície dedicada de `Testes`
- `/checklist` revisada visualmente
- hero reorganizado para destacar execução do dia e tarefa foco
- progresso por período ganhou barra visual explícita
- tarefa prioritária passou a aparecer destacada também dentro da coluna correspondente
- equilíbrio entre resumo global e execução detalhada ficou mais claro
- classificação da página: `REAL` com dados operacionais ainda `MOCK`
- `/diagnostic` revisada visualmente
- hero reorganizado para explicitar saída esperada e conexão com metas/checklist
- jornada guiada ficou mais escaneável e condensada acima da dobra
- leitura por eixos ganhou bloco dedicado com destaque da prioridade atual
- impacto da leitura foi separado como tradução prática do diagnóstico
- classificação da página: `REAL` com leitura diagnóstica ainda `MOCK`

- `/goals` revisada visualmente
- hero reorganizado para reforçar hierarquia entre eixo, meta e progresso
- leitura por eixo ganhou resumo dedicado com destaque da maior concentração estratégica
- cards de meta ficaram mais densos e legíveis sem perder escaneabilidade
- classificação da página: `REAL` com metas e progresso ainda `MOCK`

- `/journal` revisada visualmente
- hero reorganizado para separar intenção do registro, escrita e leitura histórica
- CTA principal ganhou destino explícito para relatórios em vez de ação solta
- bloco de prompts foi separado das práticas recomendadas para reduzir homogeneidade visual
- classificação da página: `REAL` com reflexão e persistência ainda `MOCK`

- `/framework-admin` revisada visualmente
- hero reorganizado para explicitar papel administrativo e conexão com diagnóstico/relatórios
- guardrails foram mantidos visíveis como bloco principal de governança
- matriz estrutural ficou mais alinhada visualmente ao restante do núcleo
- classificação da página: `REAL` com estrutura administrativa ainda `MOCK`

- `/news` revisada visualmente
- breadcrumb e descrição foram alinhados para `NexxaLife`
- hero reorganizado para explicitar papel editorial, contexto e ação esperada
- prioridade editorial, destaque e guardrails ficaram mais separados e legíveis
- classificação da página: `REAL` com curadoria e sinais ainda `MOCK`

- `/academy` revisada visualmente
- breadcrumb ajustado para `NexxaLife`
- hero reorganizado para comunicar aprendizagem aplicada em vez de acervo genérico
- recomendações e trilhas ficaram mais separadas e legíveis
- classificação da página: `REAL` com trilhas e recomendações ainda `MOCK`

- `/marketplace` revisada visualmente
- breadcrumb ajustado para `NexxaLife`
- hero reorganizado para comunicar curadoria de apoio contextual em vez de catálogo genérico
- match prioritário, categorias e especialistas ficaram mais separados e legíveis
- classificação da página: `REAL` com especialistas e encaixes ainda `MOCK`

- `/` revisada e implementada como landing pública inicial
- rota raiz deixou de redirecionar imediatamente para `/dashboard`
- hero público passou a comunicar posicionamento oficial de `NexxaLife`
- colisão semântica com o shell autenticado foi reduzida
- classificação da página: `REAL` em versão inicial

- `/(app)` home herdada revisada
- rota passou a redirecionar para `/dashboard`
- duplicação semântica com a home pública e com o dashboard foi removida
- classificação da rota: `REAL` como entrypoint autenticado técnico com redirect

- `/analytics` revisada
- rota passou a redirecionar para `/dashboard`
- duplicação semântica com analytics já absorvido no dashboard foi removida
- classificação da rota: `REAL` como rota técnica herdada com redirect

- `/apps` revisada
- topbar e hero passaram a comunicar Integrações como base oficial de conectividade do NexxaLife
- `/integrations/*` foi reafirmado como camada de compatibilidade, não como taxonomia principal
- classificação da rota: `REAL`

- `/ai-studio` revisada
- topbar, breadcrumb e hero passaram a comunicar papel complementar ao núcleo NexxaLife
- a superfície foi reforçada como hub de governança de IA, não como competidora do dashboard
- classificação da rota: `REAL`

- `/knowledge` revisada
- topbar, breadcrumb e hero passaram a comunicar infraestrutura complementar de grounding do NexxaLife
- a superfície foi mantida como camada estrutural de memória e retrieval, em coexistência com AI Studio
- classificação da rota: `REAL`

- `/settings` revisada via entrypoint administrativo em `/settings/workspace`
- breadcrumb e descrição passaram a comunicar papel complementar ao workspace NexxaLife
- a superfície foi reafirmada como camada administrativa, não concorrente do fluxo operacional principal
- classificação da rota: `REAL`

- `/contacts` revisada
- topbar, breadcrumb e hero passaram a comunicar CRM complementar conectado ao NexxaLife
- a superfície foi reafirmada como camada comercial/relacional, não concorrente do fluxo principal
- classificação da rota: `REAL`

- `/inbox` revisada
- topbar, breadcrumb e hero passaram a comunicar atendimento omnichannel complementar ao NexxaLife
- a superfície foi reafirmada como cockpit de triagem, SLA, ownership e contexto relacional/comercial
- classificação da rota: `REAL`

- `/campaigns` revisada
- topbar, breadcrumb e hero passaram a comunicar outbound complementar conectado ao NexxaLife
- a superfície foi reafirmada como camada de ativação, retenção e recompra ligada a audiência, inbox e automations
- classificação da rota: `REAL`

- `/automations` revisada
- topbar, breadcrumb e hero passaram a comunicar orquestração complementar conectada ao NexxaLife
- a superfície foi reafirmada como camada de encadeamento entre campaigns, inbox, apps e AI Studio
- classificação da rota: `REAL`

- `/orders` revisada
- topbar, breadcrumb e hero passaram a comunicar operação comercial complementar conectada ao NexxaLife
- a superfície foi reafirmada como camada de fulfillment, risco, pagamento e suporte conectada a contatos, inbox e campanhas
- classificação da rota: `REAL`

- `/products` revisada
- topbar, breadcrumb e hero passaram a comunicar catálogo comercial complementar conectado ao NexxaLife
- a superfície foi reafirmada como camada de portfólio digital ligada a orders, campaigns e apps
- classificação da rota: `REAL`

- `/audience` revisada
- topbar, breadcrumb e hero passaram a comunicar segmentação complementar conectada ao NexxaLife
- a superfície foi reafirmada como camada estrutural de públicos ligada a contacts, campaigns e orders
- classificação da rota: `REAL`

## Próxima página automática
- `/templates`

## Regra operacional
Basta responder `ok` para seguir a próxima página do loop.
