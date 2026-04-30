# Phase 6 — nexxa_life flow -> Root App Adaptation Gap Analysis

## Pergunta central
O que falta para a raiz atual comportar, com design consistente, todas as páginas e capacidades do `old/meu-dia-flow`?

## 1. Gaps de informação arquitetural

### G1. Taxonomia de rotas ainda parcialmente indefinida
Já existe uma convenção provisória operacional com rotas curtas em inglês:
- `/diagnostic`
- `/checklist`
- `/agenda`
- `/goals`
- `/journal`
- `/reports`

Ainda falta decidir a política final de aliases públicos e compatibilidade semântica:
- PT-BR (`/diagnostico`, `/diario`, `/relatorios`)
- EN curta como canônica
- híbrida com aliases e redirects

Impacto:
- o risco estrutural caiu, mas ainda existe chance de retrabalho em breadcrumbs, links públicos e naming final

### G2. Mapa legado -> alvo foi materializado, mas ainda precisa amadurecer para execução completa
A matriz operacional já foi publicada em `docs/implementation/phase6-meu-dia-flow-route-mapping-matrix.md` com:
- rota legada
- página/domínio
- rota nova
- componente alvo
- padrão visual alvo
- status atual
- prioridade

Gap remanescente:
- converter a matriz em backlog operacional rastreável por onda/superfície
- refletir nela o novo status das páginas já portadas e das páginas ainda faltantes

Impacto:
- sem esse refinamento, a execução pode perder clareza na transição entre ondas concluídas e ondas futuras

## 2. Gaps de navegação e IA

### G3. Sidebar principal já foi reconfigurado para o domínio nexxa_life, mas a IA completa ainda não fechou
A taxonomia principal já foi reescrita em `components/app-shell/meu-dia-navigation.ts`, cobrindo:
- dashboard
- diagnóstico
- checklist
- agenda
- objetivos/metas
- diário
- relatórios
- academia
- marketplace
- framework admin

Gap remanescente:
- validar em browser a coerência completa do menu, agrupamentos, destaque de rota ativa e consistência com títulos/topbar
- decidir o destino definitivo das superfícies herdadas do produto CRM/commerce que perderam prioridade

### G4. Breadcrumbs, topbar e títulos ainda carregam semântica do produto anterior
Mesmo nas superfícies reutilizáveis, o copy e a estrutura atual ainda apontam para operação comercial/omnichannel.

## 3. Gaps de superfícies

### G5. Cobertura principal de superfícies já existe, mas ainda falta fechar a cauda da migração
Já existem hoje na raiz:
- `/dashboard`
- `/diagnostic`
- `/checklist`
- `/agenda`
- `/goals`
- `/journal`
- `/reports`
- `/framework-admin`
- `/academy`
- `/marketplace`

Ainda faltam ou precisam de consolidação funcional:
- onboarding e autenticação totalmente retematizados para o produto nexxa_life
- aliases/redirects de naming final quando a taxonomia for fechada
- racionalização da superfície de integrações/ecossistema herdada do produto anterior

Fechamentos já materializados nesta frente:
- `/news` agora existe como superfície real no shell oficial, com curadoria editorial contextual, radar de leitura e prioridades conectadas ao estado atual do sistema nexxa_life

### G6. Dashboard base já foi retematizado e já ganhou primeira camada derivada, mas ainda não é um motor completo
O `/dashboard` já foi substituído por `nexxa_lifeDashboardView` e agora prioriza:
- evolução pessoal
- execução do dia
- objetivos/metas
- ciclo conectado entre superfícies
- leitura semanal consolidada
- prioridade derivada do eixo mais crítico do diagnóstico

Gap remanescente:
- reduzir heurísticas estáticas ainda presentes no mapeamento entre eixos e metas existentes
- expandir o dashboard para refletir progresso mais real do diagnóstico, metas, checklist, agenda, diário e relatórios

## 4. Gaps de modelo de domínio

### G7. Não há contrato TypeScript moderno do domínio nexxa_life
Ainda faltam entidades explícitas para:
- diagnostic session
- diagnostic answer
- diagnostic result snapshot
- framework version
- axis / subdimension / question
- goal
- milestone / meta
- task
- agenda item
- journal entry
- report
- recalibration cycle

### G8. O legado depende de storage local ad hoc
O código legado usa `DB` local do Vite app. Isso não é compatível como fundação do app atual.

Precisamos de:
- contratos
- fixtures controladas
- repository/store moderno
- caminho futuro para persistência real

## 5. Gaps de priorização

### G9. Backlog priorizado já existe, mas precisa permanecer sincronizado com as ondas concluídas
A execução já avançou materialmente e o backlog atual já pode ser tratado assim:
- P0: aprofundar a derivação real entre eixo crítico, meta ativa/sugerida, checklist e agenda, reduzindo heurísticas soltas
- P1: consolidar `news`, onboarding e autenticação retematizada do produto nexxa_life
- P2: definir aliases/redirects finais, convergência com integrações, QA browser-first e racionalização das superfícies legadas do produto anterior

Gap remanescente:
- manter a priorização refletida também na matriz operacional e nos checkpoints de validação

## 6. Gaps de QA

### G10. Ainda não há checklist de QA para a migração nexxa_life
Precisaremos auditar pelo menos:
- reachability de rota
- consistência do sidebar
- estados empty/loading/error
- CTAs reais vs mock vs blocked
- consistência do visual com o shell atual
- continuidade do fluxo principal do produto

## 7. Ordem recomendada para fechar gaps

1. fechar a política final de taxonomia e aliases/redirects
2. transformar a matriz operacional em backlog executável por superfície/status real
3. evoluir as conexões hoje declarativas para comportamento derivado menos heurístico
4. consolidar `news`, onboarding e autenticação retematizada
5. formalizar contratos de domínio mais fortes e fixtures controladas
6. executar QA browser-first da nova navegação e das superfícies já portadas

## 8. Próximo incremento de maior alavancagem
O próximo incremento com melhor custo/benefício é:
- consolidar o mapeamento entre eixo crítico, meta ativa ou sugerida, tarefa prioritária e bloco da agenda com menos heurística manual
- aprofundar a relação entre diagnóstico e metas existentes para reduzir ambiguidades na recomendação principal
- abrir a frente de `news` e fechar a camada de naming/aliases para a IA final do produto

Sem isso, a migração seguirá conectada e convincente no shell, mas ainda aquém de um sistema de domínio realmente consistente e semanticamente fechado.