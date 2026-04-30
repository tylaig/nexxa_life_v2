# Fase 4.3 — Embeddings reais e retrieval observável

## Objetivo

Completar a próxima camada mais valiosa do módulo de Knowledge/RAG: gerar embeddings reais para chunks, persistir logs de retrieval em SQL/Supabase e melhorar o retrieval para ranquear chunks e remontar contexto útil por documento.

## Escopo desta rodada

1. adicionar configuração server-only para gateway de embeddings
2. criar wrapper de embeddings com fallback determinístico seguro
3. persistir documentos, chunks e embeddings no caminho SQL existente
4. popular `knowledge_embeddings` e `knowledge_chunk_embeddings` no momento da criação do documento
5. persistir `retrieval_logs` tanto no caminho SQL quanto no caminho Supabase
6. melhorar o retrieval para agrupar matches por documento usando ranking por chunk
7. preservar fallback local atual quando banco/gateway não estiverem habilitados

## Ordem de execução

- RED: testes para embedding gateway, persistência SQL e ranking por chunk
- GREEN: env + wrapper server-only de embeddings
- GREEN: criação de documento com chunks + embeddings persistidos
- GREEN: retrieval com agrupamento por documento e logs persistidos
- VALIDATE: `npm test`, `npm run build`, migrações locais
- PERSIST: progresso, gap analysis e índice de docs

## Critérios de pronto

- existe wrapper server-only para embeddings reais via gateway compatível com OpenAI
- `.env.example` documenta as variáveis de embeddings
- documentos criados no caminho SQL materializam `knowledge_documents`, `knowledge_chunks`, `knowledge_embeddings` e `knowledge_chunk_embeddings`
- retrieval via Supabase usa embedding real quando gateway estiver configurado
- retrieval retorna documentos remontados a partir dos chunks mais relevantes
- retrieval persiste logs em `retrieval_logs` sem quebrar o fallback local
- o fluxo permanece resiliente quando gateway/Supabase não estiverem configurados
