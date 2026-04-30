# nexxa_life — plano de melhoria de layouts e loop contínuo por página

## Objetivo
Consolidar um plano único para:
1. revisar layouts de todas as páginas
2. registrar melhorias recomendadas por superfície
3. manter um loop contínuo de execução, QA e refinamento por página
4. permitir continuidade com uma única confirmação do usuário: `ok`

## Convenção de naming do projeto
A partir desta rodada, o nome oficial do produto na base atual deve ser:
- `nexxa_life`

Regras:
- substituir referências de marca antigas em superfícies ativas da raiz
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
- [ ] decidir se permanece como home herdada ou redireciona para `/dashboard`
- [ ] evitar colisão semântica entre home herdada e dashboard nexxa_life
- [ ] documentar status final da rota no loop

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
- [ ] evoluir estados bloqueados para cards mais orientativos
- [ ] revisar contraste e ritmo visual da timeline

#### `/checklist`
- [ ] validar progressão visual entre períodos
- [ ] reforçar destaque da tarefa foco
- [ ] revisar equilíbrio entre cards resumo e tarefas

#### `/diagnostic`
- [ ] validar clareza do passo a passo e outputs esperados
- [ ] revisar escaneabilidade da leitura por eixos

#### `/goals`
- [ ] reforçar hierarquia eixo -> meta -> progresso
- [ ] revisar densidade dos cards por eixo

#### `/journal`
- [ ] revisar layout do editor/reflexão para evitar blocos muito homogêneos
- [ ] validar CTA principal e feedback pós-registro

#### `/academy`, `/news`, `/marketplace`, `/framework-admin`
- [ ] revisar consistência visual com o restante do núcleo
- [ ] validar se cada página comunica claramente seu papel no produto

### 4. Rotas herdadas
Essas superfícies precisam de auditoria e decisão de coexistência ou reclassificação:
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
