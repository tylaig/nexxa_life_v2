# NexxaLife — Framework/Admin Domain

Data: 2026-04-29
Status: documento canônico inicial do domínio crítico de framework/admin
Objetivo: separar claramente a governança estrutural do produto da UI legada e do pseudo-CRUD em `localStorage`.

---

## 1. Propósito

O domínio `framework/admin` existe para governar a fonte de verdade estrutural do NexxaLife.

Ele define:
- quais eixos existem
- como cada eixo é subdividido
- quais perguntas compõem o diagnóstico
- quais pesos, ordens e regras condicionais são válidos
- qual versão está ativa para novos diagnósticos
- como alterações são auditadas

Regra central:
- o admin não é apenas uma tela de cadastro
- o admin é a camada de governança do motor diagnóstico

---

## 2. O que o legado revela

O legado mostra a intenção correta, mas a implementação errada como base final.

Evidências observadas:
- `src/pages/AdminDashboard.jsx` organiza `axis -> dimensions -> questions`
- `src/pages/Diagnostico.jsx` consome diretamente `nexxalife_framework`
- `src/services/storage.js` mistura armazenamento, mutação e estrutura viva no navegador
- não há separação formal entre rascunho, publicação, histórico e auditoria

Conclusão arquitetural:
- a árvore estrutural do legado é útil para engenharia reversa
- a persistência local do legado não deve sobreviver como contrato final

---

## 3. Problemas que precisam ser corrigidos

1. ausência de versionamento real
2. ausência de publicação controlada
3. consumo direto da estrutura ativa sem snapshot canônico
4. mutação administrativa sem trilha de auditoria
5. ausência de distinção entre modelagem estrutural e execução diagnóstica
6. risco de quebrar comparabilidade histórica ao editar perguntas no lugar

---

## 4. Fonte de verdade alvo

A fonte de verdade do domínio deve ser composta por:
- `FrameworkDefinition`
- `FrameworkVersion`
- `Axis`
- `Dimension`
- `Question`
- `ConditionalRule` (fase seguinte)
- `AdminChangeLog`
- `AuditEvent`

Princípio:
- diagnósticos concluídos sempre referenciam uma `FrameworkVersion`
- edições futuras geram nova versão, não mutação silenciosa da anterior

---

## 5. Agregados e fronteiras

### 5.1 Aggregate principal: FrameworkDefinition

Responsável por:
- identidade do framework
- metadata principal
- ponte para a versão ativa

### 5.2 Aggregate operacional: FrameworkVersion

Responsável por:
- congelar uma composição estruturada
- controlar status `draft | published | archived`
- encapsular eixo, dimensão e pergunta por referência versionada

### 5.3 Subestruturas

`Axis`
- pilar macro do diagnóstico
- deve ter peso e ordem explícitos

`Dimension`
- subbloco analítico dentro de um eixo
- não deve existir solta fora de um eixo

`Question`
- unidade mínima de coleta estruturada
- precisa explicitar tipo, peso, obrigatoriedade e ordem

---

## 6. Ciclo de vida administrativo

### 6.1 Draft

Permite:
- criar eixo
- editar textos
- ajustar pesos
- organizar ordem
- adicionar ou remover perguntas
- preparar regras condicionais

Restrições:
- draft não deve alimentar diagnósticos públicos automaticamente

### 6.2 Published

Permite:
- ser usado por novos diagnósticos
- virar base de comparabilidade histórica

Restrições:
- versão publicada não deve ser alterada destrutivamente
- correções relevantes devem gerar nova versão

### 6.3 Archived

Permite:
- preservação histórica
- leitura analítica

Restrições:
- não pode ser escolhida como padrão para novos diagnósticos

---

## 7. Casos de uso canônicos

### UC-FA-01 — listar frameworks
Saída:
- frameworks existentes
- versão ativa
- status geral

### UC-FA-02 — abrir versão em rascunho
Saída:
- árvore completa com eixos, dimensões e perguntas
- metadata e resumo de mudanças

### UC-FA-03 — criar eixo
Entrada mínima:
- `name`
- `description?`
- `weight`
- `order`

### UC-FA-04 — criar dimensão
Entrada mínima:
- `axisId`
- `name`
- `description?`
- `weight`
- `order`

### UC-FA-05 — criar pergunta
Entrada mínima:
- `dimensionId`
- `prompt`
- `questionType`
- `weight`
- `required`
- `order`

### UC-FA-06 — publicar versão
Pré-condições:
- estrutura válida
- pesos e ordens resolvidos
- sem perguntas órfãs
- trilha de mudança registrada

Saída:
- `FrameworkVersion.status = published`
- atualização de `activeVersionId`
- registro de auditoria

### UC-FA-07 — auditar mudanças
Saída:
- histórico administrativo por entidade
- before/after snapshot
- ator e timestamp

---

## 8. Regras de domínio obrigatórias

1. toda `Question` pertence a uma `Dimension`
2. toda `Dimension` pertence a um `Axis`
3. todo `Axis` pertence a uma `FrameworkVersion`
4. somente uma versão pode estar ativa por framework
5. versão publicada não pode sofrer mutação destrutiva
6. pesos devem ser explícitos mesmo quando houver defaults
7. ordem visual e ordem lógica não podem ser implícitas
8. alterações administrativas relevantes devem gerar `AdminChangeLog`
9. diagnósticos não podem depender de “estrutura atual” sem versão referenciada

---

## 9. Anti-patterns proibidos

- salvar a árvore do framework diretamente em `localStorage` como verdade do produto
- editar perguntas publicadas em linha e reaproveitar o mesmo identificador sem histórico
- misturar UI de cadastro com engine de cálculo no mesmo componente
- usar o admin como simples CRUD sem status de publicação
- deixar o diagnóstico ler um framework flutuante sem snapshot versionado

---

## 10. Tradução do legado para o modelo novo

### Legado
- `axis`
- `dimensions[]`
- `questions[]`
- `type`
- `points`

### Novo canônico
- `Axis.name`
- `Dimension.name`
- `Question.prompt`
- `Question.questionType`
- `Question.weight`

Observação importante:
- campos legados servem para mapeamento de estudo
- a nomenclatura nova deve prevalecer em contratos, persistência e testes

---

## 11. Estados de UI recomendados para a futura superfície admin

A UI administrativa futura deve tornar explícito:
- versão ativa
- versão em rascunho
- quantidade de eixos/dimensões/perguntas
- consistência estrutural
- ações perigosas de publicação/arquivamento
- trilha resumida de mudanças

A UI não deve sugerir que o framework está “operacional” apenas porque existe uma árvore renderizada.

---

## 12. Dependências com outros domínios

`framework/admin` alimenta:
- `diagnostic`
- `reports`
- `goal planning`
- governança e auditoria

`framework/admin` depende de:
- autenticação/autorização real
- persistência com histórico
- trilha de auditoria

---

## 13. Entregáveis técnicos esperados depois deste documento

1. contratos TypeScript evolutivos para framework e diagnóstico
2. interface de repositório para leitura de versão ativa
3. fixtures honestas de versão/draft para UI futura
4. backlog específico de publicação, validação e auditoria
5. futura tela admin desacoplada de `storage.js`

---

## 14. Decisão desta macro-rodada

Fica canonizado que:
- `framework/admin` é domínio de governança estrutural
- `AdminDashboard.jsx` do legado é apenas referência de árvore visual
- a verdade futura exige versão, publicação e auditoria
- nenhum passo de implementação final deve continuar acoplado ao pseudo-banco local legado
