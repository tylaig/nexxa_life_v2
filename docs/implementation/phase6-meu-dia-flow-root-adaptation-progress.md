# Phase 6 — nexxa_life flow -> Root App Adaptation Progress

## Status atual
IN_PROGRESS — Onda 3 aprofundada com as superfícies principais já portadas, expansão de `framework-admin`/`academy`/`marketplace`/`news` concluída e agora com vínculo mais determinístico entre diagnóstico, meta ativa, tarefa-chave, bloco da agenda e curadoria editorial refletido no shell oficial.

## Backlog operacional atual
- P0 — reduzir heurísticas no vínculo entre diagnóstico, metas existentes/sugeridas, checklist e agenda
- P1 — consolidar `news`, onboarding e autenticação retematizada do produto nexxa_life
- P2 — fechar aliases/redirects finais, integração pessoal/ecossistema e QA browser-first da nova IA

## Objetivo da fase
Adaptar a aplicação raiz atual para incorporar todas as páginas e funções do `old/meu-dia-flow`, portando o domínio para o design system e shell já existentes na raiz.

## Blocos planejados
- Bloco A — descoberta estrutural da raiz atual
- Bloco B — inventário do legado nexxa_life flow
- Bloco C — mapeamento legado -> novo shell/rotas
- Bloco D — reconfiguração do sidebar e das entrypoints
- Bloco E — port incremental dos módulos prioritários
- Bloco F — validação funcional, build e QA

## Marcos concluídos nesta rodada
- Confirmado que a raiz oficial atual usa `app/page.tsx` -> `/dashboard`
- Confirmado que o shell oficial é `app/(app)/layout.tsx` + `components/app-shell/*`
- Confirmado que `old/meu-dia-flow` existe como referência local dentro do repositório
- Inventariadas as rotas legadas em `old/meu-dia-flow/src/App.jsx`
- Identificadas as páginas legadas principais: Landing, Login, Cadastro, Onboarding, Diagnostico, Checklist, Agenda, ObjetivosMetas, Diario, Relatorio, Dashboard, Academia, Integracoes, AdminDashboard, News, Marketplace e Testes
- Confirmado que o app atual não possui ainda as rotas centrais do domínio nexxa_life
- Publicado o master plan da adaptação em `docs/implementation/phase6-meu-dia-flow-root-adaptation-master-plan.md`

## Achados importantes
- A adaptação correta não é reativar o design legado; é absorver o domínio do nexxa_life no shell moderno atual
- O dashboard atual está semanticamente ancorado em operação omnichannel e precisará ser retematizado
- O sidebar atual está alinhado ao produto de CRM/commerce e precisará de revisão de taxonomia
- `old/meu-dia-flow/src/services/storage.js` não deve ser reutilizado como verdade de negócio

## Próximo passo de execução
Usar o contrato determinístico e a camada editorial recém-publicados como base para a próxima macro-rodada: reduzir os fallbacks remanescentes nos casos sem meta existente, preparar a rodada de aliases/redirects e avançar na retematização de onboarding/autenticação com QA browser-first da nova IA.

## Atualização adicional desta rodada
- Publicada a matriz operacional em `docs/implementation/phase6-meu-dia-flow-route-mapping-matrix.md`
- Definida convenção provisória de rotas curtas em inglês para reduzir retrabalho estrutural inicial
- Reescrita a taxonomia do sidebar oficial para o domínio nexxa_life em `components/app-shell/meu-dia-navigation.ts`
- Publicadas entrypoints placeholder honestas para `/diagnostic`, `/checklist`, `/agenda`, `/goals`, `/journal` e `/reports`
- Criado registry/config de placeholders em `components/meu-dia/placeholders/*`
- Validado o comportamento base com testes Vitest dedicados
- Substituído semanticamente o `/dashboard` por `nexxa_lifeDashboardView`, com hero, cards de execução e atalhos oficiais do ciclo nexxa_life
- Criado o contrato de conteúdo do dashboard em `components/meu-dia/dashboard-content.ts` para sustentar evolução incremental com TDD
- Substituídos os placeholders de `/checklist`, `/agenda` e `/goals` por superfícies funcionais iniciais aderentes ao shell atual
- Criados contratos de conteúdo independentes em `components/meu-dia/checklist-content.ts`, `agenda-content.ts` e `goals-content.ts`
- Criadas as views `nexxa_lifeChecklistView`, `nexxa_lifeAgendaView` e `nexxa_lifeGoalsView` para sustentar o port incremental sem reativar o front legado
- Substituídos os placeholders de `/diagnostic`, `/journal` e `/reports` por superfícies funcionais iniciais aderentes ao shell atual
- Criados contratos de conteúdo independentes em `components/meu-dia/diagnostic-content.ts`, `journal-content.ts` e `reports-content.ts`
- Criadas as views `nexxa_lifeDiagnosticView`, `nexxa_lifeJournalView` e `nexxa_lifeReportsView` para fechar a primeira cobertura funcional do domínio nexxa_life no app raiz
- Criado o contrato transversal `components/meu-dia/system-connections.ts` para explicitar a sequência `diagnostic -> goals -> checklist -> agenda -> journal -> reports`
- Publicadas recomendações iniciais derivadas dos eixos do diagnóstico, conectando meta sugerida, tarefa do checklist e bloco correspondente da agenda
- Reforçado o `/dashboard` com um bloco de ciclo conectado e uma leitura semanal consolidada reunindo sinais de execução, agenda, diário e relatórios
- Evoluída a camada transversal `system-connections.ts` para ordenar e priorizar recomendações a partir dos scores reais dos eixos do diagnóstico
- Passou a existir leitura derivada de urgência (`alta`, `média`, `baixa`), prioridade ordinal e eixo crítico dominante para conectar diagnóstico, metas, checklist e agenda
- O dashboard agora destaca a prioridade derivada do diagnóstico com meta ativa, tarefa-chave e bloco da agenda associados ao eixo mais crítico
- A conexão transversal foi refinada para expor match determinístico entre eixo crítico, meta existente, período do checklist, categoria da agenda e racional textual da prioridade dominante
- Criados contratos adicionais em `components/meu-dia/framework-admin-content.ts`, `academy-content.ts`, `marketplace-content.ts` e `news-content.ts` para sustentar a próxima onda de superfícies fora do núcleo operacional
- Publicadas as views `nexxa_lifeFrameworkAdminView`, `nexxa_lifeAcademyView`, `nexxa_lifeMarketplaceView` e `nexxa_lifeNewsView`, absorvendo a semântica dessas áreas no design system e shell oficiais
- Criadas as entrypoints reais `/framework-admin`, `/academy`, `/marketplace` e `/news` com `AppTopbar` alinhado aos novos contratos de conteúdo
- A superfície de `News` passou a operar como camada editorial contextual do nexxa_life, com radar de leitura, prioridades derivadas do sistema atual e biblioteca recente coerente com o shell oficial
- `/reports` passou a usar tabs reais + gráficos reais via wrappers oficiais de `tabs` e `chart`
- `/agenda` passou a usar tabs reais com estado degradado explícito para visões ainda não implementadas
- `/dashboard` ganhou painel analítico com tabs reais (`Execução`, `Bem-estar`, `Evolução`) e gráficos conectados à base mock atual
- Publicado o loop de execução contínua em `docs/implementation/phase6-meu-dia-ok-loop.md`, permitindo seguir a próxima rodada apenas com `ok`
- Reforçado o runbook de QA da Fase 6 com a rodada adicional de dashboard analytics

## Validação da rodada
- inspeção estrutural do repositório: concluída
- leitura de rotas atuais e legadas: concluída
- plano mestre documentado: concluído
- implementação de código da Onda 1: concluída
- implementação inicial da Onda 2 no `/dashboard`: concluída
- implementação funcional inicial de `Checklist`, `Agenda` e `Metas`: concluída
- implementação funcional inicial de `Diagnóstico`, `Diário` e `Relatórios`: concluída
- primeira camada de conexões entre as seis superfícies do sistema nexxa_life: concluída
- primeira derivação automática de prioridade do diagnóstico para metas, checklist e agenda: concluída
- refinamento determinístico do vínculo eixo -> meta -> checklist -> agenda: concluído
- port funcional de `Framework Admin`, `Academy`, `Marketplace` e `News`: concluído
- testes RED/GREEN do slice de `News` (`pnpm test -- tests/meu-dia-news-surface.test.ts`): 27/27 passando
- suíte completa `pnpm test`: concluída com sucesso
- build Next.js: concluído com sucesso
- aviso remanescente: warnings de otimização CSS já existentes no build, sem bloquear a geração das páginas
- `/reports` evoluído com tabs reais + gráficos reais: concluído
- `/reports` refinado visualmente para melhorar hierarquia entre KPIs, sinais rápidos, charts e insights guiados: concluído
- `/agenda` evoluída com tabs reais e estados degradados explícitos: concluído
- `/dashboard` evoluído com painel analítico tabulado: concluído
- `/dashboard` refinado visualmente para melhorar leitura acima da dobra, jornada prioritária e resumo operacional: concluído
- loop operacional contínuo criado em `docs/implementation/phase6-meu-dia-ok-loop.md`: concluído

## Resultado esperado da próxima macro-rodada
Aplicar a mesma auditoria visual e hierárquica em `/agenda`, revisando densidade da timeline, contraste e qualidade dos estados degradados antes de avançar para `/checklist`.
