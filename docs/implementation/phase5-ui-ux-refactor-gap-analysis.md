# Fase 5 — Gap Analysis da Refatoração UI/UX

## Estado atual consolidado

O produto já possui uma base visual consistente, com shell global funcional, sidebar clara e alguns módulos bem resolvidos. Porém, os módulos mais estratégicos de criação e operação ainda têm acoplamento excessivo entre listagem, inspeção e edição.

## Gaps prioritários

### 1. Campaigns ainda não é uma operação de catálogo real
Faltam:
- tabela/lista robusta
- filtros e segmentação operacional
- tela de detalhe
- editor full screen
- fluxo claro para criação de campanha complexa

### 2. Automations ainda usa a home como builder
Faltam:
- catálogo operacional separado do canvas
- detalhe com métricas e runs
- builder full screen isolado
- navegação previsível entre operar e editar

### 3. Knowledge concentra muitos jobs em uma única view
Faltam:
- catálogo de sources/documentos
- páginas de detalhe
- tela própria de retrieval/logs
- separação entre ingestão e observabilidade

### 4. AI Studio e Skills ainda estão conceitualmente fragmentados
Faltam:
- AI Studio como hub real
- lista exclusiva de agentes
- detalhe de agente
- incorporação de Skills dentro de AI Studio
- navegação interna clara entre agentes, skills e avaliações

### 5. Templates ainda carece de governança de edição
Faltam:
- detalhe dedicado
- editor full screen
- lifecycle mais claro de revisão/publicação
- filtros e metadados mais ricos

### 6. Integrations e Settings ainda estão abaixo do padrão dos módulos principais
Faltam:
- list/detail/edit/new bem definidos
- melhor categorização de settings
- padronização de observabilidade e metadados

## Riscos se nada for feito

- telas ficarão difíceis de escalar conforme o produto ganhar mais campos e ações
- experiência ficará inconsistente entre módulos
- produtividade operacional cairá em fluxos complexos
- responsividade vai degradar à medida que os formulários crescerem
- a percepção de produto coeso ficará abaixo do potencial do app

## O que já ajuda nesta próxima fase

- shell global já existe
- sidebar já organiza bem os domínios
- Contacts e Orders oferecem boas referências de listagem
- Inbox oferece boa referência de layout operacional dedicado
- Analytics oferece boa referência de leitura sem mistura com edição

## Prioridade seguinte recomendada

### Fase 5.1
Executar a base estrutural:
- definir mapa de rotas por módulo
- decidir nomenclaturas finais
- alinhar sidebar para `AI Studio` como hub e `Skills` como subárea interna
- criar scaffolding para list/detail/new/edit

### Status atual da recomendação
A base estrutural foi iniciada com sucesso em `Campaigns`, avançada em `Templates`, expandida em `AI Studio`, aplicada em `Automations`, ajustada para um modelo centrado em agentes com integrações configuráveis, aplicada em `Knowledge`, fortalecida em `Integrations` e refinada em `AI Studio`, `Settings`, sidebar/workspace switcher e superfícies administrativas complementares.

## Gaps ainda abertos após a rodada de Settings e auditoria profunda

1. `Campaigns` ainda precisa de filtros avançados reais, métricas conectadas e preview/revisão mais próximos do lifecycle final
2. `Templates` ainda usa persistência mock/local para edição, sem governança real de versionamento
3. `AI Studio` ficou visualmente mais forte e coerente, mas ainda precisa de evals, guardrails dedicados e persistência real para agents
4. `Automations` ainda precisa de persistência real, runs/logs detalhados e edição efetiva de nós no builder
5. `Knowledge` ainda precisa de listagem dedicada de retrieval logs, health operacional de embeddings e ingest observável mais rica
6. `Integrations` agora já possui catálogo, detalhe, criação e update estrutural conectados, mas ainda precisa de segredos reais e observabilidade operacional mais rica
7. `Settings` ganhou cobertura estrutural ampla, mas ainda precisa de persistência real, permissões detalhadas, billing real e canais configuráveis de fato
8. breadcrumbs foram introduzidos em múltiplos módulos principais, mas a padronização ainda pode ser expandida e refinada
9. parte dos componentes transversais já começou a ser atacada (confirm dialog, unsaved changes, states básicos e toast), mas ainda faltam drawers, activity logs, quick previews e feedbacks mais amplos
10. a nova auditoria navegável mostrou que a classificação de CTA (`real`, `mock`, `blocked`, `no-op`) precisa virar regra global do frontend para eliminar cliques sem consequência visível
11. a suíte de IA ainda está conceitualmente fragmentada; a próxima rodada deve consolidar `AI Studio` como shell persistente e migrar o contexto de `Knowledge` e `Skills` para dentro dela, mesmo que rotas legadas continuem existindo por transição
12. há uma camada clara de higiene de código ainda pendente, com comentários editoriais, mocks inline e banners excessivamente explicativos em múltiplas views, o que reduz a percepção de produto final

## Resultado esperado da próxima rodada

Ao final da próxima etapa, o projeto deve aprofundar a observabilidade de `Knowledge`, seguir na persistência real dos módulos ainda locais e começar a atacar a camada transversal de modais, drawers, estados e feedbacks operacionais.
