# Loop de QA, Prints e Validação

## 1. Regra obrigatória por página

Cada página refatorada só pode ser marcada como concluída após:
1. checklist funcional
2. validação visual
3. print antes
4. print depois
5. validação de estados
6. revisão de consistência com shell global

## 2. Evidências mínimas por página

- print da versão anterior
- print da versão posterior
- lista dos CTAs validados
- lista dos estados testados
- resultado do build
- observações de regressão

## 3. Estados obrigatórios para validar

- loading
- empty
- error
- degraded
- success pós-ação
- dirty state em formulários quando aplicável

## 4. Matriz de validação por módulo

### List-first
- filtros alteram conteúdo ou estado visível
- busca funciona ou tem mock explícito
- clique na linha/card abre detalhe
- ação primária abre create/edit

### Detail/Inspect
- tabs funcionam
- ações de editar e logs existem
- metadados e timeline são consistentes

### Full-screen editor
- salvar/cancelar/testar/publicar têm comportamento explícito
- dirty state é visível
- validação é progressiva
- footer sticky funciona

## 5. Loop estudo -> auditoria -> execução -> validação

Cada rodada deve operar no seguinte ciclo:
1. estudar a próxima superfície alvo no código, docs e browser
2. mapear CTAs, estados e pré-requisitos reais
3. classificar cada fluxo como funcional, mock, no-op, quebrado, bloqueado ou faltante
4. atualizar checklist, status e backlog antes de mexer no próximo bloco
5. implementar ou planejar a correção incremental correspondente
6. validar no browser
7. salvar print antes/depois
8. só então avançar para a melhoria estrutural seguinte

## 6. Regra de interrupção mínima

Este loop não deve parar para microaprovações intermediárias.
A única confirmação externa esperada para seguir a próxima grande rodada é um simples `ok` do usuário.

## 7. Definição de pronto

Uma página só entra em `done` quando:
- UX está mais clara que a baseline anterior
- há ganho visual e funcional verificável
- não existe CTA sem classificação
- a nova estrutura ficou mais próxima do padrão global
