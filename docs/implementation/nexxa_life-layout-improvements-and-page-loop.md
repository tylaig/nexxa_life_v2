# nexxa_life — plano de melhoria de layouts e loop contínuo por página

## Objetivo
Consolidar um plano único para:
1. revisar layouts de todas as páginas
2. registrar melhorias recomendadas por superfície
3. manter um loop contínuo de execução, QA e refinamento por página
4. permitir continuidade com uma única confirmação do usuário: `ok`

## Convenção de naming do projeto
A partir desta rodada, o nome oficial do produto na base atual deve ser:
- `NexxaLife` nas superfícies visíveis da plataforma
- `nexxa_life` apenas quando necessário em identificadores técnicos provisórios

Regras:
- substituir referências de marca antigas em superfícies ativas da raiz
- preferir `NexxaLife` em títulos, metadata, headings, labels e navegação
- evitar novos usos de `Meu Dia`, `MeuDia.AI`, `Onda` ou `nexxalife`
- preservar o legado apenas quando fizer parte de documentação histórica em `old/meu-dia-flow`

## Inventário macro de layouts para revisão

### Grupo A — núcleo nexxa_life
- `/dashboard`
- `/diagnostic`
- `/checklist`
- `/agenda`
- `/goals`
- `/journal`
- `/reports`
- `/academy`
- `/news`
- `/marketplace`
- `/framework-admin`
- `/login`
- `/signup`
- `/onboarding`

### Grupo B — shell e rotas herdadas ainda ativas
- `/`
- `/(app)` home atual
- `/analytics`
- `/apps/*`
- `/ai-studio/*`
- `/knowledge/*`
- `/settings/*`
- `/contacts`
- `/inbox`
- `/campaigns/*`
- `/automations/*`
- `/templates/*`
- `/orders`
- `/products`
- `/storage`
- `/logs`
- `/audience`

## Melhorias de layout por frente

### 1. Root e shell global
#### `app/layout.tsx`
- [x] marca global retematizada para `nexxa_life`
- [ ] revisar `metadata` por consistência final de posicionamento
- [ ] padronizar tom institucional da aplicação raiz

#### `app/(app)/page.tsx`
- [x] decidido redirecionamento para `/dashboard`
- [x] evitada colisão semântica entre home herdada e dashboard NexxaLife
- [x] status final da rota documentado no loop
- status atual: `REAL` como entrypoint autenticado técnico com redirect

#### `components/app-shell/app-sidebar.tsx`
- [x] grupo principal retematizado
- [ ] revisar ordem e hierarquia de seções do produto
- [ ] validar colapso, overflow e escaneabilidade visual

### 2. Auth e onboarding
#### `/login`
- [x] retematizado para `nexxa_life`
- [ ] validar estados `error`, `loading`, `success`
- [ ] conectar CTA de recuperação e fluxo de acesso

#### `/signup`
- [x] criado e retematizado
- [ ] validar mobile spacing e feedback de submissão
- [ ] evoluir consentimento para estado explícito e auditável

#### `/onboarding`
- [x] criado
- [ ] revisar densidade de conteúdo no hero
- [ ] avaliar wizard real na próxima fase
- [ ] conectar CTA inicial com progressão mais clara

### 3. Núcleo nexxa_life
#### `/dashboard`
- [x] painel analítico com tabs e charts
- [x] consolidado grid vertical para melhor leitura acima da dobra
- [x] revisada a densidade do bloco de ciclo conectado
- [x] reforçado o mental model entre summary, analytics e priority flow
- status atual: `REAL` com dados ainda `MOCK` na camada analítica

#### `/reports`
- [x] tabs reais + charts reais
- [x] validada legenda, altura e responsividade-base dos gráficos
- [x] revisada a hierarquia entre KPIs, chart e quick signals
- status atual: `REAL` com dados de leitura ainda `MOCK`

#### `/agenda`
- [x] tabs reais
- [x] evoluídos os estados bloqueados para cards mais orientativos
- [x] revisado contraste e ritmo visual da timeline
- status atual: `REAL` com `Semana/Mês/Ano` ainda em estado degradado explícito

#### `/checklist`
- [x] validada progressão visual entre períodos
- [x] reforçado o destaque da tarefa foco
- [x] revisado o equilíbrio entre cards de resumo e tarefas
- status atual: `REAL` com dados operacionais ainda `MOCK`

#### `/diagnostic`
- [x] validada a clareza do passo a passo e outputs esperados
- [x] revisada a escaneabilidade da leitura por eixos
- status atual: `REAL` com leitura diagnóstica ainda `MOCK`

#### `/goals`
- [x] reforçada a hierarquia eixo -> meta -> progresso
- [x] revisada a densidade dos cards por eixo
- status atual: `REAL` com metas e progresso ainda `MOCK`

#### `/journal`
- [x] revisado o layout do editor/reflexão para evitar blocos muito homogêneos
- [x] validado CTA principal e feedback pós-registro em modo estrutural
- status atual: `REAL` com reflexão e persistência ainda `MOCK`

#### `/academy`, `/news`, `/marketplace`, `/framework-admin`
- [x] `framework-admin` revisado para maior consistência visual com o restante do núcleo
- [x] `framework-admin` validado para comunicar com mais clareza seu papel administrativo no produto
- [x] `academy` revisada para maior consistência visual e clareza de papel
- [x] `news` revisado para maior consistência visual e clareza editorial
- [x] `marketplace` revisado para maior consistência visual e clareza de papel

### 4. Rotas herdadas
Essas superfícies precisam de auditoria e decisão de coexistência ou reclassificação:
- `/templates/*`
- `/storage`
- `/logs`

#### `/analytics`
- [x] auditado como superfície herdada em conflito com `/dashboard` e `/reports`
- [x] decidido redirecionamento para `/dashboard`
- [x] removida duplicação conceitual de analytics dedicado no fluxo principal NexxaLife
- status atual: `REAL` como rota técnica herdada com redirect

#### `/apps`
- [x] auditado como base oficial de Integrações
- [x] topbar e superfície principal alinhadas para comunicar conectividade operacional em vez de App Store genérica
- [x] compatibilidade com `/integrations/*` mantida apenas por aliases
- status atual: `REAL`

#### `/ai-studio`
- [x] auditado como hub complementar de inteligência
- [x] reforçado o papel de governança de agentes, bindings e knowledge
- [x] evitada competição semântica com `/dashboard` ao posicionar a página como camada complementar
- status atual: `REAL`

#### `/knowledge`
- [x] auditado como infraestrutura complementar de grounding e retrieval
- [x] topbar, breadcrumb e hero alinhados para comunicar papel estrutural dentro do NexxaLife
- [x] mantida a coexistência com `/ai-studio` sem absorção total no hub de agentes
- status atual: `REAL`

#### `/settings`
- [x] auditado como centro administrativo complementar do workspace
- [x] breadcrumb e descrição alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre administração e fluxo operacional principal
- status atual: `REAL`

#### `/contacts`
- [x] auditado como CRM complementar e acionável
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre relacionamento comercial e fluxo operacional principal
- status atual: `REAL`

#### `/inbox`
- [x] auditado como cockpit complementar de atendimento omnichannel
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre atendimento/triagem e fluxo operacional principal
- status atual: `REAL`

#### `/campaigns/*`
- [x] auditado como camada complementar de outbound, retenção e recompra
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre ativação comercial e fluxo operacional principal
- status atual: `REAL`

#### `/automations/*`
- [x] auditado como camada complementar de orquestração operacional
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre encadeamento operacional e fluxo principal
- status atual: `REAL`

#### `/orders`
- [x] auditado como camada complementar de operação comercial e transacional
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre fulfillment/risco/suporte e fluxo principal
- status atual: `REAL`

#### `/products`
- [x] auditado como camada complementar de catálogo e oferta comercial
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre portfólio digital/oferta e fluxo principal
- status atual: `REAL`

#### `/audience`
- [x] auditado como camada complementar de segmentação e construção de públicos
- [x] breadcrumb, topbar e hero alinhados para comunicar relação com NexxaLife
- [x] mantida a separação semântica entre públicos/recortes e fluxo principal
- status atual: `REAL`

### 5. Landing pública e home herdada
#### `/`
- [x] deixou de redirecionar automaticamente para `/dashboard`
- [x] ganhou landing pública inicial com posicionamento visível de `NexxaLife`
- [x] reduzida a colisão semântica entre entrada pública e shell autenticado
- [ ] aprofundar narrativa comercial, prova social e CTA institucional em rodada futura
- status atual: `REAL` em versão inicial

Para cada uma, registrar:
- relevância no produto atual
- conflito semântico com `nexxa_life`
- necessidade de retema, arquivamento ou manutenção técnica

## Loop contínuo por página

### Entrada mínima
Basta dizer:
`ok`

### Sequência automática por página
1. escolher a próxima página prioritária
2. estudar código, docs e estados atuais
3. auditar layout, CTAs, navegação e responsividade
4. classificar:
   - `REAL`
   - `MOCK`
   - `BLOCKED`
   - `MISSING`
5. implementar melhorias incrementais de layout e clareza
6. rodar `pnpm test`
7. rodar `pnpm build`
8. validar no browser quando aplicável
9. atualizar este documento e os docs de progresso
10. seguir para a próxima página

## Ordem sugerida do loop de layout

### P0
1. `/dashboard`
2. `/reports`
3. `/agenda`
4. `/checklist`
5. `/diagnostic`
6. `/goals`
7. `/journal`

### P1
8. `/login`
9. `/signup`
10. `/onboarding`
11. `/framework-admin`
12. `/news`
13. `/academy`
14. `/marketplace`

### P2
15. `/`
16. `/(app)` home herdada
17. `/analytics`
18. `/apps/*`
19. `/ai-studio/*`
20. `/knowledge/*`
21. `/settings/*`

### P3
22. `/contacts`
23. `/inbox`
24. `/campaigns/*`
25. `/automations/*`
26. `/templates/*`
27. `/orders`
28. `/products`
29. `/storage`
30. `/logs`
31. `/audience`

## Critério de pronto por página
Uma página só sobe de nível quando:
- o layout comunica melhor o propósito
- a hierarquia visual está mais clara
- os CTAs críticos estão classificados
- não há no-op silencioso novo
- build e testes passam
- o status foi registrado no loop

## Saída padrão de cada rodada
Ao terminar uma rodada, responder com:
- página(s) revisada(s)
- melhorias aplicadas
- arquivos alterados
- status de QA
- próxima página automática
- instrução mínima: `Diga ok para eu seguir`
