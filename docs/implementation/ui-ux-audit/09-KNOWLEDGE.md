# Knowledge

## Arquivos analisados
- `app/(app)/knowledge/page.tsx`
- `components/knowledge/knowledge-overview-view.tsx`

## Objetivo operacional
- Operar fontes e documentos da base de conhecimento com foco em RAG observável.
- Usuário: AI ops, operações técnicas e times que mantêm grounding.
- Ação primária: acompanhar saúde das sources, documentos e retrieval.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 3/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A tela já está funcional e coerente com o domínio, mas ainda seca e técnica demais. Falta explicar melhor o pipeline source > ingestão > indexação > retrieval, destacar health operacional e tornar a relação entre fontes e documentos mais pedagógica e acionável.

## Problemas encontrados
- Pipeline RAG pouco explicado visualmente.
- Relação entre source e documento pouco enfatizada.
- Health/coverage pouco visíveis.
- Leitura técnica ainda fria e linear.
- Ações de debug e retrieval não têm destaque suficiente.

## Melhorias recomendadas
### Quick wins
- Padronizar idioma e estados.
- Destacar status operacional das sources.
- Melhorar empty states para zero source/zero docs.
- Dar mais destaque aos caminhos de logs e retrieval.

### Estruturais
- Criar overview do pipeline RAG.
- Adicionar health/coverage/recent ingest no topo.
- Criar inspector de documento e chunks.
- Aproximar retrieval observável do catálogo principal.

### Novas superfícies
- `/knowledge/pipeline`
- `/knowledge/retrieval`
- `/knowledge/documents/[id]/chunks`

## Refatoração sugerida
- Extrair `KnowledgePipelineCard`, `SourceHealthBadge`, `DocumentInspectorPanel`.
- Dividir overview em seções menores.
- Criar view-model para pipeline, ingestão e retrieval.

## Plano de implementação
1. Melhorar leitura das sources e docs.
2. Introduzir bloco visual do pipeline.
3. Destacar health e coverage.
4. Criar inspeção de documento/chunks.
5. Revisar estados operacionais.

## Critérios de aceite
- Usuário entende rapidamente onde há falha no pipeline.
- A tela comunica melhor status e utilidade do RAG.
- Menos sensação de lista técnica seca.
