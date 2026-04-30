# Templates HSM

## Arquivos analisados
- `app/(app)/templates/page.tsx`
- `components/templates/templates-list-view.tsx`

## Objetivo operacional
- Operar catálogo de templates aprovados e seu desempenho.
- Usuário: CRM, growth, operações de campanha e compliance.
- Ação primária: localizar, revisar status/qualidade e abrir detalhe/edição.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página é organizada e relativamente legível, mas ainda carece de preview real, contexto de uso e destaque operacional para qualidade Meta e risco. Hoje funciona como catálogo, mas ainda distante do contexto de disparo.

## Problemas encontrados
- Preview real do template é fraco.
- Nome técnico, idioma, categoria e performance competem entre si.
- Qualidade/risk Meta pouco destacados.
- Filtros ainda rasos.
- Falta ação rápida de duplicar, editar e usar em campanha.

## Melhorias recomendadas
### Quick wins
- Melhorar preview do conteúdo real do template.
- Destacar risco/baixa qualidade.
- Reforçar métricas essenciais por linha.
- Padronizar estados e nomenclaturas.

### Estruturais
- Criar preview lateral/mobile-like do template.
- Aproximar a listagem do contexto real de disparo.
- Adicionar ações rápidas de usar em campanha e duplicar.
- Filtrar por idioma, uso, status e categoria.

### Novas superfícies
- `/templates/[id]/preview`
- `/templates/[id]/usage`
- `/templates/library`

## Refatoração sugerida
- Extrair `TemplatePreviewCard`, `TemplateQualityBadge`, `TemplateActionsInline`.
- Criar view-model para status, qualidade e métricas.
- Unificar com listas operacionais de campaigns.

## Plano de implementação
1. Melhorar preview e status.
2. Enriquecer linha com contexto de performance.
3. Adicionar quick actions.
4. Evoluir filtros e empty states.
5. Preparar detalhe forte.

## Critérios de aceite
- Usuário entende rapidamente qualidade e risco do template.
- Preview permite validar utilidade sem abrir editor.
- Catálogo fica mais próximo da operação real de envio.
