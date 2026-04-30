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

## Próxima página automática
- `/academy`

## Regra operacional
Basta responder `ok` para seguir a próxima página do loop.
