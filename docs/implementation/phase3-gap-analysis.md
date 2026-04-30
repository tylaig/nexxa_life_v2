# Fase 3 — Gap Analysis e Continuação

## O que já ficou operacional

- UI real de Campaigns conectada à API
- UI real de Integrations conectada à API
- UI real de AI Skills conectada à API
- UI real de Knowledge conectada à API
- CRUD inicial funcional para Campaigns, Integrations, Skills e Knowledge Sources
- health bootstrap para integrations
- ingest bootstrap para Knowledge
- parser de variáveis com preview/render para AI Skills
- entrada `settings/integrations` alinhada com a mesma UI real

## Gaps restantes mais importantes

### 1. Knowledge/RAG ainda está no estágio de source registry
Falta implementar:
- documents reais por source
- chunking persistido
- embeddings / provider adapter
- retrieval logs reais
- UX de consulta e inspeção de contexto recuperado

### 2. Skills ainda não têm ciclo completo de produção
Falta implementar:
- editar skill existente
- publicar nova versão
- histórico de versões
- bindings da skill por tenant/workspace/canal
- teste manual estruturado com input schema preenchível

### 3. Campaigns ainda estão em create/list draft
Falta implementar:
- edição
- lifecycle mais rico
- execução/manual trigger
- audience binding real
- agendamento
- métricas por run / recipients / status

### 4. Integrations ainda têm health bootstrap simplificado
Falta implementar:
- segredos privados por provider
- validações reais por `n8n`, `supabase` e `openai`
- rotação / update de credenciais
- logs de sincronização e histórico operacional

## Próxima prioridade recomendada

1. evoluir Knowledge/RAG para `sources -> documents -> chunks -> retrieval_logs`
2. expandir AI Skills para versionamento e teste manual estruturado
3. adicionar edição/execução em Campaigns
4. integrar health checks reais e secret handling em Integrations

## Continuação aplicada nesta rodada

Após a análise, foi implementado imediatamente:
- preview de variáveis em AI Skills com renderização do template
- alinhamento da rota `/settings/integrations` com a UI real do módulo

## Critério para próxima rodada

A próxima rodada deve começar por Knowledge/RAG, porque é o gap estrutural com maior impacto transversal para AI Studio, Skills e futura automação assistida.
