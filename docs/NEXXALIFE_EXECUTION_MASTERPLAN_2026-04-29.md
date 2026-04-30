# NexxaLife — plano mestre de execução para Josefino

Data: 2026-04-29
Contexto base: `old/meu-dia-flow` + `old/chat.meusuper.app`
Pré-requisito: ler antes `docs/NEXXALIFE_FRONTEND_MIGRATION_AUDIT_2026-04-29.md`

---

## 1. Missão

Josefino deve conduzir a reconstrução do produto **NexxaLife / Meu Dia AI** sobre uma base nova, usando:

- `old/meu-dia-flow` como fonte visual, funcional e documental
- `old/chat.meusuper.app` como referência de fundação técnica e padrões de produto
- `nexxalifenew/` como área limpa de execução

A missão **não é migrar o app antigo literalmente**.
A missão é:

> reconstruir o produto com arquitetura nova, reaproveitando UX, narrativa, blocos visuais e fluxos selecionados do legado.

---

## 2. Objetivo de produto

Criar uma nova base de produto que:

1. preserve o melhor da experiência do Meu Dia AI
2. elimine dependências frágeis de `localStorage`
3. separe claramente blocos legados e blocos novos
4. permita evolução real de lógica, persistência, governança e IA
5. use padrões mais sólidos inspirados pela organização do `chat.meusuper.app`

---

## 3. Regra de ouro

Josefino **não deve começar copiando tela por tela para produção**.

A ordem correta é:

1. entender
2. mapear
3. definir arquitetura
4. criar estrutura-alvo
5. só então começar a portar UI e lógica

---

## 4. Fontes oficiais

### Projeto legado
- `/home/tylaig/repo/nexxalifenew/old/meu-dia-flow`

### Base técnica de referência
- `/home/tylaig/repo/nexxalifenew/old/chat.meusuper.app`

### Documentação de auditoria
- `/home/tylaig/repo/nexxalifenew/docs/NEXXALIFE_FRONTEND_MIGRATION_AUDIT_2026-04-29.md`

---

## 5. Escopo da execução

Josefino deve produzir, nesta ordem lógica:

### Fase A — documentação de execução
- matriz de migração tela por tela
- arquitetura alvo
- backlog priorizado
- mapa old/new blocks

### Fase B — fundação do novo módulo/produto
- estrutura inicial do projeto novo
- namespaces e rotas
- camada de componentes
- contratos de dados iniciais

### Fase C — migração visual controlada
- recriar telas mais importantes com dados controlados
- sem portar a lógica antiga diretamente

### Fase D — reconstrução de lógica
- domínio de framework/admin
- diagnóstico
- metas
- checklist
- agenda
- diário
- relatórios

### Fase E — endurecimento
- auth
- persistência real
- testes
- auditoria
- QA funcional

---

## 6. Princípios obrigatórios

### 6.1 Separação entre legado e novo
Criar e manter uma separação explícita entre:
- `old` = referência, legado, experimentação de comparação
- `new` = implementação real e arquitetura final

### 6.2 Não usar `localStorage` como verdade do negócio
O legado usa `storage.js` como pseudo-banco. Isso **não** deve ser carregado como base da nova lógica.

### 6.3 Portar intenção, não código cegamente
Sempre preferir:
- portar fluxo visual
- portar hierarquia
- portar UX

em vez de:
- copiar componente bruto sem adaptação

### 6.4 Documentar antes de reescrever lógica crítica
Diagnóstico, framework, relatórios e metas precisam de documentação de domínio antes de implementação final.

### 6.5 Cada fase deve deixar rastros claros
Todo avanço deve gerar documento, checklist ou estrutura verificável.

---

## 7. Estrutura-alvo sugerida

Josefino pode criar na raiz nova algo como:

- `docs/`
- `apps/`
- `packages/`
- `src/` (se optar por monólito simples)
- `components/`
- `features/`
- `lib/`

Se seguir estrutura inspirada no `chat.meusuper.app`, recomenda-se algo como:

- `app/(app)/nexxalife/*`
- `components/nexxalife/old/*`
- `components/nexxalife/new/*`
- `features/nexxalife/*`
- `lib/nexxalife/*`
- `docs/*`

---

## 8. Entregáveis mínimos obrigatórios

Josefino deve criar pelo menos estes arquivos de apoio:

1. `docs/NEXXALIFE_MIGRATION_MATRIX.md`
2. `docs/NEXXALIFE_TARGET_ARCHITECTURE.md`
3. `docs/NEXXALIFE_IMPLEMENTATION_BACKLOG.md`
4. `docs/NEXXALIFE_OLD_NEW_BLOCKS_MAP.md`
5. `docs/NEXXALIFE_PHASE1_EXECUTION_CHECKLIST.md`

Se necessário, pode criar mais arquivos, desde que sejam citados e interligados.

---

## 9. Ordem de trabalho recomendada

### Etapa 1 — consolidar entendimento
Ler e sintetizar:
- auditoria já pronta
- docs do legado
- docs do `chat.meusuper.app` que ajudem na arquitetura

### Etapa 2 — criar matriz tela por tela
Para cada página do legado, classificar como:
- manter como inspiração
- adaptar
- recriar
- descartar
- adiar

### Etapa 3 — definir arquitetura alvo
Responder:
- o NexxaLife será módulo, app separado ou vertical?
- como rotas serão organizadas?
- quais entidades existem?
- quais componentes entram como `old` e quais como `new`?

### Etapa 4 — planejar a Fase 1
Definir a primeira onda de execução com escopo curto.
Sugestão:
- onboarding
- dashboard
- metas
- checklist

### Etapa 5 — preparar terreno técnico
Criar esqueleto de diretórios, contratos de dados e cascas de módulos.

---

## 10. Priorização sugerida

### P0 — documentação estratégica
- migration matrix
- target architecture
- backlog

### P1 — fundação de produto
- shell de navegação do módulo
- layout base
- rotas iniciais
- componentes base reutilizáveis

### P2 — jornadas centrais
- onboarding
- dashboard
- objetivos/metas
- checklist

### P3 — lógica crítica
- framework/admin
- diagnóstico
- agenda
- diário
- relatórios

### P4 — complementares
- integrações
- academia
- marketplace
- news
- testes

---

## 11. Critérios de sucesso

A execução está no caminho certo se:

1. a nova estrutura não depender do storage antigo
2. o produto ficar mais organizado do que o legado
3. os blocos herdados estiverem claramente identificados
4. as telas forem recriadas com contratos novos
5. o domínio crítico ficar documentado antes da implementação pesada

---

## 12. Critérios de erro

Josefino deve evitar:

- copiar tudo sem matriz de decisão
- transformar o legado em dependência estrutural
- portar `storage.js` como solução final
- misturar descoberta, UI e engine de negócio no mesmo passo
- refatorar sem registrar decisões

---

## 13. Estratégia de execução ideal

### Modo recomendado
- documentação primeiro
- estrutura depois
- UI controlada em seguida
- lógica por domínio depois

### Estratégia de baixo risco
- migrar visualmente as telas mais importantes com dados mockados controlados
- depois conectar a lógica nova

---

## 14. Instrução final para Josefino

Você tem autonomia para:
- criar novos arquivos em `docs/`
- criar estrutura de diretórios na raiz
- produzir mapas, matrizes e planos complementares
- preparar o terreno para a implementação

Mas, por agora, sua responsabilidade principal é:

> transformar a auditoria em um pacote de execução claro, rastreável e acionável.

Se houver dúvida entre velocidade e clareza, priorize clareza.
