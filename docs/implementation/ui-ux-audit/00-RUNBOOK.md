# Runbook replicável de auditoria UI/UX por página

## Objetivo

Padronizar como cada página do produto será analisada, planejada e posteriormente executada.

---

## 1. Enquadramento da página

Responder sempre:

- Qual é o objetivo operacional da página?
- Quem é o usuário principal?
- Qual é a ação primária?
- Qual decisão a tela ajuda a tomar?
- Quais ações secundárias existem?
- O que é urgente, crítico ou sensível nessa superfície?

---

## 2. Checklist global obrigatório

- [ ] Idioma consistente
- [ ] Hierarquia visual clara
- [ ] CTA primária óbvia
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Degraded state
- [ ] Responsividade
- [ ] Acessibilidade básica
- [ ] Escaneabilidade
- [ ] Redução de ruído visual
- [ ] Coerência com design system
- [ ] Separação entre dados, apresentação e comportamento

---

## 3. Scorecard padrão

Toda página recebe nota de 1 a 5 em:

- Clareza operacional
- Hierarquia visual
- Escaneabilidade
- Consistência
- Estados operacionais
- Responsividade
- Acessibilidade
- Escalabilidade frontend

---

## 4. Camadas de diagnóstico

### A. UX operacional

- O usuário entende o que fazer?
- A tela ajuda a priorizar?
- A tela reduz esforço cognitivo?
- A ação mais importante está evidente?

### B. UI / arquitetura visual

- Existe foco visual claro?
- Itens críticos têm destaque suficiente?
- O layout parece operacional ou apenas demonstrativo?
- Os filtros e controles parecem reais?

### C. Frontend / arquitetura

- O componente principal está grande demais?
- Há duplicação de regras visuais e labels?
- Existem partes que devem virar primitives?
- Dados, apresentação e comportamento estão bem separados?

---

## 5. Estrutura padrão de entrega

Cada página deve ter:

### a) Resumo executivo
Resumo curto do estado atual.

### b) Problemas encontrados
Lista objetiva dos principais problemas.

### c) Melhorias recomendadas
Separadas em:

- Quick wins
- Melhorias estruturais
- Novas superfícies necessárias

### d) Refatoração sugerida

- componentes a extrair
- componentes a dividir
- hooks/helpers a criar
- primitives reutilizáveis

### e) Plano de implementação
Etapas pequenas e seguras.

### f) Critérios de aceite
Como validar que a página melhorou de fato.

### g) Backlog
Checklist executável.

---

## 6. Critérios de “cara de mock”

Uma superfície parece mock quando:

- filtros não alteram conteúdo real
- métricas não levam a decisão ou ação
- ações só disparam toast sem consequência real
- não existem estados reais de erro/degradação
- há cards decorativos sem utilidade operacional
- a navegação sugere profundidade que ainda não existe

---

## 7. Critérios de “superfície premium operacional”

Uma superfície premium operacional deve:

- deixar a ação primária evidente
- permitir leitura rápida do que exige atenção
- reduzir ambiguidade de estado
- dar contexto suficiente para agir sem abrir múltiplas telas
- parecer conectada a dados e fluxo reais
- escalar bem para uso recorrente

---

## 8. Estratégia de execução

Para cada página:

1. executar quick wins
2. validar com `OK`
3. executar melhorias estruturais
4. validar com `OK`
5. avaliar se novas páginas complementares entram no escopo
6. só então seguir para a próxima

## 8.1. Aprendizados práticos da rodada 1

Padrões que funcionaram bem durante a execução real:

- banner operacional acima da dobra para enquadrar a leitura da página
- seleção de entidade com painel lateral de resumo
- filtros simples com ação explícita de limpar contexto
- cards de métricas resumidas com próxima ação sugerida
- separação mais clara entre catálogo, operação e governança

Pontos a consolidar em próxima rodada:

- extrair componentes transversais para reduzir duplicação
- padronizar resumo lateral e alertas operacionais
- revisar acessibilidade e navegação por teclado das seleções novas
- migrar regras inline recorrentes para helpers/view-models onde fizer sentido

---

## 9. Primitives alvo transversais

- `PageFiltersBar`
- `EntityTable`
- `EmptyState`
- `HealthBadge`
- `StatusPill`
- `KpiGrid`
- `StickyActionBar`
- `RightInspectorPanel`
- `SectionCard`
- `OperationalAlertBanner`

---

## 10. Template padrão por página

```md
# Auditoria da página: [NOME]

## 1. Objetivo operacional
- Objetivo:
- Usuário principal:
- Ação primária:
- Decisão principal suportada pela tela:

## 2. Scorecard
- Clareza operacional: x/5
- Hierarquia visual: x/5
- Escaneabilidade: x/5
- Consistência: x/5
- Estados operacionais: x/5
- Responsividade: x/5
- Acessibilidade: x/5
- Escalabilidade frontend: x/5

## 3. Checklist global
- [ ] Idioma consistente
- [ ] Hierarquia visual clara
- [ ] CTA primária óbvia
- [ ] Loading / empty / error / degraded
- [ ] Responsividade
- [ ] Acessibilidade
- [ ] Escaneabilidade
- [ ] Redução de ruído
- [ ] Componentização
- [ ] Separação de responsabilidades

## 4. Problemas encontrados
- ...

## 5. Melhorias recomendadas
### Quick wins
- ...
### Estruturais
- ...
### Novas superfícies / páginas
- ...

## 6. Refatoração sugerida
- Componentes a extrair:
- Componentes a dividir:
- Abstrações reutilizáveis:
- Separação de dados/apresentação/comportamento:

## 7. Plano de implementação
1.
2.
3.

## 8. Critérios de aceite
- ...
```
